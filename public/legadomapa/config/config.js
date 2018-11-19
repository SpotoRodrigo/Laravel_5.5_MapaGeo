

var usaCache = true ;
var listaCamada = [];
var carregaGrafico = true ; 
var consultaPeriodo = true;


var url         =  'https://www.mitraegov.com.br/geoserver/' ;
var urlWms      =  'https://www.mitraegov.com.br/geoserver/wms' ;
var urlCache    = 'https://www.mitraegov.com.br/geoserver/gwc/service/wmts';
var urlGeo      =  'https://www.mitraegov.com.br/geoserver/' ;

/*
var urlWms   = 'http://localhost:8080/geoserver/wms' ;
var urlCache = 'http://localhost:8080/geoserver/gwc/service/wmts'; 
var urlGeo   = 'http://localhost:8080/geoserver/' ;
*/

var clickZoom = 13;

  var visao =  new ol.View({
    center: [-50.3379 , -21.26869 ], //  [-50.3244 , -21.2895 ], attt
    projection: 'EPSG:4326',
    zoom: 11,
    minZoom: 2,
    maxZoom: 20,    // 19 max base bing
  });



$(document).attr("title", "Birigui");
$('#menu-city').html(`Birigui <span id="badge-1" class="badge">0</span>`);


camada = new kamada();
camada.setId(0);
camada.setNome('Mapas Base');
camada.setMenu(true);
camada.setTipoPai(2);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('base');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Mapa base, apenas um pode estar ativo.');
listaCamada.push(camada);


    camada = new kamada();
    camada.setId(1002);
    camada.setNome('Microsoft Street');
    camada.setMenu(true);
camada.setTipoPai(2);
camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('base');
    camada.setPai(0);
    camada.setCor();
    camada.setPLista(1);
    camada.setInfo('Mapa das ruas, fornecido pela Microsoft.');
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(1003);
    camada.setNome('Microsoft Satelite');
    camada.setMenu(true);
camada.setTipoPai(2);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('base');
    camada.setPai(0);
    camada.setCor();
    camada.setPLista(3);
    camada.setInfo('Mapa com imagem de satelite com descrições, fornecido pela Microsoft.');
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(1004);
    camada.setNome('Stamen Preto-Branco');
    camada.setMenu(true);
camada.setTipoPai(2);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('base');
    camada.setPai(0);
    camada.setCor();
    camada.setPLista(4);
    camada.setInfo('Disponibilizados como parte do projeto CityTracking, financiado pela Fundação Knight, no qual a Stamen fornece na web.');
    listaCamada.push(camada);


camada = new kamada();
camada.setId(1);
camada.setNome('Imagem Aérea');
camada.setLayer('Birigui:Raster');
camada.setMenu(true);
camada.setTipoPai(1);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('camada');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
listaCamada.push(camada);

camada = new kamada();
camada.setId(2);
camada.setNome('Balizas');
camada.setMenu(true);
camada.setTipoPai(1);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('camada');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
listaCamada.push(camada);

    camada = new kamada();
    camada.setId(201);
    camada.setNome('Hidrografia');
    camada.setLayer('Birigui:Hidrografia');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#6699FF');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([20,6]);
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(207);
    camada.setNome('Limitrofes');
    camada.setLayer('Birigui:Limitrofes');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([14,6]);
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(202);
    camada.setNome('Limite Municipio');
    camada.setLayer('Birigui:Limite');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([14,6]);
    listaCamada.push(camada);

   camada = new kamada();
    camada.setId(205);
    camada.setNome('Rodovias');
    camada.setLayer('Birigui:rodovias');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#d74dab');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(203);
    camada.setNome('Logradouro');
    camada.setLayer('Birigui:Logradouros');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('yellow');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([20,17]);
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(204);
    camada.setNome('Quadras');
    camada.setLayer('Birigui:Quadras');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#24e31a');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([20,17]);
    listaCamada.push(camada);

        camada = new kamada();
    camada.setId(206);
    camada.setNome('Bairros');
    camada.setLayer('Birigui:Bairros');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#4f4f4f');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([18,14]);
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(208);
    camada.setNome('setor');
    camada.setLayer('Birigui:setor2');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#888888');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([18,11]);
    listaCamada.push(camada);

/*
    camada = new kamada();
    camada.setId(210);
    camada.setNome('Setores OLD');
    camada.setLayer('Birigui:setores_old');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#888899');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([18,11]);
    listaCamada.push(camada);

*/
    camada = new kamada();
    camada.setId(209);
    camada.setNome('Zonas');
    camada.setLayer('Birigui:zona2');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(2);
    camada.setCor('#fde56f');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
   // camada.setExibicao([18,12]);
    listaCamada.push(camada);

 
