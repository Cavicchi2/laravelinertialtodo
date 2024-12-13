<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToDoListController;
use App\Http\Controllers\ToDoGroupController;
use App\Http\Controllers\ToDoItemController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/to-do-lists', [ToDoListController::class, 'store'])->middleware(['auth', 'verified']);
Route::post('/to-do-groups', [ToDoGroupController::class, 'store'])->middleware(['auth', 'verified']);
Route::post('/to-do-items', [ToDoItemController::class, 'store'])->middleware(['auth', 'verified']);
Route::get('/to-do-lists', [ToDoListController::class, 'index'])->middleware(['auth', 'verified']);
Route::get('/to-do-groups', [ToDoGroupController::class, 'index'])->middleware(['auth', 'verified']);
Route::get('/to-do-items', [ToDoItemController::class, 'index'])->middleware(['auth', 'verified']);

Route::patch('/to-do-items/{id}/toggle', [ToDoItemController::class, 'toggleCompletion'])->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
