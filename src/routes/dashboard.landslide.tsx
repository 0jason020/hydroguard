import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { RwandaMap } from "@/components/dashboard/RwandaMap";
import { useLiveClimate } from "@/lib/use-live";
import { Mountain, Layers, Droplets, TriangleAlert } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/dashboard/landslide")({ component: Landslide });

const axis = { stroke: "oklch(0.7 0.03 230)", fontSize: 11 };
const tip = { contentStyle: { background: "oklch(0.21 0.045 250)", border: "1px solid oklch(0.72 0.18 155 / 0.4)", borderRadius: 12, fontSize: 12 } };

const terrainRadar = [
  { factor: "Slope angle", val: 82 },
  { factor: "Rainfall saturation", val: 91 },
  { factor: "Soil erosion", val: 74 },
  { factor: "Vegetation loss", val: 58 },
  { factor: "Seismic activity", val: 32 },
  { factor: "Land use change", val: 67 },
];

function Landslide() {
  const { districts } = useLiveClimate();
  const high = districts.filter((d) => d.landslideRisk === "high");
  return (
    <>
      <Topbar title="Landslide Risk" subtitle="Terrain, soil and rainfall fusion model for slope-failure prediction." />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="High-risk slopes" value={String(high.length)} icon={Mountain} tone="danger" />
          <StatCard label="Avg slope angle" value="28°" icon={Layers} tone="warning" />
          <StatCard label="Soil saturation" value="76%" icon={Droplets} tone="primary" />
          <StatCard label="Warnings issued" value="11" icon={TriangleAlert} tone="warning" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-1">Landslide risk zones</h2>
            <p className="text-xs text-muted-foreground mb-4">High concentration in Western and Northern provinces</p>
            <RwandaMap height={420} metric="landslideRisk" data={districts} />
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Risk factor fingerprint</h2>
            <p className="text-xs text-muted-foreground mb-3">Multi-dimensional contributors</p>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={terrainRadar}>
                <PolarGrid stroke="oklch(0.32 0.04 240 / 0.4)" />
                <PolarAngleAxis dataKey="factor" tick={{ fill: "oklch(0.7 0.03 230)", fontSize: 10 }} />
                <Radar dataKey="val" stroke="oklch(0.72 0.18 155)" fill="oklch(0.72 0.18 155)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-5">
          <h2 className="text-lg font-semibold">Top landslide-prone districts</h2>
          <p className="text-xs text-muted-foreground mb-3">Risk score derived from slope, saturation and erosion</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[...districts].sort((a,b)=>b.riskScore-a.riskScore).slice(0,10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.32 0.04 240 / 0.3)" />
              <XAxis dataKey="name" {...axis} angle={-30} textAnchor="end" height={70} />
              <YAxis {...axis} />
              <Tooltip {...tip} />
              <Bar dataKey="riskScore" fill="oklch(0.72 0.18 155)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
