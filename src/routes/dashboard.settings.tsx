import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { useState } from "react";
import { Bell, Palette, SlidersHorizontal, User2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({ component: Settings });

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className={`relative h-6 w-11 rounded-full transition ${on ? "bg-gradient-to-r from-primary to-accent" : "bg-secondary"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function Slider({ value, onChange, label }: { value: number; onChange: (n: number) => void; label: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2"><span className="text-muted-foreground">{label}</span><span className="font-semibold text-primary">{value}%</span></div>
      <input type="range" min={0} max={100} value={value} onChange={(e)=>onChange(Number(e.target.value))} className="w-full accent-primary" />
    </div>
  );
}

function Settings() {
  const [notif, setNotif] = useState({ sms: true, email: true, push: false, slack: true });
  const [thr, setThr] = useState({ flood: 70, landslide: 65, pollution: 55 });
  const [theme, setTheme] = useState<"dark"|"midnight"|"ocean">("dark");

  return (
    <>
      <Topbar title="Settings" subtitle="Tune your operator profile, alert thresholds and interface preferences." />
      <div className="p-6 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5"><User2 className="h-4 w-4 text-primary" /><h2 className="font-semibold">Profile</h2></div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { l: "Full name", v: "Dr. Aline Karenzi" },
                { l: "Email", v: "aline@minema.gov.rw" },
                { l: "Organization", v: "MINEMA / Climate Ops" },
                { l: "Role", v: "Senior Climate Analyst" },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-xs text-muted-foreground">{f.l}</label>
                  <input defaultValue={f.v} className="mt-1.5 w-full rounded-xl glass px-3 py-2.5 text-sm outline-none focus:border-primary/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5"><Bell className="h-4 w-4 text-primary" /><h2 className="font-semibold">Notifications</h2></div>
            <div className="space-y-4">
              {([
                ["sms","SMS to mobile","Critical alerts via SMS broadcast"],
                ["email","Email digest","Daily summary at 06:00 CAT"],
                ["push","Browser push","Real-time push notifications"],
                ["slack","Slack channel","#climate-ops dispatch"],
              ] as const).map(([k,t,d]) => (
                <div key={k} className="flex items-center justify-between">
                  <div><div className="text-sm font-medium">{t}</div><div className="text-xs text-muted-foreground">{d}</div></div>
                  <Toggle on={notif[k]} onChange={(v)=>setNotif({...notif,[k]:v})} />
                </div>
              ))}
            </div>
          </div>

          {/* Thresholds */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5"><SlidersHorizontal className="h-4 w-4 text-primary" /><h2 className="font-semibold">Risk thresholds</h2></div>
            <div className="space-y-5">
              <Slider label="Flood probability alert" value={thr.flood} onChange={(v)=>setThr({...thr,flood:v})} />
              <Slider label="Landslide saturation alert" value={thr.landslide} onChange={(v)=>setThr({...thr,landslide:v})} />
              <Slider label="Pollution turbidity alert" value={thr.pollution} onChange={(v)=>setThr({...thr,pollution:v})} />
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4"><Palette className="h-4 w-4 text-primary" /><h2 className="font-semibold">Theme</h2></div>
            <div className="space-y-2">
              {(["dark","midnight","ocean"] as const).map((t) => (
                <button key={t} onClick={()=>setTheme(t)} className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${theme===t?"border-primary/60 bg-primary/10":"border-border/60 hover:border-primary/30"}`}>
                  <span className={`h-6 w-6 rounded-md bg-gradient-to-br ${t==="dark"?"from-primary to-accent":t==="midnight"?"from-chart-5 to-primary":"from-cyan to-accent"}`} />
                  <span className="text-sm capitalize flex-1">{t}</span>
                  {theme===t && <span className="text-xs text-primary font-semibold">Active</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6">
            <h2 className="font-semibold">System status</h2>
            <div className="mt-3 space-y-2 text-sm">
              {[["Satellite ingest","success"],["ML pipeline","success"],["Database","success"],["Alert dispatch","success"]].map(([n,s])=>(
                <div key={n} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{n}</span>
                  <span className={`flex items-center gap-1.5 ${s==="success"?"text-success":"text-warning"}`}><span className={`h-1.5 w-1.5 rounded-full ${s==="success"?"bg-success animate-pulse":"bg-warning"}`} />Operational</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-3 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-90 transition">
            Save changes
          </button>
        </aside>
      </div>
    </>
  );
}
