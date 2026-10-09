<?php

use App\Http\Controllers\ListingController;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Admin\ListingController;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/welcome', 'public/home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/public.php';
require __DIR__.'/settings.php';
// require __DIR__.'/admin.php';

Route::middleware(['auth'])->prefix('admin')->group(function () {

    /**
     * todo - bigger extension: add user check for admin role
     */

    /** wayfinder routes */

    require __DIR__.'/listings.php';
    // Route::resource('listings', ListingController::class)->only(['create', 'post']);

});


// Route::get('/admin/listings', function () {
//     return response()->json([
//         'page' => 'Listings admin page',
//         'category' => 'admin'
//     ]);
// });