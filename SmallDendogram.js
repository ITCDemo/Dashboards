function DisplayDendo(data, type) {

    if(type == "Rating") var rating = data[0]["Rating"];
    if(type == "Sector") var sector = data[0]["Sector_ID"];

    var creditMap = {};
    var ratingMap = {};
    var secMap = {};
    var cptyMapRating = {};
    var cptyMapSec = {};
    var treeData = [];

    var cptys = [];
    var exps = [];
    var newExp = "";

    if (type == "Rating") {
        for (cpty in data) {
            if (cptyMapRating[data[cpty]["Counterparty"]] == undefined) {
                cptyMapRating[data[cpty]["Counterparty"]] = {};
                cptyMapRating[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] = {
                    Allocation: parseInt(data[cpty]["Allocation"].replace(/,/g, "")),
                    Value: parseInt(data[cpty]["Market Value"].replace(/,/g, ""))
                }
            }
            else{
                if(cptyMapRating[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] == undefined){
                    cptyMapRating[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] = {
                        Allocation: parseInt(data[cpty]["Allocation"].replace(/,/g, "")),
                        Value: parseInt(data[cpty]["Market Value"].replace(/,/g, ""))
                    }
                }
                else{
                    var existingVal = cptyMapRating[data[cpty]["Counterparty"]][data[cpty]["Instrument"]]["Value"];
                    cptyMapRating[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] = {
                        Allocation: parseInt(data[cpty]["Allocation"].replace(/,/g, "")),
                        Value: parseInt(data[cpty]["Market Value"].replace(/,/g, "")) + existingVal
                    }
                }
            }
        }

        for (cpty in cptyMapRating) {
            exps = [];

            for (exp in cptyMapRating[cpty]) {
                exps.push({
                    "name": exp,
                    "parent": cpty,
                    "alloc": cptyMapRating[cpty][exp]["Allocation"],
                    "value": cptyMapRating[cpty][exp]["Value"]
                })
            }
            cptys.push({
                "name": cpty,
                "parent": rating,
                "children": exps
            })
        }

        treeData = [
            {
                "name": rating,
                "parent": "null",
                "children": cptys
            }
        ];
    }
    else if (type == "Sector") {
        for (cpty in data) {
            if (cptyMapSec[data[cpty]["Counterparty"]] == undefined) {
                cptyMapSec[data[cpty]["Counterparty"]] = {};
                cptyMapSec[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] = {
                    Allocation: parseInt(data[cpty]["Allocation"].replace(/,/g, "")),
                    Value: parseInt(data[cpty]["Market Value"].replace(/,/g, ""))
                }
            }
            else{
                if(cptyMapSec[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] == undefined){
                    cptyMapSec[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] = {
                        Allocation: parseInt(data[cpty]["Allocation"].replace(/,/g, "")),
                        Value: parseInt(data[cpty]["Market Value"].replace(/,/g, ""))
                    }
                }
                else{
                    var existingVal = cptyMapSec[data[cpty]["Counterparty"]][data[cpty]["Instrument"]]["Value"];
                    cptyMapSec[data[cpty]["Counterparty"]][data[cpty]["Instrument"]] = {
                        Allocation: parseInt(data[cpty]["Allocation"].replace(/,/g, "")),
                        Value: parseInt(data[cpty]["Market Value"].replace(/,/g, "")) + existingVal
                    }
                }
            }
        }

        for (cpty in cptyMapSec) {
            exps = [];

            for (exp in cptyMapSec[cpty]) {
                exps.push({
                    "name": exp,
                    "parent": cpty,
                    "alloc": cptyMapSec[cpty][exp]["Allocation"],
                    "value": cptyMapSec[cpty][exp]["Value"]
                })
            }
            cptys.push({
                "name": cpty,
                "parent": SectoRatingMap["SectorName"][sector],
                "children": exps
            })
        }

        treeData = [
            {
                "name": SectoRatingMap["SectorName"][sector],
                "parent": "null",
                "children": cptys
            }
        ];
    }


    // -------------------- DRAW TREE ----------------------


    var margin = {top: 130, right: 20, bottom: 20, left: 90},
        width = 500 - margin.right - margin.left,
        height = 200 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width])
        .nodeSize([20, 0]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.y, d.x];
        });

    var svg;

    if (type == "Rating") {

        svg = d3.select("#tree").append("svg")
            .attr("width", width)
            .attr("height", 300)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    else {
        svg = d3.select("#Sectree").append("svg")
            .attr("width", "350px")
            .attr("height", 300)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }


    treeData = [
        treeData[0]
    ];

    root = treeData[0];
    root.x0 = height / 0.4;
    root.y0 = 0;

    update(root);
    collapseAll();

    d3.select(self.frameElement).style("height", "300px");

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 100;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("dy", ".25em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.name;
            })
            .style("fill-opacity", 1e-5);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 8)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 8);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function click(d) {

        if (type == "Rating") {

            if (d.depth == 2) {
                d3.select("#barpieUtil svg").remove();

                var value = d.value;
                var alloc = d.alloc;

                var dataset;

                if ((value / alloc * 100).toFixed(2) > 100) {
                    dataset = [{name: "Utilized", percent: (value / alloc * 100).toFixed(2)}];

                }
                else if ((value / alloc * 100).toFixed(2) < 0) {
                    dataset = [{name: "Utilized", percent: (value / alloc * 100).toFixed(2) * -1}, {
                        name: "Not Utilized",
                        percent: (100 - value / alloc * 100 * -1).toFixed(2)
                    }];
                }
                else {
                    dataset = [{name: "Utilized", percent: (value / alloc * 100).toFixed(2)}, {
                        name: "Not Utilized",
                        percent: (100 - value / alloc * 100).toFixed(2)
                    }];
                }

                if (value < 0) value *= -1;

                drawPie(dataset, "Rating");
            }
            else if (d.depth == 1) {
                var Counterparty = d.name;

                var totalExpValue = [];


                children = d._children == null?d.children:d._children;
                for (var exp in children) {
                    totalExpValue.push({
                        name: children[exp].name,
                        value: children[exp].value
                    });
                }
                d3.select("#barpieUtil svg").remove();
                drawBar(totalExpValue, "Rating")
            }
            else {
                d3.select("#barpieUtil svg").remove();
            }

            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }

            d.highlight = true;
            update(d);
        }
        else {
            if (d.depth == 2) {
                d3.select("#SecbarpieUtil svg").remove();

                value = d.value;
                alloc = d.alloc;

                if ((value / alloc * 100).toFixed(2) > 100) {
                    dataset = [{name: "Utilized", percent: (value / alloc * 100).toFixed(2)}];

                }
                else if ((value / alloc * 100).toFixed(2) < 0) {
                    dataset = [{name: "Utilized", percent: (value / alloc * 100).toFixed(2) * -1}, {
                        name: "Not Utilized",
                        percent: (100 - value / alloc * 100 * -1).toFixed(2)
                    }];
                }
                else {
                    dataset = [{name: "Utilized", percent: (value / alloc * 100).toFixed(2)}, {
                        name: "Not Utilized",
                        percent: (100 - value / alloc * 100).toFixed(2)
                    }];
                }

                if (value < 0) value *= -1;

                drawPie(dataset, "Sector");
            }
            else if (d.depth == 1) {
                Counterparty = d.name;

                totalExpValue = [];

                var children = d._children == null?d.children:d._children;

                for (exp in children) {
                    totalExpValue.push({
                        name: children[exp].name,
                        value: children[exp].value
                    });
                }
                d3.select("#SecbarpieUtil svg").remove();
                drawBar(totalExpValue, "Sector")
            }
            else {
                d3.select("#SecbarpieUtil svg").remove();
            }

            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }

            d.highlight = true;
            update(d);
        }
    }

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    function collapseAll() {
        root.children.forEach(collapse);
        collapse(root);
        update(root);
    }
}
