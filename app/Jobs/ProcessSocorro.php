<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Illuminate\Support\Facades\Storage;
//use Illuminate\Database\Schema\DB;
use Illuminate\Support\Facades\DB;

ini_set("max_execution_time",54000);
ini_set("memory_limit","1024M");



class ProcessSocorro implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $extensao;
    protected $nome_arquivo;
    protected $caminho;

    public $timeout = 300;
    public $memory_limit = 1024;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($extensao , $nome_arquivo , $caminho )
    {
        $this->extensao = $extensao;
        $this->nome_arquivo = $nome_arquivo;
        //$this->conteudo = $conteudo;
        $this->caminho = $caminho;

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        // BDGeralLorenaImagem
        //BDGeralLorenaImagem
        //s3Lorena

        // VERIFICO SE EXISTE REGISTRO NO BANCO O ARQUIVO EM PROCESSO.  
        $lista = DB::connection('BDGeralSocorro')->select("SELECT  COUNT(keyfoto) as qtde FROM dbo.Imagem WHERE imagemNomeAnterior = ?  " ,[$this->nome_arquivo] );
//dd($lista );
        if($lista){
            $go = true;
//dd('true');
        }else{
            $go = false;
            return true;
        }
//dd($go);
        // SE EXISTE ARQUIVO E REGISTRO NO BANCO , SUBO E ATUALIZO BANCO. 
        if(is_file($this->caminho) &&  $go ){

            // dd('agora VAI ');         
            $novo_nome = $this->uuid();
            $conteudo  =  file_get_contents($this->caminho) ;

           $result =  Storage::disk('s3Socorro')->put( $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );
            $affected = DB::connection('BDGeralSocorro')->update("UPDATE dbo.Imagem  
                                                                            SET  ImagemNome = ?
                                                                            , LocalArquivo = 'http://s3.sao01.objectstorage.softlayer.net/3ef077e8-fd6f-4ad5-bfef-2a55570b6367'
                                                                            , idUnico = ? 
                                                                            WHERE  imagemNomeAnterior = ?", [$novo_nome . '.' . $this->extensao , $novo_nome  , $this->nome_arquivo ]); 
        unset($conteudo);
        if ($affected){
            unlink($this->caminho);
        }
        return true;
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

///media/geoserver/transferencias/socorro/fotos