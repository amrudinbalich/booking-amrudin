<?php

namespace App\Http\Controllers\Public;
use App\Models\Listing;
use App\Repositories\ListingsRepositoryInterface;
use Inertia\Inertia;
use Inertia\Response as InertiaView;

final class ListingController
{
    public function __construct(
        public ListingsRepositoryInterface $listingsRepository
    ) {}

    /**
     * Display listings to client.
     */
    public function index(): InertiaView
    {
        // todo: implement more advanced fetching mechanism  
        // return response()->json([
        //     'locations' => Listing::all(),
        //     'count' => Listing::count()
        // ]);

        // $listings = Listing::latest()->paginate(20);

        // $listings = $this->listingsRepository->fetch();

        $listings = Listing::all();

        return Inertia::render('public/explore', [
            'listings' => $listings
        ]);

        // return response()->json([
        //     'listings' => $listings
        // ]);

    }

    /**
     * Show the resource.
     */
    public function show(Listing $listing)
    {
        return Inertia::render('public/listings-show');
    }
}
