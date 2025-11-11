export interface ForecastDay {
  date: string;        // ISO date (YYYY-MM-DD)
  temp: number;        // main temperature (°C)
  tempMin?: number;
  tempMax?: number;
  condition?: string;
  cloudCover: number;
}

export function parseWeatherData(raw: any): ForecastDay[] {
  if (!raw) return [];

  const days = raw.daily ?? raw.forecast ?? raw;
  if (!Array.isArray(days)) return [];

  return days.map((d: any) => {
    const ts = d.dt ?? d.time ?? d.date;
    const date = ts
      ? new Date(Number(ts) * (String(ts).length === 10 ? 1000 : 1)).toISOString().slice(0, 10)
      : (d.date ?? "");

    const temp = typeof d.temp === "number" ? d.temp : (d.temp?.day ?? NaN);

    return {
      date,
      temp,
      tempMin: d.temp?.min ?? d.tempMin,
      tempMax: d.temp?.max ?? d.tempMax,
      condition: d.weather?.[0]?.description ?? d.summary ?? "",
      cloudCover: d.cloudcover_mean ?? d.cloudCover,
    } as ForecastDay;
  });
}