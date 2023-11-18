import { Elements } from "../utils/elements.js";

export class Forecast {
  forecastContainer;
  dayName;
  dayContent;

  constructor() {
    this.init();
  }

  init() {
    this.forecastContainer = Elements.createElement("div", "forecast-container", "hide");
  }

  addNewDay(dayName) {
    const newDay = Elements.createElement("div", "day-forecast-container");
    const dayTitle = Elements.createElement("div", "day-forecast-title");
    dayTitle.textContent = dayName;
    this.dayContent = Elements.createElement("div", "day-forecast-content");
    newDay.append(dayTitle, this.dayContent);
    this.forecastContainer.appendChild(newDay);
  }

  addForecastToDay(dateTime, weatherIconPath, temperature, description) {
    const date = new Date(dateTime);
    const today = new Date();
    const dayName =
      today.toLocaleDateString() === date.toLocaleDateString()
        ? "Today"
        : date.toLocaleDateString("en-UK", { weekday: "long" });
    const time = date.toLocaleTimeString("en-UK", { hour: "2-digit", minute: "2-digit" });

    if (this.dayName != dayName) {
      this.addNewDay(dayName);
      this.dayName = dayName;
    }

    this.dayContent.innerHTML += `
    <div class="hour-forecast">
        <div class='temperature'>${temperature}°</div>
        <div class='icon-wrapper'><img src=${weatherIconPath}></div>
        <div class='description'>${description}</div>
        <div class='time'>${time}</div>
    </div>`;
  }

  show() {
    this.forecastContainer.classList.remove("hide");
  }

  clearForecast() {
    this.forecastContainer.innerHTML = "";
  }

  addElementTo(parentContainer) {
    parentContainer.appendChild(this.forecastContainer);
  }
}
