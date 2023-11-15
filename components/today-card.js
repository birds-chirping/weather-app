import { Elements } from "../utils/elements.js";

export class Today {
  forecastBtn;
  showForecast;

  constructor(locationName, weatherIconPath, weatherDescription, temperature, minTemp, maxTemp, humidity, pressure) {
    this.locationName = locationName;
    this.weatherIconPath = weatherIconPath;
    this.weatherDescription = weatherDescription;
    this.temperature = Math.round(temperature);
    this.minTemp = Math.round(minTemp);
    this.maxTemp = Math.round(maxTemp);
    this.humidity = humidity;
    this.pressure = pressure;
  }

  createCard() {
    const card = Elements.createElement("div", "today-card");
    card.innerHTML = `
    <div class='today'>
      <div class='title'>${this.locationName}</div>
        <div class='weather-info'>
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
                <div>${this.minTemp}°</div>
                <div>Low</div>
              </div>
              <div class='extra-info'>
                <div>${this.maxTemp}°</div>
                <div>High</div>
              </div>
            </div>
            <div class='other-info'>
              <div class='extra-info'>
                <div>${this.humidity}</div>
                <div>Humidity</div>
              </div>
              <div class='extra-info'>
                <div>${this.pressure}</div>
                <div>Pressure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
