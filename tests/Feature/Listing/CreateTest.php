
<?php
 
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
 
uses(RefreshDatabase::class);
 
test('authenticated user can view the create listing page', function () {
    $user = User::factory()->create();
 
    $response = $this->actingAs($user)->get(route('listings.create'));
 
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('listing/create'));
});
 
test('unauthenticated guest cannot view the create listing page', function () {
    $response = $this->get(route('listings.create'));
 
    $response->assertRedirect(route('login'));
});
 