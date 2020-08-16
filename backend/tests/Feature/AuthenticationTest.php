<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function get_sanctum_csrf_cookie()
    {
        $this->get('/sanctum/csrf-cookie')->assertCookie('XSRF-TOKEN');
    }

    /** @test */
    public function cannot_access_authenticated_routes_without_authentication()
    {
        factory(User::class)->create();

        $this->get('/sanctum/csrf-cookie');

        $this->get('/api/users/me')->assertStatus(401);
    }

    /** @test */
    public function authenticate()
    {
        /** @var User $user */
        $user = factory(User::class)->create();

        $this->get('/sanctum/csrf-cookie');

        $this->post('/api/authenticate', ['email' => $user->email, 'password' => 'password'])
            ->assertStatus(200);

        $this->get('/api/users/me')
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'name'  => $user->name,
                    'email' => $user->email,
                ]
            ]);
    }

    /** @test */
    public function authentication_fails_with_invalid_credentials()
    {
        $user = factory(User::class)->create();

        $this->get('/sanctum/csrf-cookie');

        $this->post('/api/authenticate', ['email' => $user->email, 'password' => 'passwordz'])
            ->assertStatus(401);
    }

    /** todo: can this be tested? */
    public function authentication_fails_without_sanctum_csrf_cookie()
    {
        $user = factory(User::class)->create();

        $this->post('/api/authenticate', ['email' => $user->email, 'password' => 'password'])
            ->assertStatus(401);
    }
}
