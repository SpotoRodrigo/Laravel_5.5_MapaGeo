

var usaCache = false;
var listaCamada = [];
var carregaGrafico = false;
var consultaPeriodo = false;
var cidade = 'Birigui';


var dates = [];
var dadosCC = [];
var cores = [];
var variavel = [];

var params = [];
params['tg'] = 'PI';
params['ts'] = 0;
params['time'] = performance.now();
params['ident'] = '';

/*

var url         =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/' ;
var urlWms      =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/wms' ;
// var urlCache    =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/gwc/service/wmts';
var urlGeo      =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/' ;

var urlWms = 'http://169.57.166.62:8080/geoserver/wms';
var urlGeo = 'http://169.57.166.62:8080/geoserver/';
var url = 'http://169.57.166.62:8080/geoserver/';
var urlCache = 'http://169.57.166.62:8080/geoserver/gwc/service/wmts';
*/

//var ip = 'http://192.168.1.6';
var ip = 'http://localhost';

var urlWms = ip+':8080/geoserver/wms';
var urlGeo = ip+':8080/geoserver/';
var url = ip+':8080/geoserver/';
var urlCache = ip+':8080/geoserver/gwc/service/wmts';
//var urlCache = 'http://192.168.1.6:8080/geoserver/Birigui/wms';


//http://192.168.1.6:8080/geoserver/Birigui/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Birigui:Limitrofes&cql_filter=NM_MUNICIP%20ILIKE%20%20%27%25BILAC%25%27%20&maxFeatures=50&outputFormat=application/json

/*
var url         =  'http://192.168.1.3:8080/geoserver/' ;
var urlWms      =  'http://192.168.1.3:8080/geoserver/wms' ;
var urlCache    =  'http://192.168.1.3:8080/geoserver/gwc/service/wmts';
var urlGeo      =  'http://192.168.1.3:8080/geoserver/' ;
*/

// var urlCache    =  'http://169.57.166.62:8080/geoserver/gwc/service/wmts';




var clickZoom = 14;

var visao = new ol.View({
		center: [-50.3379 , -21.26869 ], //  [-50.3244 , -21.2895 ], attt
	projection: 'EPSG:4326',
	zoom: 11,
	minZoom: 2,
	maxZoom: 21,    // 19 max base bing
});

//[ -47.851950186622744, -24.556842163149188 ]

$(document).attr("title", "Birigui");
$('#menu-city').html(`Birigui <span id="badge-1" class="badge">0</span>`);


camada = new kamada();
camada.setId(0);
camada.setNome('Mapas Base');
camada.setMenu(true);
camada.setTipoPai(2);
camada.setTipoFilho(0);
camada.setCarregado(false);
camada.setFuncao('base');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Mapa base, apenas um pode estar ativo.');
listaCamada.push(camada);


		camada = new kamada();
		camada.setId(1002);
		camada.setNome('Open Street Map');
		camada.setMenu(true);
		camada.setTipoPai(2);
		camada.setTipoFilho(0);
		camada.setCarregado(false);
		camada.setFuncao('base');
		camada.setPai(0);
		camada.setCor();
		camada.setPLista(0);
		camada.setInfo('Mapa das ruas, fornecido pela Open Street Map.');
		listaCamada.push(camada);


		camada = new kamada();
		camada.setId(1003);
		camada.setNome('Stamen Preto-Branco');
		camada.setMenu(true);
		camada.setTipoPai(2);
		camada.setTipoFilho(0);
		camada.setCarregado(false);
		camada.setFuncao('base');
		camada.setPai(0);
		camada.setCor();
		camada.setPLista(1);
		camada.setInfo('Disponibilizados como parte do projeto CityTracking, financiado pela Fundação Knight, no qual a Stamen fornece na web.');
		listaCamada.push(camada);

		camada = new kamada();
		camada.setId(1004);
		camada.setNome('Stamen Padrão');
		camada.setMenu(true);
		camada.setTipoPai(2);
		camada.setTipoFilho(0);
		camada.setCarregado(false);
		camada.setFuncao('base');
		camada.setPai(0);
		camada.setCor();
		camada.setPLista(2);
		camada.setInfo('Disponibilizados como parte do projeto CityTracking, financiado pela Fundação Knight, no qual a Stamen fornece na web.');
		listaCamada.push(camada);


		camada = new kamada();
		camada.setId(1005);
		camada.setNome('Open Topo Map');
		camada.setMenu(true);
		camada.setTipoPai(2);
		camada.setTipoFilho(0);
		camada.setCarregado(false);
		camada.setFuncao('base');
		camada.setPai(0);
		camada.setCor();
		camada.setPLista(3);
		camada.setInfo('Mapas topográficos do OpenStreetMap');
		listaCamada.push(camada);

		camada = new kamada();
		camada.setId(1006);
		camada.setNome('DigitalGlobe Satellite');
		camada.setMenu(true);
		camada.setTipoPai(2);
		camada.setTipoFilho(0);
		camada.setCarregado(false);
		camada.setFuncao('base');
		camada.setPai(0);
		camada.setCor();
		camada.setPLista(6);
		camada.setInfo('Mapas topográficos do OpenStreetMap');
		listaCamada.push(camada);


camada = new kamada();
camada.setId(7);
camada.setNome('Filtro dimensao');
camada.setLayer('Birigui:birigui_click');
camada.setMenu(false);
camada.setCarregado(false);
camada.setFuncao('filtro');
camada.setPai(-1);
camada.setEstilo('filtro_shape');
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
listaCamada.push(camada);


