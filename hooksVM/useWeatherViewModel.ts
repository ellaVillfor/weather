import { useState } from "react";
import { ForecastDay } from "../dataM/WeatherParser";
import { getForecast } from "../dataM/WeatherRepo";
import useNetworkMonitor from "./useNetworkMonitor"; // custom hook

/**
 * useWeatherViewModel()
 *
 * A ViewModel hook that manages weather forecast data.
 * Handles fetching, caching, error states, and connectivity.
 *
 * Usage:
 *   const {
 *     days,
 *     loading,
 *     error,
 *     isOnline,
 *     lon,
 *     lat,
 *     setLon,
 *     setLat,
 *     refresh,
 *   } = useWeatherViewModel();
 */

export function useWeatherViewModel() {
  // Listen for connectivity via your custom hook
  const isOnline = useNetworkMonitor();

  // App state
  const [days, setDays] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Location defaults
  const [lat, setLat] = useState(59.33);
  const [lon, setLon] = useState(18.06);

  // Refresh weather data
  async function refresh() {
    setLoading(true);
    setError(null);

    try {
      const data = await getForecast(lon, lat);
      setDays(data);
    } catch (err) {
      // handle offline or other errors
      if (!isOnline) setError("Offline — showing cached data.");
      else setError("Failed to load forecast.");
    } finally {
      setLoading(false);
    }
  }

  return {
    days,
    loading,
    error,
    isOnline,
    lon,
    lat,
    setLon,
    setLat,
    refresh,
  };
}
