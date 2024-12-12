<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ToDoList extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'user_id', 'to_do_group_id'];

    public function items(): HasMany
    {
        return $this->hasMany(ToDoItem::class);
    }

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function toDoGroup()
    {
        return $this->belongsTo(ToDoGroup::class);
    }

}
