<?php

// Group all admin routes
use Illuminate\Support\Facades\Route;

require __DIR__.'/listings.php';

Route::middleware(['auth'])->prefix('admin')
// ->name('admin.')
->group(function () {
    require __DIR__.'/admin.php';
});
