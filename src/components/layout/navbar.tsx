"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "motion/react"
import { data } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { activeSection, setActiveSection } = useAppStore()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    const ids = data.navigation.map((n) => n.id)
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [setActiveSection])

  const scrollTo = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#050816]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] flex items-center justify-center text-white text-sm font-bold tracking-tight shadow-lg shadow-[#00E5FF]/20">
              Ni3
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {data.navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative px-3.5 py-2 text-xs font-medium transition-all duration-300 rounded-lg",
                  activeSection === item.id
                    ? "text-[#00E5FF] bg-[#00E5FF]/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg border border-[#00E5FF]/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-white hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300"
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
