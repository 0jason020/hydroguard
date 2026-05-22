import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/dashboard/Topbar";
import { FileBarChart, Download, FileText, ShieldCheck, Droplet, MapPin } from "lucide-react";

export const Route = createFileRoute("/dashboard/reports")({ component: Reports });

const reports = [
  { title: "Quarterly Climate Risk Report", period: "Q1 2026", icon: FileBarChart, pages: 64, size: "8.2 MB", desc: "Comprehensive climate risk synthesis across all 30 districts." },
  { title: "National Flood Analysis", period: "March 2026", icon: ShieldCheck, pages: 32, size: "4.1 MB", desc: "Probabilistic flood modeling outcomes and validated incidents." },
  { title: "Water Quality Summary", period: "March 2026", icon: Droplet, pages: 28, size: "3.4 MB", desc: "WQI scores, contamination events, and corrective actions." },
  { title: "District Vulnerability Index", period: "2026 edition", icon: MapPin, pages: 112, size: "14.6 MB", desc: "Multi-hazard vulnerability indices per district with socio-economic overlays." },
  { title: "Landslide Risk Bulletin", period: "Weekly", icon: FileText, pages: 14, size: "1.8 MB", desc: "Operational bulletin for Western Province slope risk." },
  { title: "Hydropower Reservoir Status", period: "March 2026", icon: FileBarChart, pages: 22, size: "2.6 MB", desc: "Reservoir level forecasts vs generation capacity." },
];

function Reports() {
  return (
    <>
      <Topbar title="Reports" subtitle="Downloadable climate intelligence reports for ministries, partners and public." />
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((r) => (
            <div key={r.title} className="glass rounded-2xl p-6 fade-up transition hover:-translate-y-1 hover:border-primary/40">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.period}</span>
              </div>
              <h3 className="mt-4 font-semibold leading-snug">{r.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{r.pages} pages · {r.size}</span>
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary/15 text-primary px-3 py-1.5 font-semibold hover:bg-primary/25 transition">
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
