<?php

namespace Tests\Feature;

use App\Post;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    /** @teZt */
    public function create_post_for_user()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user)
            ->post("/api/users/{$user->id}/posts", [
                'title' => 'foo',
                'body' => 'bar',
            ])
            ->assertOk();

        $this->assertDatabaseHas('posts', [
            'author_id' => $user->id,
            'title' => 'foo',
            'body' => 'bar',
        ]);
    }

    /** @test */
    public function create_post()
    {
        $user = factory(User::class)->create();

        $this->actingAs($user)
            ->post("/api/posts", [
                'title' => 'foo',
                'body' => 'bar',
            ])
            ->assertOk();

        $this->assertDatabaseHas('posts', [
            'author_id' => $user->id,
            'title' => 'foo',
            'body' => 'bar',
        ]);
    }

    /** @test */
    public function browse_posts_for_user()
    {
        $user = factory(User::class)->create();

        $posts = factory(Post::class)->times(2)->create(['author_id' => $user->id]);

        $this->actingAs($user)
            ->get("/api/users/{$user->id}/posts")
            ->assertJson([
                'data' => (
                    $posts
                        ->map(function (Post $post) {
                            return $post->only('id', 'title', 'body');
                        })
                        ->all()
                )
            ]);
    }
    /** @test */
    public function browse_all_posts()
    {
        $user = factory(User::class)->create();

        $posts = factory(Post::class)->times(2)->create(['author_id' => $user->id]);

        $this->actingAs($user)
            ->get("/api/users/{$user->id}/posts")
            ->assertJson([
                'data' => (
                    $posts
                        ->map(function (Post $post) {
                            return $post->only('id', 'title', 'body');
                        })
                        ->all()
                )
            ]);
    }

    /** @test */
    public function show_post()
    {
        $post = factory(Post::class)->create();

        $this->get("/api/posts/{$post->id}")
            ->assertOk()
            ->assertJson([
                'data' => $post->only('id', 'title', 'body')
            ]);
    }

    /** @test */
    public function delete_own_post()
    {
        $user = factory(User::class)->create();

        $post = factory(Post::class)->create(['author_id' => $user->id]);

        $this->actingAs($user)
            ->delete("/api/posts/{$post->id}")
            ->assertOk();

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    /** @test */
    public function cannot_delete_other_users_post()
    {
        [$user, $otherUser] = factory(User::class)->times(2)->create()->all();

        $post = factory(Post::class)->create(['author_id' => $otherUser->id]);

        $this->actingAs($user)
            ->delete("/api/posts/{$post->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('posts', ['id' => $post->id]);
    }

    /** @test */
    public function update_own_post()
    {
        $user = factory(User::class)->create();

        $post = factory(Post::class)->create(['author_id' => $user->id]);

        $this->actingAs($user)
            ->put("/api/posts/{$post->id}", [
                'title' => 'foo'
            ])
            ->assertOk();

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'foo',
        ]);
    }

    /** @test */
    public function cannot_update_other_users_post()
    {
        [$user, $otherUser] = factory(User::class)->times(2)->create()->all();

        $post = factory(Post::class)->create(['author_id' => $otherUser->id]);

        $this->actingAs($user)
            ->delete("/api/posts/{$post->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('posts', ['id' => $post->id]);
    }
}
