<?php

namespace App\Http\Controllers;

use App\Models\Ups3;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
//use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\File;
//use App\Jobs\ProcessUpFachada;
//use App\Jobs\ProcessLorena;
use App\Jobs\ProcessParaiso;
//use App\Jobs\ProcessItatiba;
//use App\Jobs\upVinhedoDoc;
//use App\Jobs\setPublicS3;

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
        $images = $this->loopPorPasta();
/*
       // $lista =  DB::connection('BDGeralSSebastiaoImagem')->select("select top 50 * FROM dbo.Imagem where UploadNuvemArquivoPublico = 0 ");
       // $lista =  DB::connection('pgsql_paraiso')->select("select count(*) from apgv.dimensao where dimensao_tipo_id = 24  ");

        //dd($lista);


        $exemplo = '01_01_001_0025_001.jpg';
        $caminho = '/media/geoserver/web/ssparaiso/img/Entregavel_04/';

        $lista = DB::connection('BDGeralSSebastiaoImagem')->select("SELECT REPLACE(SUBSTRING(imagemNomeAnterior,1,18),'_','.' )  AS inscricao   , COUNT(CodImagem) as qtde FROM dbo.Imagem WHERE imagemNomeAnterior = ? GROUP BY REPLACE(SUBSTRING(imagemNomeAnterior,1,18),'_','.' ) " ,[$exemplo] );

        print_r($lista);

        $affected = DB::connection('BDGeralSSebastiaoImagem')->update("UPDATE dbo.Imagem  
        SET  ImagemNome = ?
        , LocalArquivo = 'http://s3.sao01.objectstorage.softlayer.net/ca800d52-3770-4a68-9f84-63a71b9b57c0'
        , UploadNuvemRenomeado = 1 
        , UploadNuvemArquivoNaoLocalizado = 0
        , UploadNuvemArquivoPublico = 1 
        WHERE  imagemNomeAnterior = ?", ['teste'   , $exemplo ]); 
     
        //DB::connection('pgsql_paraiso')->select("SELECT apgv.anexafile(24,?,?,false ) " ,[ $dono , $novo_nome . '.' . $this->extensao  ] );

        print_r($affected);

        dd('PASSOU TUDO');
*/
        return view('ups3.index',compact('images') ); //,compact('images')

    }
    
    
    
    
    
    
     public function indexVinhedo()
    {
      // $images = loopPorPasta();
        $count =0;
     //   $lista = DB::connection('BDGeralLorenaImagem')->select("SELECT top 3 SUBSTRING(imagemNomeAnterior,1,16)  AS inscricao   , COUNT(CodImagem) as qtde FROM dbo.Imagem GROUP BY SUBSTRING(imagemNomeAnterior,1,16) "  );
     //   dd($lista );
        
        $lista =  DB::connection('BDServicoVinhedo')->select("SELECT cnhIdentificador as idd
        ,cnhImagem as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+cnhImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'CNH' as tabela
        , cnh.imagemS3
    FROM documentos.cnh as cnh
    , pessoa.Fisica  as peso
    where cnhImagem is not null    AND cnhImagem <> ''  AND  (cnh.imagemS3 is  null  or  RIGHT ( cnh.imagemS3 , 4 ) !=  RIGHT ( cnh.cnhImagem , 4 )  )
    AND cnh.cnhPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
   
    UNION 
    SELECT TituloIdentificador as idd
        ,TituloImagem as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+TituloImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'TITULO' as tabela
        , Titulo.imagemS3
    FROM documentos.TituloEleitor as Titulo
    , pessoa.Fisica  as peso
    where TituloImagem is not null  AND TituloImagem <> '' AND  (Titulo.imagemS3 is  null  or  RIGHT ( Titulo.imagemS3 , 4 ) !=  RIGHT ( TituloImagem , 4 )  )
    AND Titulo.TituloPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
    UNION 
    SELECT CertidaoIdentificador as idd
        ,CertidaoImagem as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+CertidaoImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'CERTIDAO' as tabela
        , Certidao.imagemS3
    FROM documentos.Certidao as Certidao
    , pessoa.Fisica  as peso
    where CertidaoImagem is not null AND CertidaoImagem <> '' AND  (Certidao.imagemS3 is  null  or  RIGHT ( Certidao.imagemS3 , 4 ) !=  RIGHT ( CertidaoImagem , 4 )  )
    AND Certidao.CertidaoPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
    
    union 
    SELECT RgIdentificador as idd
        ,RgImagem as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+RgImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'RG' as tabela
        , Rg.imagemS3
    FROM documentos.Rg as Rg
    , pessoa.Fisica  as peso
    where RgImagem is not null  AND  RgImagem <> '' AND  (Rg.imagemS3 is  null  or  RIGHT ( Rg.imagemS3 , 4 ) !=  RIGHT ( RgImagem , 4 )  )
    AND Rg.RgPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
  
    UNION 
    Select   emd.enderecoIdentificador as idd 
        , enderecoImagem   as imagem 
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+enderecoImagem  as url_image
        ,CAST( fi.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'ENDERECO' as tabela
        , emd.imagemS3
    from pessoa.PessoaEndereco  as emd
    , pessoa.fisica  as fi
    where emd.enderecoPessoaFisicaIdentificador = fi.pessoaFisicaIdentificador
    and emd.enderecoImagem is not null and emd.enderecoImagem <> ''   AND  (emd.imagemS3 is  null  or  RIGHT ( emd.imagemS3 , 4 ) !=  RIGHT ( enderecoImagem , 4 )  )
    union 
    Select   fi.pessoaFisicaIdentificador as idd 
        , fi.pessoaFisicaFoto   as imagem 
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+ fi.pessoaFisicaFoto  as url_image
        ,CAST( fi.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'PESSOA' as tabela
        , fi.imagemS3
    from  pessoa.fisica  as fi
    where fi.pessoaFisicaFoto is not null and fi.pessoaFisicaFoto <> ''   AND  (fi.imagemS3 is  null  or  RIGHT ( fi.imagemS3 , 4 ) !=  RIGHT ( pessoaFisicaFoto , 4 )  )

    UNION     
    SELECT CartaoCidadaoIdentificador as idd
        ,CartaoCidadaoImagem  as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+CartaoCidadaoImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'CIDADAO' as tabela
        , cnh.imagemS3
    FROM documentos.CartaoCidadao as cnh
    , pessoa.Fisica  as peso
    where CartaoCidadaoImagem is not null   AND CartaoCidadaoImagem <> ''  AND  (cnh.imagemS3 is  null  or  RIGHT ( cnh.imagemS3 , 4 ) !=  RIGHT ( CartaoCidadaoImagem , 4 )  )
    AND cnh.CartaoCidadaoPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
    UNION  
    SELECT ReservistaIdentificador as idd  
        ,ReservistaImagem  as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+ReservistaImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'RESERVISTA' as tabela
        , Titulo.imagemS3
    FROM documentos.CarteiraReservista as Titulo
    , pessoa.Fisica  as peso
    where ReservistaImagem is not null  AND ReservistaImagem <> '' AND  (Titulo.imagemS3 is  null  or  RIGHT ( Titulo.imagemS3 , 4 ) !=  RIGHT ( ReservistaImagem , 4 )  )
    AND Titulo.ReservistaPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
    UNION 
    SELECT CnsIdentificador as idd
        ,CnsImagem  as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+CnsImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'CNS' as tabela
        , Certidao.imagemS3
    FROM documentos.Cns as Certidao
    , pessoa.Fisica  as peso
    where CnsImagem is not null AND CnsImagem <> ''  AND  (Certidao.imagemS3 is  null  or  RIGHT ( Certidao.imagemS3 , 4 ) !=  RIGHT ( CnsImagem , 4 )  )
    AND Certidao.CnsPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
    union  
    SELECT CpfIdentificador as idd
        ,CpfImagem  as imagem
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+CpfImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'CPF' as tabela
        , Rg.imagemS3
    FROM documentos.Cpf as Rg
    , pessoa.Fisica  as peso
    where CpfImagem is not null AND CpfImagem <> '' AND  (Rg.imagemS3 is  null  or  RIGHT ( Rg.imagemS3 , 4 ) !=  RIGHT ( CpfImagem , 4 )  )
    AND Rg.CpfPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
    union 
    SELECT CtpsIdentificador as idd
        ,CtpsImagem  as imagem 
        ,'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'+CtpsImagem  as url_image
        ,CAST( peso.pessoaFisicaIdentificadorUnico AS VARCHAR(MAX) )  as dono
        , 'CTPS' as tabela
        , Rg.imagemS3
    FROM documentos.Ctps as Rg
    , pessoa.Fisica  as peso
    where CtpsImagem is not null   AND CtpsImagem <> '' AND  (Rg.imagemS3 is  null  or  RIGHT ( Rg.imagemS3 , 4 ) !=  RIGHT ( CtpsImagem , 4 )  )
    AND Rg.CtpsPessoaFisicaIdentificador = peso.pessoaFisicaIdentificador
         " );  // AND cpf.imagemS3 is null

        //dd($lista );
         foreach ($lista as $file) {

           //$nome =  substr($file->descricao , strripos($file->descricao , '/') - strlen($file->descricao) +1   ) ;
            $id  = intval($file->idd) ; 
            $dono = strval ($file->dono);
            $aux = 'https://www.mitraonline.com.br/central/modulos/atendimento/arquivos/'. str_replace(  ' ' , '%20' , $file->imagem); 
            $url_image = strval ( $aux ); //$file->url_image

/*
            $file_headers = @get_headers($url_image);
            if(!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
                $exists = false;
            }
            else {
                $exists = true;
            }
*/
            $exists = true;

            if($exists){

                $count++;
                $images[] = [
                    'nome' =>  $id ,
                    'extensao'  => (string) $count,
                    'caminho' => $dono ,
                    'up'      => true
                ];

                $novo_nome = $this->uuid();

                $extensao = strtolower(substr($url_image, -4 ));

                $nome_completo =  $dono . '/' . $novo_nome . $extensao ;

                if($file->imagemS3 !== '' ){
                    Storage::disk('s3Vinhedo')->delete($file->imagemS3 );
                }
                // Storage::disk('s3Vinhedo')->delete($file->imagemS3 );

                
                 $this->dispatch(new upVinhedoDoc($id, $nome_completo ,$url_image , strval($file->tabela) ));  

/*
              $novo_nome = $this->uuid();

              $nome_completo =  $dono . '/' . $novo_nome . '.jpg' ;
      
              $conteudo  =  file_get_contents( $url_image ) ;
                
              //$conteudo  =  fopen($this->caminho , 'r+') ; // metodo indicado para arquivos maiores
      
              $result =  Storage::disk('s3Vinhedo')->put(  $nome_completo  , $conteudo );  // ['ACL' => 'public-read'] 
              
              if ($result!==false){
                  DB::connection('BDServicoVinhedo')->update(" UPDATE  documentos.Ctps SET imagemS3 = CAST(? AS VARCHAR(MAX)) WHERE CtpsIdentificador = ? ", [ $nome_completo , $id ]); 
              }
*/
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


    private function loopPorPasta()
    {

        //$directory = '\\\\192.168.1.4\\Operações\\Clientes\\São Sebastião do Paraiso\\[5] Matrizes de Dados\\Entregavel_02\\';
        //$directory = "F:\\Fachada\\" ;
        //$directory = "F:\\ssparaiso\\Entregavel_02\\" ;

        //$directory = "E:\\fachada\\ssparaiso\\Entregavel_03_SSP\\" ;
        $directory = "/media/geoserver/transferencias/arturnogueira/fotosfachada/" ;
        //$directory = "/media/geoserver/web/lorena/img/fotoFachada/" ;


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
                 //$this->dispatch(new ProcessUpFachada($file->getExtension() , $file->getFilename() , $file->getRealPath()  ));   // $file->getRealPath()     $conteudo
                 $this->dispatch(new ProcessParaiso($file->getExtension() , $file->getFilename() , $file->getRealPath()  ));   // $file->getRealPath()     $conteudo
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

            if ( /*Storage::disk('s3Biri')->exists($file) &&  Storage::disk($Bucket)->getVisibility($file) !=='public'  */ true  ){
                $count++;
                $this->dispatch(new setPublicS3( $Bucket , $file )); 
                $images[] = [
                    'nome' =>  $file,
                    'extensao'  => (string) $count ,
                    'caminho' => 's3Biri',
                    'up'      => $count
                ];
            } 
            Storage::disk($Bucket)->delete($file);
        }

        return $images ;

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
