<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Controllers\Settings\TokenController;
use Illuminate\Auth\Middleware\RequirePassword;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/security', [SecurityController::class, 'edit'])
        ->middleware(RequirePassword::class)
        ->name('security.edit');

    Route::put('settings/password', [SecurityController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::post('settings/sanctum/token', [ SecurityController::class, 'token' ])
        ->name('sanctum.token');

    Route::inertia('settings/appearance', 'settings/appearance')->name('appearance.edit');
});


Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('settings/token', [TokenController::class, 'index'])
        ->middleware(RequirePassword::class)
        ->name('token.index');

    Route::post('settings/token/generate', [TokenController::class, 'generate'])
        ->name('token.generate');

    Route::delete('settings/token/generate', [TokenController::class, 'destroy'])
        ->name('token.destroy');
    
});

Route::get('.well-known/passkey-endpoints', function () {
    return response()->json([
        'enroll' => route('security.edit'),
        'manage' => route('security.edit'),
    ]);
})->name('well-known.passkeys');
