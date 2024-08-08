function refreshWeather(response) {
  let tempElement = document.querySelector("#temp");
  let searchTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(searchTemp);
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
