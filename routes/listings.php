<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListingController;
// use App\Models\Listing;

Route::middleware(['auth'])->prefix('admin')->group(function () {

    // Route::get('/admin/listings', [ListingController::class, 'index']);
    // Route::post('/admin/listings', [ListingController::class, 'store']);

    Route::resource('listings', ListingController::class);

    /**
     * Update concept - checking resource ownership:
     * 🛠️ Check an Ownership Condition
     * You can check if the user actually owns the item they are trying to change. You can grab route parameters directly inside the request class.
     * public function authorize(): bool
        {
            // Find the comment ID from the URL route (e.g., /comments/{comment})
            $comment = $this->route('comment');

            // Return true only if the logged-in user ID matches the comment creator's ID
            return $comment && $this->user()->id === $comment->user_id;
        }
     */

});

