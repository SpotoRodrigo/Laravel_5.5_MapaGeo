@extends('adminlte::page')

@section('title', 'Depositos')

@section('content')

@foreach($servicos as $servico)

    <h4>{{$servico}}  </h4>

@endforeach




    <table>
    <thead>
    <th> SERVICO </th>
    <th> IDENTIFICACAO </th>
    <th> DATA_OBJETO </th>
    <th> OBJETO </th>
    </thead>
    <tbody id="myTable">
    @foreach($depositos as $deposito)

        <tr>
            <td>{{ $deposito['servico'] }}</td>
            <td>{{ $deposito['identificacao'] }}</td>
            <td>{{ $deposito['data_objeto'] }}</td>
            <td>{{ $deposito['objeto'] }}</td>
        </tr>

    @endforeach
    </tbody>
    </table>
@stop

@section('css')

@stop

@section('js')

@stop