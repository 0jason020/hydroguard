import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "danger";
}

const toneMap = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function StatCard({ label, value, delta, trend, icon: Icon, tone = "primary" }: StatCardProps) {
  return (
    <div className="glass rounded-2xl p-5 fade-up transition hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
          {delta && (
            <div className={cn("mt-2 inline-flex items-center gap-1 text-xs font-medium",
              trend === "up" ? "text-success" : "text-danger")}>
              {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {delta}
            </div>
          )}
        </div>
        <div className={cn("rounded-xl bg-secondary/60 p-2.5", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
