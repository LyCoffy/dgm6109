"use strict";

/* Configuration variables: drawing */
let svgWidth = 700;
let svgHeight = 450;
let margin = 35;

/* Resize div to match width of visualization. */
d3.select("#container")
  .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

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
    emotionalState: { morning: 5, night: 5 }
  }, // Oct 22
  {
    date: "2025-10-23",
    timeWithFriends: 160,
    drawingTime: 25,
    picturesTaken: 4,
    emotionalState: { morning: 3, night: 2 }
  }, // Oct 23
  {
    date: "2025-10-24",
    timeWithFriends: 110,
    drawingTime: 0,
    picturesTaken: 1,
    emotionalState: { morning: 2, night: 2 }
  }, // Oct 24
  {
    date: "2025-10-25",
    timeWithFriends: 210,
    drawingTime: 12,
    picturesTaken: 5,
    emotionalState: { morning: 1, night: 1 }
  }, // Oct 25
  {
    date: "2025-10-26",
    timeWithFriends: 75,
    drawingTime: 40,
    picturesTaken: 3,
    emotionalState: { morning: 4, night: 3 }
  }, // Oct 26
  {
    date: "2025-10-27",
    timeWithFriends: 95,
    drawingTime: 0,
    picturesTaken: 2,
    emotionalState: { morning: 3, night: 4 }
  }, // Oct 27
  {
    date: "2025-10-28",
    timeWithFriends: 289,
    drawingTime: 28,
    picturesTaken: 7,
    emotionalState: { morning: 2, night: 1 }
  }, // Oct 28
  {
    date: "2025-10-29",
    timeWithFriends: 140,
    drawingTime: 18,
    picturesTaken: 6,
    emotionalState: { morning: 1, night: 2 }
  }, // Oct 29
  {
    date: "2025-10-30",
    timeWithFriends: 102,
    drawingTime: 5,
    picturesTaken: 0,
    emotionalState: { morning: 3, night: 5 }
  } // Oct 30
];

let moodFriendsData = [];
for (let i = 0; i < dailyData.length; i = i + 1) {
  moodFriendsData.push({
    x: dailyData[i].emotionalState.night,
    y: dailyData[i].timeWithFriends,
    pics: dailyData[i].picturesTaken
  });
}

/* Sort so smaller circles appear on top */
moodFriendsData.sort(function(a, b) {
  return b.pics - a.pics;
});

/* Using d3.extent() */
let xExtent = d3.extent(moodFriendsData, d => d.x);
let yExtent = d3.extent(moodFriendsData, d => d.y);

let xMin = xExtent[0];
let xMax = xExtent[1];
let yMin = yExtent[0];
let yMax = yExtent[1];

let xSpread = xMax - xMin;
let ySpread = yMax - yMin;

/* Padding */
let xPadding = xSpread > 0 ? xSpread * 0.1 : 1;
let yPadding = ySpread > 0 ? ySpread * 0.1 : 1;

/* Scales */
let xScale = d3.scaleLinear()
  .domain([xMin - xPadding, xMax + xPadding])
  .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
  .domain([yMin - yPadding, yMax + yPadding])
  .range([svgHeight - margin, margin]);

/* Bubble size scale */
let picsExtent = d3.extent(moodFriendsData, d => d.pics);

let rScale = d3.scaleLinear()
  .domain(picsExtent)
  .range([4, 10]);

/* Circles */
let circles = svg.selectAll("circle")
  .data(moodFriendsData)
  .enter()
  .append("circle");

circles
  .attr("r", d => rScale(d.pics))
  .attr("cx", d => xScale(d.x))
  .attr("cy", d => yScale(d.y))
  .attr("fill", "#666")
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("opacity", 0.85);

/* Axis numbers */
for (let i = 0; i <= 4; i = i + 1) {
  let xValue = Math.round(xMin + (i * (xMax - xMin) / 4));
  svg.append("text")
    .attr("x", xScale(xValue))
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .attr("font-size", "9px")
    .classed("axis-number", true)
    .text(String(xValue));
}

for (let i = 0; i <= 4; i = i + 1) {
  let yValue = Math.round(yMin + (i * (yMax - yMin) / 4));
  svg.append("text")
    .attr("x", margin - 1)
    .attr("y", yScale(yValue))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "9px")
    .classed("axis-number", true)
    .text(String(yValue));
}

/* Axis labels */
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 5)
  .attr("text-anchor", "middle")
  .classed("axis-label axis-label-x", true)
  .text("Emotional state at nights");

svg.append("text")
  .attr("x", -svgHeight / 2)
  .attr("y", 5)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("transform", "rotate(-90)")
  .classed("axis-label axis-label-y", true)
  .text("Minutes spent with friends");

/* X axis */
svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", xScale(xMax))
  .attr("y2", svgHeight - margin)
  .attr("stroke", "black");

/* Y axis line */
svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", margin)
  .attr("y2", yScale(yMax))
  .attr("stroke", "black");

/* Legend */
let legendContainer = d3.select("#container")
  .insert("div", ":first-child")
  .attr("id", "legend");

let legendWidth = 240;
let legendHeight = 70;

let legendSVG = legendContainer.append("svg")
  .attr("width", legendWidth)
  .attr("height", legendHeight);

legendSVG.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", legendWidth)
  .attr("height", legendHeight)
  .attr("fill", "#f0f0f0")
  .attr("stroke", "#999")
  .attr("stroke-width", 2);

legendSVG.append("text")
  .text("Picture Count")
  .attr("x", legendWidth / 2)
  .attr("y", 18)
  .attr("text-anchor", "middle")
  .classed("legend-title", true);

let items = [
  { r: 4, label: "Fewer pics taken" },
  { r: 10, label: "More pics taken" }
];

items.forEach((item, i) => {
  let yPos = 35 + i * 22;
  legendSVG.append("circle")
    .attr("cx", 40)
    .attr("cy", yPos)
    .attr("r", item.r)
    .attr("fill", "#666");

  legendSVG.append("text")
    .text(item.label)
    .attr("x", 70)
    .attr("y", yPos)
    .attr("alignment-baseline", "middle")
    .classed("legend-label", true);
});