camada = new kamada();
camada.setId(3);
camada.setNome('Rede de Distribuição');
camada.setMenu(true);
camada.setTipoPai(1);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('categoria');
camada.setPai(-1);
camada.setCor('linear-gradient(to right ,#2433d3, #e80000)');
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
listaCamada.push(camada);

        /*
        camada = new kamada();
        camada.setId(301);
        camada.setNome('Distribuição');
        camada.setLayer('Birigui:tubulacao');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(3);
        camada.setCor('#2433d3');
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal();
        camada.setExibicao([20,15]);
        listaCamada.push(camada);
*/


       camada = new kamada();
        camada.setId(301);
        camada.setNome('Distribuição');
        camada.setLayer('Birigui:tubu_dist');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(3);
        camada.setCor('#2433d3');
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal();
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(302);
        camada.setNome('Adultora');
        camada.setLayer('Birigui:tubu_adul');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(3);
        camada.setCor('#e80000');
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal();
        camada.setExibicao([20,16]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(303);
        camada.setNome('Ramal');
        camada.setLayer('Birigui:tubu_ram');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(3);
        camada.setCor('#33a02c');
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal();
        camada.setExibicao([20,19]);
        listaCamada.push(camada);

camada = new kamada();
camada.setId(4);
camada.setNome('Pontos Rede');
camada.setMenu(true);
camada.setTipoPai(1);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('camada');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
listaCamada.push(camada);

        camada = new kamada();
        camada.setId(406);
        camada.setNome('Colar Tomada');
        camada.setLayer('Birigui:colar_tomada');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#fdbf6f');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);  
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(401);
        camada.setNome('Adaptador');
        camada.setLayer('Birigui:adaptador');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#539e86');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(402);
        camada.setNome('Bomba');
        camada.setLayer('Birigui:bomba');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor();
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(403);
        camada.setNome('Bucha Redução');
        camada.setLayer('Birigui:bucha_reducao');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#5395b4');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(404);
        camada.setNome('Cap');
        camada.setLayer('Birigui:cap');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#ee4a92');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(405);
        camada.setNome('Captação');
        camada.setLayer('Birigui:captacao');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#03dbff');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(407);
        camada.setNome('Cruzeta');
        camada.setLayer('Birigui:cruzeta');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#6f59ff');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(408);
        camada.setNome('Curva');
        camada.setLayer('Birigui:curva');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#9e7658');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(409);
        camada.setNome('Descarga');
        camada.setLayer('Birigui:descarga');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor();
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(310);
        camada.setNome('Elevatoria');
        camada.setLayer('Birigui:elevatoria');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor();
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);


        camada = new kamada();
        camada.setId(311);
        camada.setNome('Estação Pitometrica');
        camada.setLayer('Birigui:estacao_pitometrica');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor();
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(312);
        camada.setNome('E.T.A');
        camada.setLayer('Birigui:estacao_tratamento_agua');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#ffe200');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,15]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(313);
        camada.setNome('Hidrante');
        camada.setLayer('Birigui:hidrante');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#2f37d4');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(314);
        camada.setNome('Hidrometro');
        camada.setLayer('Birigui:hidrometro');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#009cd4');
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]); 
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(315);
        camada.setNome('Junção');
        camada.setLayer('Birigui:juncao');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#ff6a00');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(316);
        camada.setNome('Luva');
        camada.setLayer('Birigui:luva');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#aa9c40');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(317);
        camada.setNome('Nó');
        camada.setLayer('Birigui:no');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#084ed');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(318);
        camada.setNome('Redução');
        camada.setLayer('Birigui:reducao');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#21ff16');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(319);
        camada.setNome('Registro');
        camada.setLayer('Birigui:registro');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#f1211e');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(320);
        camada.setNome('Reservatorio Fixo');
        camada.setLayer('Birigui:reservatorio_fixo');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#210091');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(321);
        camada.setNome('Reservatorio Variavél');
        camada.setLayer('Birigui:reservatorio_variavel');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#210091');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(322);
        camada.setNome('Tê');
        camada.setLayer('Birigui:te');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor('#0c5b0f');
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);

        camada = new kamada();
        camada.setId(323);
        camada.setNome('Valvula');
        camada.setLayer('Birigui:valvula');
        camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
        camada.setCarregado(true);
        camada.setFuncao('camada');
        camada.setPai(4);
        camada.setCor();
        camada.setSize(7);
        camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
        camada.setTotal(0);
        camada.setExibicao([20,18]);
        listaCamada.push(camada);


camada = new kamada();
camada.setId(5);
camada.setNome('Birigui Click');
camada.setLayer('Birigui:Birigui_CLICK');
camada.setMenu(false);
camada.setCarregado(true);
camada.setFuncao('click');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
camada.setExibicao([20,clickZoom]);
listaCamada.push(camada);

camada = new kamada();
camada.setId(6);
camada.setNome('Filtro Elemento');
camada.setLayer('Birigui:filtroElemento');
camada.setMenu(false);
camada.setCarregado(false);
camada.setFuncao('filtro');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
listaCamada.push(camada);

/*
camada = new kamada();
camada.setId(6);
camada.setNome('Tipo Edificação');
camada.setLayer('Birigui:filtroConsumo');
camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('pesquisa');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
listaCamada.push(camada);
*/


camada = new kamada();
camada.setId(-2);
camada.setNome('GeoAnálise Temporal');
camada.setMenu(true);
camada.setTipoPai(3);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('temporal');
camada.setPai(-1);
camada.setCor('#000000');
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setExibicao([18,10]);
listaCamada.push(camada);


