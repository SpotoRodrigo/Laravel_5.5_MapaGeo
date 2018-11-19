

var usaCache = false ;
var listaCamada = [];
var carregaGrafico = false  ; 
var consultaPeriodo = false ;
var cidade = 'Birigui';


var  dates      = [];
var dadosCC     = [];
var cores       = [];
var variavel    = [];

var params = [] ;
params['tg'] = 'PI';
params['ts'] =  0 ;
 params['time'] = performance.now();
 params['ident'] = '';

/*
var url         =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/' ;
var urlWms      =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/wms' ;
// var urlCache    =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/gwc/service/wmts';
var urlGeo      =  'http://www.mitracidadesinteligentes.com.br:8080/geoserver/' ;
*/

var urlWms      =  'http://169.57.166.62:8080/geoserver/wms' ;
var urlGeo      =  'http://169.57.166.62:8080/geoserver/' ;
var url         =  'http://169.57.166.62:8080/geoserver/' ;
//var urlCache    =  'http://169.57.166.62:8080/geoserver/gwc/service/wmts';


// var urlWms = 'http://192.168.1.6:8080/geoserver/wms';
// var urlGeo = 'http://192.168.1.6:8080/geoserver/';
// var url = 'http://192.168.1.6:8080/geoserver/';

// var url         =  'https://www.mitraegov.com.br/geoserver/' ;
// var urlWms      =  'https://www.mitraegov.com.br/geoserver/wms' ;
// // var urlCache    = 'https://www.mitraegov.com.br/geoserver/gwc/service/wmts';
// var urlGeo      =  'https://www.mitraegov.com.br/geoserver/' ;


/*
var url         =  'http://192.168.1.3:8080/geoserver/' ;
var urlWms      =  'http://192.168.1.3:8080/geoserver/wms' ;
// var urlCache    =  'http://192.168.1.3:8080/geoserver/gwc/service/wmts';
var urlGeo      =  'http://192.168.1.3:8080/geoserver/' ;
*/

 var urlCache    = 'http://169.57.166.62:8080/geoserver/gwc/service/wmts';
var urlCacheImb1    = 'https://www.mitraegov.com.br/geoserver/gwc/service/wmts';



var clickZoom = 14;

  var visao =  new ol.View({
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
            camada.setId(1007);
            camada.setNome('Esri Satelite (so Zoom 17)');
            camada.setMenu(true);
            camada.setTipoPai(2);
            camada.setTipoFilho(0);
            camada.setCarregado(false);
            camada.setFuncao('base');
            camada.setPai(0);
            camada.setCor();
            camada.setPLista(4);
            camada.setInfo('Mapas topográficos do OpenStreetMap');
            listaCamada.push(camada);



camada = new kamada();
camada.setId(111);
camada.setNome('Imagem  Orgital');
camada.setLayer('Birigui:Raster');
camada.setMenu(true);
camada.setTipoPai(1);
camada.setTipoFilho(0);
camada.setCarregado(true);
camada.setFuncao('ibm1');
camada.setPai(-1);
camada.setCor();
camada.setInfo('Imagem Orbital, usada para produção do desenho cartografico dos hidrometros e Rede de Agua, tendo uma maior precisão com as outras camadas');
camada.setTotal();
camada.setExibicao([20,2]);
listaCamada.push(camada);

    camada = new kamada();
    camada.setId(4);
    camada.setNome('Aérea Original SEM Cache');
    camada.setLayer('Birigui:Raster');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);




    camada = new kamada();
    camada.setId(1);
    camada.setNome('Aérea Original Cache');
    camada.setLayer('Birigui:Raster');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('raster');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);



    camada = new kamada();
    camada.setId(2);
    camada.setNome('Aérea Compacta SEM Cache');
    camada.setLayer('Birigui_sh:compacta_raster');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);





    camada = new kamada();
    camada.setId(7);
    camada.setNome('SEM PIRAMiDE SEM Cache');
    camada.setLayer('Birigui_sh:raster_compacta');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);






    camada = new kamada();
    camada.setId(9);
    camada.setNome('COM PIRAMiDE SEM Cache');
    camada.setLayer('Birigui_sh:mosaic_piramede');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);





    camada = new kamada();
    camada.setId(10);
    camada.setNome('COM PIRAMiDE COM Cache');
    camada.setLayer('Birigui_sh:mosaic_piramede');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('raster');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);




    camada = new kamada();
    camada.setId(3);
    camada.setNome('Aérea Compacta COM Cache');
    camada.setLayer('Birigui_sh:compacta_raster');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('raster');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);
