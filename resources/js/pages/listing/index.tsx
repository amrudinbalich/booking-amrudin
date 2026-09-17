import { Head, Link, router } from '@inertiajs/react';

import { type Listing } from '@/types/listing';
import listings from '@/routes/listings';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function Index({ listings: userListings }: { listings: Listing[] }) {
    const handleDelete = (listing: Listing) => {
        if (!confirm(`Delete "${listing.title}"? This can't be undone.`)) {
            return;
        }

        router.delete(listings.destroy.url(listing.id));
    };

    return (
        <>
            <Head title="Listings" />

            <div className="flex flex-col gap-6 p-6">

                {/* Heading */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Listings</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your properties.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={listings.create.url()}>Create listing</Link>
                    </Button>
                </div>

                {userListings.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                        You don&apos;t have any listings yet.{' '}
                        <Link href={listings.create.url()} className="underline underline-offset-2">
                            Create your first one
                        </Link>
                        .
                    </div>
                ) : (
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Price / night</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userListings.map((listing) => (
                                    <TableRow key={listing.id}>
                                        <TableCell>
                                            <Link
                                                href={listings.show.url(listing.id)}
                                                className="font-medium underline-offset-2 hover:underline"
                                            >
                                                {listing.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {listing.city}, {listing.country_code}
                                        </TableCell>
                                        <TableCell>
                                            ${(listing.price_per_night / 100).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {listing.bedrooms} bd · {listing.bathrooms} ba · {listing.max_guests} guests
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={listing.status === 'published' ? 'default' : 'secondary'}>
                                                {listing.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button asChild size="sm" variant="outline">
                                                    <Link href={listings.edit.url(listing.id)}>Edit</Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(listing)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </>
    );
}