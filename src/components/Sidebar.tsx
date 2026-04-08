"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { group: "Core", items: [
    { href: "/dashboard", icon: "📊", label: "Dashboard" },
    { href: "/leads", icon: "👥", label: "Leads" },
    { href: "/pipeline", icon: "🏗️", label: "Pipeline" },
    { href: "/commissions", icon: "💰", label: "Commissions" },
  ]},
  { group: "Business", items: [
    { href: "#", icon: "💬", label: "WhatsApp" },
    { href: "#", icon: "📞", label: "Calls" },
    { href: "#", icon: "🏢", label: "Properties" },
    { href: "#", icon: "📢", label: "Marketing" },
  ]},
  { group: "Admin", items: [
    { href: "#", icon: "🧑‍💼", label: "HR / Team" },
    { href: "#", icon: "📈", label: "Analytics" },
    { href: "#", icon: "⚙️", label: "Settings" },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col h-screen sticky top-0"
      style={{ background: "#141e33" }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <div className="text-sm font-black" style={{ color: "#EDAB1B" }}>
          PRESTIJ CRM
        </div>
        <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          AI-Powered Platform
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {navItems.map((group) => (
          <div key={group.group}>
            <div className="px-5 py-2 text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              {group.group}
            </div>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const isDisabled = item.href === "#";
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-5 py-2.5 text-sm transition-all
                    ${isActive
                      ? "border-r-2 font-medium"
                      : isDisabled
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-white/5"
                    }`}
                  style={isActive
                    ? { background: "rgba(237,171,27,0.12)", color: "#EDAB1B", borderColor: "#EDAB1B" }
                    : { color: "rgba(255,255,255,0.5)" }
                  }
                  onClick={isDisabled ? (e) => e.preventDefault() : undefined}
                >
                  <span className="text-base w-5 text-center">{item.icon}</span>
                  {item.label}
                  {isDisabled && (
                    <span className="ml-auto text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.25)", fontSize: "9px" }}>
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-5 py-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#BF9B3F,#EDAB1B)" }}>
            HL
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Hassan L.</div>
            <div className="text-xs" style={{ color: "#EDAB1B" }}>General Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
