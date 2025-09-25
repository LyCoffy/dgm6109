"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Variables to move the fish */    
let fishX = 100; // horizontal offset
let fishY = 125; // vertical offset

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

/* Fish Tail */
let fishTail = drawing.append("polyline")
    .attr("points", closedPolygon(
        75 + fishX,125 + fishY,   // middle connection to body
        14 + fishX,75 + fishY,    // upper fin point
        15 + fishX,175 + fishY    // lower fin point
    ))
    .attr("fill", "rgb(176,162,215");

/* Fish Body (ellipse) */
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