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


function initialize() {

    var myOptions = {
        zoom: 2,
        center: new google.maps.LatLng(10, 0),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        panControl: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        zoomControl: false,
        disableDoubleClickZoom: true,
        streetViewControl: false

    };

    // initialize the map
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        myOptions);

    // these are the map styles
    var styles = [
        {
            stylers: [
                {hue: "#D1D1D1"},
                {saturation: -100}
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                {hue: "#D1D1D1"},
                {saturation: -100}
            ]
        }, {
            featureType: "road",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "administrative.land_parcel",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "administrative.locality",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "administrative.neighborhood",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "administrative.province",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "landscape.man_made",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "landscape.natural",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "poi",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "transit",
            stylers: [
                {visibility: "off"}
            ]
        }
    ];

    map.setOptions({styles: styles});

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


    queue()
        .defer(d3.csv, "https://raw.githubusercontent.com/deepthiyathiender/Dendograms/master/mega_table_Bond.csv", function (data) {
            var exp = parseInt(data["Market Value (USD)"].replace(/,/g, ""));

            switch (data["Entity Code"]) {
                case "NAMR":
                    if (NAMRMap["Bonds"] == undefined) NAMRMap["Bonds"] = 0;
                    NAMRMap["Bonds"] += exp < 0 ? exp * -1 : exp;
                    NAMRTotal += exp;
                    break;
                case "SAMR":
                    if (SAMRMap["Bonds"] == undefined) SAMRMap["Bonds"] = 0;
                    SAMRMap["Bonds"] += exp < 0 ? exp * -1 : exp;
                    SAMRTotal += exp;
                    break;
                case "EURO":
                    if (EUROMap["Bonds"] == undefined) EUROMap["Bonds"] = 0;
                    EUROMap["Bonds"] += exp < 0 ? exp * -1 : exp;
                    EUROTotal += exp;
                    break;
                case "MENA":
                    if (MENAMap["Bonds"] == undefined) MENAMap["Bonds"] = 0;
                    MENAMap["Bonds"] += exp < 0 ? exp * -1 : exp;
                    MENATotal += exp;
                    break;
                case "APAC":
                    if (APACMap["Bonds"] == undefined) APACMap["Bonds"] = 0;
                    APACMap["Bonds"] += exp < 0 ? exp * -1 : exp;
                    APACTotal += exp;
                    break;
            }

            switch (data["Rating"]) {
                case "AAA":
                    AAAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "AA":
                    AAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "A":
                    AMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BBB":
                    BBBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BB":
                    BBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "B":
                    BMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CCC":
                    CCCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CC":
                    CCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "C":
                    CMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "D":
                    DMap += exp < 0 ? exp * -1 : exp;
                    break;
            }


            switch(data["Sector_ID"]) {
                case "SEC_1":
                    Sec1Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_2":
                    Sec2Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_3":
                    Sec3Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_5":
                    Sec5Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_6":
                    Sec6Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_7":
                    Sec7Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_8":
                    Sec8Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_9":
                    Sec9Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_11":
                    Sec11Map += exp < 0 ? exp * -1 : exp;
                    break;
            }
        })
        .defer(d3.csv, "https://raw.githubusercontent.com/deepthiyathiender/Dendograms/master/mega_table_Equities.csv", function (data) {
            var exp = parseInt(data["Market Value(USD)"].replace(/,/g, ""));

            switch (data["Entity Code"]) {
                case "NAMR":
                    if (NAMRMap["Equities"] == undefined) NAMRMap["Equities"] = 0;
                    NAMRMap["Equities"] += exp < 0 ? exp * -1 : exp;
                    NAMRTotal += exp;
                    break;
                case "SAMR":
                    if (SAMRMap["Equities"] == undefined) SAMRMap["Equities"] = 0;
                    SAMRMap["Equities"] += exp < 0 ? exp * -1 : exp;
                    SAMRTotal += exp;
                    break;
                case "EURO":
                    if (EUROMap["Equities"] == undefined) EUROMap["Equities"] = 0;
                    EUROMap["Equities"] += exp < 0 ? exp * -1 : exp;
                    EUROTotal += exp;
                    break;
                case "MENA":
                    if (MENAMap["Equities"] == undefined) MENAMap["Equities"] = 0;
                    MENAMap["Equities"] += exp < 0 ? exp * -1 : exp;
                    MENATotal += exp;
                    break;
                case "APAC":
                    if (APACMap["Equities"] == undefined) APACMap["Equities"] = 0;
                    APACMap["Equities"] += exp < 0 ? exp * -1 : exp;
                    APACTotal += exp;
                    break;
            }

            switch (data["Rating"]) {
                case "AAA":
                    AAAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "AA":
                    AAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "A":
                    AMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BBB":
                    BBBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BB":
                    BBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "B":
                    BMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CCC":
                    CCCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CC":
                    CCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "C":
                    CMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "D":
                    DMap += exp < 0 ? exp * -1 : exp;
                    break;
            }

            switch(data["Sector_ID"]) {
                case "SEC_1":
                    Sec1Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_2":
                    Sec2Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_3":
                    Sec3Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_5":
                    Sec5Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_6":
                    Sec6Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_7":
                    Sec7Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_8":
                    Sec8Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_9":
                    Sec9Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_11":
                    Sec11Map += exp < 0 ? exp * -1 : exp;
                    break;
            }
        })
        .defer(d3.csv, "https://raw.githubusercontent.com/deepthiyathiender/Dendograms/master/mega_table_FxOTC.csv", function (data) {
            var exp = parseInt(data["Market Value (USD)"].replace(/,/g, ""));

            switch (data["Entity Code"]) {
                case "NAMR":
                    if (NAMRMap["FxOTC"] == undefined) NAMRMap["FxOTC"] = 0;
                    NAMRMap["FxOTC"] += exp < 0 ? exp * -1 : exp;
                    NAMRTotal += exp;
                    break;
                case "SAMR":
                    if (SAMRMap["FxOTC"] == undefined) SAMRMap["FxOTC"] = 0;
                    SAMRMap["FxOTC"] += exp < 0 ? exp * -1 : exp;
                    SAMRTotal += exp;
                    break;
                case "EURO":
                    if (EUROMap["FxOTC"] == undefined) EUROMap["FxOTC"] = 0;
                    EUROMap["FxOTC"] += exp < 0 ? exp * -1 : exp;
                    EUROTotal += exp;
                    break;
                case "MENA":
                    if (MENAMap["FxOTC"] == undefined) MENAMap["FxOTC"] = 0;
                    MENAMap["FxOTC"] += exp < 0 ? exp * -1 : exp;
                    MENATotal += exp;
                    break;
                case "APAC":
                    if (APACMap["FxOTC"] == undefined) APACMap["FxOTC"] = 0;
                    APACMap["FxOTC"] += exp < 0 ? exp * -1 : exp;
                    APACTotal += exp;
                    break;
            }

            switch (data["Rating"]) {
                case "AAA":
                    AAAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "AA":
                    AAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "A":
                    AMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BBB":
                    BBBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BB":
                    BBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "B":
                    BMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CCC":
                    CCCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CC":
                    CCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "C":
                    CMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "D":
                    DMap += exp < 0 ? exp * -1 : exp;
                    break;
            }

            switch(data["Sector_ID"]) {
                case "SEC_1":
                    Sec1Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_2":
                    Sec2Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_3":
                    Sec3Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_5":
                    Sec5Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_6":
                    Sec6Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_7":
                    Sec7Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_8":
                    Sec8Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_9":
                    Sec9Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_11":
                    Sec11Map += exp < 0 ? exp * -1 : exp;
                    break;
            }
        })
        .defer(d3.csv, "https://raw.githubusercontent.com/deepthiyathiender/Dendograms/master/mega_table_FxSwap.csv", function (data) {
            var exp = parseInt(data["Market Value(USD)"].replace(/,/g, ""));

            switch (data["Entity Code"]) {
                case "NAMR":
                    if (NAMRMap["FxSwap"] == undefined) NAMRMap["FxSwap"] = 0;
                    NAMRMap["FxSwap"] += exp < 0 ? exp * -1 : exp;
                    NAMRTotal += exp;
                    break;
                case "SAMR":
                    if (SAMRMap["FxSwap"] == undefined) SAMRMap["FxSwap"] = 0;
                    SAMRMap["FxSwap"] += exp < 0 ? exp * -1 : exp;
                    SAMRTotal += exp;
                    break;
                case "EURO":
                    if (EUROMap["FxSwap"] == undefined) EUROMap["FxSwap"] = 0;
                    EUROMap["FxSwap"] += exp < 0 ? exp * -1 : exp;
                    EUROTotal += exp;
                    break;
                case "MENA":
                    if (MENAMap["FxSwap"] == undefined) MENAMap["FxSwap"] = 0;
                    MENAMap["FxSwap"] += exp < 0 ? exp * -1 : exp;
                    MENATotal += exp;
                    break;
                case "APAC":
                    if (APACMap["FxSwap"] == undefined) APACMap["FxSwap"] = 0;
                    APACMap["FxSwap"] += exp < 0 ? exp * -1 : exp;
                    APACTotal += exp;
                    break;
            }

            switch (data["Rating"]) {
                case "AAA":
                    AAAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "AA":
                    AAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "A":
                    AMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BBB":
                    BBBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BB":
                    BBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "B":
                    BMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CCC":
                    CCCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CC":
                    CCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "C":
                    CMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "D":
                    DMap += exp < 0 ? exp * -1 : exp;
                    break;
            }

            switch(data["Sector_ID"]) {
                case "SEC_1":
                    Sec1Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_2":
                    Sec2Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_3":
                    Sec3Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_5":
                    Sec5Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_6":
                    Sec6Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_7":
                    Sec7Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_8":
                    Sec8Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_9":
                    Sec9Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_11":
                    Sec11Map += exp < 0 ? exp * -1 : exp;
                    break;
            }
        })
        .defer(d3.csv, "https://raw.githubusercontent.com/deepthiyathiender/Dendograms/master/mega_table_IRSDeal.csv", function (data) {
            var exp = parseInt(data["Market Value (USD)"].replace(/,/g, ""));

            switch (data["Entity Code"]) {
                case "NAMR":
                    if (NAMRMap["IRS"] == undefined) NAMRMap["IRS"] = 0;
                    NAMRMap["IRS"] += exp < 0 ? exp * -1 : exp;
                    NAMRTotal += exp;
                    break;
                case "SAMR":
                    if (SAMRMap["IRS"] == undefined) SAMRMap["IRS"] = 0;
                    SAMRMap["IRS"] += exp < 0 ? exp * -1 : exp;
                    SAMRTotal += exp;
                    break;
                case "EURO":
                    if (EUROMap["IRS"] == undefined) EUROMap["IRS"] = 0;
                    EUROMap["IRS"] += exp < 0 ? exp * -1 : exp;
                    EUROTotal += exp;
                    break;
                case "MENA":
                    if (MENAMap["IRS"] == undefined) MENAMap["IRS"] = 0;
                    MENAMap["IRS"] += exp < 0 ? exp * -1 : exp;
                    MENATotal += exp;
                    break;
                case "APAC":
                    if (APACMap["IRS"] == undefined) APACMap["IRS"] = 0;
                    APACMap["IRS"] += exp < 0 ? exp * -1 : exp;
                    APACTotal += exp;
                    break;
            }

            switch (data["Rating"]) {
                case "AAA":
                    AAAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "AA":
                    AAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "A":
                    AMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BBB":
                    BBBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BB":
                    BBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "B":
                    BMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CCC":
                    CCCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CC":
                    CCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "C":
                    CMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "D":
                    DMap += exp < 0 ? exp * -1 : exp;
                    break;
            }

            switch(data["Sector_ID"]) {
                case "SEC_1":
                    Sec1Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_2":
                    Sec2Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_3":
                    Sec3Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_5":
                    Sec5Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_6":
                    Sec6Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_7":
                    Sec7Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_8":
                    Sec8Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_9":
                    Sec9Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_11":
                    Sec11Map += exp < 0 ? exp * -1 : exp;
                    break;
            }
        })
        .defer(d3.csv, "https://raw.githubusercontent.com/deepthiyathiender/Dendograms/master/mega_table_L&DDeal.csv", function (data) {
            var exp = parseInt(data["Market Value (USD)"].replace(/,/g, ""));

            switch (data["Entity Code"]) {
                case "NAMR":
                    if (NAMRMap["LD"] == undefined) NAMRMap["LD"] = 0;
                    NAMRMap["LD"] += exp < 0 ? exp * -1 : exp;
                    NAMRTotal += exp;
                    break;
                case "SAMR":
                    if (SAMRMap["LD"] == undefined) SAMRMap["LD"] = 0;
                    SAMRMap["LD"] += exp < 0 ? exp * -1 : exp;
                    SAMRTotal += exp;
                    break;
                case "EURO":
                    if (EUROMap["LD"] == undefined) EUROMap["LD"] = 0;
                    EUROMap["LD"] += exp < 0 ? exp * -1 : exp;
                    EUROTotal += exp;
                    break;
                case "MENA":
                    if (MENAMap["LD"] == undefined) MENAMap["LD"] = 0;
                    MENAMap["LD"] += exp < 0 ? exp * -1 : exp;
                    MENATotal += exp;
                    break;
                case "APAC":
                    if (APACMap["LD"] == undefined) APACMap["LD"] = 0;
                    APACMap["LD"] += exp < 0 ? exp * -1 : exp;
                    APACTotal += exp;
                    break;
            }

            switch (data["Rating"]) {
                case "AAA":
                    AAAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "AA":
                    AAMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "A":
                    AMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BBB":
                    BBBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "BB":
                    BBMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "B":
                    BMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CCC":
                    CCCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "CC":
                    CCMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "C":
                    CMap += exp < 0 ? exp * -1 : exp;
                    break;
                case "D":
                    DMap += exp < 0 ? exp * -1 : exp;
                    break;
            }

            switch(data["Sector_ID"]) {
                case "SEC_1":
                    Sec1Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_2":
                    Sec2Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_3":
                    Sec3Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_5":
                    Sec5Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_6":
                    Sec6Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_7":
                    Sec7Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_8":
                    Sec8Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_9":
                    Sec9Map += exp < 0 ? exp * -1 : exp;
                    break;
                case "SEC_11":
                    Sec11Map += exp < 0 ? exp * -1 : exp;
                    break;
            }
        })
        .await(function () {

            var citymap = {
                NAMR: {
                    center: {
                        lat: 41.17, lng: -100.89
                    },
                    value: NAMRTotal<0?NAMRTotal*-1:NAMRTotal
                },
                SAMR: {
                    center: {
                        lat: -12.65, lng: -60.82
                    },
                    value: SAMRTotal<0?SAMRTotal*-1:SAMRTotal
                },
                EURO: {
                    center: {
                        lat: 48.15, lng: 8.43
                    },
                    value: EUROTotal<0?EUROTotal*-1:EUROTotal
                },
                APAC: {
                    center: {
                        lat: 38.74, lng: 86.13
                    },
                    value: APACTotal<0?APACTotal*-1:APACTotal
                },
                MENA: {
                    center: {
                        lat: 34.22, lng: 42.18
                    },
                    value: MENATotal<0?MENATotal*-1:MENATotal
                }
            };

            for (var city in citymap) {
                // Add the circle for this city to the map.
                var centro = new google.maps.LatLng(citymap[city].center.lat, citymap[city].center.lng);

                var myCity = new google.maps.Circle({
                    center: centro,
                    radius: citymap[city].value / 1000 < 1000000 ? 900000 : citymap[city].value / 1000,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#FF0000',
                    fillOpacity: 0.2,
                    cityName: city
                });


                myCity.addListener('mouseover', function (e) {
                    this.setOptions({fillOpacity: 0.5});
                });

                google.maps.event.addDomListener(myCity, 'mousemove', function(e) {
                    var pageX = e.Ra.pageX;
                    var pageY = e.Ra.pageY;

                    $(".overlay").html("<strong style='font-size: 18px'>"+this.cityName+"</strong><p>Utilization - $"+citymap[this.cityName].value+"</p>");
                    $(".overlay").show();
                    $(".overlay").css({"top":pageY, "left": pageX, "position":"absolute"});
                });

                google.maps.event.addListener(myCity, 'mouseout', function () {
                    this.setOptions({fillOpacity: 0.2});
                    $(".overlay").hide();
                });
                google.maps.event.addListener(myCity, 'click', function () {
                    $("#bar-overlay").css({"opacity": 1, "z-index": "999", "height": "300px"});
                    var data = [];
                    var exp;
                    switch(this.cityName){
                        case "NAMR":
                            for(var item in NAMRMap){
                                exp = { name : item, value: NAMRMap[item] };
                                data.push(exp);
                            }
                            break;
                        case "SAMR":
                            for(var item in SAMRMap){
                                exp = { name : item, value: SAMRMap[item] };
                                data.push(exp);
                            }
                            break;
                        case "APAC":
                            for(var item in APACMap){
                                exp = { name : item, value: APACMap[item] };
                                data.push(exp);
                            }
                            break;
                        case "MENA":
                            for(var item in MENAMap){
                                exp = { name : item, value: MENAMap[item] };
                                data.push(exp);
                            }
                            break;
                        case "EURO":
                            for(var item in EUROMap){
                                exp = { name : item, value: EUROMap[item] };
                                data.push(exp);
                            }
                            break;
                    }
                    drawBar(data);
                });

                myCity.setMap(map);
            }
        })

}