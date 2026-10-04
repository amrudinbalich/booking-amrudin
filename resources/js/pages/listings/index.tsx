import { Head, Link } from '@inertiajs/react';
import { type Listing, type Paginated } from '@/types/listing';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Props {
    listings: Paginated<Listing>;
}

export default function Index({ listings }: Props) {
    return (
        <>
            <Head title="Listings" />

            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-xl font-semibold">Listings</h1>
                    <p className="text-sm text-muted-foreground">
                        {listings.total} total listing{listings.total === 1 ? '' : 's'}
                    </p>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Price / night</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listings.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                                        No listings yet.
                                    </TableCell>
                                </TableRow>
                            )}

                            {listings.data.map((listing) => (
                                <TableRow key={listing.id}>
                                    <TableCell className="font-medium">{listing.title}</TableCell>
                                    <TableCell>${Number(listing.price_per_night).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Badge variant={listing.draft ? 'secondary' : 'default'}>
                                                {listing.draft ? 'Draft' : 'Published'}
                                            </Badge>
                                            {!listing.available && (
                                                <Badge variant="outline">Unavailable</Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(listing.created_at).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {listings.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {listings.from}–{listings.to} of {listings.total}
                        </p>

                        <nav className="flex gap-1">
                            {listings.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    className={[
                                        'rounded-md px-3 py-1.5 text-sm',
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent',
                                        !link.url && 'pointer-events-none opacity-40',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </>
    );
}
