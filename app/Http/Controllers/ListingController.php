<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreListingRequest;
use App\Http\Requests\UpdateListingRequest;
use App\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

/**
 * TODO:
 * 
 * 1. Make as Admin property ( part of Admin Page & Routing )
 * 2. Add authorization constraints (ownership checks)
 * 3. Check Tests
 * 4. Finalize Admin UIS
 */

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $listings = $request->user()->listings()->get();
        // return response()->json($listings);
        return Inertia::render('listing/index', [
            'listings' => $listings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('listing/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListingRequest $request)
    {
        $listing = $request->user()->listings()->create(
            $request->validated()
        );

        return redirect()->route('listings.show', ['listing' => $listing])
                ->with('success', 'Listing created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Listing $listing)
    {

        /**
         * if you want route-model binding by slug instead of id (nicer URLs, e.g. /listings/cozy-downtown-apartment), add this to your Listing model:
            php
            public function getRouteKeyName(): string
            {
                return 'slug';
            }

            Then Listing $listing will resolve by slug everywhere automatically — no controller changes needed. Worth considering given you're already generating a slug field on creation.
         */

        return Inertia::render('listing/show', [
            'listing' => $listing
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Listing $listing)
    {

        /**
         * listings:
         * - id -> 4445323
         * 
         * user a
         * user b 
         * 
         * req -> 
         * auth guard (pass) = access ->
         * user a = user b BOTH passed
         * 
         * 
         * what you need:
         * add another AUTHORIZATION contraint which checks do user OWNS a resource he tries to acess...
         */

        return Inertia::render('listing/update', [
            'listing' => $listing
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListingRequest $request, Listing $listing)
    {
        $listing->update($request->validated());

        return redirect()->route('listings.show', $listing)
            ->with('success', 'Updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing)
    {
        $listing->delete();

        return redirect()->route('listings.index')
            ->with('success', 'Deleted successfully!');
    }
}