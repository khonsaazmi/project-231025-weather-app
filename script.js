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
        throw new Error("Error: Could not fetch weather data"); // throw error
    }

    return await response.json();
}

function displayWeatherInfo(data) {

    const {
        name: city, // get city
        main: { temp, humidity }, // get temperature and humidity
        weather: [{ description, id }] } = data; // get description and id

    card.textContent = ""; // clear card
    card.style.display = "flex"; // show card

    const cityDisplay = document.createElement('h1'); // create city display
    const tempDisplay = document.createElement('p'); // create temperature display
    const humidityDisplay = document.createElement('p'); // create humidity display
    const descDisplay = document.createElement('p'); // create description display
    const weatherEmoji = document.createElement('p'); // create weather emoji

    cityDisplay.textContent = city; // set city
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; // set temperature from kelvin to celsius
    humidityDisplay.textContent = `Humidity: ${humidity}%`; // set humidity
    descDisplay.textContent = description; // set description
    weatherEmoji.textContent = getWeatherEmoji(id); // set weather emoji from id

    cityDisplay.classList.add('cityDisplay'); // add city display class
    tempDisplay.classList.add('tempDisplay'); // add temperature display class
    humidityDisplay.classList.add('humidityDisplay'); // add humidity display class
    descDisplay.classList.add('descDisplay'); // add description display class
    weatherEmoji.classList.add('weatherEmoji'); // add weather emoji class

    card.appendChild(cityDisplay); // add city display to card
    card.appendChild(tempDisplay); // add temperature display to card
    card.appendChild(humidityDisplay); // add humidity display to card
    card.appendChild(descDisplay); // add description display to card
    card.appendChild(weatherEmoji); // add weather emoji to card
}

function getWeatherEmoji(weatherId) {

    // get weather emoji from id
    switch (true) {
        case (weatherId >= 200 && weatherId <= 232): // thunderstorm
            return "⛈️";
        case (weatherId >= 300 && weatherId <= 321): // drizzle
            return "🌧️";
        case (weatherId >= 500 && weatherId <= 531): // rain
            return "🌧️";
        case (weatherId >= 600 && weatherId <= 622): // snow
            return "❄️";
        case (weatherId >= 701 && weatherId <= 781): // atmosphere
            return "🌫️";
        case (weatherId === 800): // clear
            return "☀️";
        case (weatherId >= 801 && weatherId <= 804): // clouds
            return "☁️";
        default:
            return "❓"; // unknown weather
    }
}

function displayError(message) {
    const errorDisplay = document.createElement('p'); // create error display
    errorDisplay.textContent = message; // set error message
    errorDisplay.classList.add('errorDisplay'); // add error display class

    card.textContent = ""; // clear card
    card.style.display = "flex"; // show card
    card.appendChild(errorDisplay); // add error display to card
}