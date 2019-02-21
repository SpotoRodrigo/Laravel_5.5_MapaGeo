
@extends('adminlte::page')

@section('title', 'Arquivos S3')

@section('content')

    <table>
    <thead>
    <th> COUNT </th>
    <th> ARQUIVO </th>
    <th> EXTENSAO </th>
    <th> CAMINHO </th>
    </thead>
    <tbody id="myTable">
    @foreach($images as $image)

        <tr>
            <td>{{ $image['count'] }}</td>
            <td>{{ $image['nome'] }}</td>
            <td>{{ $image['extensao'] }}</td>
            <td>{{ $image['caminho'] }}</td>
            @if($image['up']  !== 'true')
                {{-- There is already booking for that dictionary time --}}
                <td>not available</td>
            @else
                <td>available</td>
            @endif
        </tr>

    @endforeach
    </tbody>
    </table>
@stop

@section('css')

@stop

@section('js')

@stop