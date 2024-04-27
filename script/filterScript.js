// ==UserScript==
// @name         filterScript
// @namespace    http://tampermonkey.net/
// @version      2024-04-20
// @description  Script that measure the time when filtering table
// @author       Emma S.K
// @match        http://localhost:5173/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.js
// ==/UserScript==

(function() {
    'use strict';

    //variable that holds the number of times the script should be run
    var counter = 100;

    //String that holds the values of the years that has been checked from the checkboxes
    var checkedYears = '';

    //Empty array that will hold the data for the text file
    var filtration = [];

    //Seed
    var seed = 1;

    //Function for the random seed
    Math.seedrandom(seed);

    async function script() {
        for (let i = 0; i < counter; i++) {
            await new Promise((resolve) => {
                setTimeout(async () => {

                    //Uncheck any checked checkboxes
                    await uncheckCheckboxes();

                    //Wait fo page to load
                    await loadPage();

                    //Start time
                    let startTime = performance.timeOrigin + performance.now();

                    //Run function to select checkboxes randomly
                    await selectCheckboxesRandomly();

                    //End time
                    let endTime = performance.timeOrigin + performance.now();

                    // Calculate the result.
                    let result = endTime - startTime;
                    console.log("Result: " + result);

                    //Save the years and time
                    var object = {Years: checkedYears, Time: result};

                    //Push the results to an array
                    filtration.push(object); 

                    // Reset the checkedYears string
                    checkedYears = '';

                    if (i === counter - 1) {
                        saveToTxtFile();
                    }

                    resolve(); // Resolve the promise to proceed to the next iteration
                }, 1000);
            });
        }
    }

    // Function to shuffle an array (Fisher-Yates shuffle algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function selectCheckboxesRandomly() {
        console.log('run')

        // Select all checkboxes created from the same input
        const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
        console.log(checkboxes)

        // Shuffle the array of checkboxes
        const randomizeCheckboxes = shuffleArray(checkboxes);

        // Check the first (whatever number that is chosen, in this case 2) checkboxes from the shuffled array
        for (let i = 0; i < Math.min( randomizeCheckboxes.length, 2); i++) { 
            randomizeCheckboxes[i].click();

            //Puts the value of the checked checkboxes inside a string
            checkedYears += randomizeCheckboxes[i].value + ' ';
        }
    }

    function uncheckCheckboxes() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.click();
            }
        });
    }

    async function loadPage() {
        await new Promise((resolve) => setTimeout(resolve, 200));
    }

    function saveToTxtFile() {
        // Write data to local textfile
        var data = JSON.stringify(filtration, null, "\t");
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "data.txt");
    }

    window.addEventListener('load', function(){
        script();
    });

})();