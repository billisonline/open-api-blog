<?php

namespace App\Http\Resources;

use App\Http\Requests\UserReadRequest;
use App\User as UserModel;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin UserModel
 */
class User extends JsonResource
{
    use ResolvesFormRequest;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $withPosts = ($request instanceof UserReadRequest) && $request->withPosts();

        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'email' => $this->email,
            'posts' => $this->when($withPosts, $this->posts->mapInto(Post::class)),
        ];
    }
}
