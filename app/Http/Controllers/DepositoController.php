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
    public function index(Request $Request)
    {
        $deposito = Deposito::orderBy('updated_at', 'desc')->paginate(20);
        $servicos = Deposito::SERVICOS;
        return view('depositos.index',['depositos' => $deposito  , 'servicos' => $servicos ]);
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
        $servico = Deposito::SERVICOS[$Request->input('select')];
        $token = session('token4R',$this->loginIntegrador4R() );
        $identificacao = 1;
        $continua = true ;

        if($servico=='TODOS'){
            //dd('TEM CERTEZA ? ISTO GERARÁ UM GRANDE CARGA NOS SERVIDORES, IMPLEMENTAÇÃO AINDA NÃO REALIZADA, ');
            return redirect()->route('depositos');
        }

        do {
            $retorno = $this->getRequest($token,$servico,$identificacao);
            if($retorno->sucesso){
             //  $deposito = Deposito::where('servico','=', $servico)->where('identificacao','=', $identificacao ) ; // ?  Deposito::find($identificacao) :  new Deposito() ; 
                
                $deposito = Deposito::where('servico','=', $servico)->where('identificacao','=', $identificacao )->first() ;

                if(!$deposito){
                    $deposito = new Deposito();
                }

                $deposito->servico = $servico;
                $deposito->identificacao = $identificacao;
                $data = isset($retorno->{'resposta'}->{'audit_AtualizadoEm'}) ? $retorno->{'resposta'}->{'audit_AtualizadoEm'} : date("Y-m-d h:i:s a", time()) ;
                $deposito->data_objeto =  $data;
                $deposito->objeto = json_encode($retorno->{'resposta'} );

               // dd($deposito);
                $deposito->save();
                $continua = true ;
            }else{
                $continua = false ;
            }
            $identificacao++;
        } while ($continua == true);

        return redirect()->route('depositos');
    }


/*
[{"key":"client_id","value":"200b04dcdde546049e11054d6ce95f7a","description":"","type":"text","enabled":true},
 {"key":"grant_type","value":"password","description":"","type":"text","enabled":true},
 {"key":"scope","value":"FullControl","description":"","type":"text","enabled":true},
 {"key":"username","value":"mitraintegrador","description":"","type":"text","enabled":true},
 {"key":"password","value":"1q2w3e4r5t","description":"","type":"text","enabled":true}]
*/

    public function loginIntegrador4R()
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
        $token = json_decode($response)->{'access_token'};
        session(['token4R' => $token]);

        return $token;
    }

    public function getRequest(string $token , string $servico , string $identificacao )
    {

        $client = new \GuzzleHttp\Client();
      
        $request = $client->get('http://integrador4r.4rsistemas.com.br:91/rest/'. strtolower($servico) .'/'.$identificacao,[
            'headers' => [
                'Authorization' => 'OAuth ' . $token,        
                'Accept'        => 'application/json',
            ] , 'exceptions' => false,
        ]);
        $statuscode = $request->getStatusCode();
        $retorno = new \stdClass();

        switch ($statuscode) {
            case 200: // Successful operation
                $response = $request->getBody()->getContents();
                $retorno->resposta = json_decode($response);
                $retorno->sucesso = true;
                $retorno->mensagem =   $request->getReasonPhrase() ;
                break;
            case 404: //'Data with the specified key could not be found'
                $retorno->mensagem =  $request->getReasonPhrase() ;
                $retorno->sucesso = false;
                break;
            case 400: //'Bad request'
                $retorno->mensagem =  $request->getReasonPhrase() ;
                $retorno->sucesso = false;
                break;
            case 500:  //'Internal server error'
                $retorno->mensagem = $request->getReasonPhrase()  ;
                $retorno->sucesso = false;
                break;
            case 201:  //"Created"
                $retorno->mensagem = $request->getReasonPhrase()  ;
                $retorno->sucesso = false;
                break;                
        }
        return $retorno;   
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

