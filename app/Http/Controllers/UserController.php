<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserController extends Controller
{
    public function authenticate(Request $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            throw new HttpException(Response::HTTP_UNAUTHORIZED);
        }
    }

    public function showCurrent()
    {
        return $this->show(Auth::user());
    }

    public function show(User $user)
    {
        return [
            'data' => new UserResource($user)
        ];
    }

    public function index()
    {
        return [
            'data' => User::all()->mapInto(UserResource::class)
        ];
    }

    public function store(Request $request)
    {
        $data = array_merge($request->only('name', 'email'), [
            'password' => Hash::make($request->password)
        ]);

        $user = User::create($data);

        return [
            'data' => new UserResource($user)
        ];
    }

    public function destroy(User $user)
    {
        $user->delete();
    }
}
