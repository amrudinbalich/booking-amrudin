<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('title');
            $table->text('description')->nullable();

            // $table->string('image')->nullable();

            // // Optimized Location Fields
            // $table->char('country_code', 2)->index(); // e.g 'HR', 'US'
            // $table->string('city_name')->index(); // 'Zagreb', 'Sarajevo', 'Beograd'
            // $table->string('postal_code', 20);
            // $table->string('address');
            
            // $table->decimal('latitude', 10, 7)->nullable();
            // $table->decimal('longitude', 10, 7)->nullable();

            $table->decimal('price_per_night', 8, 2);
            $table->boolean('featured')->default(false); // paid feature - boosts visibility, includes special color on listing

            $table->boolean('available')->default(true);
            $table->boolean('draft')->default(false);

            // $table->softDeletes(); -- potential feature
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
