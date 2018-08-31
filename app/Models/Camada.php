<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Camada extends Model
{
    const SERVIDOR_TIPO = [
            0 => 'Generico',
            1 => 'Geoserver_Externo',
            2 => 'Geoserver_Mitra',
    ];
    
    const CONEXAO_TIPO = [
            0 => [
                'funcao' =>  'Pré Programado',
                'descricao' => 'Camadas prontas para uso, e de uso geral, exemplo Mapas base, imagens de satelites .',
                'parametros' => array('identificacao')
            ],
            1 => [
                'funcao' =>  'tileWMS',
                'descricao' => 'Quadriculos de imagem vinda de um servidor publicação geografico.',
                'parametros' => array('env','viewparams','TILED','VERSION','LAYER','STYLE','PROJECTION','SERVICE','FORMAT','EXTENT')
            ],
            2 => [
                'funcao' =>  'Cache WMTS',
                'descricao' => 'Quadriculos de imagem já processada e arquivada para consulta , WMTS GeoServer Cache .',
                'parametros' => array('LAYER','VERSION','LAYER','STYLE','PROJECTION','SERVICE','FORMAT','EXTENT')
            ],
            3 => [
                'funcao' =>  'ImageWMS',
                'descricao' => 'Imagem não quadriculada, usado para imagem processadas em tempo de execução, Exemplo o mancha de Calor .',
                'parametros' => array('VERSION','LAYER','STYLE','PROJECTION','SERVICE','FORMAT','EXTENT')
            ],
            4 => [
                'funcao' =>  'GEOJSON OWS',
                'descricao' => 'Imagem não quadriculada, usado para imagem processadas em tempo de execução, Exemplo o mancha de Calor .',
                'parametros' => array('campoGeometrico','estiloOpenLayer','VERSION','LAYER','STYLE','PROJECTION','SERVICE','FORMAT','EXTENT')
            ]
        ];
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'titulo', 'layer', 'servidor' , 'servidor_tipo' , 'conexao_tipo'
    ];

    public function entidade(){
        // return $this->hasOne(Entidade::class);

        return $this->belongsTo('App\Models\entidade');
    }

}
