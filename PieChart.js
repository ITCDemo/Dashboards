function DrawPie (data)
{

    d3.select('.PieRating svg').remove();

    var dataset = [];
    var ratingMap = {};
    var existingExp;

    for(var i in data)
    if (ratingMap[data[i]["Rating"]] == undefined) {
        ratingMap[data[i]["Rating"]] = parseInt(data[i]["Market Value"].replace(/,/g, ""));
    }
    else {
        existingExp = ratingMap[data[i]["Rating"]];
        ratingMap[data[i]["Rating"]] = existingExp + parseInt(data[i]["Market Value"].replace(/,/g, ""));
    }

    for(var key in SectoRatingMap["Rating"]){
        if(ratingMap[SectoRatingMap["Rating"][key]] != undefined){
            var obj = {};
            obj[SectoRatingMap["Rating"][key]] = ratingMap[SectoRatingMap["Rating"][key]];

            dataset.push(obj);
        }
    }

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
        .range(["#BEE2E6", "#94C6E7", "#4FBEE3", "#008ED6", "#036E9D", "#0055A5", "#025565", "#28C7DC", "#01304A", "#00829C"]);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d){ return d[Object.keys(d)]; });

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

            $(".pieoverlay")
                .html("<span>"+Object.keys(d.data)+"</span> "+FormatMoney(d.value))
                .show();


            d3.select(this).transition()
                .duration(300)
                .attr("d", arcOver);

            d3.select(this)
                .style("cursor","pointer");
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
        .on('click', function(d){


            ratingFilter = Object.keys(d.data);
            var filteredSet = calculateFilters();

            $("#ratingSector-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
            DisplayDendo(filteredSet, "Rating");
            BarOverlayData(filteredSet, regionFilter == -1?countryFilter: regionFilter);
            DisplayDendo(filteredSet, "Sector");
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

    legend.append('text')
        .attr({
            x: 30,
            y: 15
        })
        .text(function (d) {
            var legendText ="";
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

            return legendText;
        }).style({
        fill: '#fff',
        'font-size': '14px'
    });

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