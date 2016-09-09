function createDataset(){


}



function DrawPie ()
{

    var newwdataset = createDataset();

    var dataset = {
        apples: [53245, 28479, 19697, 24037, 40245],
        oranges: [200, 200, 200, 200]
    };

    var width = 470,
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

    var color = d3.scale.category20();

    var pie = d3.layout.pie()
        .sort(null);

    var outerRadius = width / 3.5;
    var innerRadius = 70;

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var svg = d3.select(".PieRating").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// set the start and end angles to 0 so we can transition
// clockwise to the actual values later
    var path = svg.selectAll("path")
        .data(pie(dataset.apples))
        .enter().append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc(enterClockwise))
        .each(function (d) {
            this._current = {
                data: d.data,
                value: d.value,
                startAngle: enterClockwise.startAngle,
                endAngle: enterClockwise.endAngle
            }
        }); // store the initial values

    path.transition()  // update
        .duration(750)
        .attrTween("d", arcTween);

    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function () {
        d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
        clearTimeout(timeout);
        path = path.data(pie(dataset[this.value])); // update the data
        // set the start and end angles to Math.PI * 2 so we can transition
        // anticlockwise to the actual values later
        path.enter().append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc(enterAntiClockwise))
            .each(function (d) {
                this._current = {
                    data: d.data,
                    value: d.value,
                    startAngle: enterAntiClockwise.startAngle,
                    endAngle: enterAntiClockwise.endAngle
                };
            }); // store the initial values

        path.exit()
            .transition()
            .duration(750)
            .attrTween('d', arcTweenOut)
            .remove(); // now remove the exiting arcs

        path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
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