// Display date and time
let date = new Date();

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let today = days[date.getDay()];
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let month = months[date.getMonth()];
let todaysDate = date.getDate();
let year = date.getFullYear();
let hours = ('0' + date.getHours()).slice(-2);
let minutes = ('0' + date.getMinutes()).slice(-2);
let seconds = ('0' + date.getSeconds()).slice(-2);
let updatedDate = document.querySelector('#date');
let updatedTime = document.querySelector('#time');
updatedDate.innerHTML = `${today}, ${month} ${todaysDate}, ${year}`;

updatedTime.innerHTML = `${hours}:${minutes}:${seconds}`;

//Current location search
function currentWeather(response) {
  document.querySelector('h1').innerHTML = response.data.name;
  document.querySelector('.temperature').innerHTML = Math.round(response.data.main.temp);
  document.querySelector('#description').innerHTML = response.data.weather[0].description;
  document.querySelector('#humidity').innerHTML = response.data.main.humidity;
  document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
  document.querySelector('#max').innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector('#min').innerHTML = Math.round(response.data.main.temp_min);
  console.log(response.data);
}

//City search
function search(city) {
  let apiKey = '9ceeffa1af88640cb391fac70a848ec9';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentWeather);
}

//Search-input button click event
function findCity(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input').value;
  document.getElementById('search-input').value = '';
  search(city);
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

//Quick search navigation bar
function abujaTemp(event) {
  event.preventDefault();
  search('Abuja');
}

function lagostemp(event) {
  search('Lagos');
}

function lisbonTemp(event) {
  search('lisbon');
}

function madridTemp(event) {
  search('madrid');
}

function parisTemp(event) {
  search('paris');
}

//Event listeners
let button = document.querySelector('#current');
button.addEventListener('click', retrievePosition);

let city = document.querySelector('#search-form');
city.addEventListener('click', findCity);

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
search('Copenhagen');
