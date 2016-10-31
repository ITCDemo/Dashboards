function DrawMap(data) {

    // copyForMap = data;
    queue()
        .defer(d3.json, "world-50m.json")
        .await(function (error, world) {

            var regionMasterMap = {};
            var countryMap = {};

            var regionMarkers = [];
            var countryMarkers = [];


            for(var i in data) {

                var instrument = data[i]["Instrument"];
                var region = data[i]["Region"];
                var exp = data[i]["VaR"];


                if (regionMasterMap[data[i]["Region"]] == undefined) {
                    regionMasterMap[region] = {
                        [instrument]: exp
                    }
                }
                else {
                    if (regionMasterMap[data[i]["Region"]][instrument] == undefined) {
                        regionMasterMap[data[i]["Region"]][instrument] = exp
                    }
                    else {
                        existingExp = regionMasterMap[data[i]["Region"]][instrument];
                        regionMasterMap[data[i]["Region"]][instrument] = existingExp + exp
                    }
                }


                if (!(data[i]["Country"] in countryMap)) {

                    if (countryMap[data[i]["Country"]] == undefined) {
                        countryMap[data[i]["Country"]] = {};
                    }
                    countryMap[data[i]["Country"]][instrument] = data[i]["VaR"]
                }
                else {
                    if (countryMap[data[i]["Country"]] == undefined) {
                        countryMap[data[i]["Country"]] = {};
                    }

                    if (countryMap[data[i]["Country"]][instrument] == undefined) {
                        countryMap[data[i]["Country"]][instrument] = data[i]["VaR"]
                    }
                    else {
                        var existingBondCountry = countryMap[data[i]["Country"]][instrument];
                        countryMap[data[i]["Country"]][instrument] = data[i]["VaR"] + existingBondCountry;
                    }
                }
            }


            regionMarkers.push({
                name: "",
                center: [0, 0],
                value: null
            });

            for (var reg in regionMasterMap) {
                var exps = 0;
                for (var obj in data) {
                    if (data[obj]["Region"] == reg)
                        exps += data[obj]["VaR"];
                }
                regionMarkers.push({
                    name: reg,
                    center: regionLatLong[reg],
                    value: exps
                })
            }


            countryMarkers.push({
                name: "",
                center: [0, 0],
                value: null
            });

            for (var obj1 in countryMap) {
                var totalExp = 0
                var region1 = "";
                for (var exp1 in data) {

                    if (data[exp1]["Country"] == obj1) {
                        totalExp += data[exp1]["VaR"];
                        region1 = data[exp1]["Region"];
                    }

                }

                countryMarkers.push({
                    name: obj1,
                    center: [LatLongMap[obj1].long, LatLongMap[obj1].lat],
                    value: totalExp,
                    abr: LatLongMap[obj1].abr,
                    region: region1
                })
            }


            var width = 700,
                height = 300;

            var projection = d3.geo.mercator()
                .translate([330, 190])
                .scale(90);

            var path = d3.geo.path()
                .projection(projection);

            var svg = d3.select(".map").append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background-color", "#000")
                .append("g");


            var radius = d3.scale.sqrt()
                .domain([10000, 100000000])
                .range([20, 30]);


            var countries = topojson.object(world, world.objects.countries).geometries;

            var country = svg.selectAll(".country").data(countries);

            country
                .enter()
                .insert("path")
                .attr("class", "country")
                .attr("d", path)
                .style("stroke", "#4FBEE3")
                .style("stroke-width", 1)
                .style("fill", "#036E9D");

            var markers = d3.select(".map svg")
                .selectAll("g")
                .append("g");


            markers.selectAll("circle")
                .data(regionMarkers, function (d) {
                    return projection(d.center)[0];
                }).enter()
                .append("circle")
                .attr('class', 'regionMarkers')
                .attr('r', function (d) {
                    if (d.name == "") {
                        return "0px";
                    }
                    if (radius(d.value) < 0) {
                        return "10px";
                    }

                    if (radius(d.value) > 40) {
                        return "40px";
                    }

                    return radius(d.value);
                })
                .attr("cx", function (d) {
                    return projection(d.center)[0];
                })
                .attr("cy", function (d) {
                    return projection(d.center)[1];
                })
                .attr("fill", "orange")
                .attr("fill-opacity", 0.3)
                .attr("stroke", "orange")
                .attr("stroke-width", 2)
                .attr("z-index", function (d) {
                    if (radius(d.value) < 11) return 99; else return -1;
                })
                .style("cursor", "pointer")
                .on('mouseover', function (d) {
                    var exposureValue = 0;

                    for (var obj in regionMarkers) {

                        if (regionMarkers[obj].name == d.name) {
                            exposureValue = regionMarkers[obj].value;
                            break;
                        }
                    }

                    $(".overlay")
                        .html("<span style='font-size: 18px'>" + d.name + "</span><p style='font-size: 14px'>Exposure - " + FormatMoney(exposureValue) + "</p>")
                        .show();
                    d3.select(this)
                        .attr("fill-opacity", 0.6);
                })
                .on('mousemove', function (d) {

                    $(".overlay")
                        .css('left', d3.mouse(this)[0])
                        .css('top', d3.mouse(this)[1]);

                })
                .on('mouseout', function (d) {
                    $(".overlay").html('').hide();
                    d3.select(this)
                        .attr("fill-opacity", 0.3);
                })
                .on("click", function (d) {
                    $(".regionClicked").text(d.name);

                    d3.selectAll(".regionMarkers")
                         .style("display", "none");

                    d3.selectAll(".countryMarkers")
                        .style("display", function(d){
                            if(d.region == $(".regionClicked").text()){
                                return "block";
                            }
                            else{
                                return "none";
                            }
                        });
                });


            markers.selectAll("circle")
                .data(countryMarkers, function (d) {
                    return projection(d.center)[0];
                }).enter()
                .append("circle")
                .attr('class', 'countryMarkers')
                .attr('r', function (d) {

                    if (d.name == "") {
                        return "0px";
                    }
                    if (radius(d.value) < 10) {
                        return "10px";
                    }

                    if (radius(d.value) > 30) {
                        return "30px";
                    }

                    return radius(d.value);
                })
                .attr("cx", function (d) {
                    return projection(d.center)[0];
                })
                .attr("cy", function (d) {
                    return projection(d.center)[1];
                })
                .attr("fill", "pink")
                .attr("fill-opacity", 0.3)
                .attr("stroke", "pink")
                .attr("stroke-width", 2)
                .style("cursor", "pointer")
                .style("display", "none")

                .on('mouseover', function (d) {
                    var exposureValue = 0;

                    for (var obj in countryMarkers) {
                        if (countryMarkers[obj].name == d.name) {
                            exposureValue = countryMarkers[obj].value;
                            break;
                        }
                    }

                    if (d.name == "United Arab Emirates") {
                        $(".overlay")
                            .html("<span style='font-size: 18px'>" + "UAE" + "</span><p style='font-size: 14px'>Exposure - " + FormatMoney(exposureValue) + "</p>")
                            .show();
                    }
                    else {
                        $(".overlay")
                            .html("<span style='font-size: 18px'>" + d.name + "</span><p style='font-size: 14px'>Exposure - " + FormatMoney(exposureValue) + "</p>")
                            .show();
                    }

                    d3.select(this)
                        .attr("fill-opacity", 0.6);
                })
                .on('mousemove', function (d) {

                    $(".overlay")
                        .css('left', d3.mouse(this)[0])
                        .css('top', d3.mouse(this)[1]);

                })
                .on('mouseout', function (d) {
                    $(".overlay").html('').hide();
                    d3.select(this)
                        .attr("fill-opacity", 0.3);
                })
                .on("click", function (d) {
                    d3.selectAll(".regionMarkers")
                        .style("display", "block");

                    d3.selectAll(".countryMarkers")
                        .style("display", "none");
                });


            markers
                .data(regionMarkers).enter()
                .append("text")
                .attr("class", "regionMarkers")
                .attr("transform", function (d) {
                    var Newradius = radius(d.value) < 0 ? "10" : (radius(d.value) > 40 ? "40" : radius(d.value));
                    return "translate(" + (projection(d.center)[0] - 40) + "," + (projection(d.center)[1] + Newradius + 15) + ")"
                })
                .text(function (d) {
                    return d.name
                })
                .attr("font-size", "12px")
                .attr("fill-opacity", 1)
                .attr("fill", "#fff");

            markers
                .data(countryMarkers).enter()
                .append("text")
                .attr("class", "countryMarkers")
                .attr("transform", function (d) {
                    var Newradius = radius(d.value) < 0 ? "10" : (radius(d.value) > 30 ? "30" : radius(d.value));
                    return "translate(" + (projection(d.center)[0] - 20) + "," + (projection(d.center)[1] + Newradius) + ")"
                })
                .text(function (d) {
                    return d.abr
                })
                .attr("font-size", "12px")
                .attr("fill-opacity", 1)
                .attr("fill", "#fff")
                .style("display", "none");

        });

}