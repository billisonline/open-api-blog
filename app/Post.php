<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property User author
 */
class Post extends Model
{
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
