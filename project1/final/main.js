"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);

    choice = document.getElementById("choice").value;
    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

/* set up the drawing canvas - Be sure not to copy this code from your draft project! */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*
The function below is called when the user presses the "Draw!" button and is where you will put most of your drawing code. Please follow the instructions in the homework PDF for this step.
*/
function drawImage() {

    let fishX = xInput;
    let fishY = yInput;

    /* Fish Tail */
let fishTail = drawing.append("polyline")
    .attr("points", closedPolygon(
        75 + fishX,125 + fishY,   // middle connection to body
        14 + fishX,75 + fishY,    // upper fin point
        15 + fishX,175 + fishY    // lower fin point
    ))
    .attr("fill", "rgb(176,162,215");

    /* Fish Body (ellipse) */  /// ORIGIN POINT: I chose this one because is the center of the fish ///
let fishBody = drawing.append("ellipse")
    .attr("cx", (75 + 50) + fishX)
    .attr("cy", (75 + 50) + fishY)
    .attr("rx", 50)   // horizontal radius
    .attr("ry", 50)   // vertical radius
    .attr("fill", "rgb(200,234,242)");

/* Fish Body (square) */
let fishRectangle = drawing.append("rect")
    .attr("x", 120 + fishX)       
    .attr("y", 75 + fishY)   // y position (upper-left corner)
    .attr("width", 55)       // side length
    .attr("height", 100)     // same as width → square
    .attr("fill", "rgb(200,234,242)"); 

/* Fish Upper Fin. */
let fishUpperFin = drawing.append("polyline")
    .attr("points", closedPolygon(
        120 + fishX,75 + fishY,   // body connection
        85 + fishX,30 + fishY,    // outer point
        175 + fishX,75 + fishY    // back to body
    ))
    .attr("fill", "rgb(176,162,215)");

/* Fish Lower Fin */
let fishLowerFin = drawing.append("polyline")
    .attr("points", closedPolygon(
        120 + fishX,175 + fishY,   // body connection
        115 + fishX,200 + fishY,   // outer point
        175 + fishX,175 + fishY    // back to body
    ))
    .attr("fill", "rgb(176,162,215)");

/* Fish Head */
let fishHead = drawing.append("polyline")
    .attr("points", closedPolygon(
        175 + fishX,75 + fishY,   // top connection
        275 + fishX,125 + fishY,   // middle connection
        175 + fishX,175 + fishY    // bottom connection
    ))
    .attr("fill", "rgb(200,234,242)");

/* Fish Decor - Top Triangle */
let fishTriangleTop = drawing.append("polyline")
    .attr("points", closedPolygon(
        175 + fishX,75 + fishY,    // top connection
        125 + fishX,100 + fishY,   // middle connection
        175 + fishX,125 + fishY    // bottom connection
    ))
    .attr("fill", "rgb(140,202,231)");

/* Fish Decor - Bottom Triangle */
let fishTriangleBottom = drawing.append("polyline")
    .attr("points", closedPolygon(
        175 + fishX,125 + fishY,    // top connection
        125 + fishX,150 + fishY,    // middle connection
        175 + fishX,175 + fishY     // bottom connection
    ))
    .attr("fill", "rgb(140,202,231)");

/* Fish Decor - Head Triangle */
let fishTriangleHead = drawing.append("polyline")
    .attr("points", closedPolygon(
        225 + fishX,100 + fishY,    // top connection
        175 + fishX,125 + fishY,    // middle connection
        225 + fishX,150 + fishY     // bottom connection
    ))
    .attr("fill", "rgb(111,157,211)");

/* Fish Decor - Body Diamond */
let fishDiamond = drawing.append("polyline")
    .attr("points", closedPolygon(
        125 + fishX, 100 + fishY, // top
        175 + fishX, 125 + fishY, // right
        125 + fishX, 150 + fishY, // bottom
        75 + fishX, 125 + fishY  // left
    ))
    .attr("fill", "rgb(111,157,211)");

/* Fish Eye */
let fishEye = drawing.append("circle")
    .attr("cx", 245 + fishX)
    .attr("cy", 120 + fishY)
    .attr("r", 5)
    .attr("fill", "rgb(26,42,73)");
    

 /* Fish Mouth */
    if (choice == "Bubbles") {
let fishOpenMouth = drawing.append("polyline")
    .attr("points", closedPolygon(
        255 + fishX,125 + fishY,   // top connection
        275 + fishX,135 + fishY,   // middle connection
        240 + fishX,135 + fishY    // bottom connection
    ))
    .attr("fill", "rgb(200,234,242");

/* Fish Small Bubble */
let fishSmallBubble = drawing.append("ellipse")
    .attr("cx", (235 + 50) + fishX)
    .attr("cy", (65 + 50) + fishY)
    .attr("rx", 5)   // horizontal radius
    .attr("ry", 5)   // vertical radius
    .attr("fill", "rgb(215, 248, 255)");

 /* Fish Middle Bubble*/
let fishMiddleBubble = drawing.append("ellipse")
    .attr("cx", (220 + 50) + fishX)
    .attr("cy", (45 + 50) + fishY)
    .attr("rx", 8)   // horizontal radius
    .attr("ry", 8)   // vertical radius
    .attr("fill", "rgb(228, 247, 251)");

 /* Fish Large Bubble */
let fishLargeBubble = drawing.append("ellipse")
    .attr("cx", (235 + 50) + fishX)
    .attr("cy", (15 + 50) + fishY)
    .attr("rx", 12)   // horizontal radius
    .attr("ry", 12)   // vertical radius
    .attr("fill", "rgb(235, 249, 251)");

    }

    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
