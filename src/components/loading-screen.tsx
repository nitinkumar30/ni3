"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const readyTimer = setTimeout(() => setReady(true), 100)
    let frame: number
    const start = performance.now()
    const duration = 2400

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(eased)
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 500)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      clearTimeout(readyTimer)
      cancelAnimationFrame(frame)
    }
  }, [])

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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={ready ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            {/* Ni3 stacked logo */}
            <div className="relative mb-10">
              <div className="flex items-baseline gap-0">
                {["N", "i", "3"].map((letter, i) => (
                  <motion.span
                    key={letter}
                    initial={{ opacity: 0, y: 30 }}
                    animate={ready ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.12 + 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                    className="text-6xl sm:text-7xl font-bold tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, var(--primary, #00E5FF), var(--secondary, #7B61FF), var(--accent, #00FF9D))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Underline glow bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={ready ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="h-[2px] mt-2 rounded-full origin-left"
                style={{
                  background: "linear-gradient(90deg, var(--primary, #00E5FF), var(--secondary, #7B61FF))",
                }}
              />
            </div>

            {/* Progress bar */}
            <div className="w-40 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--primary, #00E5FF), var(--secondary, #7B61FF))",
                  width: `${progress * 100}%`,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
