import { Elements } from "../utils/elements.js";
import { Map } from "./map.js";
import { GeocodingAPI } from "../api/geocoding.js";

export class CurrentWeather {
  forecastBtn;
  showForecast;

  constructor(data) {
    this.data = data;
    this.createCard();
  }

  async createCard() {
    this.card = Elements.createElement("div", "current-weather-card");
    this.createForecastBtn();
    this.card.append(this.createHeader(), await this.createMap(), this.addCardContent());
  }

  createHeader() {
    const header = Elements.createElement("div", "title");
    header.textContent = this.data.locationName;
    return header;
  }

  async createMap() {
    return Map.createMap(...(await this.getMapCoordinates()));
  }

  async getMapCoordinates() {
    const geocodingData = await GeocodingAPI.getCoordinates(this.data.locationName);
    const boundingbox = geocodingData[0].boundingbox;
    const lat = geocodingData[0].lat;
    const lon = geocodingData[0].lon;
    return [boundingbox, lat, lon];
  }

  addCardContent() {
    const cardContent = Elements.createElement("div", "weather-info");
    cardContent.innerHTML = `
        <div class='left'>
          <img class='icon' src=${this.data.weatherIconPath}>
          <div class='weather-state'>
            <div class='temperature'>${this.data.temperature}°</div>
            <div class='description'>${this.data.weatherDescription}</div>
          </div>
        </div>

        <div class='right'>
          <div class='low-high'>
            <div class='extra-info'>
              <div><span class='value'>${this.data.minTemp}°</span></div>
              <div>Low</div>
            </div>
            <div class='extra-info'>
              <div><span class='value'>${this.data.maxTemp}°</span></div>
              <div>High</div>
            </div>
          </div>
          <div class='other-info'>
            <div class='extra-info'>
              <div><span class='value'>${this.data.humidity}</span> %</div>
              <div>Humidity</div>
            </div>
            <div class='extra-info'>
              <div><span class='value'>${this.data.pressure}</span> hPa</div>
              <div>Pressure</div>
            </div>
          </div>
        </div>
    `;
    return cardContent;
  }

  createForecastBtn() {
    this.forecastBtn = Elements.createElement("button", "forecast-btn");
    this.forecastBtn.textContent = "5-Day Weather Forecast";

    this.forecastBtn.addEventListener("click", () => {
      this.showForecast(this.data.locationName);
    });
    // return this.forecastBtn;
  }

  bindForecast(handle) {
    this.showForecast = handle;
  }
}
