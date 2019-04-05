<?php

namespace App\Http\Controllers;

use App\Models\Deposito;
use Illuminate\Http\Request;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;


class DepositoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $deposito = Deposito::orderBy('created_at', 'desc')->paginate(20);
        $servicos = Deposito::SERVICOS;

        return view('depositos.index',['depositos' => $deposito  , 'servicos' => $servicos ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('depositos.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $deposito = new Deposito;
        $deposito->servico       = $request->servico;
        $deposito->identificacao = $request->identificacao;
        $deposito->data_objeto   = $request->data_objeto;
        $deposito->objeto        = $request->objeto;
        $deposito->save();
        return redirect()->route('depositos.index')->with('message', 'deposito criado com sucesso !');
   
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Deposito  $deposito
     * @return \Illuminate\Http\Response
     */
    public function show(Deposito $deposito)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Deposito  $deposito
     * @return \Illuminate\Http\Response
     */
    public function edit(Deposito $deposito)
    {
        $deposito = Deposito::findOrFail($deposito->id);
        return view('depositos.edit',compact('deposito'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Deposito  $deposito
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Deposito $deposito)
    {
        $deposito = Deposito::findOrFail($deposito->id);
        $deposito->name        = $request->servico;
        $deposito->description = $request->identificacao;
        $deposito->quantity    = $request->data_objeto;
        $deposito->price       = $request->objeto;
        $deposito->save();
        return redirect()->route('depositos.index')->with('message', 'deposito atualizado com sucesso!');
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Deposito  $deposito
     * @return \Illuminate\Http\Response
     */
    public function destroy(Deposito $deposito)
    {
        $deposito = Product::findOrFail($deposito->id);
        $deposito->delete();
        return redirect()->route('depositos.index')->with('alert-success','deposito deletado com sucesso!');
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

    public function sincronizar(Request $Request)
    {
        // dd( Deposito::SERVICOS[$Request->input('select')]);

       // $token = $this->postRequest()->{'access_token'} ;
       //  dd( $this->getRequest($token)  );

       $this->teste();

    }


/*
[{"key":"client_id","value":"200b04dcdde546049e11054d6ce95f7a","description":"","type":"text","enabled":true},
 {"key":"grant_type","value":"password","description":"","type":"text","enabled":true},
 {"key":"scope","value":"FullControl","description":"","type":"text","enabled":true},
 {"key":"username","value":"mitraintegrador","description":"","type":"text","enabled":true},
 {"key":"password","value":"1q2w3e4r5t","description":"","type":"text","enabled":true}]
*/

    public function postRequest()
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('POST', 'http://integrador4r.4rsistemas.com.br:91/oauth/access_token', [
            'form_params' => [
                'client_id' => '200b04dcdde546049e11054d6ce95f7a',
                'grant_type' => 'password',
                'scope' => 'FullControl',
                'username' => 'mitraintegrador',
                'password' => '1q2w3e4r5t',
            ]
        ]);
        $response = $response->getBody()->getContents();
        
        return json_decode($response);
    }

    public function getRequest(string $token)
    {
        $client = new \GuzzleHttp\Client();

        $request = $client->get('http://integrador4r.4rsistemas.com.br:91/rest/tb_bairro/1',[
            'headers' => [
                'Authorization' => 'OAuth ' . $token,        
                'Accept'        => 'application/json',
            ]
        ]);  // strtolower(servico)
        $response = $request->getBody()->getContents();

        return json_decode($response);        
    }

    public function teste()
    {

        //fc09aaca62a50365c45c00d9b48c9b67 
        // Meu ip é 177.18.195.146

        $client = new Client();
        $query_string="http://api.ipstack.com/177.18.195.146?access_key=fc09aaca62a50365c45c00d9b48c9b67";
        $iplocation = $client->get($query_string); //this will be guzzle object

        $iplocation_jsoned=json_decode((string)$client->get($query_string)->getBody()); //this will be a json object

        var_dump($iplocation); //this will dump the result object
        dd($iplocation_jsoned); //this will dump the json object
    }

}

