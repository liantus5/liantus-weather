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
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

let todayDate = document.querySelector("#today-date");
todayDate.innerHTML = formatDate(now);

let weekDay = document.querySelector("#week-day");
weekDay.innerHTML = getWeekDay(now);

let currentTime = document.querySelector("#time");
currentTime.innerHTML = showTime(now);

function search(city) {
  let apiKey = "e443ae2d9c3fd770036c3beff05b41cf";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  cityInput.value = cityInput.value.trim();
  let apiKey = "e443ae2d9c3fd770036c3beff05b41cf";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", showCity);

function getForecast(coordinates) {
  let apiKey = "e443ae2d9c3fd770036c3beff05b41cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsiusTemp = response.data.main.temp;
  let mainTemp = document.querySelector("#big-weather-display");
  mainTemp.innerHTML = `${Math.round(celsiusTemp)}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  getMainIcon(response.data.weather[0].icon);
  getForecast(response.data.coord);
}

function getMainIcon(icon) {
  mainIcon = document.querySelector("#main-icon");

  if (icon === "01n") {
    mainIcon.innerHTML = clearSkyNight;
  }
  if (icon === "01d") {
    mainIcon.innerHTML = clearSky;
  }
  if (icon === "02n") {
    mainIcon.innerHTML = fewCloudsNight;
  }
  if (icon === "02d") {
    mainIcon.innerHTML = fewClouds;
  }
  if (icon === "03n" || icon === "04n" || icon === "03d" || icon === "04d") {
    mainIcon.innerHTML = clouds;
  }
  if (icon === "09n" || icon === "09d") {
    mainIcon.innerHTML = showerRain;
  }
  if (icon === "10n" || icon === "10d") {
    mainIcon.innerHTML = rain;
  }
  if (icon === "11n" || icon === "11d") {
    mainIcon.innerHTML = thunderstorm;
  }
  if (icon === "13n" || icon === "13d") {
    mainIcon.innerHTML = snow;
  }
  if (icon === "50n" || icon === "50d") {
    mainIcon.innerHTML = mist;
  }
}

function handlePosition(position) {
  let apiKey = "e443ae2d9c3fd770036c3beff05b41cf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  convertToCelsius();
}

function showCurrent(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentButton = document.querySelector("#current-position");
currentButton.addEventListener("click", showCurrent);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      if (forecastDay.weather[0].icon === "01d") {
        icon = clearSky;
      }
      if (forecastDay.weather[0].icon === "02d") {
        icon = fewClouds;
      }
      if (
        forecastDay.weather[0].icon === "03d" ||
        forecastDay.weather[0].icon === "04d"
      ) {
        icon = clouds;
      }
      if (forecastDay.weather[0].icon === "09d") {
        icon = showerRain;
      }
      if (forecastDay.weather[0].icon === "10d") {
        icon = rain;
      }
      if (forecastDay.weather[0].icon === "11d") {
        icon = thunderstorm;
      }
      if (forecastDay.weather[0].icon === "13d") {
        icon = snow;
      }
      if (forecastDay.weather[0].icon === "50d") {
        icon = mist;
      }
      forecastHTML =
        forecastHTML +
        `<div class="card forecast one-day"><div class="upcoming-weekday">${formatDay(
          forecastDay.dt
        )}</div>
        <div class="forecast-icon">${icon}</div>
        
          <div class="upcoming-temperature">
            <span class="temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span> <span class="temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
          </div>
        </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

let clearSky = `<i class="fas fa-sun"></i>`;
let clearSkyNight = `<i class="fas fa-moon"></i>`;
let fewClouds = `<i class="fas fa-cloud-sun"></i>`;
let fewCloudsNight = `<i class="fas fa-cloud-moon"></i>`;
let clouds = `<i class="fas fa-cloud"></i>`;
let showerRain = `<i class="fas fa-cloud-showers-heavy"></i>`;
let rain = `<i class="fas fa-cloud-rain"></i>`;
let thunderstorm = `<i class="fas fa-bolt"></i>`;
let snow = `<i class="far fa-snowflake"></i>`;
let mist = `<i class="fas fa-smog"></i>`;

search("Kazan");
