export interface Listing {
    id: number;
    title: string;
    description: string | null;
    price_per_night: string;
    latitude: string | null;
    longitude: string | null;
    available: boolean;
    draft: boolean;
    created_at: string;
    updated_at: string;
}

export interface ListingForm {
    title: string;
    description: string;
    price_per_night: string;
    latitude: string;
    longitude: string;
    available: boolean;
    draft: boolean;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
 
// Matches the shape Laravel's paginate() serializes to.
export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}