"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const IMAGES = [
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", bg: "#F4845F", panel: "#F79B7F" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", bg: "#6BBF7A", panel: "#85CC92" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", bg: "#E882B4", panel: "#ED9DC4" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", bg: "#6EB5FF", panel: "#8DC4FF" },
]

const GRAIN_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0%20200%20200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E`

export default function ToonhubPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    IMAGES.forEach((img) => {
      const el = new Image()
      el.src = img.src
    })
  }, [])

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return
      setIsAnimating(true)
      setActiveIndex((prev) => (dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4))
      setTimeout(() => setIsAnimating(false), 650)
    },
    [isAnimating]
  )

  const center = activeIndex
  const left = (activeIndex + 3) % 4
  const right = (activeIndex + 1) % 4
  const back = (activeIndex + 2) % 4

  const getRole = (i: number) => {
    if (i === center) return "center"
    if (i === left) return "left"
    if (i === right) return "right"
    return "back"
  }

  const getStyle = (role: string) => {
    const base = {
      transition: "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)",
      willChange: "transform, filter, opacity" as const,
    }
    switch (role) {
      case "center":
        return {
          ...base,
          left: "50%",
          bottom: isMobile ? "22%" : "0",
          height: isMobile ? "60%" : "92%",
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
        }
      case "left":
        return {
          ...base,
          left: isMobile ? "20%" : "30%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        }
      case "right":
        return {
          ...base,
          left: isMobile ? "80%" : "70%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "16%" : "28%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
        }
      case "back":
        return {
          ...base,
          left: "50%",
          bottom: isMobile ? "32%" : "12%",
          height: isMobile ? "13%" : "22%",
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
        }
    }
  }

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: IMAGES[activeIndex].bg, fontFamily: "'Inter', sans-serif", transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 50, opacity: 0.4, backgroundImage: `url("${GRAIN_SVG}")`, backgroundSize: "200px 200px" }}
      />

      <div
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 2, top: "18%" }}
      >
        <span
          className="font-anton font-black uppercase leading-none whitespace-nowrap text-white"
          style={{ fontSize: "clamp(90px, 28vw, 380px)", letterSpacing: "-0.02em", opacity: 1 }}
        >
          3D SHAPE
        </span>
      </div>

      <div className="absolute top-6 left-4 sm:left-8" style={{ zIndex: 60 }}>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
          TOONHUB
        </span>
      </div>

      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        {IMAGES.map((img, i) => {
          const role = getRole(i)
          const style = getStyle(role)
          return (
            <div
              key={i}
              className="absolute"
              style={{
                ...style,
                aspectRatio: "0.6 / 1",
              } as React.CSSProperties}
            >
              <img
                src={img.src}
                alt={`Figurine ${i + 1}`}
                draggable={false}
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24" style={{ zIndex: 60, maxWidth: 320 }}>
        <p className="mb-2 sm:mb-3 text-base sm:text-[22px] font-bold uppercase tracking-widest text-white/95" style={{ letterSpacing: "0.02em" }}>
          TOONHUB FIGURINES
        </p>
        <p className="hidden sm:block mb-4 sm:mb-5 text-xs sm:text-sm leading-relaxed text-white/85">
          The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
        </p>
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={() => navigate("prev")}
            className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border-2 border-white text-white"
            style={{ background: "transparent", transition: "transform 150ms, background-color 150ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "scale(1.08)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)" }}
            aria-label="Previous"
          >
            <ArrowLeft size={26} strokeWidth={2.25} />
          </button>
          <button
            onClick={() => navigate("next")}
            className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border-2 border-white text-white"
            style={{ background: "transparent", transition: "transform 150ms, background-color 150ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "scale(1.08)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)" }}
            aria-label="Next"
          >
            <ArrowRight size={26} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <a
        href="#"
        className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 uppercase no-underline transition-opacity"
        style={{ zIndex: 60, fontFamily: "'Anton', sans-serif", fontSize: "clamp(20px, 4vw, 56px)", lineHeight: 1, letterSpacing: "-0.02em", color: "white", opacity: 0.95 }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1" }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.95" }}
      >
        DISCOVER IT
        <ArrowRight size={28} strokeWidth={2.25} className="w-5 h-5 sm:w-8 sm:h-8" style={{ strokeWidth: 2.25 }} />
      </a>
    </div>
  )
}
