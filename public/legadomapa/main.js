var logoElement = document.createElement('a');
logoElement.href = 'http://www.mitrasistemas.com.br/';
logoElement.target = '_blank';

var logoImage = document.createElement('img');
logoImage.src = 'img/logo_mitra.gif';

logoElement.appendChild(logoImage);

if (carregaGrafico){
    $('#londeando').show() ;
    travaBtn(true) ;
  google.charts.load('current', {
    callback: carregaGraficos,
    packages: ['corechart']    // ['bar', 'corechart', 'table']
  });


}else{
    $('#trocaG').hide();
    $('#limpar').hide();
    
  setTimeout(function(){
     startMAP();
   } ,300);
}

if (consultaPeriodo){
  $('#formConsultaPeriodo').show();

  var newForma = [] ;
  var formas = [ 'square' , 'circle' , 'triangle' , 'star' , 'cross' , 'x' ];

    var ano     = $('#ano').val() === '' ? '2017' :  $('#ano').val()  ;
    var mes     = $('#mes').val() === '' ?   '03' :  $('#mes').val()  ;
     $('#ano').val(ano);
     $('#mes').val(mes);

      var params = {
       mes: mes,
       ano: ano
    }


    var qtdeNvl     = 2 ;   // [municipio  , zonas , setores ,  quadras ,  -- bairros ]

   params['tg'] = 'GP' ;     // TIPO GRAFICO  ( GP = Google Pizza  ,  DP = D3js Porcentagem )
   params['ts'] =  0 ;     // TIPO SOMA     ( subTIPO do GRAFICO , identifica valor q será informado )
   params['gg'] =  1 ;

   var tiposDG = ['% de consumo m³' , '% de consumo valor' , '% de adimplência' , '% de inadimplência'   ];
   var tiposGP = ['Consumo m³ por Categoria'  ];
    params['dados'] = '0' ; 

    params['ident'] = params['ano'] +zeroTxt(2, params['mes'])+cidade ;
    params['time'] = performance.now();

}else{
   $('#formConsultaPeriodo').hide();
}


// loads event's

function Progress(el) {
  this.el = el;
  this.loading = 0;
  this.loaded = 0;
}

      /**
       * Increment the count of loading tiles.
       */
       Progress.prototype.addLoading = function() {
        if (this.loading === 0) {
          this.show();

        }else{
          document.body.style.cursor='progress'; // 'wait'
        }
        ++this.loading;
        this.update();
      };

      /**
       * Increment the count of loaded tiles.
       */
       Progress.prototype.addLoaded = function() {
        var this_ = this;
        setTimeout(function() {
          ++this_.loaded;
          this_.update();
        }, 100);
      };

      /**
       * Update the progress bar.
       */
       Progress.prototype.update = function() {
        var width = (this.loaded / this.loading * 100).toFixed(1) + '%';
        this.el.style.width = width;
        if (this.loading === this.loaded) {
          this.loading = 0;
          this.loaded = 0;
          var this_ = this;
          setTimeout(function() {
            this_.hide();
            document.body.style.cursor='default';
          }, 500);
        }
      };


      /**
       * Show the progress bar.
       */
       Progress.prototype.show = function() {
        this.el.style.visibility = 'visible';
      };


      /**
       * Hide the progress bar.
       */
       Progress.prototype.hide = function() {
        if (this.loading === this.loaded) {
          this.el.style.visibility = 'hidden';
          this.el.style.width = 0;
        }
      };

      var progress = new Progress(document.getElementById('progress'));

      var projecao = 'EPSG:4326';
      var gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];

//  Resolutionn

var projExtent = ol.proj.get(projecao).getExtent();
var startResolution = ol.extent.getWidth(projExtent) / 256;
var resolutions = new Array(22);
for (var i = 0, ii = resolutions.length; i < ii; ++i) {
  resolutions[i] = startResolution / Math.pow(2, i);
}

var projection = new ol.proj.Projection({
  code: projecao,
  units: 'degrees',
  axisOrientation: 'neu'
});


var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
var exibi = [1,1,0.3515625 ,0.17578125,0.087890625,0.0439453125 ,0.02197265625 ,0.010986328125 , 0.0054931640625 ,0.00274658203125 ,0.001373291015625 , 0.0006866455078125 , 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625 , 0.00004291534423828125,0.000021457672119140625 , 0.000010728836059570312 ,0.000005364418029785156, 0.000002682209014892578 , 0.000001341104507446289 , 0.0000003352761269 ];
var format = 'image/png';                                                                                                                                                                                                                                     
var baseParams = ['VERSION','LAYER','STYLE','TILEMATRIX','TILEMATRIXSET','SERVICE','FORMAT'];

//   center: [-45.42120313 , -22.9423708705  ],

var layers  = [];

var tileGrid2 = new ol.tilegrid.WMTS({
  tileSize: [256,256],
   extent:  [-180.0,-90.0,180.0,90.0],
 //  extent:  [-45.42 ,-22.93 ,-45.43 ,-22.92 ],
   origin: [-180.0, 90.0],
  resolutions: resolutions,
  matrixIds: gridNames
})
/*
      var vectorSource = new ol.source.Vector({
        features: []
      });

      var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
         projection:  projecao
      });
vectorSource
*/

accessToken = 'pk.eyJ1Ijoic3BvdG8iLCJhIjoiY2pqMGZybWFqMGhndzNxcGNhbmltMWVsOSJ9.LGMDtEX8c38QjbrG8EJL6g';
//accessToken = 'cd02c3aa-6877-4413-b792-edaa23a83b14';

layers = [
    // (new  ol.Layer.OSM("OpenCycleMap",
    //                              ['https://tile.thunderforest.com/cycle/${z}/${x}/${y}.png?apikey=<insert-your-apikey-here>']
    //                             ); ) ,
   /* (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
          projection:  projecao,
          source: new ol.source.BingMaps({
            // key: 'Aj4MzqaMf72vwySmTgkpQoA68vmZkyP0SkHAzmFYePkCb5PsRVB0sQaBzQGbgt_K',
            imagerySet: 'Road'
          })
        })),
    (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
          projection:  projecao,
          source: new ol.source.BingMaps({
            // key: 'Aj4MzqaMf72vwySmTgkpQoA68vmZkyP0SkHAzmFYePkCb5PsRVB0sQaBzQGbgt_K',
            imagerySet: 'Aerial'
          })
        })),
    (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
          projection:  projecao,
          source: new ol.source.BingMaps({
            // key: 'Aj4MzqaMf72vwySmTgkpQoA68vmZkyP0SkHAzmFYePkCb5PsRVB0sQaBzQGbgt_K',
            imagerySet: 'AerialWithLabels'
          })
        })),
   */
    (new ol.layer.Tile({
      visible: false,
      source: new ol.source.OSM(  ), //{layer:'mapnik'}
      projection:  projecao
    })) ,

     (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
          projection:  projecao,
            source: new ol.source.Stamen({
              layer: 'toner-lite'
            })
          })),
    (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
          projection:  projecao,
            source: new ol.source.Stamen({
              layer: 'terrain'   // terrain-labels
            })
          }) ),
    (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
      source: new ol.source.XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
      })
    })),
     (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
      source: new ol.source.XYZ({
        url:  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' // 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
      })
    })),
        (new ol.layer.Tile({
          visible: false,
          preload: Infinity,
          projection:  projecao,
            source: new ol.source.Stamen({
              layer: 'watercolor'
            })
          })),
        (new ol.layer.Tile({
            visible: false,
          preload: Infinity,
          title: 'DigitalGlobe Maps API: Recent Imagery with Streets',
          attribution: "© DigitalGlobe, Inc",
          source: new ol.source.XYZ({
            url: 'http://b.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token='+accessToken
  })
}))

];

/*    
central de ideias. -> https://mc.bbbike.org/mc/

OpenCycleMap
https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Transport
https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Landscape
https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Outdoors
https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Transport Dark
https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Spinal Map
https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Pioneer
https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Mobile Atlas
https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
Neighbourhood
https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=0a5bbcb7d2404a32b3b1db624665c34f
*/


listaCamada.forEach(CriaCamada);


function CriaCamada(item, index ){

  var entra = ( (item.getFuncao() === 'grafico' || item.getSubFuncao() === 'grafico' )  && !carregaGrafico ) ? false : true ; 
  if (item.getMenu() && entra ){

    var cores = ['#000000', '#8B4513','#2E8B57','#6A5ACD','#EE82EE','#B0C4DE'];
    var axu = item.getId() % cores.length;
    var cor = item.getCor()!= undefined ? item.getCor() : cores[axu] ;
   
    if ((item.getFuncao() == 'grafico' && !carregaGrafico  ) ||  (item.getSubFuncao() == 'grafico' && !carregaGrafico  ))
      {
        item.setCarregado(false); 
        //  Talvez Return False;
      }

    var xecado = item.getCarregado() ? `checked` : null ;
    
    var qtdeF = qtdeFilhos(item.getId(),false);

    item.setQtdeF(qtdeF);

    var qtdeV = qtdeFilhos(item.getId(),true);
    
    var pai = item.getPai() ;
    var submenu =  '' ;
    var checkmini = '' ;

    if (pai !== -1 && pai !== -2 ){

      submenu =  `btn-sub-panel btn-sm` ;    
      checkmodelo = ` material-switch-mini`;
      var tmeuPai = 0 ;

      listaCamada.forEach(function( lista , index ){
        if( lista.getId() === pai ){
          tmeuPai = lista.getTipoPai();
          return
        }
      });
      if (tmeuPai !== undefined && tmeuPai !== 4 ){
        item.setTipoPai(tmeuPai);
      }
    }else{
      checkmodelo = `  material-switch`;
    }


    var link = ``;
    var badge =``;
    var iconehtml =``;
    var modalConfig = `<button class="btn glyphicon glyphicon-cog btn-config " data-toggle="modal" id="config`+item.getId()+`" data-target="#configModal"> </button>`;

    if (  qtdeF > 0   )   {
      if(qtdeV == 0){
        xecado = false;
        item.setCarregado(false);
      }

      link = `" class="btn btn-panel clearfix menu-camada  `+submenu+`" data-toggle="collapse" data-target="#collapse`+item.getId()+`">`;
      badge = `<span id="badge`+item.getId()+`" class="badge">`+qtdeV+`</span>`;
      iconehtml = `<div class="menu-icon" id="icon`+item.getId()+`">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>`;
      if (item.getTipoPai() === 3){
        badge = '' ;
      }              
    }else{
      link = `" class="btn btn-panel clearfix  no-final `+submenu+`" >`;
    }

    var botaohtml = `<button  title="`+item.getInfo()+`"  type="button"  id="btn`+item.getId()+link+item.getNome()+`  `+badge+` </button>`;

    var checkhtml = `<div class="`+checkmodelo+` " title="`+item.getNome()+`" >
                        <input id="check`+item.getId()+`"  name="someSwitchOption001" type="checkbox" value="`+item.getId()+`" onchange="change_checkbox(this)"  `+ xecado + `/>
                        <label id="label`+item.getId()+`" for="check`+item.getId()+`" class="label-default"  style="background:`+cor+`" ></label>
                      </div>`;

    if (item.getLayer() !== undefined  || (    item.getFuncao() === 'base' && item.getPLista() !== undefined ) /* ||  item.getParams() !== undefined */ ){
      checkhtml = `<span class="lado-direito pull-right">`+modalConfig + checkhtml +` </span>`;
    }else {
      checkhtml = `<span class="lado-direito pull-right">  `+ checkhtml +` </span>`;
    }

    if (item.getTipoPai() === 3){
      checkhtml = '' ;
      iconehtml = '' ;
    }

    var htmll = `<li  class="list-group-item  " >` +
                  `<div class="input-group clearfix ">`+
                    `<div class="input-group-btn " >`+
                      iconehtml + botaohtml +
                    `</div>` +
                     checkhtml +
                  `</div>` ;

    if (qtdeF > 0){

      if ( item.getFuncao() == 'temporal' )  {
        htmll += `<div id="collapse`+item.getId()+`" class="panel-collapse collapse">
                    <ul class="list-group " id="lista-camada`+item.getId()+`" >
                      <li class="list-group-item" >
                        <div id="formConsultaPeriodo22">
                          <div class="input-group">
                            <span class="input-group-btn">
                                 <button type="button" class="btn btn-number"  data-type="minus" data-field="quant[2]">
                                    <span class="glyphicon glyphicon-chevron-left"></span>
                                 </button>
                            </span>
                            <input style="text-align: center;" type="text" name="quant[2]" class="form-control input-number"  id="paramsDados1" value="03/2017" min="0" max="6">
                              <span class="input-group-btn">
                                    <button type="button" class="btn btn-number" data-type="plus" data-field="quant[2]">
                                        <span class="glyphicon glyphicon-chevron-right"></span>
                                    </button>
                              </span>
                          </div>  
                        </div>
                      </li>
                    </ul>`;
               
      }else{
                htmll += `<div id="collapse`+item.getId()+`" class="panel-collapse collapse">
                    <ul class="list-group " id="lista-camada`+item.getId()+`" ></ul>`;
      }

    }else{
      htmll += `</li>`;
    }

    document.querySelector("#lista-camada"+ pai).innerHTML += htmll ;
  }else{
    // item.setCarregado(false);
  }

  if ( item.getLayer() != undefined ){
    var telha = carregar(item);
    layers.push(telha);
    item.setPLista(layers.indexOf(telha));
  }

}; // fim função criaCamada




