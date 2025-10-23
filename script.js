// WEATHER APP

// DOM
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "74660a88f88aee5deebfbb4c3c84ba46";

// EVENT LISTENERS
weatherForm.addEventListener("submit", event => {

    event.preventDefault(); // prevent form from submitting

    const city = cityInput.value; // get city

    // check if city is valid
    if (city) {

    }
    else {
        displayError("Please enter a city!");
    }
});

async function getWeatherData(city) {

}

function displayWeatherInfo(data) {

}

function getWeatherEmoji(weatherId) {

}

function displayError(message) {
    const errorDisplay = document.createElement('p'); // create error display
    errorDisplay.textContent = message; // set error message
    errorDisplay.classList.add('errorDisplay'); // add error display class

    card.textContent = ""; // clear card
    card.style.display = "flex"; // show card
    card.appendChild(errorDisplay); // add error display to card
}