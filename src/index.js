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
  tempElement.innerHTML = Math.round(searchTemp);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = formateDate(date);

  icon.innerHTML = ` <img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"
              />`;
}

function formateDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Austin");
