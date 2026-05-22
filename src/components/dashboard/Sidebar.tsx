import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, CloudRain, Mountain, Droplet, Brain, BellRing,
  ThermometerSun, FileBarChart, Settings, LogOut,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/flood", label: "Flood Prediction", icon: CloudRain },
  { to: "/dashboard/landslide", label: "Landslide Risk", icon: Mountain },
  { to: "/dashboard/water", label: "Water Quality", icon: Droplet },
  { to: "/dashboard/weather", label: "Weather Analytics", icon: ThermometerSun },
  { to: "/dashboard/ai", label: "AI Intelligence", icon: Brain },
  { to: "/dashboard/alerts", label: "Alerts", icon: BellRing },
  { to: "/dashboard/reports", label: "Reports", icon: FileBarChart },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <Link to="/"><Logo /></Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Intelligence</p>
        {nav.map((item) => {
          const active = item.exact ? path === item.to : path.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              {active && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary glow-cyan" />}
              <Icon className={cn("h-4 w-4 transition", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link to="/login" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition">
          <LogOut className="h-4 w-4" />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
