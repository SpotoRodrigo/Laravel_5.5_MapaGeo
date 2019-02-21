<?php

namespace App\Http\Controllers;

use App\Models\Ups3;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
//use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\File;
//use App\Jobs\ProcessUpFachada;
//use App\Jobs\ProcessLorena;
//use App\Jobs\ProcessParaiso;
//use App\Jobs\ProcessItatiba;
//use App\Jobs\ProcessVinhedo;
//use App\Jobs\upVinhedoDoc;
//use App\Jobs\setPublicS3;

use App\Jobs\upVinhedoEmpresaFacil;
//use App\Jobs\ProcessRegistro;
//use App\Jobs\ProcessArtur;
//use App\Jobs\ProcessSocorro;

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
        // $images = $this->loopPorPastaHabitacao();    //  $this->loopPorPastaQuestionario();    // $this->loopPorPastaEmpresaFacil();  //  $this->loopPorPasta(); 
         
        $images = $this->loopBancoLorena(); 


/*
        $buckets = ['s3Paraiso','s3Biri','s3Lorena','s3Itatiba','s3Artur','s3Registro','s3Socorro','s3Slserra','s3Vinhedo','s3Ibitinga'];
        
        $images = [];
        foreach ($buckets as $buck ){
            $images1 = $this->loopBucket($buck);
            array_push($images,$images1);
        }  
        dd($images);
*/

        //$images = $this->loopBancoVinhedoImag();
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
       // return view('ups3.index',compact('images') ); //,compact('images')

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
        //$directory = "E:\\fachada\\ssparaiso\\Entregavel_03_SSP\\" ;
        $directory = "/media/geoserver/transferencias/saolourenco/Fotos de Fachada";
        //$directory = "/media/geoserver/transferencias/arturnogueira/fotosfachada/" ;
        //$directory = "/media/geoserver/transferencias/registro/fotos/" ;
        //$directory = "/media/geoserver/transferencias/socorro/" ;
        //$directory = "/media/geoserver/transferencias/vinhedo/fotos/" ;
        $count= 0;
        dd('falta banco de s�o lourenco.');
