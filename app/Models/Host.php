<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'company_name', 'description'])]
class Host extends Model
{
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
