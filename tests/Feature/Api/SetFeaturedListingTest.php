<?php

use App\Models\Listing;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

$base = '/api/listings';

// test('example', function () {
//     $response = $this->get('/');

//     $response->assertStatus(200);
// });

test('sets featured listing success', function () {
    $user = User::factory()->create();

    $listing = Listing::factory()->create([
        'user_id' => $user->id,
    ]);

    // dd($listing->count() == 1);
    // $listing = $user->listings()->factory()->create();

    dd($listing->id, $listing->user_id, $user->currentAccessToken());

    $response = $this->put("/api/listings/featured/{$listing->id}?featured=1");

    $response->assertStatus(200);
    $response->assertJson( fn (AssertableJson $json) => $json->has('success') );

});
