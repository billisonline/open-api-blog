<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use App\User;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title'     => $faker->text(50),
        'body'      => $faker->paragraphs(5, true),
        'author_id' => function () {return factory(User::class)->create()->id;}
    ];
});
