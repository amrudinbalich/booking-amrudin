<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

#[Fillable([
    'title',
    'description',
    'price_per_night',
    'latitude',
    'longitude',
    'available',
    'draft',
])]
class Listing extends Model
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price_per_night' => 'decimal:2',
            'available' => 'boolean',
            'draft' => 'boolean',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7'
        ];
    }

    /**
     * Get the user that owns the listing.
     *
     * @return BelongsTo<User, $this>
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('draft', false);
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('available', true);
    }
}
