import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchOpenMeteoDaily } from "./WeatherApi";
import { ForecastDay, parseWeatherData } from "./WeatherParser";

const CACHE_KEY = "forecast_cache";

export async function getForecast(lat: number, lon: number): Promise<ForecastDay[]> {
  try {
    const raw = await fetchOpenMeteoDaily(lat, lon);
    const parsed = parseWeatherData(raw);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch (error) {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  }
}
