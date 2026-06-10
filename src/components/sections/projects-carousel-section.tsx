"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Star, Sparkles } from "lucide-react"
import { data } from "@/lib/data"

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "#F4845F",
  "Cyber Security": "#E882B4",
  "Data Science": "#6BBF7A",
  Development: "#6EB5FF",
  Data: "#A66CFF",
}

const GRAIN_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0%20200%20200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E`

export function ProjectsCarouselSection() {
  const featured = data.projects.filter((p) => p.featured)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating || featured.length === 0) return
      setIsAnimating(true)
      setActiveIndex((prev) =>
        dir === "next"
          ? (prev + 1) % featured.length
          : (prev - 1 + featured.length) % featured.length
      )
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating, featured.length]
  )

  const center = activeIndex
  const left = (activeIndex - 1 + featured.length) % featured.length
  const right = (activeIndex + 1) % featured.length
  const back = (activeIndex + 2) % featured.length

  const getRole = (i: number): "center" | "left" | "right" | "back" | "hidden" => {
    if (i === center) return "center"
    if (i === left) return "left"
    if (i === right) return "right"
    if (i === back) return "back"
    return "hidden"
  }

  const getCardStyle = (role: string) => {
    const base = { transition: "all 650ms cubic-bezier(0.4,0,0.2,1)", willChange: "transform, filter, opacity" as const }
    switch (role) {
      case "center":
        return { ...base, left: "50%", top: isMobile ? "10%" : "5%", width: isMobile ? "85%" : "55%", transform: "translateX(-50%) scale(1)", filter: "blur(0px)", opacity: 1, zIndex: 20 }
      case "left":
        return { ...base, left: isMobile ? "5%" : "8%", top: isMobile ? "15%" : "12%", width: isMobile ? "40%" : "28%", transform: "translateX(0) scale(0.8)", filter: "blur(2px)", opacity: 0.7, zIndex: 10 }
      case "right":
        return { ...base, left: isMobile ? "55%" : "64%", top: isMobile ? "15%" : "12%", width: isMobile ? "40%" : "28%", transform: "translateX(0) scale(0.8)", filter: "blur(2px)", opacity: 0.7, zIndex: 10 }
      case "back":
        return { ...base, left: "50%", top: isMobile ? "20%" : "18%", width: isMobile ? "55%" : "35%", transform: "translateX(-50%) scale(0.6)", filter: "blur(4px)", opacity: 0.4, zIndex: 5 }
      default:
        return { ...base, left: "50%", top: "25%", width: "40%", transform: "translateX(-50%) scale(0.4)", filter: "blur(6px)", opacity: 0, zIndex: 1 }
    }
  }

  if (featured.length === 0) return null

  const activeProject = featured[activeIndex]
  const bgColor = CATEGORY_COLORS[activeProject.category] || "#4488ff"

  return (
    <section
      id="projects-carousel"
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: bgColor, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 50, opacity: 0.3, backgroundImage: `url("${GRAIN_SVG}")`, backgroundSize: "200px 200px" }}
      />

      {/* Ghost text */}
      <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 2, top: "12%" }}>
        <span
          className="font-anton font-black uppercase leading-none whitespace-nowrap text-white/10"
          style={{ fontSize: "clamp(70px, 22vw, 300px)", letterSpacing: "-0.02em" }}
        >
          PROJECTS
        </span>
      </div>

      {/* Top-left label */}
      <div className="absolute top-6 left-4 sm:left-8" style={{ zIndex: 60 }}>
        <Badge variant="premium" className="text-[10px]">
          <Sparkles className="w-3 h-3 mr-1" />
          Featured Work
        </Badge>
      </div>

      {/* Carousel items */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <AnimatePresence mode="popLayout">
          {featured.map((project, i) => {
            const role = getRole(i)
            if (role === "hidden") return null
            const style = getCardStyle(role)
            const isCenter = role === "center"
            const color = CATEGORY_COLORS[project.category] || "#4488ff"

            return (
              <motion.div
                key={project.name}
                layout
                initial={false}
                animate={{
                  left: style.left,
                  top: style.top,
                  width: style.width,
                  opacity: style.opacity,
                  scale: parseFloat(style.transform.match(/scale\(([\d.]+)\)/)?.[1] || "1"),
                  filter: style.filter,
                  zIndex: style.zIndex,
                }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                className="absolute"
                style={{
                  transform: style.transform,
                  willChange: style.willChange,
                  pointerEvents: isCenter ? "auto" : "none",
                } as React.CSSProperties}
              >
                <div
                  className="rounded-2xl border backdrop-blur-xl overflow-hidden"
                  style={{
                    backgroundColor: `${color}20`,
                    borderColor: `${color}40`,
                    boxShadow: role === "center" ? `0 20px 60px ${color}30` : "none",
                  }}
                >
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">
                          {project.name}
                        </h3>
                        <span
                          className="inline-block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ color, backgroundColor: `${color}30` }}
                        >
                          {project.category}
                        </span>
                      </div>
                      {project.language && (
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                          style={{ backgroundColor: color }}
                        />
                      )}
                    </div>

                    {role === "center" && (
                      <>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.technologies?.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] px-2 py-0.5 rounded-md bg-white/10 text-white/50 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.stars != null && project.stars > 0 && (
                          <div className="flex items-center gap-1 mb-3">
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                            <span className="text-[10px] text-white/50">{project.stars}</span>
                          </div>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors hover:underline"
                            style={{ color }}
                          >
                            View on GitHub
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-12 flex items-center gap-3 sm:gap-4" style={{ zIndex: 60 }}>
        <button
          onClick={() => navigate("prev")}
          className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 border-2 border-white/60 text-white/80 transition-all rounded-full"
          style={{ background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "scale(1.08)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)" }}
          aria-label="Previous"
        >
          <ArrowLeft size={20} strokeWidth={2.25} />
        </button>
        <button
          onClick={() => navigate("next")}
          className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 border-2 border-white/60 text-white/80 transition-all rounded-full"
          style={{ background: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "scale(1.08)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)" }}
          aria-label="Next"
        >
          <ArrowRight size={20} strokeWidth={2.25} />
        </button>
      </div>

      {/* Bottom-right link */}
      <a
        href={activeProject.url || "#"}
        target={activeProject.url ? "_blank" : undefined}
        rel={activeProject.url ? "noopener noreferrer" : undefined}
        className="absolute bottom-6 sm:bottom-12 right-4 sm:right-10 flex items-center gap-2 uppercase no-underline"
        style={{ zIndex: 60, fontFamily: "'Anton', sans-serif", fontSize: "clamp(16px, 3vw, 40px)", lineHeight: 1, letterSpacing: "-0.02em", color: "white", opacity: 0.9 }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1" }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.9" }}
      >
        {activeProject.category}
        <ArrowRight size={24} strokeWidth={2.25} className="w-4 h-4 sm:w-6 sm:h-6" />
      </a>

      {/* Dots */}
      <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2" style={{ zIndex: 60 }}>
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (!isAnimating) { setActiveIndex(i); setIsAnimating(true); setTimeout(() => setIsAnimating(false), 650) } }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? "24px" : "6px",
              height: "6px",
              backgroundColor: i === activeIndex ? "white" : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
