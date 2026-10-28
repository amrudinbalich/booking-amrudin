<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListingController extends Controller
{
    
    public function index()
    {

        $listings = Listing::all();
        // dd($listings);

        return Inertia::render('public/explore', [
            'listings' => $listings
        ]);

    }

}
