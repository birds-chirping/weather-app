import { Today } from "./components/today-card.js";
import { Forecast } from "./components/forecast.js";
import { Elements } from "./utils/elements.js";
import { WeatherApi } from "./api/weatherApi.js";

class WeatherApp {
  appWrapper;
  input;
  searchBtn;
  weatherContainer;
  selectedLocation;

  constructor() {
    this.init();
  }

  init() {
    this.appWrapper = Elements.createElement("div", "weatherapp-wrapper");
    this.weatherContainer = Elements.createElement("div", "weatherapp-container");
    this.appWrapper.append(this.createHeader(), this.weatherContainer);
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
    this.selectedLocation = this.input.value || "Honolulu";
    this.addCurrentWeather();
  }

  clearWeatherContainer() {
    this.weatherContainer.innerHTML = "";
  }

  // async getCoordinates(locationName) {
  //   const response = await fetch(
  //     `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=b7dc06214c8eb8092caccdf552fe5acf`
  //   );
  //   const data = await response.json();
  //   return data;
  // }

  async addCurrentWeather() {
    const location = await WeatherApi.getCurrentWeatherByLocation(this.selectedLocation);

    if (location.cod != "200") {
      this.weatherContainer.innerHTML = `
    <div class="error-message">${location.message}</div>`;
      return;
    }

    const today = new Today(
      location.name,
      await WeatherApi.getIcon(location.weather[0].icon, "large"),
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
    const forecast = await WeatherApi.getForecast(location);

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
      const iconSrc = await WeatherApi.getIcon(weatherByTime.weather[0].icon);
      const mainTemp = weatherByTime.main.temp;
      const description = weatherByTime.weather[0].description;
      forecast.addForecastToDay(dateTime, iconSrc, mainTemp, description);
    });
  }

  addElementTo(parentContainer) {
    parentContainer.appendChild(this.appWrapper);
  }
}

const container = document.querySelector(".app");
const app = new WeatherApp();
app.addElementTo(container);
// console.log(app);
