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
  const { cyberMode, toggleCyberMode } = useAppStore()

  const handleKeyDown = useCallback(
    (() => {
      let buffer: string[] = []
      return (e: KeyboardEvent) => {
        buffer.push(e.key)
        if (buffer.length > KONAMI_CODE.length) buffer.shift()

        if (buffer.length === KONAMI_CODE.length && buffer.every((k, i) => k === KONAMI_CODE[i])) {
          toggleCyberMode()
          buffer = []
        }
      }
    })(),
    [toggleCyberMode]
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
          onClick={() => { if (cyberMode) toggleCyberMode() }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00FF9D]/20 border border-[#00FF9D]/40 text-[#00FF9D] text-xs"
        >
          <Sparkles className="w-3 h-3" />
          CYBER MODE
        </button>
      </div>
    </div>
  )
}
