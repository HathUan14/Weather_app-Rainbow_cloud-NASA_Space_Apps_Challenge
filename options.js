////// Weather for 10 days dùng openweather

import { apiKey } from "./config.js";

async function getForecast10days(lat, lon, cnt=10) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Could not fetch forecast data");
    return await response.json();
}