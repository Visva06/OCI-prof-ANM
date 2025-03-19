// Your OpenWeatherMap API Key
const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('city');
const weatherInfoDiv = document.getElementById('weatherInfo');

// Event listener for the Get Weather button
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found!');
        } else {
            displayWeatherData(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

// Function to display weather data on the page
function displayWeatherData(data) {
    const { name, main, weather, wind } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];
    const { speed } = wind;

    // Displaying weather information
    weatherInfoDiv.style.display = 'block';
    weatherInfoDiv.innerHTML = `
        <h3>Weather in ${name}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${speed} m/s</p>
        <p>Description: ${description}</p>
    `;
}