camada = new kamada();
camada.setId(1);
camada.setNome('Imagem Aérea');
camada.setLayer('Birigui:Raster');
camada.setMenu(true);
camada.setTipoPai(1);
camada.setTipoFilho(0);
camada.setCarregado(false);
camada.setFuncao('camada');
//camada.setFuncao('raster');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
camada.setExibicao([21, 1]);
listaCamada.push(camada);



	camada = new kamada();
	camada.setId(333);
	camada.setNome('Recadastramento');
	camada.setMenu(true);
	camada.setTipoPai(1);
	camada.setTipoFilho(0);
	camada.setCarregado(false);
	camada.setFuncao('camada');
	camada.setPai(-1);
	camada.setCor('#ff004b');
	camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
	camada.setTotal();      
	listaCamada.push(camada);


						camada = new kamada();
						camada.setId(303);
						camada.setNome('Predial');
						camada.setLayer('Birigui:PREDIAIS');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(false);
						camada.setFuncao('camada');
						camada.setPai(333);
						camada.setCor('#ffffad');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([21,19]);
						listaCamada.push(camada);



						camada = new kamada();
						camada.setId(2222);
						camada.setNome('Lotes');
						camada.setLayer('Birigui:LOTES');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(false);
						camada.setFuncao('camada');
						camada.setPai(333);
						camada.setCor('#eeeaff');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([21,18]);
						listaCamada.push(camada);



				camada = new kamada();
				camada.setId(222);
				camada.setNome('Estruturante');
				camada.setMenu(true);
				camada.setTipoPai(1);
				camada.setTipoFilho(0);
				camada.setCarregado(true);
				camada.setFuncao('camada');
				camada.setPai(-1);
				camada.setCor('#0076ff');
				camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
				camada.setTotal();
				listaCamada.push(camada);



						camada = new kamada();
						camada.setId(2091);
						camada.setNome('Bairro Completo');
						camada.setLayer('Birigui:BAIRRO');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(true);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#e10ee0');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([18,10]);
						listaCamada.push(camada);

						camada = new kamada();
						camada.setId(20911);
						camada.setNome('Bairro');
						camada.setLayer('Birigui:BAIRROP');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(true);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#e10ee0');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([18,10]);
						listaCamada.push(camada);


						camada = new kamada();
						camada.setId(2791);
						camada.setNome('Quadra Completo');
						camada.setLayer('Birigui:QUADRA');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(true);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#e1aFFF');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([18,15]);
						listaCamada.push(camada);


						camada = new kamada();
						camada.setId(2792);
						camada.setNome('Quadra');
						camada.setLayer('Birigui:QUADRAP');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(true);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#e1a000');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([20,15]);
						listaCamada.push(camada);

						camada = new kamada();
						camada.setId(2333);
						camada.setNome('Logradouros');
						camada.setLayer('Birigui:LOGRAS');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(true);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#52ff00');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([21,14]);
						listaCamada.push(camada);


						camada = new kamada();
						camada.setId(2060);
						camada.setNome('Loteamento');
						camada.setLayer('Birigui:Loteamento');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(false);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#a1a2e1');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([14,13]);
						listaCamada.push(camada);

						camada = new kamada();
						camada.setId(206);
						camada.setNome('Setores Fiscais');
						camada.setLayer('Birigui:SETORES');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(false);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#a1a2e1');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([14,13]);
						listaCamada.push(camada);

						camada = new kamada();
						camada.setId(705);
						camada.setNome('Zona Fiscal');
						camada.setLayer('Birigui:Zona_Fiscal');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(false);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#949494');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([17,10]);
						camada.setOpacidade(1);
						listaCamada.push(camada);



						camada = new kamada();
						camada.setId(7054);
						camada.setNome('Zonas Uso Solo');
						camada.setLayer('Birigui:ZONAS_USO');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(false);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#757575');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([17,10]);
						camada.setOpacidade(1);
						listaCamada.push(camada);


						camada = new kamada();
						camada.setId(204);
						camada.setNome('Limite Municipal');
						camada.setLayer('Birigui:Limite_Municipal');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(true);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('#e80000');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setExibicao([12,8]);
						listaCamada.push(camada);


						camada = new kamada();
						camada.setId(207);
						camada.setNome('Limítrofes');
						camada.setLayer('Birigui:Limitrofes');
						camada.setMenu(true);
						camada.setTipoPai(0);
						camada.setTipoFilho(0);
						camada.setCarregado(true);
						camada.setFuncao('camada');
						camada.setPai(222);
						camada.setCor('');
						camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
						camada.setTotal();
						camada.setCor('#1300ff');
						camada.setExibicao([12,7]);
						listaCamada.push(camada);         


		camada = new kamada();
		camada.setId(8);
		camada.setNome('birigui_click');
		camada.setLayer('Birigui:birigui_click');
		camada.setMenu(false);
		camada.setCarregado(false);
		camada.setFuncao('click');
		camada.setPai(-1);
		camada.setCor();
		camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
		camada.setTotal();
		camada.setExibicao([21,13]);
		listaCamada.push(camada);



function iniciaUso() {
	$("#pesquisa").attr('disabled', 'disabled');
	$("#formPesquisa").css('display', 'none');
	$(".navegacao").css('top', '74px');


	var caminho = getBaseName(window.location.pathname);
	if (caminho == 'interno') {

		$('.navegacao').css('left', '-320px').addClass('side-fechado');
		$('.navegacao').append(`<div class='nav-toggle'>Camadas <span id="badge-1" class="badge">0</span> </div>`);
		$('.wrapper').css("left", 0);
		escondeMenu();
		$('.map .ol-zoom').css('margin-top', '35px');
		$('.map .ol-zoomslider').css('margin-top', '35px');


		var leftt = $(window).width() - 120 + 'px';
		var top = $('#map').height() - 100 + 'px';

		$('.legenda').css('position', 'absolute');
		$('.legenda').css('left', leftt);
		$('.legenda').css('top', top);

	} else {

		var leftt = $(window).width() - 120 + 'px';
		var top = $(window).height() - 200 + 'px';
		$('.legenda').css('position', 'absolute');
		$('.legenda').css('left', leftt);
		$('.legenda').css('top', top);
	}

	// carregaElementos( function(){document.getElementById('elementos').innerHTML = localStorage.getItem("options"); } );
	// carregaTotalPontos();

	//  setQtdeCamada(); 
	// carregaPeriodoConsulta();

	// carregaDadosGraficoSaoSebastiao();
	ajusteBadgePai();
	montaFiltro();
};

function escondeMenu() {
	$('.nav-toggle').click(function () {
		var left = $('.legenda').css('left');
		left = parseInt(left.substr(0, left.length - 2));
		if ($(".navegacao").hasClass("side-fechado")) {
			$('.navegacao').animate({
				left: "0px",
			}, 100, function () {

				$('.legenda').css('left', (left - 320) + 'px');

				$(".navegacao").removeClass("side-fechado");
			});
			$('.wrapper').animate({
				left: "320px",
			}, 100);
		}
		else {
			$('.nav').animate({
				left: "-320px",
			}, 100, function () {
				$('.legenda').css('left', (left + 320) + 'px');
				$(".navegacao").addClass("side-fechado");
			});
			$('.wrapper').animate({
				left: "0px",
			}, 100);
		}
	});
}


