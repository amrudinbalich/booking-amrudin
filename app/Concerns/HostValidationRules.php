<?php

namespace App\Concerns;

trait HostValidationRules
{
    /**
     * Get the validation rules used to validate host fields.
     *
     * @return array<string, array<int, string>>
     */
    protected function hostRules(): array
    {
        return [
            'as_host' => ['required', 'boolean'],
            'company_name' => ['required_if:as_host,true', 'nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
