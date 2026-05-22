import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { temperatureTrend, rainfallForecast } from "@/lib/sample-data";
import { StatCard } from "@/components/dashboard/StatCard";
import { ThermometerSun, CloudRain, Wind, Droplets } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";

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
  return (
    <>
      <Topbar title="Weather & Rainfall Analytics" subtitle="Long-term climate variability and short-term operational forecasts." />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Avg temperature" value="20.6°C" delta="+0.4° vs avg" trend="up" icon={ThermometerSun} tone="warning" />
          <StatCard label="7-day rainfall" value="353 mm" delta="+18%" trend="up" icon={CloudRain} tone="primary" />
          <StatCard label="Humidity" value="78%" icon={Droplets} tone="primary" />
          <StatCard label="Wind avg" value="12 km/h" icon={Wind} tone="success" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">7-day rainfall forecast</h2>
            <p className="text-xs text-muted-foreground mb-3">Predicted vs actual precipitation</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={rainfallForecast}>
                <defs>
                  <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.5}/><stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="day" {...axis} /><YAxis {...axis} />
                <Tooltip {...tip} /><Legend wrapperStyle={{fontSize:11}} />
                <Area type="monotone" dataKey="actual" stroke="oklch(0.78 0.15 200)" strokeWidth={2.5} fill="url(#wg1)" />
                <Area type="monotone" dataKey="predicted" stroke="oklch(0.72 0.18 155)" strokeWidth={2} strokeDasharray="4 4" fill="none" />
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
