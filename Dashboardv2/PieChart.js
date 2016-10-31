function DrawPie (data)
{
    var dataset = [];
    var sectorMap = {};
    var existingExp;

    for(var i in data)
    if (sectorMap[data[i]["Sector"]] == undefined) {
        sectorMap[data[i]["Sector"]] = data[i]["VaR"];
    }
    else {
        existingExp = sectorMap[data[i]["Sector"]];
        sectorMap[data[i]["Sector"]] = existingExp + data[i]["VaR"];
    }

    for(var key in SectoRatingMap["Sector"]){
        if(sectorMap[SectoRatingMap["Sector"][key]] != undefined){
            var obj = {};
            obj[SectoRatingMap["Sector"][key]] = sectorMap[SectoRatingMap["Sector"][key]];

            dataset.push(obj);
        }
    }


    var width = 460,
        height = 250,
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
        .domain([0,1,2,3,4,5,6])
        .range(["#BEE2E6", "#94C6E7", "#4FBEE3", "#008ED6", "#036E9D", "#0055A5", "#025565", "#28C7DC"]);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d){ return d[Object.keys(d)]; });

    var outerRadius = width / 5;
    var innerRadius = 50;

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var arcOver = d3.svg.arc()
        .innerRadius(innerRadius+20)
        .outerRadius(outerRadius+20);

    var svg = d3.select(".sector").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 3.8 + "," + height / 2 + ")");

    var path = svg.selectAll("path")
        .data(pie(dataset))
        .enter()
        .append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("stroke", "#000")
        .attr("stroke-width", 2)
        .attr("d", arc(enterClockwise))
        .on('mouseover', function(d) {

            $(".pietip")
                .html("<span>"+SectoRatingMap['SectorName'][Object.keys(d.data)]+"</span> "+FormatMoney(d.value))
                .show();


            d3.select(this).transition()
                .duration(300)
                .attr("d", arcOver);

            d3.select(this)
                .style("cursor","pointer");
        })
        .on('mousemove', function(d) {
            $(".pietip")
                .css('left', d3.mouse(this)[0]+400)
                .css('top', d3.mouse(this)[1]+630)
        })
        .on('mouseout', function(d) {
            $(".pietip").html('').hide();

            d3.select(this).transition()
                .duration(300)
                .attr("d", arc);
        })
        .on('click', function(d){

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


    var legendRectSize = 15;
    var legendSpacing = 5;
    var legendHeight = legendRectSize + legendSpacing;


    var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr({
            class: 'legend',
            transform: function (d, i) {
                //Just a calculation for x & y position
                if(i>3) {
                    return 'translate(130,' + ((i%4 * legendHeight) - 70) + ')';
                }

                return 'translate(240,' + ((i * legendHeight) - 70) + ')';
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
            x: 30,
            y: 15
        })
        .text(function (d) {
            var legendText ="";
            switch (d) {
                case 0:
                    legendText = "Energy";
                    break;
                case 1:
                    legendText = "Industrials";
                    break;
                case 2:
                    legendText = "Consumer";
                    break;
                case 3:
                    legendText = "Health";
                    break;
                case 4:
                    legendText = "Financials";
                    break;
                case 5:
                    legendText = "IT";
                    break;
                case 6:
                    legendText = "Telecom";
                    break;
                case 7:
                    legendText = "Sovereign";
                    break;
            }

            return legendText;
        }).style({
        fill: '#fff',
        'font-size': '14px'
    });

    svg.append("text")
        .data(data)
        .attr("x", "100px")
        .attr("y", "-105px")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#fff")
        .text("Top Sectors");

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
}