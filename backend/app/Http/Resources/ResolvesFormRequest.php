<?php

namespace App\Http\Resources;

use Illuminate\Container\Container;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;

/**
 * @mixin JsonResource
 */
trait ResolvesFormRequest
{
    public function jsonSerialize()
    {
        $request = $this->getCurrentControllerFormRequest() ?: Container::getInstance()->make('request');

        return $this->resolve($request);
    }

    protected function getCurrentControllerFormRequest(): ?FormRequest
    {
        $reflectionMethod = new \ReflectionMethod(Route::current()->getController(), Route::current()->getActionMethod());

        foreach ($reflectionMethod->getParameters() as $parameter) {
            if (
                $parameter->hasType()
                && ($type = $parameter->getType())
                && ($type instanceof \ReflectionNamedType)
                && (is_subclass_of($type->getName(), FormRequest::class))
            ) {
                return app($type->getName());
            }
        }

        return null;
    }
}
