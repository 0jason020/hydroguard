import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { temperatureTrend, rainfallForecast as fallbackForecast } from "@/lib/sample-data";
import { StatCard } from "@/components/dashboard/StatCard";
import { ThermometerSun, CloudRain, Wind, Droplets, RefreshCw, Radio } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLiveClimate } from "@/lib/climate.functions";

export const Route = createFileRoute("/dashboard/weather")({ component: Weather });

const axis = { stroke: "oklch(0.7 0.03 230)", fontSize: 11 };
const tip = { contentStyle: { background: "oklch(0.21 0.045 250)", border: "1px solid oklch(0.78 0.15 200 / 0.4)", borderRadius: 12, fontSize: 12 } };

const variability = [
  { year: "2015", anomaly: -0.2 }, { year: "2016", anomaly: 0.4 }, { year: "2017", anomaly: 0.1 },
  { year: "2018", anomaly: 0.6 }, { year: "2019", anomaly: 0.8 }, { year: "2020", anomaly: 0.5 },
  { year: "2021", anomaly: 1.1 }, { year: "2022", anomaly: 1.4 }, { year: "2023", anomaly: 1.7 },
  { year: "2024", anomaly: 1.5 }, { year: "2025", anomaly: 1.9 }, { year: "2026", anomaly: 2.1 },
];

function Weather() {
  const fetchClimate = useServerFn(getLiveClimate);
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["live-climate"],
    queryFn: () => fetchClimate(),
    staleTime: 5 * 60 * 1000,
  });

  const forecast = data?.rainfallForecast?.length ? data.rainfallForecast : fallbackForecast;
  const sum7 = data?.districts.reduce((a, d) => a + (d.rainfall7d ?? 0), 0) ?? 0;
  const avgRain = data?.districts.length ? Math.round(sum7 / data.districts.length) : null;
  const k = data?.kigaliCurrent;

  return (
    <>
      <Topbar title="Weather & Rainfall Analytics" subtitle="Long-term climate variability and live operational forecasts." />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between glass rounded-xl px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <Radio className={`h-3.5 w-3.5 ${isFetching ? "text-warning animate-pulse" : "text-success"}`} />
            <span className="text-muted-foreground">
              Live source: <span className="text-foreground font-medium">{data?.source ?? "Open-Meteo"}</span>
              {data?.fetchedAt && <> · refreshed {new Date(data.fetchedAt).toLocaleTimeString()}</>}
            </span>
          </div>
          <button onClick={() => refetch()} className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-secondary/60 transition">
            <RefreshCw className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Kigali temperature"
            value={k?.temperature != null ? `${k.temperature.toFixed(1)}°C` : isLoading ? "…" : "—"}
            icon={ThermometerSun}
            tone="warning"
          />
          <StatCard
            label="Avg 7-day rainfall"
            value={avgRain != null ? `${avgRain} mm` : isLoading ? "…" : "—"}
            delta="across 30 districts"
            icon={CloudRain}
            tone="primary"
          />
          <StatCard
            label="Humidity (Kigali)"
            value={k?.humidity != null ? `${Math.round(k.humidity)}%` : isLoading ? "…" : "—"}
            icon={Droplets}
            tone="primary"
          />
          <StatCard
            label="Wind (Kigali)"
            value={k?.windspeed != null ? `${k.windspeed.toFixed(1)} km/h` : isLoading ? "…" : "—"}
            icon={Wind}
            tone="success"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">7-day rainfall outlook</h2>
            <p className="text-xs text-muted-foreground mb-3">Live Open-Meteo forecast averaged across all 30 districts (mm)</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={forecast}>
                <defs>
                  <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.5}/><stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="day" {...axis} /><YAxis {...axis} />
                <Tooltip {...tip} /><Legend wrapperStyle={{fontSize:11}} />
                <Area type="monotone" dataKey="actual" name="Past 7d" stroke="oklch(0.78 0.15 200)" strokeWidth={2.5} fill="url(#wg1)" />
                <Area type="monotone" dataKey="predicted" name="Next 7d" stroke="oklch(0.72 0.18 155)" strokeWidth={2} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Temperature trend</h2>
            <p className="text-xs text-muted-foreground mb-3">2026 vs 30-year average (°C)</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={temperatureTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="month" {...axis} /><YAxis {...axis} domain={[18,23]} />
                <Tooltip {...tip} /><Legend wrapperStyle={{fontSize:11}} />
                <Line type="monotone" dataKey="temp" stroke="oklch(0.65 0.24 25)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="avg" stroke="oklch(0.7 0.03 230)" strokeDasharray="4 4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-5">
          <h2 className="text-lg font-semibold">Live 7-day rainfall by district</h2>
          <p className="text-xs text-muted-foreground mb-3">Past 7 days measured precipitation (mm), live from Open-Meteo</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={(data?.districts ?? []).slice().sort((a, b) => (b.rainfall7d ?? 0) - (a.rainfall7d ?? 0))}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
              <XAxis dataKey="name" {...axis} angle={-35} textAnchor="end" height={70} interval={0} />
              <YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="rainfall7d" name="Rainfall (mm, past 7d)" radius={[6,6,0,0]} fill="oklch(0.78 0.15 200)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-strong rounded-2xl p-5">
          <h2 className="text-lg font-semibold">Climate variability — temperature anomaly</h2>
          <p className="text-xs text-muted-foreground mb-3">Annual deviation from baseline (°C)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={variability}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
              <XAxis dataKey="year" {...axis} /><YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="anomaly" radius={[6,6,0,0]} fill="oklch(0.78 0.18 70)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
