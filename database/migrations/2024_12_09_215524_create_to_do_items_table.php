<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('to_do_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('to_do_list_id');
            $table->string('title');
            $table->boolean('completed')->default(false);
            $table->timestamps();

            $table->foreign('to_do_list_id')
                ->references('id')
                ->on('to_do_lists')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('to_do_items');
    }

};
