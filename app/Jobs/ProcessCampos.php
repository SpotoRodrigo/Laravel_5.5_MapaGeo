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


class ProcessCampos implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $extensao;
    protected $nome_arquivo;
    protected $caminho;
    protected $novo_nome;

    public $timeout = 300;
    public $memory_limit = 1024;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($extensao , $nome_arquivo , $caminho , $novo_nome )
    {
        $this->extensao = $extensao;
        $this->nome_arquivo = $nome_arquivo;
        $this->novo_nome =$novo_nome;
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
        $lista = DB::connection('BDGeralCamposImagem')->select("SELECT REPLACE(SUBSTRING(imagemNomeAnterior,1,10),'_','.' )  AS inscricao 
                                                                    , COUNT(CodImagem) as qtde 
                                                                    FROM dbo.Imagem 
                                                                    WHERE Assunto = 'Terreno' 
                                                                    AND TipoFoto = 'Foto Fachada Tablet' 
                                                                    AND  imagemNomeAnterior = ? 
                                                                    GROUP BY REPLACE(SUBSTRING(imagemNomeAnterior,1,10),'_','.' )" ,[$this->nome_arquivo] );
//dd($lista );
        if($lista){
            $dono = $lista[0]->inscricao;
            $qtde = $lista[0]->qtde;
            $go = true;
//dd('true');
        }else{
            $go = false;
//dd('false');
            //$conteudo  =  file_get_contents($this->caminho) ;
             //Storage::disk('public_web')->put('nao_localizado2/'. $this->nome_arquivo   , $conteudo , ['ACL' => 'public-read'] );
             //unlink($this->caminho);
             //unset($conteudo);
            //rename($this->caminho , "F:\\Fachada\\nao_localizado\\".$this->nome_arquivo );
            //dd('naoFeito'.$this->nome_arquivo);
             return true;
        }
//dd($go);
        // SE EXISTE ARQUIVO E REGISTRO NO BANCO , SUBO E ATUALIZO BANCO. 
        if(is_file($this->caminho) &&  $go ){

            $conteudo  =  file_get_contents($this->caminho) ;
            //$conteudo  =  fopen($this->caminho , 'r+') ; // metodo indicado para arquivos maiores

           $result =  Storage::disk('s3Campos')->put( $this->novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );
            
            //Storage::disk('public_web')->put('teste/'. $this->novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );

            if($result!==false ){
                sleep(1);
                $affected = DB::connection('BDGeralCamposImagem')->transaction(function () {
                     DB::connection('BDGeralCamposImagem')->update("UPDATE dbo.Imagem  
                    SET  ImagemNome = ?
                    , LocalArquivo = 'http://s3.sao01.objectstorage.softlayer.net/a970d3e6-185d-47ec-9281-69ff92b51b87'
                    , uploads3 = 1 
                    , idUnico = ? 
                    WHERE  imagemNomeAnterior = ?", [ $this->novo_nome . '.' . $this->extensao , $this->novo_nome  , $this->nome_arquivo ]); 
                }, 5 );
            }
            if($result!==false && $affected  !==false ){
                $affected2 = DB::connection('pgsql_campos')->select("SELECT apgv.anexafile(24,?,?,false ) " ,[ $dono , 'a970d3e6-185d-47ec-9281-69ff92b51b87/'. $this->novo_nome . '.' . $this->extensao  ] );
            }
            if($result!==false && $affected  !==false && $affected2  !==false  ){
                unset($conteudo);
                unlink($this->caminho);
            }

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
