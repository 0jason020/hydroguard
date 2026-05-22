import { Droplets } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${dim} relative grid place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow-cyan`}>
        <Droplets className="h-1/2 w-1/2 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${text} font-semibold tracking-tight`}>
          Hydro<span className="text-gradient">Guard</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Rwanda</span>
      </div>
    </div>
  );
}
