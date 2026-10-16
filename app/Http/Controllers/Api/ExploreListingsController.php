<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\Request;

class ExploreListingsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        /**
         * filters:
         * - location
         *  - country
         *  - town
         * - price
         * -featured
         */

        $params = $request->query('price_above') ?? 'false';
        dd($params);

        return Listing::all();
    }
}
