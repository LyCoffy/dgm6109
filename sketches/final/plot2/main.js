"use strict";

let svgWidth = 850;
let svgHeight = 480;
let margin = 85;

d3.select("#container")
  .style("width", String(svgWidth) + "px");

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
    timeWithFriends: 175,
    drawingTime: 40,
    picturesTaken: 3,
    emotionalState: { morning: 4, night: 3 }
  }, // Oct 26
  {
    date: "Oct 27, 2025",
    timeWithFriends: 95,
    drawingTime: 10,
    picturesTaken: 0,
    emotionalState: { morning: 3, night: 4 }
  }, // Oct 27
  {
    date: "Oct 28, 2025",
    timeWithFriends: 289,
    drawingTime: 78,
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
  }, // Oct 30
  {
    date: "Oct 31, 2025",
    timeWithFriends: 70,
    drawingTime: 40,
    picturesTaken: 5,
    emotionalState: { morning: 3, night: 1 }
  }, // Oct 31


  // ---- November Data ----
{
  date: "Nov 01, 2025",
  timeWithFriends: 165,
  drawingTime: 12,
  picturesTaken: 5,
  emotionalState: { morning: 2, night: 2 }
},
{
  date: "Nov 02, 2025",
  timeWithFriends: 120,
  drawingTime: 0,
  picturesTaken: 3,
  emotionalState: { morning: 3, night: 2 }
},
{
  date: "Nov 03, 2025",
  timeWithFriends: 195,
  drawingTime: 20,
  picturesTaken: 7,
  emotionalState: { morning: 1, night: 1 }
},
{
  date: "Nov 04, 2025",
  timeWithFriends: 92,
  drawingTime: 5,
  picturesTaken: 1,
  emotionalState: { morning: 4, night: 3 }
},
{
  date: "Nov 05, 2025",
  timeWithFriends: 240,
  drawingTime: 30,
  picturesTaken: 6,
  emotionalState: { morning: 2, night: 1 }
},
{
  date: "Nov 06, 2025",
  timeWithFriends: 155,
  drawingTime: 10,
  picturesTaken: 4,
  emotionalState: { morning: 3, night: 4 }
},
{
  date: "Nov 07, 2025",
  timeWithFriends: 170,
  drawingTime: 18,
  picturesTaken: 2,
  emotionalState: { morning: 4, night: 5 }
},
{
  date: "Nov 08, 2025",
  timeWithFriends: 288,
  drawingTime: 35,
  picturesTaken: 8,
  emotionalState: { morning: 2, night: 2 }
},
{
  date: "Nov 09, 2025",
  timeWithFriends: 284,
  drawingTime: 0,
  picturesTaken: 0,
  emotionalState: { morning: 5, night: 2 }
},
{
  date: "Nov 10, 2025",
  timeWithFriends: 275,
  drawingTime: 15,
  picturesTaken: 5,
  emotionalState: { morning: 1, night: 2 }
},
{
  date: "Nov 11, 2025",
  timeWithFriends: 220,
  drawingTime: 25,
  picturesTaken: 3,
  emotionalState: { morning: 3, night: 3 }
},
{
  date: "Nov 12, 2025",
  timeWithFriends: 198,
  drawingTime: 8,
  picturesTaken: 2,
  emotionalState: { morning: 4, night: 1 }
},
{
  date: "Nov 13, 2025",
  timeWithFriends: 149,
  drawingTime: 0,
  picturesTaken: 0,
  emotionalState: { morning: 2, night: 5 }
},
{
  date: "Nov 14, 2025",
  timeWithFriends: 260,
  drawingTime: 30,
  picturesTaken: 7,
  emotionalState: { morning: 1, night: 2 }
},
{
  date: "Nov 15, 2025",
  timeWithFriends: 111,
  drawingTime: 12,
  picturesTaken: 1,
  emotionalState: { morning: 3, night: 3 }
}
];


