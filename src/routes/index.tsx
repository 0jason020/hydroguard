import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight, Shield, Brain, Satellite, Activity, Droplets, Globe2, Sparkles, CheckCircle2, MapPin } from "lucide-react";
import { team } from "@/lib/team";
import { RwandaMap } from "@/components/dashboard/RwandaMap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HydroGuard Rwanda — AI Climate Risk & Water Intelligence" },
      { name: "description", content: "AI-powered climate risk and water intelligence system predicting floods, landslides, water pollution, and agricultural stress across Rwanda." },
      { property: "og:title", content: "HydroGuard Rwanda" },
      { property: "og:description", content: "Predict. Prevent. Protect. AI-Powered Climate Resilience for Rwanda." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Nav */}
      <header className="relative z-20">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#mission" className="hover:text-foreground transition">Mission</a>
            <a href="#features" className="hover:text-foreground transition">Intelligence</a>
            <a href="#ggcrs" className="hover:text-foreground transition">GGCRS</a>
            <a href="#team" className="hover:text-foreground transition">Team</a>
            <a href="#impact" className="hover:text-foreground transition">Impact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/60 transition">Sign in</Link>
            <Link to="/dashboard" className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-90 transition flex items-center gap-1.5">
              Launch <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28">
          <div className="text-center max-w-4xl mx-auto fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Aligned with Rwanda's GGCRS 2050 & National Climate Vision</span>
            </div>
            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              Predict. Prevent. <span className="text-gradient">Protect.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered climate resilience for Rwanda. Real-time intelligence on floods, landslides,
              water quality and agricultural stress — fused from satellite, ground-station and ML pipelines.
            </p>
            <div className="mt-9 flex items-center justify-center gap-3">
              <Link to="/dashboard" className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-90 transition flex items-center gap-2">
                Open command center <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/signup" className="rounded-xl glass px-6 py-3 text-sm font-semibold hover:border-primary/40 transition">
                Request agency access
              </Link>
            </div>

            {/* metrics */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { v: "30", l: "Districts monitored" },
                { v: "24/7", l: "Satellite ingest" },
                { v: "94%", l: "Prediction accuracy" },
                { v: "<12h", l: "Alert lead time" },
              ].map((m) => (
                <div key={m.l} className="glass rounded-2xl p-4">
                  <div className="text-2xl md:text-3xl font-semibold text-gradient">{m.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Mission</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">An early-warning nervous system for a warming nation.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Rwanda's hills, rivers and rains are changing. HydroGuard unifies satellite radar, rain gauges, soil
              telemetry and machine learning to give districts, ministries and emergency responders a single,
              trustworthy view of climate risk — before it becomes climate disaster.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Flood probability scores per district, refreshed hourly",
                "Landslide saturation modeling with terrain & rainfall fusion",
                "Water quality contamination detection from Sentinel-2 imagery",
                "Agricultural NDVI stress for maize, beans, coffee and tea",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass-strong rounded-3xl p-6 glow-cyan">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-transparent grid-bg relative overflow-hidden">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <Globe2 className="h-16 w-16 mx-auto text-primary float" />
                    <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Real-time intelligence</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div><div className="text-2xl font-semibold text-success">Low</div><div className="text-[10px] uppercase text-muted-foreground">East</div></div>
                <div><div className="text-2xl font-semibold text-warning">Mod</div><div className="text-[10px] uppercase text-muted-foreground">South</div></div>
                <div><div className="text-2xl font-semibold text-danger">High</div><div className="text-[10px] uppercase text-muted-foreground">West</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Intelligence stack</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Six fused signals. One operational picture.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Satellite, title: "Satellite ingest", desc: "Sentinel-1 SAR & Sentinel-2 optical pipelines processed every 6 hours." },
            { icon: Brain, title: "Machine learning", desc: "Ensemble of LSTM rainfall, XGBoost flood, and random-forest landslide models." },
            { icon: Droplets, title: "Hydropower telemetry", desc: "Reservoir levels for Nyabarongo I, Mukungwa, Rusizi II and Rukarara." },
            { icon: Activity, title: "Anomaly detection", desc: "Climate variability vs 30-year baselines flagged automatically." },
            { icon: Shield, title: "District alerts", desc: "Severity-graded notifications routed to MINEMA and local responders." },
            { icon: Globe2, title: "GIS visualization", desc: "Interactive Leaflet maps with hover, drill-down and clickable districts." },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary/40 group">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:glow-cyan transition">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GGCRS */}
      <section id="ggcrs" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="glass-strong rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-accent/30 blur-[100px]" />
          <div className="relative grid lg:grid-cols-2 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">National Alignment</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight">Built for Rwanda's Climate Vision.</h2>
              <p className="mt-4 text-muted-foreground">
                HydroGuard is engineered to support the Green Growth and Climate Resilience Strategy (GGCRS),
                Vision 2050, and the National Determined Contributions to the Paris Agreement.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "GGCRS", v: "Pillars 4, 9, 11 supported" },
                { k: "NDC", v: "38% emissions cut by 2030" },
                { k: "Vision 2050", v: "Resilient infrastructure" },
                { k: "MINEMA", v: "Real-time response feeds" },
              ].map((b) => (
                <div key={b.k} className="rounded-xl border border-border/60 bg-secondary/30 p-4">
                  <div className="text-xs uppercase tracking-wider text-primary font-semibold">{b.k}</div>
                  <div className="mt-1 text-sm">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Team</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">A field network across all four provinces.</h2>
          <p className="mt-3 text-muted-foreground">
            Hydrologists, GIS engineers, climate data scientists and field responders — distributed from Kigali HQ to
            the volcanic north, lake-side west, agricultural south and savanna east.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <RwandaMap height={460} defaultLayer="both" />
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[460px] lg:overflow-auto pr-1">
            {team.map((m) => (
              <div key={m.name} className="glass rounded-2xl p-4 flex gap-3 items-start hover:border-primary/40 transition">
                <div
                  className="h-11 w-11 rounded-full grid place-items-center text-xs font-bold shrink-0"
                  style={{ background: m.color, color: "oklch(0.16 0.04 250)" }}
                >
                  {m.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{m.name}</div>
                  <div className="text-xs text-primary">{m.role}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {m.district} · {m.province}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{m.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="relative mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold text-center">Sustainability impact</p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-center">Measured against the SDGs.</h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { g: "SDG 6", n: "Clean Water & Sanitation", p: 72 },
            { g: "SDG 11", n: "Sustainable Communities", p: 65 },
            { g: "SDG 13", n: "Climate Action", p: 78 },
            { g: "SDG 15", n: "Life on Land", p: 69 },
          ].map((s) => (
            <div key={s.g} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">{s.g}</span>
                <span className="text-2xl font-semibold text-gradient">{s.p}%</span>
              </div>
              <p className="mt-2 text-sm font-medium">{s.n}</p>
              <div className="mt-3 h-1.5 rounded-full bg-secondary/60 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: `${s.p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent border border-primary/30 p-10 md:p-14 text-center glow-cyan">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Climate resilience, operationalized.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Launch the operations console and explore live risk intelligence across all 30 districts of Rwanda.</p>
          <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-90 transition">
            Open dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/60 mt-10">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-muted-foreground">© 2026 HydroGuard Rwanda · An AI Climate Intelligence Initiative</p>
        </div>
      </footer>
    </div>
  );
}
