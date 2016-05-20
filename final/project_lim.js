function DrawGraph(){


d3.selectAll("svg").remove();

var countries = new Array();

    $(document).ready(function() {

    $("#country option:selected").each(function() {
       countries.push($(this).val());
        });

    });


if (countries.length<1) {
    alert("Select at least one country!!")}
    else{



// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 40, bottom: 30, left: 50};
var width = 700 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);


// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(50)
    .tickFormat(d3.format("d"));
    ;

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10)
    .tickFormat(function(d) { return "$" + d; })
    .tickFormat(d3.format(".2s"));


var yAxis2 = d3.svg.axis().scale(y)
    .orient("right").ticks(10)
    .tickFormat(function(d) { return "$" + d; })
    .tickFormat(d3.format(".2s"));



// Define the line
var net_odaline = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.net_oda); })
    ;
    

var gdp_line = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.GDP); })
    ;


// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");






// Get the data
d3.csv("https://raw.githubusercontent.com/nathanlim45/is608/master/final/data/oda_data_cleaned.csv", function(data) {
     var data=data.filter(function(row) {

        return countries.indexOf(row['Country.Name'])>-1;
    })

 // Cast Numeric value, handling NaN as zero
      data.forEach(function(d) {
          d.net_oda = parseInt(d.net_oda)||0;
        });


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.net_oda; }), d3.max(data, function(d) { return d.net_oda; })]); 





    // Nest the entries by symbol

   var dataNest = d3.nest()
        .key(function(d) {return d["Country.Name"];})
        .entries(data);

    var color = d3.scale.category10();   // set the colour scale

    legendSpace = width/dataNest.length; // spacing for legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke", function() {
                return d.color = color(d.key); })
            .style("stroke-opacity", 0.7)
            .attr("d", net_odaline(d.values));



//legend
        svg.append("text")
        .attr("x", 30) // spacing
        .attr("y", i*20)
        .attr("class", "legend")    // style the legend
        .style("fill", function() { // dynamic colours
            return d.color = color(d.key); })
        .text(d.key);


    });


    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-50)")
        .attr("dx", "-.8em")
        .attr("text-anchor", "end")
        .style("font-size","8px");

var format = d3.format(",.2f");

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)


});





// Get the data
d3.csv("https://raw.githubusercontent.com/nathanlim45/is608/master/final/data/GDP_cleaned.csv", function(data) {
     var data=data.filter(function(row) {

        return countries.indexOf(row['Country.Name'])>-1;
    })

 // Cast Numeric value, handling NaN as zero
      data.forEach(function(d) {
          d.GDP = Number(d.GDP)||0;
        });


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.GDP; }), d3.max(data, function(d) { return d.GDP; })]); 





    // Nest the entries by symbol

   var dataNest = d3.nest()
        .key(function(d) {return d["Country.Name"];})
        .entries(data);

    var color = d3.scale.category10();   // set the colour scale

    legendSpace = width/dataNest.length; // spacing for legend

    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 

        svg.append("path")
            .attr("class", "line")
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-opacity", 0.5)
            .style("stroke", function() {
                return d.color = color(d.key); })
            .attr("d", gdp_line(d.values))
    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-50)")
        .attr("dx", "-.8em")
        .attr("text-anchor", "end")
        .style("font-size","8px");



/*

//Grid line

svg.selectAll(".hline").data(d3.range(9)).enter()
    .append("line")
    .attr("y1", function (d) {
    return d * 26 + 6;
})
    .attr("y2", function (d) {
    return d * 26 + 6;
})
    .attr("x1", function (d) {
    return 0;
})
    .attr("x2", function (d) {
    return width;
})
    .style("stroke", "#eee")
;



//vertical lines
svg.selectAll(".vline").data(d3.range(21)).enter()
    .append("line")
    .attr("x1", function (d) {
    return d * (width / 10);
})
    .attr("x2", function (d) {
    return d * (width / 10);
})
    .attr("y1", function (d) {
    return 0;
})
    .attr("y2", function (d) {
    return height;
})
    .style("stroke", "#eee");
*/


var format = d3.format(",.2f");

    // Add the Y Axis
    svg.append("g")
        .attr("transform", "translate(" + width + " ,0)")
        .attr("class", "y axis")
        .call(yAxis2)

});


/*
var map = d3.geomap()
    .geofile('https://rawgit.com/nathanlim45/is608/master/final/d3-geomap/topojson/world/countries.json');

d3.select('#map')
    .call(map.draw, map);

*/





};


};




function DrawMap(){



var year = new Array();

    $(document).ready(function() {

    $("#YEAR option:selected").each(function() {
       year.push($(this).val());
        });

    });


    var format = function(d) {
    d = d / 1000000;
    return d3.format(',.02f')(d) + 'M';
}


var worldmap = d3.geomap.choropleth()
    .geofile('https://rawgit.com/nathanlim45/is608/master/final/d3-geomap/topojson/world/countries.json')
    .column("Y1960")
    .unitId('Country Code')
    .legend(true);

d3.csv('https://raw.githubusercontent.com/nathanlim45/is608/master/final/data/life_expectancy_at_birth_male.csv', function(error, data) {
      
      data.forEach(function(d) {

           d.Y1961 = Number(d.Y1961)||0;
           d.Y1962 = Number(d.Y1962)||0;
           d.Y1963 = Number(d.Y1963)||0;
           d.Y1964 = Number(d.Y1964)||0;
           d.Y2000 = Number(d.Y2000)||0;
           d.Y2002 = Number(d.Y2002)||0;
        });

    d3.select('#map')
        .datum(data)
        .call(worldmap.draw, worldmap);
});

};






