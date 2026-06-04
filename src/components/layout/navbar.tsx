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
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--card-border)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold tracking-tight shadow-lg"
              style={{ background: "var(--theme-gradient)", boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              Ni3
            </div>
          </button>

          <div className="hidden xl:flex items-center gap-0.5 overflow-x-auto">
            {data.navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative whitespace-nowrap px-2.5 py-1.5 text-[11px] font-medium transition-all duration-300 rounded-md",
                  activeSection === item.id
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                )}
                style={activeSection === item.id ? { background: "color-mix(in srgb, var(--primary) 10%, transparent)" } : {}}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md"
                    style={{ border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:inline-flex whitespace-nowrap px-3.5 py-1.5 text-[11px] font-medium rounded-md text-white transition-all duration-300"
            style={{ background: "var(--theme-gradient)" }}
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
