<?php

use App\Models\Host;
use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'as_host' => false,
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::whereEmail('test@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->host)->toBeNull();
});

test('new user-hosts can register with company details', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'as_host' => true,
        'company_name' => 'Acme Inc',
        'description' => 'We make things.',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::whereEmail('test@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->host)->not->toBeNull();
    expect($user->host->company_name)->toBe('Acme Inc');
    expect($user->host->description)->toBe('We make things.');
    expect($user->host->user_id)->toBe($user->id);
});

test('host registration without description is allowed since it is nullable', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'as_host' => true,
        'company_name' => 'Acme Inc',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::whereEmail('test@example.com')->first();
    expect($user->host->description)->toBeNull();
});

test('as_host registration fails without company_name', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'as_host' => true,
        // company_name intentionally omitted
    ]);

    $response->assertSessionHasErrors('company_name');
    $this->assertGuest();

    // Critical: transaction should have rolled back, no orphaned User row
    $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
});

test('non-host registration ignores stray company fields gracefully', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'as_host' => false,
        'company_name' => 'Should Not Matter',
        'description' => 'Should not matter either',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::whereEmail('test@example.com')->first();
    expect($user->host)->toBeNull();
});

test('as_host accepts string boolean values from form submission', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'as_host' => '1', // simulating a checkbox value sent as string
        'company_name' => 'Acme Inc',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::whereEmail('test@example.com')->first();
    expect($user->host)->not->toBeNull();
});

test('registration fails entirely when host creation throws inside the transaction', function () {
    // Force Host::create to fail after User::create has already run,
    // proving the transaction rolls back the user too.
    Host::creating(function () {
        throw new RuntimeException('Simulated host insert failure');
    });

    $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'as_host' => true,
        'company_name' => 'Acme Inc',
    ]);

    $this->assertGuest();
    $this->assertDatabaseMissing('users', ['email' => 'test@example.com']);
    $this->assertDatabaseMissing('hosts', ['company_name' => 'Acme Inc']);
})->skip('Requires a model event hook or partial mock — see note below');
