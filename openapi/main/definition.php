<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Resources\Post as PostResource;
use App\Http\Resources\User as UserResource;
use BYanelli\OpenApiLaravel\Objects\KeyedResponseSchemaWrapper;
use BYanelli\OpenApiLaravel\Objects\OpenApiDefinition;
use BYanelli\OpenApiLaravel\Objects\OpenApiInfo;
use BYanelli\OpenApiLaravel\Objects\OpenApiOperation;

OpenApiInfo::make()->title('OpenAPI Test Blog')->version('0.1');

OpenApiDefinition::current()->responseSchemaWrapper(new KeyedResponseSchemaWrapper('data'));

OpenApiOperation::fromAction([UserController::class, 'authenticate'])
    ->request([
        'email' => 'string',
        'password' => 'string',
    ])
    ->emptyResponse();

OpenApiOperation::fromAction([UserController::class, 'showCurrent'])
    ->response(UserResource::class);

OpenApiOperation::fromAction([UserController::class, 'store'])
    ->request([
        'name' => 'string',
        'email' => 'string',
        'password' => 'string',
    ])
    ->response(UserResource::class);

OpenApiOperation::fromAction([UserController::class, 'show'])
    ->response(UserResource::class);

OpenApiOperation::fromAction([UserController::class, 'index'])
    ->response(UserResource::class);

/*

 OpenApiOperation::fromResourceController(PostController::class)
    ->resource(PostResource::class)
    ->indexQuery([
        'whereFeatured' => 'boolean',
    ])
    ->indexAndShowQuery([
        'withAuthor' => 'boolean',
    ])
    ->storeAndUpdateRequest([
        'title' => 'string',
        'body' => 'string',
    ]); //todo: default? */

OpenApiOperation::fromAction([PostController::class, 'show'])
    ->response(PostResource::class);

OpenApiOperation::fromAction([PostController::class, 'index'])
    ->response(PostResource::class);

OpenApiOperation::fromAction([PostController::class, 'store'])
    ->request([
        'title' => 'string',
        'body' => 'string',
    ])
    ->response(PostResource::class);

OpenApiOperation::fromAction([PostController::class, 'update'])
    ->request([
        'title' => 'string',
        'body' => 'string',
    ])
    ->response(PostResource::class);

OpenApiOperation::fromAction([PostController::class, 'destroy'])
    ->emptyResponse();

