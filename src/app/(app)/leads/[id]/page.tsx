"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { leads, statusColors, sourceColors, getScoreColor, formatCurrency } from "@/lib/mock-data";

const timelineIcons: Record<string, string> = {
  call: "📞",
  whatsapp: "💬",
  note: "📝",
  status: "🔄",
  email: "📧",
  meeting: "🤝",
};

const timelineColors: Record<string, string> = {
  call: "#3B82F6",
  whatsapp: "#10B981",
  note: "#F59E0B",
  status: "#8B5CF6",
  email: "#EC4899",
  meeting: "#EDAB1B",
};

export default function LeadDetailPage() {
  const { id } = useParams();
  const lead = leads.find(l => l.id === id);

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-full" style={{ background: "#0f1929" }}>
        <div className="text-center">
          <div className="text-4xl mb-3">😕</div>
          <div className="text-white font-semibold">Lead not found</div>
          <Link href="/leads" className="text-sm mt-2 block" style={{ color: "#EDAB1B" }}>← Back to leads</Link>
        </div>
      </div>
    );
  }

  const scoreColor = getScoreColor(lead.score);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0f1929" }}>
      {/* Header */}
      <div className="px-6 py-3.5 border-b flex items-center gap-4"
        style={{ background: "#141e33", borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href="/leads" className="text-sm transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}>
          ← Leads
        </Link>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)", color: "#1F2B4E" }}>
            {lead.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{lead.name}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              {lead.nationality} · {lead.language} · {lead.market === "Dubai" ? "🇦🇪" : "🇹🇷"} {lead.market}
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[lead.status]}`}>
            {lead.status}
          </span>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
            💬 WhatsApp
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>
            📞 Call
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}>
            🤖 AI Draft
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left column — Profile */}
        <div className="w-80 flex-shrink-0 overflow-y-auto p-5 space-y-4"
          style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>

          {/* AI Score */}
          <div className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#1F2B4E,#233156)", border: "1px solid rgba(191,155,63,0.15)" }}>
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              AI LEAD SCORE
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none"
                    stroke={lead.score >= 85 ? "#10B981" : lead.score >= 65 ? "#F59E0B" : "#EF4444"}
                    strokeWidth="3"
                    strokeDasharray={`${lead.score} ${100 - lead.score}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg font-black ${scoreColor}`}>{lead.score}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {lead.score >= 85 ? "🔥 Hot Lead" : lead.score >= 65 ? "⚡ Warm Lead" : "❄️ Cold Lead"}
                </div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Updated in real-time
                </div>
                <div className="text-xs mt-2 px-2 py-1 rounded-md inline-block"
                  style={{ background: "rgba(237,171,27,0.1)", color: "#EDAB1B" }}>
                  {lead.source}
                </div>
              </div>
            </div>

            {/* AI Insight */}
            <div className="mt-3 p-3 rounded-xl text-xs"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)", color: "rgba(255,255,255,0.6)" }}>
              🤖 <span className="font-semibold text-white">AI insight: </span>
              {lead.score >= 85
                ? "High engagement signals. 3 WhatsApp responses, 1 meeting booked. Recommend sending personalised property proposal today."
                : lead.score >= 65
                  ? "Moderate intent. Budget confirmed but timeline unclear. Suggest a re-qualification call."
                  : "Low engagement. Consider automated re-engagement sequence via WhatsApp."
              }
            </div>
          </div>

          {/* Profile fields */}
          <div className="rounded-2xl p-4 space-y-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs font-bold tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
              PROFILE
            </div>
            {[
              { label: "Phone", value: lead.phone, icon: "📱" },
              { label: "Email", value: lead.email, icon: "📧" },
              { label: "Nationality", value: lead.nationality, icon: "🌍" },
              { label: "Language", value: lead.language, icon: "🗣️" },
              { label: "Budget", value: lead.budget, icon: "💰" },
              { label: "Property Type", value: lead.propertyType, icon: "🏠" },
              { label: "Location", value: lead.location, icon: "📍" },
              { label: "Purpose", value: lead.purpose, icon: "🎯" },
              { label: "Agent", value: lead.agent, icon: "🧑‍💼" },
              { label: "Created", value: lead.createdAt, icon: "📅" },
              { label: "Last Contact", value: lead.lastContact, icon: "🕐" },
            ].map(f => (
              <div key={f.label} className="flex items-start gap-2">
                <span className="text-sm flex-shrink-0 mt-0.5">{f.icon}</span>
                <div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{f.label}</div>
                  <div className="text-xs font-semibold text-white">{f.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline stage */}
          <div className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              PIPELINE STAGE
            </div>
            {["New", "Contacted", "Qualified", "Meeting", "Offer Sent", "Reservation", "Closed"].map((stage, i) => {
              const currentIdx = ["New", "Contacted", "Qualified", "Meeting", "Offer Sent", "Reservation", "Closed"].indexOf(lead.status);
              const isActive = stage === lead.status;
              const isDone = i < currentIdx;
              return (
                <div key={stage} className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{
                      background: isActive ? "linear-gradient(135deg,#BF9B3F,#EDAB1B)"
                        : isDone ? "rgba(16,185,129,0.2)"
                          : "rgba(255,255,255,0.06)",
                      border: isActive ? "none" : isDone ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.1)"
                    }}>
                    {isDone ? <span style={{ color: "#10B981", fontSize: "10px" }}>✓</span>
                      : isActive ? <span style={{ color: "#1F2B4E", fontSize: "10px" }}>●</span>
                        : null}
                  </div>
                  <span className="text-xs" style={{
                    color: isActive ? "#EDAB1B" : isDone ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
                    fontWeight: isActive ? "700" : "400"
                  }}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column — Timeline + Notes */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Notes */}
          <div className="p-5 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              AGENT NOTE
            </div>
            <div className="text-sm rounded-xl p-4"
              style={{ background: "rgba(237,171,27,0.06)", border: "1px solid rgba(237,171,27,0.12)", color: "rgba(255,255,255,0.7)" }}>
              {lead.notes}
            </div>
            <div className="mt-2 text-xs" style={{ color: "rgba(139,92,246,0.8)" }}>
              🤖 AI auto-filled: Budget {lead.budget} · {lead.propertyType} · {lead.location} · {lead.purpose}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                ACTIVITY TIMELINE
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg font-medium"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                + Add Note
              </button>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5"
                style={{ background: "linear-gradient(180deg,#EDAB1B,rgba(191,155,63,0.1))" }} />

              {lead.timeline.map((event, i) => {
                const color = timelineColors[event.type] || "#BF9B3F";
                return (
                  <div key={event.id} className="relative mb-5">
                    <div className="absolute -left-4 top-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                      style={{ background: `${color}20`, border: `2px solid ${color}40`, fontSize: "9px" }}>
                      {timelineIcons[event.type]}
                    </div>
                    <div className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${color}15`,
                      }}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold" style={{ color }}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                            · {event.author}
                          </span>
                        </div>
                        <div className="text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>
                          {event.date}
                        </div>
                      </div>
                      <div className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {event.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
