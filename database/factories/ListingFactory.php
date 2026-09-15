<?php

namespace Database\Factories;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(3);

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title) . '-' . fake()->unique()->numberBetween(100, 999),
            'description' => fake()->paragraphs(3, true),
            'price_per_night' => fake()->numberBetween(3000, 50000), // In cents/integers ($30.00 to $500.00)
            'address_line_1' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state_province' => fake()->state(),
            'postal_code' => fake()->postcode(),
            'country_code' => fake()->countryCode(),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'bedrooms' => fake()->numberBetween(1, 5),
            'bathrooms' => fake()->randomElement([1.0, 1.5, 2.0, 2.5, 3.0]),
            'max_guests' => fake()->numberBetween(1, 10),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
        ];
    }
}
