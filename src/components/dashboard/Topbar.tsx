import { Bell, Search, Activity } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/60 px-6 py-5 glass-strong sticky top-0 z-30">
      <div>
        <div className="flex items-center gap-2 text-xs text-success">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-success" /></span>
          Live • Satellite feed synced
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2 text-sm w-64">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="bg-transparent outline-none w-full placeholder:text-muted-foreground/70" placeholder="Search districts, alerts…" />
        </div>
        <button className="relative grid h-10 w-10 place-items-center rounded-xl glass hover:border-primary/40 transition">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-danger text-[10px] font-bold text-danger-foreground">3</span>
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-xl glass hover:border-primary/40 transition">
          <Activity className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 px-3 py-1.5 border border-primary/30">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground text-xs font-semibold">AK</div>
          <div className="hidden md:block leading-tight">
            <div className="text-xs font-semibold">Dr. Aline Karenzi</div>
            <div className="text-[10px] text-muted-foreground">Climate Analyst</div>
          </div>
        </div>
      </div>
    </div>
  );
}
