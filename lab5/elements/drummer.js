"use strict";

/*
    Jingjing Fang Drawing #7 - Drummer
    This function draws a drummer on an SVG canvas.
    svg - the SVG canvas to draw on
    xInput - the x coordinate of the top-left corner of the drummer's hat
    yInput - the y coordinate of the top-left corner of the drummer's hat
    showOrigin - true to show the origin point
    choice - either "drumming" or "resting", determines the pose of the drummer
*/

function drummer(svg, xInput, yInput, showOrigin, choice){
    
    //I chose the drummer's hat as the origin point because it sits at the very top, and the legs below are separated, making it difficult to determine the exact position.//
    //The origin coordinates of the drummer's hat are (75, 35) //

    let drumx = xInput;
    let drumy = yInput;

    /*hcx is Drummer Head x , hcy is Drummer Head y*/

    let hcx = drumx + 20;
    let hcy = drumy + 20;

    /* Draw a Drummer head*/

    svg.append("circle")
        .attr("cx", hcx) // 95 //
        .attr("cy", hcy) // 55 //
        .attr("r", 20)
        .attr("fill", "pink");

    /* Drumer Hat Body*/

    svg.append("rect")
        .attr("x", drumx) // 75 //
        .attr("y", drumy) // 35 //
        .attr("width", 50)
        .attr("height", 15)
        .attr("fill", "blue");

    /* Drummer Hat Brim*/

    svg.append("rect")
        .attr("x", hcx + 30) //125//
        .attr("y", hcy - 10) //45//
        .attr("width", 10)
        .attr("height", 5)
        .attr("fill", "#BFC0FF");

    /* Drum*/

    svg.append("circle")
        .attr("cx", hcx + 50) //145//
        .attr("cy", hcy + 85) //140//
        .attr("r", 45)
        .attr("fill", "white")
        .attr("stroke", "black");

    /* Drummer Body*/

    svg.append("polyline")
        .attr("points", closedPolygon(hcx, hcy + 20, //95,75//
            hcx - 25, hcy + 120, //70,175//
            hcx, hcy + 145, //95,200//
            hcx + 25, hcy + 120, //120,175//
            hcx, hcy + 20)) //95,75//
        .attr("fill", "#737699");

    /* Drummer Left Leg*/

    svg.append("line")
        .attr("x1", hcx - 10) //85//
        .attr("x2", hcx - 50) //45//
        .attr("y1", hcy + 135) //190//
        .attr("y2", hcy + 215) //270//
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Drummer Right Leg*/

    svg.append("line")
        .attr("x1", hcx + 10) //105//
        .attr("x2", hcx + 65) //160//
        .attr("y1", hcy + 135) //190//
        .attr("y2", hcy + 195) //250//
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Drummer Left Foot*/

    svg.append("line")
        .attr("x1", hcx - 50) //45//
        .attr("x2", hcx - 35) //60//
        .attr("y1", hcy + 215) //270//
        .attr("y2", hcy + 220) //275//
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Drummer Right Foot*/

    svg.append("line")
        .attr("x1", hcx + 65) //160//
        .attr("x2", hcx + 80) //175//
        .attr("y1", hcy + 195) //250//
        .attr("y2", hcy + 190) //245//
        .attr("stroke", "black")
        .attr("stroke-width", 1);

// Drummer Arms and Drumstick - conditional on choice parameter //

    if (choice === "drumming") {

        // This is code for the "Drumming" pose//
        /* When "drumming" is selected, the drummer’s arms and drumstick are positioned as if playing.
        When the other option is selected, the arms are lowered and drumstick is at rest.*/

        /* Drumstick*/

        svg.append("circle")
            .attr("cx", hcx - 70) //25//
            .attr("cy", hcy + 35) //90//
            .attr("r", 10)
            .attr("fill", "black");

        /* Drummer Left Upper Arm*/

        svg.append("line")
            .attr("x1", hcx - 5) //90//
            .attr("x2", hcx - 50) //45//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 70) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Left Lower Arm*/

        svg.append("line")
            .attr("x1", hcx - 65) //30//
            .attr("x2", hcx - 50) //45//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 70) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Right Arm*/

        svg.append("line")
            .attr("x1", hcx + 5) //100//
            .attr("x2", hcx + 20) //115//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 50) //105//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

    } else {

        //This is code for the "Resting" pose//
        /* Drumstick*/

        svg.append("circle")
            .attr("cx", hcx - 35) //25//
            .attr("cy", hcy + 130) //90//
            .attr("r", 10)
            .attr("fill", "black");

        /* Drummer Left Upper Arm*/

        svg.append("line")
            .attr("x1", hcx - 5) //90//
            .attr("x2", hcx - 25) //45//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 95) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Left Lower Arm*/

        svg.append("line")
            .attr("x1", hcx - 25) //30//
            .attr("x2", hcx - 35) //45//
            .attr("y1", hcy + 95) //100//
            .attr("y2", hcy + 135) //125//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        /* Drummer Right Arm*/

        svg.append("line")
            .attr("x1", hcx + 5) //100//
            .attr("x2", hcx + 15) //115//
            .attr("y1", hcy + 45) //100//
            .attr("y2", hcy + 55) //105//
            .attr("stroke", "black")
            .attr("stroke-width", 1);

    }
/* Draw origin point*/

    if (showOrigin){
        svg.append("circle")
        .attr("cx",drumx)
        .attr("cy",drumy)
        .attr("r",3)
        .attr("fill","deeppink");
    }
    
    // Return the SVG canvas with the drawn drummer
    return svg;
}