/*
    camada = new kamada();
    camada.setId(522);
    camada.setNome('Predial');
    camada.setLayer('Birigui_sh:Predial');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#ffe500');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,18]);
    listaCamada.push(camada);

    camada = new kamada();
    camada.setId(552);
    camada.setNome('Lotes');
    camada.setLayer('Birigui_sh:Lotes');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#0011b0');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,18]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(290);
    camada.setNome('Quadras');
    camada.setLayer('Birigui_sh:Quadras');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#ff1000');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([18,17]);
    listaCamada.push(camada);




 camada = new kamada();
    camada.setId(203);
    camada.setNome('Pontos Notaveis');
    camada.setLayer('Birigui_sh:Pontos_Notaveis');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#567890');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,15]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(210);
    camada.setNome('Logradouros');
    camada.setLayer('Birigui_sh:Logradouros');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#888899');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,16]);
    listaCamada.push(camada);

     camada = new kamada();
    camada.setId(298);
    camada.setNome('Loteamentos');
    camada.setLayer('Birigui_sh:Loteamentos');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#2433d3');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([16,14]);
      // camada.setOpacidade(0.5);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(302);
    camada.setNome('Zona Homogenea');
    camada.setLayer('Birigui_sh:Zona_homogenea');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#6699FF');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([16,14]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(299);
    camada.setNome('Setores Fiscais');
    camada.setLayer('Birigui_sh:Setores_Fiscais');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#568c6a');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([13,13]);
       camada.setOpacidade(0.5);
    listaCamada.push(camada);



    camada = new kamada();
    camada.setId(222);
    camada.setNome('Bairro');
    camada.setLayer('Birigui_sh:Bairros');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#5d80ff');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([15,14]);
    camada.setOpacidade(0.5);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(303);
    camada.setNome('Zonas');
    camada.setLayer('Birigui_sh:Zonas');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#ffffad');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([12,10]);
    camada.setOpacidade(0.5);
    listaCamada.push(camada);



    camada = new kamada();
    camada.setId(305);
    camada.setNome('Zona de Uso do Solo');
    camada.setLayer('Birigui_sh:Zona_Uso');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#c000ff');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([17,10]);
    camada.setOpacidade(0.5);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(306);
    camada.setNome('MacroZona Urbana');
    camada.setLayer('Birigui_sh:Macro_Zona');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#12dc6b');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([17,10]);
    camada.setOpacidade(0.6);
    listaCamada.push(camada);


    
  camada = new kamada();
    camada.setId(221);
    camada.setNome('Perimetro Urbano');
    camada.setLayer('Birigui_sh:Perimetro_Urbano');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#ffe500');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([16,11]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(204);
    camada.setNome(':Limite Municipal');
    camada.setLayer('Birigui_sh:Limite');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#e80000');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([12,10]);
    listaCamada.push(camada);


    camada = new kamada();
    camada.setId(233);
    camada.setNome('Limitrofes');
    camada.setLayer('Birigui_sh:Limitrofes');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#22ff00');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([12,7]);
    listaCamada.push(camada);



    camada = new kamada();
    camada.setId(8);
    camada.setNome('Birigui_click');
    camada.setLayer('Birigui_sh:Birigui_click');
    camada.setMenu(false);
    camada.setCarregado(false);
    camada.setFuncao('click');
    camada.setPai(-1);
    camada.setCor();
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,13]);
    listaCamada.push(camada);
*/

