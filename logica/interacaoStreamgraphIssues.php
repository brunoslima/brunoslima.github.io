<?php

//Importando classes
require_once("../processamento/Arquivo.php");
require_once("../processamento/Processamento.php");
require_once("../processamento/Normalizacao.php");
require_once("../processamento/Conjunto.php");

session_start();

//Inicializando conjunto de dados
$conjuntoOriginal = Arquivo::lerCSV("../dados/streamgraphIssues.csv");
//$conjuntoOriginal = Normalizacao::ajustarTempoRetrabalho($conjuntoOriginal,2);
$conjuntoDeTrabalho = new Conjunto();

$verificacao = "inicio";

if(isset($_POST['filtrar'])){ //Filtro ativado

  $verificacao = "filtro";

  $_SESSION['severitySelected'] = $severity = $_POST['severity'];
  $severity = strtoupper($severity);

  $conjuntoDeTrabalho = Processamento::AplicarFiltroStreamgraphIssues($conjuntoOriginal, $severity);
  //$conjuntoDeTrabalho = Normalizacao::Coluna3($conjuntoDeTrabalho,2);
  Arquivo::salvarCSV("../js/read/streamgraphIssues.csv", $conjuntoDeTrabalho);

}

if($verificacao == "inicio"){ //Não ativou o filto, então carrega o conjunto de dados por completo
  
  $_SESSION['severitySelected'] = "BLOCKER";

  $conjuntoDeTrabalho = Processamento::AplicarFiltroStreamgraphIssues($conjuntoOriginal,"BLOCKER");
  //$conjuntoDeTrabalho = Normalizacao::Coluna3($conjuntoOriginal,2);
  Arquivo::salvarCSV("../js/read/streamgraphIssues.csv", $conjuntoDeTrabalho);

}

?>

