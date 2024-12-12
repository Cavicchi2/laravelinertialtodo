<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoItem extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields
    protected $fillable = ['to_do_list_id', 'title', 'completed'];

    /**
     * Define a relationship to ToDoList.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function toDoList()
    {
        return $this->belongsTo(ToDoList::class);
    }

    /**
     * Scope to filter only completed items.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }

    /**
     * Scope to filter only incomplete items.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIncomplete($query)
    {
        return $query->where('completed', false);
    }
}
