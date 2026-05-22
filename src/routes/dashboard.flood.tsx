import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { RwandaMap } from "@/components/dashboard/RwandaMap";
import { rainfallForecast as fallbackForecast } from "@/lib/sample-data";
import { useLiveClimate } from "@/lib/use-live";
import { CloudRain, Waves, AlertTriangle, MapPin } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

export const Route = createFileRoute("/dashboard/flood")({ component: Flood });

const axis = { stroke: "oklch(0.7 0.03 230)", fontSize: 11 };
const tip = { contentStyle: { background: "oklch(0.21 0.045 250)", border: "1px solid oklch(0.78 0.15 200 / 0.4)", borderRadius: 12, fontSize: 12 } };

const historical = [
  { year: "2018", events: 22, deaths: 31 },
  { year: "2019", events: 28, deaths: 47 },
  { year: "2020", events: 31, deaths: 65 },
  { year: "2021", events: 35, deaths: 72 },
  { year: "2022", events: 41, deaths: 89 },
  { year: "2023", events: 52, deaths: 134 },
  { year: "2024", events: 48, deaths: 96 },
  { year: "2025", events: 56, deaths: 108 },
];

function Flood() {
  const { districts, forecast, fetchedAt } = useLiveClimate();
  const high = districts.filter((d) => d.floodRisk === "high");
  const rainfallForecast = forecast.length ? forecast : fallbackForecast;
  return (
    <>
      <Topbar title="Flood Prediction" subtitle={`Live rainfall fusion · ${fetchedAt ? new Date(fetchedAt).toLocaleTimeString() : "Open-Meteo"}`} />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="High-risk districts" value={String(high.length)} icon={MapPin} tone="danger" />
          <StatCard label="Avg rainfall (7d)" value={`${Math.round(districts.reduce((a,b)=>a+b.rainfall,0)/districts.length)} mm`} icon={CloudRain} tone="primary" />
          <StatCard label="Rivers above threshold" value="9" icon={Waves} tone="warning" />
          <StatCard label="Lead-time (h)" value="18.4" icon={AlertTriangle} tone="success" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-1">Flood-risk districts</h2>
            <p className="text-xs text-muted-foreground mb-4">Color-coded by predicted probability</p>
            <RwandaMap height={420} metric="floodRisk" data={districts} />
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Top probability</h2>
            <p className="text-xs text-muted-foreground mb-4">Next 24h flood probability</p>
            <div className="space-y-3">
              {[...districts].sort((a,b)=>b.riskScore-a.riskScore).slice(0,7).map((d)=>(
                <div key={d.name} className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-danger/15 text-danger text-sm font-semibold">{d.riskScore}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{d.name}</div>
                    <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden mt-1"><div className="h-full bg-gradient-to-r from-warning to-danger" style={{width:`${d.riskScore}%`}}/></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Rainfall intensity</h2>
            <p className="text-xs text-muted-foreground mb-3">7-day forecast (mm)</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={rainfallForecast}>
                <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.6}/><stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="day" {...axis} /><YAxis {...axis} />
                <Tooltip {...tip} />
                <Area type="monotone" dataKey="actual" stroke="oklch(0.78 0.15 200)" strokeWidth={2.5} fill="url(#rg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Historical flood events</h2>
            <p className="text-xs text-muted-foreground mb-3">Events &amp; fatalities by year</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={historical}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="year" {...axis} /><YAxis {...axis} />
                <Tooltip {...tip} /><Legend wrapperStyle={{fontSize:11}} />
                <Bar dataKey="events" fill="oklch(0.78 0.15 200)" radius={[6,6,0,0]} />
                <Bar dataKey="deaths" fill="oklch(0.65 0.24 25)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
