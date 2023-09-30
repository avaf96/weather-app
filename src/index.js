// default date
let todaySec = document.querySelector(".today-sec");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = `${now.getHours()}:${now.getMinutes()}`;
todaySec.innerHTML = day + " " + time;

function displayForecast() {
  let forecast_div = document.querySelector("#forecast");
  forecast_div.innerHTML = `
    <div class="col text-center">
      <p class="week-day text-secondary m-0">Tue</p>
      <img
        width="36"
        src="https://openweathermap.org/img/wn/01d@2x.png"
        alt="weather-condition"
      />
      <p class="m-0">
        <span class="max-degree text-dark">30°</span>
        <span class="min-degree text-secondary">20°</span>
      </p>
    </div>`;
}

// variables
let cityName = document.querySelector(".city-name");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let weatherdesc = document.querySelector(".weather-desc");
let degreeH1 = document.querySelector(".degree-h1");
let icon_img = document.querySelector(".today-icon");
let celDegree = 0;
let celDegreeRounded = 0;
let farDegree = 0;

// default city
let apiKey = "b88bf542c765dd6636e18de839741a48";
let city = "Shiraz";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(function (response) {
  console.log(response);
  cityName.innerHTML = response.data.name;
  weatherdesc.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  wind.innerHTML = "Wind: " + response.data.wind.speed + " meter/sec";
  celDegree = response.data.main.temp;
  farDegree = Math.round(celDegree * (9 / 5) + 32);
  celDegreeRounded = Math.round(celDegree);
  degreeH1.innerHTML = celDegreeRounded;
  let icon_code = response.data.weather[0].icon;
  let icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
  icon_img.setAttribute("src", icon_url);
});

// search btn
let searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let cityInp = document.querySelector(".city-input");
  if (cityInp.value) {
    city = cityInp.value;
  }
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    cityName.innerHTML = response.data.name;
    weatherdesc.innerHTML = response.data.weather[0].main;
    humidity.innerHTML = "Humidity: " + response.data.main.humidity;
    wind.innerHTML = "Wind: " + response.data.wind.speed + " meter/sec";
    celDegree = response.data.main.temp;
    farDegree = Math.round(celDegree * (9 / 5) + 32);
    celDegreeRounded = Math.round(celDegree);
    degreeH1.innerHTML = celDegreeRounded;
    let icon_code = response.data.weather[0].icon;
    let icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
    icon_img.setAttribute("src", icon_url);
  });
});

// current location
let lat = 0;
let lon = 0;
navigator.geolocation.getCurrentPosition(function (position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
});

// current btn
let currentBtn = document.querySelector(".current-btn");
currentBtn.addEventListener("click", function (event) {
  event.preventDefault();
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    cityName.innerHTML = response.data.name;
    weatherdesc.innerHTML = response.data.weather[0].main;
    humidity.innerHTML = "Humidity: " + response.data.main.humidity;
    wind.innerHTML = "Wind: " + response.data.wind.speed + " meter/sec";
    celDegree = response.data.main.temp;
    farDegree = Math.round(celDegree * (9 / 5) + 32);
    celDegreeRounded = Math.round(celDegree);
    degreeH1.innerHTML = celDegreeRounded;
    let icon_code = response.data.weather[0].icon;
    let icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
    icon_img.setAttribute("src", icon_url);
  });
});

// cel to far degree
let celDegBtn = document.querySelector(".cel-degree");
let farDegBtn = document.querySelector(".far-degree");
celDegBtn.addEventListener("click", function () {
  degreeH1.innerHTML = celDegreeRounded;
  celDegBtn.classList.add("active");
  celDegBtn.classList.remove("deactive");
  farDegBtn.classList.add("deactive");
  farDegBtn.classList.remove("active");
});
farDegBtn.addEventListener("click", function () {
  degreeH1.innerHTML = farDegree;
  farDegBtn.classList.add("active");
  farDegBtn.classList.remove("deactive");
  celDegBtn.classList.add("deactive");
  celDegBtn.classList.remove("active");
});

displayForecast();
