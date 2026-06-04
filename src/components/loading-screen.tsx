"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const steps = [
  "Initializing Developer OS",
  "Loading Projects",
  "Loading Automation Engine",
  "Loading AI Toolkit",
  "Loading GitHub Universe",
  "Welcome",
]

export function LoadingScreen() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const totalDuration = 3200
    const stepDuration = totalDuration / steps.length

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / totalDuration, 1)
      setProgress(p)
      const currentStep = Math.min(Math.floor(elapsed / stepDuration), steps.length - 1)
      setStep(currentStep)
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 600)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col items-center gap-10"
          >
            {/* Ni3 logo */}
            <div className="flex items-baseline gap-0">
              {["N", "i", "3"].map((letter, i) => (
                <motion.span
                  key={letter}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.12 + 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-6xl sm:text-7xl font-bold tracking-tight"
                  style={{
                    background: "var(--theme-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Step indicator */}
            <div className="flex flex-col items-center gap-4">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-mono"
                style={{ color: "var(--primary)" }}
              >
                {steps[step]}
              </motion.p>

              {/* Progress bar */}
              <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "var(--theme-gradient)",
                    width: `${progress * 100}%`,
                  }}
                />
              </div>

              <span className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                {Math.round(progress * 100)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
