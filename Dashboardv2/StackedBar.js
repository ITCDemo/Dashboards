function DrawStacked(formattedData) {

    var data = [];
    var ratingMap = {};
    var existingVar;
    var existingLimit;
    var max = 0;

    for(var i in formattedData) {
        if (ratingMap[formattedData[i]["Rating"]] == undefined) {
            ratingMap[formattedData[i]["Rating"]] = {VaR: formattedData[i]["VaR"], Limit: formattedData[i]["VaRLimit"]};
        }
        else {
            existingVar = ratingMap[formattedData[i]["Rating"]]["VaR"];
            existingLimit = ratingMap[formattedData[i]["Rating"]]["Limit"];
            ratingMap[formattedData[i]["Rating"]] = {
                VaR: formattedData[i]["VaR"] + existingVar,
                Limit: formattedData[i]["VaRLimit"] + existingLimit
            };
        }
    }

    for(var item in ratingMap){

        if(ratingMap[item]["Limit"] > max){
            max = ratingMap[item]["VaR"];
        }

        data.push({
            "rating": item,
            "VaR": ratingMap[item]["VaR"],
            "Diff": ratingMap[item]["Limit"] - ratingMap[item]["VaR"],
            "Limit": ratingMap[item]["Limit"]
        })
    }

    var margin = {
            top: 40,
            right: 20,
            bottom: 40,
            left: 120
        },
        width = 460 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom,
        that = this;


    var x = d3.scale.ordinal().rangeRoundBands([0, width], .4); // reduce thickness of bars

    // debugger;
    // var y = d3.scale.linear().rangeRound([height, 0]);
    // y.domain([0, 1462515000]).nice();

    var y = d3.scale.linear().rangeRound([height, 0]).domain([0,1]);

    // var y = d3.scale.linear()
    //     .domain([0, 10000000])
    //     .range([height, 0]);

    // var color = d3.scale.category20();

    var color = d3.scale.ordinal()
        .domain([0,1,2])
        .range(["#036E9D", "#4FBEE3", "#94C6E7"]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(function (d) {
        return FormatMoney(d * max);
    });


    var svg = d3.select(".rating").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "rating";
    }));


    data.forEach(function (d) {
        var y0 = 0;

        d.rates = color.domain().map(function (name) {
            return {
                name: name,
                y0: y0,
                y1: y0 += +d[name],
                amount: d[name]
            };
        });
        d.rates.forEach(function (d) {
            d.y0 /= y0;
            d.y1 /= y0;
        });

    });

    data.sort(function (a, b) {
        return b.rates[0].y1 - a.rates[0].y1;
    });

    x.domain(data.map(function (d) {
        return d.rating;
    }));

    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

    svg.append("g").attr("class", "y axis").call(yAxis);

    var rating = svg.selectAll(".rating").data(data).enter().append("g").attr("class", "rating").attr("transform", function (d) {
        return "translate(" + x(d.rating) + ",0)";
    });

    rating.selectAll("rect").data(function (d) {
        return d.rates;
    }).enter().append("rect").attr("width", x.rangeBand()).attr("y", function (d) {
        return y(d.y1);
    }).attr("height", function (d) {
        return y(d.y0) - y(d.y1);
    }).style("fill", function (d) {
        return color(d.name);
    }).on('mouseover', function (d) {
        // var total_amt;
        // total_amt = d.amount;
        //
        //
        //
        // console.log('----');
        // d3.select(".chart-tip").style('opacity', '1').html('Amount: <strong>$' + that.numberWithCommas(total_amt.toFixed(2)) + '</strong>');

    }).on('mouseout', function () {
        d3.select(".chart-tip").style('opacity', '0');
    });


    svg.append("text")
        .data(data)
        .attr("x", "100px")
        .attr("y", "-20px")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#fff")
        .text("Top Ratings");

    // var legend = svg.selectAll(".legend").data(color.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function (d, i) {
    //     return "translate(" + i * -70 + ",283)";
    // });
    //
    //
    // legend.append("rect").attr("x", width + -53).attr("width", 10).attr("height", 10).style("fill", color);
    //
    // legend.append("text").attr("x", width - 40).attr("y", 5).attr("width", 40).attr("dy", ".35em").style("text-anchor", "start").text(function (d) {
    //     return d;
    // });

}