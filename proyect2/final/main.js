"use strict"

/* Global Variables */
let bankRoutingNumber = "";
let transactionType = "";
let transactionLocation = "";


/* 
    Hide location field unless "Local Deposit" is chosen
   Chatgpt help me with this, i got the idea to hide and display the "Location Option"
   and display only when u select Local Deposit, cause i was getting a little bit confuse, 
   and when I was able to understand the logic I thought of this.
   I realize later it was a bonus optional. 
*/

const transactionTypeSelect = document.getElementById("transactionType");
const locationOption = document.getElementById("locationOption");

// Hides location dropdown at page load
locationOption.style.display = "none";

// Show/hide location dropdown dynamically
transactionTypeSelect.addEventListener("change", function () {
    if (this.value === "LD") {
        locationOption.style.display = "block";
    } else {
        locationOption.style.display = "none";
    }
});


/* Event Listeners */

document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden");
    document.getElementById("reset").toggleAttribute("hidden");
});


/* Function: processForm()
   - Gets information from form
   - Calls validateData()
   - If valid, calls processData() */

function processForm() {

    // Form values
    bankRoutingNumber = document.getElementById("BankRoutingNumber").value.trim();
    transactionType = document.getElementById("transactionType").value;
    transactionLocation = document.getElementById("transactionLocation").value;

    let evaluationCompleted = false;

    // I wanted to clean the errors every time we hit the button
    clear(); 
    if (validateData()) {
        evaluationCompleted = processData();
    }

    if (evaluationCompleted) {
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    } else {
        rule();
    }
}

/* Function: validateData()
   - Validates form inputs (simple logic, no regex)
   - Returns true if valid, false if not */

function validateData() {
    let valid = true;

    // 1. Check that routing number has exactly 9 digits
    if (bankRoutingNumber.length !== 9) {
        output("⚠️ Insert a 9-digit routing number.");
        valid = false;
    } 
    // Also check that it's all numbers
    if (isNaN(bankRoutingNumber)) {
        output("⚠️ Routing number must contain only numbers.");
        valid = false;
    }

    // 2. Check that a transaction type was selected
    if (transactionType === "") {
        output("⚠️ Select a transaction type.");
        valid = false;
    }

    // 3. If Local Deposit, check that location was selected
    if (transactionType === "LD" && transactionLocation === "") {
        output("⚠️ Select a transaction location.");
        valid = false;
    }

    return valid;
}


/* Function: processData()
   - Checks routing number conditionals */

function processData() {

    // --- Treasury Check ---
    if (transactionType === "TC") {
        if (bankRoutingNumber !== "000000518") {
            output("❌ The routing number is incorrect for this type of transaction.");
            return false;
        }
    }

    // --- Money Order ---
    else if (transactionType === "MO") {
        if (bankRoutingNumber !== "000000204" &&
            bankRoutingNumber !== "000001193" &&
            bankRoutingNumber !== "000008002") {
            output("❌ The routing number is incorrect for this type of transaction.");
            return false;
        }
    }

    // --- Savings Bond ---
    else if (transactionType === "SB") {
        if (bankRoutingNumber !== "000090007") {
            output("❌ The routing number is incorrect for this type of transaction.");
            return false;
        }
    }

    // --- Local Deposit ---
    else if (transactionType === "LD") {
        let prefix = bankRoutingNumber.substring(0, 4); // get first 4 digits

        // Cleveland
        if (transactionLocation === "Cleveland") {
            let validClevelandNumbers = ["0410", "0412"];
            if (prefix !== validClevelandNumbers[0] && prefix !== validClevelandNumbers[1]) {
                output("❌ Incorrect routing number for Cleveland local deposits.");
                return false;
            }
        }

        // Peoria
        else if (transactionLocation === "Peoria") {
            let validPeoriaNumbers = ["0711"];
            if (prefix !== validPeoriaNumbers[0]) {
                output("❌ Incorrect routing number for Peoria local deposits.");
                return false;
            }
        }

        // Chicago
        else if (transactionLocation === "Chicago") {
            let validChicagoNumbers = ["0710", "0712", "0719"];
            if (prefix !== validChicagoNumbers[0] &&
                prefix !== validChicagoNumbers[1] &&
                prefix !== validChicagoNumbers[2]) {
                output("❌ Incorrect routing number for Chicago local deposits.");
                return false;
            }
        }
    }

    /* 
       abc|abc|abc routing number separation and sum:
       I needed to look up a way to start with this, diferent sources, 
       but ended up trying the simplest way I could come up with and asking for help to chatgpt.
       I divided the 9 digits routing number into 3 groups of 3 digits each,
       add the digits inside each group, and padding (adding a 0 to numbers below 10) 
       each sum being 2 digits. Then joined them together for output.
    */

    let group1 = bankRoutingNumber.substring(0, 3);
    let group2 = bankRoutingNumber.substring(3, 6);
    let group3 = bankRoutingNumber.substring(6, 9);

    let sum1 = Number(group1[0]) + Number(group1[1]) + Number(group1[2]);
    let sum2 = Number(group2[0]) + Number(group2[1]) + Number(group2[2]);
    let sum3 = Number(group3[0]) + Number(group3[1]) + Number(group3[2]);

    // Pad each to 2 digits
    if (sum1 < 10) sum1 = "0" + sum1;
    if (sum2 < 10) sum2 = "0" + sum2;
    if (sum3 < 10) sum3 = "0" + sum3;

    let confirmationCode = String(sum1) + String(sum2) + String(sum3);

    /* 
       Partial Routing Number View:
       Replace first 5 digits with XXXX-X, keeping digits 6–8, add a dash, then the 9th digit.
       Using a substring to only the take the numbers that were asked for.
    */
    let xxxxRouting = "XXXX-X" + bankRoutingNumber.substring(5, 8) + "-" + bankRoutingNumber.substring(8, 9);

    /* 
       Confirmation Message
       Shows Transaction type, place (if stablished), last digits of routing and confirmation code.
    */

    // Convert transaction codes to full names for clarity.
    // Chatgpt help me to change this from the two letter variables I set, which is good cause I always
    // messed up the names while changing or adding them
    let transactionFullName = "";
    if (transactionType === "TC") transactionFullName = "Treasury Check";
    else if (transactionType === "MO") transactionFullName = "Money Order";
    else if (transactionType === "SB") transactionFullName = "Savings Bond";
    else if (transactionType === "LD") transactionFullName = "Local Deposit";

    // Using the same logic thoughout the code I added this part, if it's a Local Deposit 
    // include the location. Otherwise, next.
    let message = "";

    if (transactionType === "LD") {
        message = "Your " + transactionFullName + " transaction has been initiated at our branch in " +
                transactionLocation + " using routing number " + xxxxRouting +
                ". Your confirmation code is " + confirmationCode + ".";
    } else {
        message = "Your " + transactionFullName + " transaction has been initiated using routing number " +
                xxxxRouting + ". Your confirmation code is " + confirmationCode + ".";
    }

    output("✅ Transaction confirmed successfully!");
    output(message);

    return true;
}
