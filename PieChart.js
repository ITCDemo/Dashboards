function FormatMoney(money){

    formattedMoney = "";
    switch(money.toString().length){
        case 4:
        case 5:
        case 6:
            formattedMoney = "$ "+(money/1000).toFixed(1)+ "K";
            break;
        case 7:
        case 8:
        case 9:
            formattedMoney = "$ "+(money/1000000).toFixed(1) + "M";
            break;

        case 10:
        case 11:
        case 12:
            formattedMoney = "$ "+(money/1000000000).toFixed(1) + "B";
            break;
        default:
            formattedMoney = "$ "+money;
    }
    return formattedMoney;
}



function DrawPie ()
{

var dataset = {
        Sectors: [Sec1Map, Sec2Map, Sec3Map, Sec5Map, Sec6Map, Sec7Map, Sec8Map, Sec9Map, Sec11Map],
        Rating: [AAAMap, AAMap, AMap, BBBMap, BBMap, BMap, CCCMap, CCMap, CMap, DMap]
    };

    var width = 620,
        height = 300,
        radius = Math.min(width, height) / 2.4;

    var enterClockwise = {
        startAngle: 0,
        endAngle: 0
    };

    var enterAntiClockwise = {
        startAngle: Math.PI * 2,
        endAngle: Math.PI * 2
    };

    var color = d3.scale.ordinal()
        .domain([0,1,2,3,4,5,6,7,8])
        .range(["#3693D6", "#F9FF72", "#FCE636", "#FFA500", "#FC7200", "#FF3600", "#E20000", "#A40000", "#6D0101"]);

    var pie = d3.layout.pie()
        .sort(null);

    var outerRadius = width / 5;
    var innerRadius = 70;

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var arcOver = d3.svg.arc()
        .innerRadius(innerRadius+20)
        .outerRadius(outerRadius+20);

    var svg = d3.select(".PieRating").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 3.8 + "," + height / 2 + ")");

