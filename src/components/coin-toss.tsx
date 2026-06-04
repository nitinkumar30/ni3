"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { data } from "@/lib/data"

const sectionIds = [
  "hero", "about", "experience", "education", "skills",
  "certifications", "projects", "dashboard", "ai-lab",
  "blog", "testimonials", "recommendations", "contact",
]

const profileImages = [
  data.images.hero,
  data.images.about,
  data.images.experience,
  data.images.contact,
  data.images.timeline,
]

export function CoinToss() {
  const [activeSection, setActiveSection] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const prevSection = useRef(0)
  const flipId = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id)
            if (idx !== -1 && idx !== prevSection.current) {
              prevSection.current = idx
              flipId.current++
              setActiveSection(idx)
              setFlipping(true)
              setTimeout(() => setFlipping(false), 700)
            }
          }
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const imgIndex = activeSection % profileImages.length

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden xl:block pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${flipId.current}-${imgIndex}`}
          initial={false}
          animate={
            flipping
              ? {
                  rotateY: [0, 180, 360],
                  scale: [1, 1.35, 1],
                  y: [0, -40, 0],
                  filter: [
                    "brightness(1) blur(0px)",
                    "brightness(1.3) blur(1px)",
                    "brightness(1) blur(0px)",
                  ],
                }
              : {
                  rotateY: 0,
                  scale: 1,
                  y: [0, -3, 0],
                  filter: "brightness(1) blur(0px)",
                }
          }
          transition={
            flipping
              ? { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
              : { y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
          }
          style={{ perspective: 1000 }}
        >
          <div
            className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-lg"
            style={{
              borderColor: "color-mix(in srgb, var(--primary) 40%, transparent)",
              boxShadow: "0 0 24px color-mix(in srgb, var(--primary) 20%, transparent)",
            }}
          >
            <img
              src={profileImages[imgIndex]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
