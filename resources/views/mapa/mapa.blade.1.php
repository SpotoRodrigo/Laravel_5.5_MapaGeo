
@extends('adminlte::page')

@section('title', 'Mapa')

@section('content')

   	<div class="row">
				
				<div class="container-fluid">
					<div class="row">
						<div class="alert-group">
							<div class="alert alert-success alert-dismissable">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								<i class="glyphicon glyphicon-ok"></i>
								<strong>Parabéns</strong> Você acessou o sistema com exito.
							</div>
							<div class="alert alert-info alert-dismissable">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								<i class="glyphicon glyphicon-info-sign"></i>
								<strong>Atenção!</strong> Esse alerta não deveria ser visualizado, ouve algo não programado.
							</div>
							<div class="alert alert-warning alert-dismissable">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								<i class="glyphicon glyphicon-warning-sign"></i>
								<strong>Atenção!</strong> Melhor você entrar em contato com o desenvolvedor responsavél.
							</div>
							<div class="alert alert-danger alert-dismissable">
								<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
								<i class="glyphicon glyphicon-exclamation-sign"></i>
								<strong>Cuidado!</strong> A navegação pode não ser possivel, algum componente foi danificado.
							</div>
						</div>
					</div>
				</div>

				<div class="wrapper">
					<div id="map" class="map"></div>
					<div id="progress"></div>
					<div class = "horizontal">
						<div id="zoomMap"></div>
						<div id="scale"></div>
						<div class="legendaCol" id="legendaVertical"></div>	
					</div>
				</div>
				
				<div id="popup" class="ol-popup">
					<a href="#" id="popup-closer" class="ol-popup-closer"></a>
					<div id="popup-content"></div>
				</div>
	            <div id="londeando">
		    		<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="lading"></div>
				</div>
			<!-- </div> -->
 
		<!-- 	<div class="col-sm-4 col-sm-pull-8 col-md-4 col-lg-3 col-lg-pull-9 menu_lateral">
				<div class="panel panel-default">
		 -->			
<!-- 					<div class="panel-heading" >
						<div class="input-group">
							<span class="input-group-btn">
								<button id="menu-city" type="button" class="btn btn-panel" data-toggle="collapse" data-target="#lista-camada-1"> Camadas
								</button>
							</span>
							<button class="btn glyphicon glyphicon-cog btn-config " data-toggle="modal" id="config-1" data-target="#configModal"> </button>
							<span id="alvo" class="glyphicon glyphicon-screenshot" ></span>

						</div>
					</div> -->

					<nav class="nav navegacao " style="display:none;">
						<ul class="list-group collapse in" id="lista-camada-1"></ul>

					<a class="btn btn-default  glyphicon glyphicon-print btn-group btn-group-justified"
						href="Javascript:window.print();"> IMPRIMIR
					</a>
					 <a id="export-png" class="btn btn-default btn-group btn-group-justified glyphicon glyphicon-download-alt "
						href="#"> DOWNLOAD
					</a>

					<a id="limpar" class="btn btn-default btn-group btn-group-justified glyphicon glyphicon-trash "
						href="#"> LIMPAR DADOS
					</a>

					</nav>
 <!--
					<a id="back" class="btn btn-default btn-group btn-group-justified glyphicon glyphicon-list-alt "
						href="pgv.html"> VOLTAR PARA TABELA
					</a>
				 	 -->

			<!-- </div> -->

			<div class="panel panel-default" id="resposta">
				<p></p>
			</div>
			<div class="panel panel-default" id="resposta1">
				<p></p>
			</div>
			<div class="legenda" >

			</div>



		<!-- </div> -->



		<!-- Static Modal -->
<div class="modal modal-static fade" id="configModal" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        	<div class="modal-header">
		    	<h4 class="modal-title"> Configuração Camada</h4>
		        	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          		<span aria-hidden="true">&times;</span>
		        	</button>
      		</div>

            <div class="modal-body">

			</div>

            <div class="modal-footer">
		        <button type="button" id="salvarConfig" class="btn btn-primary">Aplicar mudanças</button>
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
      		</div>
        </div>
    </div>
</div>


	</div>


@stop

@section('css')
    <link rel="stylesheet" href="/css/admin_custom.css">
    <link rel="stylesheet" href="{{ asset('legadomapa/css/ol.css') }}" />
    <link rel="stylesheet" href="{{ asset('legadomapa/css/mapageo.css') }}" />
@stop

@section('js')
    <script> console.log('Hi!'); </script>
    
  <script type="text/javascript" src="/legadomapa/config/objeto.js"></script>
<script  type="text/javascript" src="{{ asset('legadomapa/config/configBirigui_raster.js') }}"></script>

<script type="text/javascript"  src="legadomapa/main.js"></script> 

@stop