$('#configModal').on('show.bs.modal', function (event) {
  /*
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
*/
  // console.info(event ); 
  // console.info(event.relatedTarget.id );
  //console.info($(this).get(0).id );


  var origem = parseInt(event.relatedTarget.id.substr ('config'.length ) );
  // console.info(origem );
  var minZ = 0,
   maxZ = 0,
   tipo = '',
   color = '',
   size  = -1 ,
   forma = '1',
   htmlColor = ``,
   htmlSize = `` ,
   htmlForma = ``,
   nome = '',
   poss = 0 ,
   plis = 0 ,
   oldOpa = 1,
   trocaForma = false,
   legendaTipo = '',
   escolha = [],
   escolhaOpcao = [],
   valorEscolha = [];


  listaCamada.forEach(function(item , index) {
    if(item.getId() == origem ){
        if (item.getExibicao()!=undefined){
          maxZ = item.getExibicao()[0] ;
          minZ = item.getExibicao()[1]  ;
        }else{
          minZ = visao.A.minZoom ;
          maxZ = visao.A.maxZoom;
        }

        tipo = item.getFuncao();
        nome = item.getNome();
        poss = index ;
        plis = item.getPLista();
        legendaTipo = item.getLegendaTipo();
        trocaForma = (item.getPai() == '4') ? true : false ;
        if(item.getCor() !== undefined && item.getCor().indexOf('gradient') === -1  && ( !usaCache  || item.getPai() == '4' )  ){
          color = item.getCor();
        }
        size = item.getSize() !== undefined ? item.getSize() : size ;

    }
  });


  oldOpa = layers[plis].getOpacity() *100 ;
//  console.info(exibi[minZ]+' minZ = '+minZ +' || Max ->  ' + (exibi[maxZ]+ 0.00000000001) + '    maxZ = '+maxZ );


  $(this).find('.modal-title').text('Configuração da Camada ' + nome) ;

  if(color){
    htmlColor = ` <p> Cor </p>
              <div id="cp2" class="input-group colorpicker-component">
                  <input type="text"  id="colorModal"  value="`+color+`" class="form-control" />
                  <span class="input-group-addon"><i></i></span>
              </div>`;
    }
    if (size !== -1 ){
      htmlSize += `<p> Tamanho </p> 
                    <input type="text"  id="sizeModal"  value="`+size+`" class="form-control imput-md" />` ;
    }
    if(trocaForma){ //forma
      
    htmlForma += `<div class="form-group">
                      <label class="control-label" for="Decision Timeframe">Forma</label>
                      <div class="">
                        <select id="formaModal" name="formaModal" class="form-control">
                          <option value="0"> Quadrado </option>
                          <option value="1"> Circulo </option>
                          <option value="2"> Triangulo </option>
                          <option value="3"> Estrela </option>
                          <option value="4"> Cruz </option>
                          <option value="5"> 'X' </option>
                        </select>
                      </div>
                    </div>`;
    }


 /*    htmlForma = `<p> Forma </p> 
              <div class="btn-group">
                <button type="button" id="btnFormaModal" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    Selecione forma <span class="caret"></span>
                </button>
                <ul id="ulFormas" class="dropdown-menu list" role="menu">  
                    <li><span class="glyphicon glyphicon-stop"></span> Quadrado</li>
                    <li><span class="glyphicon glyphicon-record"></span> Circulo </li>
                    <li><span class="glyphicon glyphicon-triangle-top"> Triangulo</span></li>
                    <li><span class="glyphicon glyphicon-star"></span> Estrela</li>     
                    <li><span class="glyphicon glyphicon-plus"></span> Cruz</li>
                    <li><span class="glyphicon glyphicon-remove"></span> 'X'</li>         
                </ul>
            </div>`;  

    $("#ulFormas .li").off( "click");

   $("#ulFormas .li").click(function(){
        alert(  ' 1');
        var selText = $(this).html();
        console.info(selText);
        $(this).parents('.input-group-btn').find('.btn-default').html(selText); 
        });             
    }*/ 
/*
 square  A square
circle  A circle
triangle  A triangle pointing up
star  five-pointed star
cross A square cross with space around (not suitable for hatch fills)
x A square X with space around (not suitable for hatch fills)
*/


  htmlOpacity = ` <p> Opacidade </p> <input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="100"/>`;

  htmlZoom  = ` <p> Vizualização </p> <input id="ex12c" type="text"/>   <br/>
       <div id="cp2" class="input-group colorpicker-component"> `+htmlColor+`          
      </div>`;


   // console.info('origem' );
   // console.info(origem );

   var htmlVar = '';

   if(origem===-1){
    htmlOpacity = '' , htmlZoom = '' ;
      $(this).find('.modal-title').text('Configuração Geral do Municipio') ;

      htmlVar +=  '<div class="panel panel-default panel-config">';
      variavel.forEach(function(it, ind ){

        it.VARIAVEL = it.VARIAVEL.replace('_',' ').replace('_',' ').replace('_',' ').replace('_',' ');

        if(it.VALOR_ID!==null ){
          let jaExiste = false;
          escolha.forEach(function(item , index ){
            if (it.VAR_ID === item.id ){
              jaExiste = true ;
            }
          });

       if( !jaExiste ){
          escolha.push(   {  estudo: it.ID  ,  id : it.VAR_ID , escolha:  it.VARIAVEL , padrao : it.SELECIONADO  }   );
        }

        escolhaOpcao.push(  {estudo:  it.ID  ,  id : it.VAR_ID  , opcao:  it.VALOR_ID  , descricao :  it.VALOR  }      );

        }else{
          htmlVar += '<div class="form-group"><label class="col-sm-6 control-label"" > '+it.VARIAVEL+ '</label>'+
                              '<div class="col-sm-6"> <input type="number" id="var'+it.VAR_ID+'" name="var'+it.VAR_ID+'" value="'+it.VALOR+'"  required></div></div>';  
        }
      });

       htmlVar +='</div>'; // FECHA DIV PANEL-CONFIG

       if (escolha !== undefined &&  escolha.length != 0){
          htmlVar +=  '<div class="panel panel-default panel-config">';
          escolha.forEach(function(item , index){
          valorEscolha.push([item.id, item.padrao]) ;
          let titulo = item.escolha , idEscolha = item.id , padrao = item.padrao ;
          htmlVar += `<div class="form-group">
                      <label class="control-label col-sm-6 " for="Decision Timeframe">`+titulo+`</label>
                      <div class="col-sm-6">
                        <select id="escolha`+idEscolha+`" name="escolha" class="form-control">` ;

            escolhaOpcao.forEach(function(it , ind ){
                if(it.id == idEscolha){
                  selecao = (it.opcao == padrao) ? 'selected="selected"' : '' ;
                htmlVar += `<option value="`+it.opcao+`" `+selecao+`   > `+it.descricao+` </option>`;
                }
            });
                htmlVar +=  `</select>
                           </div>
                         </div>`;
          } );
          htmlVar +='</div>'; // FECHA DIV PANEL-CONFIG
        }

   }

    $(".modal-body").html( htmlVar + htmlZoom + htmlOpacity + htmlSize  +htmlForma  ) ;

  if(color){
     $('#cp2').colorpicker({  format: "hex" , color: color  });
  }
      $("#ex12c").slider({ id: "slider12c", min : visao.A.minZoom  , max: visao.A.maxZoom  , range: true, value: [  minZ , maxZ ] });
      $('#ex1').slider({ formatter: function(value) {  return 'Valor : ' + value  ;  } });
      $('#ex1').slider('setValue', oldOpa);


/*if(newForma[origem] !== undefined ){
  $('#formaModal').val(newForma[origem] );
}else{
  $('#formaModal').val(1);
  newForma[origem] = 1 ;
}
*/

$("#salvarConfig").off( "click");

$("#salvarConfig").click(function(){

  var recarregaParams   = false;
  var updateSql         = false;
  var recarregaView     = false;
  var id_variavel       = null ; 
  var recarregaLayer    = false;
  var update = [] ;

  if(trocaForma){
    var novaForma = $('#formaModal').val();  
  }
  

  //alert(origem+' '+nome );
  if(color){
   var  nova = $("#colorModal").val();
   if(nova !== color){
    listaCamada[poss].setCor(nova);
    $("#label"+origem).css("background-color", nova );
    recarregaParams = true;
   }
  }

  if (size !== -1 ){
    var novoSize  = $("#sizeModal").val();
    if (size !== novoSize ){
      listaCamada[poss].setSize(novoSize);
      recarregaParams = true;
    }
  }



  if ( novaForma !== undefined && newForma[origem] !== undefined &&  newForma[origem] !==  parseInt(novaForma) ){  //forma !== novaForma
    newForma[origem] = parseInt(novaForma);
    recarregaParams = true;
  }


if(origem!==-1){
  var aux = $("#ex12c").val().split(',');
  var opa = parseFloat($('#ex1').val()) ;
  var minA = parseInt(aux[0]);
  var maxA = parseInt(aux[1]);
}else{
    variavel.forEach(function(it, ind ){
      let newVAL = $("#var"+it.VAR_ID).val() ; 

      if( newVAL!==undefined && newVAL !== it.VALOR ){
        recarregaView = true;
        id_variavel = it.id; 
        it.NOVO_VALOR = newVAL;
        updateSql = true;
        update.push( {estudo: it.ID , var_id : it.VAR_ID , valor_old: it.VALOR , valor_new: newVAL  , campo: 'VALOR_DOUBLE'  , ss:'ss'  } ); 
      }
    });
/*   TEM ESCOLHA ,,, VERIFICAR QUAL CAMADA DEVO ATUALIZAR ... 
*/


  if (escolha !== undefined && escolha.length != 0){
    escolha.forEach(function(item, index){
      var novaEscolha = $('#escolha'+item.id).val();
        if (novaEscolha != item.padrao ) {
           recarregaLayer  = true;
          updateSql = true; 
          item.NOVO_VALOR = novaEscolha;
          item.SELECIONADO = novaEscolha;
          setVariavel(item.id , item.estudo ,novaEscolha );
          update.push( {estudo: item.estudo , var_id : item.id , valor_old: item.padrao , valor_new: novaEscolha , campo: 'VALOR_ID' , ss:'ss' } ); 
        }
    });
  }

}

  if (maxA  != minA ||  minZ != maxZ ){
    //alert('TROCAR EXIBIÇÂO !! '+nova);
    listaCamada[poss].setExibicao([ maxA ,  minA ]);
    layers[plis].setMinResolution( exibi[maxA] );
    layers[plis].setMaxResolution( exibi[minA]+ 0.00000000001 );
  }

  if(opa !== oldOpa ){
    layers[plis].setOpacity(opa / 100 );
  }


  if(recarregaParams){
    var arr = detalhes(listaCamada[poss]);
    var parametros = arr[0];
    layers[plis].getSource().updateParams( {'env': parametros , 'viewparams': parametros } );  
  }

  if(updateSql){
    var parametros = '';
    update.forEach(function(item , index ){
      parametros += $.param( item );
    });
    setVariaveis(parametros);
    setTimeout(function(){
      getVariaveis();  
    } , 500 );


    if(recarregaView){

      alerta(1,'SERÁ NECESSARIO RECARREGAR A PAGINA, PARA EXIBIÇÃO DOS NOVOS VALORES.');

       setTimeout(function(){
        alerta(2,'SERÁ NECESSARIO RECARREGAR A PAGINA, PARA EXIBIÇÃO DOS NOVOS VALORES.');
      } , 5000 );
        setTimeout(function(){
        alerta(3,'SERÁ NECESSARIO RECARREGAR A PAGINA, PARA EXIBIÇÃO DOS NOVOS VALORES.');
      } , 10000 );
         setTimeout(function(){
        alerta(4,'SERÁ NECESSARIO RECARREGAR A PAGINA, PARA EXIBIÇÃO DOS NOVOS VALORES.');
      } , 15000 );

      setTimeout(function(){
        update.forEach(function(it , ind ){
          if( it.var_id== 1 || it.var_id== 2 || it.var_id== 4  ){
          atualizarCalculos('d13');
          }else if(it.var_id==3){
            atualizarCalculos('d23');
          }
        });     
      } , 500 );
    }

    if(recarregaLayer){
      styleCache.length = 0 ;
      atualizaStilo( );

      var atualiza = [];
      update.forEach(function(it , ind ){

        if( it.campo == 'VALOR_ID' && it.var_id !== undefined  ){

          listaCamada.forEach(function(item,index){
            if (item.getEscolha()!== undefined ){   // &&  item.getEscolha().id === it.var_id
              let escolhas = item.getEscolha() ; 
              escolhas.forEach(function(valor , ind ){               
                if(valor.id == it.var_id){
                 setTimeout( function(){
  //                layers[item.getPLista()].getSource().refresh();
//                  layers[item.getPLista()].getSource().changed();
                    layers[item.getPLista()].getSource().updateParams({ 'TILED': !layers[item.getPLista()].getSource().getParams().TILED } );
                 } , 500 );

                }
              });
            }
          });
        }
      });
    }
  }
  $("#configModal").modal("hide");
  });
})


