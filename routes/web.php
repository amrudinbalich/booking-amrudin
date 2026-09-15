<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
// require __DIR__.'/admin.php';
require __DIR__.'/listings.php';


// Route::get('/admin/listings', function () {
//     return response()->json([
//         'page' => 'Listings admin page',
//         'category' => 'admin'
//     ]);
// });