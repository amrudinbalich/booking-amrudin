<?php

use App\Http\Controllers\Public\ListingController;

use Illuminate\Support\Facades\Route;

Route::get('/explore', [ListingController::class, 'index'])->name('public.explore');
Route::get("listings/{id}", [ListingController::class, 'show'])->name('public.');