<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/authenticate', [UserController::class, 'authenticate']);

Route::resource('users', 'UserController')->only('store');

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('posts', 'PostController')->only('show', 'index');

    Route::get('/users/me', [UserController::class, 'showCurrent']);

    Route::post('/logout', [UserController::class, 'logout']);

    Route::resource('users', 'UserController')->only('index');

    Route::get('/users/{user}/posts', [UserController::class, 'indexPosts']);

    Route::resource('posts', 'PostController')->only('update', 'store', 'destroy');
});

// This route needs to be registered after /users/me
Route::resource('users', 'UserController')->only('show');
