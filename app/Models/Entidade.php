<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entidade extends Model
{
    protected $table = 'entidades';
    protected $fillable = ['nome','nome_abrev','logo'];
    

    public function camadas(){
        //return $this->belongsTo(Camada::class);

        return $this->hasMany('App\Models\Camada');
    }
}
