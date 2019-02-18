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




class upVinhedoEmpresaFacil implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $id;
    protected $nome_completo;
    protected $url_image;
    protected $tabela;

    public $timeout = 300;
    public $memory_limit = 1024;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct( $extensao , $nome_completo , $caminho_completo ,$pasta , $idd  , $novo_nome)
    {
        $this->extensao = $extensao;
        $this->nome_completo = $nome_completo;
        $this->caminho_completo = $caminho_completo;
        $this->pasta = $pasta;
        $this->idd = $idd;
        $this->novo_nome = $novo_nome;
    }

    /**  
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $s3 = array(
            'abertura' =>  's3VinhedoEFAbertura' ,
            'alteracao' =>  's3VinhedoEFAlteracao',
            'encerramento' =>  's3VinhedoEFEncerramento' ,
            'laudos' =>  's3VinhedoEFLaudos',
            'liberacaousosolo' => 's3VinhedoEFLiberacao' ,
            'recadastramento' =>  's3VinhedoEFRecadastramento' 
        );
        if(is_file($this->caminho_completo)){
            $conteudo  =  file_get_contents( $this->caminho_completo ) ;
            $result =  Storage::disk($s3[$this->pasta])->put( $this->novo_nome .'.'.  $this->extensao   , $conteudo );  // ['ACL' => 'public-read'] 

            if ($result!==false){
                $update = DB::connection('BDGeralVinhedo')->update(" UPDATE dbo.DECAMUDocumento  SET decamuDocNomeArquivoS3 = CAST(? AS VARCHAR(MAX)) , tipoArquivo = ?   WHERE decamuDocCodigo = ? ", [ $this->novo_nome .'.'. $this->extensao , $this->pasta   , $this->idd ]); 

                if($update!==false ){
                    unlink($this->caminho_completo);
                }else{
                    return false;
                    //dd('falha update banco');
                }

            }else{
                return false;
                //dd('falha subir S3 ');
            }
            unset($conteudo ,$result ,$update );
            return true ;
        }

    }


}
