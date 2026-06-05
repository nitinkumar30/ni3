"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const nameChars = ["N", "i", "t", "i", "n", " ", "K", "u", "m", "a", "r"]

interface CharState {
  char: string
  revealed: boolean
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [chars, setChars] = useState<CharState[]>(nameChars.map(() => ({ char: "", revealed: false })))

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const totalDuration = 3000

    const tick = (now: number) => {
      const elapsed = now - start
      const raw = Math.min(elapsed / totalDuration, 1)
      const eased = 1 - Math.pow(1 - raw, 3)
      setProgress(eased)
      if (raw < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 600)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const percent = Math.round(progress * 100)

  // Reveal characters based on percentage
  // 0% → 0 chars, 100% → 11 chars
  const charsToReveal = Math.min(
    Math.floor((percent / 100) * (nameChars.length + 1)),
    nameChars.length
  )

  useEffect(() => {
    setChars(
      nameChars.map((ch, i) => ({
        char: ch,
        revealed: i < charsToReveal,
      }))
    )
  }, [charsToReveal])

  const displayText = chars
    .filter((c) => c.revealed)
    .map((c) => c.char)
    .join("")

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "var(--background, #050816)" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col items-center gap-12"
          >
            {/* Typing name reveal */}
            <div className="h-24 flex items-center justify-center">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight flex flex-wrap justify-center">
                {chars.map((c, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={
                      c.revealed
                        ? { opacity: 1, y: 0, rotateX: 0 }
                        : { opacity: 0, y: 20, rotateX: -90 }
                    }
                    transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                    className="inline-block"
                    style={{
                      background: c.revealed ? "var(--theme-gradient)" : "none",
                      WebkitBackgroundClip: c.revealed ? "text" : "none",
                      WebkitTextFillColor: c.revealed ? "transparent" : "none",
                      backgroundClip: c.revealed ? "text" : "none",
                      color: c.revealed ? "transparent" : "transparent",
                    }}
                  >
                    {c.char || "\u00A0"}
                  </motion.span>
                ))}
                {/* Cursor blink */}
                {!done && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[3px] h-[0.7em] ml-1 self-center rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </div>
            </div>

            {/* Loading bar + percentage */}
            <div className="flex flex-col items-center gap-3 w-72">
              <div
                className="w-full h-[3px] rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "var(--theme-gradient)",
                    width: `${progress * 100}%`,
                    willChange: "width",
                  }}
                />
              </div>

              <div className="flex items-center justify-between w-full">
                <motion.span
                  key={percent}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-mono tabular-nums font-semibold"
                  style={{ color: "var(--primary)" }}
                >
                  {percent}%
                </motion.span>
                <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                  {displayText ? `Loading ${displayText}` : "Initializing"}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
