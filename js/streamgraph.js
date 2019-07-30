//Implementação - Streamgraph


chart("../js/read/streamgraph.csv", "red");

var datearray = [];
var colorrange = [];

function chart(csvpath, color) {

var graph = d3.csv(csvpath, function(data) {
  data.forEach(function(d) {
    d.project = +d.project;
    d.value = +d.value;
  });

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
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height-10, 0]);

var z = d3.scale.ordinal()
    .range(colorrange);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y);

var yAxisr = d3.svg.axis()
    .scale(y);

var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.project; })
    .y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) { return d.key; });

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
      .style("fill", function(d, i) { return selecionarCor(d.key)});

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
        return j != i ? 0.6 : 1;
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
      pro = d.values[mousedate].value;

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"), tooltip.html( "<div class=\"rotulo\"><p>" + d.key + "<br>" + pro + "</p></div>" ).style("visibility", "visible");
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "10");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html("<div class=\"rotulo\"><p>" + d.key + "<br>" + pro + "</p></div>" ).style("visibility", "hidden");
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
    
    if(s == "Rework Time") return(d3.rgb(128,0,128)); //ROXO
    else if(s == "Amount") return(d3.rgb(105,105,105)); //CINZA
    else if(s == "Blocker") return(d3.rgb(255,0,0)); //VERMELHO
    else if(s == "Critical") return(d3.rgb(251,115,10)); //LARANJA
    else if(s == "Major") return(d3.rgb(10,39,204)); //AZUL
    else if(s == "Minor") return(d3.rgb(255,251,40)); //AMARELO
    else return(d3.rgb(0,255,0)); //VERDE

  }

}