///media/geoserver/transferencias/socorro/fotos
///media/geoserver/transferencias/registro/fotos 

        if(!File::isDirectory($directory)) {
            $msg = 'Caminho não acessivél.';
            return view('ups3.index').compact($msg); 
        }
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
                 // $this->dispatch(new ProcessParaiso($file->getExtension() , $file->getFilename() , $file->getRealPath()  ));   // $file->getRealPath()     $conteudo
             }
          
            //  VINHEDO   
            if( is_file($file->getRealPath()) ){
                $this->extensao = $file->getExtension();
                $this->nome_arquivo = $file->getFilename();
                $this->caminho = $file->getRealPath();
                $tt = strpos($this->nome_arquivo , '_') != false ?  strpos($this->nome_arquivo , '_')  : strlen($this->nome_arquivo) ; 
                $aux =  strtoupper  (substr (str_replace('.jpg','',$this->nome_arquivo ) , 0 ,  $tt ) ) ;

                $lista = DB::connection('BDGeralLorenaImagem')->select("SELECT codImagem ,   CadTerPrefNum as inscricao  
                                                                        FROM dbo.imagem 
                                                                        , BDGeralVinhedo.dbo.imovel_territorial
                                                                        WHERE assunto = 'Terreno'
                                                                        AND TipoFoto = 'Foto Fachada' AND uploads3 = 0
                                                                        AND CadTerCodigo = keyfotonumerica 
                                                                        AND descricao  like   (?)  " ,['%'.$aux.'%'] );


                if($lista){
                    $idd  = $lista[0]->codImagem;
                    $dono = $lista[0]->inscricao;
                    $go = true;
                }else{
                    $go = false;
                    $affected = false;
                }
                //dd($go);
                // SE EXISTE ARQUIVO E REGISTRO NO BANCO , SUBO E ATUALIZO BANCO. 
                if(is_file($this->caminho) &&  $go   ){
                   
                    $novo_nome = $this->uuid();
                    $conteudo  =  file_get_contents($this->caminho) ;

                    $result =  Storage::disk('s3Slserra')->put( $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );

                    //Storage::disk('public_web')->put('teste/'. $novo_nome . '.' . $this->extensao  , $conteudo , ['ACL' => 'public-read'] );
                    $affected = DB::connection('BDGeralLorenaImagem')->update("UPDATE dbo.Imagem  
                                                                                SET  ImagemNome =   ? 
                                                                                , LocalArquivo =  'http://s3.sao01.objectstorage.softlayer.net/aa7bd982-f24d-448d-bdcf-1cc7f02f169d' 
                                                                                WHERE assunto = 'Terreno'
                                                                                AND TipoFoto = 'Foto Fachada'
                                                                                AND  codImagem = ?", [$novo_nome . '.' . $this->extensao , $idd ]); 

                  //  DB::connection('pgsql_vinhedo')->select("SELECT apgv.anexafile(25,?,?,false ) " ,[ $dono , 'acdb0896-101b-4a9d-aa32-6d1b134f3961/'. $novo_nome . '.' . $this->extensao  ] );
                        
                    if ($affected){
                        unlink($this->caminho);
                        unset($conteudo);
                    }
                }
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

            if ( /*Storage::disk('s3Biri')->exists($file) &&  Storage::disk($Bucket)->getVisibility($file) !=='public'  */ true  ){
                $count++; 

                /*$images[] = [
                    'count' => (string) $count ,
                    'nome' =>  $file,
                    'extensao'  => '' ,
                    'caminho' => $Bucket ,
                    'up'      => $count
                ];*/
            } 
            //Storage::disk($Bucket)->delete($file);
            //Storage::disk($Bucket)->delete($file);
            // Storage::disk($Bucket)->setVisibility($file, 'public');
            // DB::connection('BDGeralRegistro')->update("UPDATE dbo.spoto SET  verificada =   'S' WHERE  arquivo = ?", [$file  ]); 
             // DB::connection('BDGeralSocorro')->insert(" INSERT INTO dbo.spoto  values(? , ? ) ",  [  $count  , $file  ]); 
        }
        $aux =  'Total de arquivos = '.(string) $count . '  No Bucket -> ' .  $Bucket .'<BR>';
        $images[] = [
            'count' => (string) $count ,
            'nome' =>  $Bucket,
            'extensao'  => $aux ,
            'caminho' => '' ,
            'up'      => 'true'
        ];

        return $images ;

    }

    


    
    
    public function loopBancoVinhedoDoc()
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

    
    public function loopBancoLorena()  
    {
        $count =0;
        $lista =  DB::connection('BDGeralLorenaImagem')->select("SELECT top 10 imag.CodImagem , LocalArquivo, ImagemNome , ImagemNomeAnterior , CadTerPrefNum , CadTerCodigo , keyfoto 
        FROM dbo.imagem AS imag
           , BDGeralLorena.dbo.Imovel_Territorial as imo
      where len(LocalArquivo)>77 
      and assunto = 'Terreno'
      and TipoFoto = 'Foto Fachada'
      and imo.CadTerCodigo = imag.keyFotoNumerica");

       dd($lista );


         foreach ($lista as $file) {

                $count++;
                $images[] = [
                    'nome' =>  $id ,
                    'extensao'  => (string) $count,
                    'caminho' => $dono ,
                    'up'      => true
                ];
                DB::connection('pgsql_lorena')->select("SELECT apgv.anexafile(25,?,?,false ) " ,[ $dono , '39f409a7-da21-4260-a07a-c469a22b707d/'. $novo_nome . '.' . $this->extensao  ] );
         }
      return view('ups3.index',compact('images') ); //,compact('images')
   }

    public function loopBancoVinhedoImag()
    {
        $count =0;
        $lista =  DB::connection('BDGeralVinhedoImagem')->select("SELECT top 1  codImagem AS idd , keyfotonumerica as dono , cast(ImagemNome as char(50 ))  ,  imagemFoto ,   'JPG' as extensao
                                                            FROM dbo.imagem
                                                            WHERE assunto = 'Habitacao'
                                                            AND TipoFoto = 'Documento'
                                                            AND ImagemFoto is not null" );  // AND cpf.imagemS3 is null


    //header('Content-Type: image/x-bmp');
    //echo $lista->imagemFoto;

         foreach ($lista as $file) {

            $conteudo  =   base64_encode($file->imagemFoto) ;
            //dd($conteudo);
            Storage::disk('s3Vinhedo')->put($conteudo  , ['ACL' => 'public-read'] );
            dd(  `<img src="data:image/jpg;base64,<?=$conteudo?>" />` );

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



    private function loopPorPastaEmpresaFacil()
    {

        //$directory = "/media/geoserver/transferencias/vinhedo/empresafacil/abertura";
        //$directory = "/media/geoserver/transferencias/vinhedo/empresafacil/alteracao";
        //$directory = "/media/geoserver/transferencias/vinhedo/empresafacil/encerramento";
        //$directory = "/media/geoserver/transferencias/vinhedo/empresafacil/laudos";
        //$directory = "/media/geoserver/transferencias/vinhedo/empresafacil/liberacaousosolo";
        //$directory = "/media/geoserver/transferencias/vinhedo/empresafacil/recadastramento";

        $count= 0;

        $pastas = array(
            'abertura'      =>  '/media/geoserver/transferencias/vinhedo/empresafacil/abertura' ,
            'alteracao'     =>  '/media/geoserver/transferencias/vinhedo/empresafacil/alteracao',
            'encerramento'  =>  '/media/geoserver/transferencias/vinhedo/empresafacil/encerramento' ,  // 386 
            'laudos'        =>  '/media/geoserver/transferencias/vinhedo/empresafacil/laudos',
            'liberacaousosolo'  => '/media/geoserver/transferencias/vinhedo/empresafacil/liberacaousosolo' ,
            'recadastramento'   =>  '/media/geoserver/transferencias/vinhedo/empresafacil/recadastramento' ,
            //'fora' =>  '/media/geoserver/transferencias/vinhedo/empresafacil/fora' 
        );

        foreach ($pastas as $pasta => $caminho ) {

            if(!File::isDirectory($caminho)) {
                $msg = 'Caminho não acessivél.';
                return view('ups3.index').compact($msg); 
            }

            $files = File::allFiles($caminho);

            foreach ($files as $file) {
                $subiu = false;
                $lista = DB::connection('BDGeralVinhedo')->select(" SELECT cast(idUnico as  VARCHAR(MAX) ) as idUnico  
                                        FROM dbo.DECAMUDocumento 
                                        WHERE  decamuDocNomeArquivoold    = ?  and tipoArquivo is null   " ,[$file->getFilename()] );

                if($lista  != []  ){  // &&  is_file($file->getRealPath()) 
                  //  $idd = $lista[0]->decamuDocCodigo;
                    $idUnico = $lista[0]->idUnico;
                //    $this->dispatch(new upVinhedoEmpresaFacil( $file->getExtension() , $file->getFilename() , $file->getRealPath() , $pasta  , $idd  , $idUnico ));  

                    // INICIO ROTINA QUE PODE SER UM JOB.

                   $this->extensao = $file->getExtension() ; // $extensao;
                   $this->nome_completo =  $file->getFilename() ; // $nome_completo;
                   $this->caminho_completo = $file->getRealPath() ; // $caminho_completo;
                   $this->pasta = $pasta;
                   //$this->idd = $idd;
                   $this->novo_nome =  $idUnico .'.'.  $this->extensao  ; // $novo_nome;

                        $s3 = array(
                            'abertura' =>  's3VinhedoEFAbertura' ,
                            'alteracao' =>  's3VinhedoEFAlteracao',
                            'encerramento' =>  's3VinhedoEFEncerramento' ,
                            'laudos' =>  's3VinhedoEFLaudos',
                            'liberacaousosolo' => 's3VinhedoEFLiberacao' ,
                            'recadastramento' =>  's3VinhedoEFRecadastramento' 
                        );
                        if(is_file($this->caminho_completo)){
                            $conteudo  =  file_get_contents( $this->caminho_completo ) ;
                            $result =  Storage::disk($s3[$this->pasta])->put( $this->novo_nome  , $conteudo );  // ['ACL' => 'public-read'] 
    
                            if ($result!==false){
                                $subiu = true;
                                $update = DB::connection('BDGeralVinhedo')->update(" UPDATE dbo.DECAMUDocumento  SET decamuDocNomeArquivo = CAST(? AS VARCHAR(MAX)) , tipoArquivo = ? ,  idUnico  = CAST(? AS VARCHAR(MAX))   WHERE decamuDocNomeArquivoold = ?  and tipoArquivo is null ", [ $this->novo_nome  , $this->pasta , $idUnico   , $this->nome_completo ]); 
    
                                if($update!==false ){
                                    $conteudo  =  file_get_contents($this->caminho_completo) ;
                                    Storage::disk('public_web')->put('vinhedo/'.$pasta .'/'. $file->getFilename()   , $conteudo , ['ACL' => 'public-read'] );
                                    unlink($this->caminho_completo);
                                    unset($conteudo);
                                }else{
                                    //return false;
                                    dd('falha update banco');
                                }
    
                            }else{
                                //return false;
                                dd('falha subir S3 ');
                            }
                            
                            //return true ;
                        }
 

                }else{  // N�O ACHOU NO BANCO ,,,, (j� subiu ou n�o existe . co)

                    $jasubiu  = DB::connection('BDGeralVinhedo')->select(" SELECT cast(idUnico as  VARCHAR(MAX) ) as idUnico  
                    FROM dbo.DECAMUDocumento 
                    WHERE  decamuDocNomeArquivoold    = ?  and tipoArquivo is not null   " ,[$file->getFilename()] );

                    if($jasubiu  != []  ){
                        $conteudo  =  file_get_contents($file->getRealPath()) ;
                        Storage::disk('public_web')->put('vinhedo/'.$pasta .'/'. $file->getFilename()   , $conteudo , ['ACL' => 'public-read'] );
                        unlink($file->getRealPath());
                        unset($conteudo);
                    }else{
                        // $conteudo  =  file_get_contents($file->getRealPath()) ;
                        // Storage::disk('public_web')->put('perdidoVinhedo/'.$pasta .'/'. $file->getFilename()   , $conteudo , ['ACL' => 'public-read'] );
                        // unlink($file->getRealPath());
                        // unset($conteudo);
                    }

                   
                }

                $count++;
                $images[] = [
                    'count' => (string) $count , 
                    'nome' =>  $file->getFilename() ,
                    'extensao'  =>  $file->getExtension() ,  //  File::extension( $file->getRealPath()),
                    'caminho' => $file->getRealPath(),
                    'up'      => $subiu
                ];
                unset($conteudo ,$result ,$update , $subiu );

            }
        }

    

        return $images ;
    }


    private function loopPorPastaQuestionario()
    {

        $directory = "/media/geoserver/transferencias/vinhedo/questionario";
        $count= 0;

        if(!File::isDirectory($directory)) {
            $msg = 'Caminho não acessivél.';
            return view('ups3.index').compact($msg); 
        }

        $files = File::allFiles($directory);

        foreach ($files as $file) {
            $subiu = false;
            $lista = DB::connection('BDServicoVinhedo')->select(" SELECT  cast(qt.questionarioRespostaIdentificadorUnico as  VARCHAR(MAX) ) as idquest   
                                                                        ,  cast(fl.questionarioRespostaAnexoIdentificadorUnico as  VARCHAR(MAX) ) as idfile 
                                                                        , substring ( arquivo , CHARINDEX('.',arquivo) +1 , len(arquivo)) as extensao
                                                                        , fl.arquivo 
                                                                        , fl.id as id_update 
                                                                    FROM  questionario.questionario_resposta as qt 
                                                                        , questionario.questionario_resposta_anexo as fl
                                                                    WHERE qt.id = fl.questionario_resposta_id
                                                                      AND fl.arquivo = ?  " ,[$file->getFilename()] );

            if($lista  != []  ){
                $idd = $lista[0]->id_update;
                $idUnico = $lista[0]->idfile;
                $idquest = $lista[0]->idquest;


            //    $this->dispatch(new upVinhedoEmpresaFacil( $file->getExtension() , $file->getFilename() , $file->getRealPath() , $pasta  , $idd  , $idUnico ));  

                // INICIO ROTINA QUE PODE SER UM JOB.

                $this->extensao = $file->getExtension() ; // $extensao;
                $this->nome_completo =   $file->getFilename() ; // $nome_completo;
                $this->caminho_completo = $file->getRealPath() ; // $caminho_completo;
                $this->idd = $idd;
                $this->novo_nome =  $idquest .'/'.   $idUnico   .'.'. $file->getExtension() ; 


                if(is_file($this->caminho_completo)){
                    $conteudo  =  file_get_contents( $this->caminho_completo ) ;
                    $result =  Storage::disk('s3VinhedoQuest')->put( $this->novo_nome    , $conteudo );  // ['ACL' => 'public-read'] 

                    if ($result!==false){
                        $subiu = true;
                        $update = DB::connection('BDServicoVinhedo')->update(" UPDATE questionario.questionario_resposta_anexo  SET arquivoS3 = CAST(? AS VARCHAR(MAX))   WHERE id = ? ", [ $this->novo_nome   , $this->idd ]); 

                        if($update!==false ){
                            unlink($this->caminho_completo);
                        }else{
                            //return false;
                            dd('falha update banco');
                        }

                    }else{
                        //return false;
                        dd('falha subir S3 ');
                    }
                    
                    //return true ;
                }


            }else{
                //$conteudo  =  file_get_contents($file->getRealPath()) ;
                //Storage::disk('public_web')->put('vinhedo/'.$pasta .'/'. $file->getFilename()   , $conteudo , ['ACL' => 'public-read'] );
                //unlink($file->getRealPath());
                //unset($conteudo);
            }


            $count++;
            $images[] = [
                'count' => (string) $count , 
                'nome' =>  $file->getFilename() ,
                'extensao'  =>  $file->getExtension() ,  //  File::extension( $file->getRealPath()),
                'caminho' => $file->getRealPath(),
                'up'      => $subiu
            ];
            unset($conteudo ,$result ,$update , $subiu );

        }
        



        return $images ;
    }

    private function loopPorPastaHabitacao()
    {

        $directory = "/media/geoserver/transferencias/vinhedo/habitacao";
        $count= 0;

        if(!File::isDirectory($directory)) {
            $msg = 'Caminho não acessivél.';
            return view('ups3.index').compact($msg); 
        }

        $files = File::allFiles($directory);

        foreach ($files as $file) {
            $subiu = false;
            //$lista = DB::connection('BDGeralVinhedoImagem')->select("SELECT  CAST( serv.servicoIdentificadorUnico as   char(50)  )  as idserv , CAST(fich.codFichaIdentUnico as   char(50)  )     as idfile  , CAST( imag.idunico as  char(50) )  AS idimag , ImagemNome   , codImagem FROM BDGeralVinhedoImagem.dbo.Imagem       as imag  , BDGeralVinhedo.habitacao.FichaHabitacao  as fich  , BDServicoVinhedo.organizacao.Servico     as serv WHERE imag.TipoFoto = 'Documento' AND imag.assunto = 'Habitacao' AND imag.ImagemNome  = ? AND fich.codFicha = imag.keyFotoNumerica and serv.servicoIndetificador = 19 order by imag.ImagemNome  " ,[$file->getFilename()] );
            //$lista = DB::connection('BDGeralVinhedoImagem')->select(" SELECT @@version; " );
            //$lista = DB::connection('BDGeralVinhedoImagem')->select(" SELECT  cast(ImagemNome as char(120)) as imagemnome,  codImagem  FROM dbo.Imagem WHERE   TipoFoto = 'Documento' AND assunto = 'Habitacao' AND 44496 = codImagem    " );
            $lista = DB::connection('BDGeralVinhedoImagem')->select(" SELECT  codImagem 
                                                                            ,cast(uidarquivo as char(36)) uidarquivo 
                                                                            ,cast(uidficha as char(36)) uidficha 
                                                                            ,cast(uidserv as char(36))  uidserv  
                                                                             FROM  dbo.viewDocHabitacao WHERE  ImagemNome  = ?    ",[$file->getFilename()] );

            if($lista  != []  ){
                $idd = $lista[0]->codImagem;
                $uidserv = $lista[0]->uidserv;
                $uidficha = $lista[0]->uidficha;
                $uidarquivo = $lista[0]->uidarquivo;


            //    $this->dispatch(new upVinhedoEmpresaFacil( $file->getExtension() , $file->getFilename() , $file->getRealPath() , $pasta  , $idd  , $idUnico ));  

                // INICIO ROTINA QUE PODE SER UM JOB.

                $this->extensao = $file->getExtension() ; // $extensao;
                $this->nome_completo =   $file->getFilename() ; // $nome_completo;
                $this->caminho_completo = $file->getRealPath() ; // $caminho_completo;
                $this->idd = $idd;
                $this->novo_nome =  $uidserv .'/'.   $uidficha .'/'.   $uidarquivo   .'.'. $file->getExtension() ; 


                if(is_file($this->caminho_completo)){
                    $conteudo  =  file_get_contents( $this->caminho_completo ) ;
                    $result =  Storage::disk('s3VinhedoServ')->put( $this->novo_nome    , $conteudo );  // ['ACL' => 'public-read'] 

                    if ($result!==false){
                        $subiu = true;
                        $update = DB::connection('BDGeralVinhedoImagem')->update(" UPDATE dbo.Imagem  SET localarquivo = CAST(? AS VARCHAR(MAX)) , imagemnome =  null , uploads3 = 1  WHERE codImagem = ? ", [ $this->novo_nome   , $this->idd ]); 

                        if($update!==false ){
                            unlink($this->caminho_completo);
                        }else{
                            //return false;
                            dd('falha update banco');
                        }

                    }else{
                        //return false;
                        dd('falha subir S3 ');
                    }
                    
                    //return true ;
                }

            }else{
                // NAO DISPONIVEL PARA UPDATE NO BANCO, POREM ARQUIVO SEMELHANTE OU IGUAL JA PROCESSADO . SE JA SUBIU DELETA FILE.
                $pasta = 'habitacao';
                $jasubiu  = DB::connection('BDGeralVinhedoImagem')->select("SELECT codimagem 
                                                                            FROM dbo.imagem 
                                                                            WHERE assunto = 'Habitacao' 
                                                                            AND TipoFoto = 'Documento' 
                                                                            AND uploads3 = 1 
                                                                            AND replace( imagemnomeanterior ,'__','_') = replace(? ,'__','_') " ,[$file->getFilename()] );

                if($jasubiu  != []  ){
                   // $conteudo  =  file_get_contents($file->getRealPath()) ;
                   // Storage::disk('public_web')->put('vinhedo/'.$pasta .'/'. $file->getFilename()   , $conteudo , ['ACL' => 'public-read'] );
                    unlink($file->getRealPath());
                   // unset($conteudo);
                }else{
                    // $conteudo  =  file_get_contents($file->getRealPath()) ;
                    // Storage::disk('public_web')->put('perdidoVinhedo/'.$pasta .'/'. $file->getFilename()   , $conteudo , ['ACL' => 'public-read'] );
                    // unlink($file->getRealPath());
                    // unset($conteudo);
                }



                //$conteudo  =  file_get_contents($file->getRealPath()) ;
                //Storage::disk('public_web')->put('vinhedo/'.$pasta .'/'. $file->getFilename()   , $conteudo , ['ACL' => 'public-read'] );
                //unlink($file->getRealPath());
                //unset($conteudo);
            }


            $count++;
            $images[] = [
                'count' => (string) $count , 
                'nome' =>  $file->getFilename() ,
                'extensao'  =>  $file->getExtension() ,  //  File::extension( $file->getRealPath()),
                'caminho' => $file->getRealPath(),
                'up'      => $subiu
            ];
            unset($conteudo ,$result ,$update , $subiu );

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
