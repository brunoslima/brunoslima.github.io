<?php
require_once("../logica/interacaoStreamgraph.php");
?>

<html>
  
  <head>    
    <meta charset="utf-8">
    <title>TDCodeVis - Streamgraph</title>
    <link rel="stylesheet" href="../css/streamgraph.css" charset="utf-8">
    <link rel="stylesheet" href="../css/style.css" charset="utf-8">
    <script type="text/javascript" src="../js/d3_v3/d3.min.js"></script>
  </head>

  <body>

    <header class="cabecalho">
      <h1 id="title">TDCodeVis</h1>
    </header>

    <section class="menu">
      <ul class="menuprincipal">
        <li><a href="home.php"><img src="../imagens/home.png">Home</a></li>
        <li><a href=""><img src="../imagens/file.png">File</a>
          <ul class="submenu">
            <!--<li><a href="">Import CSV</a></li>-->
            <li><a href="../dados/catalog-tdcodevis.csv">Export CSV</a></li>
          </ul>
        </li>
        <li><a href="connection.php"><img src="../imagens/database.png">Connection Database</a></li>
        <li><a href=""><img src="../imagens/vis.png">Visualization - Amount</a>
          <ul class="submenu">
            <li><a href="streamgraph.php">Streamgraph</a></li>
            <li><a href="starplotSeverity.php">Starplot</a></li>
            <li><a href="treemap.php">Treemap</a></li>
            <li><a href="boxplotSeverity.php">Box Plot - Severity</a></li>
            <li><a href="boxplotVersions.php">Box Plot - Versions</a></li>
          </ul>
        </li>
        <li><a href=""><img src="../imagens/vis.png">Visualization - Issues</a>
          <ul class="submenu">
            <li><a href="streamgraphIssues.php">Streamgraph - Issues</a></li>
            <li><a href="bubbleChartAmount.php">Bubble Chart - Amount</a></li>
            <li><a href="bubbleChartRework.php">Bubble Chart - Rework</a></li>
          </ul>
        </li>
        <li><a href="about.php"><img src="../imagens/about.png">About</a></li>
      </ul>
    </section>

    <section class="conteudo">
      
      <div class="chart"></div>
      <script src="../js/streamgraph.js" charset="utf-8"></script>

      <div class="filtro">
        <form action="streamgraph.php" method="POST">
          <input type="checkbox" name="key[]" value="Rework Time">Rework Time<br>
          <input type="checkbox" name="key[]" value="Amount">Amount<br>
          <input type="checkbox" name="key[]" value="Blocker">Blocker<br>
          <input type="checkbox" name="key[]" value="Critical">Critical<br>
          <input type="checkbox" name="key[]" value="Major">Major<br>
          <input type="checkbox" name="key[]" value="Minor">Minor<br>
          <input type="checkbox" name="key[]" value="Info">Info<br>
          <input id="btn-estilo" type="submit" name="filtrar" value="Filter">
        </form>
      </div>

      <div class="legenda">
        <h2>SUBTITLE:</h2>
        <div id=circulo6></div><h1>Rework Time</h1>
        <div id=circulo7></div><h1>Amount</h1>
        <div id=circulo1></div><h1>Blocker</h1>
        <div id=circulo2></div><h1>Critical</h1>
        <div id=circulo3></div><h1>Major</h1>
        <div id=circulo4></div><h1>Minor</h1>
        <div id=circulo5></div><h1>Info</h1>
      </div>
    </section>

  </body>

</html>

