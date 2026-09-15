<?php

use App\Models\Listing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// positive cases
test('authenticated user can successfully create a listing and is redirected', function () {
    $user = User::factory()->create();

    $payload = [
        'title' => 'Cozy Downtown Apartment',
        'slug' => 'cozy-downtown-apartment',
        'description' => 'A fantastic place in the city center.',
        'price_per_night' => 10000,
        'address_line_1' => '123 Main St',
        'city' => 'Sarajevo',
        'state_province' => 'FBiH',
        'postal_code' => '71000',
        'country_code' => 'BA',
        'latitude' => 43.8563,
        'longitude' => 18.4131,
        'bedrooms' => 2,
        'bathrooms' => 1.5,
        'max_guests' => 4,
        'status' => 'draft',
    ];

    $response = $this->actingAs($user)
        ->post(route('listings.store'), $payload);

    // Fetch the newly created listing from DB to assert redirect route target
    $listing = Listing::where('slug', 'cozy-downtown-apartment')->first();

    // Assert redirection to show page with flash message
    $response->assertRedirect(route('listings.show', $listing))
        ->assertSessionHas('success', 'Listing created successfully!');

    // Assert database entry exists with correct owner relation
    $this->assertDatabaseHas('listings', [
        'id' => $listing->id,
        'user_id' => $user->id,
        'slug' => 'cozy-downtown-apartment',
        'price_per_night' => 10000,
    ]);
});

// negative cases
test('unauthenticated guest is redirected to login', function () {
    $payload = [
        'title' => 'Unauthenticated Listing',
        'slug' => 'unauthenticated-listing',
        'description' => 'Should fail.',
        'price_per_night' => 5000,
        'address_line_1' => 'Street 1',
        'city' => 'City',
        'country_code' => 'US',
        'bedrooms' => 1,
        'bathrooms' => 1,
        'max_guests' => 2,
        'status' => 'draft',
    ];

    $response = $this->post(route('listings.store'), $payload);

    // Unauthenticated standard POST redirects to login route
    $response->assertRedirect(route('login'));

    $this->assertDatabaseMissing('listings', [
        'slug' => 'unauthenticated-listing',
    ]);
});

test('store fails and redirects back with session errors when fields are missing', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->from(route('listings.create'))
        ->post(route('listings.store'), []);

    // Standard form submissions redirect BACK to the form on validation failure
    $response->assertRedirect(route('listings.create'))
        ->assertSessionHasErrors([
            'title',
            'slug',
            'description',
            'price_per_night',
            'address_line_1',
            'city',
            'country_code',
            'bedrooms',
            'bathrooms',
            'max_guests',
            'status',
        ]);
});

test('store fails when slug is duplicate and redirects back with error', function () {
    $user = User::factory()->create();

    Listing::factory()->create([
        'slug' => 'existing-apartment-slug',
    ]);

    $payload = [
        'title' => 'Another Apartment',
        'slug' => 'existing-apartment-slug',
        'description' => 'Duplicate slug attempt.',
        'price_per_night' => 8000,
        'address_line_1' => '456 Side St',
        'city' => 'Mostar',
        'country_code' => 'BA',
        'bedrooms' => 1,
        'bathrooms' => 1,
        'max_guests' => 2,
        'status' => 'draft',
    ];

    $response = $this->actingAs($user)
        ->from(route('listings.create'))
        ->post(route('listings.store'), $payload);

    $response->assertRedirect(route('listings.create'))
        ->assertSessionHasErrors(['slug']);
});

test('store fails when status is invalid', function () {
    $user = User::factory()->create();

    $payload = [
        'title' => 'Invalid Status Listing',
        'slug' => 'invalid-status-listing',
        'description' => 'Testing invalid status',
        'price_per_night' => 5000,
        'address_line_1' => 'Street 1',
        'city' => 'City',
        'country_code' => 'US',
        'bedrooms' => 1,
        'bathrooms' => 1,
        'max_guests' => 2,
        'status' => 'super_active',
    ];

    $response = $this->actingAs($user)
        ->from(route('listings.create'))
        ->post(route('listings.store'), $payload);

    $response->assertRedirect(route('listings.create'))
        ->assertSessionHasErrors(['status']);
});