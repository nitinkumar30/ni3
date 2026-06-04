"use client"

import { useAppStore } from "@/lib/store"
import type { Theme } from "@/lib/store"
import { motion } from "motion/react"
import { Monitor, Shield, Brain, BarChart3, Sun } from "lucide-react"

const themes: { key: Theme; label: string; icon: typeof Monitor; color: string }[] = [
  { key: "blue", label: "Blue", icon: Monitor, color: "#00E5FF" },
  { key: "cyber", label: "Cyber", icon: Shield, color: "#00FF41" },
  { key: "ai", label: "AI", icon: Brain, color: "#A855F7" },
  { key: "data", label: "Data", icon: BarChart3, color: "#FF8C00" },
  { key: "minimal", label: "Minimal", icon: Sun, color: "#2563EB" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useAppStore()

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]">
      <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/10 bg-[#050816]/80 backdrop-blur-xl shadow-lg shadow-black/20">
        {themes.map((t) => {
          const Icon = t.icon
          const active = theme === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
              title={t.label}
            >
              {active && (
                <motion.div
                  layoutId="theme-pill"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" style={{ color: active ? t.color : undefined }} />
                <span style={{ color: active ? t.color : undefined }} className="hidden sm:inline">
                  {t.label}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
