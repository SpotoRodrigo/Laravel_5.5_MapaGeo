<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class upVinhedoDoc implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($id ,  $dono , $url_image  )
    {
        $this->id = $id;
        $this->dono = $dono;
        $this->url_image = $url_image;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
   
            $novo_nome = $this->uuid();
            $nome_completo =  $this->dono .'/'.$novo_nome . '.jpg' ;
            $conteudo  =  file_get_contents($this->url_image) ;
            //$conteudo  =  fopen($this->caminho , 'r+') ; // metodo indicado para arquivos maiores

            $result =  Storage::disk('s3Vinhedo')->put(   $nome_completo   , $conteudo );  // ['ACL' => 'public-read'] 
            
            if ($result){
                DB::connection('BDServicoVinhedo')->update("  UPDATE  documentos.cpf SET imagemS3 = ? WHERE [cpfIdentificador] = ? ", [ $nome_completo , $this->id ]); 
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
