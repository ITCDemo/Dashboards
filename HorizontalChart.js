function HorizontalChart(data) {

    d3.select('#horizontalBar svg').remove();


    var min = 10000000000;
    var max = 0;

    var sorted = [];
    for (var item in data)
        if (item != 'Default_Cpty' && item != "") {
            sorted.push([item, data[item]]);
            sorted.sort(
                function (a, b) {
                    return b[1] - a[1]
                }
            );
        }

    var counterparties = [];
    counterparties.push("");
    var exps = [];

    var limit = 10;
    if (sorted.length < 10) limit = sorted.length;

    for (var i = 0; i < limit; i++) {
        counterparties.push(sorted[i][0]);
        exps.push(sorted[i][1]);
        if (sorted[i][1] > max) max = sorted[i][1];
        if (sorted[i][1] < min) min = sorted[i][1];
    }


    var colors = ["#71D1D5", "#56B6BF", "#26A1AD", "#028C99", "#2B8CB1", "#05739D", "#3078B5", "#095DA2", "#375DBA", "#08297B", "#0F3BA8"];


    var xscale = d3.scale.linear()
        .domain([min, max])
        .range([50, 300]);

    var yscale = d3.scale.linear()
        .domain([0, counterparties.length])
        .range([30, 330]);

    var colorScale = d3.scale.quantize()
        .domain([0, counterparties.length])
        .range(colors);

    var canvas = d3.select('#horizontalBar')
        .append('svg')
        .attr({'width': 500, 'height': 350});


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
        .tickValues(d3.range(limit + 1));

    var y_xis;
    if (limit == 10) {
        y_xis = canvas.append('g')
            .attr("transform", "translate(150,0)")
            .attr('id', 'yaxis')
            .call(yAxis)
            .style({'fill': '#fff', 'font-size': '10px'});
    }
    else {
        y_xis = canvas.append('g')
            .attr("transform", "translate(150," + -4 * limit + ")")
            .attr('id', 'yaxis')
            .call(yAxis)
            .style({'fill': '#fff', 'font-size': '10px'});
    }

    // var x_xis = canvas.append('g')
    //     .attr("transform", "translate(150,330)")
    //     .attr('id', 'xaxis')
    //     .call(xAxis);

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
                return xscale(d) - 45;
            }, 'y': function (d, i) {
                return yscale(i) + 32;
            }
        })
        .text(function (d) {
            return FormatMoney(d);
        }).style({'fill': '#fff', 'font-size': '10px'});
}