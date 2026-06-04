"use client"

import { useEffect, useCallback } from "react"
import { useAppStore } from "@/lib/store"
import { Sparkles } from "lucide-react"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
]

export function KonamiEasterEgg() {
  const { cyberMode, toggleCyberMode, setTheme, theme } = useAppStore()

  const handleKeyDown = useCallback(
    (() => {
      let buffer: string[] = []
      return (e: KeyboardEvent) => {
        buffer.push(e.key)
        if (buffer.length > KONAMI_CODE.length) buffer.shift()

        if (buffer.length === KONAMI_CODE.length && buffer.every((k, i) => k === KONAMI_CODE[i])) {
          if (cyberMode) {
            toggleCyberMode()
            setTheme("blue")
          } else {
            toggleCyberMode()
            setTheme("cyber")
          }
          buffer = []
        }
      }
    })(),
    [cyberMode, toggleCyberMode, setTheme]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!cyberMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <div className="absolute top-4 right-4 pointer-events-auto">
        <button
          onClick={() => { toggleCyberMode(); setTheme("blue") }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
          style={{
            background: "color-mix(in srgb, var(--primary) 20%, transparent)",
            border: "1px solid color-mix(in srgb, var(--primary) 40%, transparent)",
            color: "var(--primary)",
          }}
        >
          <Sparkles className="w-3 h-3" />
          CYBER MODE
        </button>
      </div>
    </div>
  )
}
