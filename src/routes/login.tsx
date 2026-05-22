import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — HydroGuard Rwanda" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("cyusajason209@gmail.com");
  const [password, setPassword] = useState("cyusa209");

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* visual */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary/15 via-accent/10 to-background p-12 flex-col justify-between">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-accent/30 blur-[100px]" />
        <Link to="/" className="relative z-10"><Logo /></Link>
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-semibold tracking-tight leading-tight">Climate intelligence,<br/><span className="text-gradient">on duty 24/7.</span></h2>
          <p className="text-muted-foreground max-w-md">Sign in to monitor real-time risk across Rwanda's 30 districts.</p>
          <div className="flex gap-2 pt-4">
            {["🛰","🌧","⛰","💧"].map((e,i)=>(<div key={i} className="glass rounded-xl h-12 w-12 grid place-items-center text-lg float" style={{animationDelay:`${i*0.4}s`}}>{e}</div>))}
          </div>
        </div>
      </div>
      {/* form */}
      <div className="flex flex-col p-8 lg:p-12 justify-center max-w-md w-full mx-auto">
        <div className="lg:hidden mb-8"><Logo /></div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Operator console</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back.</h1>
          <p className="mt-2 text-sm text-muted-foreground">Authenticate to access the climate command center.</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={(e)=>{e.preventDefault(); navigate({to:"/dashboard"});}}>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl glass px-3 py-2.5">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-transparent outline-none w-full text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl glass px-3 py-2.5">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-transparent outline-none w-full text-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" defaultChecked className="accent-primary" /> Keep me signed in</label>
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-3 text-sm font-semibold text-primary-foreground glow-cyan hover:opacity-90 transition flex items-center justify-center gap-2">
            Enter command center <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-6 text-xs text-center text-muted-foreground">
          New operator? <Link to="/signup" className="text-primary hover:underline">Request access</Link>
        </p>
      </div>
    </div>
  );
}