function detalhes(item) {

  var alertaa = $('#inM').val();
  var ano     = $('#ano').val();
  var mes     = $('#mes').val();
  var cat     = $('#cat').val();
  var rua     = $('#rua').val();
  var bai     = $('#ba').val();
  var insc    = $('#inM').val();
 // var inscCadUnico = $('#inscCad').val();

if(insc != undefined && insc != '' ){
   setTimeout(function(){
    consultaHidrometro(insc , true);
   },10000);
}

var parametros = "";
var color = item.getCor()!= undefined ? item.getCor() : '' ;

if(item.getFuncao() == 'pesquisa' || item.getFuncao() == 'grafico'|| item.getFuncao() == 'calor' ){
  if (ano !== '' && ano !== undefined  ){ 
    parametros += 'ano:'+ano +';MIN_ANO:'+ano+';MAX_ANO:'+ano ;
  }
  if (mes!== '' && mes !== undefined ){
   parametros += ';mes:'+mes+';MIN_MES:'+mes+';MAX_MES:'+mes  ;
  }
  if (cat !== '' && cat !== undefined ){
  parametros += ';catI:'+cat+';catF:'+cat ;
  }
  if (rua !== '' && rua !== undefined ) {
  parametros += ';ruaI:'+rua+';ruaF:'+rua ;
  }
  if (bai !== ''&& bai !== undefined ){
  parametros += ';baI:'+bai+';baF:'+bai ;
  }

}else if (item.getFuncao() == 'camada' ) {
  if( color!== '' && color.indexOf('gradient') === -1  ){
    parametros += 'color:'+item.getCor().replace('#','')+';' ;
  }
  if(item.getSize() !== undefined ){
     parametros += 'size:'+item.getSize()+';' ;
  }
  /*
  if ( inscCadUnico!== ''  ){
    parametros = 'insc:'+inscCadUnico +';'; // SPOTO
  }
  if(newForma[item.getId()] !== undefined ){
    parametros += 'forma:'+formas[ newForma[item.getId() ]]+';' ;
  }else {
     parametros += 'forma:'+formas[1]+';' ;
  }
*/

  var escolhas = item.getEscolha();
  var valor = 0 ;
  var acho = false;
  if ( escolhas!== undefined && escolhas.length !== 0 ){
    escolhas.forEach(function(it,ind){

      variavel.forEach(function(valor ,index ){
        if(valor.VAR_ID == it.id ){
          valor = valor.SELECIONADO;
          parametros +=  it.parametro+':'+ valor +';' ;
          acho= true;
        }
      });

    });
         
    if(!acho){
      parametros +=  escolhas[0].parametro+':'+ escolhas[0].padrao +';' ;
    } 
  }
}

return [parametros ];
};


