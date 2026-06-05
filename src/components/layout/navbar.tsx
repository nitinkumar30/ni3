"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { data } from "@/lib/data"
import { useAppStore } from "@/lib/store"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen } = useAppStore()
  const navItems = data.navigation
  const innerRef = useRef<HTMLDivElement>(null)
  const [indicatorPos, setIndicatorPos] = useState({ left: 0, width: 0 })
  const ratiosRef = useRef<Record<string, number>>({})
  const lastActiveRef = useRef(activeSection)
  const clickTsRef = useRef(0)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // --- IntersectionObserver: active section detection ---
  useEffect(() => {
    const step = 0.05
    const thresholds: number[] = []
    for (let t = 0; t <= 1; t += step) {
      thresholds.push(Math.round(t * 100) / 100)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current[entry.target.id] = entry.intersectionRatio
        }

        let maxRatio = 0
        let bestId = lastActiveRef.current

        for (const item of navItems) {
          const r = ratiosRef.current[item.id] || 0
          if (r > maxRatio) {
            maxRatio = r
            bestId = item.id
          }
        }

        if (maxRatio > 0 && bestId !== lastActiveRef.current && Date.now() - clickTsRef.current > 400) {
          lastActiveRef.current = bestId
          setActiveSection(bestId)
        }
      },
      { threshold: thresholds }
    )

    const els: Element[] = []
    for (const item of navItems) {
      const el = document.getElementById(item.id)
      if (el) {
        observer.observe(el)
        els.push(el)
      }
    }

    return () => {
      for (const el of els) observer.unobserve(el)
      observer.disconnect()
    }
  }, [navItems, setActiveSection])

  // --- Pixel-perfect indicator positioning ---
  const measure = useCallback(() => {
    const inner = innerRef.current
    if (!inner) return
    const btn = inner.querySelector<HTMLButtonElement>(`[data-nav-id="${activeSection}"]`)
    if (!btn) return
    setIndicatorPos({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [activeSection])

  useEffect(() => {
    measure()

    const ro = new ResizeObserver(measure)
    if (innerRef.current) ro.observe(innerRef.current)

    document.fonts.ready.then(measure)

    let rafId: number
    let pending = false
    const scrollHandler = () => {
      if (!pending) {
        pending = true
        rafId = requestAnimationFrame(() => {
          pending = false
          measure()
        })
      }
    }
    window.addEventListener("scroll", scrollHandler, { passive: true })
    window.addEventListener("load", measure)

    return () => {
      ro.disconnect()
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", scrollHandler)
      window.removeEventListener("load", measure)
    }
  }, [measure])

  const scrollTo = useCallback((id: string) => {
    clickTsRef.current = Date.now()
    setActiveSection(id)
    lastActiveRef.current = id
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [setActiveSection, setMobileMenuOpen])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--card-border)] shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-1 sm:gap-2 group shrink-0 mr-1 sm:mr-2 lg:mr-3"
            aria-label="Go to top"
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center text-white text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-tight shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{ background: "var(--theme-gradient)", boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              Ni³
            </div>
          </button>

          {/* Desktop + tablet: horizontal menu (hidden below md) */}
          <div className="hidden md:block flex-1 overflow-hidden">
            <div
              ref={innerRef}
              className="relative flex items-center py-1 flex-nowrap w-full justify-between"
              style={{ gap: "clamp(2px, 0.3vw, 6px)" }}
              role="menubar"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "relative z-10 font-medium rounded-lg whitespace-nowrap shrink-0 transition-all duration-300",
                    "px-1 md:px-2 xl:px-3 py-1 md:py-1.5",
                    "text-[clamp(6px,calc((100vw-260px)/68),11px)]",
                    activeSection === item.id
                      ? "drop-shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  )}
                  style={
                    activeSection === item.id
                      ? { color: "#ffffff" }
                      : {}
                  }
                  role="menuitem"
                  aria-current={activeSection === item.id ? "true" : undefined}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              ))}
              {/* Animated sliding indicator */}
              {indicatorPos.width > 0 && (
                <motion.div
                  className="absolute rounded-lg pointer-events-none z-0"
                  style={{
                    top: "4px",
                    bottom: "4px",
                    background: "var(--theme-gradient)",
                  }}
                  animate={{
                    left: indicatorPos.left,
                    width: indicatorPos.width,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
          </div>

          {/* Mobile hamburger button (visible below md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors ml-auto"
            style={{ color: "var(--foreground)" }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu (visible below md) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(20px)",
              borderColor: "var(--card-border)",
            }}
          >
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    activeSection === item.id
                      ? "text-white"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                  )}
                  style={
                    activeSection === item.id
                      ? { background: "color-mix(in srgb, var(--primary) 15%, transparent)" }
                      : {}
                  }
                  role="menuitem"
                  aria-current={activeSection === item.id ? "true" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
