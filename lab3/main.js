"use strict"

// Attach event listener to the button with id="submit"
document.getElementById("submit")
        .addEventListener("click", function() {

let fahrenheit = document.getElementById("inputF").value;

// User’s choice
    let conversionType = document.getElementById("conversionChoice").value;

let celsius = (fahrenheit - 32) * 5 / 9
let kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;
// * We took out the plus 459.67 cause now we have a conditional value set by the user now,
// * multiplying it later it would result in a really big number, if we look up at the formula
// * for convertion this is exactly how we would get a Farenheit value to Kelvin temperature value *

document.getElementById("output").innerHTML = "";
output("Temperature (fahrenheit): " + fahrenheit)

    if (conversionType === "c") {
        output("Temperature (Celsius): " + celsius);
    }

// *    else {
// *    output("Temperature (Kelvin): " + kelvin);
// *    }   

/* ----------------------------
I chose the conditional if, because it makes more sence and is easier to me to understand 
as to wether is going to be one or the other. At least at the moment to see it inside the code.
With the word else it seems like is doin another different thing.
As a beginner in js it just makes more sense to me to look up at it this way.
------------------------------- */

    if (conversionType === "k") {
        output("Temperature (Kelvin): " + kelvin);
    }

});