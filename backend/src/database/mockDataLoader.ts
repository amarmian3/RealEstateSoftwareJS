// MockDataLoader.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { readFileSync, createReadStream, statSync } from 'fs';
import path from 'path';
import { DatabaseAdd } from './databaseAdd';
import type { ListingRow, MediaRow, MediaType } from './types';
import { QueryTypes } from 'sequelize';

type CsvListingRow = {
  title: string;
  description: string;
  channel: 'RENT' | 'SALE';
  price_pennies: string;
  rent_frequency: 'PCM' | 'PW' | 'N_A';
  bedrooms: string;
  bathrooms: string;
  property_type: 'FLAT' | 'HOUSE' | 'STUDIO' | 'OTHER';
  floor_number: string;
  postcode: string;
  city: string;
  address_line: string;
  latitude: string;
  longitude: string;
};

type CsvMediaRow = {
  listing_id: string;
  media_type: 'IMAGE' | 'FLOORPLAN' | 'VIDEO';
  url: string;         // local file path (may be empty)
  sort_order: string;
  caption: string;
};

export class MockDataLoader {
  private readonly s3: S3Client;
  private readonly db = new DatabaseAdd();

  constructor(
    private readonly bucket: string,
    private readonly region: string = 'eu-west-2',
    private readonly imagesBaseDir: string = 'src\\database\\databaseMockDataCSV\\images'
  ) {
    this.s3 = new S3Client({ region: this.region });
  }

  // --- PUBLIC ---

  async loadListingsFromCsv(csvPath: string): Promise<void> {
    const rows = this.parseCsv<CsvListingRow>(csvPath);
    for (const r of rows) {
      const listing: ListingRow = {
        title: r.title,
        description: r.description || undefined,
        channel: r.channel,
        price_pennies: Number(r.price_pennies),
        rent_frequency: r.rent_frequency,
        bedrooms: Number(r.bedrooms),
        bathrooms: Number(r.bathrooms),
        property_type: r.property_type,
        floor_number: r.floor_number ? Number(r.floor_number) : null,
        postcode: r.postcode || undefined,
        city: r.city || undefined,
        address_line: r.address_line || undefined,
        latitude: r.latitude ? Number(r.latitude) : null,
        longitude: r.longitude ? Number(r.longitude) : null,
      };

      await this.db['db'].query( // use your strict insert if you prefer
        `INSERT INTO listings
         (title, description, channel, price_pennies, rent_frequency, bedrooms, bathrooms,
          property_type, floor_number, postcode, city, address_line, latitude, longitude)
         VALUES
         (:title, :description, :channel, :price_pennies, :rent_frequency, :bedrooms, :bathrooms,
          :property_type, :floor_number, :postcode, :city, :address_line, :latitude, :longitude)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            title: listing.title,
            description: listing.description ?? null,
            channel: listing.channel,
            price_pennies: listing.price_pennies,
            rent_frequency: listing.rent_frequency,
            bedrooms: listing.bedrooms,
            bathrooms: listing.bathrooms,
            property_type: listing.property_type,
            floor_number: listing.floor_number,
            postcode: listing.postcode ?? null,
            city: listing.city ?? null,
            address_line: listing.address_line ?? null,
            latitude: listing.latitude ?? null,
            longitude: listing.longitude ?? null,
          },
        }
      );
    }
  }

  async loadMediaFromCsvAndUpload(csvPath: string, presignGetSeconds?: number): Promise<void> {
    const rows = this.parseCsv<CsvMediaRow>(csvPath);
    for (const r of rows) {
      const listing_id = Number(r.listing_id);
      const media_type: MediaType = r.media_type;

      // Resolve local path
      const localPathWin = r.url && r.url.length ? r.url : this.guessImagePath(listing_id, media_type);
      const localPath = localPathWin.replace(/\\/g, path.sep);
      const key = `listings/${listing_id}/${path.basename(localPath)}`;

      // Upload to S3
      const mime = this.guessMime(localPath);
      const bytes = statSync(localPath).size;
      await this.s3.send(new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: createReadStream(localPath),
        ContentType: mime,
        CacheControl: 'public, max-age=31536000',
      }));

      // URL to store: canonical or presigned GET (optional)
      const url = presignGetSeconds
        ? await getSignedUrl(this.s3, new GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn: presignGetSeconds })
        : `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

      const media: MediaRow = {
        listing_id,
        media_type,
        storage_key: key,
        url,
        mime,
        width: null,
        height: null,
        bytes,
        sort_order: r.sort_order ? Number(r.sort_order) : 0,
        caption: r.caption || undefined,
      };

      // Strict insert (no casts)
      await this.db['db'].query(
        `INSERT INTO listing_media
         (listing_id, media_type, storage_key, url, mime, width, height, bytes, sort_order, caption)
         VALUES
         (:listing_id, :media_type, :storage_key, :url, :mime, :width, :height, :bytes, :sort_order, :caption)`,
        {
          type: QueryTypes.INSERT,
          replacements: {
            listing_id: media.listing_id,
            media_type: media.media_type,
            storage_key: media.storage_key,
            url: media.url,
            mime: media.mime ?? null,
            width: media.width ?? null,
            height: media.height ?? null,
            bytes: media.bytes ?? null,
            sort_order: media.sort_order ?? 0,
            caption: media.caption ?? null,
          },
        }
      );
    }
  }

  // --- HELPERS ---

  private parseCsv<T extends Record<string, string>>(filePath: string): T[] {
    const text = readFileSync(filePath, 'utf8').trim();
    const lines = text.split(/\r?\n/);
    const headers = this.splitCsvLine(lines[0]);

    const out: T[] = [];
    for (let i = 1; i < lines.length; i++) {
      const fields = this.splitCsvLine(lines[i]);
      const rec: Record<string, string> = {};
      headers.forEach((h, idx) => { rec[h] = fields[idx] ?? ''; });
      out.push(rec as T);
    }
    return out;
  }

  // Handles quotes + commas inside quotes
  private splitCsvLine(line: string): string[] {
    const out: string[] = [];
    let cur = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { // escaped quote
          cur += '"'; i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        out.push(cur.trim()); cur = '';
      } else {
        cur += ch;
      }
    }
    out.push(cur.trim());

    // strip surrounding quotes
    return out.map(s => (s.startsWith('"') && s.endsWith('"') ? s.slice(1, -1) : s));
  }

  private guessImagePath(listingId: number, type: MediaType): string {
    if (type === 'FLOORPLAN') return path.join(this.imagesBaseDir, `listing${listingId}floorplan.png`);
    return path.join(this.imagesBaseDir, `listing${listingId}.jpeg`);
  }

  private guessMime(p: string): string {
    const ext = path.extname(p).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
    if (ext === '.png') return 'image/png';
    if (ext === '.webp') return 'image/webp';
    if (ext === '.pdf') return 'application/pdf';
    return 'application/octet-stream';
  }
}
