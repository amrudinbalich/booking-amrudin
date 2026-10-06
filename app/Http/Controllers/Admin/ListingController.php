<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreListingRequest;
use App\Http\Requests\UpdateListingRequest;
use App\Models\Listing;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaView;

/**
 * todo:
 * 1. CRUD ( MUST )
 * 2. Policy Authorization
 * 3. tests (after)
 * 4. For coords: make user - navigated map component...  potentially use 'Leaflet' lib or google maps..
 * 5. Text based search for index... 
 * 6. Image(s) upload for listing - spatie/laravel-medialibrary -> HasMedia trait on model..
 * 
 */

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): InertiaView
    {
        /**
         * proto code::
                $listings = $request->user()
                ->listings()
                ->when($request->search, fn ($q, $search) =>
                    $q->where('title', 'like', "%{$search}%")
                )
                ->when($request->status, fn ($q, $status) =>
                    $q->where('draft', $status === 'draft')
                )
                ->latest()
                ->paginate(10)
                ->withQueryString();

            return Inertia::render('listings/index', [
                'listings' => $listings,
                'filters' => $request->only(['search', 'status']),
            ]);
         */

        $listings = $request->user()
                ->listings()
                ->latest()
                ->paginate(10)
                ->withQueryString();

        return Inertia::render('listings/index', [
            'listings' => $listings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): InertiaView
    {
        return Inertia::render('listings/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreListingRequest $request)
    {
        $request->user()->listings()->create(
            $request->validated()
        );

        Inertia::flash('success', 'Listing created successfully!');
        
        return redirect()->route('listings.index');
    }

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Listing $listing): InertiaView
    {
        return Inertia::render('listings/edit', [
            'listing' => $listing
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateListingRequest $request, Listing $listing): RedirectResponse
    {
        // $this->authorize('update', $listing);

        $listing->update($request->validated());

        return redirect()
            ->route('listings.index')
            ->with('success', 'Listing updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Listing $listing): RedirectResponse
    {
        // $this->authorize('delete', $listing);

        $listing->delete();
    
        return redirect()
            ->route('listings.index')
            ->with('success', 'Listing deleted successfully!');
    }
}
