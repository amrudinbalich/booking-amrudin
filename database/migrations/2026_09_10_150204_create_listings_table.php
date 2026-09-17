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

            // Basic details
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->unsignedInteger('price_per_night');

            // Location information
            $table->string('address_line_1');
            $table->string('city')->index();
            $table->string('state_province')->nullable();
            $table->string('postal_code')->nullable();
            $table->char('country_code', 2)->index();
            $table->decimal('latitude', 10, 8)->nullable()->index();
            $table->decimal('longitude', 11, 8)->nullable()->index();

            // Property specifications
            $table->unsignedSmallInteger('bedrooms')->default(1);
            $table->decimal('bathrooms', 3, 1)->default(1.0);
            $table->unsignedSmallInteger('max_guests')->default(1);

            // State
            $table->string('status', 20)->default('draft');
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
