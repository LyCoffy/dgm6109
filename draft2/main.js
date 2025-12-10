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

let xScale, data;   // ← yScale removed

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
            nightMood: d.mood[1],
            timeWithFriends: d.timeWithFriends
        };
    });
}

/* ---------------- SCALES ---------------- */
function buildScales(data) {

    xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([margin.left, svgWidth - margin.right]);

    // ❌ yScale removed here completely
}

/* ---------------- BULB SHAPE + GLOW ---------------- */
function drawBulb(x, y, size, color, upsideDown, glowSize) {

    if (typeof upsideDown === "undefined") {
        upsideDown = false;
    }

    let g = bulbsLayer.append("g")
        .attr("class", "bulbGroup");

    let circleX = x;
    let circleY;

    /* ----------------- RIGHT SIDE UP BULB ----------------- */
    if (!upsideDown) {

        circleY = y + 1;
        let circleR = size * 0.45;

        g.append("circle")
            .attr("cx", circleX)
            .attr("cy", circleY)
            .attr("r", circleR)
            .attr("fill", color);

        /* Glow behind bulb */
        g.append("circle")
            .attr("class", "glowCircle")
            .attr("cx", circleX)
            .attr("cy", circleY)
            .attr("r", size + glowSize)
            .attr("fill", color)
            .attr("opacity", 0);

        let triTopY = y + size * 0.14;
        let triBottomY = y + size * 1;
        let triLeftX  = x - size * 0.45;
        let triRightX = x + size * 0.45;

        g.append("path")
            .attr("d",
                "M " + triLeftX + " " + triTopY + " " +
                "L " + triRightX + " " + triTopY + " " +
                "L " + x + " " + triBottomY + " Z")
            .attr("fill", color);
    }

    /* ----------------- UPSIDE-DOWN BULB ------------------ */
    else {

        circleY = y + size * 1.2;
        let circleR = size * 0.45;

        g.append("circle")
            .attr("cx", circleX)
            .attr("cy", circleY)
            .attr("r", circleR)
            .attr("fill", color);

        /* Glow behind bulb */
        g.append("circle")
            .attr("class", "glowCircle")
            .attr("cx", circleX)
            .attr("cy", circleY)
            .attr("r", size + glowSize)
            .attr("fill", color)
            .attr("opacity", 0);

        let triTopY = y + size * 0.2;
        let triBottomY = y + size * 1;
        let triLeftX  = x - size * 0.40;
        let triRightX = x + size * 0.40;

        g.append("path")
            .attr("d",
                "M " + triLeftX  + " " + triBottomY + " " +
                "L " + triRightX + " " + triBottomY + " " +
                "L " + x + " " + triTopY + " Z")
            .attr("fill", color);
    }

    /* ----------------- HOVER ANIMATION ------------------ */
    g.on("mouseover", function () {
        d3.select(this).select(".glowCircle")
            .transition().duration(300)
            .attr("opacity", 0.75);
    })
    .on("mouseout", function () {
        d3.select(this).select(".glowCircle")
            .transition().duration(3000)
            .attr("opacity", 0);
    });
}

