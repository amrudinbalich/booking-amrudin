<?php

use App\Models\Listing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
 
uses(RefreshDatabase::class);
 
function validListingPayload(array $overrides = []): array
{
    return array_merge([
        'title' => 'Updated Apartment Title',
        'slug' => 'updated-apartment-title',
        'description' => 'An updated description of the place.',
        'price_per_night' => 12000,
        'address_line_1' => '456 Updated St',
        'city' => 'Mostar',
        'state_province' => 'FBiH',
        'postal_code' => '88000',
        'country_code' => 'BA',
        'latitude' => 43.3438,
        'longitude' => 17.8078,
        'bedrooms' => 3,
        'bathrooms' => 2,
        'max_guests' => 6,
        'status' => 'published',
    ], $overrides);
}
 
// positive cases
test('owner can successfully update their listing and is redirected', function () {
    $user = User::factory()->create();
    $listing = Listing::factory()->for($user)->create([
        'slug' => 'original-slug',
    ]);
 
    $payload = validListingPayload(['slug' => 'updated-apartment-title']);
 
    $response = $this->actingAs($user)
        ->put(route('listings.update', $listing), $payload);
 
    $response->assertRedirect(route('listings.show', $listing))
        ->assertSessionHas('success', 'Updated successfully!');
 
    $this->assertDatabaseHas('listings', [
        'id' => $listing->id,
        'title' => 'Updated Apartment Title',
        'slug' => 'updated-apartment-title',
        'city' => 'Mostar',
        'price_per_night' => 12000,
        'status' => 'published',
    ]);
});
 
test('owner can update a listing while keeping its own slug unchanged', function () {
    $user = User::factory()->create();
    $listing = Listing::factory()->for($user)->create([
        'slug' => 'keep-me-the-same',
    ]);
 
    $payload = validListingPayload(['slug' => 'keep-me-the-same']);
 
    $response = $this->actingAs($user)
        ->put(route('listings.update', $listing), $payload);
 
    // Should NOT trip the unique rule against itself
    $response->assertSessionHasNoErrors();
    $response->assertRedirect(route('listings.show', $listing));
});
 
// negative cases
test('unauthenticated guest is redirected to login and listing is not updated', function () {
    $listing = Listing::factory()->create(['title' => 'Original Title']);
 
    $response = $this->put(route('listings.update', $listing), validListingPayload());
 
    $response->assertRedirect(route('login'));
 
    $this->assertDatabaseHas('listings', [
        'id' => $listing->id,
        'title' => 'Original Title',
    ]);
});
 
test('non-owner cannot update another user\'s listing', function () {
    $owner = User::factory()->create();
    $otherUser = User::factory()->create();
    $listing = Listing::factory()->for($owner)->create(['title' => 'Original Title']);
 
    $response = $this->actingAs($otherUser)
        ->put(route('listings.update', $listing), validListingPayload());
 
    $response->assertForbidden();
 
    $this->assertDatabaseHas('listings', [
        'id' => $listing->id,
        'title' => 'Original Title',
    ]);
});
 
test('update fails validation when required fields are missing', function () {
    $user = User::factory()->create();
    $listing = Listing::factory()->for($user)->create();
 
    $response = $this->actingAs($user)
        ->put(route('listings.update', $listing), [
            'title' => '',
            'slug' => '',
        ]);
 
    $response->assertSessionHasErrors(['title', 'slug', 'description', 'price_per_night']);
});
 
test('update fails when slug collides with a different listing\'s slug', function () {
    $user = User::factory()->create();
    Listing::factory()->for($user)->create(['slug' => 'taken-slug']);
    $listing = Listing::factory()->for($user)->create(['slug' => 'my-own-slug']);
 
    $payload = validListingPayload(['slug' => 'taken-slug']);
 
    $response = $this->actingAs($user)
        ->put(route('listings.update', $listing), $payload);
 
    $response->assertSessionHasErrors('slug');
 
    $this->assertDatabaseHas('listings', [
        'id' => $listing->id,
        'slug' => 'my-own-slug',
    ]);
});
 
test('updating a non-existent listing returns 404', function () {
    $user = User::factory()->create();
 
    $response = $this->actingAs($user)
        ->put('/listings/999999', validListingPayload());
 
    $response->assertNotFound();
});