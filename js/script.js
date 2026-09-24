const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = 'c023f9b020e94078906e319fddbe799d';

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError('Please enter a city');
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not fetch weather data');
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ main, description, icon }],
  } = data;

  const cityDisplay = document.querySelector('.cityDisplay');
  const tempDisplay = document.querySelector('.tempDisplay');
  const humidityDisplay = document.querySelector('.humidityDisplay');
  const weatherDisplay = document.querySelector('.weatherDisplay');
  const descDisplay = document.querySelector('.descDisplay');
  const weatherEmoji = document.querySelector('.weatherEmoji');

  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temperature: ${temp}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  weatherDisplay.textContent = `Weather: ${main}`;
  descDisplay.textContent = `Description: ${description}`;
  weatherEmoji.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  card.style.display = 'flex';
}

function displayError(msg) {
  const errorDisplay = document.querySelector('.errorDisplay');

  card.style.display = 'none';
  errorDisplay.textContent = msg;
  errorDisplay.style.display = 'block';
}
