"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 2200

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 400)
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
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050816]"
        >
          {/* N-i-3 logo reveal */}
          <div className="flex items-center gap-1 mb-8">
            {["N", "i", "3"].map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-6xl sm:text-7xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #00E5FF, #7B61FF, #00FF9D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Orbiting dot ring */}
          <div className="relative w-20 h-20 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i === 0 ? "#00E5FF" : i === 1 ? "#7B61FF" : i === 2 ? "#00FF9D" : "#FF4D4D",
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 90}deg) translateX(35px)`,
                    boxShadow: `0 0 8px ${
                      i === 0 ? "#00E5FF" : i === 1 ? "#7B61FF" : i === 2 ? "#00FF9D" : "#FF4D4D"
                    }`,
                  }}
                />
              ))}
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#00E5FF]/50 animate-pulse" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #00E5FF, #7B61FF, #00FF9D)",
                width: `${progress * 100}%`,
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs text-white/30 font-mono"
          >
            LOADING SYSTEM...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
