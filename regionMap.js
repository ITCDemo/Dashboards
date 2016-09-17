var AAAMap = 0;
var AAMap = 0;
var AMap = 0;
var BBBMap = 0;
var BBMap = 0;
var BMap = 0;
var CMap = 0;
var CCMap = 0;
var CCCMap = 0;
var DMap = 0;

var Sec1Map = 0;
var Sec2Map = 0;
var Sec3Map = 0;
var Sec5Map = 0;
var Sec6Map = 0;
var Sec7Map = 0;
var Sec8Map = 0;
var Sec9Map = 0;
var Sec11Map = 0;

var regionMap = [];
var countryMapMarkers = [];

var counterpartyExp = {};

var BondMap = {};
var EquititesMap = {};
var FxOTCMap = {};
var FxSwapMap = {};
var IRSDealMap = {};
var LDDealMap = {};

var countryMap = {};

var masterCounterparty = [];


var NAMRMap = {};
var SAMRMap = {};
var EUROMap = {};
var MENAMap = {};
var APACMap = {};



var NAMRTotal = 0;
var SAMRTotal = 0;
var EUROTotal = 0;
var MENATotal = 0;
var APACTotal = 0;


var SectoRatingMap = {
    Sector: {
        0: "SEC_1",
        1: "SEC_2",
        2: "SEC_3",
        3: "SEC_5",
        4: "SEC_6",
        5: "SEC_7",
        6: "SEC_8",
        7: "SEC_9",
        8: "SEC_11"
    },
    Rating: {
        0: "AAA",
        1: "AA",
        2: "A",
        3: "BBB",
        4: "BB",
        5: "B",
        6: "CCC",
        7: "CC",
        8: "C",
        9: "D"
    },
    SectorID: {
        "SEC_1": "Energy",
        "SEC_2": "Materials",
        "SEC_3": "Industrials",
        "SEC_5": "Consumer Staples",
        "SEC_6": "Health Care",
        "SEC_7": "Financials",
        "SEC_8": "Information Tech",
        "SEC_9": "Telecom Services",
        "SEC_11": "SOVEREIGN"
    }
};


