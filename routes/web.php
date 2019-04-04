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

Route::group(['prefix'=>'/entidade' ],function(){   ///, 'middleware'=>['auth','can:is-admin']
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


//Route::resource('depositos', 'DepositoController')->middleware('auth');

Route::get('/depositos', 'DepositoController@index' );
Route::post('/depositos/sincronizar', 'DepositoController@sincronizar' );


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::resource('ups3', 'Ups3Controller')->only([
    'index', 'show'
]);

Route::resource('ups3', 'Ups3Controller')->except([
    'create', 'store', 'update', 'destroy'
]);

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


