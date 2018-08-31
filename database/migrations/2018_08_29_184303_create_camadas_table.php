<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCamadasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('camadas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titulo');
            $table->string('layer');
            $table->string('servidor');
            $table->smallinteger('servidor_tipo');
            $table->smallinteger('conexao_tipo');
            $table->text('info')->nullable('Campo para informação sobre a camada.');

            $table->integer('entidade_id')->unsigned();
            $table->foreign('entidade_id')->references('id')->on('entidades');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('camadas');
    }
}
