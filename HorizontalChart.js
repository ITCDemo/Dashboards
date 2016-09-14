var min = 10000000000;
var max = 0;

function HorizontalChart() {

    var sorted = [];
    for (var item in counterpartyExp)
    if(item.indexOf("Argentinas") == -1 && item != 'Default_Cpty' && item != "") {
        sorted.push([item, counterpartyExp[item]]);
        sorted.sort(
            function (a, b) {
                return b[1] - a[1]
            }
        );
    }

    var counterparties = [];
    counterparties.push("");
    var exps = [];

    for(var i=0;i<10;i++){
        counterparties.push(sorted[i][0]);
        exps.push(sorted[i][1]);
        if(sorted[i][1] > max) max = sorted[i][1];
        if(sorted[i][1] < min) min = sorted[i][1];
    }


    var colors = ["#71D1D5", "#56B6BF", "#26A1AD", "#028C99", "#2B8CB1", "#05739D", "#3078B5", "#095DA2", "#375DBA", "#08297B", "#0F3BA8"];

    var grid = d3.range(9).map(function (i) {
        return {'x1': 0, 'y1': 30, 'x2': 0, 'y2': 840};
    });

    var tickVals = grid.map(function(d,i){
        if(i>0){ return i*10; }
        else if(i===0){ return "100";}
    });

    var xscale = d3.scale.linear()
        .domain([100000000, max])
        .range([0, 800]);

    var yscale = d3.scale.linear()
        .domain([0, counterparties.length])
        .range([30, 330 ]);

    var colorScale = d3.scale.quantize()
        .domain([0, counterparties.length])
        .range(colors);

    var canvas = d3.select('#horizontalBar')
        .append('svg')
        .attr({'width': 1000, 'height': 350});

    var grids = canvas.append('g')
        .attr('id', 'grid')
        .attr('transform', 'translate(150,0)')
        .selectAll('line')
        .data(grid)
        .enter()
        .append('line')
        .attr({
            'x1': function (d, i) {
                return i * 30 * 3;
            },
            'y1': function (d) {
                return 330;
            },
            'x2': function (d, i) {
                return i * 30 * 3;
            },
            'y2': 335
        })
        .style({'stroke': '#adadad', 'stroke-width': '1px'});

    var xAxis = d3.svg.axis();
    xAxis
        .orient('bottom')
        .scale(xscale)
        .tickFormat(d3.format("s"));

    var yAxis = d3.svg.axis();
    yAxis
        .orient('left')
        .scale(yscale)
        .tickSize(2)
        .tickFormat(function (d, i) {
            return counterparties[i];
        })
        .tickValues(d3.range(11));

    var y_xis = canvas.append('g')
        .attr("transform", "translate(150,0)")
        .attr('id', 'yaxis')
        .call(yAxis);

    var x_xis = canvas.append('g')
        .attr("transform", "translate(150,330)")
        .attr('id', 'xaxis')
        .call(xAxis);

    var chart = canvas.append('g')
        .attr("transform", "translate(150,0)")
        .attr('id', 'bars')
        .selectAll('rect#bars')
        .data(exps)
        .enter()
        .append('rect')
        .attr('height', 16)
        .attr({
            'x': 0, 'y': function (d, i) {
                return yscale(i) + 20;
            }
        })
        .style('fill', function (d, i) {
            return colorScale(i);
        })
        .attr('width', function (d) {
            return 0;
        });


    var transit = d3.selectAll("#bars rect")
        .data(exps)
        .transition()
        .duration(1000)
        .attr("width", function (d) {
            return xscale(d);
        });

    var transitext = d3.selectAll('#bars')
        .selectAll('text')
        .data(exps)
        .enter()
        .append('text')
        .attr({
            'x': function (d) {
                return xscale(d) - 70;
            }, 'y': function (d, i) {
                return yscale(i) + 32;
            }
        })
        .text(function (d) {
            return FormatMoney(d);
        }).style({'fill': '#fff', 'font-size': '12px'});
}
