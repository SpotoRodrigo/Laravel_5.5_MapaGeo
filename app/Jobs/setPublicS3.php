<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

ini_set("max_execution_time",54000);
ini_set("memory_limit","1024M");


class setPublicS3 implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $base;
    protected $file;
    public $timeout = 300;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($base , $file )
    {
        $this->base = $base;
        $this->file = $file;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        
      /*  Storage::disk($this->base)->setVisibility( $this->file, 'public');
        ob_flush();
        flush();
        */


      $lista =  DB::connection('pgsql_paraiso')->select("SELECT 'http://s3.sao01.objectstorage.softlayer.net/ca800d52-3770-4a68-9f84-63a71b9b57c0/'||padrao_valor  as descricao -- count(*)
     from apgv.dimensao 
     where dimensao_tipo_id = 24 
     and  inclusao_data > '2018-11-23 11:29:44.518877' 
     order by inclusao_data desc " );
      foreach ($lista as $file) {
        //echo  ($file->descricao);
        $nome =  substr($file->descricao , strripos($file->descricao , '/') - strlen($file->descricao) +1   ) ;
        //  $nome =  substr($file->descricao , - 42 ) ; 
        if ( Storage::disk('s3')->exists($nome ) ){
           // Storage::disk('s3')->setVisibility( $this->file, 'private');
            Storage::disk('s3')->delete( $nome  );
        }else{
           //  dd( 'não existe -> ' . $file->descricao );
            echo   $nome ;
        }
        
      }


        return true;
    }
}

