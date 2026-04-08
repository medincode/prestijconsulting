"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import {
  leads, Lead, Market, LeadStatus, LeadSource,
  statusColors, sourceColors, formatCurrency, getScoreColor, getScoreBg
} from "@/lib/mock-data";

const allStatuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Meeting", "Offer Sent", "Reservation", "Closed", "Lost"];

function ScoreBadge({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, background: score >= 85 ? "#10B981" : score >= 65 ? "#F59E0B" : "#EF4444" }} />
      </div>
      <span className={`text-xs font-bold ${getScoreColor(score)}`}>{score}</span>
    </div>
  );
}

export default function LeadsPage() {
  const [market, setMarket] = useState<Market>("Dubai");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "All">("All");
  const [showAiPanel, setShowAiPanel] = useState(false);

  const filtered = useMemo(() => {
    return leads.filter(l => {
      if (l.market !== market) return false;
      if (statusFilter !== "All" && l.status !== statusFilter) return false;
      if (sourceFilter !== "All" && l.source !== sourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.nationality.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => b.score - a.score);
  }, [market, search, statusFilter, sourceFilter]);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0f1929" }}>
      <Topbar
        title="👥 Lead Management"
        market="both"
        onMarketChange={setMarket}
        activeMarket={market}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Main table */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filters bar */}
          <div className="px-6 py-3 flex items-center gap-3 flex-wrap"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Search */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="pl-8 pr-4 py-2 rounded-lg text-sm text-white outline-none w-56"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-lg text-sm text-white outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <option value="All">All Statuses</option>
              {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* Source filter */}
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value as any)}
              className="px-3 py-2 rounded-lg text-sm text-white outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <option value="All">All Sources</option>
              {(["Meta Ads", "Google Ads", "WhatsApp", "Referral", "Walk-in", "Website"] as LeadSource[]).map(s =>
                <option key={s} value={s}>{s}</option>
              )}
            </select>

            <div className="ml-auto flex items-center gap-2">
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                {filtered.length} leads
              </div>
              <button
                onClick={() => setShowAiPanel(!showAiPanel)}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg font-medium transition-all"
                style={showAiPanel
                  ? { background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }
                  : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                🤖 AI Filter
              </button>
              <button className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg font-medium"
                style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
                + Add Lead
              </button>
            </div>
          </div>

          {/* AI Filter Panel */}
          {showAiPanel && (
            <div className="mx-6 mt-3 p-4 rounded-xl"
              style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🤖</span>
                <span className="text-xs font-bold text-white">AI Smart Filter</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  "🔥 Hottest leads this week",
                  "💰 Budget $500K+",
                  "🤫 Silent 7+ days",
                  "🇷🇺 Russian speakers",
                  "🏗️ Off-plan investors",
                  "📅 Visit scheduled",
                ].map(tag => (
                  <button key={tag}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.2)" }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr style={{ background: "#141e33", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Lead", "Contact", "Market", "Budget", "AI Score", "Status", "Source", "Agent", "Last Contact", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-wide"
                      style={{ color: "rgba(255,255,255,0.4)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.id}
                    className="transition-colors cursor-pointer group"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(237,171,27,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)")}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
                          {lead.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <Link href={`/leads/${lead.id}`}
                            className="text-sm font-semibold text-white hover:text-amber-400 transition-colors">
                            {lead.name}
                          </Link>
                          <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {lead.nationality} · {lead.language}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-white/60">{lead.phone}</div>
                      <div className="text-xs text-white/30">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs">{lead.market === "Dubai" ? "🇦🇪" : "🇹🇷"} {lead.market}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-white">{lead.budget}</div>
                      <div className="text-xs text-white/30">{lead.purpose}</div>
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBadge score={lead.score} />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${sourceColors[lead.source]}`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-white/60">{lead.agent}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-white/40">{lead.lastContact}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/leads/${lead.id}`}
                        className="opacity-0 group-hover:opacity-100 text-xs px-2.5 py-1.5 rounded-lg transition-all font-medium"
                        style={{ background: "rgba(237,171,27,0.15)", color: "#EDAB1B" }}>
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-sm font-semibold text-white/50">No leads found</div>
                <div className="text-xs text-white/25 mt-1">Try adjusting your filters</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
