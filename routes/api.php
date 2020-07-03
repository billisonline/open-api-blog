<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/authenticate', [UserController::class, 'authenticate']);

Route::resource('users', 'UserController')->only('store');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/me', [UserController::class, 'showCurrent']);

    Route::resource('users', 'UserController')->only('index');
});

// This route needs to be registered after /users/me
Route::resource('users', 'UserController')->only('show');
