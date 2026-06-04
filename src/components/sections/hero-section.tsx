"use client"

import { motion } from "motion/react"
import { data } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, ChevronDown, Sparkles, Terminal } from "lucide-react"

const roles = [
  "Python Developer", "Automation Engineer", "Cyber Security Enthusiast",
  "Data Science Learner", "Prompt Engineer", "Web Developer",
]

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00E5FF]/5 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7B61FF]/8 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF9D]/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Badge variant="default" className="mb-6 animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                {data.personal_info.current_role} @ {data.personal_info.current_company}
              </Badge>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="text-white/90">Hi, I&apos;m </span>
                <span className="text-gradient">{data.personal_info.name}</span>
              </h1>

              <div className="h-12 mb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03]"
                >
                  <Terminal className="w-4 h-4 text-[#00E5FF]" />
                  <AnimatedRoleRotator roles={roles} />
                </motion.div>
              </div>

              <p className="text-base sm:text-lg text-white/50 max-w-xl mb-8 leading-relaxed">
                {data.personal_info.headline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a href={data.personal_info.resume_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="group w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Download Resume
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("contact")}
                  className="group w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Contact Me
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start">
                {data.about.interests.slice(0, 6).map((interest, i) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <Badge variant="outline" className="text-xs">{interest}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Interactive revolving avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 flex justify-center items-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 group">
              {/* Orbiting rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#00E5FF]/20 group-hover:border-[#00E5FF]/40 transition-all duration-700"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-dashed border-[#7B61FF]/15 group-hover:border-[#7B61FF]/30 transition-all duration-700"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-dashed border-[#00FF9D]/10 group-hover:border-[#00FF9D]/25 transition-all duration-700"
              />

              {/* Orbiting dots */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2
                const radius = 160
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_rgba(0,229,255,0.6)]"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * radius}px - 4px)`,
                      top: `calc(50% + ${Math.sin(angle) * radius}px - 4px)`,
                    }}
                    animate={{
                      left: [
                        `calc(50% + ${Math.cos(angle) * radius}px - 4px)`,
                        `calc(50% + ${Math.cos(angle + Math.PI) * radius}px - 4px)`,
                        `calc(50% + ${Math.cos(angle) * radius}px - 4px)`,
                      ],
                      top: [
                        `calc(50% + ${Math.sin(angle) * radius}px - 4px)`,
                        `calc(50% + ${Math.sin(angle + Math.PI) * radius}px - 4px)`,
                        `calc(50% + ${Math.sin(angle) * radius}px - 4px)`,
                      ],
                    }}
                    transition={{
                      duration: 6 + i * 0.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.3,
                    }}
                  />
                )
              })}

              {/* Avatar */}
              <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-[#00E5FF]/20 via-[#7B61FF]/10 to-[#00FF9D]/20 p-[3px] group-hover:shadow-[0_0_40px_rgba(0,229,255,0.15)] transition-all duration-700">
                <div className="w-full h-full rounded-full bg-[#050816] flex items-center justify-center overflow-hidden border border-white/5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#050816] overflow-hidden">
                      <img
                        src={data.personal_info.profile_image}
                        alt={data.personal_info.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

function AnimatedRoleRotator({ roles }: { roles: string[] }) {
  return (
    <span className="text-sm text-[#00E5FF] font-mono inline-block min-w-[180px]">
      <motion.span
        key={roles[0]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {roles[0]}
      </motion.span>
    </span>
  )
}
