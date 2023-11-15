import { Elements } from "../utils/elements.js";

export class Map {
  constructor() {
    this.mapElement = Elements.createElement("div", "map-container");
  }

  updateMap(lat, lon) {
    this.mapElement.innerHTML = `
                <iframe height="250" src="https://www.openstreetmap.org/export/embed.html?bbox=
                ${lon - 0.2}%2C${lat - 0.3}%2C${lon + 0.2}%2C${lat + 0.3}
                &amp;layer=mapnik" style="width: 100%; border: none"></iframe>
                `;
    // <br/><small><a href="https://www.openstreetmap.org/#map=12/${lat}/${lon}">View Larger Map</a></small>
  }
}
