import { Elements } from "../utils/elements.js";

export class Today {
  forecastBtn;
  showForecast;

  constructor(locationName, weatherIconPath, weatherDescription, temperature, minTemp, maxTemp, humidity, pressure) {
    this.locationName = locationName;
    this.weatherIconPath = weatherIconPath;
    this.weatherDescription = weatherDescription;
    this.temperature = temperature;
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
       <p>Temperature: ${this.temperature}°C</p>
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

  addElementTo(parentContainer) {
    parentContainer.append(this.createCard(), this.addForecastBtn());
  }

  bindForecast(handle) {
    this.showForecast = handle;
  }
}
