<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoGroup extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Define a relationship to ToDoList.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function toDoLists()
    {
        return $this->hasMany(ToDoList::class);
    }
}
