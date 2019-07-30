<?php
require_once("../logica/interacaoStreamgraphIssues.php");
?>

<html>
  
  <head>    
    <meta charset="utf-8">
    <title>TDCodeVis - Streamgraph - Issues</title>
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
      <script src="../js/streamgraphIssues.js" charset="utf-8"></script>

      <div class="filtro">
        <h2>Current Severity:</h2><?php echo  $_SESSION['severitySelected'] ?>
        <form action="streamgraphIssues.php" method="POST">
          <h3>Select severity:</h3>
          <select name="severity">
            <option value="BLOCKER">Blocker</option>
            <option value="CRITICAL">Critical</option>
            <option value="MAJOR">Major</option>
            <option value="MINOR">Minor</option>
            <option value="INFO">Info</option>
          </select>
          <input id="btn-estilo" type="submit" name="filtrar" value="Filter">
        </form>
      </div>

    </section>

  </body>

</html>