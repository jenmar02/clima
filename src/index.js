function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
}

let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);

function changeGreeter() {
  let greeter = document.querySelector(".greeting");
  let date = new Date();
  if (date.getHours() < 13) {
    greeter.innerHTML = `Good Morning!`;
  } else if (date.getHours() < 17 && date.getHours() >= 13) {
    greeter.innerHTML = `Good Afternoon!`;
  } else {
    greeter.innerHTML = `Good Evening!`;
  }
}

function refreshWeather(response) {
  changeGreeter();

  let tempElement = document.querySelector("#temp");
  let searchTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity-element");
  let windSpeed = document.querySelector("#wind-element");
  let timeElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formateDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  tempElement.innerHTML = Math.round(searchTemp);
  icon.innerHTML = ` <img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  getForecast(response.data.city);
}

function formateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "e49t4e467d35faocb8ec3a1644a604fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

/*function changeUnit() {
  let unitSwitch = document.querySelector(".unit-change-buttons");

  if (degFah.value === true) {
    let windUnit = document.querySelector("#wind-unit");
    windUnit.innerHTML = `m/h`;
    return `imperial`;
  } else if (degCel === true) {
    return `metric`;
  } else {
    return `metric`;
  }
}
let degCel = document.querySelector(".celsius-button");
degCel.addEventListener("click", changeUnit);
let degFah = document.querySelector(".fahrenheit-button");
degFah.addEventListener("click", changeUnit);*/

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "e49t4e467d35faocb8ec3a1644a604fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formateDay(day.time)}</div>
              <div><img src="${
                day.condition.icon_url
              }" class="forecast-icon"/></div>
              <div class="forecast-temperature">
                <div class="forecast-temp">
                  <strong>${Math.round(day.temperature.maximum)}°</strong>
                </div>
                <div class="forecast-temp">${Math.round(
                  day.temperature.minimum
                )}°</div>
              </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Austin");