camada = new kamada();
camada.setId(7);
camada.setNome('Concentração por Ponto');
camada.setMenu(true);
camada.setTipoPai(2);
camada.setTipoFilho(0);
camada.setCarregado(false);
camada.setFuncao('camada');
camada.setPai(-2);
camada.setCor('#000000');
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setExibicao([18,10]);
listaCamada.push(camada);

    camada = new kamada();
    camada.setId(73);
    camada.setNome('Consumo Calor');
    camada.setLayer('Birigui:sqlConsumo');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('calor');
    camada.setPai(7);
    camada.setCor('radial-gradient(yellow 15%, red 25%, #4444FF 60%)');  //, #4444FF  FF0000   FFFF00
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setExibicao([18,11]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(71);
    camada.setNome('Status Pagamento');
    camada.setLayer('Birigui:Pagamento');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('pesquisa');
    camada.setPai(7);
    camada.setCor('#000000');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setExibicao([18,10]);
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(72);
    camada.setNome('Inadimplencia Calor');
    camada.setLayer('Birigui:Pagamento');
    camada.setMenu(true);
camada.setTipoPai(0);
camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('calor');
    camada.setPai(7);
    camada.setCor('radial-gradient(yellow 15%, red 25%, #4444FF 60%)');  //, #4444FF  FF0000   FFFF00
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setExibicao([18,11]);
    listaCamada.push(camada);




camada = new kamada();
camada.setId(11);
camada.setNome('Resultados por Area ');
camada.setMenu(true);
camada.setTipoPai(4);
camada.setTipoFilho(0);
camada.setCarregado(false);
camada.setFuncao('camada');
camada.setSubFuncao('grafico');
camada.setPai(-2);
camada.setCor('#1a08a6');
camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
camada.setTotal();
camada.setExibicao([14,6]);
listaCamada.push(camada);



       camada = new kamada();
    camada.setId(111);
    camada.setNome('Limite Municipio');
    camada.setLayer('Birigui:Limite');
    camada.setMenu(false);
    camada.setTipoPai(1);
    camada.setTipoFilho(4);
    camada.setCarregado(false);
    camada.setFuncao('grafico');
    camada.setSubFuncao(0);
    camada.setPai(11);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([11,6]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(112);
    camada.setNome('Zonas');
    camada.setLayer('Birigui:zona2');
    camada.setMenu(false);
    camada.setTipoPai(1);
    camada.setTipoFilho(4);
    camada.setCarregado(false);
    camada.setFuncao('grafico');
    camada.setSubFuncao(1);
    camada.setPai(11);
    camada.setCor('#fde56f');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([13,12]);
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(113);
    camada.setNome('Setores');
    camada.setLayer('Birigui:setor2');
    camada.setMenu(false);
    camada.setTipoPai(1);
    camada.setTipoFilho(4);
    camada.setCarregado(false);
    camada.setFuncao('grafico');
    camada.setSubFuncao(2);
    camada.setPai(11);
    camada.setCor('#888899');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([15,14]);
    listaCamada.push(camada);

/*  
    params['tg'] = 'GP' ;     // TIPO GRAFICO  ( GP = Google Pizza  ,  DP = D3js Porcentagem )
 params['ts'] =  0 ;     // TIPO SOMA     ( subTIPO do GRAFICO , identifica valor q será informado )

 var tiposDG = ['% de consumo m³' , '% de consumo valor' , '% de adimplência' , '% de inadimplência'   ];
 var tiposGP = ['Consumo m³ por Categoria'  ];

 */

    camada = new kamada();
    camada.setId(114);
    camada.setNome('Consumo m³ por Categoria');
    camada.setMenu(true);
    camada.setTipoPai(2);
    camada.setTipoFilho(6);
    camada.setParams('tg=GP&ts=0');
    camada.setCarregado(false);
    camada.setFuncao('herdeira');
    camada.setSubFuncao('grafico');
    camada.setPai(11);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([14,6]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(115);
    camada.setNome('Percentual de consumo m³');
    camada.setMenu(true);
    camada.setTipoPai(2);
    camada.setTipoFilho(6);
    camada.setParams('tg=DP&ts=0');
    camada.setCarregado(false);
    camada.setFuncao('herdeira');
    camada.setSubFuncao('grafico');
    camada.setPai(11);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([14,6]);
    listaCamada.push(camada);

        camada = new kamada();
    camada.setId(116);
    camada.setNome('Percentual valor de comsumo');
    camada.setMenu(true);
    camada.setTipoPai(2);
    camada.setTipoFilho(6);
    camada.setParams('tg=DP&ts=1');
    camada.setCarregado(false);
    camada.setFuncao('herdeira');
    camada.setSubFuncao('grafico');
    camada.setPai(11);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([14,6]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(117);
    camada.setNome('Percentual adimplência ');
    camada.setMenu(true);
    camada.setTipoPai(2);
    camada.setTipoFilho(6);
    camada.setParams('tg=DP&ts=2');
    camada.setCarregado(false);
    camada.setFuncao('herdeira');
    camada.setSubFuncao('grafico');
    camada.setPai(11);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([14,6]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(118);
    camada.setNome('Percentual inadimplência');
    camada.setMenu(true);
    camada.setTipoPai(2);
    camada.setTipoFilho(6);
    camada.setParams('tg=DP&ts=3');
    camada.setCarregado(false);
    camada.setFuncao('herdeira');
    camada.setSubFuncao('grafico');
    camada.setPai(11);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([14,6]);
    listaCamada.push(camada);



  function iniciaUso(){
    $("#pesquisa").attr('disabled','disabled');
    $("#formPesquisa").css('display','block');
    $(".navegacao").css('top','74px');

    var caminho = getBaseName(window.location.pathname);
    if (caminho=='interno'){

      $('.navegacao').css('left', '-320px').addClass('side-fechado');
      $('.navegacao').append( `<div class='nav-toggle'>Camadas <span id="badge-1" class="badge">0</span> </div>`);
      $('.wrapper').css("left", 0);
      escondeMenu();
      $('.map .ol-zoom').css( 'margin-top', '35px');
      $('.map .ol-zoomslider').css( 'margin-top', '35px');



          var leftt  = $(window).width() - 120 +'px' ;
          var top    = $('#map').height() - 100 +'px' ;

        $('.legenda').css('position' , 'absolute');
        $('.legenda').css('left' , leftt  );
        $('.legenda').css('top' , top );

  }else{

          var leftt  = $(window).width() - 120 +'px' ;
          var top    = $(window).height() - 200 +'px' ;
        $('.legenda').css('position' , 'absolute');
        $('.legenda').css('left' , leftt  );
        $('.legenda').css('top' , top );
  }

  carregaElementos( function(){document.getElementById('elementos').innerHTML = localStorage.getItem("options"); } );
  carregaTotalPontos();

  setQtdeCamada(); 
  carregaPeriodoConsulta();

} ;

  function escondeMenu() {
    $('.nav-toggle').click(function() {
        var left =  $('.legenda').css('left') ; 
        left = parseInt(left.substr(0, left.length - 2 ) );
      if($(".navegacao").hasClass("side-fechado")) {
        $('.navegacao').animate({
          left: "0px",
        }, 100, function() {
                       
            $('.legenda').css('left' , (left - 320 ) + 'px'  );

          $(".navegacao").removeClass("side-fechado");
        });
        $('.wrapper').animate({
          left: "320px",
        }, 100);
      }
      else {
        $('.nav').animate({
          left: "-320px",
        }, 100, function() {
            $('.legenda').css('left' , (left + 320 ) + 'px'  );
          $(".navegacao").addClass("side-fechado");
        });
        $('.wrapper').animate({
          left: "0px",
        }, 100);
      }
    });
  }


  function carregaElementos(callback ){
    $.ajax({
    type:     "GET",
    //      callback : parseResponse(evt),
    url:    './php/pesquisa.php?comando=comboBox',
    //      async:true,
    dataType: "json",
    contentType: 'application/json',
    success: function(data){
      var options = '';
      $.each(data, function(index, value) {
        options += value.option;
        localStorage.setItem("el"+value.id , value.descricao ) ;
        localStorage.setItem("eq"+value.id , value.qtde ) ;
        value.fabricante!= '' || value.fabricante!=null  ? localStorage.setItem("ef"+value.id , value.fabricante ) : ''  ;
        value.medida!= '' || value.medida!= null  ? localStorage.setItem("en"+value.id , value.medida ) : '';
        value.material!= '' || value.material!= null  ? localStorage.setItem("em"+value.id , value.material ) : '';

      });
      localStorage.setItem("options", options ) ;
      callback.call(this);
    },
    error: function(e) {
      alerta(3,'Falha ao carregar informações via PHP dos Elementos no banco de dados');
    }
  });
  }


  function carregaTotalPontos( ){
    $.ajax({
      type:     "GET",
      url:    './php/pesquisa.php?comando=totalPontos',
      //      async:true,
      dataType: "json",
      contentType: 'application/json',
      success: function(data){
        var options = '';
        listaCamada.forEach(function(item,index){
          if(item.getTotal()!=undefined){
            var id = item.getId();
            var layer = item.getLayer();
            var total = item.getTotal();
            var nome = item.getNome();
            $.each(data, function(index, value) {
              var camada = layer.substr( layer.indexOf(":")+1 , layer.length );
              if ( camada == value.tabela ){
                total = value.total;
                return
              }
            });
            $("#btn"+id).text(nome+' ( '+total+')');
            if (total == 0){
              $("#btn"+id).prop('title', 'Nenhuma ocorrência deste ponto foi localizada.');
              $("#check"+id).prop('checked', false);
              $("#check"+id).attr("disabled", true);
              item.setCarregado(false);
              updateBadgePai(item.getPai() , false);
            }
          }
        });
      },
      error: function(e) {
       alerta(3,'Falha ao carregar informações via PHP das Camadas no banco de dados PostGis');
     }
   });
  }

  function trataResposta(data) {
   var count = 1;
   var resposta = '';
   data.features.forEach(function( item, index , value){
    var camada = item.id.substr(0, item.id.lastIndexOf(".") );
    if (camada == 'tubu_dist' ||  camada == 'tubu_adul'  || camada == 'tubu_ram' )
        camada = 'tubulacao_E';

    switch(camada) {
      case 'Limite':
      resposta += `<b>Municipio: </b>` + item.properties.NM_MUNICIP ;
      break;
      case 'Limitrofes':
      resposta += `<b>Municipio: </b>` + item.properties.NM_MUNICIP ;
      break;
      case 'zona2':
      resposta += '<BR>'+`<b>Zona: </b>` + item.properties.Zona.replace('Z','') ; //+'<BR>'
      break;
      case 'setor2':
      resposta += `<b> Setor: </b>` + item.properties.Setor.replace('S','') ;
      break;
      case 'Quadras':
      resposta +='<b> Quadra: </b>'+item.properties.QUADRA ;
      break;
      case 'Bairros':

      resposta +='<BR>'+'<b>Bairro:</b> '+item.properties.Bairro.toUpperCase();
      break;
      case 'Logradouros':

      if(resposta.indexOf(item.properties.NAME)==-1)
        resposta += '<BR>'+`<b>Logradouro: </b>` +  item.properties.TYPE + ' ' + item.properties.NAME ;
    break;

      case 'tubulacao_E':
      if (resposta.indexOf(item.properties.descricao.toString()) != -1) {
        count++;
      }else{
        resposta += '<BR>'+`<b>Tubulação: </b>` + item.properties.descricao ;
      }
      break;
      case 'hidrometro':
       resposta += '<BR>'+`<b>Hidrometro IM: </b>` + item.properties.inscricao_municipal + ' '+ `<a class="glyphicon glyphicon-search"  title="Informações da Fatura" href="#" onclick="javascript:consultaHidrometro('`+item.properties.inscricao_municipal+`')"></a>`;

      break;
      case 'te':
      resposta += '<BR>'+`<b>TE: </b>` + localStorage.getItem("el"+item.properties.elemento_id );
      break;
      case 'cap':
      resposta += '<BR>'+`<b>CAP: </b>` + localStorage.getItem("el"+item.properties.elemento_id );
      break;
      case 'reducao':
      if(localStorage.getItem("el"+item.properties.elemento_id ) )
        resposta += '<BR>'+`<b>Redução: </b>` +localStorage.getItem("el"+item.properties.elemento_id );
      else
        resposta += '<BR>'+`<b>Redução. </b>`;
      break;
      case 'descarga':
      resposta += '<BR>'+`<b>Descarga. </b>` ;
      break;
      case 'Hidrografia':
      if(item.properties.NAME )
        resposta += '<BR>'+`<b>Hidrografia: </b>` + item.properties.NAME ;
      else
        resposta += '<BR>'+`<b>Hidrografia. </b>`;
      break;
      case 'reservatorio_fixo':
      if(item.properties.descricao )
        resposta += '<BR>'+`<b>Reservatorio Fixo </b>`+item.properties.descricao;
      else
        resposta += '<BR>'+`<b>Reservatorio Fixo. </b>`;
      break;
      case 'reservatorio_variavel':
      if(item.properties.descricao )
        resposta += '<BR>'+`<b>Reservatorio Variavél </b>`+item.properties.descricao ;
      else
        resposta += '<BR>'+`<b>Reservatorio Variavél. </b>`;
      break;
      case 'captacao':
      if(item.properties.descricao )
        resposta += '<BR>'+`<b>Captação </b>`+item.properties.descricao;
      else
        resposta += '<BR>'+`<b>Captação. </b>`;
      break;
      case 'juncao':
      if(localStorage.getItem("el"+item.properties.elemento_id ) )
        resposta += '<BR>'+`<b>Junção: </b>` +localStorage.getItem("el"+item.properties.elemento_id ) ;
      else
        resposta += '<BR>'+`<b>Junção. </b>`;
      break;
      case 'luva':
      if(localStorage.getItem("el"+item.properties.elemento_id ) )
        resposta += '<BR>'+`<b>Luva: </b>` +localStorage.getItem("el"+item.properties.elemento_id );
      else
        resposta += '<BR>'+`<b>Luva. </b>`;
      break;
      case 'colar_tomada':
      if(localStorage.getItem("el"+item.properties.elemento_id ) ){
        if(resposta.indexOf('Colar tomada')==-1)
          resposta += '<BR>'+`<b>Colar tomada: </b>` +localStorage.getItem("el"+item.properties.elemento_id );
      }else{
        resposta += '<BR>'+`<b>Colar tomada. </b>`;
      }
      break;


      default:
      if ( item.properties.elemento_id != undefined ){
        resposta += '<BR>'+'<b>'+camada +' :</b>'  + localStorage.getItem("el"+item.properties.elemento_id );
      }else{
        resposta += '<BR>'+'<b>'+camada +'.</b>';
        console.log(item.properties);
      }

  } // fim swith
      });  // fim loop
   if (count>1)
    resposta = resposta.replace("Tubulação:", count+"x Tubulação:");
  return resposta;
}
var  dates = [];

  function carregaPeriodoConsulta( ){
    $.ajax({
      type:     "GET",
      url:    './php/pesquisa.php?comando=periodoConsulta',
      //      async:true,
      dataType: "json",
      contentType: 'application/json',
      success: function(data){
        var ultimo = 0 ;
         $.each(data, function(index, value) {
            if( value.descricao !== undefined){
                dates[index] = value.descricao;
                ultimo = index;
                desc = value.descricao;
            }
         });
        $('#paramsDados1').val(dates[ultimo] );
        $('#ano').val( dates[ultimo].split('/')[1] );
        $('#mes').val( dates[ultimo].split('/')[0] );
        atualizaParametros( dates[ultimo]);
        $(".btn-number[data-type='plus']").attr('disabled', true);

      },
      error: function(e) {
       alerta(3,'Falha ao carregar informações via PHP das Camadas no banco de dados PostGis');
     }
   });
  }

  function setQtdeCamada(){
   var count = 0;
   var base  = 0;
   var openTemporal= false;
   listaCamada.forEach(function(item,index){
    if(item.getPai() == -1 && item.getMenu() && item.getCarregado()){
      count++;
    }
    if(item.getFuncao()=== 'base' && item.getMenu() && item.getCarregado() &&  item.getPLista() !== undefined ){
      base = item.getPLista();
    }
    if( (item.getFuncao()=== 'temporal' || item.getFuncao()=== 'pesquisa' || item.getFuncao()=== 'calor' || item.getSubFuncao()=== 'grafico'   ) && item.getMenu() && item.getCarregado()  ){
      openTemporal = true;
    }
   });
   if (base !== 0){
    layers[base].setVisible(true);
   }
   if (openTemporal ){
    $('#btn-2').click();
   }
   $("#badge-1").text(count);
}


function consultaHidrometro (text , ajuste){

            $.ajax({
            type:     "GET",
             //     crossDomain: true,
            //      callback : parseResponse(evt),
            url:    './php/pesquisa.php?comando=pesquisaIM&busca='+text.replace(/^\s+|\s+$/g,""),
            async:true,
            dataType: "json",
            success: function(data){
              closer.onclick();
              x = [data["long"] , data['lat'] ] ;
              if(x[0] != undefined && x[1] != undefined ){

                if (ajuste){
                   ajusteCentro( visao.A.center ,  visao.A.zoom );
                }

                setTimeout(function(){
                  if (ajuste){
                  ajusteCentro( x , 20 ) ;
                }

                  overlay.setPosition(x);

                informativo = `` ;
                informativo += `<b>`+data["inscricao_municipal"]+'</b><BR>'  ;
            //    informativo += `<b>Tipo Ligação: </b>`+data["categoria_nome"]+'<BR>' ;
                informativo += ` <b>Consumo: </b>`+data["consumo"] +` m³ `+'<BR>'  ;
            //    informativo += `<b>Status: </b>`+data["status_nome"]+'<BR>' ;
                informativo += `<b>Fatura: </b>` +data["valor"]  +'<BR>';
            //    informativo += `<b>Inscrição Municipal: </b>`+data["inscricao_municipal"]+'<BR>' ;
                 informativo += `<b>Total Hidrometros: </b>`+data["qtde"]+'<BR>' ;
            //    informativo += `<b>Nº Hidrometro: </b>`+data["inscricao"]+'<BR>' ;
                if (data["ligadas"]!=0)
                  informativo += `<b>Qtde Ligada : </b>`+data["ligadas"]+'<BR>' ;
                if (data["desligadas"]!=0 )
                  informativo += `<b>Qtde Desligada: </b>`+data["desligadas"]+'<BR>' ;
                if (data["residencial"]!=0)
                  informativo += `<b>Residencial: </b>`+data["residencial"]+'<BR>' ;
                if (data["comercial"]!=0)
                  informativo += `<b>Comercial: </b>`+data["comercial"]+'<BR>' ;
                if (data["industrial"]!=0)
                  informativo += `<b>Industrial: </b>`+data["industrial"]+'<BR>' ;
                if (data["publico"]!=0)
                  informativo += `<b>Publico: </b>`+data["publico"]+'<BR>' ;


                  content.innerHTML = '<p>'+ informativo +'</p>' ;
                }, 250 );
              }else{
                alerta( 2,`Pesquisa não encontrada. Favor verificar dado.` );
              }
            },
            error: function(e) {
             console.log('error '+ e.responseText);
             alerta(3,'Falha ao carregar informações via PHP das Inscrições Municipais no banco de dados');
           }
         });
}



  function graff(x , titulo , resolution , posicao) {


  if (document.getElementById(params['tg']+'grafico'+posicao ) === null ){
    console.log(params['tg']+'grafico'+posicao) ;
    console.info('Posição grafico não criada. '+'grafico'+posicao  );
    return ;
  }
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  var legenda = 'none' ;

  var view = map.getView(); 
  var zoom = view.getZoom() ;
  var calculo = (view.getZoom() <= 13 &&  view.getZoom() > 10 ) ? zoom*0.5 : (view.getZoom() <= 10 ) ? zoom*1.25 : zoom   ; 

  var widthX  = /*20  + */(18*( 22 - calculo )) ; ;
  var heightX = /*10 + */ (13*( 22 - calculo )) ; ;

dados =  dadosCC[x] !== undefined  ? dadosCC[x].slice(0, 4) : undefined ;

 if (dados  !== undefined ){
   data.addRows(dados );
   // console.log(aux  + ' <-> '  + dados[aux][0]  );
    var options = { title:  titulo , 
                   legend: legenda  , 
                     is3D: true,
                    colors: ['#3366cc', '#dc3912', '#ff9900', '#109618' ] ,
                 //    enableInteractivity : false , 
               //    pieSliceText: 'label',
                    slices: {  2: {offset: 0.2},
                               3: {offset: 0.3},
                               4: {offset: 0.4},
                    },
                   width:widthX,
                   height:heightX,
                   backgroundColor: { fill:'transparent' }
                    };


   var chart = new google.visualization.PieChart(document.getElementById(params['tg']+'grafico'+posicao ) );
    chart.draw(data, options);
  }else{
    console.info('DADOS NÂO ENCOTRADOS !'+ 'titulo = '+titulo +' x = '+x );
  }
}

function graffD(x , titulo , resolution , posicao) {

if(posicao=='TESTE'){
  params['tg']= 'DP';
}

  if (document.getElementById(params['tg']+'grafico'+posicao ) === null ){
    console.info('Posição grafico não criada. '+'grafico'+posicao  );
    return false ;
  }

  if ( dadosCC[x]  === undefined ){
    console.info('DADOS NÂO ENCOTRADOS !'+ 'titulo = '+titulo +' x = '+x );
    return false ;
  }

//console.info(dadosCC[x]);  //  [4][1] consumo  [7][1] Valor fatura .... 
//var porcenta = dadosCC[x][5][1] / dadosCC[x][7][1] ; 

 var totalConsumo = dadosCC[x.substr(0,7)+'0'+'BIRIGUI'][4][1];
 var porcenta     = dadosCC[x][4][1] / totalConsumo ; 
porcenta = parseFloat(porcenta*100 ).toFixed(2) ;

//  if(params['ts'] !== undefined){
    switch (parseInt (params['ts'] ))  {
      case 0:
         var totalConsumo = dadosCC[ x.substr(0,7)+'0'+'BIRIGUI'][4][1];
         var porcenta     = dadosCC[x][4][1] / totalConsumo ; 
        porcenta = parseFloat(porcenta*100 ).toFixed(2) ;
      break;
      case 1:
         var totalFatura    = dadosCC[ x.substr(0,7)+'0'+'BIRIGUI'][7][1];
        porcenta = parseFloat( (dadosCC[x][7][1] / totalFatura ) *100 ).toFixed(2) ;
      break;
      case 2:
        porcenta = parseFloat( (dadosCC[x][5][1] / dadosCC[x][7][1]) *100 ).toFixed(2);
      break;
      case 3:
        porcenta = parseFloat( (dadosCC[x][6][1] / dadosCC[x][7][1]) *100 ).toFixed(2);
      break;
      default:
         var totalConsumo    = dadosCC[ x.substr(0,7)+'0'+'BIRIGUI'][4][1];
         var porcenta     = dadosCC[x][4][1] / totalConsumo ; 
        porcenta = parseFloat(porcenta*100 ).toFixed(2) ;
    }

  var view = map.getView(); 
  var zoom = view.getZoom() ;
  var calculo = (view.getZoom() <= 13 &&  view.getZoom() > 10 ) ? zoom*0.5 : (view.getZoom() <= 10 ) ? zoom*1.25 : zoom   ; 

  var widthX  = (16*( 22 - calculo ))*0.75 ;
  var heightX =  (12*( 22 - calculo ))*0.75 ;

  $('#'+params['tg']+'grafico'+posicao).width(widthX+'px');
  $('#'+params['tg']+'grafico'+posicao).height(heightX+'px');


    var config1 = liquidFillGaugeDefaultSettings();
    config1.waveAnimateTime = 2500;
    config1.textSize = 1.2;
    config1.valueCountUp = false ;
    config1.waveAnimate = true; 
    config1.waveHeight = 0.3;
    config1.waveCount = 0.5;

    $('#'+params['tg']+'grafico'+posicao).html(``);
    var gauge2 = loadLiquidFillGauge(params['tg']+'grafico'+posicao , porcenta , config1 );
//alerta(1,'grafico'+gauge2);
  //$('#grafico'+posicao).css('width' , widthX+'px');
  //$('#grafico'+posicao).css('height' , heightX +'px');

//resize();
  //d3.select(window).on("resize", resize);
  //force.size([widthX, heightX]).resume();
  return true ;
}

  function carregaDadosGrafico(params ){

    var str = $.param(params);
    var total = 0 ;  
    $.ajax({
      type:     "GET",
      url:    './php/pesquisa.php?comando=graficosConsumo'+'&'+str,
      async:true,
      dataType: "json",
      contentType: 'application/json',
      success: function(data){
         var inicio2 = performance.now();
        if (data.nivel != undefined &&  data.dados == '0' ){
      //    console.info ( 'Desc antes processamento  '+ 'milis->'+millisToMinutesAndSeconds(performance.now() - data.time )   ) ; 
          criaTag(data);  
          inicio3 = performance.now() - inicio2;
          console.info ( 'Desc BD PHP  nvl ' + data.nivel  +  ' | total info -> ' + data.total +   ' - ' + ' perfo '+millisToMinutesAndSeconds(inicio3)   + 'milis->'+millisToMinutesAndSeconds(performance.now() - data.time )   ) ; 
        } else if (data.dados == '1' ) {
          var inicio2 = performance.now();
          if (data.nivel == qtdeNvl){
            criaStore(data , startMAP() ); 
          }else{
            criaStore(data);
          }
          inicio3 = performance.now() - inicio2;
          console.info ('Dados  BD PHP   nvl ' + data.nivel  +  '  | total info -> ' + data.total +   ' - ' + ' perfo '+millisToMinutesAndSeconds(inicio3)   + 'milis->'+millisToMinutesAndSeconds(performance.now() - data.time )   ) ; 
        }   

      }, 
      error: function(e) {
        console.info(e.responseText);
        carregaGrafico = false ;
        alerta(3,'Falha ao carregar dados para graficos via PHP dos Elementos no banco de dados');
        startMAP() ;
      }
    });
  }



  function styloGrafico(feature, resolution) {
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
*/  //  console.info('oloco'+feature);
    ++oloco;
troca = false ;

    if (feature['a'] !== undefined   ){
      if (feature['a'] == 'Limite.1'){
        var identifica = '1' + params['ident']+'0'+feature['O'].NM_MUNICIP ;
        var titulo = feature['O'].NM_MUNICIP ; 
        var posicao = titulo;
       }else if(feature['O'].id_grafico !== undefined ){
          var identifica = '1' + params['ident']+tituloGrafico(feature['O'].id_grafico)[1]+ tituloGrafico(feature['O'].id_grafico)[2] ;
          var titulo  = tituloGrafico(feature['O'].id_grafico)[0] ; 
          var posicao = tituloGrafico(feature['O'].id_grafico)[2] ;
        }else if (feature['O'].inscCad !== undefined  && feature['O'].inscCad =='SE23010107900' && feature['O'].nomeprop.indexOf('HELITON KLAUS') !== -1 ){
        //  console.info(oloco + ' - para');
       //   console.info(feature);
          troca = true; 
        }else{
           troca = false ; 
          return false ; 
           // console.info(feature);
        }
    }  

    var resultadoIF = '' ;
    if (styleCache[resolution] !== undefined ){     
    }else{
      styleCache[resolution] = [] ;
    }
    if (styleCache[resolution] !== undefined && styleCache[resolution][titulo] !== undefined ){         
    }else{
      styleCache[resolution][titulo] = [] ; 
    }    

    if(styleCache[resolution]  !== undefined && styleCache[resolution][titulo].length  !== 0  /* && styleCache[titulo][1] === resolution */ ){
       exibeGrafico(true);
       return styleCache[resolution][titulo] ;
    }

    var deuCerto = false;

    if(identifica != undefined  ){
      exibeGrafico(true);
      if(params['tg'] === 'GP' ){ // tg: 'CC'
        deuCerto =  graff( identifica , titulo , resolution , posicao ,  postMap( posicao ,center ) ) ;     
      }else if (params['tg'] === 'DP' ){
        deuCerto =  graffD( identifica , titulo , resolution , posicao ,  postMap( posicao ,center ) ) ;     
      }
      
    }

    if (deuCerto === false) {
      console.log('DEU ERRRADDOO !!!  Ponha o titulo no polygons ');
    }

    if (troca ){
      var x = 1 ;
      var colo = 'red' ;
      var coloB = 'rgba(255, 0, 0, 0.55)' ;

    }else{
      var x = 0.1 ;
      var colo = 'blue'; 
      var coloB = 'rgba(0, 0, 255, 0.05)' ;
    }
    

    var style =  new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: colo ,
          width: x
      }),
      fill: new ol.style.Fill({
        color: coloB
      }),
    //  text: createTextStyle(feature, resolution, myDom.polygons)
    });

    styleCache[resolution][titulo].push(style);
    return style;
  }

    function tituloGrafico(idGrafico){
    var texto = '';
    var nvl   = 0 ;
    var id    = '' ;
    if (idGrafico.substr(0,2) !== '00' ){
      texto += 'Z'+idGrafico.substr(0,2) ;
      ++nvl;
      id = idGrafico.substr(0,2);
    }
    if (idGrafico.substr(2,2) !== '00' ){
      texto += 'S'+idGrafico.substr(2,2) ;
      ++nvl;
      id = idGrafico.substr(0,4);
    }
    if (idGrafico.substr(4,3) !== '000' ){
      texto += 'Q'+idGrafico.substr(4,3) ;
      ++nvl;
      id = idGrafico.substr(0,7);
    }
    return [texto , nvl , id ] ;

  }

