function DrawMap(data){

    d3.select('#pie svg').remove();

    copyForMap = data;
            queue()
                .defer(d3.json, "world-50m.json")
                .await(function (error, world) {


                    regionMap.push({
                        name: "",
                        center: [0,0],
                        value: null
                    });

                    for(var reg in regionMasterMap){
                        var exp = 0;
                        for(var obj in copyForMap){
                            if(copyForMap[obj]["Region"] == reg)
                            exp+=parseInt(copyForMap[obj]["Market Value"].replace(/,/g, ""));
                        }
                        regionMap.push({
                            name: reg,
                            center: regionLatLong[reg],
                            value: exp
                        })
                    }


                    countryMapMarkers.push({
                        name: "",
                        center: [0,0],
                        value: null
                    });

                    for(var obj1 in countryMap){
                        var totalExp = 0;
                        for (var exp1 in copyForMap) {
                            if(copyForMap[exp1]["Country"] == obj1) {
                                totalExp += parseInt(copyForMap[exp1]["Market Value"].replace(/,/g, ""));
                            }
                        }

                        countryMapMarkers.push({
                            name: obj1,
                            center: [LatLongMap[obj1].long, LatLongMap[obj1].lat],
                            value: totalExp,
                            abr: LatLongMap[obj1].abr
                        })
                    }



                    var width = 600,
                        height = 300;

                    var projection = d3.geo.mercator()
                        .translate([255, 190])
                        .scale(85);

                    var path = d3.geo.path()
                        .projection(projection);

                    var svg = d3.select("#map-canvas").append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("background-color", "#000")
                        .append("g");


                    var radius = d3.scale.sqrt()
                        .domain([10000, 100000000])
                        .range([10, 17]);
                    
                    
                    var countries = topojson.object(world, world.objects.countries).geometries;

                    var country = svg.selectAll(".country").data(countries);

                    country
                        .enter()
                        .insert("path")
                        .attr("class", "country")
                        .attr("d", path)
                        .style("stroke", "black")
                        .style("stroke-width", 0.2);

                    var markers = d3.select("#map-canvas svg")
                        .selectAll("g")
                        .append("g");


                    markers.selectAll("circle")
                        .data(regionMap, function(d){ return projection(d.center)[0]; }).enter()
                        .append("circle")
                        .attr('class', 'regionMarkers')
                        .attr('r', function (d) {
                            if(d.name == ""){
                                return "0px";
                            }
                            if(radius(d.value) <0) {
                                return "10px";
                            }

                            return radius(d.value);
                        })
                        .attr("cx", function (d) {
                            return projection(d.center)[0];
                        })
                        .attr("cy", function (d) {
                            return projection(d.center)[1];
                        })
                        .attr("fill","#26A1AD")
                        .attr("fill-opacity", 0.3)
                        .attr("stroke", "#26A1AD")
                        .attr("stroke-width", 2)
                        .attr("z-index", function(d){ if(radius(d.value) <11) return 99; else return -1;})
                        .style("cursor", "pointer")
                        .on('mouseover', function(d){
                            var exposureValue = 0;

                            for(var obj in regionMap){

                                if(regionMap[obj].name == d.name){
                                    exposureValue = regionMap[obj].value;
                                    break;
                                }
                            }

                            $(".overlay")
                                .html("<span style='font-size: 18px'>" + d.name + "</span><p style='font-size: 14px'>Exposure - " + FormatMoney(exposureValue) + "</p>")
                                .show();
                            d3.select(this)
                                .attr("fill-opacity", 0.6);
                        })
                        .on('mousemove', function(d) {

                            $(".overlay")
                                .css('left', d3.mouse(this)[0])
                                .css('top', d3.mouse(this)[1]);

                        })
                        .on('mouseout', function(d) {
                            $(".overlay").html('').hide();
                            d3.select(this)
                                .attr("fill-opacity", 0.3);
                        })
                        .on("click", function(d) {
                            $('#bar-overlay svg').remove();
                            regionFilter = d.name;
                            var filteredSet = calculateFilters();
                            $("#bar-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
                            BarOverlayData(filteredSet, d.name);
                            DisplayDendo(filteredSet, "Rating");
                            DisplayDendo(filteredSet, "Sector");
                        });


                    markers.selectAll("circle")
                        .data(countryMapMarkers, function(d){ return projection(d.center)[0]; }).enter()
                        .append("circle")
                        .attr('class', 'countryMarkers')
                        .attr('r', function (d) {

                            if(d.name == ""){
                                return "0px";
                            }
                            if(radius(d.value) <10) {
                                return "10px";
                            }

                            return radius(d.value);
                        })
                        .attr("cx", function (d) {
                            return projection(d.center)[0];
                        })
                        .attr("cy", function (d) {
                            return projection(d.center)[1];
                        })
                        .attr("fill","#26A1AD")
                        .attr("fill-opacity", 0.3)
                        .attr("stroke", "#26A1AD")
                        .attr("stroke-width", 2)
                        .style("cursor", "pointer")

                        .on('mouseover', function(d){
                            var exposureValue = 0;

                            for(var obj in countryMapMarkers){
                                if(countryMapMarkers[obj].name == d.name){
                                    exposureValue = countryMapMarkers[obj].value;
                                    break;
                                }
                            }

                            if(d.name == "United Arab Emirates"){
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
                        .on('mousemove', function(d) {

                            $(".overlay")
                                .css('left', d3.mouse(this)[0])
                                .css('top', d3.mouse(this)[1]);

                        })
                        .on('mouseout', function(d) {
                            $(".overlay").html('').hide();
                            d3.select(this)
                                .attr("fill-opacity", 0.3);
                        })
                        .on("click", function(d) {
                            $('#bar-overlay svg').remove();
                            countryFilter = d.name;

                            var filteredSet = calculateFilters();
                            $("#bar-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
                            BarOverlayData(filteredSet, d.name);
                            DisplayDendo(filteredSet, "Rating");
                            DisplayDendo(filteredSet, "Sector");
                        });


                    markers
                        .data(regionMap).enter()
                        .append("text")
                        .attr("class", "regionMarkers")
                        .attr("transform", function(d){ var Newradius = radius(d.value) <0?"10":radius(d.value); return "translate("+(projection(d.center)[0]-40)+","+(projection(d.center)[1]+Newradius+15)+")"})
                        .text(function(d){return d.name})
                        .attr("font-size","12px")
                        .attr("fill-opacity",1)
                        .attr("fill", "#fff");

                    markers
                        .data(countryMapMarkers).enter()
                        .append("text")
                        .attr("class", "countryMarkers")
                        .attr("transform", function(d){ var Newradius = radius(d.value) <0?"10":radius(d.value); return "translate("+(projection(d.center)[0]-20)+","+(projection(d.center)[1]+Newradius)+")"})
                        .text(function(d){return d.abr})
                        .attr("font-size","12px")
                        .attr("fill-opacity",1)
                        .attr("fill", "#fff");

                    d3.selectAll(".countryMarkers")
                        .attr("fill-opacity", 0)
                        .attr("stroke-width", 0)
                        .style("display", "none");

                });


            $('input[type=radio][name=region]').change(function() {
                if (this.value == 'Region') {
                    d3.selectAll(".countryMarkers")
                        .attr("fill-opacity", 0)
                        .attr("stroke-width", 0)
                        .style("display", "none");

                    d3.selectAll(".regionMarkers")
                        .attr("fill-opacity", 0.3)
                        .attr("stroke-width", 2)
                        .style("display", "inline");

                    d3.selectAll("text.regionMarkers")
                        .attr("font-size","12px")
                        .attr("fill-opacity",1)
                        .attr("fill", "#fff");
                }
                else{
                    d3.selectAll(".regionMarkers")
                        .attr("fill-opacity", 0)
                        .attr("stroke-width", 0)
                        .style("display", "none");

                    d3.selectAll(".countryMarkers")
                        .attr("fill-opacity", 0.3)
                        .attr("stroke-width", 2)
                        .style("display", "inline");

                    d3.selectAll("text.countryMarkers")
                        .attr("font-size","12px")
                        .attr("fill-opacity",1)
                        .attr("fill", "#fff");

                }
            });

}