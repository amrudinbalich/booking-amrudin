<?php

use App\Models\Listing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
 
// positive cases
test('authenticated user can view a listing', function () {
    $user = User::factory()->create();
    $listing = Listing::factory()->for($user)->create([
        'title' => 'Cozy Downtown Apartment',
        'slug' => 'cozy-downtown-apartment',
    ]);
 
    $response = $this->actingAs($user)->get(route('listings.show', $listing));
 
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('listing/show')
        ->where('listing.id', $listing->id)
        ->where('listing.title', 'Cozy Downtown Apartment')
        ->where('listing.slug', 'cozy-downtown-apartment')
    );
});
 
// negative cases
test('unauthenticated guest is redirected to login', function () {
    $listing = Listing::factory()->create();
 
    $response = $this->get(route('listings.show', $listing));
 
    $response->assertRedirect(route('login'));
});
 
test('viewing a non-existent listing returns 404', function () {
    $user = User::factory()->create();
 
    $response = $this->actingAs($user)->get('/listings/999999');
 
    $response->assertNotFound();
});