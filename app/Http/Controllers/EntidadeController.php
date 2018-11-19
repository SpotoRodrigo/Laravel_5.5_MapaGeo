<?php

namespace App\Http\Controllers;

use App\Models\Entidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Aws\S3\S3Client;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use League\Flysystem\Filesystem;

class EntidadeController extends Controller
{
    public function index($id=null){

        if(!$id){
            $entidade = Entidade::all();     
        }else{
            // $entidade = array();
            // $entidade['itens'] = array();
            // $entidade['itens'][0] = Entidade::find($id);
            $entidade = Entidade::all();
        }
        if(\Gate::denies('update-entidade',$entidade) ){
            abort(403,'Usuario não permitido.');
        }

        return view('entidade.lista')->with('entidades',$entidade);
    }

    public function novo($id=null){
        $entidade = '{}';
        return view('entidade.form')->with('entidade',$entidade);
    }

    public function editar($id=null){
        if($id){
            $entidade = Entidade::find($id);
            return view('entidade.form')->with('entidade',$entidade);
        }else{
            return view('entidade.form');
        }
    }

    public function salvar(Request $request){
        
        //dd($request->All());

        if($request->id){
            $entidade = Entidade::find($request->id); 
        }else{
            $entidade = new Entidade();
        }
       
        $entidade->nome = $request->nome;
        $entidade->nome_abrev = $request->nome_abrev;
        $arquivo = $request->file('url');

        $original_name = $arquivo->getClientOriginalName();
        $file_path = $arquivo->getPathName();

        $ext = ['jpg','jpeg','gif','bmp','png'];
        if(!is_null($arquivo) and  $arquivo->isValid() and in_array($arquivo->extension(),$ext) ){
            $aux_ext = $arquivo->extension();

            $imageFileName = time() . '.' . $arquivo->getClientOriginalExtension();


            $novo_name = (string) (new \DateTime())->format('YmdHisu') . '.' . $aux_ext ;
            $novo_name = 'TESTE' . '.' . $aux_ext ;
            
            $arquivo->storeAs('img', $novo_name );
           // Storage::disk('s3')->put($novo_name, 'TESTE');
            $entidade->logo = $novo_name ;

           // $exists = Storage::disk('s3')->exists($novo_name);


                $client = S3Client::factory([
                    'credentials' => [
                        'key'    => 'nZwcZUh8lVyTPTr6bAtI',
                        'secret'  => 'liEJn5bXKrjw46ZmStVJBV0GAcfpSkVxxRsRpxRJ',
                        
                    ],
                    'region' => 'sao01',
                    'version' => '2006-03-01',
                    'endpoint' => 'http://s3.sao01.objectstorage.softlayer.net/',
                    'sslEnabled'=> true
                ]);
                
                $adapter = new AwsS3Adapter($client, 'da65f4fe-e1c8-4aaa-a8df-ef17a7d03462', '');

                $filesystem = new Filesystem($adapter ); // ['visibility' => 'public']
                

                //$exists = $filesystem->has('70B922B0-431D-425A-805E-473FE75C7144.JPG');             
                //dd($exists);

                  //   dd($arquivo);

                 $response = $filesystem->put($novo_name ,    file_get_contents($arquivo) , ['ACL' => 'public-read']  );



                $exists = $filesystem->has($novo_name);   

                if($exists){
                    $response = $filesystem->getSize($novo_name);
                    dd($novo_name.$response);
                }

              //  $response = $filesystem->getSize('641a99d4-5186-4438-8326-e888098452ef.JPG');
                
             //   dd($response);

             //  http://s3.sao01.objectstorage.softlayer.net/da65f4fe-e1c8-4aaa-a8df-ef17a7d03462/70B922B0-431D-425A-805E-473FE75C7144.JPG

        }


  

        if( !is_null($entidade->nome)  and !is_null($entidade->nome_abrev) ){
            $entidade->save();
        }
        return redirect('entidade');
    }

    public function excluir($id){
        $entidade = Entidade::find($id);
        if(!$entidade){
            abort(404);
        }
        $entidade->delete();
        //return $this->index();
        return redirect('entidade');
    }
}
