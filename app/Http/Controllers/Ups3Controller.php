<?php

namespace App\Http\Controllers;

use App\Models\Ups3;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
//use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\File;
use App\Jobs\ProcessUpFachada;
use App\Jobs\setPublicS3;

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
        //$retorno = Storage::disk('s3')->get('641a99d4-5186-4438-8326-e888098452ef.JPG');
       // $retorno = Storage::disk('s3')->size('641a99d4-5186-4438-8326-e888098452ef.JPG');
       // dd($retorno); 

      // Storage::disk('local')->put('file.txt', 'Contents');
      // Storage::disk('local')->put('file.txt', 'Contents');
     // $retorno =  Storage::disk('local')->list();
  
    //      $retorno = Storage::disk('s3')->size('TESTE.png');

   //        Storage::disk('s3')->setVisibility('TESTE.png', 'public') ;


//       dd($retorno); 

/*
      $files = Storage::disk('s3')->files();
      foreach ($files as $file) {
          $images[] = [
              'name' => str_replace('images/', '', $file),
              'src' => '$url' . $file
          ];
      }
*/ 
 //     dd($files);

//$directory = '\\\\192.168.1.4\\Operações\\Clientes\\São Sebastião do Paraiso\\[5] Matrizes de Dados\\Entregavel_02\\';
 //$directory = "F:\\Fachada\\" ;
 //$directory = "F:\\ssparaiso\\Entregavel_02\\" ;

 $directory = "F:\\fachada\\ssparaiso\\falhas\\" ;

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
        $this->dispatch(new ProcessUpFachada($file->getExtension() , $file->getFilename() , $file->getRealPath()  )); ;   // $file->getRealPath()     $conteudo
    }
 }

 //dd($images);
//$this->dispatch(new setPublicS3( 'hoje', 'agora' ));
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
