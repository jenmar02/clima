function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  let cityElement = document.querySelector("#weather-city");
  cityElement.innerHTML = searchInput.value;

  //call API
  //search for the city
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);
