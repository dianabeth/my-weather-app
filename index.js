// Display date and time
function formatTime(timestamp) {
  let date = new Date(timestamp);

  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${formatHours(timestamp)}:${seconds}`;
}

function formatHours(timestamp) {
  let time = new Date(timestamp);

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let dates = new Date(timestamp);

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = days[dates.getDay()];
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  let month = months[dates.getMonth()];
  let today = dates.getDate();
  let year = dates.getFullYear();

  return `${day}, ${today} ${month} ${year}`;
}

//Units conversion
function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  document.querySelector('.temperature').innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add('active');
  fahrenheitLink.classList.remove('active');
  document.querySelector('.temperature').innerHTML = celciusTemperature;
}

//forecast display function
function displayForecast(response) {
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `<div class="col-2">
<h4> <strong> ${formatHours(forecast.dt * 1000)}  </strong></h4>
<img
  src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
alt=""
/>
<div class="forecast-temperature">
  <span class="units"> <strong>${Math.round(forecast.main.temp)}</strong>ºC </span>
</div>
</div>`;
  }
}

//Search-input button click event
function findCity(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input').value;
  document.getElementById('search-input').value = '';
  search(city);
}

//City search
function search(city) {
  let apiKey = '9ceeffa1af88640cb391fac70a848ec9';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//current location function
function showWeather(position) {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showWeather);
}

//Current location search
function currentWeather(response) {
  console.log(response.data);
  celciusTemperature = Math.round(response.data.main.temp);
  document.querySelector('h1').innerHTML = response.data.name;
  document.querySelector('.temperature').innerHTML = celciusTemperature;
  document.querySelector('#description').innerHTML = response.data.weather[0].description;
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
  document.querySelector('#max').innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector('#min').innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector('#date').innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector('#time').innerHTML = formatTime(response.data.dt * 1000);
  document
    .querySelector('#icon')
    .setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

//Quick search navigation bar
function abujaTemp(event) {
  event.preventDefault();
  search('Abuja');
}

function lagostemp(event) {
  event.preventDefault();
  search('Lagos');
}

function lisbonTemp(event) {
  event.preventDefault();
  search('lisbon');
}

function madridTemp(event) {
  event.preventDefault();
  search('madrid');
}

function parisTemp(event) {
  event.preventDefault();
  search('paris');
}

//Temperature
let celciusTemperature = null;

//Event listeners
let button = document.querySelector('#current');
button.addEventListener('click', retrievePosition);

let city = document.querySelector('#search-form');
city.addEventListener('click', findCity);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', displayCelsiusTemp);

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', displayFahrenheitTemp);

let abuja = document.querySelector('#abuja');
abuja.addEventListener('click', abujaTemp);

let lagos = document.querySelector('#lagos');
lagos.addEventListener('click', lagostemp);

let lisbon = document.querySelector('#lisbon');
lisbon.addEventListener('click', lisbonTemp);

let madrid = document.querySelector('#madrid');
madrid.addEventListener('click', madridTemp);

let paris = document.querySelector('#paris');
paris.addEventListener('click', parisTemp);

//Placeholder city temperature
search('Brisbane');
