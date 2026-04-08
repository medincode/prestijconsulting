"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const demoUsers = [
  { email: "gm@prestijconsulting.com", password: "demo2026", role: "General Manager", initials: "HL", name: "Hassan L." },
  { email: "sara@prestijconsulting.com", password: "demo2026", role: "Agent — Dubai", initials: "SK", name: "Sara Kovač" },
  { email: "elena@prestijconsulting.com", password: "demo2026", role: "Agent — Istanbul", initials: "EM", name: "Elena Morozova" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("gm@prestijconsulting.com");
  const [password, setPassword] = useState("demo2026");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const user = demoUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      setError("Invalid credentials. Use the demo accounts below.");
      return;
    }
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
  }

  return (
    <div className="min-h-screen flex" style={{
      background: "linear-gradient(145deg, #0d1628 0%, #1F2B4E 40%, #233156 70%, #162040 100%)"
    }}>
      {/* Left — Branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-16 relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(#BF9B3F 1px, transparent 1px), linear-gradient(90deg, #BF9B3F 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        {/* Orbs */}
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full"
          style={{ background: "rgba(191,155,63,0.12)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[-80px] left-[-80px] w-72 h-72 rounded-full"
          style={{ background: "rgba(237,171,27,0.08)", filter: "blur(80px)" }} />

        <div className="relative z-10">
          <div className="text-xl font-black tracking-wider" style={{ color: "#EDAB1B" }}>
            PRESTIJ CONSULTING
          </div>
          <div className="text-xs tracking-widest text-white/40 mt-1">AI-POWERED CRM PLATFORM</div>
        </div>

        <div className="relative z-10">
          <div className="text-5xl font-black text-white leading-tight mb-6">
            Every lead captured.<br />
            Every dirham<br />
            <span style={{ color: "#EDAB1B" }}>tracked.</span>
          </div>
          <p className="text-white/50 text-base leading-relaxed max-w-md">
            The intelligence layer for Prestij's Dubai & Istanbul real estate operations — from first WhatsApp message to final commission payout.
          </p>

          <div className="flex gap-8 mt-10">
            {[
              { val: "10×", label: "Agent Productivity" },
              { val: "0 min", label: "Lead Response" },
              { val: "24/7", label: "AI Coverage" },
            ].map(item => (
              <div key={item.label}>
                <div className="text-2xl font-black" style={{ color: "#EDAB1B" }}>{item.val}</div>
                <div className="text-xs text-white/40 mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-white/25">
          Dubai · Istanbul · Global Real Estate Advisory · April 2026
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="w-full lg:w-[440px] flex flex-col justify-center p-8 lg:p-12"
        style={{ background: "rgba(255,255,255,0.03)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mb-8">
          <div className="text-xl font-black lg:hidden mb-6" style={{ color: "#EDAB1B" }}>PRESTIJ CRM</div>
          <h2 className="text-2xl font-black text-white mb-1.5">Welcome back</h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Sign in to your CRM workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 tracking-wide"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              placeholder="your@prestijconsulting.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 tracking-wide"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
            style={{
              background: loading ? "rgba(191,155,63,0.5)" : "linear-gradient(135deg,#BF9B3F,#EDAB1B)",
              color: "#1F2B4E",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        {/* Demo accounts */}
        <div className="mt-8">
          <div className="text-xs font-semibold tracking-widest mb-3"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            DEMO ACCOUNTS — CLICK TO USE
          </div>
          <div className="space-y-2">
            {demoUsers.map(user => (
              <button
                key={user.email}
                onClick={() => { setEmail(user.email); setPassword(user.password); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
                  {user.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{user.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{user.role}</div>
                </div>
                <div className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
