<?php

namespace App\Http\Controllers;

use App\Models\ToDoList;
use Illuminate\Http\Request;

class ToDoListController extends Controller
{
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $userId = auth()->id();
        $request->merge(['user_id' => $userId]);

        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|integer',
            'group_id' => 'required|integer',
        ]);

        // Create the ToDoList
        $toDoList = ToDoList::create([
            'name' => $validated['name'],
            'user_id' => $validated['user_id'],
            'to_do_group_id' => $validated['group_id'],
        ]);

        // Return a JSON response
        return response()->json([
            'message' => 'To-Do List created successfully!',
            'lists' => $toDoList,
        ]);
    }

    public function index(Request $request)
    {
        // Get the group_id from the query parameter
        $groupId = $request->query('group_id');

        // Fetch ToDoLists for the specified group
        $toDoLists = ToDoList::where('to_do_group_id', $groupId)->get();

        // Fetch stray ToDoLists where group_id is null and user_id matches the authenticated user's ID
//        $strayToDoLists = ToDoList::whereNull('group_id') // Correctly check for null in group_id
//        ->where('user_id', auth()->id()) // Ensure it belongs to the authenticated user
//        ->get();

        // Return both the lists and stray lists
        return response()->json([
            'lists' => $toDoLists,
//            'strayLists' => $strayToDoLists,
        ]);
    }
}
