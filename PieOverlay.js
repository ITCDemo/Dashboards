function drawBar(data, where) {

    var margin = {top: 40, right: 20, bottom: 40, left: 40},
        width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var formatPercent = d3.format("s");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, 150], 0.5);

    var y = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Exposure:</strong> <span style='color:#000'>" + FormatMoney(d.value) + "</span>";
        });

    var svg;

    if(where == "Rating") {
        svg = d3.select("#barpieUtil")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    else{
        svg = d3.select("#SecbarpieUtil")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    svg.call(tip);



    x.domain(data.map(function (d) {
        return d.name;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.value;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -140)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Utilization");


    svg.selectAll(".barPie")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "barPie")
        .attr("x", function (d) {
            return x(d.name);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            return height;
        })
        .attr("height", function (d) {
            return 0;
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .transition()
        .duration(400)
        .delay(function (d, i) {
            return i + 50;
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d){
            return y(0) - y(d.value);
        });


    function type(d) {
        d.frequency = +d.value;
        return d;
    }
}

function drawPie(dataset, type) {

    var pie = d3.layout.pie()
        .value(function (d) {
            return d.percent
        })
        .sort(null)
        .padAngle(.03);

    var w = 180, h = 300;

    var outerRadius = w / 3;
    var innerRadius = 50;

    //var color = d3.scale.category10();
    color = d3.scale.ordinal()
        .domain(0, 1)
        .range(["#cc0000", "#009900"]);

    var arc = d3.svg.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    var svg;

    if(type == "Rating") {
        svg = d3.select("#barpieUtil")
            .append("svg")
            .attr({
                width: 190,
                height: 200,
                class: 'shadow'
            }).append('g')
            .attr({
                transform: 'translate(' + 140 / 2 + ',' + 120 / 2 + ')'
            });
    }
    else{
        svg = d3.select("#SecbarpieUtil")
            .append("svg")
            .attr({
                width: 190,
                height: 200,
                class: 'shadow',
                fill: 'none'
            }).append('g')
            .attr({
                transform: 'translate(' + 140 / 2 + ',' + 140 / 2 + ')'
            });
    }
    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr({
            d: arc,
            fill: function (d, i) {
                return color(d.data.name);
            }
        });

    path.transition()
        .duration(1000)
        .attrTween('d', function (d) {
            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function (t) {
                return arc(interpolate(t));
            };
        });


    var restOfTheData = function () {
        var text = svg.selectAll('text')
            .data(pie(dataset))
            .enter()
            .append("text")
            .transition()
            .duration(200)
            .attr("transform", function (d) {

                var c = arc.centroid(d);
                return "translate(" + c[0] * 1 + "," + c[1] * 1 + ")";
                //return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".4em")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.data.percent + "%";
            })
            .style({
                fill: '#fff',
                'font-size': '12px'
            });

        var legendRectSize = 10;
        var legendSpacing = 7;
        var legendHeight = legendRectSize + legendSpacing;


        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr({
                class: 'legend',
                transform: function (d, i) {
                    //Just a calculation for x & y position
                    return 'translate(-35,' + ((i * legendHeight) - 20) + ')';
                }
            });
        legend.append('rect')
            .attr({
                width: legendRectSize,
                height: legendRectSize,
                rx: 10,
                ry: 10
            })
            .style({
                fill: color,
                stroke: color
            });

        legend.append('text')
            .attr({
                x: 20,
                y: 10
            })
            .text(function (d) {
                return d;
            }).style({
            fill: '#fff',
            'font-size': '12px'
        });
    };

    setTimeout(restOfTheData, 1000);
}
