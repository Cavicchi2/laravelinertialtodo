<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateToDoGroupsTable extends Migration
{
    public function up()
    {
        Schema::create('to_do_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Add user_id column
            $table->timestamps();
        });

        Schema::table('to_do_lists', function (Blueprint $table) {
            $table->unsignedBigInteger('to_do_group_id')->nullable();
            $table->foreign('to_do_group_id')
                ->references('id')
                ->on('to_do_groups')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('to_do_lists', function (Blueprint $table) {
            $table->dropForeign(['to_do_group_id']);
            $table->dropColumn('to_do_group_id');
        });

        Schema::dropIfExists('to_do_groups');
    }
}
