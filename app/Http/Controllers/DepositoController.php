<?php

namespace App\Http\Controllers;

use App\Models\Deposito;
use Illuminate\Http\Request;

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
        return view('depositos.index',['depositos' => $deposito  , 'servicos' => $servicos]);
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
}
