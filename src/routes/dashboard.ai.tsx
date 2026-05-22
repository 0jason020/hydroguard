import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { aiInsights } from "@/lib/sample-data";
import { Brain, Sparkles, Activity, Cpu, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard/ai")({ component: AI });

function AI() {
  return (
    <>
      <Topbar title="AI Intelligence" subtitle="Machine learning predictions, anomaly detection and AI-generated risk scores." />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { l: "Models in production", v: "12", i: Brain },
            { l: "Predictions / day", v: "48.2k", i: Cpu },
            { l: "Avg confidence", v: "91%", i: Sparkles },
            { l: "Anomalies (24h)", v: "23", i: Activity },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5 fade-up relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <s.i className="h-5 w-5 text-primary" />
              <div className="mt-3 text-3xl font-semibold text-gradient">{s.v}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {aiInsights.map((ins) => (
            <div key={ins.title} className="glass-strong rounded-2xl p-6 fade-up relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    <span className="uppercase tracking-wider text-accent font-semibold">Predictive insight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <span className="text-sm font-semibold text-primary">{ins.confidence}%</span>
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{ins.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ins.insight}</p>
                <div className="mt-4 h-1.5 rounded-full bg-secondary/60 overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-accent" style={{width:`${ins.confidence}%`}} /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold">Model registry</h2>
              <p className="text-xs text-muted-foreground">Production ML pipelines</p>
            </div>
            <span className="text-xs text-success flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> All healthy</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                  <th className="py-2.5">Model</th><th>Type</th><th>Last trained</th><th>Accuracy</th><th>Latency</th><th>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {[
                  { n: "FloodLSTM-v4", t: "Time series", d: "12h ago", a: "94.2%", l: "82ms" },
                  { n: "LandslideGBM-v3", t: "Gradient boost", d: "2d ago", a: "89.7%", l: "41ms" },
                  { n: "WaterAnomaly-v2", t: "Autoencoder", d: "6h ago", a: "91.3%", l: "118ms" },
                  { n: "NDVIStress-v5", t: "CNN", d: "1d ago", a: "86.5%", l: "204ms" },
                  { n: "RainfallTransformer", t: "Transformer", d: "3h ago", a: "92.8%", l: "67ms" },
                ].map((m) => (
                  <tr key={m.n} className="hover:bg-secondary/20 transition">
                    <td className="py-3 font-medium flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-primary" />{m.n}</td>
                    <td className="text-muted-foreground">{m.t}</td><td className="text-muted-foreground">{m.d}</td>
                    <td className="text-success font-medium">{m.a}</td><td className="text-muted-foreground">{m.l}</td>
                    <td><span className="inline-flex items-center gap-1.5 text-xs"><span className="h-1.5 w-1.5 rounded-full bg-success" />Live</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
