<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['prefix'=>'/'],function(){
    Route::get('/', function () {
        return view('welcome');
    }); 
});

Route::group(['prefix'=>'/entidade' , 'middleware'=>['auth','can:is-admin'] ],function(){
    Route::get('/novo', 'EntidadeController@novo' );
    Route::get('/novo/{id?}', 'EntidadeController@novo' );
    Route::post('/salvar', 'EntidadeController@salvar' );  
    Route::get('/{id?}/editar', 'EntidadeController@editar' );
    Route::get('/{id?}/excluir', 'EntidadeController@excluir' );
    Route::get('/{id?}', 'EntidadeController@index' );    
});

Route::group(['prefix'=>'/mapa'],function(){
    Route::get('/{cidade?}', 'MapaController@index' );    
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
