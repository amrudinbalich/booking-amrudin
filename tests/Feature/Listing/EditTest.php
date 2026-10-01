<?php

use App\Models\Listing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
 
uses(RefreshDatabase::class);
 
// positive cases
test('authenticated user can view the edit page for a listing', function () {
    $user = User::factory()->create();
    $listing = Listing::factory()->for($user)->create([
        'title' => 'Cozy Downtown Apartment',
    ]);
 
    $response = $this->actingAs($user)->get(route('listings.edit', $listing));
 
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('listing/update')
        ->where('listing.id', $listing->id)
        ->where('listing.title', 'Cozy Downtown Apartment')
    );
});
 
// negative cases
test('unauthenticated guest is redirected to login', function () {
    $listing = Listing::factory()->create();
 
    $response = $this->get(route('listings.edit', $listing));
 
    $response->assertRedirect(route('login'));
});
 
test('editing a non-existent listing returns 404', function () {
    $user = User::factory()->create();
 
    $response = $this->actingAs($user)->get('/listings/999999/edit');
 
    $response->assertNotFound();
});
 
// NOTE: edit() itself has no ownership check (it just renders the form),
// so any authenticated user can currently view another user's edit page,
// even though the actual update() is protected by UpdateListingRequest::authorize().
// This documents current behavior. Add a policy/authorize() call to edit()
// if the form itself shouldn't be viewable by non-owners.
test('currently, any authenticated user can view another user\'s edit page', function () {
    $owner = User::factory()->create();
    $otherUser = User::factory()->create();
    $listing = Listing::factory()->for($owner)->create();
 
    $response = $this->actingAs($otherUser)->get(route('listings.edit', $listing));
 
    $response->assertOk();
});