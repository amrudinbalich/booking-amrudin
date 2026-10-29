<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreListingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // return $this->user()->isHost();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // $validCountries = implode(',', array_keys(config('countries')));

        return [
            'name'           => ['required', 'string', 'min:3', 'max:255', 'unique:listings,name'],
            // 'description'     => ['optional', 'string', 'max:5000'],
            // 'country_code' => ['required', 'string', "in:{$validCountries}"],
            // 'price_per_night' => ['required', 'numeric', 'decimal:0,2', 'min:0', 'max:999999.99'],
            // 'latitude'        => ['required', 'numeric', 'decimal:0,7', 'between:-90,90'],
            // 'longitude'       => ['required', 'numeric', 'decimal:0,7', 'between:-180,180'],
            // 'available'       => ['required', 'boolean'],
            // 'draft'           => ['required', 'boolean'],
        ];
    }
}
