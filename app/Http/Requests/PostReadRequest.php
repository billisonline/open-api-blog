<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostReadRequest extends FormRequest
{
    use SkipsAuthorizationAndValidation;

    public function withAuthor()
    {
        return $this->boolean('withAuthor');
    }
}
