<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Todo extends Model
{
    public function toDoItems(): HasMany
    {
        return $this->hasMany(ToDoItem::class);
    }
}
