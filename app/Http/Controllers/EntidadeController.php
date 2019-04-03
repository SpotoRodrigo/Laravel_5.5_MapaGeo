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
        // if(\Gate::denies('update-entidade',$entidade) ){
        //     abort(403,'Usuario não permitido.');
        // }

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

        $ext = ['jpg','jpeg','gif','bmp','png'];

        if(!is_null($arquivo) and  $arquivo->isValid() and in_array($arquivo->extension(),$ext) ){
            $original_name = $arquivo->getClientOriginalName();
            $file_path = $arquivo->getPathName();
            $aux_ext = $arquivo->extension();
            $imageFileName = time() . '.' . $arquivo->getClientOriginalExtension();
            $novo_name = (string) (new \DateTime())->format('YmdHisu') . '.' . $aux_ext ;
            $arquivo->storeAs('img', $novo_name );
            Storage::disk('public_web')->put( 'img/'. $novo_name   , file_get_contents($arquivo)  , ['ACL' => 'public-read'] );
            $entidade->logo = $novo_name ;
            $exists = Storage::disk('public_web')->exists($novo_name);

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
