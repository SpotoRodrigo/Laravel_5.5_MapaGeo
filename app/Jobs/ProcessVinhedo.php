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


class ProcessVinhedo implements ShouldQueue
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
        $lista = DB::connection('BDGeralVinhedoImagem')->select("SELECT codImagem ,   CadTerPrefNum as inscricao , sequencia 
                                                                        FROM dbo.imagem 
                                                                        , BDGeralVinhedo.dbo.imovel_territorial
                                                                        WHERE assunto = 'Terreno'
                                                                        AND TipoFoto = 'Foto Fachada'
                                                                        AND LEN(LocalArquivo) < 60 
                                                                        AND CadTerNumLote = keyfotonumerica 
                                                                AND  imagemNomeAnterior = ?  " ,[$this->nome_arquivo] );
//dd($lista );
        if($lista){
            $dono = $lista[0]->inscricao;
            $idd = $lista[0]->codImagem;
            $go = true;
//dd('true');
        }else{
            $go = false;
            return true;
        }
//dd($go);
        // SE EXISTE ARQUIVO E REGISTRO NO BANCO , SUBO E ATUALIZO BANCO. 
        if(is_file($this->caminho) &&  $go ){

            $novo_nome = $this->uuid();
            $conteudo  =  file_get_contents($this->caminho) ;
            $result =  Storage::disk('s3Vinhedo')->put( $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );

            $affected = DB::connection('BDGeralVinhedoImagem')->update("UPDATE dbo.Imagem  
                                                                        SET  ImagemNome =   ? 
                                                                        , LocalArquivo =  'http://s3.sao01.objectstorage.softlayer.net/acdb0896-101b-4a9d-aa32-6d1b134f3961' 
                                                                        WHERE assunto = 'Terreno'
                                                                        AND TipoFoto = 'Foto Fachada'
                                                                        AND LEN(LocalArquivo) < 60  
                                                                        AND  codImagem = ?", [$novo_nome . '.' . $this->extensao , $idd ]); 

            DB::connection('pgsql_vinhedo')->select("SELECT apgv.anexafile(25,?,?,false ) " ,[ $dono , 'acdb0896-101b-4a9d-aa32-6d1b134f3961/'. $novo_nome . '.' . $this->extensao  ] );

        //fclose($this->caminho);
        unset($conteudo);
        if ($affected){
           // unlink($this->caminho);
        }
       // ob_flush();
        //dd('feito');
        return true;
        } /*else if(!$go ){
             return false;
             dd('NAO LOCALIZADO NO BANCO');
        }else{
            return false;
            dd( 'ARQUIVO NÃ?O ENCONTRADO -> '.$this->caminho  );
        }*/
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
