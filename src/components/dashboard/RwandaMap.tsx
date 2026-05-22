import { useEffect, useState } from "react";
import { districts, type District } from "@/lib/sample-data";
import { team } from "@/lib/team";
import { Users, Map as MapIcon } from "lucide-react";

const riskColor = {
  high: "oklch(0.65 0.24 25)",
  moderate: "oklch(0.78 0.18 70)",
  low: "oklch(0.72 0.18 155)",
};

type Layer = "risk" | "team" | "both";

export function RwandaMap({
  height = 480,
  metric = "floodRisk" as keyof Pick<District, "floodRisk" | "landslideRisk">,
  onSelect,
  defaultLayer = "risk" as Layer,
  showLayerControl = true,
  data,
}: {
  height?: number;
  metric?: "floodRisk" | "landslideRisk";
  onSelect?: (d: District) => void;
  defaultLayer?: Layer;
  showLayerControl?: boolean;
  data?: District[];
}) {
  const items = data ?? districts;
  const [mounted, setMounted] = useState(false);
  const [Comp, setComp] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [layer, setLayer] = useState<Layer>(defaultLayer);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([RL, leaflet]) => {
      if (!cancelled) {
        setComp(() => RL);
        setL(() => leaflet);
        setMounted(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!mounted || !Comp || !L) {
    return (
      <div style={{ height }} className="glass rounded-2xl grid place-items-center overflow-hidden relative">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative z-10 text-sm text-muted-foreground shimmer rounded-full px-4 py-1.5">Loading Rwanda intelligence map…</div>
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Tooltip, Popup, Marker } = Comp;

  const showRisk = layer === "risk" || layer === "both";
  const showTeam = layer === "team" || layer === "both";

  const makeTeamIcon = (initials: string, color: string) =>
    L.divIcon({
      className: "team-marker",
      html: `<div style="background:${color};color:#0b1020;width:32px;height:32px;border-radius:9999px;display:grid;place-items:center;font-weight:700;font-size:11px;border:2px solid white;box-shadow:0 0 0 3px ${color}55, 0 2px 8px rgba(0,0,0,.4);">${initials}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

  return (
    <div className="rounded-2xl overflow-hidden border border-primary/20 glow-cyan relative" style={{ height }}>
      <MapContainer center={[-1.94, 29.87]} zoom={8} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {showRisk &&
          items.map((d) => {
            const level = d[metric];
            const color = riskColor[level];
            const radius = level === "high" ? 13 : level === "moderate" ? 10 : 7;
            return (
              <CircleMarker
                key={d.name}
                center={[d.lat, d.lng]}
                radius={radius}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.55, weight: 2 }}
                eventHandlers={{ click: () => onSelect?.(d) }}
              >
                <Tooltip direction="top" offset={[0, -8]}>
                  <div className="text-xs">
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-muted-foreground">{d.province} Province</div>
                    <div className="mt-1">Risk score: <span className="font-semibold">{d.riskScore}</span></div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="text-xs space-y-1">
                    <div className="font-semibold text-sm">{d.name}</div>
                    <div>Flood risk: <b className="capitalize">{d.floodRisk}</b></div>
                    <div>Landslide risk: <b className="capitalize">{d.landslideRisk}</b></div>
                    <div>Water quality: <b>{d.waterQuality}/100</b></div>
                    <div>7-day rainfall: <b>{d.rainfall} mm</b></div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        {showTeam &&
          team.map((m) => (
            <Marker key={m.name} position={[m.lat, m.lng]} icon={makeTeamIcon(m.avatar, m.color)}>
              <Tooltip direction="top" offset={[0, -16]}>
                <div className="text-xs">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-muted-foreground">{m.role}</div>
                </div>
              </Tooltip>
              <Popup>
                <div className="text-xs space-y-1">
                  <div className="font-semibold text-sm">{m.name}</div>
                  <div className="text-muted-foreground">{m.role}</div>
                  <div>Base: <b>{m.district}</b> · {m.province}</div>
                  <div className="mt-1">{m.focus}</div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {showLayerControl && (
        <div className="absolute top-3 right-3 z-[400] glass-strong rounded-xl p-1 flex items-center gap-1 text-xs">
          {(
            [
              { id: "risk" as Layer, label: "Risk", icon: MapIcon },
              { id: "team" as Layer, label: "Team", icon: Users },
              { id: "both" as Layer, label: "Both", icon: Users },
            ]
          ).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setLayer(opt.id)}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                layer === opt.id ? "bg-primary/20 text-primary border border-primary/40" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <opt.icon className="h-3 w-3" /> {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="absolute bottom-3 left-3 z-[400] glass-strong rounded-xl px-3 py-2 text-xs flex items-center gap-4 flex-wrap">
        {showRisk && (
          <>
            <span className="font-semibold uppercase tracking-wider text-[10px] text-muted-foreground">Risk</span>
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-success inline-block" />Low</span>
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-warning inline-block" />Moderate</span>
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-danger inline-block" />High</span>
          </>
        )}
        {showTeam && (
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-3 w-3" /> {team.length} field experts
          </span>
        )}
      </div>
    </div>
  );
}
