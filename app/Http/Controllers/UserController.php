<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserController extends Controller
{
    public function authenticate(Request $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            throw new HttpException(Response::HTTP_UNAUTHORIZED);
        }
    }
}
