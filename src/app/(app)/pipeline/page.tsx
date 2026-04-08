"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import { leads, Lead, Market, LeadStatus, pipelineStages, statusColors, sourceColors, formatCurrency, getScoreColor } from "@/lib/mock-data";

const stageColors: Record<LeadStatus, { bg: string; border: string; dot: string }> = {
  "New":          { bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.15)", dot: "#6B7280" },
  "Contacted":    { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.15)",  dot: "#3B82F6" },
  "Qualified":    { bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.15)",  dot: "#F59E0B" },
  "Meeting":      { bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.15)",  dot: "#F97316" },
  "Offer Sent":   { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.15)",  dot: "#8B5CF6" },
  "Reservation":  { bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.15)",  dot: "#6366F1" },
  "Closed":       { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)",   dot: "#10B981" },
  "Lost":         { bg: "rgba(239,68,68,0.06)",   border: "rgba(239,68,68,0.12)",   dot: "#EF4444" },
};

function KanbanCard({ lead }: { lead: Lead }) {
  return (
    <Link href={`/leads/${lead.id}`}>
      <div className="rounded-xl p-4 mb-2.5 cursor-pointer transition-all group"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(237,171,27,0.06)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(237,171,27,0.2)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E", fontSize: "10px" }}>
              {lead.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">{lead.name}</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>
                {lead.nationality}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="w-12 h-1 rounded-full bg-white/10">
              <div className="h-full rounded-full"
                style={{
                  width: `${lead.score}%`,
                  background: lead.score >= 85 ? "#10B981" : lead.score >= 65 ? "#F59E0B" : "#EF4444"
                }} />
            </div>
            <span className={`text-xs font-bold ${getScoreColor(lead.score)}`}
              style={{ fontSize: "11px" }}>{lead.score}</span>
          </div>
        </div>

        {/* Budget & property */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-semibold" style={{ color: "#EDAB1B" }}>{lead.budget}</span>
          <span className="text-white/20 text-xs">·</span>
          <span className="text-xs text-white/40">{lead.propertyType}</span>
        </div>

        {/* Location */}
        <div className="text-xs text-white/35 mb-2.5">📍 {lead.location}</div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${sourceColors[lead.source]}`}
            style={{ fontSize: "10px" }}>
            {lead.source}
          </span>
          <span className="text-xs text-white/30" style={{ fontSize: "10px" }}>{lead.agent.split(" ")[0]}</span>
        </div>
      </div>
    </Link>
  );
}

export default function PipelinePage() {
  const [market, setMarket] = useState<Market>("Dubai");

  const stagesToShow = pipelineStages;
  const marketLeads = leads.filter(l => l.market === market);

  const totalValue = marketLeads
    .filter(l => l.status !== "Lost")
    .reduce((sum, l) => sum + l.budgetNum, 0);

  const closedValue = marketLeads
    .filter(l => l.status === "Closed")
    .reduce((sum, l) => sum + l.budgetNum, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0f1929" }}>
      <Topbar
        title="🏗️ Sales Pipeline"
        market="both"
        onMarketChange={setMarket}
        activeMarket={market}
      />

      {/* Stats row */}
      <div className="px-6 py-3 flex items-center gap-6 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {[
          { label: "Total Pipeline", value: formatCurrency(totalValue), color: "#EDAB1B" },
          { label: "Active Deals", value: marketLeads.filter(l => !["Closed","Lost"].includes(l.status)).length.toString(), color: "#3B82F6" },
          { label: "Closed (MTD)", value: formatCurrency(closedValue), color: "#10B981" },
          { label: "Hot Leads (85+)", value: marketLeads.filter(l => l.score >= 85).length.toString(), color: "#F59E0B" },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="text-base font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</div>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
            ⚙️ Manage Stages
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
            + Add Deal
          </button>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
        <div className="flex gap-3 h-full" style={{ minWidth: "max-content" }}>
          {stagesToShow.map(stage => {
            const stageLeads = marketLeads.filter(l => l.status === stage);
            const colors = stageColors[stage];
            const stageValue = stageLeads.reduce((s, l) => s + l.budgetNum, 0);

            return (
              <div key={stage} className="w-64 flex flex-col rounded-2xl overflow-hidden flex-shrink-0"
                style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                {/* Column header */}
                <div className="px-4 py-3 flex-shrink-0"
                  style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: colors.dot }} />
                      <span className="text-xs font-bold text-white">{stage}</span>
                    </div>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                      {stageLeads.length}
                    </div>
                  </div>
                  {stageLeads.length > 0 && (
                    <div className="text-xs font-semibold" style={{ color: colors.dot }}>
                      {formatCurrency(stageValue)}
                    </div>
                  )}
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto p-3">
                  {stageLeads.map(lead => (
                    <KanbanCard key={lead.id} lead={lead} />
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="text-2xl mb-1.5 opacity-30">📭</div>
                      <div className="text-xs text-white/20">No leads</div>
                    </div>
                  )}
                </div>

                {/* Add card */}
                <div className="p-3 pt-0 flex-shrink-0">
                  <button className="w-full py-2 rounded-lg text-xs transition-all"
                    style={{ color: "rgba(255,255,255,0.25)", border: "1px dashed rgba(255,255,255,0.1)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = colors.dot)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}>
                    + Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom legend */}
      <div className="px-6 py-2 flex items-center gap-4 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Click any card to view lead details · Stages sorted by conversion likelihood
        </div>
        <div className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          🤖 AI-sorted by score
        </div>
      </div>
    </div>
  );
}