function initialize() {

    debugger;

            var ArgentinaExp = 0;
            for(var obj in countryMap["Argentina"])
            {
                ArgentinaExp += countryMap["Argentina"][obj];
            }

            var BrazilExp = 0;
            for(obj in countryMap["Brazil"])
            {
                BrazilExp += countryMap["Brazil"][obj];
            }

            var CanadaExp = 0;
            for(obj in countryMap["Canada"])
            {
                CanadaExp += countryMap["Canada"][obj];
            }

            var FranceExp = 0;
            for(obj in countryMap["France"])
            {
                FranceExp += countryMap["France"][obj];
            }

            var GermanyExp = 0;
            for(obj in countryMap["Germany"])
            {
                GermanyExp += countryMap["Germany"][obj];
            }

            var IndiaExp = 0;
            for(obj in countryMap["India"])
            {
                IndiaExp += countryMap["India"][obj];
            }

            var JapanExp = 0;
            for(obj in countryMap["Japan"])
            {
                JapanExp += countryMap["Japan"][obj];
            }

            var UAEExp = 0;
            for(obj in countryMap["United Arab Emirates"])
            {
                UAEExp += countryMap["United Arab Emirates"][obj];
            }

            var UKExp = 0;
            for(obj in countryMap["United Kingdom"])
            {
                UKExp += countryMap["United Kingdom"][obj];
            }

            var USExp = 0;
            for(obj in countryMap["United States"])
            {
                USExp += countryMap["United States"][obj];
            }
            DrawPie();

            queue()
                .defer(d3.json, "world-50m.json")
                .await(function (error, world) {
                    debugger;
                    regionMap = [
                        {
                            name: "",
                            center: [0,0],
                            value: 0
                        },
                        {
                            name: "NAMR",
                            center: [-100.89, 41.17],
                            value: NAMRTotal < 0 ? NAMRTotal * -1 : NAMRTotal
                        },

                        {
                            name: "SAMR",
                            center: [-60.82, -12.65],
                            value: SAMRTotal < 0 ? SAMRTotal * -1 : SAMRTotal
                        },
                        {
                            name: "EURO",
                            center: [8.43, 48.15],
                            value: EUROTotal < 0 ? EUROTotal * -1 : EUROTotal
                        },
                        {
                            name: "APAC",
                            center: [86.13, 38.74],
                            value: APACTotal < 0 ? APACTotal * -1 : APACTotal
                        },
                        {
                            name: "MENA",
                            center: [42.18, 34.22],
                            value: MENATotal < 0 ? MENATotal * -1 : MENATotal
                        }
                    ];



                    countryMapMarkers = [
                        {
                            name: "",
                            center: [0,0],
                            value: 0
                        },
                        {
                            name: "Argentina",
                            center: [-63.61, -38.42],
                            value: ArgentinaExp,
                            abr: "ARG"
                        },
                        {
                            name: "Brazil",
                            center: [-51.92, -14.24],
                            value: BrazilExp,
                            abr: "BRZ"
                        },
                        {
                            name: "Canada",
                            center: [-106.34, 56.14],
                            value: CanadaExp,
                            abr: "CAN"
                        },
                        {
                            name: "France",
                            center: [2.21, 46.23],
                            value: FranceExp,
                            abr: "FRA"
                        },
                        {
                            name: "Germany",
                            center: [10.45, 51.17],
                            value: GermanyExp,
                            abr: "GER"
                        },
                        {
                            name: "India",
                            center: [78.96, 20.60],
                            value: IndiaExp,
                            abr: "IND"
                        },
                        {
                            name: "Japan",
                            center: [138.25, 36.21],
                            value: JapanExp,
                            abr: "JPN"
                        },
                        {
                            name: "Emirates",
                            center: [53.84, 23.43],
                            value: UAEExp,
                            abr: "UAE"
                        },
                        {
                            name: "United Kingdom",
                            center: [-3.43, 55.38],
                            value: UKExp,
                            abr: "UK"
                        },
                        {
                            name: "United States",
                            center: [-95.71, 37.10],
                            value: USExp,
                            abr: "USA"
                        }
                    ];



                    var width = 600,
                        height = 300;

                    var projection = d3.geo.mercator()
                        .translate([270, 190])
                        .scale(100);

                    var path = d3.geo.path()
                        .projection(projection);

                    var svg = d3.select("#map-canvas").append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("background-color", "#ffffff")
                        .append("g");


                    var radius = d3.scale.sqrt()
                        .domain([min, max])
                        .range([10, 30]);
                    
                    
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
                        .data(regionMap, function(d) { return projection(d.center)[1]; }).enter()
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
                            $("#bar-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
                                var data = [];
                                var exp;
                                switch (d.name) {
                                    case "NAMR":
                                        for (var item in NAMRMap) {
                                            exp = {name: item, value: NAMRMap[item]};
                                            data.push(exp);
                                        }
                                        break;
                                    case "SAMR":
                                        for (var item in SAMRMap) {
                                            exp = {name: item, value: SAMRMap[item]};
                                            data.push(exp);
                                        }
                                        break;
                                    case "APAC":
                                        for (var item in APACMap) {
                                            exp = {name: item, value: APACMap[item]};
                                            data.push(exp);
                                        }
                                        break;
                                    case "MENA":
                                        for (var item in MENAMap) {
                                            exp = {name: item, value: MENAMap[item]};
                                            data.push(exp);
                                        }
                                        break;
                                    case "EURO":
                                        for (var item in EUROMap) {
                                            exp = {name: item, value: EUROMap[item]};
                                            data.push(exp);
                                        }
                                        break;
                                }
                                drawBarRegion(data);
                        });


                    markers.selectAll("circle")
                        .data(countryMapMarkers, function(d) { return projection(d.center)[1]; }).enter()
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
                            $("#bar-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
                            var data = [];
                            var exp;
                            switch (d.abr) {
                                case "USA":
                                    for (var item in countryMap["United States"]) {
                                        exp = {name: item, value: countryMap["United States"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "ARG":
                                    for (var item in countryMap["Argentina"]) {
                                        exp = {name: item, value: countryMap["Argentina"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "BRZ":
                                    for (var item in countryMap["Brazil"]) {
                                        exp = {name: item, value: countryMap["Brazil"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "CAN":
                                    for (var item in countryMap["Canada"]) {
                                        exp = {name: item, value: countryMap["Canada"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "FRA":
                                    for (var item in countryMap["France"]) {
                                        exp = {name: item, value: countryMap["France"][item]};
                                        data.push(exp);
                                    }
                                    break;

                                case "GER":
                                    for (var item in countryMap["Germany"]) {
                                        exp = {name: item, value: countryMap["Germany"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "IND":
                                    for (var item in countryMap["India"]) {
                                        exp = {name: item, value: countryMap["India"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "JPN":
                                    for (var item in countryMap["Japan"]) {
                                        exp = {name: item, value: countryMap["Japan"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "UAE":
                                    for (var item in countryMap["United Arab Emirates"]) {
                                        exp = {name: item, value: countryMap["United Arab Emirates"][item]};
                                        data.push(exp);
                                    }
                                    break;
                                case "UK":
                                    for (var item in countryMap["United Kingdom"]) {
                                        exp = {name: item, value: countryMap["United Kingdom"][item]};
                                        data.push(exp);
                                    }
                                    break;
                            }
                            drawBarRegion(data);
                        })

                    markers
                        .data(regionMap).enter()
                        .append("text")
                        .attr("class", "regionMarkers")
                        .attr("transform", function(d){ var Newradius = radius(d.value) <0?"10":radius(d.value); return "translate("+(projection(d.center)[0]-40)+","+(projection(d.center)[1]+Newradius+15)+")"})
                        .text(function(d){return d.name})
                        .attr("font-size","12px")
                        .attr("fill-opacity",1)
                        .attr("fill", "black");

                    markers
                        .data(countryMapMarkers).enter()
                        .append("text")
                        .attr("class", "countryMarkers")
                        .attr("transform", function(d){ var Newradius = radius(d.value) <0?"10":radius(d.value); return "translate("+(projection(d.center)[0]-40)+","+(projection(d.center)[1]+Newradius+15)+")"})
                        .text(function(d){return d.abr})
                        .attr("font-size","12px")
                        .attr("fill-opacity",1)
                        .attr("fill", "black");

                    d3.selectAll(".countryMarkers")
                        .attr("fill-opacity", 0)
                        .attr("stroke-width", 0)
                        .style("display", "none");

                })


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
                        .attr("fill", "black");
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
                        .attr("fill", "black");

                }
            });

}