import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { alerts } from "@/lib/sample-data";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/alerts")({ component: Alerts });

const tabs = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "warning", label: "Warnings" },
  { id: "info", label: "Info" },
] as const;

function Alerts() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const filtered = tab === "all" ? alerts : alerts.filter((a) => a.severity === tab);
  return (
    <>
      <Topbar title="Alert System" subtitle="Real-time emergency notifications and warnings routed across districts." />
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${tab===t.id?"bg-gradient-to-r from-primary to-accent text-primary-foreground glow-cyan":"glass hover:border-primary/40"}`}>
              {t.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Live stream
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {filtered.map((a) => <AlertCard key={a.id} alert={a} />)}
        </div>

        <div className="glass-strong rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-4">Distribution channels</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: "SMS broadcast", c: "MTN, Airtel", d: "Delivered to 1.2M devices" },
              { n: "MINEMA dispatch", c: "Government", d: "Realtime API · 24/7 ops" },
              { n: "Community radio", c: "8 stations", d: "Local language alerts" },
            ].map((c) => (
              <div key={c.n} className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                <div className="text-sm font-semibold">{c.n}</div>
                <div className="text-xs text-primary mt-0.5">{c.c}</div>
                <div className="text-xs text-muted-foreground mt-2">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
