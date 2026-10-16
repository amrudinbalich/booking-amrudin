<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListingsController extends Controller
{
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