function trataResposta(data) {
	var count = 1;
	var resposta = '';
	var imResposta = '';
	var zoom = map.getView().getZoom();

	data.features.forEach(function (item, index, value) {
		var camada = item.id.substr(0, item.id.lastIndexOf("."));

		switch (camada) {
			case 'Distrito':
				resposta += '<BR>' + `<b>Distrito: </b>` + item.properties.local;
				break;
			case 'Limitrofes':
				resposta += '' + `<b>Cidade: </b>` + item.properties.NM_MUNICIP;
				break;
			case 'BAIRROP':
				resposta += '<BR>' + '<b>Bairros:</b> ' + item.properties.NomeCompl;  // toUpperCase()
				break;
			
			case 'BAIRRO':
				resposta +=  '<BR>' +'<b>Bairros:</b> ' + item.properties.Bairro;  // toUpperCase()
				break;

			case 'SETOR':
				if (resposta.indexOf(item.properties.Setocacao) == -1)
					resposta +=  '<BR>' +`<b>Setor: </b>` + item.properties.Setocacao;
				break;
				
				case 'SETORP':
				resposta += '<BR>' + `<b>Setor: </b>` + item.properties.Setocacao;
				break;

				case 'Zona_Fiscal':
				resposta +=  '<BR>' +`<b>Zona: </b>` + item.properties.Zona;
				break;

				case 'Zona_Fiscal':
				resposta +=  '<BR>' +`<b>Zona: </b>` + item.properties.Zona;
				break;


				case 'ZONA_USO':
				resposta += `<b>Zona Uso : </b>` + item.properties.Zonacricao;
				break;



			case 'Nivel_ocupacao':
				resposta += '<BR>' + `<b>Nivel Ocupação: </b>` + item.properties.Nivel_Ocup;
				break;
			case 'Outras_areas':
				resposta += '<BR>' + '<b>Outras areas:</b> ' + item.properties.Identific;  // toUpperCase()
				break;
			case 'Zona_uso':
				if (resposta.indexOf(item.properties.Texticial) == -1)
					resposta += '<BR>' + `<b>Zona Uso: </b>` + item.properties.Texticial;
				break;




			case 'QUADRA':  
				if (resposta.indexOf(item.properties.descricao) == -1)
					resposta += '<BR>' + `<b>Quadra: </b>` + item.properties.descricao; //  +`  `  + `   <a    title="Mais Informações" href="#" onclick="javascript:consultaQuadraG('`+item.properties.id+`')">  <img src="img/icon_pie2.png" alt="Visualizar Grafico." style="width:24px;height:24px;border:0;">  </a>` ;  // class="glyphicon glyphicon-adjust"    class="glyphicon glyphicon-adjust"

				break;
			case 'Zona_tributaria':
				resposta += '<BR>' + `<b>Zona Tributaria: </b>` + item.properties.descricao; //+'<BR>'
				break;

				case 'LOGRA':
				if (resposta.indexOf(item.properties.nomerua) == -1)
					resposta += '<BR>' + `<b>Logradouro: </b>` + item.properties.nomerua;
				break;

				case 'LOGRAP':
				if (resposta.indexOf(item.properties.nomerua) == -1)
					resposta += '<BR>' + `<b>Logradouro: </b>` + item.properties.nomerua;
				break;

			case 'Rodovias':
				if (resposta.indexOf(item.properties.Rodovia) == -1)
					resposta += '<BR>' + `<b>Rodovias: </b>` + item.properties.Rodovia;
				break;


			case 'Pontos_notaveis':
				resposta += '<BR>' + `<b>` + item.properties.Local + ` </b>`;
				break;

			case 'geo_lote':

				if (item.properties.total == 1 && zoom > 15) {  // id
					//    imResposta  ='<BR>'+'<b>ID: </b>'+item.properties.id  ;
					imResposta += '<BR>' + '<b>Inscrição: </b>' + item.properties.inscricao_municipal.replace('[', '').replace(']', '').replace('[', '').replace(']', '').replace('"', '').replace('"', '');
					imResposta += '<BR>' + '<b>Terreno Pref: </b>' + item.properties.area_terreno + '<b> m² </b>';
					imResposta += '<BR>' + '<b>Terreno Real: </b>' + item.properties.area_apurada + '<b> m² </b>';
					imResposta += '<BR>' + '<b>Edificada Pref: </b>' + item.properties.area_edificada + '<b> m² </b>';
					//            imResposta +='<BR>'+'<b>Padrão Imovel: </b>'+item.properties.padrao_do_imovel ;
					imResposta += '<BR>' + '<b>Testada: </b>' + item.properties.testada_metragem + ' m ';
					imResposta += '<b>Qtde : </b>' + item.properties.testada_numero;
					imResposta += '<BR>' + '<b>R1: </b>' + item.properties.r1 + '<b> R2: </b>' + item.properties.r2;
					imResposta += '<BR>' + '<b>Indice: </b>' + item.properties.indice;
				} else if (zoom > 15) {
					imResposta = '<BR>' + '<b>Qtde Isncrições: </b>' + item.properties.total;
					imResposta += '<BR>' + '<b>Terreno Pref: </b>' + item.properties.area_terreno + '<b> m² </b>';
					imResposta += '<BR>' + '<b>Terreno Real: </b>' + item.properties.area_apurada + '<b> m² </b>';
					imResposta += '<BR>' + '<b>Edificada Pref: </b>' + item.properties.area_edificada + '<b> m² </b>';
					//            imResposta +='<BR>'+'<b>Padrão Imovel: </b>'+item.properties.padrao_do_imovel ;
					imResposta += '<BR>' + '<b>Testada: </b>' + item.properties.testada_metragem + ' m ';
					imResposta += '<b>  Qtde : </b>' + item.properties.testada_numero;
					imResposta += '<BR>' + '<b>R1: </b>' + item.properties.r1 + '<b> R2: </b>' + item.properties.r2;
					imResposta += '<BR>' + '<b>Indice: </b>' + item.properties.indice;
				}

				break;


			case 'geo_d13':
				if (zoom > 17)
					resposta += '<BR>' + '<b>' + item.properties.dimensao_nome + ': </b>' + item.properties.dimensao_descricao; //+'<BR>'
				break;

			case 'geo_d14':
				if (zoom > 17)
					resposta += '<BR>' + '<b>' + item.properties.dimensao_nome + ': </b>' + item.properties.dimensao_descricao; //+'<BR>'
				break;

			case 'geo_d15':
				if (zoom > 17)
					resposta += '<BR>' + '<b>' + item.properties.dimensao_nome + ': </b>' + item.properties.dimensao_descricao; //+'<BR>'
				break;

			case 'codigo_temp_empresa':
				//  if ( zoom >17)
				resposta += '<BR>' + `<b>Empresas: </b>` + item.properties.qtde + `  ` + `   <a    title="Mais Informações" href="#" onclick="javascript:consultaEmpresa('` + item.properties.codigo + `')">  <img src="img/icon_pie2.png" alt="Visualizar Grafico." style="width:24px;height:24px;border:0;">  </a>`;  // class="glyphicon glyphicon-adjust"    class="glyphicon glyphicon-adjust"
				break;


			default:
				if (item.properties.elemento_id != undefined) {
					//     resposta += '<BR>'+'<b>'+camada +' :</b>'  + localStorage.getItem("el"+item.properties.elemento_id );
				} else {
					//    resposta += '<BR>'+'<b>'+camada +'.</b>';
					//   console.log(item.properties);
				}

		} // fim swith
	});  // fim loop


	resposta += imResposta;

	return resposta;
}

