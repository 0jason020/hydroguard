import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { RwandaMap } from "@/components/dashboard/RwandaMap";
import { alerts, rainfallForecast, hydropowerLevels, agricultureStress, districts, sdgIndicators } from "@/lib/sample-data";
import { CloudRain, Mountain, Droplet, Zap, TrendingUp, AlertTriangle } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const chartAxis = { stroke: "oklch(0.7 0.03 230)", fontSize: 11 };
const tooltipStyle = {
  contentStyle: { background: "oklch(0.21 0.045 250)", border: "1px solid oklch(0.78 0.15 200 / 0.4)", borderRadius: 12, fontSize: 12 },
};

function Overview() {
  const highRisk = districts.filter((d) => d.riskScore >= 70).length;
  return (
    <>
      <Topbar title="Climate Risk Overview" subtitle="Aggregate intelligence across all 30 districts of Rwanda." />
      <div className="p-6 space-y-6">
        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active alerts" value="14" delta="+3 today" trend="up" icon={AlertTriangle} tone="danger" />
          <StatCard label="High-risk districts" value={String(highRisk)} delta="+1 vs last week" trend="up" icon={Mountain} tone="warning" />
          <StatCard label="Flood probability" value="68%" delta="+12% 24h" trend="up" icon={CloudRain} tone="primary" />
          <StatCard label="Hydropower reserve" value="73%" delta="-4% week" trend="down" icon={Zap} tone="success" />
        </div>

        {/* map + alerts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Rwanda risk grid</h2>
                <p className="text-xs text-muted-foreground">Live flood-risk visualization · 30 districts</p>
              </div>
              <div className="text-xs text-success flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Updated 2 min ago
              </div>
            </div>
            <RwandaMap height={460} />
          </div>
          <div className="glass-strong rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active alerts</h2>
              <span className="text-xs text-muted-foreground">{alerts.length} total</span>
            </div>
            <div className="space-y-3 overflow-y-auto pr-1 -mr-1" style={{ maxHeight: 440 }}>
              {alerts.slice(0,5).map((a) => <AlertCard key={a.id} alert={a} />)}
            </div>
          </div>
        </div>

        {/* charts row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">7-day rainfall forecast</h2>
                <p className="text-xs text-muted-foreground">Actual vs ML-predicted (mm)</p>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-primary inline-block" />Actual</span>
                <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-accent inline-block" />Predicted</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={rainfallForecast}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.5}/><stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.18 155)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.72 0.18 155)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="day" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="actual" stroke="oklch(0.78 0.15 200)" strokeWidth={2} fill="url(#grad1)" />
                <Area type="monotone" dataKey="predicted" stroke="oklch(0.72 0.18 155)" strokeWidth={2} strokeDasharray="4 4" fill="url(#grad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Hydropower reservoirs</h2>
            <p className="text-xs text-muted-foreground mb-3">Water level vs capacity (%)</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={hydropowerLevels} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" horizontal={false} />
                <XAxis type="number" domain={[0,100]} {...chartAxis} />
                <YAxis dataKey="name" type="category" {...chartAxis} width={80} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="level" radius={[0,8,8,0]} fill="oklch(0.78 0.15 200)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* agriculture + SDG */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Agriculture stress index</h2>
                <p className="text-xs text-muted-foreground">NDVI-derived crop stress vs projected yield</p>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Sentinel-2 derived</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={agricultureStress}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="crop" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="stress" fill="oklch(0.78 0.18 70)" radius={[8,8,0,0]} />
                <Bar dataKey="yield" fill="oklch(0.72 0.18 155)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">SDG impact</h2>
            <p className="text-xs text-muted-foreground mb-3">Alignment progress</p>
            <div className="space-y-3 mt-4">
              {sdgIndicators.map((s) => (
                <div key={s.goal}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span><b className="text-primary">{s.goal}</b> · {s.name}</span>
                    <span className="font-semibold">{s.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* water quality cards */}
        <div className="glass-strong rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Water quality hotspots</h2>
              <p className="text-xs text-muted-foreground">Lowest water quality index districts</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[...districts].sort((a,b)=>a.waterQuality-b.waterQuality).slice(0,6).map((d)=>(
              <div key={d.name} className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                <div className="flex items-center gap-2"><Droplet className="h-4 w-4 text-primary" /><span className="text-sm font-semibold">{d.name}</span></div>
                <div className="mt-2 text-2xl font-semibold text-gradient">{d.waterQuality}<span className="text-sm text-muted-foreground">/100</span></div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.province}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
