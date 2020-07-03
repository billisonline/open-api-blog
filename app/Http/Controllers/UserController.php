<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Authenticate and manage users.
 */
class UserController extends Controller
{
    /**
     * Authenticate with email and password.
     *
     * @param Request $request
     */
    public function authenticate(Request $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            throw new HttpException(Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * Show the current user corresponding to the access token or session cookie.
     *
     * @return UserResource[]
     */
    public function showCurrent()
    {
        return $this->show(Auth::user());
    }

    /**
     * Show the selected user.
     *
     * @param User $user
     * @return UserResource[]
     */
    public function show(User $user)
    {
        return [
            'data' => new UserResource($user)
        ];
    }

    /**
     * Show all users.
     *
     * @return array
     */
    public function index()
    {
        return [
            'data' => User::all()->mapInto(UserResource::class)
        ];
    }

    /**
     * Register a new user.
     *
     * @param Request $request
     * @return UserResource[]
     */
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
}
