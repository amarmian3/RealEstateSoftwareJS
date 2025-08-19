export type Listing = {
    id: string | number;
    image: string;
    title: string;
    address: string;
    distance: string;
    priceMonthly: number;
    priceWeekly: number;
    features: string[];
    match: number;
  };
  
  export type ListingsResponse = {
    items: Listing[];
    hasMore: boolean;
    nextCursor: string | null;
  };
  