# Laravel OpenAPI Blog

This demo app uses the [Laravel OpenAPI library](https://github.com/billisonline/laravel-open-api) to auto-generate a Typescript/Axios client for a Laravel API backend, allowing a Typescript/React frontend to interact with it.

## Setup

(These are manual setup instructions—Docker coming later)

1. Install the backend:

```shell
cd backend
composer install
```

2. As you normally would with a Laravel app, modify the created `.env` to connect the backend to a database.

3. Create a user account using `php artisan tinker`:

```
Psy Shell v0.10.4 (PHP 7.4.10 — cli) by Justin Hileman
>>> App\User::create(['name' => 'Bill Yanelli', 'email' => 'bill.yanelli@gmail.com', 'password' => Hash::make('password')])
```

4. Install the frontend:

```shell
cd frontend
npm install
```

5. Start the backend:

```shell
cd backend

# for now, the frontend is hard-coded to use port 8000
# if you specify a different port here, you must change it manually
php artisan serve
```

6. Start the frontend:

```shell
cd frontend
npm start
```

7. Browse to [http://127.0.0.1:3000](http://127.0.0.1:3000).