"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Star, Sparkles } from "lucide-react"
import { data } from "@/lib/data"

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "#00E5FF",
  "Cyber Security": "#FF4D4D",
  "Data Science": "#6BCB77",
  Development: "#FFD93D",
  Data: "#A66CFF",
}

const CATEGORY_PANELS: Record<string, string> = {
  Automation: "#00E5FF20",
  "Cyber Security": "#FF4D4D20",
  "Data Science": "#6BCB7720",
  Development: "#FFD93D20",
  Data: "#A66CFF20",
}

export function ProjectsCarouselSection() {
  const featured = data.projects.filter((p) => p.featured)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
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

  const getIndices = (center: number) => {
    const len = featured.length
    if (len <= 1) return { left: center, right: center, farLeft: center, farRight: center }
    return {
      left: (center - 1 + len) % len,
      right: (center + 1) % len,
      farLeft: (center - 2 + len) % len,
      farRight: (center + 2) % len,
    }
  }

  const { left, right, farLeft, farRight } = getIndices(activeIndex)

  const getCardStyle = (i: number) => {
    const isCenter = i === activeIndex
    const isLeft = i === left
    const isRight = i === right
    const isFar = i === farLeft || i === farRight

    if (isCenter) {
      return {
        zIndex: 20,
        opacity: 1,
        scale: isMobile ? 0.9 : 1,
        translateX: "0%",
        translateY: "0px",
        filter: "blur(0px)",
      }
    }
    if (isLeft) {
      return {
        zIndex: 15,
        opacity: isMobile ? 0 : 0.6,
        scale: isMobile ? 0.7 : 0.75,
        translateX: isMobile ? "-120%" : "-100%",
        translateY: isMobile ? "40px" : "20px",
        filter: "blur(2px)",
      }
    }
    if (isRight) {
      return {
        zIndex: 15,
        opacity: isMobile ? 0 : 0.6,
        scale: isMobile ? 0.7 : 0.75,
        translateX: isMobile ? "120%" : "100%",
        translateY: isMobile ? "40px" : "20px",
        filter: "blur(2px)",
      }
    }
    if (isFar) {
      return {
        zIndex: 10,
        opacity: 0,
        scale: 0.5,
        translateX: "0%",
        translateY: "60px",
        filter: "blur(4px)",
      }
    }
    return { zIndex: 5, opacity: 0, scale: 0.3, translateX: "0%", translateY: "80px", filter: "blur(6px)" }
  }

  if (featured.length === 0) return null

  const activeProject = featured[activeIndex]
  const bgColor = CATEGORY_COLORS[activeProject.category] || "#4488ff"

  return (
    <section id="projects-carousel" className="relative py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${bgColor}08, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Featured Projects
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">Projects That Matter</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Swipe through my featured open-source work
            </p>
          </div>
        </ScrollReveal>

        <div className="relative h-[420px] sm:h-[480px] lg:h-[520px]">
          <AnimatePresence mode="popLayout">
            {featured.map((project, i) => {
              const style = getCardStyle(i)
              const color = CATEGORY_COLORS[project.category] || "#4488ff"
              const panel = CATEGORY_PANELS[project.category] || "#4488ff20"

              if (style.opacity === 0) return null

              return (
                <motion.div
                  key={project.name}
                  layout
                  initial={false}
                  animate={{
                    zIndex: style.zIndex,
                    opacity: style.opacity,
                    scale: style.scale,
                    x: style.translateX,
                    y: style.translateY,
                    filter: style.filter,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute inset-x-0 top-0 flex justify-center"
                  style={{ pointerEvents: i === activeIndex ? "auto" : "none" }}
                >
                  <div
                    className="w-full max-w-lg rounded-2xl border p-6 sm:p-8 backdrop-blur-xl"
                    style={{
                      backgroundColor: panel,
                      borderColor: `${color}30`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                          {project.name}
                        </h3>
                        <span
                          className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                          style={{ color, backgroundColor: `${color}20` }}
                        >
                          {project.category}
                        </span>
                      </div>
                      {project.stars != null && project.stars > 0 && (
                        <div className="flex items-center gap-1 text-white/50">
                          <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
                          <span className="text-xs font-medium">{project.stars}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.language && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-white/40">{project.language}</span>
                      </div>
                    )}

                    {project.url && i === activeIndex && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors"
                        style={{ color }}
                      >
                        View Project
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("prev")}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/40"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (!isAnimating) { setActiveIndex(i); setIsAnimating(true); setTimeout(() => setIsAnimating(false), 650) } }}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === activeIndex ? bgColor : "rgba(255,255,255,0.2)",
                  width: i === activeIndex ? "20px" : "6px",
                }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate("next")}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/40"
            aria-label="Next project"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-[10px] text-white/20 mt-4 tracking-wider">
          {activeIndex + 1} / {featured.length}
        </p>
      </div>
    </section>
  )
}
