import { Elements } from "../utils/elements.js";

export class Map {
  constructor() {
    this.mapContainer = Elements.createElement("div", "map-container");
  }

  updateMap(lat, lon) {
    this.mapContainer.innerHTML = `
                <iframe width="425" height="350" src="https://www.openstreetmap.org/export/embed.html?bbox=
                ${lon - 0.5}%2C${lat - 1}%2C${lon + 0.5}%2C${lat + 1}
                &amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=12/${lat}/${lon}">View Larger Map</a></small>
                `;
  }

  addElementTo(parent) {
    parent.appendChild(this.mapContainer);
  }
}
