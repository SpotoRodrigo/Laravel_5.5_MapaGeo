<?php

namespace App\Http\Controllers;

use App\Models\Ups3;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
//use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\File;
use App\Jobs\ProcessUpFachada;
use App\Jobs\ProcessLorena;
use App\Jobs\ProcessItatiba;
use App\Jobs\upVinhedoDoc;
use App\Jobs\setPublicS3;

use Illuminate\Support\Facades\DB;

ini_set("max_execution_time",54000);
ini_set("memory_limit","1024M");

class Ups3Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


        // $images = loopPorPasta();
        $count =0;

     //   $lista = DB::connection('BDGeralLorenaImagem')->select("SELECT top 3 SUBSTRING(imagemNomeAnterior,1,16)  AS inscricao   , COUNT(CodImagem) as qtde FROM dbo.Imagem GROUP BY SUBSTRING(imagemNomeAnterior,1,16) "  );
     //   dd($lista );
        
        $lista =  DB::connection('BDGeralVinhedo')->select("SELECT top 10 [cpfIdentificador] as idd
                                                                    ,[cpfNumero]
                                                                    ,[cpfFonteData]
                                                                    ,[cpfImagem]
                                                                    , 'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+[cpfImagem]  as url_image
                                                                    , peso.pessoaFisicaIdentificadorUnico  as dono
                                                                FROM [BDServicoVinhedo].[documentos].[Cpf] as cpf
                                                                , [BDServicoVinhedo].pessoa.Fisica  as peso
                                                                where [cpfImagem] is not null  
                                                                AND cpf.cpfPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
                                                                AND cpf.cpfAtivo = 1
                                                                order  by [cpfFonteData] asc  " );  // AND cpf.imagemS3 is null

dd($lista );
         foreach ($lista as $file) {

           //$nome =  substr($file->descricao , strripos($file->descricao , '/') - strlen($file->descricao) +1   ) ;
            $id  = $file->idd; 
            $dono = $file->dono;
            $url_image = $file->url_image;

            if(is_file($url_image ) ){

                $count++;
                $images[] = [
                    'nome' =>  $file->cpfNumero ,
                    'extensao'  => (string) $count,
                    'caminho' => $url_image ,
                    'up'      => true
                ];

                $this->dispatch(new upVinhedoDoc( $id ,  $dono , $url_image ));  
            }

         }

      return view('ups3.index',compact('images') ); //,compact('images')

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Ups3  $ups3
     * @return \Illuminate\Http\Response
     */
    public function show(Ups3 $ups3)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ups3  $ups3
     * @return \Illuminate\Http\Response
     */
    public function edit(Ups3 $ups3)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ups3  $ups3
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ups3 $ups3)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ups3  $ups3
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ups3 $ups3)
    {
        //
    }


    private function loopPorPasta ()
    {

        //$directory = '\\\\192.168.1.4\\Operações\\Clientes\\São Sebastião do Paraiso\\[5] Matrizes de Dados\\Entregavel_02\\';
        //$directory = "F:\\Fachada\\" ;
        //$directory = "F:\\ssparaiso\\Entregavel_02\\" ;

        //$directory = "E:\\fachada\\ssparaiso\\Entregavel_03_SSP\\" ;
        $directory = "/media/geoserver/web/itatiba/img/fotoFachada/" ;


        if(!File::isDirectory($directory)) {
            $msg = 'Caminho não acessivél.';
            return view('ups3.index').compact($msg); 
        }
        $count= 0;
        $files = File::allFiles($directory);
        foreach ($files as $file) {
            $count++;
            $images[] = [
                'nome' =>  $file->getFilename() ,
                'extensao'  => (string) $count,
                'caminho' => $file->getRealPath(),
                'up'      => true
            ];

            // $conteudo  =  base64_encode(file_get_contents( $file->getRealPath() )) ;

            if(is_file($file->getRealPath()) ){
                $this->dispatch(new ProcessItatiba($file->getExtension() , $file->getFilename() , $file->getRealPath()  ));   // $file->getRealPath()     $conteudo
            }
        }
        return $images ;
    }

    private function loopBucket(string $Bucket)
    {
        // LOOP FOR BUCKET  LIMPANDO, (setando PUBLIC)  
         $count = 0;
         $files = Storage::disk($Bucket)->allFiles();
         foreach ($files as $file) {
            
             //Storage::disk('s3')->delete($file);
             // Storage::disk('s3Biri')->setVisibility($file, 'public');

            if ( /*Storage::disk('s3Biri')->exists($file) && */ Storage::disk($Bucket)->getVisibility($file) !=='public'  ){
                $count++;
                $this->dispatch(new setPublicS3( $Bucket , $file )); 
                $images[] = [
                    'nome' =>  $file,
                    'extensao'  => (string) $count ,
                    'caminho' => 's3Biri',
                    'up'      => $count
                ];
            }  
        }

        return $images ;

    }
}
