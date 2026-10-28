<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListingsController extends Controller
{

    public function fetch(Request $request)
    {
        // $country = $request->input('country');
        // $city = $request->input('city');
        // $address = $request->input('address');
        // $zip_code = $request->input('zip_code');

        // [
        //     'title' => $title,
        //     // 'country' => $country, 
        //     // 'city' => $city, 
        //     // 'address' => $address, 
        //     // 'zip_code' => $zip_code
        // ] = $request->only([
        //         'title'
        //         // 'country', 
        //         // 'city', 
        //         // 'address', 
        //         // 'zip_code'
        //     ]);

        $name = $request->input('name');
        $limit = $request->input('limit', 15);

        if (isset($name) && !empty($name)) {

            $listings = Listing::where('title', 'ILIKE', "{$name}")->limit($limit)->get();
            
        } else {
            $listings = Listing::latest()->take($limit)->get();
        }

        return response()->json([
            'listings' => $listings
        ]);

    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Set listing to be featured.
     * @param Listing $listing
     * @param bool $featured
     * @return JsonResponse
     */
    public function setFeatured(Request $request, Listing $listing): JsonResponse
    {
        if (isset($request->user()->id) && $request->user()->id !== $listing->user_id) {
            return response()->json([
                'error' => 'Unauthorized.'
            ], 401);
        }

        $request->validate([
            'featured' => 'numeric'
        ]);

        $featured = $request->query('featured');

        if ( !isset($featured) ) {
            return response()->json([
                'error' => 'featured query parameter is not provided.'
            ], 422);
        }

        // if (!isset($request->collect('featured'))) {
        //     return response()->json([
        //         'error' => 'featured query parameter is not provided.'
        //     ], 422);
        // }

        $featured = (bool) $request->query('featured') ?? null;
        $listing->update(['featured' => $featured]);

        return response()->json([
            'message' => 'updated'
        ]);
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
