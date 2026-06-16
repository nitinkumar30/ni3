"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { data } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ChevronDown, ArrowUpRight, Crown } from "lucide-react"

const stats = [
  { value: data.statistics.experience, label: "Experience" },
  { value: data.statistics.projects, label: "Projects Delivered" },
  { value: data.statistics.certifications, label: "Certifications" },
]

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Aurora overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00E5FF]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7B61FF]/10 rounded-full blur-[130px]" />
      </div>

      {/* Hero content — vertically centered */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0 }}
            className="mb-6 lg:mb-8 flex items-center gap-2"
          >
            <Crown className="h-4 w-4 text-white/70" />
            <Badge variant="default" className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-inter">
              <Sparkles className="w-3 h-3 mr-1.5" />
              {data.personal_info.current_role} @ {data.personal_info.current_company}
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            className="font-podium uppercase leading-[0.92] tracking-tight text-white"
          >
            <div className="text-[clamp(2.8rem,8vw,7rem)]">{data.personal_info.name.split(" ")[0]}.</div>
            <div className="text-[clamp(2.8rem,8vw,7rem)]">S</div>
            <div className="text-[clamp(2.8rem,8vw,7rem)]">Kumar</div>
          </motion.h1>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.4 }}
            className="mt-6 lg:mt-8 max-w-md"
          >
            <p className="font-inter text-sm sm:text-base leading-relaxed text-white/70">
              {data.personal_info.headline}
            </p>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.6 }}
            className="mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <a
              href={data.personal_info.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-black px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase text-white transition-colors hover:bg-neutral-900"
            >
              Download Resume
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 border border-white/30 px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              Contact Me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.8 }}
            className="mt-10 sm:mt-14 lg:mt-16 flex flex-wrap gap-6 sm:gap-12 lg:gap-16"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-inter text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[9px] sm:text-xs tracking-widest uppercase text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