/* ---------------- SOCKET SHAPES ---------------- */
function drawSocket(x, y) {

    let g = socketsLayer.append("g");

    let leftTopX  = x - 6;
    let leftTopY  = y;
    let rightTopX = x + 6;
    let rightTopY = y;

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

function drawSocketUpsideDown(x, y) {

    let g = socketsLayer.append("g");

    let leftTopX  = x - 10;
    let leftTopY  = y;
    let rightTopX = x + 10;
    let rightTopY = y;

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

    /* Glow scale */
    let glowScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.timeWithFriends)])
        .range([0, 40]);

    /* ---- WIRES ---- */
    let wireWiggle = 8;

    let wireLine = d3.line()
        .x(d => xScale(d.index))
        .y(() => midY + (Math.random() - 0.8) * wireWiggle * 2)
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
            .x(d => xScale(d.index))
            .y(() => midY + offset + (Math.random() - 0.8) * wiggle * 2)
            .curve(d3.curveBasis);

        wiresLayer.append("path")
            .datum(data)
            .attr("d", wireLine2)
            .attr("stroke", "#0d6804ff")
            .attr("stroke-width", 5)
            .attr("fill", "none")
            .attr("opacity", .8);
    });

    /* ---- SOCKETS ---- */
    data.forEach(function (d) {
        let x = xScale(d.index);
        drawSocket(x, midY - 5);
        drawSocketUpsideDown(x, midY - 25);
    });

    /* ---- COLORS ---- */
    let colors = {
        1: "#237bff",
        2: "#00e32d",
        3: "#ffd900",
        4: "#ff7b00",
        5: "#ee0024"
    };

    let bulbSize = 22;

    /* ---- MORNING BULBS ---- */
    data.forEach(function (d) {
        let glowIntensity = glowScale(d.timeWithFriends);

        drawBulb(
            xScale(d.index),
            midY - 38,
            bulbSize,
            colors[d.morningMood],
            false,
            glowIntensity
        );
    });

    /* ---- NIGHT BULBS ---- */
    data.forEach(function (d) {
        let glowIntensity = glowScale(d.timeWithFriends);

        drawBulb(
            xScale(d.index),
            midY - 3,
            bulbSize,
            colors[d.nightMood],
            true,
            glowIntensity
        );
    });

    /* ---- Y AXIS ---- */
    svg.append("line")
        .attr("x1", margin.left - 20)
        .attr("y1", margin.top)
        .attr("x2", margin.left)
        .attr("y2", svgHeight - margin.bottom)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    svg.append("text")
        .attr("class", "y-axis-text")
        .attr("x", margin.left)
        .attr("y", midY - 100)
        .attr("transform", "rotate(-90 " + (margin.left - 50) + "," + (midY - 120) + ")")
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .text("Morning");

    svg.append("text")
        .attr("class", "y-axis-text")
        .attr("x", margin.left - 100)
        .attr("y", midY + 150)
        .attr("transform", "rotate(-90 " + (margin.left - 50) + "," + (midY + 120) + ")")
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .text("Night");

    /* ---- X AXIS ---- */
    let xAxis = d3.axisBottom(xScale)
        .ticks(data.length)
        .tickFormat((d, i) => data[i] ? data[i].date : "");

    svg.append("g")
        .attr("transform", "translate(0," + (svgHeight - margin.bottom) + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("class", "x-axis-text")
        .attr("transform", "rotate(-65)")
        .attr("font-size", "10px")
        .style("text-anchor", "end");
}

/* ---------------- LEGEND BOX ---------------- */
let legendWidth = 300;
let legendHeight = 220;

let legendX = svgWidth - legendWidth - 30;
let legendY = margin.top;

svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("rx", 10);

/* ---------------- LEGEND TITLES ---------------- */
svg.append("text")
    .attr("class", "legend-title")
    .attr("x", legendX + 20)
    .attr("y", legendY + 25)
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .text("Colour Meaning");

svg.append("text")
    .attr("class", "legend-title")
    .attr("x", legendX + 20)
    .attr("y", legendY + 155)
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .text("Glowing Size");

/* ---------------- MOOD COLOUR CIRCLES ---------------- */
let moodLabels = [
    { mood: "Happy", color: "#00e32d" },
    { mood: "Relax", color: "#237bff" },
    { mood: "Stress", color: "#ffd900" },
    { mood: "Anxious", color: "#ff7b00" },
    { mood: "Overwhelmed", color: "#ee0024" }
];

moodLabels.forEach(function(d, i) {

    svg.append("circle")
        .attr("cx", legendX + 30)
        .attr("cy", legendY + 45 + i * 20)
        .attr("r", 8)
        .attr("fill", d.color);

    svg.append("text")
        .attr("class", "legend-label")
        .attr("x", legendX + 50)
        .attr("y", legendY + 50 + i * 20)
        .attr("font-size", "14px")
        .text(d.mood);
});

/* ---------------- GLOW SIZE LEGEND ---------------- */
svg.append("circle")
    .attr("cx", legendX + 30)
    .attr("cy", legendY + 170)
    .attr("r", 8)
    .attr("fill", "#a0a0a0ff");

svg.append("text")
    .attr("class", "legend-label")
    .attr("x", legendX + 50)
    .attr("y", legendY + 175)
    .attr("font-size", "14px")
    .text("Smaller glow = less time with friends");

svg.append("circle")
    .attr("cx", legendX + 30)
    .attr("cy", legendY + 200)
    .attr("r", 14)
    .attr("fill", "#a0a0a0ff");

svg.append("text")
    .attr("class", "legend-label")
    .attr("x", legendX + 50)
    .attr("y", legendY + 205)
    .attr("font-size", "14px")
    .text("Bigger glow = more time with friends");
