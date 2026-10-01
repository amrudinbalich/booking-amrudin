import { Head, Link } from '@inertiajs/react';

import { type Listing } from '@/types/listing';
import listings from '@/routes/listings';
import { BackButton } from '@/components/app/back-button';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ listing }: { listing: Listing }) {
    return (
        <>
            <Head title={listing.title} />

            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-4">
                {/* Heading */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-semibold">{listing.title}</h1>
                            <Badge variant={listing.status === 'published' ? 'default' : 'secondary'}>
                                {listing.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">/{listing.slug}</p>
                    </div>

                    {/* Right-aligned button group */}
                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline">
                            <Link href={listings.edit.url(listing.id)}>Edit</Link>
                        </Button>
                        <BackButton href={listings.index.url()} />
                    </div>
                </div>

                {/* Description */}
                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-line text-sm text-muted-foreground">
                            {listing.description || 'No description provided.'}
                        </p>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-1 text-sm">
                        <p>{listing.address_line_1}</p>
                        <p>
                            {listing.city}
                            {listing.state_province ? `, ${listing.state_province}` : ''}
                            {listing.postal_code ? ` ${listing.postal_code}` : ''}
                        </p>
                        <p>{listing.country_code}</p>
                        {listing.latitude && listing.longitude && (
                            <p className="text-muted-foreground">
                                {listing.latitude}, {listing.longitude}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Bedrooms</p>
                            <p className="font-medium">{listing.bedrooms}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Bathrooms</p>
                            <p className="font-medium">{listing.bathrooms}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Max guests</p>
                            <p className="font-medium">{listing.max_guests}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-semibold">
                            ${(listing.price_per_night / 100).toFixed(2)}{' '}
                            <span className="text-sm font-normal text-muted-foreground">/ night</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
