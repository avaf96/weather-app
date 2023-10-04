// global variables
let apiKey = "b88bf542c765dd6636e18de839741a48";
let city = "Shiraz";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
let celDegree = 0;
let celDegreeRounded = 0;
// let farDegree = 0;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
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
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  // console.log(response);
  let forecast_div = document.querySelector("#forecast");
  let days_objs = response.data.daily;
  let forcastHTML = "";
  days_objs.forEach(function (dayObj, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col text-center">
        <p class="week-day text-secondary m-0">${formatDay(dayObj.dt)}</p>
        <img
          width="36"
          src="https://openweathermap.org/img/wn/${
            dayObj.weather[0].icon
          }@2x.png"
          alt="weather-condition"
        />
        <p class="m-0">
          <span class="max-degree text-dark">${Math.round(
            dayObj.temp.max
          )}°</span>
          <span class="min-degree text-secondary">${Math.round(
            dayObj.temp.min
          )}°</span>
        </p>
      </div>`;
    }
  });

  forecast_div.innerHTML = forcastHTML;
}

function getForecast(coordinates) {
  // console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weatherApiCall(response) {
  // console.log(response);
  let cityName = document.querySelector(".city-name");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let weatherdesc = document.querySelector(".weather-desc");
  let degreeH1 = document.querySelector(".degree-h1");
  let icon_img = document.querySelector(".today-icon");
  let todaySec = document.querySelector(".today-sec");

  celDegree = response.data.main.temp;
  // farDegree = Math.round(celDegree * (9 / 5) + 32);
  celDegreeRounded = Math.round(celDegree);

  cityName.innerHTML = response.data.name;
  weatherdesc.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  wind.innerHTML = "Wind: " + response.data.wind.speed + " meter/sec";
  degreeH1.innerHTML = celDegreeRounded;
  todaySec.innerHTML = formatDate(response.data.dt);
  let icon_url = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  icon_img.setAttribute("src", icon_url);
  getForecast(response.data.coord);
}
axios.get(apiUrl).then(weatherApiCall);

// search btn
let searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let cityInp = document.querySelector(".city-input");
  if (cityInp.value) {
    city = cityInp.value;
  }
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherApiCall);
});

// current location
// let lat = 0;
// let lon = 0;
// navigator.geolocation.getCurrentPosition(function (position) {
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
// });

// current btn
// let currentBtn = document.querySelector(".current-btn");
// currentBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//   axios.get(apiUrl).then(weatherApiCall);
// });

// cel to far degree
// let celDegBtn = document.querySelector(".cel-degree");
// let farDegBtn = document.querySelector(".far-degree");
// celDegBtn.addEventListener("click", function () {
//   degreeH1.innerHTML = celDegreeRounded;
//   celDegBtn.classList.add("active");
//   celDegBtn.classList.remove("deactive");
//   farDegBtn.classList.add("deactive");
//   farDegBtn.classList.remove("active");
// });
// farDegBtn.addEventListener("click", function () {
//   degreeH1.innerHTML = farDegree;
//   farDegBtn.classList.add("active");
//   farDegBtn.classList.remove("deactive");
//   celDegBtn.classList.add("deactive");
//   celDegBtn.classList.remove("active");
// });
