import {getCoordinates, getClimate, getElevation, getNameByCoordinates, updateInfo} from "./script.js"

////// Cấu hình bản đồ cơ bản 

const map = L.map('map', { preferCanvas: true }).setView([20, 0], 2);
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);
const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: '© OpenTopoMap'
});

const koppen_geiger = "data/koppen_geiger_0p1.tif"//"data/koppen_geiger_0p00833333.tif"; // file tiff 

let georaster = null;

fetch(koppen_geiger)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => parseGeoraster(arrayBuffer))
  .then(result => {
    georaster = result;  // Gán để dùng sau

    const Koppen_Geiger = new GeoRasterLayer({
      georaster,
      opacity: 0.6,
      pixelValuesToColorFn: values => {
        const val = values[0];
        if (val === -9999 || val === null) return null;

        const colors = [
          "#e6194b", "#3cb44b", "#ffe119", "#4363d8",
          "#f58231", "#911eb4", "#46f0f0", "#f032e6",
          "#bcf60c", "#fabebe", "#008080", "#e6beff"
        ];
        return colors[val % colors.length];
      },
      resolution: 256
    });

    // Bảng chọn layer
    L.control.layers(
      { "OSM": osm, "Topo": topo },
      { "Köppen-Geiger": Koppen_Geiger }
    ).addTo(map);
  })
  .catch(err => console.error("Lỗi load GeoTIFF:", err));

// Tạo một layer group để chứa marker
const markersLayer = L.layerGroup().addTo(map);

////// Search form => mark on map + cập nhật

document.querySelector('.search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.getElementById('locationInput').value.trim();
  if (!city) return;

  const coords = await getCoordinates(city);
    const elevation = await getElevation(coords.lat, coords.lon);
    const climate = await getClimate(coords.lat, coords.lon, georaster);

  if (coords) {
    map.setView([coords.lat, coords.lon], 8);
    markersLayer.clearLayers(); // Xóa toàn bộ marker cũ

    const marker = L.marker([coords.lat, coords.lon])
      .bindPopup(`${city}<br>Lat: ${coords.lat.toFixed(4)}, Lon: ${coords.lon.toFixed(4)}`)
      .openPopup();

    markersLayer.addLayer(marker); // Thêm marker vào layer group
    // Cập nhật
    updateInfo(coords.lat, coords.lon, climate.climateType, elevation, coords.local_name['en'], coords.country);
  }
});

////// Mark on map => cập nhật

map.on('click', async function(e) {
  // Xóa các marker cũ
  markersLayer.clearLayers();

  const lat = e.latlng.lat;
  const lon = e.latlng.lng;
    const elevation = await getElevation(lat, lon);
    const climate = await getClimate(lat, lon, georaster);

  try {
    let data = await getNameByCoordinates(lat, lon);

    // Cắm marker tại vị trí click
    const marker = L.marker([lat, lon])
      .bindPopup(`${data.place_name}<br>Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`)
      .openPopup();

    markersLayer.addLayer(marker);

    console.log("Clicked:", lat, lon, data.place_name);
    // Cập nhật
    updateInfo(lat, lon, climate.climateType, elevation, data.place_name, data.country);

  } catch (error) {
    console.error("Error fetching location:", error);
  }
});

// Mặc định Ho Chi Minh - Lat: 10.7758, Lon: 106.7018
