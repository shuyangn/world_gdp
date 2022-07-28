function generatePieChart() {
var width = 500,
    height = 300,
    margin = 30;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pic1")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data111 = {"United States": 24.67, "China":17.39, "Japan":5.97,"Germany":4.54,"United Kindom":3.26,"countries 6-10": 12.35, "countries 11-15":7.81, "countries 16-25":7.96, "168 rest": 16.04};

// set the color scale
var color = d3.scaleOrdinal()
  .range(["#88e3d1", "#d1e6a8","#fc7419", "#fddd9e",  "#cbaddb","#768cce","#ffc6d0","#e9d3a8","#f17173","#f5897c"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
.value(function(d) {return d[1]});

var data_ready = pie(Object.entries(data111));
// shape helper to build arcs
var arcGenerator = d3.arc()
  .innerRadius(80)
  .outerRadius(radius)


// Build the pie chart
svg
  .selectAll('slices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data[1])) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)


  //add annotation
  svg.selectAll('slices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data[0] + " "+ d.value})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 10)

  var svg2 = d3.select("#pic1")
           .append("svg")
           .attr("width", 50)
           .attr("height", 200)
           svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#88e3d1")
           svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#404080")
           svg.append("text").attr("x", 220).attr("y", 130).text("United States").style("font-size", "15px").attr("alignment-baseline","middle")
           svg.append("text").attr("x", 220).attr("y", 160).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle")


}

export default generatePieChart;