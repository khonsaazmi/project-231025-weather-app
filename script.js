// WEATHER APP

// DOM
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "74660a88f88aee5deebfbb4c3c84ba46";

// EVENT LISTENERS
weatherForm.addEventListener("submit", async event => {

    event.preventDefault(); // prevent form from submitting

    const city = cityInput.value; // get city

    // check if city is valid
    if (city) {
        try {
            const weatherData = await getWeatherData(city); // get weather data
            displayWeatherInfo(weatherData); // display weather info
        }
        catch (error) {
            console.error(error); // log error
            displayError(error.message); // display error
        }
    }
    else {
        displayError("Please enter a city!"); // display error
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl); // fetch weather data

    if (!response.ok) { // check if response is ok  
        throw new Error("Could not fetch weather data"); // throw error
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
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