import { Link } from '@inertiajs/react';
import { type Listing } from '@/types/listing';
import listingRoutes from '@/routes/listings';

export function ListingCard({ listing }: { listing: Listing }) {
    return (
        <Link
            href={listingRoutes.show.url(listing.id)}
            className="group block overflow-hidden rounded-xl border border-black/5 bg-white transition hover:shadow-lg"
        >
            {/* Placeholder until listing photos exist */}
            <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#16233F] to-[#3A5377]" />

            <div className="p-4">
                <h3 className="font-serif text-lg text-[#16233F] group-hover:underline">
                    {listing.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-[#5B6472]">
                    {listing.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-[#16233F]">
                        <span className="font-semibold">
                            ${Number(listing.price_per_night).toFixed(2)}
                        </span>
                        <span className="text-sm text-[#5B6472]"> / night</span>
                    </p>

                    {!listing.available && (
                        <span className="rounded-full border border-[#5B6472]/30 px-2 py-0.5 text-xs text-[#5B6472]">
                            Unavailable
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}