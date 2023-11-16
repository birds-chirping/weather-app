export class WeatherAPI {
  static CURRENT_WEATHER_URL =
    "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
  static FORECAST_URL =
    "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
  static ICON_URL = "https://openweathermap.org/img/wn/";

  static async getCurrentWeatherByLocation(location) {
    const response = await fetch(`${this.CURRENT_WEATHER_URL}${location}`);
    const weather = await response.json();
    return weather;
  }

  static async getForecast(location) {
    const response = await fetch(`${this.FORECAST_URL}${location}`);
    const forecast = await response.json();
    return forecast;
  }

  static getIcon(code, size = "") {
    switch (size) {
      case "medium":
        size = "@2x";
        break;
      case "large":
        size = "@4x";
        break;
    }
    return `${this.ICON_URL}${code}${size}.png`;
  }
}
