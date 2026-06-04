"use client"

import { useAppStore } from "@/lib/store"
import type { Theme } from "@/lib/store"
import { motion } from "motion/react"
import { Terminal, Sparkles, Flame } from "lucide-react"

const themes: { key: Theme; label: string; icon: typeof Terminal }[] = [
  { key: "matrix", label: "Motion", icon: Terminal },
  { key: "aurora", label: "Style", icon: Sparkles },
  { key: "ember", label: "Heat", icon: Flame },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useAppStore()

  return (
    <div className="fixed top-20 right-4 z-[60]">
      <div className="flex flex-col gap-1 px-1.5 py-1.5 rounded-xl border border-white/10 bg-[#050816]/70 backdrop-blur-lg shadow-lg shadow-black/20">
        {themes.map((t) => {
          const Icon = t.icon
          const active = theme === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className="relative flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-300"
              title={t.label}
            >
              {active && (
                <motion.div
                  layoutId="theme-pill"
                  className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-3.5 h-3.5" style={{ color: active ? "var(--primary)" : undefined }} />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
