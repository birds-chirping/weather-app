import { CurrentWeather } from "./components/current-weather.js";
import { Forecast } from "./components/forecast.js";
import { WeatherAPI } from "./api/weather.js";
import { Elements } from "./utils/elements.js";

class WeatherApp {
  defaultLocation;
  weatherappWrapper;
  input;
  searchBtn;
  weatherContainer;
  selectedLocation;

  constructor() {
    this.init();
  }

  init() {
    this.defaultLocation = "Honolulu";
    this.weatherappWrapper = Elements.createElement("div", "weatherapp");
    this.weatherContainer = Elements.createElement("div", "weatherapp-weather-container");
    this.weatherappWrapper.append(this.createHeader(), this.weatherContainer);
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
    window.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && this.input.value.length > 0) this.getWeather();
    });
  }

  getWeather() {
    this.selectedLocation = this.input.value || this.defaultLocation;
    this.addCurrentWeather();
    this.input.value = "";
  }

  async addCurrentWeather() {
    this.weatherContainer.innerHTML = "";
    const data = await this.getCurrentWeatherData(this.selectedLocation);
    if (data.cod != 200) {
      this.showError(data.message, this.weatherContainer);
      return;
    }
    const currentWeather = new CurrentWeather(data);
    currentWeather.bindForecast(this.addForecast.bind(this));
    this.forecast = new Forecast();
    this.weatherContainer.append(currentWeather.card, currentWeather.forecastBtn, this.forecast.forecastContainer);
  }

  async getCurrentWeatherData(location) {
    const data = await WeatherAPI.getCurrentWeatherByLocation(location);
    if (data.cod != "200") {
      return data;
    }
    return {
      cod: data.cod,
      locationName: data.name,
      weatherIconPath: WeatherAPI.getIcon(data.weather[0].icon, "large"),
      weatherDescription: data.weather[0].description,
      temperature: Math.round(data.main.temp),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
    };
  }

  async addForecast(location) {
    this.forecast.clearForecast();
    const data = await this.getForecastData(location);
    if (data.cod != 200) {
      this.showError(data.message, this.forecast.forecastContainer);
      this.forecast.show();
      return;
    }
    data.list.forEach(async (weatherByTime) => {
      const dateTime = weatherByTime.dt_txt;
      const weatherIconPath = WeatherAPI.getIcon(weatherByTime.weather[0].icon);
      const temperature = Math.round(weatherByTime.main.temp);
      const description = weatherByTime.weather[0].description;
      this.forecast.addForecastToDay(dateTime, weatherIconPath, temperature, description);
    });
    this.forecast.show();
  }

  async getForecastData(location) {
    const data = await WeatherAPI.getForecast(location);
    return data;
  }

  showError(message, container) {
    const error = Elements.createElement("div", "error-message");
    error.textContent = message;
    container.appendChild(error);
  }

  addElementTo(parentContainer) {
    parentContainer.appendChild(this.weatherappWrapper);
  }
}

const container = document.querySelector(".app");
const app = new WeatherApp();
app.addElementTo(container);
// console.log(app);
