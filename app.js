import { Today } from "./components/today-card.js";
import { Forecast } from "./components/forecast.js";
import { Elements } from "./utils/elements.js";

class WeatherApp {
  appWrapper;
  input;
  searchBtn;
  weatherContainer;
  location;

  constructor() {
    this.init();
  }

  init() {
    this.appWrapper = Elements.createElement("div", "weatherapp-wrapper");
    this.weatherContainer = Elements.createElement("div", "weather-container");
    this.appWrapper.append(this.createHeader(), this.weatherContainer);
    this.addEvents();
    this.getWeather();
  }

  createHeader() {
    const header = Elements.createElement("div", "widget-header");
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
    this.location = this.input.value || "Honolulu";
    this.addTodaysWeatherContainer();
  }

  clearWeatherContainer() {
    this.weatherContainer.innerHTML = "";
  }

  addTodaysWeatherContainer() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${this.location}`
    )
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((location) => {
        console.log(location);
        const today = new Today(
          location.name,
          `http://openweathermap.org/img/w/${location.weather[0].icon}.png`,
          location.weather[0].description,
          location.main.temp,
          location.main.temp_min,
          location.main.temp_max,
          location.main.humidity,
          location.main.pressure
        );
        today.bindForecast(this.addForecast);
        today.addTo(this.weatherContainer);
      })
      .catch((error) => {
        // console.log(error);
        error.json().then((error) => {
          this.weatherContainer.innerHTML = `
      <div>${error.message}</div>`;
        });
      });
  }

  addForecast = (location) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${location}`
    )
      .then((response) => {
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((location) => {
        const forecast = new Forecast(location.list);
        forecast.addTo(this.weatherContainer);
      })
      .catch((error) => {
        // console.log(error);
        error.json().then((error) => {
          const errorContainer = Elements.createElement("div", "error-container");
          errorContainer.textContent = error.message;
          this.weatherContainer.appendChild(errorContainer);
        });
      });
  };

  addTo(parentContainer) {
    parentContainer.appendChild(this.appWrapper);
  }
}

const container = document.querySelector(".app");
const app = new WeatherApp();
app.addTo(container);
console.log(app);
