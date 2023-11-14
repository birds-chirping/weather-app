import { Elements } from "../utils/elements.js";

export class Forecast {
  forecastContainer;
  dayName;
  dayContent;

  constructor() {
    this.init();
  }

  init() {
    this.forecastContainer = Elements.createElement("div", "forecast-container");
  }

  addNewDay(dayName) {
    const newDay = Elements.createElement("div", "day-forecast-container");
    const dayTitle = Elements.createElement("div", "day-forecast-title");
    dayTitle.textContent = dayName;
    this.dayContent = Elements.createElement("div", "day-forecast-content");
    newDay.append(dayTitle, this.dayContent);
    this.forecastContainer.appendChild(newDay);
  }

  addForecastToDay(date, iconSrc, mainTemp, description) {
    const dayName = date.toLocaleDateString("en-UK", { weekday: "long" });
    const time = date.toLocaleTimeString("en-UK", { hour: "2-digit", minute: "2-digit" });

    if (this.dayName != dayName) {
      this.addNewDay(dayName);
      this.dayName = dayName;
    }

    this.dayContent.innerHTML += `
      <div class="hour-forecast">
          <img src=${iconSrc}>
          <p>${description}</p>
          <p>${mainTemp}°C</p>
          <p>${time}<p>
      </div>`;
  }

  addElementTo(parentContainer) {
    parentContainer.appendChild(this.forecastContainer);
  }
}