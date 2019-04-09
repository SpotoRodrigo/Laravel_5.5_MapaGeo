<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposito extends Model
{
    protected $fillable = ['servico','identificacao','data_objeto','objeto'];
    protected $guarded = ['id', 'created_at', 'update_at','deleted_at'];
    protected $table = 'depositos';


    const SERVICOS = [
        -1=> 'TODOS', 
        0 => 'TB_SETOR',
        1 => 'TB_BAIRRO',
        2 => 'TB_EDIFICIO',
        3 => 'TB_QUADRA',
        4 => 'TB_LOGRADOURO',
        5 => 'TB_FACE',

];


}

