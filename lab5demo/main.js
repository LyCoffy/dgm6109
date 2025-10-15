"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    choice = document.getElementById("choice").value;

    // Clear previous drawing
    svg.selectAll('svg>*').remove(); 

    // Draw the fish
    drawImage();
}

/* Set up the drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = svg.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*
  The function below is called when the user presses "Draw!" 
  It calls your fish() function from fish.js.
*/
function drawImage() {
    // Parameters: svg, x position, y position, origin (false), choice
    fish(svg, xInput, yInput, true, choice);
}