"use client"

import { useAppStore } from "@/lib/store"
import type { Theme } from "@/lib/store"
import { motion } from "motion/react"
import { Monitor, Palette, Flame } from "lucide-react"

const themes: { key: Theme; label: string; icon: typeof Monitor }[] = [
  { key: "matrix", label: "Matrix", icon: Monitor },
  { key: "aurora", label: "Aurora", icon: Palette },
  { key: "ember", label: "Ember", icon: Flame },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useAppStore()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]">
      <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        {themes.map((t) => {
          const Icon = t.icon
          const active = theme === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
            >
              {active && (
                <motion.div
                  layoutId="theme-bg"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" style={{ color: active ? "var(--primary)" : undefined }} />
                <span style={{ color: active ? "var(--primary)" : undefined }} className="hidden sm:inline">
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
