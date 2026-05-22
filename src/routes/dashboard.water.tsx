import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { RwandaMap } from "@/components/dashboard/RwandaMap";
import { districts, waterQualityTrend, alerts } from "@/lib/sample-data";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { Droplet, FlaskConical, Waves, ShieldAlert } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const Route = createFileRoute("/dashboard/water")({ component: Water });

const axis = { stroke: "oklch(0.7 0.03 230)", fontSize: 11 };
const tip = { contentStyle: { background: "oklch(0.21 0.045 250)", border: "1px solid oklch(0.78 0.15 200 / 0.4)", borderRadius: 12, fontSize: 12 } };

function Water() {
  const pollutionAlerts = alerts.filter((a) => a.type === "pollution");
  return (
    <>
      <Topbar title="Water Pollution Detection" subtitle="River, lake and watershed quality monitored via in-situ sensors and Sentinel-2 imagery." />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Active hotspots" value="7" icon={ShieldAlert} tone="danger" />
          <StatCard label="Avg quality index" value="71/100" icon={Droplet} tone="primary" />
          <StatCard label="Turbidity (NTU)" value="22.4" icon={Waves} tone="warning" />
          <StatCard label="Samples this week" value="184" icon={FlaskConical} tone="success" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-1">Pollution hotspot map</h2>
            <p className="text-xs text-muted-foreground mb-4">Districts with declining water quality index</p>
            <RwandaMap height={420} metric="floodRisk" />
          </div>
          <div className="glass-strong rounded-2xl p-5 flex flex-col">
            <h2 className="text-lg font-semibold mb-3">River contamination alerts</h2>
            <div className="space-y-3 overflow-y-auto -mr-1 pr-1" style={{ maxHeight: 400 }}>
              {pollutionAlerts.length ? pollutionAlerts.map((a) => <AlertCard key={a.id} alert={a} />) : <p className="text-sm text-muted-foreground">No active contamination alerts.</p>}
              {alerts.filter(a=>a.type==="flood").slice(0,2).map(a=><AlertCard key={a.id} alert={a} />)}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Water quality trend</h2>
            <p className="text-xs text-muted-foreground mb-3">pH, turbidity (NTU), dissolved oxygen (mg/L)</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={waterQualityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
                <XAxis dataKey="week" {...axis} /><YAxis {...axis} />
                <Tooltip {...tip} /><Legend wrapperStyle={{fontSize:11}} />
                <Line type="monotone" dataKey="pH" stroke="oklch(0.78 0.15 200)" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="turbidity" stroke="oklch(0.78 0.18 70)" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="oxygen" stroke="oklch(0.72 0.18 155)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Sediment analysis</h2>
            <p className="text-xs text-muted-foreground mb-3">Suspended solids by source basin</p>
            <div className="space-y-3 mt-4">
              {[
                { name: "Nyabarongo", val: 78, color: "danger" },
                { name: "Akagera", val: 45, color: "warning" },
                { name: "Mukungwa", val: 62, color: "warning" },
                { name: "Rusizi", val: 88, color: "danger" },
                { name: "Lake Kivu", val: 34, color: "success" },
              ].map((b) => (
                <div key={b.name}>
                  <div className="flex justify-between text-xs mb-1.5"><span>{b.name}</span><span className="font-semibold">{b.val} mg/L</span></div>
                  <div className="h-2 rounded-full bg-secondary/60 overflow-hidden"><div className={`h-full rounded-full ${b.color==="danger"?"bg-danger":b.color==="warning"?"bg-warning":"bg-success"}`} style={{width:`${b.val}%`}} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4">Water quality index by district</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {districts.slice(0,15).map((d)=>(
              <div key={d.name} className="rounded-xl border border-border/60 bg-secondary/30 p-3">
                <div className="text-xs text-muted-foreground">{d.name}</div>
                <div className="mt-1 flex items-baseline gap-1"><span className={`text-xl font-semibold ${d.waterQuality<65?"text-danger":d.waterQuality<75?"text-warning":"text-success"}`}>{d.waterQuality}</span><span className="text-[10px] text-muted-foreground">/100</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
