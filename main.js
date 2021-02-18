const container = document.querySelector(".container");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".description");
const wind = document.querySelector(".windspeed");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const img = document.querySelector(".image");
const feelsLike = document.querySelector(".feelsLike");
const err = document.querySelector(".error");
const body = document.querySelector("body");
const time = document.querySelector(".time");
const searchbox = document.querySelector(".search-box");
const matchList = document.querySelector(".match-list");
const btn = document.querySelector(".sbmBtn");

//----------- DATE --------------//
const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();

// ----------SEARCH BOX --------------//
searchbox.addEventListener("keypress", setQuery);
function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}

// ---------- Render Error --------------//
const renderError = function (msg) {
  err.insertAdjacentText("beforeend", msg);
  err.style.opacity = 1;
};

// -----------LOCATION --------------//
navigator.geolocation.getCurrentPosition(setPosition, showError);
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
function showError() {
  alert("Something went wrong... Check internet connection or enable location");
}

// -----------All data function --------------//
function displayAll(data) {
  city.innerHTML = `${data.location.name}, ${data.location.country}`;
  temp.innerHTML = `${Math.round(data.current.temp_c)}°c`;
  img.innerHTML = `<img src="${data.current.condition.icon}"alt="">`;
  desc.innerHTML = `${data.current.condition.text}`;
  feelsLike.innerHTML = `Feels Like: ${Math.round(data.current.feelslike_c)}°c`;
  wind.innerHTML = `Wind speed: ${data.current.wind_kph} km/h`;
  humidity.innerHTML = `Humidity: ${data.current.humidity} %`;
  pressure.innerHTML = `Pressure: ${data.current.pressure_mb} mbar`;
  date.innerHTML = `${day}/${month}/${year}`;
  time.innerHTML = `${data.location.localtime.slice(11)}`;
}

// ---------- First API CALL ON LOAD PAGE (MY LOCATION) --------------//
function getWeather(latitude, longitude) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=0d44e14b9c7946669e9230312210501&q=${latitude},${longitude}`
  )
    .then(function (responce) {
      let data = responce.json();
      return data;
    })
    .then(function renderPage(data) {
      //---------- All data ----------//
      displayAll(data);
    })
    .catch(err => {
      renderError(`${err.message}... Try again...`);
    });
}

//---------- Second API CALL ON TYPE(QUERY) SHOW RESULTS ----------//
function getResults(query) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=0d44e14b9c7946669e9230312210501&q=${query}`
  )
    .then(function (responce) {
      if (!responce.ok) throw new Error(`City Not found`);
      if (responce.ok) err.style.opacity = 0;
      if (responce.ok) err.innerHTML = ``;
      let data = responce.json();
      return data;
    })
    .then(function displayResults(data) {
      console.log(data);
      //---------- All data ----------//
      displayAll(data);
      //---------- Background Image ----------//
//       displayBackgroung(data);
    })
    .catch(err => {
      renderError(`${err.message}... Try again...`);
    });
}
