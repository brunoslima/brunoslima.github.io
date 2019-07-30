//Implementação - Streamgraph
chart("../js/read/streamgraphIssues.csv", "red");

var datearray = [];
var colorrange = [];
//var colorrange = ['#00F5FF','#7FFFD4','#9AFF9A','#00FF7F','#BBFFFF','#C0FF3E','#4A708B','#698B22','#FF7256'];
//strokecolor = colorrange[0];
//var cores = d3.scale.category20();
var severity = "";

function chart(csvpath, color) {

var graph = d3.csv(csvpath, function(data) {

  data.forEach(function(d) {
    d.project = +d.project;
    d.value = +d.value;
    severity = d.severity = d.severity;
  });

if(severity == "BLOCKER") var colorrange = ['#ffe5e5','#ffcccc','#ffb2b2','#ff9999','#ff7f7f','#ff6666','#ff4c4c','#ff3232','#ff1919', '#ff0000', '#e50000', '#cc0000', '#b20000', '#990000', '#7f0000', '#660000', '#4c0000', '#330000', '#190000', '#000000'];
else if(severity == "CRITICAL") var colorrange = ['#fff2e5','#ffe5cc','#ffd8b2','#ffcc99','#ffbf7f','#ffb266','#ffa64c','#ff9932','#ff8c19','#ff8000','#e57300','#cc6600','#b25900','#994c00','#7f4000','#663300','#4c2600','#331900','#190c00','#000000'];
else if(severity == "MAJOR") var colorrange = ['#e5e5ff','#ccccff','#b2b2ff','#9999ff','#7f7fff','#6666ff','#4c4cff','#3232ff','#1919ff', '#0000ff', '#0000e5', '#0000cc', '#0000b2', '#000099', '#00007f', '#000066', '#00004c', '#000033', '#000019', '#000000'];
else if(severity == "MINOR") var colorrange = ['#ffffe5','#ffffcc','#ffffb2','#ffff99','#ffff7f','#ffff66','#ffff4c','#ffff32','#ffff19','#ffff00','#e5e500','#cccc00','#b2b200','#999900','#7f7f00','#666600','#4c4c00','#333300','#191900','#000000'];
else if(severity == "INFO") var colorrange = ['#e5ffe5','#ccffcc','#b2ffb2','#99ff99','#7fff7f','#66ff66','#4cff4c','#32ff32','#19ff19','#00ff00','#00e500','#00cc00','#00b200','#009900','#007f00','#006600','#004c00','#003300','#001900','#000000'];
strokecolor = colorrange[0];
strokecolor = "#FFFFFF";

//Definindo area de desenho
var margin = {top: 45, right: 10, bottom: 40, left: 10};
var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

//Definindo escalas
var x = d3.scale.linear().range([0, width]); //Eixo x
var y = d3.scale.linear().range([height-10, 0]); //Eixo y
var z = d3.scale.ordinal().range(colorrange);

var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y);
var yAxisr = d3.svg.axis().scale(y);

var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.project; })
    .y(function(d) { return d.value; });

var nest = d3.nest().key(function(d) { return d.key; });

var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.project); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right - 30)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var layers = stack(nest.entries(data));

  console.log(layers);

  x.domain([1,d3.max(data, function(d) { return d.project; })]);
  y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i)});

  //Desenhando eixo x
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.2 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];
      var invertedx = x.invert(mousex);
      var selected = (d.values);

      for (var k = 0; k < selected.length; k++) {

        datearray[k] = selected[k].project
      }

      mousedate = datearray.indexOf(invertedx);
      //pro = d.values[mousedate].value;

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"),
      tooltip.html("<div class='rotulo'><p>Issue:" + d.key + "</p></div>")
        .style("visibility", "visible");
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "10");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"),
      tooltip.html("<div class='rotulo'><p>Issue: " + d.key + "</p></div>")
        .style("visibility", "hidden");
  })
    
  var vertical = d3.select(".chart")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "2px")
        .style("height", "460px")
        .style("top", "30px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#000");

  d3.select(".chart")
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" )})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px")});
});

  function selecionarCor(s) {
    console.log(s);
    //if(s == "BLOCKER") return(d3.rgb(255,0,0)); //VERMELHO
    //else if(s == "CRITICAL") return(d3.rgb(251,115,10)); //LARANJA
    //else if(s == "MAJOR") return(d3.rgb(10,39,204)); //AZUL
    //else if(s == "MINOR") return(d3.rgb(255,251,40)); //AMARELO
    //else if(s == "INFO") return(d3.rgb(0,255,0)); //VERDE

  }

}