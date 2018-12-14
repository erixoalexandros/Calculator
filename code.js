"use strict";

var display = document.getElementById('display'),
    board = document.getElementById('board'),
    formula = []; // Hold the formula to evaluate (calculate)

board.addEventListener('click', function(e) {

    var key = e.target;

    // IF CLEAR IS PRESSED

    if (key.value === 'c') { // Clear display
        formula = [];
        display.textContent = '0';

        // IF A NUMBER IS PRESSED  

    } else if (key.classList.contains('number')) { // Print numbers
        if (formula.length === 0) { // Check if formula is empty
            if (key.value === '0') { // IF ZERO IS PRESSED
                formula = [];
                display.textContent = display.textContent = '0';

            } else {
                formula.push(key.value);
                display.textContent = formula.join("");
            }

        } else { //Create a new number after an operator
            if (formula[formula.length - 1] === '/' || formula[formula.length - 1] === '*' ||
                formula[formula.length - 1] === '-' || formula[formula.length - 1] === '+') {
                formula.push(key.value);
                display.textContent = formula.join("");

            } else {
                formula[formula.length - 1] = formula[formula.length - 1] + key.value;
                display.textContent = formula.join("");
            }
        }

        // IF COMMA IS PRESSED 

    } else if (key.value === '.') { // In case a comma (".") is pressed
        if (formula.length === 0) { // Add a 0 before a comma.
            formula.push('0.');
            display.textContent = formula.join("");
            // Avoid 2 commas in the same number
        } else if (formula[formula.length - 1].indexOf('.') > -1 || formula[formula.length - 1] === '/' || formula[formula.length - 1] === '*' || formula[formula.length - 1] === '-' || formula[formula.length - 1] === '+') {
            display.textContent = formula.join("");

        } else {
            formula[formula.length - 1] = formula[formula.length - 1] + key.value; //Print a comma
            display.textContent = formula.join("");
        }

        // IF AN OPERATOR IS PRESSED 

    } else if (key.classList.contains('operator')) { // Print an operator
        // Do nothing if can't find a number before
        if (formula.length === 0) {
            display.textContent = '0';

        } else if (formula[formula.length - 1].endsWith('.') || formula[formula.length - 1].endsWith('/') || formula[formula.length - 1].endsWith('*') || formula[formula.length - 1].endsWith('-') || formula[formula.length - 1].endsWith('+')) {
            display.textContent = formula.join("");

        } else {
            formula.push(key.value);
            display.textContent = formula.join("");
        }

        // IF EQUAL IS PRESSED 

    } else if (key.value === '=') { // Calculate the formula on totalString
        if (formula.length > 0) {
            var result = eval(formula.join("")); // Calculate, avoid more than 12 digits and convert it to an string
            if (result.toString().length > 12) {
                result = result.toPrecision(12);
                display.textContent = result.toString();
                formula = [];
                formula.push(result.toString());

            } else {
                display.textContent = result.toString();
                formula = [];
                formula.push(result.toString());
            }
        } else {
            display.textContent = '0';
        }


        // IF DELETE IS PRESSED 

    } else if (key.value === 'del') { // Delete the last character
        if (formula.length > 0) { // Check if there at least 1 character
            if (formula[formula.length - 1].length > 1) {
                formula[formula.length - 1] = formula[formula.length - 1].slice(0, formula[formula.length - 1].length - 1); // Delete the last character
                display.textContent = formula.join("");

            } else if (formula[formula.length - 1].length === 1) {
                if (formula.length === 1) {
                    formula.pop();
                    display.textContent = '0';

                } else if (formula[formula.length - 1] === '/' || formula[formula.length - 1] === '*' || formula[formula.length - 1] === '-' || formula[formula.length - 1] === '+') {
                    formula.pop();
                    display.textContent = formula.join("");

                } else {
                    formula.pop();
                    display.textContent = formula.join("");
                }
            }

        } else {
            display.textContent = '0';
        }

    }

});