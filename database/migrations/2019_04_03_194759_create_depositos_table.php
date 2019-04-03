<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDepositosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('depositos', function (Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->string('servico', 30 )->unsigned();;
            $table->char('identificacao', 20 )->unsigned();;
            $table->dateTime('data_objeto');
            $table->json('objeto');
            $table->timestamps();
            $table->softDeletes();	

            $table->primary(array('servico', 'identificacao'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('depositos');
    }
}
