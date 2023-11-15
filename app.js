import { Today } from "./components/today-card.js";
import { Map } from "./components/map.js";
import { Forecast } from "./components/forecast.js";
import { WeatherAPI } from "./api/weather.js";
import { GeocodingAPI } from "./api/geocoding.js";
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
    this.appWrapper = Elements.createElement("div", "weatherapp-wrapper");
    this.weatherContainer = Elements.createElement("div", "weatherapp-container");
    this.map = new Map();
    this.appWrapper.append(this.createHeader(), this.map.mapElement, this.weatherContainer);
    this.addEvents();
    this.getWeather();
  }

  createHeader() {
    const header = Elements.createElement("div", "weatherapp-header");
    this.input = Elements.createElement("input", "location-input");
    this.searchBtn = Elements.createElement("button", "search-button");
    this.searchBtn.textContent = "Search";
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
    this.updateMap();
    this.input.value = "";
  }

  clearWeatherContainer() {
    this.weatherContainer.innerHTML = "";
  }

  async addCurrentWeather() {
    const location = await WeatherAPI.getCurrentWeatherByLocation(this.selectedLocation);

    if (location.cod != "200") {
      this.selectedLocation = this.defaultLocation;
      this.updateMap();
      this.weatherContainer.innerHTML = `
    <div class="error-message">${location.message}</div>`;
      return;
    }

    const today = new Today(
      location.name,
      await WeatherAPI.getIcon(location.weather[0].icon, "large"),
      location.weather[0].description,
      location.main.temp,
      location.main.temp_min,
      location.main.temp_max,
      location.main.humidity,
      location.main.pressure
    );
    today.bindForecast(this.addForecast.bind(this));
    today.addElementTo(this.weatherContainer);
  }

  async addForecast(location) {
    const forecast = await WeatherAPI.getForecast(location);

    if (forecast.cod != "200") {
      const errorContainer = Elements.createElement("div", "error-container");
      errorContainer.textContent = forecast.message;
      this.weatherContainer.appendChild(errorContainer);
      return;
    }

    this.showForecastByDay(forecast);
  }

  showForecastByDay(locationForecast) {
    const forecast = new Forecast();
    forecast.addElementTo(this.weatherContainer);

    locationForecast.list.forEach(async (weatherByTime) => {
      const dateTime = weatherByTime.dt_txt;
      const iconSrc = await WeatherAPI.getIcon(weatherByTime.weather[0].icon);
      const mainTemp = weatherByTime.main.temp;
      const description = weatherByTime.weather[0].description;
      forecast.addForecastToDay(dateTime, iconSrc, mainTemp, description);
    });
  }

  async updateMap() {
    const coordinates = await GeocodingAPI.getCoordinates(this.selectedLocation);
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;
    this.map.updateMap(lat, lon);
  }

  addElementTo(parentContainer) {
    parentContainer.appendChild(this.appWrapper);
  }
}

const container = document.querySelector(".app");
const app = new WeatherApp();
app.addElementTo(container);
// console.log(app);
