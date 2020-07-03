<?php

use App\Http\Controllers\UserController;
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
