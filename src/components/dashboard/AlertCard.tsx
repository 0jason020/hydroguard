import { cn } from "@/lib/utils";
import { AlertTriangle, Droplet, CloudRain, Mountain } from "lucide-react";
import type { AlertItem } from "@/lib/sample-data";

const iconMap = {
  flood: CloudRain,
  landslide: Mountain,
  pollution: Droplet,
  weather: AlertTriangle,
};

const severityStyle = {
  critical: "border-danger/40 bg-danger/5",
  warning: "border-warning/40 bg-warning/5",
  info: "border-primary/30 bg-primary/5",
};

const severityDot = {
  critical: "bg-danger pulse-ring",
  warning: "bg-warning",
  info: "bg-primary",
};

const severityText = {
  critical: "text-danger",
  warning: "text-warning",
  info: "text-primary",
};

export function AlertCard({ alert }: { alert: AlertItem }) {
  const Icon = iconMap[alert.type];
  return (
    <div className={cn("glass rounded-xl border p-4 fade-up transition hover:translate-x-0.5", severityStyle[alert.severity])}>
      <div className="flex items-start gap-3">
        <div className={cn("mt-1 h-2.5 w-2.5 shrink-0 rounded-full", severityDot[alert.severity])} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon className={cn("h-4 w-4", severityText[alert.severity])} />
              <span className="text-sm font-semibold capitalize">{alert.district}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", severityText[alert.severity], "bg-current/10")}>
                {alert.severity}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">{alert.timeAgo}</span>
          </div>
          <p className="mt-1.5 text-sm text-foreground/85">{alert.message}</p>
        </div>
      </div>
    </div>
  );
}
