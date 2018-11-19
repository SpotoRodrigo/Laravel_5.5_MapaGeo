function kamada () {
  var id;
  var nome;
  var Layer;
  var url;
  var menu;
  var tipoPai;        //  0 = nãoPai , 1 = filhoUnidos ,    2 = filhoPrefirido , 3 =  (sem check Ativador)  , 4 = Misto 
  var tipoFilho;      //  0 = nãFilho , 1 = camadaEstatica  ,  2 = camadaStiloGeo , 3 = camadaSql , 4 = camadaOculta , 5 camadaStgeoSql (2+3) , 6 = camadaHerdada + Pams eou Sql
  var params;
  var carregado;
  var funcao;
  var subFuncao;
  var pai;
  var pLista;
  var qtdeF;
  var estilo;
  var cor;
  var size;
  var info;
  var total;
  var exbicao;
  var opacidade;
  var legendaTipo;   // Tabela Dimensao tem padrão_cor e descricao, uso o ID para criar Legenda .
  var escolha;

  this.setId = function (vId) {
    this.id = vId;
  }

  this.setNome = function (vNome) {
    this.nome = vNome;
  }

  this.setLayer = function (vLayer) {
    this.layer = vLayer;
  }

  this.setMenu = function (vMenu) {
    this.menu = vMenu;
  }

  this.setTipoPai = function (vTipoPai) {
    this.tipoPai = vTipoPai;
  }

  this.setTipoFilho = function (vTipoFilho) {
    this.tipoFilho = vTipoFilho;
  }

 this.setParams = function (vParams) {
    this.params = vParams;
  }

  this.setCarregado = function (vCarregado) {
    this.carregado = vCarregado;
  }

  this.setFuncao= function (vFuncao) {
    this.funcao = vFuncao;
  }

  this.setSubFuncao= function (vSubFuncao) {
    this.subFuncao = vSubFuncao;
  } 

  this.setPai = function (vPai) {
    this.pai = vPai;
  }

  this.setPLista = function (vPLista) {
    this.pLista = vPLista;
  }

  this.setQtdeF = function (vQtdeF) {
    this.qtdeF = vQtdeF;
  }

  this.setEstilo = function (vEstilo) {
    this.estilo = vEstilo;
  }

  this.setCor = function (vCor) {
    this.cor = vCor;
  }

  this.setSize = function (vSize) {
    this.size = vSize;
  }

  this.setInfo = function (vInfo) {
    this.info = vInfo;
  }

  this.setTotal = function (cTotal) {
    this.total = cTotal;
  }

  this.setExibicao = function (cExibicao) {
    this.exbicao = cExibicao;
  }

  this.setOpacidade = function (cOpacidade) {
    this.opacidade = cOpacidade;
  }

  this.setLegendaTipo = function (cLegendaTipo) {
    this.legendaTipo = cLegendaTipo;
  }

  this.setEscolha = function (cEscolha) {
    this.escolha = cEscolha;
  }


  this.getId = function () {
    return this.id;
  }

  this.getNome = function () {
    return this.nome;
  }

  this.getLayer = function () {
    return this.layer;
  }

  this.getMenu = function () {
    return this.menu;
  }

  this.getTipoPai = function () {
    return this.tipoPai;
  }

  this.getTipoFilho = function () {
    return this.tipoFilho;
  }

  this.getParams = function () {
    return this.params;
  }

  this.getCarregado = function () {
    return this.carregado;
  }

  this.getFuncao = function () {
    return this.funcao;
  }

  this.getSubFuncao = function () {
    return this.subFuncao;
  }

  this.getPai = function () {
    return this.pai;
  }

  this.getPLista = function () {
    return this.pLista; 
  }

  this.getQtdeF = function () {
    return this.qtdeF;
  }

  this.getEstilo = function () {
    return this.estilo;
  }

  this.getCor = function () {
    return this.cor;
  }

  this.getSize = function () {
    return this.size;
  }

  this.getInfo = function () {
    return this.info;
  }

  this.getTotal = function () {
    return this.total;
  }

  this.getExibicao = function () {
    return this.exbicao;
  }

  this.getOpacidade = function () {
    return this.opacidade;
  }

  this.getLegendaTipo = function () {
    return this.legendaTipo;
  }

  this.getEscolha = function () {
    return this.escolha;
  }

}