/*
    camada = new kamada();
    camada.setId(50);
    camada.setNome('Dimensões Analises');
    camada.setMenu(true);
    camada.setTipoPai(1);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#872b62');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    listaCamada.push(camada);
*/
    //     camada = new kamada();
    //     camada.setId(550);
    //     camada.setNome('Visões Padrão Lote');
    //     camada.setMenu(true);
    //     camada.setTipoPai(1);
    //     camada.setTipoFilho(0);
    //     camada.setCarregado(false);
    //     camada.setFuncao('camada');
    //     camada.setPai(-1);
    //     camada.setCor('#6699FF');
    //     camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //      camada.setLegendaTipo(13);
    //     listaCamada.push(camada);

    //             camada = new kamada();
    //             camada.setId(553);
    //             camada.setNome('Padrão Lote Pgv');
    //             camada.setLayer('Birigui_sh:Pgv_d13');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(550);
    //             camada.setCor('#6699FF');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([16,15]);
    //             camada.setLegendaTipo(13);
    //             camada.setEscolha( [ {  id: 5 , parametro:'grupo'  , padrao: 1  } ]  );
    //             listaCamada.push(camada);

    //             camada = new kamada();
    //             camada.setId(554);
    //             camada.setNome('Padrão Lote Limite');
    //             camada.setLayer('Birigui_sh:Bairro_d13 ');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(550);
    //             camada.setCor('#6699FF');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([14,13]);
    //             camada.setLegendaTipo(13);
    //             camada.setEscolha( [ {  id: 5 , parametro:'grupo'  , padrao: 1  } ]  );
    //             listaCamada.push(camada);
  
    //             camada = new kamada();
    //             camada.setId(555);
    //             camada.setNome('Padrão Lote Municipal');
    //             camada.setLayer('Birigui_sh:Municipio_d13 ');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(550);
    //             camada.setCor('#6699FF');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([12,10]);
    //             camada.setLegendaTipo(13);
    //             camada.setEscolha( [ {  id: 5 , parametro:'grupo'  , padrao: 1  } ]  );
    //             listaCamada.push(camada);                    

    // camada = new kamada();
    // camada.setId(540);
    // camada.setNome('Visões Adensamento');
    // camada.setMenu(true);
    // camada.setTipoPai(1);
    // camada.setTipoFilho(0);
    // camada.setCarregado(false);
    // camada.setFuncao('camada');
    // camada.setPai(-1);
    // camada.setCor('#e88800');
    // camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    // camada.setLegendaTipo(14);
    // listaCamada.push(camada);


    //             camada = new kamada();
    //             camada.setId(541);
    //             camada.setNome('Padrão Adensamento Imovel');
    //             camada.setLayer('Birigui_sh:Geo_d14');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(540);
    //             camada.setCor('#e88800');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([21,19]);
    //             camada.setLegendaTipo(14);
    //             listaCamada.push(camada);


    //             camada = new kamada();
    //             camada.setId(542);
    //             camada.setNome('Padrão Adensamento Quadra');
    //             camada.setLayer('Birigui_sh:Quadra_d14');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(540);
    //             camada.setCor('#e88800');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([18,17]);
    //             camada.setLegendaTipo(14);
    //             camada.setEscolha( [ {  id: 6 , parametro:'grupo'  , padrao: 1  } ]  );
    //             listaCamada.push(camada);


    //             camada = new kamada();
    //             camada.setId(543);
    //             camada.setNome('Padrão Adensamento PGV');
    //             camada.setLayer('Birigui_sh:Pgv_d14');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(540);
    //             camada.setCor('#e88800');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([16,15]);
    //             camada.setLegendaTipo(14);
    //             camada.setEscolha( [ {  id: 6 , parametro:'grupo'  , padrao: 1  } ]  );
    //             listaCamada.push(camada);


    //             camada = new kamada();
    //             camada.setId(544);
    //             camada.setNome('Padrão Adensamento Limite');
    //             camada.setLayer('Birigui_sh:Bairro_d14');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(540);
    //             camada.setCor('#e88800');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([14,13]);
    //             camada.setLegendaTipo(14);
    //             camada.setEscolha( [ {  id: 6 , parametro:'grupo'  , padrao: 1  } ]  );
    //             listaCamada.push(camada);

    //             camada = new kamada();
    //             camada.setId(545);
    //             camada.setNome('Padrão Adensamento Municipal');
    //             camada.setLayer('Birigui_sh:Municipio_d14');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(540);
    //             camada.setCor('#e88800');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([12,10]);
    //             camada.setLegendaTipo(14);
    //             camada.setEscolha( [ {  id: 6 , parametro:'grupo'  , padrao: 1  } ]  );
    //             listaCamada.push(camada);

    // camada = new kamada();
    // camada.setId(570);
    // camada.setNome('Visões Uso do Imovel');
    // camada.setMenu(true);
    // camada.setTipoPai(1);
    // camada.setTipoFilho(0);
    // camada.setCarregado(false);
    // camada.setFuncao('camada');
    // camada.setPai(-1);
    // camada.setCor('#e80990');
    // camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    // camada.setLegendaTipo(20);
    // listaCamada.push(camada);



    //         camada = new kamada();
    //         camada.setId(571);
    //         camada.setNome('Ramo Empresarial Imovel');
    //         camada.setLayer('Birigui_sh:Geo_d20');
    //         camada.setMenu(true);
    //         camada.setTipoPai(0);
    //         camada.setTipoFilho(0);
    //         camada.setCarregado(false);
    //         camada.setFuncao('camada');
    //         camada.setPai(570);
    //         camada.setCor('#e80990');
    //         camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //         camada.setTotal();
    //         camada.setExibicao([21,19]);
    //         camada.setLegendaTipo(20);
    //         listaCamada.push(camada);

    //         camada = new kamada();
    //         camada.setId(572);
    //         camada.setNome('Ramo Empresarial Quadra');
    //         camada.setLayer('Birigui_sh:Quadra_d20');
    //         camada.setMenu(true);
    //         camada.setTipoPai(0);
    //         camada.setTipoFilho(1);
    //         camada.setCarregado(false);
    //         camada.setFuncao('camada');
    //         camada.setPai(570);
    //         camada.setCor('#e80990');
    //         camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //         camada.setTotal();
    //         camada.setExibicao([18,17]);
    //         camada.setLegendaTipo(20);
    //         camada.setEscolha( [ {  id: 7 , parametro:'grupo'  , padrao: 2  } ]  );
    //         listaCamada.push(camada);


    //         camada = new kamada();
    //         camada.setId(573);
    //         camada.setNome('Ramo Empresarial PGV');
    //         camada.setLayer('Birigui_sh:Pgv_d20');
    //         camada.setMenu(true);
    //         camada.setTipoPai(0);
    //         camada.setTipoFilho(1);
    //         camada.setCarregado(false);
    //         camada.setFuncao('camada');
    //         camada.setPai(570);
    //         camada.setCor('#e80990');
    //         camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //         camada.setTotal();
    //         camada.setExibicao([16,15]);
    //         camada.setLegendaTipo(20);
    //         camada.setEscolha( [ {  id: 7 , parametro:'grupo'  , padrao: 2  } ]  );
    //         listaCamada.push(camada);


    //         camada = new kamada();
    //         camada.setId(574);
    //         camada.setNome('Ramo Empresarial Limite');
    //         camada.setLayer('Birigui_sh:Bairro_d20');
    //         camada.setMenu(true);
    //         camada.setTipoPai(0);
    //         camada.setTipoFilho(1);
    //         camada.setCarregado(false);
    //         camada.setFuncao('camada');
    //         camada.setPai(570);
    //         camada.setCor('#e80990');
    //         camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //         camada.setTotal();
    //         camada.setExibicao([14,13]);
    //         camada.setLegendaTipo(20);
    //         camada.setEscolha( [ {  id: 7 , parametro:'grupo'  , padrao: 2  } ]  );
    //         listaCamada.push(camada);

    //         camada = new kamada();
    //         camada.setId(575);
    //         camada.setNome('Ramo Empresarial Municipal');
    //         camada.setLayer('Birigui_sh:Municipio_d20');
    //         camada.setMenu(true);
    //         camada.setTipoPai(0);
    //         camada.setTipoFilho(1);
    //         camada.setCarregado(false);
    //         camada.setFuncao('camada');
    //         camada.setPai(570);
    //         camada.setCor('#e80990');
    //         camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //         camada.setTotal();
    //         camada.setExibicao([12,10]);
    //         camada.setLegendaTipo(20);
    //         camada.setEscolha( [ {  id: 7 , parametro:'grupo'  , padrao: 2  } ]  );
    //         listaCamada.push(camada);

    // camada = new kamada();
    // camada.setId(530);
    // camada.setNome('Visões Padrão Imovel');
    // camada.setMenu(true);
    // camada.setTipoPai(1);
    // camada.setTipoFilho(0);
    // camada.setCarregado(false);
    // camada.setFuncao('camada');
    // camada.setPai(-1);
    // camada.setCor('#e80000');
    // camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    // listaCamada.push(camada);

    //             camada = new kamada();
    //             camada.setId(531);
    //             camada.setNome('Padrão Imovel ');
    //             camada.setLayer('Birigui_sh:im');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(530);
    //             camada.setCor('#e80000');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([21,19]);
    //             camada.setLegendaTipo(10);
    //             listaCamada.push(camada);

    //             camada = new kamada();
    //             camada.setId(532);
    //             camada.setNome('Padrão Imovel Quadra');
    //             camada.setLayer('Birigui_sh:Quadras');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(530);
    //             camada.setCor('#e80000');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([18,17]);
    //             camada.setLegendaTipo(10);
    //             listaCamada.push(camada);

    //             camada = new kamada();
    //             camada.setId(533);
    //             camada.setNome('Padrão Imovel Limite');
    //             camada.setLayer('Birigui_sh:Bairro_padrao');
    //             camada.setMenu(true);
    //             camada.setTipoPai(0);
    //             camada.setTipoFilho(0);
    //             camada.setCarregado(false);
    //             camada.setFuncao('camada');
    //             camada.setPai(530);
    //             camada.setCor('#e80000');
    //             camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    //             camada.setTotal();
    //             camada.setExibicao([14,11]);
    //             camada.setLegendaTipo(10);
    //             listaCamada.push(camada);


