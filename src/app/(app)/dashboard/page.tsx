"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { kpis, leads, deals, agents, formatCurrency } from "@/lib/mock-data";

type Market = "Dubai" | "Istanbul";

function KpiCard({ icon, value, label, change, prefix = "" }: {
  icon: string; value: string; label: string; change: number; prefix?: string;
}) {
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden flex flex-col gap-1"
      style={{
        background: "linear-gradient(135deg,#1F2B4E,#233156)",
        border: "1px solid rgba(191,155,63,0.15)"
      }}>
      <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full"
        style={{ background: "rgba(237,171,27,0.06)" }} />
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-black" style={{ color: "#EDAB1B" }}>{prefix}{value}</div>
      <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</div>
      <div className="text-xs font-semibold" style={{ color: change >= 0 ? "#10B981" : "#EF4444" }}>
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% vs last month
      </div>
    </div>
  );
}

const monthlyData = [
  { month: "Oct", value: 55, commissions: 82000 },
  { month: "Nov", value: 70, commissions: 95000 },
  { month: "Dec", value: 45, commissions: 71000 },
  { month: "Jan", value: 85, commissions: 118000 },
  { month: "Feb", value: 60, commissions: 96000 },
  { month: "Mar", value: 100, commissions: 128000 },
];

const dubaiPipeline = [
  { stage: "Qualification", count: 48, pct: 80 },
  { stage: "Meeting", count: 31, pct: 60 },
  { stage: "Offer Sent", count: 19, pct: 40 },
  { stage: "Reservation", count: 11, pct: 25 },
  { stage: "SPA / Closed", count: 7, pct: 15, green: true },
];

const istanbulPipeline = [
  { stage: "Qualification", count: 18, pct: 80 },
  { stage: "Meeting", count: 12, pct: 60 },
  { stage: "Offer Sent", count: 8, pct: 40 },
  { stage: "Reservation", count: 5, pct: 25 },
  { stage: "SPA / Closed", count: 3, pct: 15, green: true },
];

const recentActivities = [
  { icon: "🤖", text: "AI called Dmitri Volkov — no answer. WhatsApp sent in Russian.", time: "2 min ago", color: "#8B5CF6" },
  { icon: "✅", text: "Ahmed Yilmaz moved to Reservation — Elena Morozova", time: "1h ago", color: "#10B981" },
  { icon: "💬", text: "New WhatsApp lead from Meta Ads — AI scoring in progress", time: "2h ago", color: "#EDAB1B" },
  { icon: "🎯", text: "Sara Kovač sent offer to Wang Fang — JVC 1BR off-plan", time: "3h ago", color: "#3B82F6" },
  { icon: "💰", text: "Commission paid — Mohammed Al-Qassimi deal · $43,090", time: "Yesterday", color: "#10B981" },
  { icon: "📞", text: "Sophia Laurent — follow-up call scheduled for tomorrow", time: "Yesterday", color: "#BF9B3F" },
];

