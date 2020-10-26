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
        $user = User::factory()->create();

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
        $user = User::factory()->create();

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
        $user = User::factory()->create();

        $posts = Post::factory()->times(2)->create(['author_id' => $user->id]);

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
        $user = User::factory()->create();

        $posts = Post::factory()->times(2)->create(['author_id' => $user->id]);

        $this->actingAs($user)
            ->get("/api/posts")
            ->assertOk()
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
    public function browse_all_posts_with_author()
    {
        $user = User::factory()->create();

        $posts = Post::factory()->times(2)->create(['author_id' => $user->id]);

        $this->actingAs($user)
            ->get('/api/posts?withAuthor=true')
            ->assertJson([
                'data' => (
                    $posts
                        ->map(function (Post $post) {
                            return [
                                'id' => $post->id,
                                'title' => $post->title,
                                'body' => $post->body,
                                'author' => $post->author->only('id', 'name', 'email')
                            ];
                        })
                        ->all()
                )
            ]);
    }

    /** @test */
    public function show_post()
    {
        $user = User::factory()->create();

        $post = Post::factory()->create();

        $this->actingAs($user)
            ->get("/api/posts/{$post->id}")
            ->assertOk()
            ->assertJson([
                'data' => $post->only('id', 'title', 'body')
            ]);
    }

    /** @test */
    public function delete_own_post()
    {
        $user = User::factory()->create();

        $post = Post::factory()->create(['author_id' => $user->id]);

        $this->actingAs($user)
            ->delete("/api/posts/{$post->id}")
            ->assertOk();

        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    /** @test */
    public function cannot_delete_other_users_post()
    {
        [$user, $otherUser] = User::factory()->times(2)->create()->all();

        $post = Post::factory()->create(['author_id' => $otherUser->id]);

        $this->actingAs($user)
            ->delete("/api/posts/{$post->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('posts', ['id' => $post->id]);
    }

    /** @test */
    public function update_own_post()
    {
        $user = User::factory()->create();

        $post = Post::factory()->create(['author_id' => $user->id]);

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
        [$user, $otherUser] = User::factory()->times(2)->create()->all();

        $post = Post::factory()->create(['author_id' => $otherUser->id]);

        $this->actingAs($user)
            ->delete("/api/posts/{$post->id}")
            ->assertForbidden();

        $this->assertDatabaseHas('posts', ['id' => $post->id]);
    }
}
