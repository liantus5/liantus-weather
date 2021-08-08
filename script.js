let now = new Date();

function formatDate(receivedDate) {
  let year = receivedDate.getFullYear();
  let months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  let month = months[receivedDate.getMonth()];
  let date = receivedDate.getDate();
  return `${month} ${date}, ${year}`;
}
function getWeekDay(weekDay) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[weekDay.getDay()];
  return day;
}

function showTime(currentTime) {
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;}
    return `${hour}:${minutes}`;
  
}

let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = formatDate(now);

let weekDay = document.querySelector("#week-day");
weekDay.innerHTML = getWeekDay(now);

let currentTime = document.querySelector("#time");
currentTime.innerHTML = showTime(now);

let apiKey = "e443ae2d9c3fd770036c3beff05b41cf";
let city = `KAZAN`;
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(url).then(showWeather);

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  cityInput.value = cityInput.value.trim();
  let apiKey = "e443ae2d9c3fd770036c3beff05b41cf";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", showCity);

function showWeather(response) {
  let mainTemp = document.querySelector("#big-weather-display");
  mainTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  console.log(response);
}

function handlePosition(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let apiKey = "e443ae2d9c3fd770036c3beff05b41cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function showCurrent(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-position");
currentButton.addEventListener("click", showCurrent);