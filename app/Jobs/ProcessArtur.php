<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Illuminate\Support\Facades\Storage;
//use Illuminate\Support\Facades\DB;
//use Illuminate\Support\Facades\File;
use Illuminate\Database\Schema\DB;

ini_set("max_execution_time",54000);
ini_set("memory_limit","1024M");


class ProcessArtur implements ShouldQueue
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
        // VERIFICO SE EXISTE REGISTRO NO BANCO O ARQUIVO EM PROCESSO.  
        $lista = DB::connection('BDGeralArturNogueira')->select("SELECT keyfoto  AS inscricao  FROM dbo.Imagem WHERE imagemNomeAnterior = ?  " ,[$this->nome_arquivo] );
        if($lista){
            $go = true;
        }else{
            $go = false;
            //$conteudo  =  file_get_contents($this->caminho) ;
            //Storage::disk('public_web')->put('nao_localizado2/'. $this->nome_arquivo   , $conteudo , ['ACL' => 'public-read'] );
            //unlink($this->caminho);
            //unset($conteudo);
            //rename($this->caminho , "F:\\Fachada\\nao_localizado\\".$this->nome_arquivo );
            //dd('naoFeito'.$this->nome_arquivo);
            return true;
        }
        // SE EXISTE ARQUIVO E REGISTRO NO BANCO , SUBO E ATUALIZO BANCO. 
        if(is_file($this->caminho) &&  $go ){
            $novo_nome = $this->uuid();
            $conteudo  =  file_get_contents($this->caminho) ;
            $result =  Storage::disk('s3Artur')->put( $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );
            $affected = \DB::connection('BDGeralArturNogueira')->update("UPDATE dbo.Imagem  
                                                                            SET  ImagemNome = ?
                                                                            , LocalArquivo = 'http://s3.sao01.objectstorage.softlayer.net/70e17193-8514-4acb-8dee-9f57170debfc'
                                                                            , idUnico = ? 
                                                                            WHERE  imagemNomeAnterior = ?", [$novo_nome . '.' . $this->extensao , $novo_nome  , $this->nome_arquivo ]); 

            unset($conteudo);
            if ($affected){
                unlink($this->caminho);
            }
            return true;
        }else{
            return false;
            dd( 'ARQUIVO NÃ?O ENCONTRADO -> '.$this->caminho  );
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

//  /media/geoserver/transferencias/arturnogueira/fotosfachada    11.529 