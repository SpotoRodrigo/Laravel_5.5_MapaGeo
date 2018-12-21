<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;


class upVinhedoDoc implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $id;
    protected $nome_completo;
    protected $url_image;

    public $timeout = 300;
    public $memory_limit = 1024;



    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct( $id , $nome_completo , $url_image  )
    {
        $this->id = $id;
        $this->nome_completo = $nome_completo;
        $this->url_image = $url_image;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $conteudo  =  file_get_contents( $this->url_image ) ;
        $result =  Storage::disk('s3Vinhedo')->put(  $this->nome_completo  , $conteudo );  // ['ACL' => 'public-read'] 
        
        if ($result!==false){
            DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.cpf SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE cpfIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
        }

    }

    private function uuid()
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

}
