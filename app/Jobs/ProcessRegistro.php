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


class ProcessRegistro implements ShouldQueue
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
        $lista = DB::connection('BDGeralRegistro')->select("SELECT cast(SUBSTRING(imagemNomeAnterior,1,13) as text)  AS inscricao   , COUNT(CodImagem) as qtde FROM dbo.Imagem WHERE imagemNomeAnterior = ? GROUP BY SUBSTRING(imagemNomeAnterior,1,13) " ,[$this->nome_arquivo] );
        if($lista){
            $dono = $lista[0]->inscricao;
            $qtde = $lista[0]->qtde;
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

           $result =  Storage::disk('s3Registro')->put( $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );
            
            //Storage::disk('public_web')->put('teste/'. $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );

            $affected = DB::connection('BDGeralRegistro')->update("UPDATE dbo.Imagem  
                                                                            SET  ImagemNome = ?
                                                                            , LocalArquivo = 'http://s3.sao01.objectstorage.softlayer.net/89b230d3-12a6-4db4-ae32-7426a3953ea8'

                                                                            WHERE  imagemNomeAnterior = ?", [$novo_nome . '.' . $this->extensao , $this->nome_arquivo  ]); 
     
        DB::connection('pgsql_registro')->select("SELECT apgv.anexafile(24,?,?,false ) " ,[ $dono , '89b230d3-12a6-4db4-ae32-7426a3953ea8/'. $novo_nome . '.' . $this->extensao  ] );
        unset($conteudo);
        if ($affected){
            unlink($this->caminho);
        }
       // ob_flush();
        //dd('feito');
        return true;

        } /*else if(!$go ){
             return false;
             dd('NAO LOCALIZADO NO BANCO');
            
            
        }else{
            return false;
            dd( 'ARQUIVO N�?O ENCONTRADO -> '.$this->caminho  );
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


///media/geoserver/transferencias/registro/fotos 




/*
 //      REGISTRO 
 //      ESTE SCRIPT FOI RODADO DIRETO NO CONTROLLER POR ERRO DE DATABASE NOS JOBS
if(is_file($file->getRealPath()) ){
                $this->extensao = $file->getExtension();
                $this->nome_arquivo = $file->getFilename();
                $this->caminho = $file->getRealPath();
  

                //$lista = DB::connection('BDGeralSocorro')->select("SELECT SUBSTRING(imagemNomeAnterior,1,13)  AS inscricao   FROM dbo.Imagem WHERE imagemNomeAnterior = ? " ,[$this->nome_arquivo] );
                $lista = DB::connection('BDGeralRegistro')->select("SELECT cast(SUBSTRING(imagemNomeAnterior,1,13) as text)  AS inscricao  FROM dbo.Imagem WHERE imagemNomeAnterior = ? and len(ImagemNome)   = 40 and len(LocalArquivo) = 80   " ,[$this->nome_arquivo] );

              
                if($lista){
                    //$dono = $lista[0]->inscricao;
                    $go = true;
                    unlink($this->caminho);
                //dd('true');
                }else{
                    $go = false;
                }
                //dd($go);
                // SE EXISTE ARQUIVO E REGISTRO NO BANCO , SUBO E ATUALIZO BANCO. 
                if(is_file($this->caminho) &&  $go ){

                    // dd('agora VAI ');         
                    $novo_nome = $this->uuid();
                    $conteudo  =  file_get_contents($this->caminho) ;

                  $result =  Storage::disk('s3Registro')->put( $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );
                    
                    //Storage::disk('public_web')->put('teste/'. $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );

                    $affected = DB::connection('BDGeralRegistro')->update("UPDATE dbo.Imagem  
                                                                                    SET  ImagemNome =   ?  
                                                                                    , LocalArquivo =  'http://s3.sao01.objectstorage.softlayer.net/89b230d3-12a6-4db4-ae32-7426a3953ea8' 
                                                                                    WHERE  imagemNomeAnterior = ?", [$novo_nome . '.' . $this->extensao , $this->nome_arquivo  ]); 

                DB::connection('pgsql_registro')->select("SELECT apgv.anexafile(24,?,?,false ) " ,[ $dono , '89b230d3-12a6-4db4-ae32-7426a3953ea8/'. $novo_nome . '.' . $this->extensao  ] );
                unset($conteudo);
                if ($affected){
                    unlink($this->caminho);
                }
            }
        }
*/
