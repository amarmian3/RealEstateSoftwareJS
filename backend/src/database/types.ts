export type SqlScalar = string | number | boolean | null;
export type Replacements = Record<string, SqlScalar>;

export type Channel = 'RENT' | 'SALE';
export type RentFreq = 'PCM' | 'PW' | 'N_A';
export type PropertyType = 'FLAT' | 'HOUSE' | 'STUDIO' | 'OTHER';
export type MediaType = 'IMAGE' | 'FLOORPLAN' | 'VIDEO';

export interface ListingRow {
  title: string;
  description?: string;
  channel: Channel;
  price_pennies: number;
  rent_frequency: RentFreq;
  bedrooms: number;
  bathrooms: number;
  property_type: PropertyType;
  floor_number: number | null;
  postcode?: string;
  city?: string;
  address_line?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface MediaRow {
  listing_id: number;
  media_type: MediaType;
  storage_key: string;   // e.g. 'listings/1/livingroom.jpg'
  url: string;           // presigned or public URL (can be placeholder initially)
  caption?: string;
  sort_order?: number;
  mime?: string;
  width?: number | null;
  height?: number | null;
  bytes?: number | null;
}