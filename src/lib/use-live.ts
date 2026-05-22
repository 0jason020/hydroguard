import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo } from "react";
import { getLiveClimate } from "./climate.functions";
import { districts as baseDistricts, alerts as fallbackAlerts, type District, type AlertItem, type RiskLevel } from "./sample-data";

function floodFromRain(mm: number): RiskLevel {
  if (mm >= 120) return "high";
  if (mm >= 70) return "moderate";
  return "low";
}

export function useLiveClimate() {
  const fetchClimate = useServerFn(getLiveClimate);
  const q = useQuery({
    queryKey: ["live-climate"],
    queryFn: () => fetchClimate(),
    staleTime: 5 * 60 * 1000,
  });

  const merged = useMemo(() => {
    const live = q.data?.districts;
    if (!live) return baseDistricts;
    return baseDistricts.map((d): District => {
      const l = live.find((x) => x.name === d.name);
      const rain = l?.rainfall7d ?? d.rainfall;
      const newFlood = floodFromRain(rain);
      // Risk score: blend live rainfall (0-200mm) with terrain baseline
      const rainScore = Math.min(100, (rain / 180) * 100);
      const terrainBaseline = d.riskScore * 0.4;
      const blended = Math.round(Math.min(100, terrainBaseline + rainScore * 0.6));
      return {
        ...d,
        rainfall: rain,
        floodRisk: newFlood,
        riskScore: blended,
      };
    });
  }, [q.data]);

  const liveAlerts = useMemo<AlertItem[]>(() => {
    if (!q.data?.districts) return fallbackAlerts;
    const sorted = [...merged].sort((a, b) => b.rainfall - a.rainfall);
    const generated: AlertItem[] = [];
    sorted.slice(0, 3).forEach((d, i) => {
      if (d.rainfall >= 60) {
        generated.push({
          id: `live-flood-${d.name}`,
          type: "flood",
          severity: d.rainfall >= 120 ? "critical" : "warning",
          district: d.name,
          message: `Past 7-day rainfall ${d.rainfall} mm (live Open-Meteo). Flood probability ${d.riskScore}%.`,
          timeAgo: i === 0 ? "just now" : `${i * 7} min ago`,
        });
      }
    });
    // Landslide alerts from terrain-high districts with elevated rainfall
    merged
      .filter((d) => d.landslideRisk === "high" && d.rainfall >= 90)
      .slice(0, 2)
      .forEach((d, i) =>
        generated.push({
          id: `live-landslide-${d.name}`,
          type: "landslide",
          severity: d.rainfall >= 130 ? "critical" : "warning",
          district: d.name,
          message: `Slope saturation high — ${d.rainfall} mm rainfall over steep terrain in ${d.province}.`,
          timeAgo: `${20 + i * 12} min ago`,
        }),
      );
    if (generated.length === 0) return fallbackAlerts;
    return [...generated, ...fallbackAlerts.filter((a) => a.type === "pollution" || a.type === "weather")].slice(0, 8);
  }, [merged, q.data]);

  return {
    ...q,
    districts: merged,
    alerts: liveAlerts,
    forecast: q.data?.rainfallForecast ?? [],
    source: q.data?.source,
    fetchedAt: q.data?.fetchedAt,
    kigali: q.data?.kigaliCurrent,
  };
}
