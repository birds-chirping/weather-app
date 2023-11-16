import { Elements } from "../utils/elements.js";
import { Map } from "./map.js";
import { GeocodingAPI } from "../api/geocoding.js";

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
    this.createCard();
  }

  async createCard() {
    this.card = Elements.createElement("div", "today");
    this.card.append(this.createHeader(), await this.createMap(), this.addCardContent(), this.createForecastBtn());
  }

  createHeader() {
    const header = Elements.createElement("div", "title");
    header.textContent = this.locationName;
    return header;
  }

  async createMap() {
    return Map.createMap(...(await this.getMapCoordinates()));
  }

  async getMapCoordinates() {
    const geocodingData = await GeocodingAPI.getCoordinates(this.locationName);
    const boundingbox = geocodingData[0].boundingbox;
    const lat = geocodingData[0].lat;
    const lon = geocodingData[0].lon;
    return [boundingbox, lat, lon];
  }

  addCardContent() {
    const cardContent = Elements.createElement("div", "weather-info");
    cardContent.innerHTML = `
        <div class='left'>
          <img class='icon' src=${this.weatherIconPath}>
          <div class='weather-state'>
            <div class='temperature'>${this.temperature}°</div>
            <div class='description'>${this.weatherDescription}</div>
          </div>
        </div>

        <div class='right'>
          <div class='low-high'>
            <div class='extra-info'>
              <div><span class='value'>${this.minTemp}°</span></div>
              <div>Low</div>
            </div>
            <div class='extra-info'>
              <div><span class='value'>${this.maxTemp}°</span></div>
              <div>High</div>
            </div>
          </div>
          <div class='other-info'>
            <div class='extra-info'>
              <div><span class='value'>${this.humidity}</span> %</div>
              <div>Humidity</div>
            </div>
            <div class='extra-info'>
              <div><span class='value'>${this.pressure}</span> hPa</div>
              <div>Pressure</div>
            </div>
          </div>
        </div>
    `;
    return cardContent;
  }

  createForecastBtn() {
    this.forecastBtn = Elements.createElement("button", "forecast-btn");
    this.forecastBtn.textContent = "Forecast";

    this.forecastBtn.addEventListener("click", () => {
      this.showForecast(this.locationName);
    });
    return this.forecastBtn;
  }

  bindForecast(handle) {
    this.showForecast = handle;
  }
}
