import { Elements } from "../utils/elements.js";

export class Forecast {
  forecastContainer;

  constructor(list) {
    this.forecastList = list;
    this.init();
  }

  init() {
    this.forecastContainer = Elements.createElement("div", "forecast-container");
    this.createForecastContainer();
  }

  createForecastContainer() {
    this.forecastContainer.innerHTML = this.forecastList
      .map(
        (day) =>
          `
            <div>
                <h2>${day.dt_txt}</h2>
                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png"/>
                <p>${day.weather[0].description}</p>
                <p>Temp: ${day.main.temp}</p>
            </div>
        `
      )
      .join("");
  }

  addTo(parentContainer) {
    parentContainer.appendChild(this.forecastContainer);
  }
}
