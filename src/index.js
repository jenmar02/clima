function refreshWeather(response) {
  let tempElement = document.querySelector("#temp");
  let searchTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity-element");
  let windSpeed = document.querySelector("#wind-element");
  let timeElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);

  console.log(response.data.time);
  console.log(date.getMinutes());

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(searchTemp);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = formateDate(date);
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(refreshWeather);
}
function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Austin");
