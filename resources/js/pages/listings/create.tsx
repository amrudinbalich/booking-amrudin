import { SubmitEvent } from "react";
import { Head, useForm } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"
import listings from "@/routes/listings";
import { ListingForm } from "@/types/listing";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm<ListingForm>({
        title: '',
        description: '',
        price_per_night: '',
        latitude: '0',
        longitude: '0',
        available: true,
        draft: false,
    });

    const submit = (e: SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(listings.store.url());
    };

    return (
        <>
            <Head title="Create Listing" />

            <form onSubmit={submit} className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6">

                <div>
                    <h1 className="text-xl font-semibold">Create listing</h1>
                    <p className="text-sm text-muted-foreground">
                        Fill in the details below.
                    </p>
                </div>

                {/* Basic Details */}
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
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Cozy Downtown Apartment"
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                placeholder="A fantastic place in the city center."
                            />
                            <InputError message={errors.description} />
                        </div>

                    </CardContent>
                </Card>

                {/* Coords */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Coordinates of your listing on a map.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">

                        <div className="grid gap-2">
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input 
                                id="latitude" 
                                value={data.latitude} 
                                onChange={(e) => setData('latitude', e.target.value)} 
                                type="text" 
                                placeholder="48.8584" 
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="longitude">Longitude</Label>
                            <Input 
                                id="longitude" 
                                value={data.longitude} 
                                onChange={(e) => setData('longitude', e.target.value)}
                                type="text" 
                                placeholder="2.2945"
                            />
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
                            <Label htmlFor="price_per_night">Price per night</Label>
                            <Input 
                                id="price_per_night"
                                type="text"
                                min={0}
                                step="0.01"
                                value={data.price_per_night}
                                onChange={(e) => setData('price_per_night', e.target.value)}
                                placeholder="100.00"
                            />
                            <InputError message={errors.price_per_night} />
                        </div>

                        <h6>Availabilty:</h6>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="available"
                                    checked={data.available}
                                    onCheckedChange={(checked) => setData('available', checked)}
                                />
                                <Label htmlFor="available">Available</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Switch
                                    id="draft"
                                    checked={data.draft}
                                    onCheckedChange={(checked) => setData('draft', checked)}
                                />
                                <Label htmlFor="draft">Draft</Label>
                            </div>
                        </div>

                        <InputError message={errors.available} />
                        <InputError message={errors.draft} />

                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="submit" disabled={processing}>Save</Button>
                </div>

            </form>
        </>
    );
}