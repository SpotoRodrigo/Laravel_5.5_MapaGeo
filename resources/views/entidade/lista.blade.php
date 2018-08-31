@extends('layouts.app')

@section('content')
 
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">ENTIDADES CADASTRADAS   
                    <a type="button" class="btn btn-primary" href="/entidade/novo" >NOVA</a> 
                </div>
                <table style="width:100%; vertical-align: center;   text-align: center;  padding: 5px;  vertical-align: center; " >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>ABREVIAÇÃO</th>
                            <th>LOGO</th>
                            <th>DATA</th>
                            <th>CAMADAS</th>
                            <th>AÇÃO</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse($entidades as $entidade)
                    <tr>
                        <th>{{$entidade->id}}</th>
                        <th>{{$entidade->nome}}</th>
                        <th>{{$entidade->nome_abrev}}</th>
                        <!-- <th>{{$entidade->logo}} </th>   img/20180828181650.jpeg   -->
                        <th> <img src="/img/{{ $entidade->logo or 'sem-foto.gif'  }}" alt="Logo"  height="60" width="60" >  </th>

                        <th>{{$entidade->updated_at}}</th>
                        <th>{{ $entidade->camadas()->count() }}</th>
                        <th>
                            <a type="button" class="btn btn-info  btn-sm" href="\entidade\{{$entidade->id}}\editar" >Editar</a>
                            <a type="button" class="btn btn-danger  btn-sm" href="\entidade\{{$entidade->id}}\excluir" >Excluir</a>
                        </th>
                    </tr>
                    @empty
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <pre>
                    {{var_dump($entidades)}}
                    </pre>

                    @endforelse
                    </tbody>
                    </table>
                <div class="panel-body">

                </div>
            </div>
        </div>
    </div>
</div>
@endsection



