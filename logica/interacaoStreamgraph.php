<?php

//Importando classes
require_once("../processamento/Arquivo.php");
require_once("../processamento/Processamento.php");
require_once("../processamento/Normalizacao.php");
require_once("../processamento/Conjunto.php");

//Inicializando conjunto de dados
$conjuntoOriginal = Arquivo::lerCSV("../dados/streamgraph.csv");
$conjuntoOriginal = Normalizacao::ajustarTempoRetrabalho($conjuntoOriginal,2);
$conjuntoDeTrabalho = new Conjunto();

$verificacao = "inicio";

if(isset($_POST['filtrar'])){ //Filtro ativado

  $verificacao = "filtro";
  $vetorDeChaves = array();  

  if(isset($_REQUEST['key'])){ //Verificando quais filtros foram selecionados

    foreach ($_REQUEST['key'] as $chaves){             
      $vetorDeChaves[] = $chaves;
    }
  }

  if(count($vetorDeChaves) > 0){

    $conjuntoDeTrabalho = Processamento::AplicarFiltroStreamgraph($conjuntoOriginal, $vetorDeChaves);
    $conjuntoDeTrabalho = Normalizacao::Coluna($conjuntoDeTrabalho,2);

    Arquivo::salvarCSV("../js/read/streamgraph.csv", $conjuntoDeTrabalho);
  }
  else{
      
      $conjuntoDeTrabalho = Normalizacao::Coluna($conjuntoOriginal,2);

      Arquivo::salvarCSV("../js/read/streamgraph.csv", $conjuntoDeTrabalho); 
  }


}

if($verificacao == "inicio"){ //Não ativou o filto, então carrega o conjunto de dados por completo
    
  $conjuntoDeTrabalho = Normalizacao::Coluna($conjuntoOriginal,2);

  Arquivo::salvarCSV("../js/read/streamgraph.csv", $conjuntoDeTrabalho);

}

?>

