@extends('adminlte::page')

@section('title', 'Depositos')

@section('content')

    <!-- <a type="button" class="btn btn-info  btn-sm" >Sincronizar</a> -->

    <form id='form' action="/depositos/sincronizar" method='post'>
        {{csrf_field()}}
        
        <select  form="form" id="select" name="select" class="form-control">
            @foreach($servicos as $key => $servico  )
                <option value={{$key}} > {{$servico}} </option>
            @endforeach
        </select>
        <input type="submit" value="Sincronizar">
    </form>



    <table id="myTable" class="table table-striped table-bordered" style="width:90%">
    <thead>
    <th> SERVICO </th>
    <th> IDENTIFICACAO </th>
    <th> DATA_OBJETO </th>
    <th> OBJETO </th>
    </thead>
    <tbody>
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



    <script> 
        $(document).ready(function() {
            $('#myTable').DataTable();
        } ); 
    </script>
@stop

@section('css')

@stop

@section('js')

@stop