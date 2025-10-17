"use strict"

/* 
Gabriela Sanchez Drawing #3 Elephant 
This function draws an Elephant on the svg canvas
svg - The svg drawing area for the elephant 
originElephantx - The horizontal position of the elephant's origin point
originElephanty - The vertical position of the elephant's origin point
showOrigin - Boolean value to show a pink dot at the origin point if true 
glassesChoice - String "on or of" to draw glasses on the elephant

return - the svg element with the elephant draw on it 
*/

function elephant(svg, originElephantx, originElephanty, showOrigin, glassesChoice) {

    let elephantx = originElephantx;
    let elephanty = originElephanty;

    let elephantHeadcx = elephantx;
    let elephantHeadcy = elephanty - 85;


    /*Drawing Elephant*/
    /*Elephnat Ears*/
    /*Elephnat Ears top part*/
    let elephantEarsTopLeft = svg.append("circle")
        .attr("cx", elephantHeadcx - 65)
        .attr("cy", elephantHeadcy - 5)
        .attr("r", 35.5)
        .attr("fill", "#DBDBDB");

    let elephantEarsTopRight = svg.append("circle")
        .attr("cx", elephantHeadcx + 115)
        .attr("cy", elephantHeadcy - 5)
        .attr("r", 35.5)
        .attr("fill", "#DBDBDB");

    /*Elephnat Ears bottom part*/
    let elephantEarsBottomLeft = svg.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx - 100, elephantHeadcy + 5,
            elephantHeadcx - 50, elephantHeadcy - 35,
            elephantHeadcx - 50, elephantHeadcy + 85))
        .attr("fill", "#DBDBDB");

    let elephantEarsBottomRight = svg.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx + 150, elephantHeadcy + 5,
            elephantHeadcx + 100, elephantHeadcy - 35,
            elephantHeadcx + 100, elephantHeadcy + 85))
        .attr("fill", "#DBDBDB");

    /*Elephant fangs*/
    let elephantFangsLeft = svg.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx - 50, elephantHeadcy + 30,
            elephantHeadcx - 25, elephantHeadcy + 45,
            elephantHeadcx - 25, elephantHeadcy + 85))
        .attr("fill", "#E6E6B8");

    let elephantFangsRight = svg.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx + 100, elephantHeadcy + 30,
            elephantHeadcx + 75, elephantHeadcy + 45,
            elephantHeadcx + 75, elephantHeadcy + 85))
        .attr("fill", "#E6E6B8");

    /* Elephant head */
    /* Elephant head top */
    let elephantHeadLeft = svg.append("circle")
        .attr("cx", elephantHeadcx - 10)
        .attr("cy", elephantHeadcy)
        .attr("r", 50)
        .attr("fill", "#A1A1A1");

    let elephantHeadRight = svg.append("circle")
        .attr("cx", elephantHeadcx + 60)
        .attr("cy", elephantHeadcy)
        .attr("r", 50)
        .attr("fill", "#A1A1A1");

    /* Elephant head bottom */
    let elephantHeadBottom = svg.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx - 60, elephantHeadcy,
            elephantHeadcx + 110, elephantHeadcy,
            elephantHeadcx + 25, elephantHeadcy + 120))
        .attr("fill", "#A1A1A1");

    /* Elephant eyes */
    /* Elephant eyes out */
    let elephantEyeOutLeft = svg.append("ellipse")
        .attr("cx", elephantHeadcx - 5)
        .attr("cy", elephantHeadcy + 5)
        .attr("rx", 15)
        .attr("ry", 25)
        .attr("fill", "white");

    let elephantEyeOutRight = svg.append("ellipse")
        .attr("cx", elephantHeadcx + 55)
        .attr("cy", elephantHeadcy + 5)
        .attr("rx", 15)
        .attr("ry", 25)
        .attr("fill", "white");

    /* Elephant eyes in or pupil*/
    let elephantEyeInLeft = svg.append("circle")
        .attr("cx", elephantHeadcx - 5)
        .attr("cy", elephantHeadcy + 15)
        .attr("r", 10)
        .attr("fill", "black");

    let elephantEyeInRight = svg.append("circle")
        .attr("cx", elephantHeadcx + 55)
        .attr("cy", elephantHeadcy + 15)
        .attr("r", 10)
        .attr("fill", "black");

    /* Elephant Trunk */
    /* Elephant Trunk Base */
    let elephantTrunkBase = svg.append("rect")
        .attr("x", elephantx)
        .attr("y", elephanty)
        .attr("width", 50)
        .attr("height", 75)
        .attr("fill", "#A1A1A1");

    /* Elephant Trunk Wrinkles */
    let elephantTrunk1Wrinkle = svg.append("line")
        .attr("x1", elephantHeadcx)
        .attr("x2", elephantHeadcx + 50)
        .attr("y1", elephantHeadcy + 90)
        .attr("y2", elephantHeadcy + 100)
        .attr("stroke", "black")
        .attr("stroke-weight", 1);

    let elephantTrunk2Wrinkle = svg.append("line")
        .attr("x1", elephantHeadcx)
        .attr("x2", elephantHeadcx + 50)
        .attr("y1", elephantHeadcy + 115)
        .attr("y2", elephantHeadcy + 115)
        .attr("stroke", "black")
        .attr("stroke-weight", 1);

    let elephantTrunk3Wrinkle = svg.append("line")
        .attr("x1", elephantHeadcx)
        .attr("x2", elephantHeadcx + 50)
        .attr("y1", elephantHeadcy + 140)
        .attr("y2", elephantHeadcy + 130)
        .attr("stroke", "black")
        .attr("stroke-weight", 1);

    //with this when you select yes for glasses they appear and when you put no they disappear
    if (glassesChoice == "on") {
        // Sunglasses Middle
        let sunglassesMiddle = svg.append("line")
            .attr("x1", elephantHeadcx + 15)
            .attr("y1", elephantHeadcy + 15)
            .attr("x2", elephantHeadcx + 35)
            .attr("y2", elephantHeadcy + 15)
            .attr("stroke", "black")
            .attr("stroke-width", 5);

        // Sunglasses Left Leg
        let sunglassesLegLeft = svg.append("line")
            .attr("x1", elephantHeadcx - 60)
            .attr("y1", elephantHeadcy + 5)
            .attr("x2", elephantHeadcx - 35)
            .attr("y2", elephantHeadcy + 15)
            .attr("stroke", "black")
            .attr("stroke-width", 5);

        // Sunglasses Right Leg
        let sunglassesLegRight = svg.append("line")
            .attr("x1", elephantHeadcx + 85)
            .attr("y1", elephantHeadcy + 15)
            .attr("x2", elephantHeadcx + 110)
            .attr("y2", elephantHeadcy + 5)
            .attr("stroke", "black")
            .attr("stroke-width", 5);

        // Sunglasses Middle Left
        let sunglassesLeft = svg.append("circle")
            .attr("cx", elephantHeadcx - 10)
            .attr("cy", elephantHeadcy + 15)
            .attr("r", 25)
            .attr("opacity", 0.5)
            .attr("fill", "#a85817ff");

        // Sunglasses Right
        let sunglassesRight = svg.append("circle")
            .attr("cx", elephantHeadcx + 60)
            .attr("cy", elephantHeadcy + 15)
            .attr("r", 25)
            .attr("opacity", 0.5)
            .attr("fill", "#a85817ff");
    }
    /* Origin Point following the trunk */
    if(showOrigin){
        svg.append("circle")
        .attr("cx", elephantx)
        .attr("cy", elephanty)
        .attr("r", 3)
        .attr("fill", "deeppink");
    }
    return svg;
}

