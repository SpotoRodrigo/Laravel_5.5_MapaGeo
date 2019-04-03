@extends('adminlte::page')

@section('title', 'Entidade criação')
@section('content')

<!-- @extends('layouts.app') -->

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">ENTIDADES CADASTRO</div>

                <div class="panel-body">

                <form action="/entidade/salvar" method="post" enctype="multipart/form-data">
                        <!-- <imput type="hiden" name='_token' value="$crsToken"> -->
                        {!! csrf_field() !!}
                        <input type="hidden" name="id" id="id"  value="{{$entidade->id or '' }}" />
                        <label for="nome">NOME</label>
                        <input type="text" name="nome" id="nome" value="{{$entidade->nome or ''}}"  />
                        <br>
                        <label for="nome_abrev">ABREVIAÃ‡ÃƒO</label>
                        <input type="text" name="nome_abrev" id="nome_abrev"  value="{{$entidade->nome_abrev or ''}}" />
                        <br>
                        <label for="url">LOGO</label>
                        <input type="file" name="url" id="url"  value="{{''}}" />
                        <br>
                      
                            <img src="/img/{{ $entidade->logo or 'sem-foto.gif' }}" alt="Logo"  height="60" width="60" > 
                        <!-- <img src="/img/sem-foto.gif" alt="Logo"  height="60" width="60" >  -->
                        <br>
                        <!-- <a type="submit" >Enviar</a>  -->
                        <!-- class="btn btn-success"  role="button"  -->
                        <button type="submit"  class="btn btn-success"  >Enviar</button>
                        <a type="button"  class="btn btn-danger"  href="/entidade" >Cancelar</a>
                        
                    </form>  

                </div>
            </div>
        </div>
    </div>
</div>
@endsection