/*
	function carregaDadosGraficoSaoSebastiao( ){

		$.ajax({
			type:     "GET",
			url:    './php/consultaSaoSebastiao.php?comando=graficosPadraoIM',
			async:true,
			dataType: "json",
			contentType: 'application/json',
			success: function(data){

				$.each( data, function( key, value ) {
						if (typeof value == 'object' && value.DESCRICAO != undefined ){
								var idTag = value.NIVEL + value.ID ,
								html  = '<a   class="overlay graficos grNv'+value.NIVEL+' GP" id="'+'PI' +'grafico'+idTag+'"  style="border: 0px solid #ccc"></a>' ,
								temp = [],
								quero = ['ALTO' , 'MEDIO' , 'POPULAR' , 'SUBNORMAL'] ;
			//  console.info('Key store => '+'0'+idTag  + ' id TAG => '+'PI' +'grafico'+idTag ); 
								localStorage.setItem( '0'+idTag  , html  );    
								content.innerHTML += html ;  

								
								$.each( value, function( key1, value1 ) {
										if ( quero.includes(key1) ){
											temp.push([key1 , parseInt(value1) ]);
										}
								});
								dadosCC[ '1'+idTag ] = temp ;

								try {
										localStorage.setItem( '1'+idTag , JSON.stringify( temp ) );   
								} catch (e) {
										console.info(e);
									if (e == QUOTA_EXCEEDED_ERR) {
										alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
									}
								}

						}

				}); 
/*
				console.info( ' QTDE STORAGE  ->  '+window.localStorage.length );
				for (var i = 0; i < localStorage.length; i++) {
						 localStorage.getItem(localStorage.key(i)) ;
						 console.info( i + '   ->  '+  localStorage.getItem(localStorage.key(i))  );
				}
*//*
				startMAP();
			}, 
			error: function(e) {
				console.info(e.responseText);
				carregaGrafico = false ;
				alerta(3,'Falha ao carregar dados para graficos via PHP no banco de dados');
				startMAP() ;
			}
		});
	}
*/



function carregaDadosGraficoSaoSebastiao() {

	$.ajax({
		type: "GET",
		url: './php/consultaSaoSebastiao.php?comando=graficosAll',
		async: true,
		dataType: "json",
		contentType: 'application/json',
		success: function (data) {

			$.each(data, function (key, value) {
				if (typeof value == 'object' && value.DESCRICAO != undefined) {
					var idTag = value.NIVEL + value.ID,
						html = '<a   class="overlay graficos grNv' + value.NIVEL + ' GP" id="' + 'PI' + 'grafico' + idTag + '"  style="border: 0px solid #ccc"></a>';

					localStorage.setItem('0' + idTag, html);
					content.innerHTML += html;

					dadosCC['1' + value.NIVEL + value.ID + value.TG] = JSON.parse(value.DADOS);
					try {

						localStorage.setItem('1' + value.NIVEL + value.ID + value.TG, value.DADOS);
					} catch (e) {
						console.info(e);
						if (e == QUOTA_EXCEEDED_ERR) {
							alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
						}
					}

				}

			});
			/*
							console.info( ' QTDE STORAGE  ->  '+window.localStorage.length );
							for (var i = 0; i < localStorage.length; i++) {
									 localStorage.getItem(localStorage.key(i)) ;
									 console.info( i + '   ->  '+  localStorage.getItem(localStorage.key(i))  );
							}
			*/
			startMAP();
		},
		error: function (e) {
			console.info(e.responseText);
			carregaGrafico = false;
			alerta(3, 'Falha ao carregar dados para graficos via PHP no banco de dados');
			startMAP();
		}
	});
}


function consultaQuadraG(text, ajuste) {

	$.ajax({
		type: "GET",
		//     crossDomain: true,
		//      callback : parseResponse(evt),
		url: './php/consultaSaoSebastiao.php?comando=consultaQuadra&busca=' + text.replace(/^\s+|\s+$/g, ""),
		async: true,
		dataType: "json",
		success: function (data) {
			closer.onclick();

			var html = '';
			var resolution = 00;
			var loop = [];

			$.each(data, function (key, value) {

				if (typeof value == 'object') {

					x = [value.LONG, value.LAT],
						titulo = value.DESCRICAO,
						posicao = '4' + value.ID + value.TG,
						identifica = '14' + value.ID + value.TG,
						idTag = value.NIVEL + value.ID;
					html += '<a   class="overlay graficos grNv' + value.NIVEL + ' GP" id="' + 'PI' + 'grafico' + posicao + '"  style="border: 0px solid #ccc"></a>';
					content.innerHTML += html;

					dadosCC[identifica] = JSON.parse(value.DADOS);

					loop.push([identifica, posicao, titulo]);
				}
			});


			if (x[0] !== undefined && x[1] !== undefined) {

				// console.info(identifica , titulo , resolution , posicao );

				if (ajuste) {
					ajusteCentro(visao.A.center, visao.A.zoom);
				}


				setTimeout(function () {
					if (ajuste) {
						ajusteCentro(x, 20);
					}
					overlay.setPosition(x);

					var resolution = 00;

					var informativo = html; // '<a   class="overlay graficos grNvB'+' GP" id="'+'PI' +'grafico'+posicao+'"  style="border: 0px solid #ccc"></a>' ;       
					content.innerHTML = '<p>' + informativo + '</p>';

					//deuCerto =  graffPI( identifica , titulo , resolution , posicao    ) ;   // postMap( posicao ,center )

					loop.forEach(function (item) {
						deuCerto = graffPI(item[0], item[2], resolution, item[1]);
					});

				}, 250);

			} else {
				alerta(2, `Pesquisa não encontrada. Favor verificar dado.`);
			}

		},
		error: function (e) {
			console.log('error ' + e.responseText);
			alerta(3, 'Falha ao carregar informações via PHP das Inscrições Municipais no banco de dados');
		}
	});
}


