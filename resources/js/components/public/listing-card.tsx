import { Link } from '@inertiajs/react';
import { MapPin, Star } from 'lucide-react';
import type { Listing } from '@/types/listing';

interface ListingCardProps {
    listing: Listing;
    href: string;
}

export function ListingCard({ listing, href }: ListingCardProps) {
    return (
        <Link 
            href={href} 
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#16233F]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#16233F]/5"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F6F2]">
                {listing.image_url ? (
                    <img
                        src={listing.image_url}
                        alt={listing.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-[#5B6472]">
                        No Preview Available
                    </div>
                )}

                {/* Optional Category/Badge */}
                {listing.type && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#16233F]/80 px-3 py-1 text-xs font-medium text-[#F7F6F2] backdrop-blur-md">
                        {listing.type}
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-5">
                {/* Location & Rating */}
                <div className="flex items-center justify-between text-xs text-[#5B6472]">
                    <div className="flex items-center gap-1 font-medium">
                        <MapPin className="size-3.5 text-[#D9A441]" />
                        <span className="truncate">{listing.location ?? 'Location N/A'}</span>
                    </div>

                    {listing.rating && (
                        <div className="flex items-center gap-1 font-semibold text-[#16233F]">
                            <Star className="size-3.5 fill-[#D9A441] text-[#D9A441]" />
                            <span>{Number(listing.rating).toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h2 className="mt-2 font-serif text-lg font-semibold text-[#16233F] transition-colors group-hover:text-[#D9A441]">
                    {listing.title}
                </h2>

                {/* Subtle Divider / Filler */}
                <div className="mt-auto pt-4">
                    <div className="flex items-baseline justify-between border-t border-[#16233F]/5 pt-3">
                        <span className="text-xs text-[#5B6472]">Starting from</span>
                        <div className="text-right">
                            <span className="text-lg font-bold text-[#16233F]">
                                ${listing.price_per_night ?? listing.price}
                            </span>
                            <span className="text-xs text-[#5B6472]"> / night</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ListingCard;