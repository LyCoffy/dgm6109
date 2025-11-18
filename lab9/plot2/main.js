"use strict";

let svgWidth = 800;
let svgHeight = 450;
let margin = 70;

/* Resize container */
d3.select("#container")
  .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Data base */
// 1 = Happy, 2 = Relax, 3 = Stress, 4 = Anxious, 5 = Overwhelmed
// Dates format updated for d3 redability

let dailyData = [
  {
    date: "Oct 04, 2025",
    timeWithFriends: 120, // minutes
    drawingTime: 80, // minutes
    picturesTaken: 0,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 04
  {
    date: "Oct 05, 2025",
    timeWithFriends: 100,
    drawingTime: 0,
    picturesTaken: 6,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 05
  {
    date: "Oct 06, 2025",
    timeWithFriends: 80,
    drawingTime: 10,
    picturesTaken: 5,
    emotionalState: { morning: 1, night: 4 }
  }, // Oct 06
  {
    date: "Oct 07, 2025",
    timeWithFriends: 95,
    drawingTime: 20,
    picturesTaken: 3,
    emotionalState: { morning: 4, night: 1 }
  }, // Oct 07
  {
    date: "Oct 08, 2025",
    timeWithFriends: 267,
    drawingTime: 8,
    picturesTaken: 6,
    emotionalState: { morning: 1, night: 2 }
  }, // Oct 08
  {
    date: "Oct 09, 2025",
    timeWithFriends: 130,
    drawingTime: 50,
    picturesTaken: 0,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 09
  {
    date: "Oct 10, 2025",
    timeWithFriends: 238,
    drawingTime: 25,
    picturesTaken: 8,
    emotionalState: { morning: 1, night: 2 }
  }, // Oct 10
  {
    date: "Oct 11, 2025",
    timeWithFriends: 148,
    drawingTime: 20,
    picturesTaken: 5,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 11
  {
    date: "Oct 12, 2025",
    timeWithFriends: 186,
    drawingTime: 18,
    picturesTaken: 2,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 12
  {
    date: "Oct 13, 2025",
    timeWithFriends: 141,
    drawingTime: 0,
    picturesTaken: 4,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 13
  {
    date: "Oct 14, 2025",
    timeWithFriends: 108,
    drawingTime: 15,
    picturesTaken: 3,
    emotionalState: { morning: 1, night: 4 }
  }, // Oct 14
  {
    date: "Oct 15, 2025",
    timeWithFriends: 182,
    drawingTime: 30,
    picturesTaken: 7,
    emotionalState: { morning: 2, night: 4 }
  }, // Oct 15
  {
    date: "Oct 16, 2025",
    timeWithFriends: 95,
    drawingTime: 0,
    picturesTaken: 3,
    emotionalState: { morning: 1, night: 3 }
  }, // Oct 16
  {
    date: "Oct 17, 2025",
    timeWithFriends: 95,
    drawingTime: 10,
    picturesTaken: 5,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 17
  {
    date: "Oct 18, 2025",
    timeWithFriends: 101,
    drawingTime: 10,
    picturesTaken: 1,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 18
  {
    date: "Oct 19, 2025",
    timeWithFriends: 119,
    drawingTime: 0,
    picturesTaken: 2,
    emotionalState: { morning: 4, night: 3 }
  }, // Oct 19
  {
    date: "Oct 20, 2025",
    timeWithFriends: 317,
    drawingTime: 20,
    picturesTaken: 4,
    emotionalState: { morning: 4, night: 1 }
  }, // Oct 20
  {
    date: "Oct 21, 2025",
    timeWithFriends: 187,
    drawingTime: 15,
    picturesTaken: 9,
    emotionalState: { morning: 2, night: 2 }
  }, // Oct 21
  {
    date: "Oct 22, 2025",
    timeWithFriends: 90,
    drawingTime: 0,
    picturesTaken: 2,
    emotionalState: { morning: 5, night: 5 }
  }, // Oct 22
  {
    date: "Oct 23, 2025",
    timeWithFriends: 160,
    drawingTime: 25,
    picturesTaken: 4,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 23
  {
    date: "Oct 24, 2025",
    timeWithFriends: 110,
    drawingTime: 0,
    picturesTaken: 1,
    emotionalState: { morning: 2, night: 2 }
  }, // Oct 24
  {
    date: "Oct 25, 2025",
    timeWithFriends: 210,
    drawingTime: 12,
    picturesTaken: 5,
    emotionalState: { morning: 1, night: 1 }
  }, // Oct 25
  {
    date: "Oct 26, 2025",
    timeWithFriends: 75,
    drawingTime: 40,
    picturesTaken: 3,
    emotionalState: { morning: 4, night: 3 }
  }, // Oct 26
  {
    date: "Oct 27, 2025",
    timeWithFriends: 95,
    drawingTime: 0,
    picturesTaken: 2,
    emotionalState: { morning: 3, night: 4 }
  }, // Oct 27
  {
    date: "Oct 28, 2025",
    timeWithFriends: 289,
    drawingTime: 28,
    picturesTaken: 7,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 28
  {
    date: "Oct 29, 2025",
    timeWithFriends: 140,
    drawingTime: 18,
    picturesTaken: 6,
    emotionalState: { morning: 1, night: 2 }
  }, // Oct 29
  {
    date: "Oct 30, 2025",
    timeWithFriends: 102,
    drawingTime: 5,
    picturesTaken: 0,
    emotionalState: { morning: 3, night: 5 }
  } // Oct 30
];

let plotData = [];

for (let i = 0; i < dailyData.length; i = i + 1) {

  // NO substring — we keep the full date exactly as you wrote it
  let readable = dailyData[i].date;

  plotData.push({
    i: i,
    date: readable,
    y: dailyData[i].timeWithFriends,
    pics: dailyData[i].picturesTaken
  });
}

plotData.sort((a, b) => a.i - b.i);

/* Simple circle color */
function dateColor(i) {
  return "#8fd3ff";  // sky blue for all points
}

/* Scales */

let xScale = d3.scaleLinear()
  .domain([0, plotData.length - 1])
  .range([margin, svgWidth - margin]);

let yExtent = d3.extent(plotData, d => d.y);
let yMin = yExtent[0];
let yMax = yExtent[1];

let yPadding = (yMax - yMin) * 0.1;

let yScale = d3.scaleLinear()
  .domain([yMin - yPadding, yMax + yPadding])
  .range([svgHeight - margin, margin]);

let rScale = d3.scaleLinear()
  .domain(d3.extent(plotData, d => d.pics))
  .range([4, 12]);

/* Line */

let line = d3.line()
  .x(d => xScale(d.i))
  .y(d => yScale(d.y));

svg.append("path")
  .datum(plotData)
  .attr("fill", "none")
  .attr("stroke", "#003f8c")  // dark blue
  .attr("stroke-width", 3)
  .attr("d", line);

/* Circles */

svg.selectAll("circle")
  .data(plotData)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.i))
  .attr("cy", d => yScale(d.y))
  .attr("r", d => rScale(d.pics))
  .attr("fill", "#8fd3ff")   // sky blue
  .attr("stroke", "#003f8c") // navy
  .attr("opacity", 0.9);

/* Axis Numbers */

for (let i = 0; i < plotData.length; i += 1) {
  svg.append("text")
    .attr("x", xScale(i))
    .attr("y", svgHeight - (margin / 1.1))
    .attr("text-anchor", "end")
    .attr("font-size", "9px")
    .attr("transform", `rotate(-70, ${xScale(i)}, ${svgHeight - (margin / 1)})`)
    .classed("axis-number", true)
    .text(plotData[i].date);
}

/* Y-axis values */
for (let t = 0; t <= 4; t++) {
  let v = Math.round(yMin + (t * (yMax - yMin) / 4));
  svg.append("text")
    .attr("x", margin - 2)
    .attr("y", yScale(v))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "9px")
    .classed("axis-number", true)
    .text(v);
}

/* Axis Labels */
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 5)
  .attr("text-anchor", "middle")
  .classed("axis-label axis-label-x", true)
  .text("Date (Oct 4 – Oct 30)");

svg.append("text")
  .attr("x", -svgHeight / 2)
  .attr("y", 5)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("transform", "rotate(-90)")
  .classed("axis-label axis-label-y", true)
  .text("Minutes spent with friends");

/* Axis Lines */

svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", xScale(plotData.length - 1))
  .attr("y2", svgHeight - margin)
  .attr("stroke", "black");

svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", margin)
  .attr("y2", margin)
  .attr("stroke", "black");

/* Legend */

let legendSVG = d3.select("#legend")
  .append("svg")
  .attr("width", 240)
  .attr("height", 80);

legendSVG.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 240)
  .attr("height", 80)
  .attr("fill", "#ffffffff")
  .attr("stroke", "#999")
  .attr("stroke-width", 2);

legendSVG.append("text")
  .text("Picture Count")
  .attr("x", 120)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .classed("legend-title", true);

[
  { r: 4,  label: "Fewer pics" },
  { r: 12, label: "More pics" }
].forEach((item, i) => {

  let yPos = 38 + i * 22;

  legendSVG.append("circle")
    .attr("cx", 40)
    .attr("cy", yPos)
    .attr("r", item.r)
    .attr("fill", "#8fd3ff")
    .attr("stroke", "#003f8c");

  legendSVG.append("text")
    .text(item.label)
    .attr("x", 70)
    .attr("y", yPos)
    .attr("alignment-baseline", "middle")
    .classed("legend-label", true);
});
