<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
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

        $this->user = factory(User::class)->create();
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
        $data = array_merge(factory(User::class)->make()->only('name', 'email'), [
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
}