function carregar(item) {

  var color = item.getCor()!= undefined ? item.getCor() : '' ;

  if( color!= '' && color.indexOf('gradient') === -1  ){
    var colorido = '?env=color:'+color.replace('#','')+';';
  }else{
    var colorido = '' ;
  }
  
  var tipo = usaCache ? 'cache' : 'tileWMS';

  tipo =  (item.getFuncao()=='click') ? 'tileWMS' : (item.getFuncao() == 'calor') ? 'imageWMS' : ( item.getPai()==4 ? 'tileWMS'   : tipo) ;
  tipo =  (item.getFuncao() == 'pesquisa') ? 'pesquisa' : tipo ;
  tipo =  (item.getFuncao() == 'filtro')   ? 'pesquisa' : tipo ;
  tipo =  (item.getFuncao() == 'grafico')  ? 'grafico' : tipo ;
  tipo =  (item.getFuncao() == 'graficoPostGres')  ? 'graficoPostGres' : tipo ;
  tipo =  (item.getFuncao() == 'renderizado') ? 'renderizado' : tipo ;
  tipo =  (item.getFuncao() == 'raster') ? 'cache' : tipo ;
  tipo =  (item.getFuncao() == 'ibm1') ? 'urlCacheImb1' : tipo ;


  //  tipo =  (item.getPai() == 4  ) ? 'tileWMS' : tipo ;
 //  tipo =  (item.getPai() == 4  &&  item.getLayer() == 'Birigui:cruzeta' ) ? 'vectorCache' : tipo ;

  var arr = detalhes(item);
  var parametros = arr[0];

  var min = '';
  var max = '';

  if (item.getExibicao()!=undefined){
    min = exibi[item.getExibicao()[0]];
    max = exibi[item.getExibicao()[1]] + 0.00000000001 ;
  }else{
    min = exibi[visao.A.minZoom] ;
    max = exibi[visao.A.maxZoom] ;
  }

// console.info (tipo);


  switch (tipo){
        case 'vectorCache':
        params = {
          'REQUEST' : 'GetTile',
          'SERVICE' : 'WMTS',
          'VERSION' : '1.0.0',
          'LAYER'   : item.getLayer(),
          'STYLE'   : 'point',
          'TILEMATRIX': projecao + ':{z}',
          'TILEMATRIXSET': projecao,
          'FORMAT'  :  'application/json;type=utfgrid',
          'TILECOL' : '{x}',
          'TILEROW' : '{y}'
        };

           var baseUrl = '../service/wmts';
            var url = baseUrl+'?'
            for (var param in params) {
              url = url + param + '=' + params[param] + '&';
            }
            url = url.slice(0, -1);

        var fonte = new ol.source.VectorTile({
            url: url,
            projection: projecao,
            tileGrid: new ol.tilegrid.WMTS({
              tileSize: [256,256],
              origin: [-180.0, 90.0],
              resolutions: resolutions,
              matrixIds: gridNames
            }),
            wrapX: true
          });

//https://www.mitraegov.com.br/geoserver/Birigui/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Birigui:colar_tomada&maxFeatures=50&outputFormat=application%2Fjson

      var telha = new ol.layer.VectorTile({
        source:  fonte
        , style:   (new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          stroke: new ol.style.Stroke({
            color: 'white',
            width: 2
          }),
          fill: new ol.style.Fill({
            color: 'green'
          })
        })
      }) )  // stylePersonalizado('point')
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;

    case 'tileWMS':
        var fonte = new ol.source.TileWMS({
          url:   urlWms , // +colorido , // +'?env=color:'+color.replace('#','')+';'    ,
          params: {'LAYERS': item.getLayer()  , 'env' : parametros  , 'viewparams':  parametros   ,'TILED': true },
          projection: projecao
        });
      var telha = new ol.layer.Tile({
        source:  fonte
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;

/*

,
          serverType: 'geoserver',
          style: '' ,
          crossOrigin: 'anonymous'

*/

    case 'pesquisa':
        var fonte = new ol.source.TileWMS({
          url:   urlWms   ,
          params: {'LAYERS': item.getLayer()  , 'viewparams':  parametros  , 'env' : parametros , style: (item.getEstilo()!==undefined ? item.getEstilo() : '' ) , 'TILED': true },
          projection: projecao
        });
      var telha = new ol.layer.Tile({
        source:  fonte
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;
    case 'cache':
      var fonte = new ol.source.WMTS({
        url:   urlCache  ,
        layer:  item.getLayer() ,
        matrixSet:  projecao ,
        format: format ,
        projection: projection,
        serverType: 'geoserver',
        tileGrid: tileGrid2,
        style: '' ,  // ''   SPOTO
        crossOrigin: 'anonymous',
        wrapX: true 
      });
      var telha = new ol.layer.Tile({
        source:  fonte
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;
/*
,
        crossOrigin: 'anonymous'
*/
     case 'urlCacheImb1':
      var fonte = new ol.source.WMTS({
        url:   urlCacheImb1  ,
        layer:  item.getLayer() ,
        matrixSet:  projecao ,
        format: format ,
        projection: projection,
        serverType: 'geoserver',
        tileGrid: tileGrid2,
        style: '' ,  // ''   SPOTO
        wrapX: true ,
        crossOrigin: 'anonymous'
      });
      var telha = new ol.layer.Tile({
        source:  fonte
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;


    case 'imageWMS':
      var fonte = new ol.source.ImageWMS({
        ratio: 1,
        url: urlWms ,
        params: { LAYERS: item.getLayer()  , 'viewparams':  parametros  , 'FORMAT': format  ,
        'VERSION': '1.1.1',
        STYLES: 'Calor_poly',
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
      });

      var telha = new ol.layer.Image({
        source:  fonte
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;

        case 'imagemWMS':
      var fonte = new ol.source.ImageWMS({
        ratio: 1,
        url: urlWms ,
        params: { LAYERS: item.getLayer()  , 'FORMAT': format  ,
        'VERSION': '1.1.1',
        STYLES: '',
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
        },
       
      });

      var telha = new ol.layer.Image({
        source:  fonte
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;
        case 'grafico':
      var fonte = new ol.source.Vector({
        format: new ol.format.GeoJSON({
          defaultDataProjection: projecao,
          geometryName: 'the_geom'  // 'geometry_spa'
          }),
        url: function(extent) {  // Birigui 
          return urlGeo+item.getLayer().substr(0,item.getLayer().indexOf(':'))+'/ows?service='+'WFS&version=1.1.0&request=GetFeature&typeName='+item.getLayer()+
          '&outputFormat=application/json&srsname='+projecao+'&bbox='+extent.join(',')+','+projecao;
        },
        strategy: ol.loadingstrategy.bbox ,
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
      });

      // console.info(urlGeo+item.getLayer().substr(0,item.getLayer().indexOf(':'))+'/ows?service='+'WFS&version=1.1.0&request=GetFeature&typeName='+item.getLayer()+
      //     '&outputFormat=application/json&srsname='+projecao+'&bbox='+extent.join(',')+','+projecao);

      var telha = new ol.layer.Vector({
        source: fonte,
        style: styloGrafico
        , extractStyles: false
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;
        case 'renderizado':
      var fonte = new ol.source.Vector({
        format: new ol.format.GeoJSON({
          defaultDataProjection: projecao,
          geometryName: 'the_geom'  // 'geometry_spa'
          }),
        url: function(extent) {  // Birigui 
          return urlGeo+item.getLayer().substr(0,item.getLayer().indexOf(':'))+'/ows?service='+'WFS&version=1.1.0&request=GetFeature&typeName='+item.getLayer()+
          '&outputFormat=application/json&srsname='+projecao+'&bbox='+extent.join(',')+','+projecao;
        },
        strategy: ol.loadingstrategy.bbox ,
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
      });

      var telha = new ol.layer.Vector({
        source: fonte,
        style: styloProprio
        , extractStyles: false
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;

     case 'graficoPostGres':
      var fonte = new ol.source.Vector({
        format: new ol.format.GeoJSON({
          defaultDataProjection: projecao,
          geometryName: 'geometria_poligono'  // 'geometry_spa'
          }),
        url: function(extent) {  // Birigui 
          return urlGeo+item.getLayer().substr(0,item.getLayer().indexOf(':'))+'/ows?service='+'WFS&version=1.1.0&request=GetFeature&typeName='+item.getLayer()+
          '&outputFormat=application/json&srsname='+projecao+'&bbox='+extent.join(',')+','+projecao;
        },
        strategy: ol.loadingstrategy.bbox ,
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
      });

      var telha = new ol.layer.Vector({
        source: fonte,
        style: styloGraficoPostG
        , extractStyles: false
        , minResolution: min
        , maxResolution: max 
        , opacity:item.getOpacidade()==undefined ? 1 : item.getOpacidade() 
      });
    break;

  }

    if(item.getFuncao() == 'click' || !item.getCarregado() ){
      telha.setVisible(false);
    }

// console.log(item.getLayer()); g

    fonte.on('tileloadstart', function() {
      progress.addLoading();
    });

    fonte.on('tileloadend', function() {
      progress.addLoaded();
    });
    fonte.on('tileloaderror', function() {
      progress.addLoaded();
    });
    return telha;
}


function qtdeFilhos (codPai , soVisivel ){
  var qtde   = 0;

  listaCamada.forEach(function(item , index) {
    if(item.getPai() == codPai ){
      if (soVisivel && item.getCarregado() == true   && item.getMenu() == true  && item.getLayer() !== undefined    ){
        qtde++;
      }else if (soVisivel && item.getCarregado() == false ){

      }else    if( item.getMenu() == true   /* && item.getLayer() !== undefined  */ )   {
         qtde++;
      }
    }
     if ( codPai == -1 ){
      console.info('  ALUGME ENTROU AKI ');   
     }
    if ( codPai == -1 && item.getPai() == -2  ){
    
      if (soVisivel && item.getCarregado() == true   && item.getMenu() == true  && item.getLayer() !== undefined    ){
        qtde++;
      }else if (soVisivel && item.getCarregado() == false ){

      }else    if( item.getMenu() == true   /* && item.getLayer() !== undefined  */ )   {
         qtde++;
      }
    }

  /*  if (item.getPai() == 11 ) {
      console.info( ' item.getNome()  ' + item.getNome() + '   item.getCarregado()   ' +  item.getCarregado()   + ' item.getMenu()  ' + item.getMenu() +  '  soVisivel  '+ soVisivel.toString() ); 
    }
*/

  });

  return qtde;
}


  var container = document.getElementById('popup');
  var content = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer');

       var overlay = new ol.Overlay( ({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      }));

var unicoStart = false;

function startMAP() {

  $('#londeando').hide() ;
  travaBtn(false) ;
  if(carregaGrafico && cidade !== undefined && cidade !=='vinhedo'){
    var htmlLeg =
    ` <table id ="legendaGCC" >
        <tr>
          <td><div class="legenda" id="circle1" ></div></td>
          <td> RESIDENCIAL</td> 
        </tr>
        <tr>
          <td><div class="legenda" id="circle2" ></div></td>
          <td> COMERCIAL</td> 
        </tr>
        <tr>
         <td> <div  class="legenda" id="circle3" ></div></td>
          <td> INDUSTRIAL</td> 
        </tr>
        <tr>
          <td><div class="legenda" id="circle4" ></div></td>
          <td> PUBLICO</td> 
        </tr>
      </table>`; 

  $('#legendaCol').html(htmlLeg);  // document.getElementById('legendaGCC')
  // var myControl = new ol.control.Control({element: htmlLeg });
  // map.addControl(myControl);
  $('#legendaGCC').hide(); 
  }

  if (unicoStart == false){
    unicoStart = true;
    layers.forEach(function(item, index){
      map.addLayer(item); 
    });
    map.render;
    if(carregaGrafico){
      //exibeGrafico(true); value = id do grafico no menu 
      var idMenu = -1 ;
      var texto  = '';
      listaCamada.forEach(function(item,index){
        if (item.getSubFuncao() == 'grafico' && item.getCarregado() == true){
          idMenu = item.getId();
          texto  = item.getParams()!== undefined ? item.getParams() : ''  ;
          return;
        }
      });
      if (idMenu !== -1 ){
        change_checkbox({'value': idMenu , 'checked': true } );  
        if(texto.indexOf('GP')!== -1 ){
          $('#legendaPGV').show();
        }
      }
      
    }
  }else{
    atualizaStilo();
  }

/*
x = [visao.A.center ];
console.info(visao.A.center) ;

  overlay.setPosition(x);
    content.innerHTML = 'CENTRO ID';
 */
}
       closer.onclick = function() {
        configAcaoRetorno('CLIQUE');
        overlay.setPosition(undefined);
        closer.blur();
        $("#resposta1").css('display','none');
        return false;
      }; 

        var map = new ol.Map({
        controls: ol.control.defaults().extend([
          new ol.control.FullScreen() ,
          new ol.control.ZoomSlider() ,
          new ol.control.ScaleLine() ,
         // new ol.control.OverviewMap(),
          new ol.control.MousePosition()
          ]),
     //   layers: layers ,
        overlays: [overlay],
        target: 'map',
        loadTilesWhileAnimating: true,
        logo: logoElement,
        view: visao,
        wrapX: false
      });


      var existeClick = false;
      listaCamada.forEach(function(item,index){
        if (item.getFuncao() == 'click'){
          posicaoClick = item.getPLista();
          nomeClick = item.getNome();
           item.setCarregado(true);
          existeClick = true ;
          return;
        }
      });
    
      if (existeClick ){ 
        map.on('singleclick', clickCamada );
      }

      function clickCamada(evt){
        var view = map.getView();
         // alerta(4,'Zoom: '+view.getZoom()+' == : '+view.getResolution() +' Resolution2: '  + view.getResolution()*256*256 +' min-> '+view.getMinResolution()+' max-> '+view.getMaxResolution() );
        if (view.getZoom()<clickZoom){
          return
        }
        var source = layers[posicaoClick].getSource();
          try {
            var viewResolution = view.getResolution();

            var url = source.getGetFeatureInfoUrl(
              evt.coordinate, viewResolution, view.getProjection(),
                {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50});   //text/html
          }
          catch(err) {
            console.log('err: '+ err.name + ' msg-: ' +err.message);
            if (err.message == 'source.getGetFeatureInfoUrl is not a function' )
              console.log('camada '+ nomeClick +' Não aceita Click' );
          }


//console.info(url);
//console.info('LATITUDE   ->  ' + evt.coordinate[1]);
//console.info('LONGITUDE  ->  ' + evt.coordinate[0]);
// console.info('------------------------------------------------' + [ parseFloat(evt.coordinate[0]) ,  parseFloat(evt.coordinate[1]) ] );

// var lonlat = ol.proj.transform([ parseFloat(evt.coordinate[0]) ,  parseFloat(evt.coordinate[1]) ] , 'EPSG:4326' , 'EPSG:3857' );
// var lon = lonlat[0];
// var lat = lonlat[1];
//console.info('LATITUDE   ->  ' + lonlat[1]);
//console.info('LONGITUDE  ->  ' + lonlat[0]);


          if (url) {
            $.ajax({
              type:     "GET",
              data: evt.coordinate ,
              url: url  ,
              async:true,
              dataType: "jsonp",
              callback: configAcaoRetorno('CLIQUE')
            });
            var coordinate = evt.coordinate;
            var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
              coordinate, projecao , projecao ));
//console.info(coordinate);
            overlay.setPosition(coordinate);
            content.innerHTML = '<p>' +'</p>' ;
            //$("#resposta1").css('display','inline');
           // document.getElementById('resposta1').innerHTML = '<p>Você clicou aqui:</p><code>' + hdms +'</code>';
           /* CALLBACK parseResponse  */
          }
      }

      map.getView().on('change:resolution', function(evt) {
        var resolution = evt.target.get('resolution');
        var units = map.getView().getProjection().getUnits();
        var zoom = map.getView().getZoom() ;
        var dpi = 25.4 / 0.28;
        var mpu = ol.proj.METERS_PER_UNIT[units];
        var scale = resolution * mpu * 39.37 * dpi;
        if (scale >= 9500 && scale <= 950000) {
          scale = Math.round(scale / 1000) + "K";
        } else if (scale >= 950000) {
          scale = Math.round(scale / 1000000) + "M";
        } else {
          scale = Math.round(scale);
        }
        document.getElementById('scale').innerHTML = "Scale = 1 : " + scale;
        document.getElementById('zoomMap').innerHTML = "Zoom = " +zoom ;

        var atualZ = exibi.indexOf(resolution);
       // var oldZoom = exibi.indexOf(evt.oldValue);

        if (atualZ != -1  && carregaGrafico){
          exibeGrafico(true);    
        }
      });


      function parseResponse( data ) {
        if(faca == '' || faca == 'CLIQUE' || faca === undefined ){
          if (data.features == undefined || data.features.length==0 ){
            closer.onclick();
          }else{
            var resposta = trataResposta(data); // config.js
            content.innerHTML = '<p>'+resposta+'</p>' ;
          }
        }else if(faca == 'FILTRO'){
          retornoFiltro(data);
        }
      };


function format_m2 (number){

  if (typeof number == 'string')
    number = parseFloat(number);
  return number.toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,").replace('.','_').replace(',','.').replace('_',',') + ' m²' ;
}


function format_money (number){

    if (typeof number == 'string')
      number = parseFloat(number);
    var number = number.toFixed(2).split('.');
    number[0] = "R$ " + number[0].split(/(?=(?:...)*$)/).join('.');
    return number.join(',');
}


// lateral check's

function change_checkbox(el){ 

  var id = el.value ;
  var posicao = '';

  var aux = '';
  var pai = -1;
  var soStilo = false ;
  var legendaTipo = '' ;

  var itemMenu = new Array;
  listaCamada.forEach(function(item,index){
    if (item.getId() == id){
      aux = index;
      itemMenu = item;
      pai = item.getPai();
      legendaTipo = item.getLegendaTipo();
      return;
    }
  });


itemMenu.setCarregado(el.checked);



if ( itemMenu.getTipoPai() === 2  &&  itemMenu.getQtdeF()!== undefined && itemMenu.getQtdeF() > 0  ){

   updateFilho(id , el.checked , itemMenu.getTipoPai() );
   updateBadgePai( id , el.checked );

   if(id == 11 || id == 7  ){
    updateBadgePai( -1 , el.checked );
   }else if (el.checked){
      updateBadgePai( -1 , false );
   }else{
    updateBadgePai( -1 , true );
   }



}else if ( itemMenu.getTipoPai() === 1   &&  itemMenu.getQtdeF()!== undefined && itemMenu.getQtdeF() > 0 ){
  updateFilho(id , el.checked , itemMenu.getTipoPai() );
  var num = el.checked ? qtdeFilhos(id,true) : 0 ;
  $("#badge"+id).text(num);

}else if(itemMenu.getTipoPai() === 4   && itemMenu.getQtdeF() > 0 ){
  updateFilho(id , el.checked , 4 );
  updateBadgePai( id ,el.checked );
  updateBadgePai( -1 ,el.checked );

}else if (itemMenu.getQtdeF() == 0 ){

  var regraPai = itemMenu.getTipoPai() ;

  if ( pai > -1 ){
    listaCamada.forEach(function(item,index){
      if(item.getId() === pai ){
        regraPai = item.getTipoPai(); 
      }
    });
  }

 if ( regraPai === 4 ) {
    var qtdeF = qtdeFilhos(itemMenu.getPai(),false);

    if (! el.checked ){
      if(qtdeF > 0){
        updateFilho(pai , false , 4 );  
        updateBadgePai( pai ,false );
      }
      updateBadgePai( pai ,false );
      updateBadgePai( -1 , false );

    }else if (el.checked ) {
      updateFilho(pai , true , 4 );

      if ($("#check"+pai).prop('checked' ) == false ) {
        updateBadgePai( -1 ,  true );
      }else{
        updateBadgePai( pai ,false );
      }

      if(qtdeF>0){
    //    updateFilho(pai , false   , 4 );
      }

      var aux  = itemMenu.getParams();          
      atualizaParams(aux);
      $("#check"+id).prop('checked',  true );
      itemMenu.setCarregado( true );


    }

  }else if (itemMenu.getTipoPai() === 0 ){


  }else if (itemMenu.getTipoPai() === 2 ){
//    console.log( itemMenu.getNome() );
    if( el.checked  ){
      itemMenu.setCarregado(false);
      if (  qtdeFilhos(itemMenu.getPai(),true)  > 0 ){
        updateBadgePai( pai ,false );
        updateFilho (pai  , false , 2 );
        if(pai == 11 || pai == 7  ){
          updateBadgePai( -1 , false );
        }
      }

      if ( itemMenu.getLayer() !== undefined   ){
 
         if(pai == 11 || pai == 7  ){
          updateBadgePai( -1 , true );
        }
        layers[itemMenu.getPLista()].setVisible( true );   
      }else  if ( itemMenu.getParams() !== undefined ) {     
            updateFilho (pai  , true , 1 );
            var aux  = itemMenu.getParams();             
            atualizaParams(aux);
       //     atualizaStilo();
           //  updateBadgePai( pai , true );
      }else if ( itemMenu.getFuncao() === 'base' ) {

 layers[itemMenu.getPLista()].setVisible( true ); 
  itemMenu.setCarregado( true );

  if (       $("#check"+pai).prop('checked' )  !== undefined && $("#check"+pai).prop('checked' )  == false ){
    $("#check"+pai).prop('checked' , true ) ;
  }

      }
           
      $("#check"+id).prop('checked',  true );
      itemMenu.setCarregado( true );
    }else  if( !el.checked  ) {

if (       $("#check"+pai).prop('checked' )  !== undefined && $("#check"+pai).prop('checked' )  == true ){
    $("#check"+pai).prop('checked' , false ) ;
  }

        if(pai == 11 || pai == 7  ){
          updateBadgePai( -1 , false );
        }
        layers[itemMenu.getPLista()].setVisible( false ); 
    }
   

  }else if (itemMenu.getTipoPai() === 1 ){
    
  //  console.log(  '  itemMenu.getNome() ' + itemMenu.getNome() +'   FILHOsgetTipoPai   !! ' + itemMenu.getTipoPai()  );
  }
 
  

  if(itemMenu.getLayer() !== undefined ){
    layers[itemMenu.getPLista()].setVisible(el.checked);  
  }else{

  }
  

 // console.log('Tipo PAI '+itemMenu.getTipoPai() +' qtde F '+itemMenu.getQtdeF() +' qtde Filho  ' +qtdeFilhos(id,true)  + '  IrmÃO ??  ' +  qtdeFilhos(itemMenu.getPai(),false)   );

}

  /*
var grafico = (itemMenu.getSubFuncao() == 'grafico' ) ;
    
if (grafico ){
  updateFilho(id,el.checked);
  exibeGrafico(el.checked); 
  
  if (el.checked){
    $('#legendaPGV').show();
  }else{
    $('#legendaPGV').hide();  
  }

} else   if (itemMenu.getFuncao() == 'grafico' && itemMenu.getSubFuncao() !== undefined ){
    exibeGrafico(el.checked , itemMenu.getSubFuncao() );  
}
*/

updateBadgePai( itemMenu.getPai() ,el.checked);


if (legendaTipo!==undefined && legendaTipo !== ''){
  exibeLegenda(legendaTipo, el.checked );
}


}



function updateFilho(codPai , acao , tPai ){


  listaCamada.forEach(function(item,index){
    if (item.getPai() == codPai){
      var idFilho = item.getId();
      var num = acao ? qtdeFilhos(idFilho,true) : 0 ;
      $("#badge"+idFilho).text(num);
      var ativa = false;
   //   var tipoPai = tPai !== undefined ? tPai : 1 ;
      var qtdeV = qtdeFilhos(codPai,true);
      var legendaTipo = item.getLegendaTipo();
     
      if(tPai === 4  && !acao ) {
        ativa = true;
      }

      if (tPai === 1  ){ 
        ativa = true; 
      }else if (tPai === 2  && acao ){
        if (qtdeV === 0 ){
          ativa = true; 
        }else if (qtdeV === 1 ){
          ativa = true; 
          acao = false; 
        }else if ( qtdeV > 1) {
          ativa = false; 

        }
      }else  if (tPai === 2  && !acao ) {
        ativa = true; 
      }else if (tPai === 4 && acao ){
        if (legendaTipo!==undefined && legendaTipo !== ''){
        }
        if ( item.getTipoPai() === 1)  {
          ativa = true; 
        }else if ( item.getTipoPai() === 2  && qtdeV == 0 )  {
          ativa = true; 
        }else if ( item.getTipoPai() === 2  && qtdeV == 1 )  {
          ativa = true; 
          acao = false;
        }else if ( item.getTipoPai() === 2  && qtdeV > 1 )  {
          ativa = true; 
          acao = false;
        }
      }

 // console.info( 'tPai ' + tPai   + '  itemMenu.getTipoPai()  ' +item.getTipoPai()  + '  qtdeV => '  +  qtdeV.toString() );
///  console.info(item.getNome()  + '  tPai  '+tPai.toString()  + '  ativa  '+ativa.toString()   +   '  acao  '+acao.toString()   +  '  qtdeV  '+ qtdeV) ;   

       //   if (legendaTipo!==undefined && legendaTipo !== ''){
          //  item.setCarregado(acao);
       //     console.info('ORIGEM updateFilho  NOME =  ' +item.getNome() + '   - ' +  ( acao ? ' MOSTRA ' : ' ESCONDE ' ) );
           // exibeLegenda(legendaTipo,acao );
      //    } 


      if(ativa){
        if( item.getLayer()  === undefined  && item.getParams() !== undefined ){
         // item.getLayer() ;
          var aux = item.getParams();   
 // console.info('item.setCarregado( ' + typeof acao )  ;
//  console.info( acao )  ;

          item.setCarregado(acao);

          $("#check"+ item.getId() ).prop('checked', acao);
          if (acao){ // && cidade !== 'vinhedo'
            atualizaParams(item.getParams() );
          //  atualizaStilo();
          }else if( item.getFuncao().substr(0,'grafico'.length) == 'grafico'   || item.getSubFuncao().substr(0,'grafico'.length) == 'grafico' ) {  // 
            exibeGrafico(false);
          }

          if (legendaTipo!==undefined){
            exibeLegenda(legendaTipo, acao );
            item.setCarregado(acao);
          }
         
        }else  if( item.getLayer()  !== undefined ) {
          if ( !$("#check"+idFilho).attr("disabled") ){
            $("#check"+idFilho).prop('checked', acao);
            item.setCarregado(acao);
          }
          layers[item.getPLista()].setVisible(acao);
        }else  if (item.getLayer()  === undefined  && item.getParams() === undefined  && item.getFuncao() === 'base' ) {    
           $("#check"+ item.getId() ).prop('checked', acao);
         // if ( !$("#check"+idFilho).attr("disabled") )
         //   $("#check"+idFilho).prop('checked', acao);
            item.setCarregado(acao);
          layers[item.getPLista()].setVisible(acao);
        }
        
        if(item.getQtdeF() !=undefined && item.getQtdeF() > 0){
          updateFilho(idFilho, acao , item.getTipoPai() );
        }
      }else{
        item.setCarregado(ativa);
      }
    }
  });
  return
}



function updateBadgePai(id , op){

  var count = inicial = parseInt($("#badge"+id).text()) ;

  if(op){
    count++;
  }else{
    count--;
  }
  count = count<0 ? 0 : count;

$("#badge"+id).text(count);
  if( count==0 || inicial==0) { // foi ou saiu pra ZERO
    if(id!=0)
      $("#check"+id).prop('checked', op);
    listaCamada.forEach(function(item,index){
      if(item.getId() == id){
        var idAvo = item.getPai();
        updateBadgePai(idAvo , op );
      }

      if (item.getSubFuncao() == 'grafico' ) {
          if (op  && item.getCarregado()){
            $('#legendaPGV').show(); 
          }else{
            $('#legendaPGV').hide();  
          }
      }

    });
  }
  return true
}


function exibeLegenda ( id , exibe ) {

    if (id !== '' && id !== undefined &&   cidade !== undefined ){

      if(exibe ){

        if($('#legendaCol'+id).html() !== undefined &&   $('#legendaCol'+id).html().indexOf('<caption>') !== -1 ){  
          if ( $('#legendaCol'+id).is(':visible')===false ){
              $('#legendaCol'+id).show();
          }
           return true;
        }else{
          carregaLegenda(id);  
          return true;
        }
      }else{    
        var esconde = true; 
        listaCamada.forEach(function(item,index){  //  VERIFICA SE TEM OUTRA CAMADA USANDO A LEGENDA .
          if(item.getLegendaTipo() !== undefined && item.getCarregado() === true && item.getLegendaTipo() === id ){
              esconde = false;
          }    
        });
      } 

    if(esconde){
        $('#legendaCol'+id).hide();  
    }

    var countColunas = 0 ;
    $("#legendaVertical table ").each(function(index){
        if($(this).css('display')!=='none'){
            countColunas++;
        }
    });
   
    // console.info( 'id  ' + id + '  exibe ' + exibe   + '   countColunas  '+ countColunas);
    if(exibe===false && countColunas === 1 ){  // Não sei pq , ultimo esconde legenda Grafico

    }
    countColunas = countColunas === 0 ? 2 : countColunas ;

     // $('.legendaCol').css('-webkit-column-count:'+ countColunas + ' !important ;');
     // $('.legendaCol').css('-moz-column-count:'+ countColunas + ' !important ;');
     // $('.legendaCol').css('column-count:'+ countColunas + ' !important ;');
  }
}


var elementoBusca =

$(function(){

  $(".input-group-btn .dropdown-menu li a").click(function(){
    var selText = $(this).html();
    $(this).parents('.input-group-btn').find('.btn-search').html(selText);
    $("#pesquisa").removeAttr('disabled');
    $("#campoBusca").width(($(".navbar-search").width() - 20 -  $(".input-group-btn").width()  - $("#pesquisa").width())-( parseInt($(".navbar-search").css("padding-right"))+ parseInt($(".navbar-search").css("padding-left")) ) );
    $("#CampoElemento").width(($(".navbar-search").width() - 20 -  $(".input-group-btn").width()  - $("#pesquisa").width())-( parseInt($(".navbar-search").css("padding-right"))+ parseInt($(".navbar-search").css("padding-left")) ) );
    var escolha = $(".input-group-btn .btn-search .label-icon").attr('id');
    if (escolha==01){
      if ( !localStorage.getItem("options") ){
        alerta(3,'Falha ao carregar informações dos elementos no banco de dados');
        carregaElementos( function(){document.getElementById('elementos').innerHTML = localStorage.getItem("options"); } );

      }else{
        ajusteBusca(escolha);
      }
    }else if (escolha==02) {
      ajusteBusca(escolha);
    }
  });

  function ajusteBusca(escolha){
   document.getElementById('CampoElemento').value = "";
   if (escolha==01)
    document.getElementById('elementos').innerHTML = localStorage.getItem("options");
  document.getElementById('CampoElemento').style.display = escolha==01 ? "block" : "none";;
  document.getElementById('campoBusca').style.display = escolha==02 ? "block" : "none";;
};

function estudoElemento(){
  var aux = 0;
  var posicao = '';
  var id= '';

  listaCamada.forEach(function(item,index){
    if (item.getFuncao() == 'filtro' && item.getLayer() == 'Birigui:filtroElemento'){
      aux = index;
      layer = item.getLayer();
      posicao = item.getPLista();
      visivel = posicao!=undefined ? layers[posicao].getVisible() : false ;
      cor  = item.getCor();
      return;
    }
  });

  var text = $("#CampoElemento").val();
  if (text != '' ){
    for (var i = 0; i < localStorage.length; i++) {
      if((localStorage.getItem(localStorage.key(i)) == text ) &&localStorage.key(i).substr(0,2)=='el' ) {
        var  id = localStorage.key(i).substr(2);
      }
    }
  }

  if  (visivel &&  (id==undefined || id == '' || cor != id ) ) {
    // alerta(4 , 'estudoElemento - visivel');
    map.removeLayer(layers[posicao]);
    layers.splice(posicao,1);
    listaCamada[aux].setPLista(undefined);
    listaCamada[aux].setCor(undefined);
  }
  return {
    id: id,
    text: text,
    layer: layer,
    aux: aux,
    visivel:visivel
  };
}

$("#CampoElemento").bind('change',function(){

  var res = estudoElemento();

  if( $("#CampoElemento").val() != ''  ){
    if (res.id){
      $("#resposta").css('display','block');
      var fabricante = localStorage.getItem('ef'+res.id);
      var medida  = localStorage.getItem('en'+res.id);
      var material = localStorage.getItem('em'+res.id);
      var qtde = localStorage.getItem('eq'+res.id);
      informativo = `` ;
      informativo += `<b>`+res.text+'</b><BR>'  ;
      informativo += fabricante != '' ? `<b>Fabricante: </b>`+fabricante+'<BR>' : '' ;
      informativo += medida     !=' ' ? `<b>Medida: </b>`+medida+'<BR>' : '' ;
      informativo += material   != '' ? `<b>Material: </b>`+material+'<BR>' : '' ;
      informativo += qtde       != '' ? `<b>Qtde Encontrada: </b>`+qtde+'<BR>' : '' ;
      document.getElementById('resposta').innerHTML = informativo ;
    }
  }
  if ( res.id==undefined ) {
    $("#pesquisa").removeAttr('disabled');
    document.getElementById('resposta').innerHTML = ``;
  }

});  

$("#CampoElemento").keypress(function (e) {
  if (e.which == 13) {
    $('#pesquisa').trigger('click');
    return false;  
  }
});

$("#campoBusca").keypress(function (e) {
  if (e.which == 13) {
    $('#pesquisa').trigger('click');
    return false;  
  }
});


$('#pesquisa').click(function () {   
  var x = $(".input-group-btn .btn-search .label-icon").attr('id');
        if (x==01 ){  // Busca ELEMENTO  
         var res = estudoElemento();
         if (res.visivel){
          setTimeout( function(){ $("#pesquisa").removeAttr('disabled'); } , 5000);
          return
        }
        if (res.id != '' && res.id != undefined  ){
          $("#pesquisa").attr('disabled','disabled');
          setTimeout( function(){ $("#pesquisa").removeAttr('disabled'); } , 5000);
          var camadaF = new ol.layer.Tile({     
            visible: true,
            source: new ol.source.TileWMS({
              url: urlWms,
              params: {'LAYERS': res.layer , 'viewparams': 'minID:'+res.id+';maxID:'+res.id},           //// SPOTO , lembra usar função
              projection: projecao,
              serverType: 'geoserver',
              crossOrigin: 'anonymous'
            })
          });
          layers.push(camadaF);
          listaCamada[res.aux].setPLista(parseInt(layers.indexOf(camadaF)));
          listaCamada[res.aux].setCor(res.id);
          map.addLayer(camadaF);
          ajusteCentro( visao.A.center ,  visao.A.zoom );
        }else{
          alerta( 2,`Pesquisa não encontrada. Favor verificar dado.` );
        }

        }else if (x==02){  // Busca Inscricao Municipal
          var text = $("#campoBusca").val();
          consultaHidrometro(text , true);
        }else if (x==03){  // Busca Inscricao Municipal
          var nome = $("#campoBusca").val();
          $.ajax({
            type:     "GET",
             //     crossDomain: true,
            //      callback : parseResponse(evt),
            url:    './php/pesquisa.php?comando=pesquisaNome&nome='+nome ,
            async:true,
            dataType: "json",
            success: function(data){
              closer.onclick();
              if(data['total'] >0 &&  data['total'] < 50  ){
                lista = ``;
                $.each(data, function(index, value) {
                  if (value["usuario"]){
                    lista += `<b>`+value["usuario"]+ ` </b>`;
                    lista += `<a class="glyphicon glyphicon-search"  title="Informações da Fatura" href="#" onclick="javascript:consultaHidrometro('`+value["inscricao_municipal"]+`',true)"></a> <br>`;
                  }
                });
                $("#resposta").css('display','block');
                $("#resposta").html('<p>'+ lista +'</p>');

              }else if (data['total'] > 500 ) {
                 alerta( 2,`Pesquisa trouxe <b>`+data['total'] +`</b> resultados, seja mais especifico.` );
              }else{
                alerta( 2,`Pesquisa não encontrada. Favor verificar dado.` );
              }
            },
            error: function(e) {
             console.log('error '+ e.responseText);
             alerta(3,'Falha ao carregar informações via PHP dos Usuarios no banco de dados');
           }
         });
        }
      });
});


function ajusteCentro( coord , zoom ){
 /* var viu = map.getView();
  viu.setZoom(zoom);
  var size =   (map.getSize());
  viu.centerOn( coord , size  , [size[0]/2 ,  size[1]/2  ]  );
 */// [long, lat]
  if (coord[0]==0 || coord[1]==0 ){
    coord = visao.A.center;
    zoom = visao.A.zoom;
  }

  flyTo( coord, zoom , function(){} );

}

$("#alvo").click(function(){
  ajusteCentro( visao.A.center ,  visao.A.zoom );
});


function flyTo(location, zoom , done) {
  var duration = 3000;
  //var zoom = 20 ; // map.getView().getZoom();
  var foca = $('#foca').val() !== undefined ? $('#foca').val() : zoom;
  var parts = 2;
  var called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  //var centro = ol.proj.fromLonLat( [ parseInt(location[0]),parseInt(location[1]) ] ) ;
  var viu = map.getView();
  viu.animate({
    center: location,
    duration: duration
  }, callback);
  viu.animate({
    zoom: foca - 1,
    duration: duration / 2
  }, {
    zoom: foca,
    duration: duration / 2
  }, callback);
}


function alerta(tipo , mensagem ){
  var alerta = '';
  switch (tipo){
    case 1:
      alerta = '.alert-success';
    break;
    case 2:
      alerta = '.alert-warning';
    break;
    case 3:
      alerta = '.alert-danger';
    break;
    case 4:
      alerta = '.alert-info';
    break;
  }

  $(alerta).html(`<center>`+mensagem);
  $(alerta).show();
  $(alerta).delay(5000).fadeOut( "slow" );
}

$(document).ready(function() {
  var tamanhoJanela = $(window).width();
  var alturaJanela = $(window).height();

  $(".menu_lateral").height(alturaJanela);
  // console.info(alturaJanela);

  $("#resposta").css('display','none');
  $("#resposta1").css('display','none');
  $("#campoBusca").val('');
  $('.alert-success').hide();
  $('.alert-warning').hide();
  $('.alert-danger').hide();
  $('.alert-info').hide();

  $("#campoBusca").width( ($(".navbar-search").width() - 20  - $(".input-group-btn").width()  - $("#pesquisa").width()-( parseInt($(".navbar-search").css("padding-right"))+ parseInt($(".navbar-search").css("padding-left")) )));
  //$("#formImp" ).css('display','none');

  $('.btn-panel').width($(".list-group-item").width() - 150 ) ;
  $('.btn-sub-panel').width($(".list-group-item").width() - 150 )   ;
  iniciaUso();
 

 // startMAP(); 
});
/*
$(window).resize(function() {
  var tamanhoJanela = $(window).width();
  $("#campoBusca").width(($(".navbar-search").width() -20  - $(".input-group-btn").width()  - $("#pesquisa").width()-( parseInt($(".navbar-search").css("padding-right"))+ parseInt($(".navbar-search").css("padding-left")) )));
  $('.btn-panel').width($(".list-group-item").width() - 150 )   ;
  $('.btn-sub-panel').width($(".list-group-item").width() - 150 )   ;

});
*/

$('.panel-collapse').on('show.bs.collapse hide.bs.collapse', function (e) {

  var id = e.target.id ? e.target.id.replace('collapse','icon') : '' ;
  if (e.type == 'show') {
    $('#'+id).siblings().removeClass("open").addClass("closed");
    $('#'+id).removeClass("closed").addClass("open");
  } else {
   $('#'+id).removeClass("open").addClass("closed");
 }
});


function getBaseName(url) {
  if(!url || (url && url.length === 0)) {
    return "";
  }
  var index = url.lastIndexOf("/") + 1;
  var filenameWithExtension = url.substr(index);
  var basename = filenameWithExtension.split(/[.?&#]+/)[0];

  // Handle '/mypage/' type paths
  if(basename.length === 0) {
    url = url.substr(0,index-1);
    basename = getBaseName(url);
  }
  return basename ? basename : "";
}


if (document.getElementById('export-png')!= null ){
       document.getElementById('export-png').addEventListener('click', function() {
        map.once('postcompose', function(event) {
          var canvas = event.context.canvas;
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
          } else {
            canvas.toBlob(function(blob) {
               try{
                saveAs(blob, 'map.png');
               }catch (err) {
                //console.info(err);
                //console.info(navigator);
                // console.info(blob);
                var url = window.URL.createObjectURL(blob);
                var a = $("<a style='display: none;'/>");
                a.attr("href", url);
                a.attr("download", 'map.png');
                $("body").append(a);
                a[0].click();
                window.URL.revokeObjectURL(url);
                a.remove();
               }
              
            });
          }
        });
        map.renderSync();
      });
}

function carregaGraficos(){

if (carregaGrafico){
  var encontrouHtml = false;



  for (var i = 0; i < localStorage.length; i++) {
    // if( localStorage.key(i).substr(0, params['ident'].length +1 ) == '0'+params['ident'] ) {

    if( localStorage.key(i).substr(  cidade.length * -1  ) == cidade ) {
      encontrouHtml = true;
      break ;
    }
  }

  if (!encontrouHtml){

    if(  cidade !== undefined ){ // Carrega dados geral, usado Mapas PGV

       window.localStorage.clear();      
      carregaDadosGrafico();
      
    } else { // Carrega dados parcelado em niveis
      for (var i = 0; i <= qtdeNvl  ; i++) {
        params['niveis'] = i;
        carregaDadosGrafico(params);
      }

      params['dados'] = '1' ; 

      for (var i = 0; i <= qtdeNvl  ; i++) {
        params['niveis'] = i;
        carregaDadosGrafico(params);
      } 
    }

  } else if (encontrouHtml) {
    setTimeout(function () {
      params['dados'] = '0' ; 
      buscaCache(params , startMAP() ) ;
    } , 1 );
  }
  //alerta( 1 ,  encontrouHtml ? 'Encontrou o/ ' : 'ninão ninao... mas carregou ? '  );
   
  }else{
    $('#legendaGCC').hide();
    travaBtn(false) ;
    startMAP();
  }
}  

var dadosCC = [];
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

 function buscaCache(params){
  var cc = 0 ;
  var inicio = performance.now();
  for (var i = 0; i < localStorage.length; i++) {

      if( localStorage.key(i).substr(0, 1 + params['ident'].length ) == '0' ) {      // TIPO TAG 
          ++cc;
          var html =  localStorage.getItem(localStorage.key(i));
          content.innerHTML += html;        
      } else if( localStorage.key(i).substr(0, 1 ) == '1' )  {   // TIPO DADOS  
        var salvo  = localStorage.key(i) ;   
          var dados = JSON.parse(localStorage.getItem('1'+ salvo.substr(1) ) );
          dados.forEach(function(item , index){
            item[1] = parseFloat(item[1]);  // parseInt
          });
          dadosCC['1'+ salvo.substr(1)] = dados;
      }
  }
 
  var inicio2 = performance.now() - inicio;
  console.info ('Desc Cache --> ' + cc+' === '+' itens num local de -> '+ localStorage.length +' itens  '+' perfo '+millisToMinutesAndSeconds(inicio2)+ ' tempo total '+ millisToMinutesAndSeconds(performance.now() - params['time'] )   ) ; 
}


function criaTag(dados) {
  var nvl = dados.nivel != undefined ? dados.nivel : '';
  var nucleo = dados.ident ;
  $.each( dados, function( key, value ) {
    if (typeof value == 'object' && value.texto != undefined ){
      var idTag = value.texto ;
      var html  = '<a   class="overlay graficos grNv'+nvl+' GP" id="'+'GP' +'grafico'+idTag+'"  style="border: 0px solid #ccc"></a>' ;     
          html += '<svg class="overlay graficos grNv'+nvl+' DP" id="'+'DP' +'grafico'+idTag+'" style="border: 0px solid #ccc"></svg>' ;    

      content.innerHTML += html ;  
      localStorage.setItem( '0'+nucleo+nvl+idTag , html );
    }
  }); 
}

function criaStore(dados) {
  var nvl = dados.nivel != undefined ? dados.nivel : '';
  var nucleo = '';
  var array = [];
  var x = 0;

// console.log(dados);

 $.each( dados, function( key, value ) {
    ++x ;
    if (typeof value == 'object' && value.texto != undefined ){
        nucleo = value.texto;
        var temp = [];
          $.each( value, function( key, value ) {
            if (key !== 'texto'){
              temp.push([key , parseInt(value) ]);
            }
         });

         dadosCC[ '1'+dados.ident + nvl +nucleo] = temp ;
        localStorage.setItem( '1'+dados.ident + nvl + nucleo  , JSON.stringify(dadosCC[ '1'+dados.ident + nvl +nucleo] )); 

   }
  }); 
}

  var styleCache = {};
  var oloco = 0 ;

  function exibeGrafico ( visivel  , nvl ){ // grafite
        var graficoAtivo = false;
        var graficoAtivo =  (cidade!==undefined&&cidade=='vinhedo') ?  $('#check11').prop('checked') : $('#check114').prop('checked');   
        var precisaLegenda = false ; 

        var ordem = visivel ;
        var only  = (nvl !== undefined ) ? nvl : false ;
        var atualZ = map.getView().getZoom();
        listaCamada.forEach(function(item , index){
          var entra =   (nvl !== undefined ) ? item.getSubFuncao() === nvl : true ;
          if(item.getFuncao().substr(0,7) =='grafico' && entra ){
   
            var min = '';
            var max = '';
            if (item.getExibicao()!=undefined){
              min = item.getExibicao()[0];
              max = item.getExibicao()[1];
            }else{
              min = 20;
              max = 0;
            }
            if ( atualZ <= min && atualZ >= max   ){
              visivel = true && ordem  ;
              precisaLegenda = true;
            }else{
              visivel = false ; 
            }
            visivel = visivel && item.getCarregado()  ;

            if (only === false ) {
               var idG = 'grNv'+ item.getSubFuncao()  ;
        
               $("."+idG).each(function(index){
                  if(visivel){
                    //$(this).show();  

                    var aux = $(this).get(0).id ;                
                    if (aux.indexOf(params['tg']) !== -1 ){       
                      $(this).show(); 
             //         document.getElementById('alrt').innerHTML='<b><center>'+mensagem+'</center></b>'; 
                    }
                    if (aux.indexOf(params['tg']) === -1 ){     
                      $(this).hide(); 
               //       document.getElementById('alrt').innerHTML='<b><center>'+mensagem+'</center></b>'; 
                    }

                  }else{
                    $(this).hide();
                  }
              });   
            }else {
                 var idG = 'grNv'+ nvl ;

                   $("."+idG).each(function(index){
                //    console.info(idG);
                  if(visivel){
                    var aux = $(this).get(0).id ;                
                    if (aux.indexOf(params['tg']) !== -1 ){       
                      $(this).show(); 
                    }
                    if (aux.indexOf(params['tg']) === -1 ){     
                      $(this).hide(); 
                    }
                  }else{
                //  $(this).hide();
                  }
              }); 
                   if(!visivel){
                     $("."+idG).hide(); 
                   }
            }
      }
    });  

    //console.info('graficoAtivo => '+ (graficoAtivo ? '  TRUE ' : ' FALSE ')+' && '+' visivel ' +  (visivel ? '  TRUE ' : ' FALSE ')  +  (precisaLegenda ? '  PRECISA LEG ' : ' NÃO PRECISA LEG '));

    if (params['tg'] === 'GP' && graficoAtivo && carregaGrafico && precisaLegenda ){
      var mensagem = (tiposGP[0].toUpperCase());
      $('#legendaPGV').show();
    }else if (params['tg'] === 'DP'  && graficoAtivo && carregaGrafico ){
      var mensagem = (tiposDG[params['ts']].toUpperCase());
      $('#legendaPGV').hide();
    }else if (params['tg'] === 'PI'  && carregaGrafico  ){
      if(graficoAtivo && precisaLegenda ){
        $('#legendaPGV').show();
      }else{
        $('#legendaPGV').hide();
      } 
    }
  }


function postMap(leg,center) {
 // console.info('postMap');
  var vienna = new ol.Overlay({
    position: center,
    autoPan: false , 
    autoPanMargin : 0 ,

    positioning: 'center-center',
    element: document.getElementById(params['tg']+'grafico'+leg)
  });
  map.addOverlay(vienna);
  
 // setTimeout(function(){
  //  map.render();  
 // },200);
  
  //map.renderSync();
}

var unicaVez = true;

 function styloProprio(feature, resolution) {
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
*/ 
    ++oloco;
    troca = false ;

     if (feature['O'].inscCad !== undefined  && feature['O'].inscCad == inscCadUnico ){
          troca = true; 
          titulo= inscCadUnico ;
              if(unicaVez){
                unicaVez = false;
           //   enquadramento
          //    var view = map.getView();
          //    view.setMinZoom(18);
          //    view.setCenter(center);
              //  ajusteCentro( center ,  19 );
/*
             overlay.setPosition(center);
              informativo = `` ;
              informativo += `<p class = "glyphicon glyphicon-file"> </p> <b> Inscrição: </b>`+feature['O'].inscCad.toUpperCase()+'<BR>'  ;
              informativo += `<p class = "glyphicon glyphicon-user"> </p> <b>Proprietário: </b>`+feature['O'].nomeprop.toUpperCase() +'<BR>'  ;
              informativo += `<p class = "glyphicon glyphicon-home"> </p>  <b>Endereço: </b>` + feature['O'].nomeraimo.toUpperCase() + ' Nº '+  feature['O'].numlgraimo.toUpperCase() + '<BR>'  ;  
              content.innerHTML = '<p>'+ informativo +'</p>' ;
*/
              }else{
 //                ajusteCentro( center ,  map.getView().getZoom() );
              }



        }else if (feature['O'].inscCad !== undefined){
           troca = false ; 
           titulo= feature['O'].inscCad ;
        //  return false ; 
           // console.info(feature);
        }  else{
        //  return false ; 
        //  console.info(feature);
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
       return styleCache[resolution][titulo] ;
    }

    if (troca ){
      var x = 1 ;
      var colo = 'red' ;
      var coloB = 'rgba(255, 0, 0, 0.55)' ;
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

    }else{
      var x = 0 ;
      var colo = 'none'; 
      var coloB = 'rgba(0, 0, 255, 0.0)' ;
      var style =new ol.style.Style({});
    }

    styleCache[resolution][titulo].push(style);
    return style;
  }

$('#limpar').click(function () {

  window.localStorage.clear();

  var regex = new RegExp("([?;&])reload[^&;]*[;&]?");
  var query = window.location.href.split('#')[0].replace(regex, "$1").replace(/&$/, '');

  var reload =  (window.location.href.indexOf('?') < 0 ? "?" : query + (query.slice(-1) != "?" ? "&" : ""))
  + "reload=" + new Date().getTime() + window.location.hash; 

    decisao = confirm("Deseja reiniciar o Mapa ? ");
  if (decisao){
    setTimeout(function(){
    // window.location.href = '';
    window.location.href = window.location.protocol +'//'+ window.location.host + window.location.pathname  ;  //+ reload
    //window.location.assign(window.location.protocol +'//'+ window.location.host + window.location.pathname  ) ; //+ reload
    },900);
  }
 // carregaGraficos();
});


function atualizaParams(aux){
  arr = aux.split('&');
  var novo = false;
  $.each(arr, function(index, value) {
    var aux2 = value.split('=');
    var temp = '';
    if (params[aux2[0]] !== undefined ){
      temp = params[aux2[0]] ;
    }
    if (temp !==  aux2[1] ){
      novo = true;
    }
    params[aux2[0]] = aux2[1];     
  });
  atualizaStilo( );
}


function atualizaParametros(text){

  var aux = text.split('/');
  params['ano'] = aux[1];
  params['mes'] = aux[0];
  $('#ano').val(params['ano']);
  $('#mes').val(zeroTxt(2, params['mes']));
  params['dados'] = '0' ; 
  var newID = params['ano'] +zeroTxt(2, params['mes'])+cidade   ;
  params['time'] = performance.now();
  if( newID !== params['ident'] ){
    params['ident'] = newID ;
    if (carregaGrafico){
      $('#londeando').show() ;
      exibeGrafico(false); 
      carregaGraficos( );
      travaBtn(true) ;
    }else{
      atualizaStilo( );
    }
  }
}



function atualizaStilo( ){
   
  var atualZ = map.getView().getZoom();
  styleCache = {};
  listaCamada.forEach(function(item , index){

    if(item.getFuncao().substr(0,7) =='grafico'  || item.getFuncao()=='pesquisa'  || item.getFuncao()=='calor' ){
      var min = '';
      var max = '';
      if (item.getExibicao()!=undefined){
        min = item.getExibicao()[0];
        max = item.getExibicao()[1];
      }else{
        min = 20;
        max = 0;
      }
      if ( atualZ <= min && atualZ >= max   ){
        visivel = true ;
      }else{
        visivel = false ; 
      }
      visivel = visivel && item.getCarregado()  ;
      if(item.getFuncao().substr(0,7) =='grafico' && carregaGrafico ){
        exibeGrafico(visivel); 
         layers[ item.getPLista()].getSource().changed();

 // console.info( 'atualizaStilo ' + item.getNome() +'  --  '+ item.getFuncao()   + '  visivel  '+visivel.toString()  );   SPOTO 

      }else if (item.getFuncao()=='pesquisa' || item.getFuncao()==='calor'  ){
      var arr = detalhes(item);
      var parametros = arr[0];
       layers[ item.getPLista()].getSource().updateParams( {'viewparams':  parametros } );     
      }
    }
  });
   $('#londeando').hide() ;
   travaBtn(false) ;
}


  function NewValue(){
    if(Math.random() > .5){
        return Math.round(Math.random()*100);
    } else {
        return (Math.random()*100).toFixed(1);
    }
  }


  function zeroTxt(qtde , str ){
    var aux = '0';
    for (var i = 0; i < qtde; i++) {
      aux += '0';
    }
    if (typeof str == 'string' &&  qtde >= str.length ){
      var string =  aux.substring( 0 , qtde - str.length ) + str  ;
    }else{
      console.info( 'function usada incorretamente.'+ ' ( '+qtde +' <= ' + str!=undefined ? str.length  : ' str não existe ' +' ) ou ( '+typeof str + ' !=  string ).' );
      var string = str;
    }
    return string;
  }

// Slider Handling
$( "#slider-1" ).on( 'change', function( event ) {
  var val = $("#slider-1").val();
  $("#hint").empty();
  $("#hint").append(dates[val]);
});

//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/

$('.btn-number').click(function(e){
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var descricao  = input.val();
    var currentVal = parseInt(dates.indexOf(input.val()));

    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(dates[currentVal - 1]).change();
            } 
            if(currentVal == input.attr('min')) {
   //             $(this).attr('disabled', true);
            }
            if( currentVal < input.attr('min')) {
    //            $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                // input.val(currentVal + 1).change();
                input.val(dates[currentVal + 1]).change();
            }
            if(currentVal == input.attr('max')) {
    //            $(this).attr('disabled', true);
            }
            if(currentVal > input.attr('max')) {
    //            $(this).attr('disabled', true);
            }
        }
    } else {
         input.val(dates[0]);
    }
    

});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});

$('.input-number').change(function() {
    travaBtn(true);
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    var recarga = false; 
    var descricao    = $(this).val();
    var aux = descricao.split('/');
    if(descricao.indexOf('/')!==-1 && (aux[0].length == 1 || aux[1].length == 2 ) ){
      var ano = aux[1].length == 2  ? '20'+aux[1] : aux[1] ;
      descricao = zeroTxt(2, aux[0] )  + '/' +ano ;
      $(this).val(descricao);
    }

    var valueCurrent = parseInt(dates.indexOf(descricao) !== -1 ? dates.indexOf(descricao) : -1 )   ;
    name = $(this).attr('name');

    if(valueCurrent >= minValue) {
        recarga = true; 
    } else {
        alerta(3,'Desculpe, este periodo não possue informações no sistema.');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        recarga = true; 
    } else {
        alerta(3,'Desculpe, este periodo não possue informações no sistema.');
        $(this).val($(this).data('oldValue'));
    }

    if( $(this).val() !== $(this).data('oldValue') ){
      recarga = true; 
    }else if(recarga) {
      $(this).data('oldValue', $(this).val());
    }

    if(recarga){
      atualizaParametros($(this).val() );
    }
    
});



function travaBtn (  acao ){

     $('.btn-number').each(function(index){
      fieldName = $(this).attr('data-field');
      type      = $(this).attr('data-type');
      var input = $("input[name='"+fieldName+"']");
      var descricao  = input.val();
      var currentVal = parseInt(dates.indexOf( descricao ));

      if (acao){
        $(this).attr('disabled', true);
         input.attr('disabled', true);
         $('#trocaG').hide();
         $('#alrt').hide();
      }else{
          input.removeAttr('disabled');
          if(carregaGrafico){
            $('#trocaG').show();
            $('#alrt').show();
          }

          if(type === 'minus'){
            acaoX = ((type === 'minus' &&  currentVal === 0 ) )  ;
          }
          if (type === 'plus'){
            acaoX = (type === 'plus' &&  currentVal === (dates.length -1 ) ) ;
          }
          if (acaoX){
            $(this).attr('disabled', true);
          }else{
            $(this).removeAttr('disabled');
          }
      }
     });
}


$(".input-number").keydown(function (e) {

        //console.info('e.shiftKey -> '+e.shiftKey) ;
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 37)) {
                 // let it happen, don't do anything
                 return;
        }
        if(e.keyCode == 38 || e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 40 ){

          if  ( (e.keyCode == 38 ||  e.keyCode == 33 )){  //'UP'
            $(".btn-number[data-type='plus']").click();
          }else{  // 'Down'
            $(".btn-number[data-type='minus']").click();
          }
        }
        // Ensure that it is a number and stop the keypress  / add keyCode '/' = 111 & 191 
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && (e.keyCode !== 111) && (e.keyCode !== 191) ) {
            e.preventDefault();
        }
    });



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
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Pgv' ){
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
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Setor' ){  
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Zona' ){  
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Setor_fiscal' ){  
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Zona_homogenea' ){
          var identifica = '12'+feature['O'].id ;
          var titulo = feature['O'].id  +' - '+feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Zh' ){
          var identifica = '12'+feature['O'].id ;
          var titulo = feature['O'].id  +' - '+feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Zona_pgv' ){
          var identifica = '12'+feature['O'].id ;
          var titulo = feature['O'].id  +' - '+feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Zona_Homogenea' ){
          var identifica = '12'+feature['O'].id ;
          var titulo = feature['O'].descricao ;  // +' - '+feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Setor_adm' ){
          var identifica = '12'+feature['O'].id ;
          var titulo =  feature['O'].descricao  ;
          var posicao = '2'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Setor' ){  
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao  ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Municipio' ){  
          var identifica = '10'+feature['O'].id ;
          var titulo = feature['O'].descricao  ;
          var posicao = '0'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }else if (feature['a'].substr(0, feature['a'].indexOf('.') ) == 'Distrito' ){
          var identifica = '11'+feature['O'].id ;
          var titulo = feature['O'].descricao ;
          var posicao = '1'+feature['O'].id  ;
          var padrao_cor = feature['O'].padrao_cor  ;
        }
    }  

    posicao += cidade;
    identifica += cidade;

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
      console.log('Camada '+feature['a'] ,  ' identifica '+identifica ,  '  titulo  '+titulo , '  resolution  '+resolution , '  posicao   '+posicao );
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

  // Monta dados pra API Google chart
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
    x = x.substr(0, x.indexOf(cidade) );
    switch (params['ts']){
        case '13':
            ind  = x+ params['ts']  + '-' + getVariavel(5,1) + cidade ;
        break;
        case '14':
            ind  = x+ params['ts']  + '-' + getVariavel(6,1) + cidade ;
        break;
        case '15':
            ind  = x+ params['ts']  + '-' + getVariavel(7,1) + cidade  ;
        break;
        case '20':
            ind  = x+ params['ts']  + '-' + getVariavel(7,1) + cidade  ;
        break;
        case '23':
            ind  = x+ params['ts']  + '-' + getVariavel(8,1) + cidade  ;
        break;
        default:
            ind  = x+ params['ts']  + '-' + params['gg']  + cidade;
      }
  }else{
    ind  = x ;
    var aux =   x.slice(-4).slice(0,2);
    usaCor = cores[aux];
  }
   
  // console.info('ind== ' +ind)

    dados =  dadosCC[ind] !== undefined  ? dadosCC[ind] : undefined ;


  //  console.info(dados);
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


function ajusteBadgePai (){

  count = 0;
  temBase = false;
  listaCamada.forEach(function(item,index){
    if(item.getCarregado() && item.getMenu() && item.getLayer() ){
      count++;
    }

    if(item.getCarregado() && item.getFuncao()==='base' && !temBase  && item.getPLista()  ){
      count++;
      temBase = true;
     // console.info(item.getNome());
      layers[item.getPLista()].setVisible( true ); 
    }


  });

  $("#badge-1").text(count);
}


var faca = '';
      function configAcaoRetorno(funcao ) {
        //console.info(funcao);
        if(funcao !== undefined ){
          faca = funcao;
        }else{
          faca = 'FILTRO';
        }
      };
