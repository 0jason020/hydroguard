import { createServerFn } from "@tanstack/react-start";
import { districts } from "./sample-data";

export interface LiveDistrictWeather {
  name: string;
  province: string;
  lat: number;
  lng: number;
  temperature: number | null;
  rainfall7d: number | null;
  windspeed: number | null;
  humidity: number | null;
}

export interface LiveClimateResponse {
  fetchedAt: string;
  source: string;
  districts: LiveDistrictWeather[];
  rainfallForecast: { day: string; actual: number; predicted: number; anomaly: number }[];
  kigaliCurrent: {
    temperature: number | null;
    windspeed: number | null;
    humidity: number | null;
    rainfallToday: number | null;
  };
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getLiveClimate = createServerFn({ method: "GET" }).handler(
  async (): Promise<LiveClimateResponse> => {
    // Open-Meteo supports batched coordinates via comma-separated lat/lng
    const lats = districts.map((d) => d.lat).join(",");
    const lngs = districts.map((d) => d.lng).join(",");

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lats}&longitude=${lngs}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation` +
      `&daily=precipitation_sum` +
      `&past_days=7&forecast_days=7&timezone=Africa%2FKigali`;

    let payload: any[] = [];
    try {
      const res = await fetch(url, { headers: { accept: "application/json" } });
      if (!res.ok) throw new Error(`Open-Meteo ${res.status}`);
      const json = await res.json();
      payload = Array.isArray(json) ? json : [json];
    } catch (err) {
      console.error("[climate] fetch failed", err);
      return {
        fetchedAt: new Date().toISOString(),
        source: "open-meteo (unavailable, showing baseline)",
        districts: districts.map((d) => ({
          name: d.name,
          province: d.province,
          lat: d.lat,
          lng: d.lng,
          temperature: null,
          rainfall7d: d.rainfall,
          windspeed: null,
          humidity: null,
        })),
        rainfallForecast: [],
        kigaliCurrent: { temperature: null, windspeed: null, humidity: null, rainfallToday: null },
      };
    }

    const live: LiveDistrictWeather[] = districts.map((d, i) => {
      const p = payload[i];
      const daily = p?.daily?.precipitation_sum ?? [];
      const past7 = daily.slice(0, 7) as number[];
      const sum7 = past7.reduce((a, b) => a + (Number(b) || 0), 0);
      return {
        name: d.name,
        province: d.province,
        lat: d.lat,
        lng: d.lng,
        temperature: p?.current?.temperature_2m ?? null,
        rainfall7d: Math.round(sum7),
        windspeed: p?.current?.wind_speed_10m ?? null,
        humidity: p?.current?.relative_humidity_2m ?? null,
      };
    });

    // Kigali = Nyarugenge index
    const kigaliIdx = districts.findIndex((d) => d.name === "Nyarugenge");
    const k = payload[kigaliIdx];

    // Forecast: average next 7 forecast days across all districts
    const future: number[] = [];
    for (let d = 0; d < 7; d++) {
      let sum = 0;
      let n = 0;
      for (const p of payload) {
        const v = p?.daily?.precipitation_sum?.[7 + d];
        if (typeof v === "number") {
          sum += v;
          n++;
        }
      }
      future.push(n > 0 ? sum / n : 0);
    }
    const past: number[] = [];
    for (let d = 0; d < 7; d++) {
      let sum = 0;
      let n = 0;
      for (const p of payload) {
        const v = p?.daily?.precipitation_sum?.[d];
        if (typeof v === "number") {
          sum += v;
          n++;
        }
      }
      past.push(n > 0 ? sum / n : 0);
    }
    const today = new Date();
    const rainfallForecast = future.map((pred, i) => {
      const dt = new Date(today);
      dt.setDate(today.getDate() + i);
      const actual = past[i] ?? 0;
      return {
        day: DAY_NAMES[dt.getDay()],
        actual: Math.round(actual * 10) / 10,
        predicted: Math.round(pred * 10) / 10,
        anomaly: Math.round((actual - pred) * 10) / 10,
      };
    });

    return {
      fetchedAt: new Date().toISOString(),
      source: "Open-Meteo (open-meteo.com)",
      districts: live,
      rainfallForecast,
      kigaliCurrent: {
        temperature: k?.current?.temperature_2m ?? null,
        windspeed: k?.current?.wind_speed_10m ?? null,
        humidity: k?.current?.relative_humidity_2m ?? null,
        rainfallToday: k?.current?.precipitation ?? null,
      },
    };
  },
);
