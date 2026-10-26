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
        // $title = fake()->sentence(3);

        return [
            'user_id' => User::factory(),
            
            'title' => fake()->sentence(3),
            'description' => fake()->paragraphs(3, true),

            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),

            'price_per_night' => fake()->randomFloat(2, 30, 500),

            'featured' => fake()->boolean(),
            'available' => fake()->boolean(),
            'draft' => fake()->boolean(),
        ];
    }
}