/*      Birigui_sh:geo_Adensamento 
    camada = new kamada();
    camada.setId(202);
    camada.setNome('PGV Padrão');
    camada.setLayer('Birigui_sh:pgv_padrao');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(false);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('#1a08a6');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([16,12]);
    listaCamada.push(camada);
 */
  /*
    camada = new kamada();
    camada.setId(207);
    camada.setNome('Limitrofes');
    camada.setLayer('Birigui_sh:Limitrofes');
    camada.setMenu(true);
    camada.setTipoPai(0);
    camada.setTipoFilho(0);
    camada.setCarregado(true);
    camada.setFuncao('camada');
    camada.setPai(-1);
    camada.setCor('');
    camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    camada.setTotal();
    camada.setExibicao([21,1]);
    listaCamada.push(camada);
*/

    // camada = new kamada();
    // camada.setId(8);
    // camada.setNome('Birigui_click');
    // camada.setLayer('Birigui_sh:Birigui_click');
    // camada.setMenu(false);
    // camada.setCarregado(false);
    // camada.setFuncao('click');
    // camada.setPai(-1);
    // camada.setCor();
    // camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
    // camada.setTotal();
    // camada.setExibicao([21,13]);
    // listaCamada.push(camada);


// camada = new kamada();
// camada.setId(11);
// camada.setNome('Resultados por Area ');
// camada.setMenu(true);
// camada.setTipoPai(4);
// camada.setTipoFilho(0);
// camada.setCarregado(false);
// camada.setFuncao('camada');
// camada.setSubFuncao('grafico');
// camada.setPai(-1);
// camada.setCor('#1a08a6');
// camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
// camada.setTotal();
// camada.setExibicao([14,6]);
// listaCamada.push(camada);




// camada = new kamada();
// camada.setId(13);
// camada.setNome('GRAFICOs');
// camada.setMenu(true);
// camada.setTipoPai(4);
// camada.setTipoFilho(1);
// camada.setCarregado(false);
// camada.setFuncao('camada');
// camada.setSubFuncao('grafico');
// camada.setPai(-1);
// camada.setCor('#1a08a6');
// camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
// camada.setTotal();
// camada.setExibicao([14,6]);
// listaCamada.push(camada);

//     camada = new kamada();
//     camada.setId(999);
//     camada.setNome('MUNICIPIO');
//     camada.setLayer('Birigui_sh:Municipio');
//     camada.setMenu(false);
//     camada.setTipoPai(1);
//     camada.setTipoFilho(4);
//     camada.setCarregado(false);
//     camada.setFuncao('graficoPostGres');
//     camada.setSubFuncao(0);
//     camada.setPai(13);
//     camada.setCor('#fde56f');
//     camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
//     camada.setTotal();
//     camada.setExibicao([12,10]);
//     listaCamada.push(camada);

//     camada = new kamada();
//     camada.setId(998);
//     camada.setNome('LIMITE');
//     camada.setLayer('Birigui_sh:setor_distrito');
//     camada.setMenu(false);
//     camada.setTipoPai(1);
//     camada.setTipoFilho(4);
//     camada.setCarregado(false);
//     camada.setFuncao('graficoPostGres');
//     camada.setSubFuncao(1);
//     camada.setPai(13);
//     camada.setCor('#fde56f');
//     camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
//     camada.setTotal();
//     camada.setExibicao([14,13]);
//     listaCamada.push(camada);

//     camada = new kamada();
//     camada.setId(997);
//     camada.setNome('ZH');
//     camada.setLayer('Birigui_sh:Zona_Homogenea');
//     camada.setMenu(false);
//     camada.setTipoPai(1);
//     camada.setTipoFilho(4);
//     camada.setCarregado(false);
//     camada.setFuncao('graficoPostGres');
//     camada.setSubFuncao(2);
//     camada.setPai(13);
//     camada.setCor('#fde56f');
//     camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
//     camada.setTotal();
//     camada.setExibicao([16,15]);
//     listaCamada.push(camada);


//     camada = new kamada();
//     camada.setId(913);
//     camada.setNome('Graficos Padrão LOTE');
//     camada.setMenu(true);
//     camada.setTipoPai(2);
//     camada.setTipoFilho(6);
//     camada.setParams('tg=PI&gg=1&ts=13');
//     camada.setCarregado(false);
//     camada.setFuncao('herdeira');
//     camada.setSubFuncao('grafico');
//     camada.setPai(13);
//     camada.setCor('#1a08a6');
//     camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
//     camada.setTotal();
//     camada.setExibicao([14,13]);
//     camada.setLegendaTipo(13);
//     listaCamada.push(camada);


//     camada = new kamada();
//     camada.setId(914);
//     camada.setNome('Graficos Padrão Adensamento');
//     camada.setMenu(true);
//     camada.setTipoPai(2);
//     camada.setTipoFilho(6);
//     camada.setParams('tg=PI&gg=1&ts=14');
//     camada.setCarregado(false);
//     camada.setFuncao('herdeira');
//     camada.setSubFuncao('grafico');
//     camada.setPai(13);
//     camada.setCor('#1a08a6');
//     camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
//     camada.setTotal();
//     camada.setExibicao([14,13]);
//     camada.setLegendaTipo(14);
//     listaCamada.push(camada);


