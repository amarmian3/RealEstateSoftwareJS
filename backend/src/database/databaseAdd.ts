import { Sequelize, QueryTypes, type BindOrReplacements } from 'sequelize';
import { Database } from './database';
import {ListingRow, MediaRow} from './types';

export class DatabaseAdd {
    private readonly db: Sequelize = Database.getInstance();

    /** One-off schema creation (safe to delete after running). */
    public async createTables(): Promise<void> {
        const sql = `
            CREATE TABLE IF NOT EXISTS listings (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            channel ENUM('RENT','SALE') NOT NULL,
            price_pennies BIGINT NOT NULL,
            rent_frequency ENUM('PCM','PW','N_A') DEFAULT 'N_A',
            bedrooms TINYINT UNSIGNED,
            bathrooms TINYINT UNSIGNED,
            property_type ENUM('FLAT','HOUSE','STUDIO','OTHER') NOT NULL,
            floor_number SMALLINT,
            postcode VARCHAR(20),
            city VARCHAR(120),
            address_line VARCHAR(255),
            latitude DECIMAL(9,6),
            longitude DECIMAL(9,6),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB;

            CREATE TABLE IF NOT EXISTS listing_media (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            listing_id BIGINT NOT NULL,
            media_type ENUM('IMAGE','FLOORPLAN','VIDEO') NOT NULL,
            storage_key VARCHAR(512) NOT NULL,
            url VARCHAR(1024) NOT NULL,
            mime VARCHAR(100),
            width INT,
            height INT,
            bytes INT,
            sort_order INT DEFAULT 0,
            caption VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX (listing_id, media_type, sort_order),
            CONSTRAINT fk_listing_media_listing
                FOREIGN KEY (listing_id) REFERENCES listings(id)
                ON DELETE CASCADE
            ) ENGINE=InnoDB;
        `;
        await this.db.query(sql);
    }

    public async insertListing(row: ListingRow): Promise<void> {
        const [insertId] = await this.db.query(
        `INSERT INTO listings
            (title, description, channel, price_pennies, rent_frequency, bedrooms, bathrooms,
            property_type, floor_number, postcode, city, address_line, latitude, longitude)
            VALUES
            (:title, :description, :channel, :price_pennies, :rent_frequency, :bedrooms, :bathrooms,
            :property_type, :floor_number, :postcode, :city, :address_line, :latitude, :longitude)`,
        {
            type: QueryTypes.INSERT,
            replacements: {
            title: row.title,
            description: row.description ?? null,
            channel: row.channel,
            price_pennies: row.price_pennies,
            rent_frequency: row.rent_frequency,
            bedrooms: row.bedrooms,
            bathrooms: row.bathrooms,
            property_type: row.property_type,
            floor_number: row.floor_number,
            postcode: row.postcode ?? null,
            city: row.city ?? null,
            address_line: row.address_line ?? null,
            latitude: row.latitude ?? null,
            longitude: row.longitude ?? null
            }
        }
        );

        console.log(`✅ Inserted listing "${row.title}" with ID ${insertId}`);
    }

    public async insertMedia(row: MediaRow): Promise<void> {
        const [insertId] = await this.db.query(
            `INSERT INTO listing_media
            (listing_id, media_type, storage_key, url, mime, width, height, bytes, sort_order, caption)
            VALUES
            (:listing_id, :media_type, :storage_key, :url, :mime, :width, :height, :bytes, :sort_order, :caption)`,
            {
            type: QueryTypes.INSERT,
            replacements: {
                listing_id: row.listing_id,
                media_type: row.media_type,
                storage_key: row.storage_key,
                url: row.url,
                mime: row.mime ?? null,
                width: row.width ?? null,
                height: row.height ?? null,
                bytes: row.bytes ?? null,
                sort_order: row.sort_order ?? 0,
                caption: row.caption ?? null
            }
            }
        );

        console.log(`✅ Inserted media for listing ${row.listing_id} with ID ${insertId}`);
    }
}
