import { FormEventHandler, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import listings from '@/routes/listings';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

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

type ListingForm = {
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

export default function Update({ listing }: { listing: Listing }) {
    // Existing listings already have a deliberate slug — don't silently
    // overwrite it while the user edits the title. Manual by default.
    const [slugIsManual, setSlugIsManual] = useState(true);

    const { data, setData, put, processing, errors } = useForm<ListingForm>({
        title: listing.title,
        slug: listing.slug,
        description: listing.description ?? '',
        price_per_night: String(listing.price_per_night),
        address_line_1: listing.address_line_1,
        city: listing.city,
        state_province: listing.state_province ?? '',
        postal_code: listing.postal_code ?? '',
        country_code: listing.country_code,
        latitude: listing.latitude !== null ? String(listing.latitude) : '',
        longitude: listing.longitude !== null ? String(listing.longitude) : '',
        bedrooms: String(listing.bedrooms),
        bathrooms: String(listing.bathrooms),
        max_guests: String(listing.max_guests),
        status: listing.status,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Listings', href: listings.index.url() },
        { title: listing.title, href: listings.show.url(listing.id) },
        { title: 'Edit', href: listings.edit.url(listing.id) },
    ];

    const handleTitleChange = (value: string) => {
        setData((prev) => ({
            ...prev,
            title: value,
            slug: slugIsManual ? prev.slug : slugify(value),
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(listings.update.url(listing.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${listing.title}`} />

            <form onSubmit={submit} className="mx-auto flex max-w-2xl flex-col gap-6 p-4">
                <div>
                    <h1 className="text-xl font-semibold">Edit listing</h1>
                    <p className="text-sm text-muted-foreground">
                        Update the details below.
                    </p>
                </div>

                {/* Basic info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic info</CardTitle>
                        <CardDescription>What guests will see first.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="slug">Slug</Label>
                                <button
                                    type="button"
                                    onClick={() => setSlugIsManual((prev) => !prev)}
                                    className="text-xs text-muted-foreground underline underline-offset-2"
                                >
                                    {slugIsManual ? 'Auto-generate from title' : 'Edit manually'}
                                </button>
                            </div>
                            <Input
                                id="slug"
                                value={data.slug}
                                disabled={!slugIsManual}
                                onChange={(e) => setData('slug', slugify(e.target.value))}
                            />
                            <InputError message={errors.slug} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                            />
                            <InputError message={errors.description} />
                        </div>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Where the listing is located.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="address_line_1">Address</Label>
                            <Input
                                id="address_line_1"
                                value={data.address_line_1}
                                onChange={(e) => setData('address_line_1', e.target.value)}
                            />
                            <InputError message={errors.address_line_1} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                                <InputError message={errors.city} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="state_province">State / Province</Label>
                                <Input
                                    id="state_province"
                                    value={data.state_province}
                                    onChange={(e) => setData('state_province', e.target.value)}
                                />
                                <InputError message={errors.state_province} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="postal_code">Postal code</Label>
                                <Input
                                    id="postal_code"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                />
                                <InputError message={errors.postal_code} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="country_code">Country code</Label>
                                <Input
                                    id="country_code"
                                    value={data.country_code}
                                    onChange={(e) => setData('country_code', e.target.value.toUpperCase())}
                                    maxLength={2}
                                />
                                <InputError message={errors.country_code} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="latitude">Latitude</Label>
                                <Input
                                    id="latitude"
                                    type="number"
                                    step="any"
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', e.target.value)}
                                />
                                <InputError message={errors.latitude} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="longitude">Longitude</Label>
                                <Input
                                    id="longitude"
                                    type="number"
                                    step="any"
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', e.target.value)}
                                />
                                <InputError message={errors.longitude} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                        <CardDescription>Capacity of the listing.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="bedrooms">Bedrooms</Label>
                            <Input
                                id="bedrooms"
                                type="number"
                                min={0}
                                value={data.bedrooms}
                                onChange={(e) => setData('bedrooms', e.target.value)}
                            />
                            <InputError message={errors.bedrooms} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bathrooms">Bathrooms</Label>
                            <Input
                                id="bathrooms"
                                type="number"
                                min={0}
                                step="0.5"
                                value={data.bathrooms}
                                onChange={(e) => setData('bathrooms', e.target.value)}
                            />
                            <InputError message={errors.bathrooms} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="max_guests">Max guests</Label>
                            <Input
                                id="max_guests"
                                type="number"
                                min={1}
                                value={data.max_guests}
                                onChange={(e) => setData('max_guests', e.target.value)}
                            />
                            <InputError message={errors.max_guests} />
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing & status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price_per_night">Price per night (cents)</Label>
                            <Input
                                id="price_per_night"
                                type="number"
                                min={0}
                                value={data.price_per_night}
                                onChange={(e) => setData('price_per_night', e.target.value)}
                            />
                            <InputError message={errors.price_per_night} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value: ListingForm['status']) => setData('status', value)}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving…' : 'Save'}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