function consultaEmpresa(text, ajuste) {

	$.ajax({
		type: "GET",
		//     crossDomain: true,
		//      callback : parseResponse(evt),
		url: './php/consultaSaoSebastiao.php?comando=consultaEmpresa&busca=' + text.replace(/^\s+|\s+$/g, ""),
		async: true,
		dataType: "json",
		success: function (data) {
			closer.onclick();

			var html = '';
			var resolution = 00;
			var loop = [];

			$.each(data, function (key, value) {

				if (typeof value == 'object') {

					x = [value.LONG, value.LAT],
						titulo = value.DESCRICAO,
						posicao = '5' + value.ID + value.TG + '-0',
						identifica = '15' + value.ID + value.TG + '-0',
						idTag = value.NIVEL + value.ID;
					html += '<a   class="overlay graficos grNv' + value.NIVEL + ' GP" id="' + 'PI' + 'grafico' + posicao + '"  style="border: 0px solid #ccc"></a>';
					content.innerHTML += html;
					dadosCC[identifica] = JSON.parse(value.DADOS);
					loop.push([identifica, posicao, titulo]);
				}
			});


			if (x[0] !== undefined && x[1] !== undefined) {

				// console.info(identifica , titulo , resolution , posicao );

				if (ajuste) {
					ajusteCentro(visao.A.center, visao.A.zoom);
				}


				setTimeout(function () {
					if (ajuste) {
						ajusteCentro(x, 20);
					}
					overlay.setPosition(x);

					var resolution = 00;

					var informativo = html; // '<a   class="overlay graficos grNvB'+' GP" id="'+'PI' +'grafico'+posicao+'"  style="border: 0px solid #ccc"></a>' ;       
					content.innerHTML = '<p>' + informativo + '</p>';

					//deuCerto =  graffPI( identifica , titulo , resolution , posicao    ) ;   // postMap( posicao ,center )

					loop.forEach(function (item) {
						deuCerto = graffPI(item[0], item[2], resolution, item[1]);
					});

				}, 250);

			} else {
				alerta(2, `Pesquisa não encontrada. Favor verificar dado.`);
			}

		},
		error: function (e) {
			console.log('error ' + e.responseText);
			alerta(3, 'Falha ao carregar informações via PHP das Inscrições Municipais no banco de dados');
		}
	});
}


function styloGraficoPostG(feature, resolution) {

	var geometry = feature.getGeometry();
	var coordinate = geometry.getCoordinates();
	//   var pixel = map.getPixelFromCoordinate(coordinate);
	var extent = feature.getGeometry().getExtent();
	var center = ol.extent.getCenter(extent);
	/*
			var esq = ol.extent.getBottomLeft(extent);
			var dir = ol.extent.getBottomRight(extent);
			var area = ol.extent.getSize(extent); 
			console.info(area);
	*/  //  console.info(feature );  // O: Object { id: 3, codigo: 39255, descricao: "BOSQUE", … }
	++oloco;
	troca = false;


	if (feature['a'] !== undefined) {
		if (feature['a'].substr(0, feature['a'].indexOf('.')) == 'Bairros') {
			var identifica = '11' + feature['O'].id;
			var titulo = feature['O'].descricao;
			var posicao = '1' + feature['O'].id;
			var padrao_cor = feature['O'].padrao_cor;
		} else if (feature['a'].substr(0, feature['a'].indexOf('.')) == 'pgv') {
			var identifica = '12' + feature['O'].id;
			var titulo = feature['O'].id + ' - ' + feature['O'].descricao;
			var posicao = '2' + feature['O'].id;
			var padrao_cor = feature['O'].padrao_cor;
		} else if (feature['a'].substr(0, feature['a'].indexOf('.')) == 'Bairro') {
			var identifica = '11' + feature['O'].id;
			var titulo = feature['O'].descricao;
			var posicao = '1' + feature['O'].id;
			var padrao_cor = feature['O'].padrao_cor;
		} else if (feature['a'].substr(0, feature['a'].indexOf('.')) == 'Zona_uso') {
			var identifica = '12' + feature['O'].id;
			var titulo = feature['O'].id + ' - ' + feature['O'].descricao;
			var posicao = '2' + feature['O'].id;
			var padrao_cor = feature['O'].padrao_cor;
		} else if (feature['a'].substr(0, feature['a'].indexOf('.')) == 'setor_distrito') {
			var identifica = '11' + feature['O'].id;
			var titulo = feature['O'].descricao;
			var posicao = '1' + feature['O'].id;
			var padrao_cor = feature['O'].padrao_cor;
		} else if (feature['a'].substr(0, feature['a'].indexOf('.')) == 'Zona_Homogenea') {
			var identifica = '12' + feature['O'].id;
			var titulo = feature['O'].id + ' - ' + feature['O'].descricao;
			var posicao = '2' + feature['O'].id;
			var padrao_cor = feature['O'].padrao_cor;
		} else if (feature['a'].substr(0, feature['a'].indexOf('.')) == 'Municipio') {
			var identifica = '10' + feature['O'].id;
			var titulo = feature['O'].descricao;
			var posicao = '0' + feature['O'].id;
			var padrao_cor = feature['O'].padrao_cor;
		}
	}


	var resultadoIF = '';
	if (styleCache[resolution] !== undefined) {
	} else {
		styleCache[resolution] = [];
	}
	if (styleCache[resolution] !== undefined && styleCache[resolution][titulo] !== undefined) {
	} else {
		styleCache[resolution][titulo] = [];
	}

	if (styleCache[resolution] !== undefined && styleCache[resolution][titulo].length !== 0  /* && styleCache[titulo][1] === resolution */) {
		exibeGrafico(true);
		return styleCache[resolution][titulo];
	}

	var deuCerto = false;

	if (identifica != undefined) {
		exibeGrafico(true);
		deuCerto = graffPI(identifica, titulo, resolution, posicao, postMap(posicao, center));

	}

	if (deuCerto === false) {
		console.log(' identifica ' + identifica, '  titulo  ' + titulo, '  resolution  ' + resolution, '  posicao   ' + posicao);
		console.log('DEU ERRRADDOO !!!  Ponha o titulo no polygons ');
	}

	if (troca) {
		var x = 1;
		var colo = 'red';
		var coloB = 'rgba(255, 0, 0, 0.55)';

	} else {
		var x = 0.1;
		var colo = 'blue';
		var coloB = 'rgba(0, 0, 255, 0.00)';
	}

	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: colo,
			width: x
		}),
		fill: new ol.style.Fill({
			color: padrao_cor !== undefined ? padrao_cor : coloB
		}),
		//  text: createTextStyle(feature, resolution, myDom.polygons)
	});

	styleCache[resolution][titulo].push(style);
	return style;
}


