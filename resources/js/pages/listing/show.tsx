import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import listings from '@/routes/listings'; // TODO: confirm this path matches your generated Wayfinder file

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Listing = {
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

export default function Show({ listing }: { listing: Listing }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Listings', href: listings.index.url() },
        { title: listing.title, href: listings.show.url(listing.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={listing.title} />

            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-4">
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
                    <Button asChild variant="outline">
                        <Link href={listings.edit.url(listing.id)}>Edit</Link>
                    </Button>
                </div>

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
        </AppLayout>
    );
}
