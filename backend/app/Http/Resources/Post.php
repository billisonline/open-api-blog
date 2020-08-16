<?php

namespace App\Http\Resources;

use App\Http\Requests\PostReadRequest;
use App\Post as PostModel;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin PostModel
 */
class Post extends JsonResource
{
    use ResolvesFormRequest;

    public function toArray($request)
    {
        $withAuthor = ($request instanceof PostReadRequest) && $request->withAuthor();

        return [
            'id'        => $this->id,
            'title'     => $this->title,
            'body'      => $this->body,
            'author'    => $this->when($withAuthor, new User($this->author)),
        ];
    }
}
