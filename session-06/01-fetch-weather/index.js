console.log("Fetch explained!");

/**
 * Fetch current forecast
 */
// fetch(
//   `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=Bucharest`
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((apiData) => {
//     console.log(apiData);
//   });

/**
 * Fetch current forecast by hour
 */

fetch(
  `https://api.weatherapi.com/v1/forecast.json?days=1&key=${weatherApiKey}&q=Bucuresti`
)
  .then((response) => response.json())
  .then((apiData) => displayWeather(apiData));

function displayWeather(apiData) {
  const forecastDay = apiData.forecast.forecastday[0];
  const image = apiData.current.condition.icon;
  const curHour = new Date().getHours();
  const weatherAtThisHour = forecastDay.hour[curHour];

  console.log(forecastDay);

  document.querySelector(".img").src = `https:${image}`;
  document.querySelector(
    ".celsius"
  ).textContent = `${weatherAtThisHour.temp_c}°C`;
  document.querySelector(".condition").textContent =
    weatherAtThisHour.condition.text;
  document.querySelector(".date").textContent = forecastDay.date
    .split("-")
    .reverse()
    .join("-");

  document.querySelector(
    ".lowest-temp"
  ).innerHTML = `&darr; ${forecastDay.day.mintemp_c}°C`;
  document.querySelector(
    ".highest-temp"
  ).innerHTML = `&uarr; ${forecastDay.day.maxtemp_c}°C`;

  console.log(weatherAtThisHour.time.split(" ")[1]);

  forecastDay.hour.forEach((element) => {
    const html = `
    <div class="forecast">
    <p>${element.time.split(" ")[1]}</p>
    <img class="widget-img" src="https:${
      element.condition.icon
    }" alt="weather.img" />
    <p>${element.temp_c}°C</p>
    </div>
    `;

    document
      .querySelector(".forecast-hours")
      .insertAdjacentHTML("beforeend", html);
    console.log(element);
  });

  console.log(weatherAtThisHour);
}
