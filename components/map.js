import { Elements } from "../utils/elements.js";

export class Map {
  static createMap(boundingbox, lat, lon) {
    this.map = Elements.createElement("div", "map-container");
    this.map.innerHTML = `
        <iframe height="250" src="https://www.openstreetmap.org/export/embed.html?bbox=
        ${Number(boundingbox[2])}%2C${Number(boundingbox[0])}%2C${Number(boundingbox[3])}%2C${Number(boundingbox[1])}
        &marker=${Number(lat)}%2C${Number(lon)}&amp;layer=mapnik" style="width: 100%; border: none"></iframe>
        `;
    // <br/><small><a href="https://www.openstreetmap.org/#map=12/${lat}/${lon}">View Larger Map</a></small>
    return this.map;
  }
}
