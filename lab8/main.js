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
/// needed to comment this cause my lines wouldnt draw
/* svg.append("rect")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-dasharray", "5")
  .attr("x", margin)
  .attr("y", margin)
  .attr("width", svgWidth - margin * 2)
  .attr("height", svgHeight - margin * 2); */

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
    emotionalState: { morning: 5, night: 4 }
  } // Oct 22
];


/* X axis = Morning emotional state (values 1–5)
// Y axis = Minutes spent with friends
// This replaces the previous version where X was time with friends and Y was drawing time,
// cause i couldnt make it work with the legend, so i make it change places. */
let moodFriendsData = [];
for (let i = 0; i < dailyData.length; i = i + 1) {
  moodFriendsData.push({
    x: dailyData[i].emotionalState.morning,
    y: dailyData[i].timeWithFriends
  });
}


// Old version
// let xMin = d3.min(moodFriendsData, function (d) { return d.x; });
// let xMax = d3.max(moodFriendsData, function (d) { return d.x; });
// let yMin = d3.min(moodFriendsData, function (d) { return d.y; });
// let yMax = d3.max(moodFriendsData, function (d) { return d.y; });

// d3.extent() combines the min and max we used on top. 
// google ai was very helpful to solve this section. */
let xExtent = d3.extent(moodFriendsData, function (d) { return d.x; });
let yExtent = d3.extent(moodFriendsData, function (d) { return d.y; });

let xMin = xExtent[0];
let xMax = xExtent[1];
let yMin = yExtent[0];
let yMax = yExtent[1];

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

/* Radius scaling with picturesTaken */
let picsMin = d3.min(dailyData, function (d) { return d.picturesTaken; });
let picsMax = d3.max(dailyData, function (d) { return d.picturesTaken; });

/* scaling +0.5 radius per picture, i thought this would worked best
since i dont want the circles to be tooo big*/
let rScale = d3.scaleLinear()
  .domain([picsMin, picsMax])
  .range([4, 4 + (picsMax * 0.5)]);

/* Color based on night emotional state
I asked google how to add rgb and the ai answered */
function getMoodColor(mood) {
  if (mood === 1) return "#00BFA5";   // Happy
  if (mood === 2) return "#AEEA00";   // Relax
  if (mood === 3) return "#FFD600";   // Stress
  if (mood === 4) return "#FF9100";   // Anxious
  if (mood === 5) return "#C62828";   // Overwhelmed
}

/* Circles */
let circles = svg.selectAll("circle")
  .data(moodFriendsData)
  .enter()
  .append("circle");

circles
  .attr("r", function (_value, index) {
    return rScale(dailyData[index].picturesTaken);
  })
  .attr("cx", function (value) {
    return xScale(value.x);
  })
  .attr("cy", function (value) {
    return yScale(value.y);
  })
  .attr("fill", function (_value, index) {
    return getMoodColor(dailyData[index].emotionalState.night);
  })
  .attr("opacity", 0.8);

/* Axis numbers */
for (let i = 0; i <= 4; i = i + 1) {
  let xValue = Math.round(xMin + (i * (xMax - xMin) / 4));
  svg.append("text")
    .attr("x", xScale(xValue) + (i === 4 ? 10 : 0))
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .classed("axis-number", true)
    .text(String(xValue));
}

for (let i = 0; i <= 4; i = i + 1) {
  let yValue = Math.round(yMin + (i * (yMax - yMin) / 4));
  svg.append("text")
    .attr("x", margin)
    .attr("y", yScale(yValue) - (i === 4 ? 5 : 0))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "10px")
    .classed("axis-number", true)
    .text(String(yValue));
}

/* Axis labels */
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 1)
  .attr("text-anchor", "middle")
  .classed("axis-label", true)
  .text("Morning emotional state (1 = Happy … 5 = Overwhelmed)");

svg.append("text")
  .attr("x", -svgHeight / 2)
  .attr("y", 5)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("transform", "rotate(-90)")
  .classed("axis-label", true)
  .text("Minutes spent with friends");

svg.append("text")
  .attr("x", margin)
  .attr("y", svgHeight - (margin / 2))
  .attr("text-anchor", "middle")
  .classed("axis-number", true)
  .text("0,0");

/* X and Y axis lines
I tried to find a way to modify this it on the top code, but didnt worked
so I'll be adding new lines on top of those here, like in the exercise we did */
// X axis line
svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", svgWidth - margin)
  .attr("y2", svgHeight - margin)
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Y axis line
svg.append("line")
  .attr("x1", margin)
  .attr("y1", svgHeight - margin)
  .attr("x2", margin)
  .attr("y2", margin)
  .attr("stroke", "black")
  .attr("stroke-width", 1);

/* Legend section (Picture count) */
// I needed to try lots of values to make it worked
let legendX = svgWidth * 0.067;
let legendY = svgHeight * 0.12;

let pictureLegendLabels = ["Fewer pics taken", "More pics taken"];
let pictureLegendRadii = [3, 6];

for (let i = 0; i < 2; i = i + 1) {
  svg.append("circle")
    .attr("r", pictureLegendRadii[i])
    .attr("cx", legendX)
    .attr("cy", legendY + i * 18)
    .attr("fill", "black");

  svg.append("text")
    .text(pictureLegendLabels[i])
    .attr("alignment-baseline", "middle")
    .attr("x", legendX + 12) 
    .attr("y", legendY + i * 19)
    .attr("font-size", "12px")
    .classed("legend-label", true); // added
}

/* Legend title */
svg.append("text")
  .text("Picture count")
  .attr("x", legendX - 4)
  .attr("y", legendY - 12)
  .attr("font-weight", "bold")
  .attr("font-size", "12px")
  .classed("legend-title", true);

/* Mood Legend (Night emotional state) */
let moodLegendX = svgWidth * 0.25;
let moodLegendY = svgHeight * 0.12;

// Labels
let moodLabels = ["Happy", "Relax", "Stress", "Anxious", "Overwhelmed"];

// Circles and labels
for (let i = 0; i < moodLabels.length; i = i + 1) {
  svg.append("circle")
    .attr("r", 6)
    .attr("cx", moodLegendX)
    .attr("cy", moodLegendY + i * 13)
    .attr("fill", getMoodColor(i + 1));

  svg.append("text")
    .text(moodLabels[i])
    .attr("alignment-baseline", "middle")
    .attr("x", moodLegendX + 12)
    .attr("y", moodLegendY + i * 13)
    .attr("font-size", "12px")
    .classed("legend-label", true); // added
}

// Title for mood color
svg.append("text")
  .text("Night Emotional State")
  .attr("x", moodLegendX - 4)
  .attr("y", moodLegendY - 12)
  .attr("font-weight", "bold")
  .attr("font-size", "12px")
  .classed("legend-title", true);

// Box for legend
// Barely fitting with the highest value ;-;
svg.append("rect")
  .attr("x", legendX - 15)
  .attr("y", legendY - 25)
  .attr("width", 240)
  .attr("height", 85)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 1);
