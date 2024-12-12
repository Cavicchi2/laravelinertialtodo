<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ToDoListController;
use App\Http\Controllers\ToDoGroupController;
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

Route::post('/to-do-lists', [ToDoListController::class, 'store']);
Route::post('/to-do-groups', [ToDoGroupController::class, 'store']);
Route::get('/to-do-lists', [ToDoListController::class, 'index']);
Route::get('/to-do-groups', [ToDoGroupController::class, 'index']);

require __DIR__.'/auth.php';
