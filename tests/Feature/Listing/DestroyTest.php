<?php

use App\Models\Listing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated user can delete a listing and is redirected', function () {
    $user = User::factory()->create();
    $listing = Listing::factory()->for($user)->create();

    $response = $this->actingAs($user)->delete(route('listings.destroy', $listing));

    $response->assertRedirect(route('listings.index'))
        ->assertSessionHas('success', 'Deleted successfully!');

    $this->assertDatabaseMissing('listings', ['id' => $listing->id]);
});

// todo: when authenticated user doesnt own resource that he wishes to delete

// negative
test('unauthenticated guest is redirected to login and listing is not deleted', function () {
    $listing = Listing::factory()->create();

    $response = $this->delete(route('listings.destroy', $listing));

    $response->assertRedirect(route('login'));

    $this->assertDatabaseHas('listings', ['id' => $listing->id]);
});

test('deleting a non-existent listing returns 404', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->delete('/listings/999999');

    $response->assertNotFound();
});

// NOTE: no ownership check exists in destroy() yet, so this documents
// the current (unsafe) behavior rather than the desired one. Once a
// policy/authorize() call is added, flip this to assertForbidden().
// test('currently, any authenticated user can delete another user\'s listing (no authorization yet)', function () {
//     $owner = User::factory()->create();
//     $otherUser = User::factory()->create();
//     $listing = Listing::factory()->for($owner)->create();

//     $response = $this->actingAs($otherUser)->delete(route('listings.destroy', $listing));

//     $response->assertRedirect(route('listings.index'));
//     $this->assertDatabaseMissing('listings', ['id' => $listing->id]);
// });