export default function DashboardPage() {
  const [market, setMarket] = useState<Market>("Dubai");
  const data = market === "Dubai" ? kpis.dubai : kpis.istanbul;
  const pipeline = market === "Dubai" ? dubaiPipeline : istanbulPipeline;
  const marketLeads = leads.filter(l => l.market === market);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0f1929" }}>
      <Topbar
        title={`📊 Executive Dashboard — ${market}`}
        market="both"
        onMarketChange={setMarket}
        activeMarket={market}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon="👥" value={data.newLeads.toString()} label="New Leads (30d)" change={data.newLeadsChange} />
          <KpiCard icon="💹" value={formatCurrency(data.pipelineValue)} label="Pipeline Value" change={data.pipelineChange} />
          <KpiCard icon="💰" value={formatCurrency(data.commissionMTD)} label="Commission (MTD)" change={data.commissionChange} />
          <KpiCard icon="🤖" value={`${data.avgAiScore}%`} label="Avg AI Lead Score" change={data.aiScoreChange} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar Chart */}
          <div className="lg:col-span-2 rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-sm font-bold text-white">Monthly Closings & Commission</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Last 6 months</div>
              </div>
              <div className="text-xs px-3 py-1.5 rounded-lg" style={{
                background: "rgba(237,171,27,0.1)", color: "#EDAB1B", border: "1px solid rgba(237,171,27,0.2)"
              }}>
                {market}
              </div>
            </div>
            <div className="flex items-end gap-3 h-36">
              {monthlyData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs font-bold" style={{ color: i === monthlyData.length - 1 ? "#EDAB1B" : "transparent", fontSize: "10px" }}>
                    {formatCurrency(d.commissions)}
                  </div>
                  <div className="w-full rounded-t-md transition-all"
                    style={{
                      height: `${d.value}%`,
                      background: i === monthlyData.length - 1
                        ? "linear-gradient(180deg,#EDAB1B,#BF9B3F)"
                        : "rgba(191,155,63,0.35)",
                      minHeight: "8px"
                    }} />
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{d.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-sm font-bold text-white mb-1">Pipeline Stages</div>
            <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Active deals by stage</div>
            <div className="space-y-3">
              {pipeline.map(p => (
                <div key={p.stage}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>{p.stage}</span>
                    <span style={{ color: p.green ? "#10B981" : "#EDAB1B" }} className="font-bold">{p.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{
                        width: `${p.pct}%`,
                        background: p.green
                          ? "linear-gradient(90deg,#10B981,#059669)"
                          : "linear-gradient(90deg,#BF9B3F,#EDAB1B)"
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Agent leaderboard */}
          <div className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-sm font-bold text-white mb-1">Agent Leaderboard</div>
            <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Commission earned · MTD</div>
            <div className="space-y-3">
              {agents
                .filter(a => a.market === market || market === "Dubai")
                .sort((a, b) => b.commissionEarned - a.commissionEarned)
                .slice(0, 5)
                .map((agent, i) => (
                  <div key={agent.id} className="flex items-center gap-3">
                    <div className="w-5 text-xs font-bold text-center"
                      style={{ color: i === 0 ? "#EDAB1B" : "rgba(255,255,255,0.3)" }}>
                      {i === 0 ? "🥇" : `${i + 1}`}
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
                      {agent.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{agent.name}</div>
                      <div className="h-1 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full"
                          style={{
                            width: `${(agent.achieved / agent.target) * 100}%`,
                            background: "linear-gradient(90deg,#BF9B3F,#EDAB1B)"
                          }} />
                      </div>
                    </div>
                    <div className="text-xs font-bold" style={{ color: "#EDAB1B" }}>
                      {formatCurrency(agent.commissionEarned)}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-sm font-bold text-white mb-1">Live Activity Feed</div>
            <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Real-time platform events</div>
            <div className="space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 pb-3"
                  style={{ borderBottom: i < recentActivities.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: `${a.color}15` }}>
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/70 leading-relaxed">{a.text}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,rgba(139,92,246,0.15),rgba(109,40,217,0.1))",
            border: "1px solid rgba(139,92,246,0.2)"
          }}>
          <div className="flex items-start gap-4">
            <div className="text-3xl">🤖</div>
            <div>
              <div className="text-sm font-bold text-white mb-1">AI Weekly Insight — {market}</div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {market === "Dubai"
                  ? "Russian-speaking investors are converting at 34% this month — 2.1× above average. Recommend increasing Meta Ads budget targeting Moscow/St. Petersburg, specifically for Dubai Marina 2BR inventory. Alexander Petrov's scheduled visit on April 20 has an 89% close probability based on engagement signals."
                  : "Turkish citizenship-motivated buyers are the highest-intent segment in Istanbul this month. Ahmed Yilmaz's reservation confirms the pattern. Consider launching a targeted campaign for $400K+ properties in Beylikdüzü and Başakşehir, emphasizing the citizenship pathway."
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