function graffPI(x, titulo, resolution, posicao) {

	var nivel = posicao.substr(0, 1);

	if (document.getElementById(params['tg'] + 'grafico' + posicao) === null) {
		console.log(params['tg'] + 'grafico' + posicao);
		console.info('Posição grafico não criada. ' + 'grafico' + posicao);
		return;
	}
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Topping');
	data.addColumn('number', 'Slices');
	var legenda = 'none';

	var view = map.getView();
	var zoom = view.getZoom();
	var calculo = (view.getZoom() < 13 && view.getZoom() > 10) ? zoom * 0.8 : (view.getZoom() <= 10) ? zoom * 1.25 : zoom * 0.90;

	var widthX = /*20  + */(12 * (22 - calculo));;
	var heightX = /*10 + */ (10 * (22 - calculo));;
	var usaCor = [];

	var ind = '';

	if (x.indexOf('-') === -1) {  // quadra tem - e comercio tem - 
		usaCor = cores[params['ts']];
		switch (params['ts']) {
			case '13':
				ind = x + params['ts'] + '-' + getVariavel(5, 1);
				break;
			case '14':
				ind = x + params['ts'] + '-' + getVariavel(6, 1);
				break;
			case '15':
				ind = x + params['ts'] + '-' + getVariavel(7, 1);
				break;
			case '20':
				ind = x + params['ts'] + '-' + getVariavel(7, 1);
				break;
			default:
				ind = x + params['ts'] + '-' + params['gg'];
		}
	} else {
		ind = x;
		var aux = x.slice(-4).slice(0, 2);
		usaCor = cores[aux];
	}

	dados = dadosCC[ind] !== undefined ? dadosCC[ind] : undefined;

	//console.info(nivel + ' =  ' + titulo );

	if (nivel == 4) {
		widthX = widthX * 4.5;
		heightX = heightX * 1.7;
		legenda = 'right';
	} else if (nivel == 5) {
		widthX = widthX * 4.3;
		heightX = heightX * 1.5;
		legenda = 'right';
		//      console.info(aux+ "  cores "+usaCor);
	}
	/*
		if (nivel > 3 ){
			console.info('PASSO AKI = '+nivel);
			widthX = widthX*4;
			heightX = heightX*2;
			legenda = 'right';
		} */

	//console.info(widthX , heightX );

	if (dados !== undefined) {
		data.addRows(dados);
		// console.log(aux  + ' <-> '  + dados[aux][0]  );
		var options = {
			title: titulo,
			titleTextStyle: {
				color: 'black',
				// fontName: <string>,
				fontSize: 10,
				bold: true,
				italic: false
			},
			legend: {
				position: legenda,
				textStyle: {
					color: 'black',
					fontSize: 10
				},
				alignment: 'start'
			},


			is3D: true,
			colors: usaCor,

			fontSize: 8,
			forceIFrame: true,
			pieSliceText: 'value',  // percentage , label  , none  , value 
			tooltip: {
				isHtml: false,
				showColorCode: true,
				ignoreBounds: false,
				//  trigger :'focus' , 
				// width: 40 , 
				textStyle: {
					color: 'black',
					// fontName: <string>,
					fontSize: 10,
					bold: true,
					italic: false
				}
			},
			pieSliceTextStyle: {
				color: 'white',
				// fontName: <string>,
				fontSize: 8,
				bold: false,
				italic: false
			},
			//    enableInteractivity : false , 
			//    pieSliceText: 'label',
			// slices: {  2: {offset: 0.2},3: {offset: 0.3}, 4: {offset: 0.4}, },
			width: widthX,
			height: heightX,
			backgroundColor: { fill: 'transparent' }
		};

		//console.info('graffPI  ->  '+params['tg']+'grafico'+posicao);
		//console.info('dados  ->  '+dados);

		var chart = new google.visualization.PieChart(document.getElementById(params['tg'] + 'grafico' + posicao));
		chart.draw(data, options);
	} else {
		console.info('DADOS NÂO ENCOTRADOS !' + 'titulo = ' + titulo + ' x = ' + x);
	}
}



function carregaLegenda(id) {

	if (id !== undefined)
		$.ajax({
			type: "GET",
			url: './php/consultaSaoSebastiao.php?comando=legendaDimensao&busca=' + id,
			async: true,
			dataType: "json",
			contentType: 'application/json',
			success: function (data) {

				if (data['TOTAL'] > 0) {  //  <caption>Monthly savings</caption>

					var idTag = 'legendaCol' + data[0]['ID'];
					htmlLeg = '<table style="display: inline-grid ;" id="' + idTag + '">' + '<caption  >' + data[0]['TITULO'] + '</caption>'; //  '<thead colspan="3"> <tr>  <td> '+data[0]['TITULO']+' </td> </tr> </thead> <tbody>'   ;

					var styloBolinha = ' border: 1px solid white; width: 20px; height: 20px; z-index: 999; -webkit-border-radius: 10px; -moz-border-radius: 10px;   border-radius: 10px;'
					$.each(data, function (key, value) {  //#4CAF50
						if (value['DESCRICAO'] !== undefined && value['PADRAO_COR'] !== undefined) {
							var cor = styloBolinha + ` background-color:` + value['PADRAO_COR'] + '!important';
							htmlLeg += '<tr> <td> ' + '<div style="' + cor + ' ">  ' + '</td> <td>  ' + value['DESCRICAO'] + '</td> ';

							if (value['REGRA'] !== undefined) {
								htmlLeg += ' <td>  ' + value['REGRA'] + '</td> '
							}
							htmlLeg += ' </tr>';

						}
					});

					htmlLeg += `</table>`;
					// $(".legenda").html(htmlLeg);
					// $(".legenda").show();
					var oqueTem = $("#legendaVertical").html();


					if (oqueTem.indexOf('legendaCol' + data[0]['ID']) !== -1) {

					} else {
						$("#legendaVertical").html(oqueTem + htmlLeg);
					}
				}

			},
			error: function (e) {
				console.info(e.responseText);
				//carregaGrafico = false ;
				alerta(3, 'Falha ao carregar dados para legenda via PHP no banco de dados');
				//  startMAP() ;
			}
		});
}


