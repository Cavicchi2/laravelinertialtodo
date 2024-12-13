<?php

namespace App\Http\Controllers;

use App\Models\ToDoItem;
use App\Models\ToDoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ToDoItemController extends Controller
{
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'list_id' => 'required|integer',
        ]);

        // Create the ToDoItem
        $toDoItem = ToDoItem::create([
            'title' => $validated['title'],
            'to_do_list_id' => $validated['list_id'],
        ]);

        // Return a JSON response
        return response()->json([
            'items' => $toDoItem,
        ]);
    }

    public function index(Request $request)
    {
        $toDoListId = (int) $request->query('list_id');
        $toDoItems = ToDoItem::where('to_do_list_id', $toDoListId)->get();

        return response()->json([
            'items' => $toDoItems,
        ]);
    }

    public function toggleCompletion(Request $request, $id)
    {
        // Validate input
        $validated = $request->validate([
            'done' => 'required|boolean',
        ]);


        // Find the ToDoItem
        $toDoItem = ToDoItem::findOrFail($id)->fresh();

        DB::transaction(function () use ($toDoItem, $validated) {
            // Update the 'done' status
            $toDoItem->completed = (bool) $validated['done'];
            $toDoItem->save();
        });

        // Respond with success
        return response()->json([], 200);
    }
}
