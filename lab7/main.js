"use strict";

/* Configuration variables: drawing */
let svgWidth = 600;
let svgHeight = 400;
let margin = 25;

/* Resize div to match width of visualization. */
d3.select("#container")
  .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Draw margin border. */
svg.append("rect")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-dasharray", "5")
  .attr("x", margin)
  .attr("y", margin)
  .attr("width", svgWidth - margin * 2)
  .attr("height", svgHeight - margin * 2);

/* Data base */
// 1 = Happy, 2 = Relax, 3 = Stress, 4 = Anxious, 5 = Overwhelmed

let dailyData = [
  {
    date: "2025-10-04",
    timeWithFriends: 120, // minutes
    drawingTime: 80, // minutes
    picturesTaken: 0,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 04

  {
    date: "2025-10-05",
    timeWithFriends: 100,
    drawingTime: 0,
    picturesTaken: 6,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 05

  {
    date: "2025-10-06",
    timeWithFriends: 80,
    drawingTime: 10,
    picturesTaken: 5,
    emotionalState: { morning: 1, night: 4 }
  }, // Oct 06

  {
    date: "2025-10-07",
    timeWithFriends: 95,
    drawingTime: 20,
    picturesTaken: 3,
    emotionalState: { morning: 4, night: 1 }
  }, // Oct 07

  {
    date: "2025-10-08",
    timeWithFriends: 267,
    drawingTime: 8,
    picturesTaken: 6,
    emotionalState: { morning: 1, night: 2 }
  }, // Oct 08

  {
    date: "2025-10-09",
    timeWithFriends: 130,
    drawingTime: 50,
    picturesTaken: 0,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 09

  {
    date: "2025-10-10",
    timeWithFriends: 238,
    drawingTime: 25,
    picturesTaken: 8,
    emotionalState: { morning: 1, night: 2 }
  }, // Oct 10

  {
    date: "2025-10-11",
    timeWithFriends: 148,
    drawingTime: 20,
    picturesTaken: 5,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 11

  {
    date: "2025-10-12",
    timeWithFriends: 186,
    drawingTime: 18,
    picturesTaken: 2,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 12

  {
    date: "2025-10-13",
    timeWithFriends: 141,
    drawingTime: 0,
    picturesTaken: 4,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 13

  {
    date: "2025-10-14",
    timeWithFriends: 108,
    drawingTime: 15,
    picturesTaken: 3,
    emotionalState: { morning: 1, night: 4 }
  }, // Oct 14

  {
    date: "2025-10-15",
    timeWithFriends: 182,
    drawingTime: 30,
    picturesTaken: 7,
    emotionalState: { morning: 2, night: 4 }
  }, // Oct 15

  {
    date: "2025-10-16",
    timeWithFriends: 95,
    drawingTime: 0,
    picturesTaken: 3,
    emotionalState: { morning: 1, night: 3 }
  }, // Oct 16

  {
    date: "2025-10-17",
    timeWithFriends: 95,
    drawingTime: 10,
    picturesTaken: 5,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 17

  {
    date: "2025-10-18",
    timeWithFriends: 101,
    drawingTime: 10,
    picturesTaken: 1,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 18

  {
    date: "2025-10-19",
    timeWithFriends: 119,
    drawingTime: 0,
    picturesTaken: 2,
    emotionalState: { morning: 4, night: 3 }
  }, // Oct 19

  {
    date: "2025-10-20",
    timeWithFriends: 317,
    drawingTime: 20,
    picturesTaken: 4,
    emotionalState: { morning: 4, night: 1 }
  }, // Oct 20

  {
    date: "2025-10-21",
    timeWithFriends: 187,
    drawingTime: 15,
    picturesTaken: 9,
    emotionalState: { morning: 2, night: 2 }
  }, // Oct 21

  {
    date: "2025-10-22",
    timeWithFriends: 90,
    drawingTime: 0,
    picturesTaken: 2,
    emotionalState: { morning: 3, night: 4 }
  } // Oct 22
];

/* Data taken, only two values time with friends and drawing time */
let timeFriendsDrawing = [];
for (let i = 0; i < dailyData.length; i = i + 1) {
  timeFriendsDrawing.push({ x: dailyData[i].timeWithFriends, y: dailyData[i].drawingTime });
}

/* Dynamic scaling: this is explained down below */
let xMin = d3.min(timeFriendsDrawing, function (d) { return d.x; });
let xMax = d3.max(timeFriendsDrawing, function (d) { return d.x; });
let yMin = d3.min(timeFriendsDrawing, function (d) { return d.y; });
let yMax = d3.max(timeFriendsDrawing, function (d) { return d.y; });

let xSpread = xMax - xMin;
let ySpread = yMax - yMin;

/* Padding for the circles to be spread */
// I looked up how to create a padding in java, but its a bit difficult to understand when they use different names
// like const instead of let, so chatgpt worked best for explaining
let xPadding = xSpread > 0 ? xSpread * 0.1 : 1;
let yPadding = ySpread > 0 ? ySpread * 0.1 : 1;

let xScale = d3.scaleLinear()
  .domain([xMin - xPadding, xMax + xPadding])
  .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
  .domain([yMin - yPadding, yMax + yPadding])
  .range([svgHeight - margin, margin]);

/* Circles */
let circles = svg.selectAll("circle")
  .data(timeFriendsDrawing)
  .enter()
  .append("circle");

circles
  .attr("r", 5)
  .attr("cx", function (value) {
    return xScale(value.x);
  })
  .attr("cy", function (value) {
    return yScale(value.y);
  })
  .attr("fill", "black");


// X axis numbers
// Dynamic scaling, thanks to chatgpt u sing the example from the slides, 
// cause i couldnt get it correct. The example only used 4 spaces to placed on X
// So this way will automatic change the max of the axis depending on my database.
// Pretty handy to kep aading all the data
// And it will evenly space the values at the bottom, its impressive, idk how I couldve done it tbh
for (let i = 0; i <= 4; i = i + 1) {
  let xValue = Math.round(xMin + (i * (xMax - xMin) / 4));
  svg.append("text")
    .attr("x", xScale(xValue))
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .text(String(xValue));
}

// Y axis numbers
// Same as the X axis
for (let i = 0; i <= 4; i = i + 1) {
  let yValue = Math.round(yMin + (i * (yMax - yMin) / 4));
  svg.append("text")
    .attr("x", margin)
    .attr("y", yScale(yValue))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "10px")
    .text(String(yValue));
}

/* label the axes */
let xAxisLabel = svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 1) // moved lower
  .attr("text-anchor", "middle")
  .text("Minutes spent with friends");

let yAxisLabel = svg.append("text")
  .attr("x", -svgHeight / 2)
  .attr("y", 8)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .text("Minutes spent drawing")
  .attr("transform", "rotate(-90)");

/* label key graph coordinates */
let originLabel = svg.append("text")
  .attr("x", margin)
  .attr("y", svgHeight - (margin / 2))
  .attr("text-anchor", "middle")
  .text("0,0");