/* Convert to weekly index
   So this can be readable and applicable to the X axis */
let plotData = dailyData.map((d, i) => ({
  i: i,
  date: d.date,
  drawing: d.drawingTime,
  friends: d.timeWithFriends
}));

/* I wrote my data in order, but here is the sort anyway */
plotData.sort((a, b) => a.i - b.i);

/* X scale */
let xScale = d3.scaleLinear()
  .domain([0, plotData.length - 1])
  .range([margin, svgWidth - margin]);

/* Y scale
Stacking both values, the total height on y axis is the add
of both values */
let maxStack = d3.max(plotData, d => d.drawing + d.friends);
let yScale = d3.scaleLinear()
  .domain([0, maxStack])
  .range([svgHeight - margin, margin]);

/* Stack: for this graph needed to use Stack,
so the values Drawing time will be on top of time with friends */
let stackGen = d3.stack()
  .keys(["drawing", "friends"]);

let stackedSeries = stackGen(plotData);

/* Area: Its generating the area that'll be drawn
y0 is the lowest value, ofc always bein 0
y1 is based on the value on y axis 
x the inbetween space between the x axis values */
let area = d3.area()
  .x((d, i) => xScale(i))
  .y0(d => yScale(d[0]))
  .y1(d => yScale(d[1]));

/* Drawing the areas */
svg.selectAll(".layer")
  .data(stackedSeries)
  .enter()
  .append("path")
  .attr("class", "layer")
  .attr("d", area)
  .attr("fill", (d, i) => {
    return i === 0 ? "#c3e7ff" : "#7fb3ff";
  })
  .attr("stroke", "#003f8c")
  .attr("stroke-width", 1)
  .attr("opacity", 0.9);

/* Google AI gave me and explain me a basic structure to do it, but chatgpt helped me 
to understand better and simplify it for me */

/* X-axis labels */
plotData.forEach((d, i) => {
  svg.append("text")
    .attr("x", xScale(i))
    .attr("y", svgHeight - (margin / 1.1))
    .attr("text-anchor", "end")
    .attr("font-size", "9px")
    .attr("transform", `rotate(-70, ${xScale(i)}, ${svgHeight - (margin / 1)})`)
    .text(d.date);
});

/* Y-axis numbers */
let yTicks = 5;
for (let t = 0; t <= yTicks; t++) {
  let v = Math.round((maxStack / yTicks) * t);
  svg.append("text")
    .attr("x", margin - 5)
    .attr("y", yScale(v))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "10px")
    .text(v);
}

/* Axis titles */
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 8)
  .attr("text-anchor", "middle")
  .text("Dates (Oct 4 – Nov 15)");

svg.append("text")
  .attr("x", -svgHeight / 2)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("transform", "rotate(-90)")
  .text("Minutes (drawing + friends)");

/* Axis lines */
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
  .attr("width", 230)
  .attr("height", 70);

legendSVG.append("rect")
  .attr("width", 230)
  .attr("height", 70)
  .attr("fill", "#ffffff")
  .attr("stroke", "#999");

legendSVG.append("text")
  .text("Stacked Values")
  .attr("x", 115)
  .attr("y", 18)
  .attr("text-anchor", "middle");

let legendItems = [
  { color: "#c3e7ff", label: "Drawing Time" },
  { color: "#7fb3ff", label: "Time With Friends" }
];

legendItems.forEach((item, i) => {
  let yPos = 35 + i * 20;

  legendSVG.append("rect")
    .attr("x", 15)
    .attr("y", yPos - 10)
    .attr("width", 18)
    .attr("height", 11)
    .attr("fill", item.color)
    .attr("stroke", "#003f8c");

  legendSVG.append("text")
    .text(item.label)
    .attr("x", 45)
    .attr("y", yPos)
    .attr("alignment-baseline", "middle");
});

/* used as a visual reference 
https://r-graph-gallery.com/stacked-area-chart-plotly.html  */
