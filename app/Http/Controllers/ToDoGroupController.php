<?php

namespace App\Http\Controllers;

use App\Models\ToDoGroup;
use Illuminate\Http\Request;

class ToDoGroupController extends Controller
{
    public function store(Request $request)
    {
        $userId = auth()->id();
        $request->merge(['user_id' => $userId]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ]);


        $toDoGroup = ToDoGroup::create([
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
        ]);

        return response()->json([
            'message' => 'Group created successfully!',
            'groups' => $toDoGroup,
        ]);
    }

    public function index(Request $request)
    {
        $userId = auth()->id();
        $toDoGroups = ToDoGroup::where('user_id', $userId)->get(); // Fetch ToDo groups for the user.

        return response()->json([
            'groups' => $toDoGroups,
        ]);
    }
}
