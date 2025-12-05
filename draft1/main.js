"use strict";

let svgWidth = 1200;
let svgHeight = 900;

let margin = {
    top: 60,
    right: 40,
    bottom: 120,
    left: 80
};

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* ---------------- GROUPS ---------------- */

let bulbsLayer = svg.append("g").attr("id", "bulbsLayer");
let socketsLayer = svg.append("g").attr("id", "socketsLayer");
let wiresLayer = svg.append("g").attr("id", "wiresLayer");

/* Border */
svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black");

let xScale, yScale, data;


// load JSON
(async function () {
    data = await d3.json("data.json").then(buildVisualization);
})();

/* ---------------- BUILD VISUALIZATION ---------------- */

function buildVisualization(data) {
    let cleanData = organizeData(data);
    buildScales(cleanData);
    drawVisualization(cleanData);
    return data;
}

/* ---------------- ORGANIZE DATA ---------------- */

function organizeData(data) {
    return data.map(function (d, i) {
        return {
            index: i,
            date: d.date,
            morningMood: d.mood[0],
            nightMood: d.mood[1]
        };
    });
}

/* ---------------- SCALES ---------------- */

function buildScales(data) {

    xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([margin.left, svgWidth - margin.right]);

    yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([margin.top, svgHeight - margin.bottom]);
}

/* ---------------- BULB SHAPE ---------------- */

function drawBulb(x, y, size, color, upsideDown) {

    // fake default value for upsideDown
    if (typeof upsideDown === "undefined") {
        upsideDown = false;
    }

    let g = bulbsLayer.append("g");

    if (!upsideDown) {

        // circle position
        let circleX = x;
        let circleY = y + 1;
        let circleR = size * 0.45;

        // triangle points
        let triTopY = y + size * 0.14;
        let triBottomY = y + size * 1;

        let triLeftX  = x - size * 0.45;
        let triRightX = x + size * 0.45;

        // draw shapes
        g.append("circle")
            .attr("cx", circleX)
            .attr("cy", circleY)
            .attr("r", circleR)
            .attr("fill", color);

        g.append("path")
            .attr("d",
                "M " + triLeftX + " " + triTopY + " " +
                "L " + triRightX + " " + triTopY + " " +
                "L " + x + " " + triBottomY + " Z"
            )
            .attr("fill", color);
    }

    else {

        // circle position
        let circleX = x;
        let circleY = y + size * 1.2;
        let circleR = size * 0.45;

        // triangle points
        let triTopY = y + size * 0.2;
        let triBottomY = y + size * 1;

        let triLeftX  = x - size * 0.40;
        let triRightX = x + size * 0.40;

        // draw shapes
        g.append("circle")
            .attr("cx", circleX)
            .attr("cy", circleY)
            .attr("r", circleR)
            .attr("fill", color);

        g.append("path")
            .attr("d",
                "M " + triLeftX  + " " + triBottomY + " " +
                "L " + triRightX + " " + triBottomY + " " +
                "L " + x + " " + triTopY + " Z"
            )
            .attr("fill", color);
    }
}


/* ----------------- SOCKET SHAPE -------------------- */

function drawSocket(x, y) {

    let g = socketsLayer.append("g");

    // Top edge
    let leftTopX  = x - 6;
    let leftTopY  = y;
    let rightTopX = x + 6;
    let rightTopY = y;

    // Bottom edge
    let leftBottomX  = x - 10;
    let leftBottomY  = y + 18;
    let rightBottomX = x + 10;
    let rightBottomY = y + 18;

    let pointsString =
        leftTopX + "," + leftTopY + " " +
        rightTopX + "," + rightTopY + " " +
        rightBottomX + "," + rightBottomY + " " +
        leftBottomX + "," + leftBottomY;

    g.append("polygon")
        .attr("points", pointsString)
        .attr("fill", "#084003ff");
}

/* ----------- UPSIDE-DOWN SOCKET -------------- */

function drawSocketUpsideDown(x, y) {

    let g = socketsLayer.append("g");

    // Top edge (wide)
    let leftTopX  = x - 10;
    let leftTopY  = y;
    let rightTopX = x + 10;
    let rightTopY = y;

    // Bottom edge
    let leftBottomX  = x - 6;
    let leftBottomY  = y + 18;
    let rightBottomX = x + 6;
    let rightBottomY = y + 18;

    let pointsString =
        leftTopX + "," + leftTopY + " " +
        rightTopX + "," + rightTopY + " " +
        rightBottomX + "," + rightBottomY + " " +
        leftBottomX + "," + leftBottomY;

    g.append("polygon")
        .attr("points", pointsString)
        .attr("fill", "#084003ff");
}


/* ---------------- DRAW EVERYTHING ---------------- */

function drawVisualization(data) {

    let midY = (svgHeight - margin.bottom + margin.top) / 2;

    /* --- DRAW WIRES --- */

    let wireWiggle = 8;

    let wireLine = d3.line()
        .x(function (d) { return xScale(d.index); })
        .y(function () { return midY + (Math.random() - 0.8) * wireWiggle * 2; })
        .curve(d3.curveBasis);

    wiresLayer.append("path")
        .datum(data)
        .attr("d", wireLine)
        .attr("stroke", "#084003ff")
        .attr("stroke-width", 5)
        .attr("fill", "none");

    let extraOffsets = [-2, 2];
    let extraWiggles = [5, 5];

    extraOffsets.forEach(function (offset, i) {

        let wiggle = extraWiggles[i];

        let wireLine2 = d3.line()
            .x(function (d) { return xScale(d.index); })
            .y(function () { return midY + offset + (Math.random() - 0.8) * wiggle * 2; })
            .curve(d3.curveBasis);

        wiresLayer.append("path")
            .datum(data)
            .attr("d", wireLine2)
            .attr("stroke", "#0d6804ff")
            .attr("stroke-width", 5)
            .attr("fill", "none")
            .attr("opacity", .8);
    });


    /* --- SOCKET ROWS --- */

    data.forEach(function (d) {
        let x = xScale(d.index);

        drawSocket(x, midY - 5);
        drawSocketUpsideDown(x, midY - 25);
    });


    /* --- Colors --- */
    let colors = {
        1: "#00e32d",
        2: "#237bff",
        3: "#ffd900",
        4: "#ff7b00",
        5: "#ee0024"
    };

    let bulbSize = 22;

    /* --- MORNING BULBS --- */

    data.forEach(function (d) {
        drawBulb(
            xScale(d.index),
            midY - 38,
            bulbSize,
            colors[d.morningMood],
            false
        );
    });

    /* --- NIGHT BULBS --- */

    data.forEach(function (d) {
        drawBulb(
            xScale(d.index),
            midY - 3,
            bulbSize,
            colors[d.nightMood],
            true
        );
    });


    /* --- X Axis --- */

    let xAxis = d3.axisBottom(xScale)
        .ticks(data.length)
        .tickFormat(function (d, i) {
            return data[i] ? data[i].date : "";
        });

    svg.append("g")
        .attr("transform", "translate(0," + (svgHeight - margin.bottom) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-65)")
        .attr("font-size", "10px")
        .style("text-anchor", "end");
}