function carregaGraficoCores() {

	$.ajax({
		type: "GET",
		url: './php/consultaSaoSebastiao.php?comando=graficosCores',
		async: true,
		dataType: "json",
		contentType: 'application/json',
		success: function (data) {

			$.each(data, function (key, value) {
				if (typeof value == 'object' && value.CORES != undefined) {
					cores[value.ID] = JSON.parse(value.CORES);
				}
			});
		},
		error: function (e) {
			console.info(e.responseText);
			alerta(3, 'Falha ao carregar as cores para graficos via PHP no banco de dados');
			startMAP();
		}
	});
}


function getVariaveis() {

	$.ajax({
		type: "GET",
		url: './php/consultaSaoSebastiao.php?comando=variaveis',
		async: true,
		dataType: "json",
		contentType: 'application/json',
		success: function (data) {
			variavel.length = 0;
			$.each(data, function (key, value) {
				if (typeof value == 'object') {  //&& value.VARIAVEL_ID != undefined 
					variavel.push(value);
				}
			});
		},
		error: function (e) {
			console.info(e.responseText);
			alerta(3, 'Falha ao carregar as cores para graficos via PHP no banco de dados');
			// startMAP() ;
		}
	});
}


function getVariavel(id, estudo) {
	var resposta = null;
	variavel.forEach(function (item, index) {
		if (item.VAR_ID == id && item.ID == estudo) {
			resposta = item.SELECIONADO !== undefined ? item.SELECIONADO : item.VALOR;
		}
	});
	return resposta;
}



function setVariavel(id, estudo, valor) {

	variavel.forEach(function (item, index) {
		if (item.VAR_ID == id && item.ID == estudo) {
			if (item.VALOR_ID !== undefined) {
				item.SELECIONADO = valor;
				if (item.VALOR_ID == valor) {
					item.VALOR_BOOLEAN = true;
				} else {
					item.VALOR_BOOLEAN = false;
				}
			} else {
				item.VALOR = valor;
			}
		}
	});
	return true;
}

function setVariaveis(campos) {

	var texto = decodeURIComponent(campos);
	//console.info(texto);
	var campo = campos.split('ss=ss');

	campo.forEach(function (item, index) {
		if (item !== "") {
			$.ajax({
				type: "GET",
				url: './php/consultaSaoSebastiao.php?comando=updateVAR&' + item,
				async: true,
				dataType: "json",
				contentType: 'application/json',
				success: function (data) {

				},
				error: function (e) {
					console.info(e.responseText);
					alerta(3, 'Falha ao carregar as cores para graficos via PHP no banco de dados');
				}
			});
		}

	});
}



function atualizarCalculos(dimensao) {

	$.ajax({
		type: "GET",
		url: './php/consultaSaoSebastiao.php?comando=reFazer&tabela=' + dimensao,
		async: true,
		dataType: "json",
		contentType: 'application/json',
		success: function (data) {

			$('#limpar').click();

		},
		error: function (e) {
			console.info(e.responseText);
			alerta(3, 'Falha ao carregar as cores para graficos via PHP no banco de dados');
			// startMAP() ;
		}
	});
}

function montaFiltro() {

	// console.info(data);
	htmlVar = '<div class="imput-group" id="filtro_select"> <select  id="combo_fltro_label" name="combo_fltro_label" class="form-control" onchange="filto_dim()" > <option value="0" > BUSCAR </option>';

	listaCamada.forEach(function (item, index) {
		if (item.getMenu() && item.getFuncao() == 'camada' && $.inArray(item.getLayer(), filtro_label) !== -1) {
			//console.info(item.getNome());
			quais.push( { layer: item.getLayer() , combo: $.inArray(item.getLayer(), filtro_label) });
			htmlVar += '<option value="' + $.inArray(item.getLayer(), filtro_label) + '" > ' + item.getNome().toUpperCase() + ' </option>';
		}
	});
	htmlVar += '</select>';

	htmlDados = ` <input class="form-control" list="fltro_dados"  id="combo_fltro_dados"   onselect="go_filtro()"  onchange="go_filtro()" > 
												<datalist id="fltro_dados">
												</datalist>  
										</div>` ;

	htmlBotao = `<button type="button" id="filtro"  class="btn btn-search btn-default"  onclick="go_filtro()"  >
																				pesquisar
										 </button>`;

	` <select  id="combo_fltro_label" name="combo_fltro_label" onchange="filto_dim()" > <option value="0" > BUSCAR </option> </select>`;



	$(".filtro_dimensao").html(htmlVar + htmlDados);  //+ htmlBotao
	//populaFiltro(quais);
}



function filto_dim() {
	document.getElementById('combo_fltro_dados').value = "";
	var aux = $("#combo_fltro_label").val();
	$("#fltro_dados option").remove();
	$("#combo_fltro_dados").focus();
}

var oldText = '';

