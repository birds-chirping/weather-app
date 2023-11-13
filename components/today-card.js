import { Elements } from "../utils/elements.js";

export class Today {
  forecastBtn;

  constructor(locationName, weatherIconPath, weatherDescription, temp, minTemp, maxTemp, humidity, pressure) {
    this.locationName = locationName;
    this.weatherIconPath = weatherIconPath;
    this.weatherDescription = weatherDescription;
    this.temp = temp;
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
    this.humidity = humidity;
    this.pressure = pressure;
  }

  createCard() {
    const card = Elements.createElement("div", "today-card");
    card.innerHTML = `
       <h2>${this.locationName}</h2>
       <img src=${this.weatherIconPath}>
       <p>${this.weatherDescription}</p>
       <p>Humidity: ${this.humidity}</p>
       <p>Pressure: ${this.pressure}</p>
       <p>Temp: ${this.temp}</p>
       <p>Min temp: ${this.minTemp}</p>
       <p>Max temp:${this.maxTemp}</p>
    `;
    return card;
  }

  addForecastBtn() {
    this.forecastBtn = Elements.createElement("button", "forecast-btn");
    this.forecastBtn.textContent = "Forecast";

    this.forecastBtn.addEventListener("click", () => {
      this.showForecast(this.locationName);
    });
    return this.forecastBtn;
  }

  addTo(parentContainer) {
    parentContainer.append(this.createCard(), this.addForecastBtn());
  }

  bindForecast(handle) {
    this.showForecast = handle;
  }
}
