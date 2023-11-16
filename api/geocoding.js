export class GeocodingAPI {
  // static GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/direct?limit=1&appid=b7dc06214c8eb8092caccdf552fe5acf&q=`;
  static GEOCODING_URL = `https://geocode.maps.co/search?q=`;

  static async getCoordinates(locationName) {
    const response = await fetch(`${this.GEOCODING_URL}${locationName}`);
    const data = await response.json();
    return data;
  }
}
