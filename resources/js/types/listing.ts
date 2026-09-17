export type ListingForm = {
    title: string;
    slug: string;
    description: string;
    price_per_night: string;
    address_line_1: string;
    city: string;
    state_province: string;
    postal_code: string;
    country_code: string;
    latitude: string;
    longitude: string;
    bedrooms: string;
    bathrooms: string;
    max_guests: string;
    status: 'draft' | 'published';
};

export type Listing = {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    price_per_night: number;
    address_line_1: string;
    city: string;
    state_province: string | null;
    postal_code: string | null;
    country_code: string;
    latitude: number | null;
    longitude: number | null;
    bedrooms: number;
    bathrooms: number;
    max_guests: number;
    status: 'draft' | 'published';
};