<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapaController extends Controller
{
    
    public function index($cidade = 'all')
    {
        return view('mapa.mapa')->with('c',$cidade);
    }
}
