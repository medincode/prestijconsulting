"use client";

import { useState } from "react";
import Link from "next/link";

interface TopbarProps {
  title: string;
  market?: "Dubai" | "Istanbul" | "both";
  onMarketChange?: (market: "Dubai" | "Istanbul") => void;
  activeMarket?: "Dubai" | "Istanbul";
}

export default function Topbar({ title, market = "both", onMarketChange, activeMarket = "Dubai" }: TopbarProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/5 flex-shrink-0"
      style={{ background: "#141e33" }}>
      <div className="text-sm font-bold text-white">{title}</div>
      <div className="flex items-center gap-3">
        {market === "both" && onMarketChange && (
          <div className="flex gap-1.5">
            <button
              onClick={() => onMarketChange("Dubai")}
              className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
              style={activeMarket === "Dubai"
                ? { background: "rgba(237,171,27,0.15)", color: "#EDAB1B", border: "1px solid rgba(237,171,27,0.3)" }
                : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid transparent" }
              }
            >
              🇦🇪 Dubai
            </button>
            <button
              onClick={() => onMarketChange("Istanbul")}
              className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
              style={activeMarket === "Istanbul"
                ? { background: "rgba(237,171,27,0.15)", color: "#EDAB1B", border: "1px solid rgba(237,171,27,0.3)" }
                : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid transparent" }
              }
            >
              🇹🇷 Istanbul
            </button>
          </div>
        )}

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
          🔔
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold text-white"
            style={{ background: "#EF4444", fontSize: "9px" }}>
            3
          </span>
        </button>

        {/* AI */}
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
          style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}>
          🤖 Ask AI
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)" }}>
          HL
        </div>
      </div>
    </div>
  );
}
