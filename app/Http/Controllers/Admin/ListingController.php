<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreListingRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaView;

class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): InertiaView
    {
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