//     camada = new kamada();
//     camada.setId(915);
//     camada.setNome('Graficos Padrão USO IMOVEL');
//     camada.setMenu(true);
//     camada.setTipoPai(2);
//     camada.setTipoFilho(6);
//     camada.setParams('tg=PI&gg=2&ts=20');
//     camada.setCarregado(false);
//     camada.setFuncao('herdeira');
//     camada.setSubFuncao('grafico');
//     camada.setPai(13);
//     camada.setCor('#1a08a6');
//     camada.setInfo('Texto de informação sobre esta camada, e sua visualização');
//     camada.setTotal();
//     camada.setExibicao([14,13]);
//     camada.setLegendaTipo(20);
//     listaCamada.push(camada);


  function iniciaUso(){
    $("#pesquisa").attr('disabled','disabled');
    $("#formPesquisa").css('display','none');
    $(".navegacao").css('top','74px');


   // carregaGraficoCores();

    // getVariaveis( function(){  // SPOTO 
    //     if (variavel.length == 0){
    //     $("#config-1").hide();
    // }
    // });


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

 // carregaElementos( function(){document.getElementById('elementos').innerHTML = localStorage.getItem("options"); } );
 // carregaTotalPontos();

//  setQtdeCamada(); 
 // carregaPeriodoConsulta();

     // carregaDadosGraficoBirigui();
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


  function trataResposta(data) {
   var count = 1;
   var resposta = '';
   var imResposta = '';
   var zoom = map.getView().getZoom() ;



   data.features.forEach(function( item, index , value){
    var camada = item.id.substr(0, item.id.lastIndexOf(".") );

    switch(camada) {
      case 'Loteamentos':
      resposta += '<BR>'+`<b>Loteamento: </b>` + item.properties.LoteamNome ;
      break;
       case 'Limitrofes':
      resposta += `<b>Cidade: </b>` + item.properties.NM_MUNICIP ;
      break;
      case 'Bairros':
      resposta +='<b>Bairro:</b> '+item.properties.Nome;  // toUpperCase()
      break;


       case 'Pontos_Notaveis':
      resposta += '<BR>'+`<b> <center>` + item.properties.EQUIP_URB  + `</center> </b>` ;
      break;

     
      case 'Zona_homogenea':
      resposta +='<BR>'+'<b>Zona Homogenea:</b> '+item.properties.ZonaSigla;  // toUpperCase()
      break;
      
     case 'Zonas':
      resposta += '<BR>'+`<b>Zona: </b>` + item.properties.Zona ;
      break;

     case 'Setores_Fiscais':
      resposta += `<b> Setor: </b>` + item.properties.Setor ;
      break;


      case 'Quadras':  //  <link rel="icon" href="/favicon.ico" type="image/x-icon"> rel="icon" href="img/icon_pie.png" type="image/png"   //  

      resposta +=`<b> Quadra: </b>` + item.properties.CODQUADRA ;  //+`  `  + `   <a    title="Mais Informações" href="#" onclick="javascript:consultaQuadraG('`+item.properties.id+`')">  <img src="img/icon_pie2.png" alt="Visualizar Grafico." style="width:24px;height:24px;border:0;">  </a>` ;  // class="glyphicon glyphicon-adjust"    class="glyphicon glyphicon-adjust"
      //resposta += '<BR>'+`<b> Padrão: </b>` + item.properties.padrao ;
      break;
      case 'Zona_tributaria':
      resposta += '<BR>'+`<b>Zona Tributaria: </b>` + item.properties.descricao; //+'<BR>'
      break;
    

      case 'Macro_Zona':
        resposta += '<BR>'+`<b>Macro Zona: </b>` + item.properties.Macrozona; //+'<BR>'
        break;

      case 'Zona_Uso':
        resposta += '<BR>'+`<b>Zona Uso: </b>` + item.properties.Zonas_Uso; //+'<BR>'
        break;


      case 'Logradouros':
      if(resposta.indexOf(item.properties.nomerua)==-1)
        resposta += '<BR>'+`<b>Logradouro: </b>` + item.properties.name ;
    break;

        case 'geo_lote'  :
        
        if (item.properties.total==1 && zoom >15  ){  // id
        //    imResposta  ='<BR>'+'<b>ID: </b>'+item.properties.id  ;
            imResposta +='<BR>'+'<b>Inscrição: </b>'+item.properties.inscricao_municipal.replace('[','').replace(']','').replace('[','').replace(']','') .replace('"','').replace('"','')   ;
            imResposta +='<BR>'+'<b>Terreno Pref: </b>'+item.properties.area_terreno+'<b> m² </b>'  ;
            imResposta +='<BR>'+'<b>Terreno Real: </b>'+item.properties.area_apurada+'<b> m² </b>' ;
            imResposta +='<BR>'+'<b>Edificada Pref: </b>'+item.properties.area_edificada+'<b> m² </b>' ;
//            imResposta +='<BR>'+'<b>Padrão Imovel: </b>'+item.properties.padrao_do_imovel ;
            imResposta +='<BR>'+'<b>Testada: </b>'+item.properties.testada_metragem+' m '  ;
            imResposta += '<b>Qtde : </b>'+item.properties.testada_numero  ;
            imResposta +='<BR>'+'<b>R1: </b>'+item.properties.r1 +'<b> R2: </b>'+item.properties.r2 ;
            imResposta +='<BR>'+'<b>Indice: </b>'+item.properties.indice  ;  
        }else if ( zoom >15 ) {
            imResposta  ='<BR>'+'<b>Qtde Isncrições: </b>'+ item.properties.total  ;
            imResposta +='<BR>'+'<b>Terreno Pref: </b>'+item.properties.area_terreno+'<b> m² </b>'  ;
            imResposta +='<BR>'+'<b>Terreno Real: </b>'+item.properties.area_apurada+'<b> m² </b>' ;
            imResposta +='<BR>'+'<b>Edificada Pref: </b>'+item.properties.area_edificada+'<b> m² </b>' ;
//            imResposta +='<BR>'+'<b>Padrão Imovel: </b>'+item.properties.padrao_do_imovel ;
            imResposta +='<BR>'+'<b>Testada: </b>'+item.properties.testada_metragem+' m '  ;
            imResposta += '<b>  Qtde : </b>'+item.properties.testada_numero  ;
            imResposta +='<BR>'+'<b>R1: </b>'+item.properties.r1 +'<b> R2: </b>'+item.properties.r2 ;
            imResposta +='<BR>'+'<b>Indice: </b>'+item.properties.indice ;
        }

      break;


        case 'Lotes':
            if ( zoom >17)
                resposta += '<BR>'+'<b>Inscrição: </b>'+item.properties.inscCad; //+'<BR>'
                resposta += '<BR>'+'<b>IDFisico: </b>'+item.properties.idfisico; //+'<BR>'

        break;

        case 'geo_d14':
             if ( zoom >17)
                resposta += '<BR>'+'<b>' +item.properties.dimensao_nome  +': </b>'+ item.properties.dimensao_descricao; //+'<BR>'
        break;

        case 'geo_d15':
             if ( zoom >17)
                resposta += '<BR>'+'<b>'+item.properties.dimensao_nome  +': </b>' + item.properties.dimensao_descricao; //+'<BR>'
        break;

        case 'codigo_temp_empresa':
           //  if ( zoom >17)
            resposta += '<BR>'+`<b>Empresas: </b>` + item.properties.qtde +`  `  + `   <a    title="Mais Informações" href="#" onclick="javascript:consultaEmpresa('`+item.properties.codigo+`')">  <img src="img/icon_pie2.png" alt="Visualizar Grafico." style="width:24px;height:24px;border:0;">  </a>` ;  // class="glyphicon glyphicon-adjust"    class="glyphicon glyphicon-adjust"
        break;


      default:
      if ( item.properties.elemento_id != undefined ){
   //     resposta += '<BR>'+'<b>'+camada +' :</b>'  + localStorage.getItem("el"+item.properties.elemento_id );
      }else{
    //    resposta += '<BR>'+'<b>'+camada +'.</b>';
     //   console.log(item.properties);
      }

  } // fim swith
      });  // fim loop


    resposta += imResposta;

  return resposta;
}

/*
  function carregaDadosGraficoBirigui( ){

    $.ajax({
      type:     "GET",
      url:    './php/consultaBirigui.php?comando=graficosPadraoIM',
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



  function carregaDadosGraficoBirigui( ){

    $.ajax({
      type:     "GET",
      url:    './php/consultaBirigui.php?comando=graficosAll',
      async:true,
      dataType: "json",
      contentType: 'application/json',
      success: function(data){

        $.each( data, function( key, value ) {
            if (typeof value == 'object' && value.DESCRICAO != undefined ){
                var idTag = value.NIVEL + value.ID ,
                html  = '<a   class="overlay graficos grNv'+value.NIVEL+' GP" id="'+'PI' +'grafico'+idTag+'"  style="border: 0px solid #ccc"></a>' ;

                localStorage.setItem( '0'+idTag  , html  );    
                content.innerHTML += html ;  

                   dadosCC[ '1'+value.NIVEL + value.ID + value.TG ] =  JSON.parse (value.DADOS) ;
                try {
                  
                    localStorage.setItem( '1'+value.NIVEL + value.ID + value.TG , value.DADOS );
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
      error: function(e) {
        console.info(e.responseText);
        carregaGrafico = false ;
        alerta(3,'Falha ao carregar dados para graficos via PHP no banco de dados');
        startMAP() ;
      }
    });
  }


function consultaQuadraG (text , ajuste){

            $.ajax({
            type:     "GET",
             //     crossDomain: true,
            //      callback : parseResponse(evt),
            url:    './php/consultaBirigui.php?comando=consultaQuadra&busca='+text.replace(/^\s+|\s+$/g,""),
            async:true,
            dataType: "json",
            success: function(data){
              closer.onclick();

              var html = '' ;
              var resolution = 00 ;
              var loop = [];

                $.each( data, function( key, value ) {

                    if( typeof value == 'object' ){

                         x = [value.LONG , value.LAT ] ,
                         titulo = value.DESCRICAO ,
                         posicao = '4'+ value.ID + value.TG, 
                         identifica = '14'+ value.ID + value.TG ,
                         idTag = value.NIVEL + value.ID ;
                        html  += '<a   class="overlay graficos grNv'+value.NIVEL+' GP" id="'+'PI' +'grafico'+posicao +'"  style="border: 0px solid #ccc"></a>';
                        content.innerHTML += html ;  

                        dadosCC[ identifica ] =  JSON.parse (value.DADOS) ;

                        loop.push([ identifica , posicao , titulo ]);
                    }
                });


                if(x[0] !== undefined && x[1] !== undefined ){

                   // console.info(identifica , titulo , resolution , posicao );

                    if (ajuste){
                        ajusteCentro( visao.A.center ,  visao.A.zoom );
                    }


                    setTimeout(function(){
                      if (ajuste){
                      ajusteCentro( x , 20 ) ;
                    }
                      overlay.setPosition(x);

                    var resolution = 00 ;

                    var informativo  =  html ; // '<a   class="overlay graficos grNvB'+' GP" id="'+'PI' +'grafico'+posicao+'"  style="border: 0px solid #ccc"></a>' ;       
                    content.innerHTML = '<p>'+ informativo +'</p>' ;

                     //deuCerto =  graffPI( identifica , titulo , resolution , posicao    ) ;   // postMap( posicao ,center )

                     loop.forEach(function(item){
                        deuCerto =  graffPI( item[0] , item[2] , resolution , item[1]    ) ; 
                     });
                      
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


function consultaEmpresa (text , ajuste){

            $.ajax({
            type:     "GET",
             //     crossDomain: true,
            //      callback : parseResponse(evt),
            url:    './php/consultaBirigui.php?comando=consultaEmpresa&busca='+text.replace(/^\s+|\s+$/g,""),
            async:true,
            dataType: "json",
            success: function(data){
              closer.onclick();

              var html = '' ;
              var resolution = 00 ;
              var loop = [];

                $.each( data, function( key, value ) {

                    if( typeof value == 'object' ){

                         x = [value.LONG , value.LAT ] ,
                         titulo = value.DESCRICAO ,
                         posicao = '5'+ value.ID + value.TG +'-0', 
                         identifica = '15'+ value.ID + value.TG +'-0' ,
                         idTag = value.NIVEL + value.ID ;
                        html  += '<a   class="overlay graficos grNv'+value.NIVEL+' GP" id="'+'PI' +'grafico'+posicao +'"  style="border: 0px solid #ccc"></a>';
                        content.innerHTML += html ;  
                        dadosCC[ identifica ] =  JSON.parse (value.DADOS) ;
                        loop.push([ identifica , posicao , titulo ]);
                    }
                });


                if(x[0] !== undefined && x[1] !== undefined ){

                   // console.info(identifica , titulo , resolution , posicao );

                    if (ajuste){
                        ajusteCentro( visao.A.center ,  visao.A.zoom );
                    }


                    setTimeout(function(){
                      if (ajuste){
                      ajusteCentro( x , 20 ) ;
                    }
                      overlay.setPosition(x);

                    var resolution = 00 ;

                    var informativo  =  html ; // '<a   class="overlay graficos grNvB'+' GP" id="'+'PI' +'grafico'+posicao+'"  style="border: 0px solid #ccc"></a>' ;       
                    content.innerHTML = '<p>'+ informativo +'</p>' ;

                     //deuCerto =  graffPI( identifica , titulo , resolution , posicao    ) ;   // postMap( posicao ,center )

                     loop.forEach(function(item){
                        deuCerto =  graffPI( item[0] , item[2] , resolution , item[1]    ) ; 
                     });
                      
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
    troca = false ;


    if (feature['a'] !== undefined   ){
        if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Bairros' ){
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'pgv' ){
          var identifica = '12'+feature['O'].id ;
          var titulo = feature['O'].id +' - '+feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Bairro' ){
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Zona_uso' ){
          var identifica = '12'+feature['O'].id ;
          var titulo = feature['O'].id +' - '+feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'setor_distrito' ){  
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Zona_Homogenea' ){
          var identifica = '12'+feature['O'].id ;
          var titulo = feature['O'].id +' - '+feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Municipio' ){
          var identifica = '10'+feature['O'].id ;
          var titulo = feature['O'].descricao  ;
          var posicao = '0'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
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
      deuCerto =  graffPI( identifica , titulo , resolution , posicao ,  postMap( posicao ,center ) ) ;     
      
    }

    if (deuCerto === false) {
      console.log(' identifica '+identifica ,  '  titulo  '+titulo , '  resolution  '+resolution , '  posicao   '+posicao );
      console.log('DEU ERRRADDOO !!!  Ponha o titulo no polygons ');
    }

    if (troca ){
      var x = 1 ;
      var colo = 'red' ;
      var coloB = 'rgba(255, 0, 0, 0.55)' ;

    }else{
      var x = 0.1 ;
      var colo = 'blue'; 
      var coloB = 'rgba(0, 0, 255, 0.00)' ;
    }
    
    var style =  new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: colo ,
          width: x
      }),
      fill: new ol.style.Fill({
        color:  padrao_cor !==undefined ? padrao_cor : coloB 
      }),
    //  text: createTextStyle(feature, resolution, myDom.polygons)
    });

    styleCache[resolution][titulo].push(style);
    return style;
  }


  function graffPI(x , titulo , resolution , posicao) {

    var nivel = posicao.substr(0,1);

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
  var calculo = (view.getZoom() < 13 &&  view.getZoom() > 10 ) ? zoom* 0.8 : (view.getZoom() <= 10 ) ? zoom*1.25 : zoom*0.90 ; 

  var widthX  = /*20  + */(12 * (22 - calculo )) ; ;
  var heightX = /*10 + */ (10 * (22 - calculo )) ; ;
  var usaCor = [];

  var ind  = '' ;

  if( x.indexOf('-') === -1 ){  // quadra tem - e comercio tem - 
    usaCor = cores[params['ts']];
    switch (params['ts']){
        case '13':
            ind  = x+ params['ts']  + '-' + getVariavel(5,1) ;
        break;
        case '14':
            ind  = x+ params['ts']  + '-' + getVariavel(6,1)  ;
        break;
        case '15':
            ind  = x+ params['ts']  + '-' + getVariavel(7,1)   ;
        break;
        case '20':
            ind  = x+ params['ts']  + '-' + getVariavel(7,1)   ;
        break;
        default:
            ind  = x+ params['ts']  + '-' + params['gg']  ;
      }
  }else{
    ind  = x ;
    var aux =   x.slice(-4).slice(0,2);
    usaCor = cores[aux];
  }
    
    dados =  dadosCC[ind] !== undefined  ? dadosCC[ind] : undefined ;

//console.info(nivel + ' =  ' + titulo );

    if (nivel == 4 ){
        widthX = widthX*4.5;
        heightX = heightX*1.7;
        legenda = 'right';
    }else if (nivel == 5 ){
        widthX = widthX*4.3;
        heightX = heightX*1.5;
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

 if (dados  !== undefined ){
   data.addRows(dados );
   // console.log(aux  + ' <-> '  + dados[aux][0]  );
    var options = { title:  titulo , 
                    titleTextStyle : {  color: 'black',
                                       // fontName: <string>,
                                        fontSize: 10,
                                        bold: true,
                                        italic: false } ,
                   legend:{position: legenda ,
                            textStyle: { color: 'black', 
                                        fontSize: 10 
                                      },
                            alignment : 'start'
                          } , 


                     is3D: true,
                    colors:  usaCor ,

                    fontSize : 8 ,
                    forceIFrame : true ,
                    pieSliceText : 'value'   ,  // percentage , label  , none  , value 
                    tooltip: {  isHtml: false , 
                                showColorCode : true ,
                                ignoreBounds : false , 
                              //  trigger :'focus' , 
                               // width: 40 , 
                                textStyle : { color: 'black',
                                             // fontName: <string>,
                                              fontSize: 10,
                                              bold: true,
                                              italic: false}
                              } ,
                    pieSliceTextStyle : {  color: 'white',
                                       // fontName: <string>,
                                        fontSize: 8,
                                        bold: false,
                                        italic: false } ,
                 //    enableInteractivity : false , 
               //    pieSliceText: 'label',
                   // slices: {  2: {offset: 0.2},3: {offset: 0.3}, 4: {offset: 0.4}, },
                   width:widthX,
                   height:heightX,
                   backgroundColor: { fill:'transparent' }
                    };

//console.info('graffPI  ->  '+params['tg']+'grafico'+posicao);
//console.info('dados  ->  '+dados);

   var chart = new google.visualization.PieChart(document.getElementById(params['tg']+'grafico'+posicao ) );
    chart.draw(data, options);
  }else{
    console.info('DADOS NÂO ENCOTRADOS !'+ 'titulo = '+titulo +' x = '+x );
  }
}



  function carregaLegenda(id){

    if (id!==undefined)
        $.ajax({
          type:     "GET",
          url:    './php/consultaBirigui.php?comando=legendaDimensao&busca='+id,
          async:true,
          dataType: "json",
          contentType: 'application/json',
          success: function(data){

            if(data['TOTAL']>0){  //  <caption>Monthly savings</caption>

                var idTag = 'legendaCol'+data[0]['ID'];
                htmlLeg = '<table style="display: inline-grid ;" id="'+idTag+'">' +   '<caption  >'+data[0]['TITULO']+'</caption>'  ; //  '<thead colspan="3"> <tr>  <td> '+data[0]['TITULO']+' </td> </tr> </thead> <tbody>'   ;

                var styloBolinha = ' border: 1px solid white; width: 20px; height: 20px; z-index: 999; -webkit-border-radius: 10px; -moz-border-radius: 10px;   border-radius: 10px;'
                $.each( data, function( key, value ) {  //#4CAF50
                    if (value['DESCRICAO'] !== undefined && value['PADRAO_COR'] !== undefined){
                        var cor = styloBolinha + ` background-color:`+value['PADRAO_COR']+ '!important' ;
                        htmlLeg += '<tr> <td> '+'<div style="'+cor+' ">  '+ '</td> <td>  '+value['DESCRICAO'] +'</td> ';

                        if(value['REGRA'] !== undefined){
                           htmlLeg += ' <td>  '+value['REGRA'] +'</td> '
                        }
                        htmlLeg += ' </tr>';

                    }
                }); 

                htmlLeg += `</table>`;
               // $(".legenda").html(htmlLeg);
               // $(".legenda").show();
                var oqueTem = $("#legendaVertical").html();
              

                if (oqueTem.indexOf('legendaCol'+data[0]['ID']) !== -1 ){

                }else{
                    $("#legendaVertical").html(oqueTem + htmlLeg);
                }
            }
            
          }, 
          error: function(e) {
            console.info(e.responseText);
            //carregaGrafico = false ;
            alerta(3,'Falha ao carregar dados para legenda via PHP no banco de dados');
          //  startMAP() ;
          }
        });
  }


  function carregaGraficoCores(){

    $.ajax({
      type:     "GET",
      url:    './php/consultaBirigui.php?comando=graficosCores',
      async:true,
      dataType: "json",
      contentType: 'application/json',
      success: function(data){

        $.each( data, function( key, value ) {
            if (typeof value == 'object' && value.CORES != undefined ){
                cores[value.ID] =  JSON.parse(value.CORES) ;
            }
        }); 
      }, 
      error: function(e) {
        console.info(e.responseText);
        alerta(3,'Falha ao carregar as cores para graficos via PHP no banco de dados');
        startMAP() ;
      }
    });
  }


  function getVariaveis(){

    $.ajax({
      type:     "GET",
      url:    './php/consultaBirigui.php?comando=variaveis',
      async:true,
      dataType: "json",
      contentType: 'application/json',
      success: function(data){
        variavel.length = 0 ;
        $.each( data, function( key, value ) {
            if (typeof value == 'object' ){  //&& value.VARIAVEL_ID != undefined 
                variavel.push(value); 
            }  
        }); 
      }, 
      error: function(e) {
        console.info(e.responseText);
        alerta(3,'Falha ao carregar as cores para graficos via PHP no banco de dados');
       // startMAP() ;
      }
    });
  }


  function getVariavel(id , estudo){
    var resposta = null ;
    variavel.forEach(function(item , index ){
        if(item.VAR_ID == id  && item.ID == estudo ){
            resposta = item.SELECIONADO !== undefined  ?  item.SELECIONADO  :  item.VALOR  ; 
        }
    });
    return resposta;
  }



  function setVariavel(id , estudo , valor ){

    variavel.forEach(function(item , index ){
        if(item.VAR_ID == id  && item.ID == estudo ){
            if(item.VALOR_ID !== undefined ){
                item.SELECIONADO = valor;
                if(item.VALOR_ID == valor){
                    item.VALOR_BOOLEAN = true ; 
                }else{
                    item.VALOR_BOOLEAN = false ; 
                }
            }else{
                item.VALOR = valor ;
            }
        }
    });
    return true;
  }

  function setVariaveis(campos){

    var texto = decodeURIComponent(campos);
    //console.info(texto);
    var campo = campos.split('ss=ss');

    campo.forEach(function(item, index){
        if(item!==""){
               $.ajax({
                  type:     "GET",
                  url:    './php/consultaBirigui.php?comando=updateVAR&'+item,
                  async:true,
                  dataType: "json",
                  contentType: 'application/json',
                  success: function(data){

                  }, 
                  error: function(e) {
                    console.info(e.responseText);
                    alerta(3,'Falha ao carregar as cores para graficos via PHP no banco de dados');
                  }
                }); 
        }

    });
  }



  function atualizarCalculos(dimensao){

    $.ajax({
      type:     "GET",
      url:    './php/consultaBirigui.php?comando=reFazer&tabela='+dimensao,
      async:true,
      dataType: "json",
      contentType: 'application/json',
      success: function(data){

        $('#limpar').click();

      }, 
      error: function(e) {
        console.info(e.responseText);
        alerta(3,'Falha ao carregar as cores para graficos via PHP no banco de dados');
       // startMAP() ;
      }
    });
  }
