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

class upVinhedoDoc implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $id;
    protected $nome_completo;
    protected $url_image;
    protected $tabela;

    public $timeout = 300;
    public $memory_limit = 1024;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct( $id , $nome_completo , $url_image ,$tabela )
    {
        $this->id = $id;
        $this->nome_completo = $nome_completo;
        $this->url_image = $url_image;
        $this->tabela = $tabela;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $conteudo  =  file_get_contents( $this->url_image ) ;
        $result =  Storage::disk('s3Vinhedo')->put(  $this->nome_completo  , $conteudo );  // ['ACL' => 'public-read'] 
        
        if ($result!==false){
            
            
            switch ($this->tabela ) {
                case 'RG':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.Rg SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE RgIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                    break;
                case 'CNH':
                DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.cnh SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE cnhIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                    break;
                case 'TITULO':
                DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.TituloEleitor SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE TituloIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                    break;
                case 'CERTIDAO':
                DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.Certidao SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CertidaoIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                    break;
                case 'ENDERECO':
                DB::connection('BDServicoVinhedo')->update(" UPDATE  pessoa.PessoaEndereco SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE enderecoIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'PESSOA':
                DB::connection('BDServicoVinhedo')->update(" UPDATE  pessoa.fisica SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE pessoaFisicaIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
            }
        }
    }


    /*
    			 documentos.cnh			cnhIdentificador    CNH
		 documentos.TituloEleitor	TituloIdentificador     TITULO
		 documentos.Certidao		CertidaoIdentificador   CERTIDAO
		 documentos.Rg				RgIdentificador         RG
    */

}
