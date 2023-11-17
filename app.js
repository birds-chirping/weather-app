import { Today } from "./components/today-card.js";
import { Forecast } from "./components/forecast.js";
import { WeatherAPI } from "./api/weather.js";
import { Elements } from "./utils/elements.js";

class WeatherApp {
  defaultLocation;
  appWrapper;
  input;
  searchBtn;
  weatherContainer;
  selectedLocation;

  constructor() {
    this.init();
  }

  init() {
    this.defaultLocation = "Honolulu";
    this.appWrapper = Elements.createElement("div", "weatherapp-container");
    this.weatherContainer = Elements.createElement("div", "weather-container");
    this.appWrapper.append(this.createHeader(), this.weatherContainer);
    this.addEvents();
    this.getWeather();
  }

  createHeader() {
    const header = Elements.createElement("div", "weatherapp-header");
    this.input = Elements.createElement("input", "location-input");
    this.input.placeholder = "Enter a location";
    this.searchBtn = Elements.createElement("button", "search-button");
    this.searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    header.append(this.input, this.searchBtn);
    return header;
  }

  addEvents() {
    this.searchBtn.addEventListener("click", this.getWeather.bind(this));
  }

  getWeather() {
    this.clearWeatherContainer();
    this.selectedLocation = this.input.value || this.defaultLocation;
    this.addCurrentWeather();
    this.input.value = "";
  }

  clearWeatherContainer() {
    this.weatherContainer.innerHTML = "";
  }

  async addCurrentWeather() {
    const location = await WeatherAPI.getCurrentWeatherByLocation(this.selectedLocation);

    if (location.cod != "200") {
      this.weatherContainer.innerHTML = `<div class="error-message">${location.message}</div>`;
      return;
    }

    const today = new Today(
      location.name,
      WeatherAPI.getIcon(location.weather[0].icon, "large"),
      location.weather[0].description,
      Math.round(location.main.temp),
      Math.round(location.main.temp_min),
      Math.round(location.main.temp_max),
      location.main.humidity,
      location.main.pressure
    );
    today.bindForecast(this.addForecast.bind(this));
    this.forecast = new Forecast();
    this.weatherContainer.append(today.card, this.forecast.forecastContainer);
  }

  async addForecast(location) {
    const forecastData = await WeatherAPI.getForecast(location);

    if (forecastData.cod != "200") {
      const errorContainer = Elements.createElement("div", "error-container");
      errorContainer.textContent = forecastData.message;
      this.weatherContainer.appendChild(errorContainer);
      return;
    }
    this.showForecastByDay(forecastData);
  }

  showForecastByDay(locationForecast) {
    this.forecast.clearForecast();
    locationForecast.list.forEach(async (weatherByTime) => {
      const dateTime = weatherByTime.dt_txt;
      const iconSrc = WeatherAPI.getIcon(weatherByTime.weather[0].icon);
      const mainTemp = Math.round(weatherByTime.main.temp);
      const description = weatherByTime.weather[0].description;
      this.forecast.addForecastToDay(dateTime, iconSrc, mainTemp, description);
    });
    this.forecast.show();
  }

  addElementTo(parentContainer) {
    parentContainer.appendChild(this.appWrapper);
  }
}

const container = document.querySelector(".app");
const app = new WeatherApp();
app.addElementTo(container);
// console.log(app);
