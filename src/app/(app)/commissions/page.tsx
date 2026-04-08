"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { deals, agents, Market, formatCurrency } from "@/lib/mock-data";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Paid":           "bg-green-500/15 text-green-400 border border-green-500/20",
    "Partially Paid": "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    "Pending":        "bg-red-500/15 text-red-400 border border-red-500/20",
  };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

function PaymentBadge({ method }: { method: string }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded font-semibold"
      style={{
        background: method === "Bank" ? "rgba(59,130,246,0.1)" : "rgba(245,158,11,0.1)",
        color: method === "Bank" ? "#60a5fa" : "#F59E0B",
      }}>
      {method === "Bank" ? "🏦 Bank" : "💵 Cash"}
    </span>
  );
}

const summaryCards = [
  { icon: "💰", label: "Gross Commission (MTD)", value: "$166,400", change: "+12%", color: "#EDAB1B" },
  { icon: "🧑‍💼", label: "Total Agent Payouts", value: "$60,467", change: "+8%", color: "#10B981" },
  { icon: "🏢", label: "Company Net (MTD)", value: "$71,600", change: "+15%", color: "#3B82F6" },
  { icon: "⏳", label: "Pending Payments", value: "$3,817", change: "1 deal", color: "#F59E0B" },
];

export default function CommissionsPage() {
  const [market, setMarket] = useState<Market>("Dubai");
  const [tab, setTab] = useState<"deals" | "agents">("deals");

  const filteredDeals = deals.filter(d => d.market === market || market === "Dubai");

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0f1929" }}>
      <Topbar
        title="💰 Commission Engine"
        market="both"
        onMarketChange={setMarket}
        activeMarket={market}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Summary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map(card => (
            <div key={card.label} className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#1F2B4E,#233156)",
                border: "1px solid rgba(191,155,63,0.12)"
              }}>
              <div className="absolute top-[-15px] right-[-15px] w-16 h-16 rounded-full"
                style={{ background: "rgba(237,171,27,0.05)" }} />
              <div className="text-2xl mb-2">{card.icon}</div>
              <div className="text-xl font-black mb-0.5" style={{ color: card.color }}>{card.value}</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{card.label}</div>
              <div className="text-xs mt-1 font-semibold" style={{ color: "#10B981" }}>{card.change}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["deals", "agents"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="text-sm px-4 py-2 rounded-xl font-semibold transition-all capitalize"
              style={tab === t
                ? { background: "rgba(237,171,27,0.15)", color: "#EDAB1B", border: "1px solid rgba(237,171,27,0.3)" }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }
              }>
              {t === "deals" ? "📋 Deal Commissions" : "🧑‍💼 Agent Payouts"}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button className="text-xs px-3 py-2 rounded-lg font-medium"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              📄 Export Excel
            </button>
            <button className="text-xs px-3 py-2 rounded-lg font-medium"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              📑 Export PDF
            </button>
            <button className="text-xs px-3 py-2 rounded-lg font-medium"
              style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
              + Log Deal
            </button>
          </div>
        </div>

        {/* Deals Table */}
        {tab === "deals" && (
          <div className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "linear-gradient(135deg,#1F2B4E,#233156)" }}>
                  {["Lead / Property", "Market", "Sale Price", "Dev Comm %", "Gross Comm", "Agent", "Agent Payout", "Company Net", "Payment", "Status", ""].map(h => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-bold tracking-wide"
                      style={{ color: "rgba(255,255,255,0.55)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal, i) => (
                  <tr key={deal.id}
                    className="transition-colors"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(237,171,27,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent")}
                  >
                    <td className="px-4 py-3.5">
                      <div className="text-sm font-semibold text-white">{deal.leadName}</div>
                      <div className="text-xs text-white/40">{deal.property}</div>
                      <div className="text-xs text-white/25">{deal.developer} · {deal.closedAt}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs">{deal.market === "Dubai" ? "🇦🇪" : "🇹🇷"} {deal.market}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm font-bold text-white">{formatCurrency(deal.salePrice)}</div>
                      <div className="text-xs text-white/30">{deal.currency}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 rounded-full bg-white/10">
                          <div className="h-full rounded-full"
                            style={{ width: `${deal.devCommPct * 20}%`, background: "linear-gradient(90deg,#BF9B3F,#EDAB1B)" }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: "#EDAB1B" }}>{deal.devCommPct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm font-bold" style={{ color: "#EDAB1B" }}>
                        {formatCurrency(deal.grossComm)}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-xs text-white/60">{deal.agent}</div>
                      <div className="text-xs text-white/30">{deal.agentCommPct}% split</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm font-bold text-white">{formatCurrency(deal.agentPayout)}</div>
                      <div className="text-xs text-white/30">After tax & costs</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm font-bold" style={{ color: "#10B981" }}>
                        {formatCurrency(deal.companyNet)}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <PaymentBadge method={deal.paymentMethod} />
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={deal.paymentStatus} />
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-xs px-2.5 py-1.5 rounded-lg transition-all"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Commission breakdown footer */}
            <div className="px-6 py-4 flex items-center gap-8"
              style={{ background: "rgba(237,171,27,0.04)", borderTop: "1px solid rgba(237,171,27,0.1)" }}>
              <div>
                <div className="text-xs text-white/35">Total Sale Volume</div>
                <div className="text-base font-black text-white">
                  {formatCurrency(filteredDeals.reduce((s, d) => s + d.salePrice, 0))}
                </div>
              </div>
              <div>
                <div className="text-xs text-white/35">Total Gross Commission</div>
                <div className="text-base font-black" style={{ color: "#EDAB1B" }}>
                  {formatCurrency(filteredDeals.reduce((s, d) => s + d.grossComm, 0))}
                </div>
              </div>
              <div>
                <div className="text-xs text-white/35">Total Agent Payouts</div>
                <div className="text-base font-black text-white">
                  {formatCurrency(filteredDeals.reduce((s, d) => s + d.agentPayout, 0))}
                </div>
              </div>
              <div>
                <div className="text-xs text-white/35">Total Company Net</div>
                <div className="text-base font-black" style={{ color: "#10B981" }}>
                  {formatCurrency(filteredDeals.reduce((s, d) => s + d.companyNet, 0))}
                </div>
              </div>
              <div className="ml-auto text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(237,171,27,0.1)", color: "#EDAB1B", border: "1px solid rgba(237,171,27,0.2)" }}>
                🤖 AI auto-calculated · Zero errors
              </div>
            </div>
          </div>
        )}

        {/* Agents Payout Tab */}
        {tab === "agents" && (
          <div className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "linear-gradient(135deg,#1F2B4E,#233156)" }}>
                  {["Agent", "Market", "Target", "Achieved", "Deals Closed", "Gross Comm", "Commission Earned", "Target Progress", ""].map(h => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-bold tracking-wide"
                      style={{ color: "rgba(255,255,255,0.55)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, i) => {
                  const pct = Math.min(100, Math.round((agent.achieved / agent.target) * 100));
                  return (
                    <tr key={agent.id}
                      className="transition-colors"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(237,171,27,0.04)")}
                      onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent")}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
                            {agent.initials}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{agent.name}</div>
                            <div className="text-xs px-2 py-0.5 rounded inline-block mt-0.5"
                              style={{
                                background: agent.role === "Manager" ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.06)",
                                color: agent.role === "Manager" ? "#a78bfa" : "rgba(255,255,255,0.4)"
                              }}>
                              {agent.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs">{agent.market === "Dubai" ? "🇦🇪" : "🇹🇷"} {agent.market}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-semibold text-white">{formatCurrency(agent.target)}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-semibold" style={{ color: "#EDAB1B" }}>{formatCurrency(agent.achieved)}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-bold text-white text-center">{agent.closed}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-semibold text-white">{agent.leads} leads</div>
                        <div className="text-xs text-white/30">{agent.meetings} meetings</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-black" style={{ color: "#10B981" }}>
                          {formatCurrency(agent.commissionEarned)}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-white/10">
                            <div className="h-full rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                background: pct >= 80 ? "linear-gradient(90deg,#10B981,#059669)"
                                  : pct >= 60 ? "linear-gradient(90deg,#BF9B3F,#EDAB1B)"
                                    : "linear-gradient(90deg,#EF4444,#DC2626)"
                              }} />
                          </div>
                          <span className="text-xs font-bold w-10 text-right"
                            style={{ color: pct >= 80 ? "#10B981" : pct >= 60 ? "#EDAB1B" : "#EF4444" }}>
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="text-xs px-2.5 py-1.5 rounded-lg"
                          style={{ background: "rgba(237,171,27,0.1)", color: "#EDAB1B", border: "1px solid rgba(237,171,27,0.2)" }}>
                          Payslip
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Commission breakdown explainer */}
        <div className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            HOW COMMISSIONS ARE CALCULATED — AUTO BY AI
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {[
              { label: "Sale Price", color: "#6B7280" },
              { op: "×" },
              { label: "Dev Comm %", color: "#3B82F6" },
              { op: "=" },
              { label: "Gross Comm", color: "#EDAB1B" },
              { op: "×" },
              { label: "Agent Split %", color: "#8B5CF6" },
              { op: "=" },
              { label: "Agent Net", color: "#F59E0B" },
              { op: "−" },
              { label: "Tax", color: "#EF4444" },
              { op: "−" },
              { label: "Marketing Cost", color: "#EC4899" },
              { op: "=" },
              { label: "Agent Payout", color: "#10B981" },
            ].map((item, i) => (
              "op" in item ? (
                <span key={i} className="font-bold text-white/40 text-base">{item.op}</span>
              ) : (
                <span key={i} className="px-3 py-1.5 rounded-lg font-semibold"
                  style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}>
                  {item.label}
                </span>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
