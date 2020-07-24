<?php

namespace App\Http\Controllers;

use App\Post;
use App\Http\Resources\Post as PostResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PostController extends Controller
{
    /**
     * Show the selected post.
     *
     * @param Post $post
     * @return PostResource[]
     */
    public function show(Post $post)
    {
        return [
            'data' => new PostResource($post)
        ];
    }


    /**
     * Delete the selected post.
     *
     * @param Post $post
     * @throws \Exception
     */
    public function destroy(Post $post)
    {
        if (! $post->author->is(Auth::user())) {
            throw new HttpException(Response::HTTP_FORBIDDEN);
        }

        $post->delete();
    }

    /**
     * Show all posts.
     *
     * @return array
     */
    public function index()
    {
        return [
            'data' => Post::all()->mapInto(PostResource::class)
        ];
    }

    /**
     * Create a new post.
     *
     * @return array
     */
    public function store(Request $request)
    {
        $post = Post::create([
            'author_id' => Auth::user()->id,
            'title'     => $request->title,
            'body'      => $request->body,
        ]);

        return [
            'data' => new PostResource($post)
        ];
    }

    /**
     * Update the selected post.
     *
     * @param Post $post
     * @param Request $request
     * @return PostResource[]
     */
    public function update(Post $post, Request $request)
    {
        $post->fill($request->only('title', 'body'))
            ->update();

        return [
            'data' => new PostResource($post)
        ];
    }
}
