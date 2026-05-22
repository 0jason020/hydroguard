import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight, Mail, Lock, User, Building2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Request access — HydroGuard Rwanda" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-accent/15 via-primary/10 to-background p-12 flex-col justify-between">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute bottom-20 left-10 h-72 w-72 rounded-full bg-accent/30 blur-[100px]" />
        <Link to="/" className="relative z-10"><Logo /></Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-semibold tracking-tight">Join the resilience<br/><span className="text-gradient">mission.</span></h2>
          <p className="mt-3 text-muted-foreground max-w-md">For agencies, ministries, NGOs and research institutions building Rwanda's climate future.</p>
        </div>
      </div>
      <div className="flex flex-col p-8 lg:p-12 justify-center max-w-md w-full mx-auto">
        <div className="lg:hidden mb-8"><Logo /></div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Request access</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create your operator account.</h1>
        <form className="mt-8 space-y-4" onSubmit={(e)=>{e.preventDefault(); navigate({to:"/dashboard"});}}>
          {[
            { label: "Full name", icon: User, placeholder: "CYUSA JASON" },
            { label: "Organization", icon: Building2, placeholder: " Meteo Rwanda" },
            { label: "Email", icon: Mail, placeholder: "cyusajason209@gmail.com" },
            { label: "Password", icon: Lock, placeholder: "password", type: "password" },
          ].map((f)=>(
            <div key={f.label}>
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl glass px-3 py-2.5">
                <f.icon className="h-4 w-4 text-muted-foreground" />
                <input type={f.type ?? "text"} placeholder={f.placeholder} className="bg-transparent outline-none w-full text-sm placeholder:text-muted-foreground/70" />
              </div>
            </div>
          ))}
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-3 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-90 transition flex items-center justify-center gap-2">
            Create account <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-6 text-xs text-center text-muted-foreground">
          Already an operator? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
