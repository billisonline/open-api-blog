<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserReadRequest extends FormRequest
{
    use SkipsAuthorizationAndValidation;

    public function withPosts(): bool
    {
        return $this->boolean('withPosts');
    }
}
