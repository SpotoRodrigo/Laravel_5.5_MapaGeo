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

        $streamSSL = stream_context_create(array(
            "ssl"=>array(
                "verify_peer"=> false,
                "verify_peer_name"=> false
            )
        ));

/*
        $file_headers = @get_headers($this->url_image);
        if(!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
            $exists = false;
            $result = false;
        }*/
  //      else {
            $exists = true;
   //     }

        if($exists){
            $conteudo  =  file_get_contents( $this->url_image , false, $streamSSL  ) ;
            $result =  Storage::disk('s3VinhedoDoc')->put(  $this->nome_completo  , $conteudo );  // ['ACL' => 'public-read'] 
        }
        
        
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

                case 'CIDADAO':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.CartaoCidadao SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CartaoCidadaoIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'RESERVISTA':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.CarteiraReservista SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE ReservistaIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'CNS':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.Cns SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CnsIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'CPF':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.Cpf SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CpfIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'CTPS':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.Ctps SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CtpsIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;

                case 'LOG_RG':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.Rg SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE RgIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_CNH':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.cnh SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE cnhIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_TITULO':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.TituloEleitor SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE TituloIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_CERTIDAO':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.Certidao SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CertidaoIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_ENDERECO':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_pessoa.PessoaEndereco SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE enderecoIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_PESSOA':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_pessoa.fisica SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE pessoaFisicaIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;

                case 'LOG_CIDADAO':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.CartaoCidadao SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CartaoCidadaoIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_RESERVISTA':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.CarteiraReservista SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE ReservistaIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_CNS':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.Cns SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CnsIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_CPF':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.Cpf SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CpfIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
                case 'LOG_CTPS':
                    DB::connection('BDServicoVinhedo')->update(" UPDATE  log_documentos.Ctps SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CtpsIdentificador = ? ", [ $this->nome_completo , $this->id ]); 
                break;
            }
        }else{
           // $conteudo  =  file_get_contents( $this->url_image ) ;
        }
    }


    /*
    			 documentos.cnh			cnhIdentificador    CNH
		 documentos.TituloEleitor	TituloIdentificador     TITULO
		 documentos.Certidao		CertidaoIdentificador   CERTIDAO
         documentos.Rg				RgIdentificador         RG
         
         SELECT * FROM log_documentos.CartaoCidadao   -- SIM 
            SELECT * FROM log_documentos.CarteiraReservista
            SELECT * FROM log_documentos.Cns
            SELECT * FROM log_documentos.Cpf
            SELECT * FROM log_documentos.Ctps

    */

}
