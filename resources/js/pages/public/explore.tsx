import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Listing } from "@/types/listing";
import listingRoutes from "@/routes/listings";
import { ListingCard } from "@/components/app/listing-card";

export default function Explore({ listings }: { listings: Listing[] }) {

    // console.log(listings);

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl m-5">
                Listings
            </h1>


            {/* render listings */}

            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"></div> */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">

                {  listings.map( listing => 

                    <ListingCard listing={listing} />

                    )

                }

            </div>

        </>
    );

}