// set the start and end angles to 0 so we can transition
// clockwise to the actual values later
    HorizontalChart();

    var path = svg.selectAll("path")
        .data(pie(dataset.Sectors))
        .enter()
        .append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("d", arc(enterClockwise))
        .on('mouseover', function(d) {
            $(".pieoverlay")
                .html(FormatMoney(d.data))
                .show();


            d3.select(this).transition()
                .duration(300)
                .attr("d", arcOver);
        })
        .on('mousemove', function(d) {
            $(".pieoverlay")
                .css('left', d3.mouse(this)[0]+800)
                .css('top', d3.mouse(this)[1]+120)
        })
        .on('mouseout', function(d) {
            $(".pieoverlay").html('').hide();

            d3.select(this).transition()
                .duration(300)
                .attr("d", arc);
        })
        .each(function (d) {
            this._current = {
                data: d.data,
                value: d.value,
                startAngle: enterClockwise.startAngle,
                endAngle: enterClockwise.endAngle
            }
        });

    path.transition()  // update
        .duration(750)
        .attrTween("d", arcTween);


    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function () {
        d3.select("input[value=\"Rating\"]").property("checked", true).each(change);
    }, 2000);



    var legendRectSize = 20;
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
                if(i>4) {
                    return 'translate(150,' + ((i%4 * legendHeight) - 100) + ')';
                }

                return 'translate(300,' + ((i * legendHeight) - 100) + ')';
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
        })
        .on('mouseover', function(d) {
            d3.select(this).transition()
                .duration(300)
                .attr("width", legendRectSize + 5)
                .attr("height", legendRectSize + 5)
                .attr("rx", 15)
                .attr("ry", 15)
                .style("cursor", "pointer")

        })
        .on('mouseout', function(d){
            d3.select(this).transition()
                .duration(300)
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("width", legendRectSize)
                .attr("height", legendRectSize)
        })
        .on('click', function(d){
            $("#ratingSector-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
            if($('input[name=dataset]:checked').val() == "Sectors") {
                DisplayDendo(SectoRatingMap["Sector"][d], "Sectors");
            }
            else{
                DisplayDendo(SectoRatingMap["Rating"][d], "Rating");
            }
        });

    legend.append('text')
        .attr({
            x: 30,
            y: 15
        })
        .text(function (d) {
            var legendText ="";
           switch(d){
               case 0: legendText = "Energy"; break;
               case 1: legendText = "Materials"; break;
               case 2: legendText = "Industrials"; break;
               case 3: legendText = "Consumer Staples"; break;
               case 4: legendText = "Health Care"; break;
               case 5: legendText = "Financials"; break;
               case 6: legendText = "Information Tech"; break;
               case 7: legendText = "Telecom Services"; break;
               case 8: legendText = "SOVEREIGN"; break;
           }
            return legendText;
        }).style({
        fill: '#000',
        'font-size': '14px'
    });




    function change() {

        d3.selectAll(".legend").remove();

        if($('input[name=dataset]:checked').val() == "Sectors") {
            color = d3.scale.ordinal()
                .domain([0,1,2,3,4,5,6,7,8])
                .range(["#3693D6", "#F9FF72", "#FCE636", "#FFA500", "#FC7200", "#FF3600", "#E20000", "#A40000", "#6D0101"]);

        }
        else{
            color = d3.scale.ordinal()
                .domain([0,1,2,3,4,5,6,7,8,9])
                .range(["#3693D6", "#F9FF72", "#FCE636", "#FFA500", "#FC7200", "#FF3600", "#E20000", "#A40000", "#6D0101", "#340000"]);
        }

        clearTimeout(timeout);
        path = path.data(pie(dataset[this.value])); // update the data
        // set the start and end angles to Math.PI * 2 so we can transition
        // anticlockwise to the actual values later
        path.enter().append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc(enterAntiClockwise))
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .each(function (d) {
                this._current = {
                    data: d.data,
                    value: d.value,
                    startAngle: enterAntiClockwise.startAngle,
                    endAngle: enterAntiClockwise.endAngle
                };
            })
            .on('mouseover', function(d) {
                $(".pieoverlay")
                    .html(FormatMoney(d.data))
                    .show();


                d3.select(this).transition()
                    .duration(300)
                    .attr("d", arcOver);
            })
            .on('mouseout', function(d){
                $(".pieoverlay").html('').hide();

                d3.select(this).transition()
                    .duration(300)
                    .attr("d", arc);
            })
            .on('mousemove', function(d) {
                $(".pieoverlay")
                    .css('left', d3.mouse(this)[0]+800)
                    .css('top', d3.mouse(this)[1]+120)
            });// store the initial values

        path.exit()
            .transition()
            .duration(750)
            .attrTween('d', arcTweenOut)
            .remove(); // now remove the exiting arcs

        path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs


        var legendRectSize = 18;
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
                    if(i>4) {
                        return 'translate(150,' + ((i%5 * legendHeight) - 100) + ')';
                    }

                    return 'translate(300,' + ((i * legendHeight) - 100) + ')';
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
            })
            .on('mouseover', function(d) {
                d3.select(this).transition()
                    .duration(300)
                    .attr("width", legendRectSize + 5)
                    .attr("height", legendRectSize + 5)
                    .attr("rx", 15)
                    .attr("ry", 15)
                    .style("cursor", "pointer")

            })
            .on('mouseout', function(d){
                d3.select(this).transition()
                    .duration(300)
                    .attr("rx", 10)
                    .attr("ry", 10)
                    .attr("width", legendRectSize)
                    .attr("height", legendRectSize)
            })
            .on('click', function(d){
                $("#ratingSector-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
                if($('input[name=dataset]:checked').val() == "Sectors") {
                    DisplayDendo(SectoRatingMap["Sector"][d], "Sectors");
                }
                else{
                    DisplayDendo(SectoRatingMap["Rating"][d], "Rating");
                }
            });

        legend.append('text')
            .attr({
                x: 30,
                y: 15
            })
            .text(function (d) {

                if($('input[name=dataset]:checked').val() == "Sectors") {

                    var legendText = "";
                    switch (d) {
                        case 0:
                            legendText = "Energy";
                            break;
                        case 1:
                            legendText = "Materials";
                            break;
                        case 2:
                            legendText = "Industrials";
                            break;
                        case 3:
                            legendText = "Consumer Staples";
                            break;
                        case 4:
                            legendText = "Health Care";
                            break;
                        case 5:
                            legendText = "Financials";
                            break;
                        case 6:
                            legendText = "Information Tech";
                            break;
                        case 7:
                            legendText = "Telecom Services";
                            break;
                        case 8:
                            legendText = "SOVEREIGN";
                            break;
                    }
                }
                else if($('input[name=dataset]:checked').val() == "Rating"){
                    var legendText = "";
                    switch (d) {
                        case 0:
                            legendText = "AAA";
                            break;
                        case 1:
                            legendText = "AA";
                            break;
                        case 2:
                            legendText = "A";
                            break;
                        case 3:
                            legendText = "BBB";
                            break;
                        case 4:
                            legendText = "BB";
                            break;
                        case 5:
                            legendText = "B";
                            break;
                        case 6:
                            legendText = "CCC";
                            break;
                        case 7:
                            legendText = "CC";
                            break;
                        case 8:
                            legendText = "C";
                            break;
                        case 9:
                            legendText = "D";
                            break;
                    }
                }
                return legendText;
            }).style({
            fill: '#000',
            'font-size': '14px'
        });

    }

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function (t) {
            return arc(i(t));
        };
    }

    function arcTweenOut(a) {
        var i = d3.interpolate(this._current, {startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0});
        this._current = i(0);
        return function (t) {
            return arc(i(t));
        };
    }
}