function go_filtro() {

	var tipo = $("#combo_fltro_label").val();
	var text = $('#combo_fltro_dados').val();
	var id = $('#fltro_dados option[value="' + text + '"]').attr('id');
	var zoom = $('#fltro_dados option[value="' + text + '"]').attr('zoom');
	var lat = $('#fltro_dados option[value="' + text + '"]').attr('lat');
	var long = $('#fltro_dados option[value="' + text + '"]').attr('long');


	if (tipo != undefined && id === undefined && text != oldText && text != undefined  ) {
		oldText = text;
		var aux = {
			service: 'WFS',
			version: '1.0.0',
			request: 'GetFeature',
			//typeName: filtro_label[tipo],
			typeName: filtro_grupo[tipo] ,
			cql_filter:  filtro_campo[tipo] + ' ILIKE ' + "'%" + text.toUpperCase() + "%'" ,
			maxFeatures: 50,
			outputFormat:'text/javascript',
			env:'color:ffcc00',
			STYLES:'filtro_shape'
		};

		var params = urlGeo + filtro_label[tipo].split(':')[0] +'/ows?'+ jQuery.param(aux);

		// '&cql_filter=strToLowerCase(' + filtro_campo[tipo] + ') LIKE ' + "'%" + text.toLowerCase() + "%'" 

	 $.ajax({
			type: "GET",
			url:  params ,
			async:true,
			dataType: "jsonp",
			contentType: 'application/json',
			callback: configAcaoRetorno('FILTRO')
		});
	}
	//   VERIFICO SE FILTRO ESTA ATIVO, SE ATIVO =( REMOVO ) ->  SE NOVO ATIVO FILTRO , AJUSTO CENTRO DO FILTRO SELECIONADO. 
		listaCamada.forEach(function(item,index){
				if (item.getFuncao() == 'filtro' ){
					aux = index;
					layer = item.getLayer();
					posicao = item.getPLista();
					visivel = posicao!=undefined ? layers[posicao].getVisible() : false ;
					cor  = item.getCor();
					estilo = (item.getEstilo()!==undefined ? item.getEstilo() : '' ) ;
					return;
				}
			});

			if  (visivel &&  (id==undefined || id == '' || cor != id ) ) {
				map.removeLayer(layers[posicao]);
				layers.splice(posicao,1);
				listaCamada[aux].setPLista(undefined);
				listaCamada[aux].setCor(undefined);
	}


	id = $('#fltro_dados option[value="' + text + '"]').attr('id');
	tipo = $("#combo_fltro_label").val();
	text = $('#combo_fltro_dados').val();

	if(cor != id   && id != undefined ) {   //&& tipo != undefined
				var camadaF = new ol.layer.Tile({
						visible: true,
						source: new ol.source.TileWMS({
							url: urlWms,
							params: {'LAYERS': filtro_label[tipo] , 'FEATUREID': id } ,   // ,  'CQL_FILTER': filtro  ,   'viewparams': 'dtid1:'+tipo+';dtid2:'+tipo +';did1:'+id +';did2:'+id 
							projection: projecao,						
							serverType: 'geoserver' ,
							style: 'filtro_shape' ,
							env:'color:ffcc00',
							STYLES:'filtro_shape'
				//			crossOrigin: 'anonymous'
						})
					});
					layers.push(camadaF);
					listaCamada[aux].setPLista(parseInt(layers.indexOf(camadaF)));
					listaCamada[aux].setCor(id);
					map.addLayer(camadaF);
					// ajusteCentro( visao.A.center ,  visao.A.zoom );
				//	ajusteCentro( [long , lat ] , zoom );
	
		}
		
		if(id!==undefined && long !== '' && lat !=='' && long !== 'null' && long !== null ){
			console.info([long , lat ] , zoom );
		  ajusteCentro( [long , lat ] , zoom ); 
		}
}


var filtro_label = ["Birigui:BAIRROP", "Birigui:LOGRAS", "Birigui:QUADRA",'Birigui:LOTES', "Birigui:QUADRA","Birigui:SETORES","Birigui:ZONAS_USO"];   //
var filtro_campo = ["NomeCompl", "nomerua", "descricao",'inscCad','id_grafico', 'Setoricao','Zonacricao'];
var filtro_zooom = [ 16 , 17, 18 , 19 , 18 , 16 , 16 ];
//var filtro_extra = ["Birigui:BAIRROP", "Birigui:LOGRAP", "Birigui:QUADRAP"];
var filtro_grupo = ["Birigui:BAIRROP", "Birigui:LOGRAP,Birigui:LOGRAG", "Birigui:QUADRA",'Birigui:LOTEG,Birigui:LOTEP', "Birigui:QUADRA"  , "Birigui:SETOR" , "Birigui:ZONA_USO" ] ;
var filtro_latit = ["Loteitude","Lat","Lat","Lat","Lat","Setotitude" ,'Lat' ];
var filtro_longi = ["Lotegitude","Long","Long","Long","Long","Setoitude","Long"];


			var quais = [];
function retornoFiltro(data){
	var tipo = $("#combo_fltro_label").val();

	console.info(data);
	//return true;
	if (data.totalFeatures === 0) {
		alerta(2, 'Não encontrado resultado com esta pesquisa.');
		document.getElementById('combo_fltro_dados').value = "";
	} else if (data.totalFeatures > 1) {
		document.getElementById('combo_fltro_dados').value = "";
		var options = '';
		$.each(data.features, function (index, it) {
			var descricao = eval('it.properties.' + filtro_campo[tipo]);
			var iddd = it.id;
			var longitude = ( eval('it.properties.' + filtro_longi[tipo]) !== undefined ? eval('it.properties.' + filtro_longi[tipo])  : null ) ;
			var latitude  = ( eval('it.properties.' + filtro_latit[tipo]) !== undefined ? eval('it.properties.' + filtro_latit[tipo])  : null ) ;

			if (descricao !== undefined) {
				options += "<option id='" + iddd + "' value='" + descricao + "' zoom='" + filtro_zooom[tipo] + "' lat='" + latitude + "' long='" + longitude + "' >";
			}

		});
		$("#fltro_dados").html(options);
		alerta(1, data.totalFeatures + '  itens localizados na busca, clique na busca para escolher a desejada.');

		var event;
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('mousedown', true, true, window);
		document.getElementById('fltro_dados').dispatchEvent(event);

	} else {
		$.each(data.features, function (index, it) {
			var descricao = eval('it.properties.' + filtro_campo[tipo]);
			var longitude = ( eval('it.properties.' + filtro_longi[tipo]) !== undefined ? eval('it.properties.' + filtro_longi[tipo])  : null ) ;
			var latitude  = ( eval('it.properties.' + filtro_latit[tipo]) !== undefined ? eval('it.properties.' + filtro_latit[tipo])  : null ) ;
			if(longitude!==null && latitude!==null ){
				ajusteCentro( [longitude , latitude ] , filtro_zooom[tipo] ); 
			}

			var iddd = it.id;            
			if (descricao !== undefined) {
				options = "<option id='" + iddd + "' value='" + descricao + "' zoom='" + filtro_zooom[tipo] + "' lat='" + '' + "' long='" + '' + "' >";
				$("#fltro_dados").val(descricao);
				$("#fltro_dados").html(options.substr(0, options.length - 1) + ' selected' + '>');
				document.getElementById('combo_fltro_dados').value = descricao;
			}
			go_filtro();
		});

	} 

}