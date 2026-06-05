"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const testimonials = data.testimonials
  const testimonialImages = data.testimonial_images

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <Quote className="w-3.5 h-3.5 mr-1.5" />
              Social Proof
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Testimonials</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[320px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="w-full"
            >
              <div className="p-8 rounded-xl border backdrop-blur-sm" style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)" }}>
                    <img
                      src={testimonialImages[current % testimonialImages.length]}
                      alt={testimonials[current].name}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Quote className="w-6 h-6" style={{ color: "color-mix(in srgb, var(--primary) 30%, transparent)" }} />
                </div>
                <p className="text-sm sm:text-base leading-relaxed mb-6 italic" style={{ color: "var(--muted)" }}>
                  &ldquo;{testimonials[current].testimonial}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{testimonials[current].name}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>{testimonials[current].designation}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5" style={{ color: "var(--accent)", fill: "var(--accent)" }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={goPrev}
            className="p-2 rounded-full border transition-all duration-200"
            style={{ borderColor: "var(--card-border)" }}
          >
            <ChevronLeft className="w-4 h-4" style={{ color: "var(--muted)" }} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "1.5rem" : "0.5rem",
                  background: i === current ? "var(--primary)" : "color-mix(in srgb, var(--foreground) 20%, transparent)",
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="p-2 rounded-full border transition-all duration-200"
            style={{ borderColor: "var(--card-border)" }}
          >
            <ChevronRight className="w-4 h-4" style={{ color: "var(--muted)" }} />
          </button>
        </div>
      </div>
    </section>
  )
}
