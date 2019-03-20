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


class ProcessItatibaEmpresaFacil implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $extensao;
    protected $nome_completo;
    protected $caminho_completo;
    protected $pasta;
    protected $idd;
    protected $novo_nome;

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
            'abertura' =>  's3ItatibaEFAbertura' ,
            'alteracao' =>  's3ItatibaEFAlteracao',
            'encerramento' =>  's3ItatibaEFEncerramento' ,
            'laudos' =>  's3ItatibaEFLaudos',
            'liberacaousosolo' => 's3ItatibaEFLiberacao' ,
            'recadastramento' =>  's3ItatibaEFRecadastramento' 
        );
        if(is_file($this->caminho_completo)){
            $conteudo  =  file_get_contents( $this->caminho_completo ) ;
            $result =  Storage::disk($s3[$this->pasta])->put( $this->novo_nome .'.'.  $this->extensao   , $conteudo );  // ['ACL' => 'public-read'] 

            if ($result!==false){
                $update = DB::connection('BDGeralItatiba')->update(" UPDATE dbo.DECAMUDocumento  SET decamuDocNomeArquivoS3 = CAST(? AS VARCHAR(MAX)) , tipoArquivo = CAST(? AS CHAR(10))   WHERE decamuDocNomeArquivo = CAST(? AS VARCHAR(100))", [ $this->novo_nome .'.'. $this->extensao , $this->pasta   , $this->nome_completo ]); 

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
