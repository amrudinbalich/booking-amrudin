import { Head } from '@inertiajs/react';
import { Inbox } from 'lucide-react';
import { type Listing } from '@/types/listing';
import { ListingCard } from '@/components/public/listing-card';

export default function Explore({ listings }: { listings: Listing[] }) {
    return (
        <>
            <Head title="Explore stays" />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl text-[#16233F]">Explore stays</h1>
                    <p className="mt-2 text-[#5B6472]">
                        {listings.length} place{listings.length === 1 ? '' : 's'} to stay
                    </p>
                </div>

                {listings.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#5B6472]/30 py-20 text-[#5B6472]">
                        <Inbox className="size-8" strokeWidth={1.5} />
                        <p className="text-sm">No stays available right now. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                listing={listing}
                                href={`/listings/fetch/${listing.id}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
