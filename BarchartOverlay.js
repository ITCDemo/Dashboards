function drawBarRegion(data, name) {

    var margin = {top: 40, right: 20, bottom: 30, left: 130},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var formatPercent = d3.format("$");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, 400], 0.3);

    var y = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(function(d) { return FormatMoney(d); });

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Exposure:</strong> <span style='color:black'> " + FormatMoney(d.value) + "</span>";
        });

    var svg = d3.select("#pie")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);


    x.domain(data.map(function (d) {
        return d.name;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.value;
    })]);

    svg.append("g")
        .attr("class", "x axis")
        .style("fill", "#fff")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "#fff")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -110)
        .attr("dy", ".71em")
        .attr("x", -40)
        .style("text-anchor", "end")
        .style("fill", "#fff")
        .text("Exposure");


    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
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
        .duration(700)
        .delay(function (d, i) {
            return i + 50;
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d){
            return y(0) - y(d.value);
        });
    
    svg.append("text")
        .data(data)
        .attr("x", "100px")
        .attr("y", "-20px")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#fff")
        .text(name);


    function type(d) {
        d.frequency = +d.value;
        return d;
    }
}