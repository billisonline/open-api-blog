<?php

namespace Tests\Feature;

use App\Post;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @var User
     */
    private $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        Post::factory()->create(['author_id' => $this->user->id]);
    }

    /** @test */
    public function show_user()
    {
        $this->get("/api/users/{$this->user->id}")->assertJson([
            'data' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ]
        ]);
    }

    /** @test */
    public function create_user()
    {
        $data = array_merge(User::factory()->make()->only('name', 'email'), [
            'password' => 'password'
        ]);

        $this->post('/api/users', $data)
            ->assertOk()
            ->assertJson([
                'data' => [
                    'name' => $data['name'],
                    'email' => $data['email'],
                ]
            ]);

        $this->assertDatabaseHas('users', ['email' => $data['email']]);
    }

    /** @test */
    public function index_users()
    {
        $this->actingAs($this->user)
            ->get('/api/users')
            ->assertOk()
            ->assertJson([
                'data' => (
                    User::all()
                        ->map(function (User $user) {return $user->only('id', 'name', 'email');})
                        ->toArray()
                )
            ]);
    }

    /** @test */
    public function index_users_with_posts()
    {
        $this->actingAs($this->user)
            ->get('/api/users?withPosts=true')
            ->assertOk()
            ->assertJson([
                'data' => (
                    User::all()
                        ->map(function (User $user) {
                            return [
                                'id'    => $user->id,
                                'name'  => $user->name,
                                'email' => $user->email,
                                'posts' => $user->posts->map(function(Post $post) {
                                    return $post->only('id', 'title', 'body');
                                })->all(),
                            ];
                        })
                        ->toArray()
                )
            ]);
    }
}
