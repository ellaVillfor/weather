import axios from 'axios';

// const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const BASE_URL = 'https://maceo.sth.kth.se/weather/forecast?lonLat=lon/14.333/lat/60.383' // Test server


export interface RawForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    cloudcover_mean: number[];
  };
}

export async function fetchOpenMeteoDaily(lon: number, lat: number) {
  const res = await axios.get<RawForecastResponse>(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'temperature_2m_max,,temperature_2m_min, cloudcover_mean',
      forecast_days: 7,
      timezone: 'auto',
    },
  });
  return res.data;
}
