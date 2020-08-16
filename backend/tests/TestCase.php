<?php

namespace Tests;

use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Laravel\Sanctum\Sanctum;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected $defaultHeaders = ['Accept' => 'application/json'];

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function actingAs(UserContract $user, $driver = null)
    {
        Sanctum::actingAs($user);

        return $this;
    }
}
