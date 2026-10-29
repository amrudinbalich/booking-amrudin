<?php

use App\Http\Controllers\Api\ListingsExploreController;
use App\Http\Controllers\Public\ListingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExploreListingsController;
use App\Http\Controllers\Api\ListingsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::post('/token/generate', );

Route::get('/listings/fetch', [ListingsController::class, 'fetch'])->name('api.listings.fetch');

// host-only
Route::post('/listings', [ListingsController::class, 'store'])
    ->middleware(['auth:sanctum', 'can:host']);

Route::get('/listings/explore', ExploreListingsController::class);

Route::put('/listings/featured/{listing}', [ListingsController::class, 'setFeatured'])->middleware('auth:sanctum');

// Route::put('/listings/featured', ListingsContr);