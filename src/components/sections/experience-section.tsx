"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { Briefcase, GraduationCap, MapPin, Calendar, ChevronRight } from "lucide-react"

export function ExperienceSection() {
  const allEntries = [
    ...data.work_experience.map((w) => ({ ...w, type: "work" as const })),
    ...data.education.map((e) => ({
      position: e.degree,
      company: e.institution,
      duration: e.duration || e.year || "",
      type: "education" as const,
      highlights: e.highlights,
      location: "",
    })),
  ].sort((a, b) => {
    const aStart = a.duration.split(" - ")[0] || a.duration
    const bStart = b.duration.split(" - ")[0] || b.duration
    return bStart.localeCompare(aStart)
  })

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Briefcase className="w-3.5 h-3.5 mr-1.5" />
              Career Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Experience & Education</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00E5FF]/40 via-[#7B61FF]/30 to-transparent" />

          <div className="space-y-8">
            {allEntries.map((entry, i) => (
              <ScrollReveal key={`${entry.position}-${i}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pl-16 group"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 top-6 w-2 h-2 rounded-full border-2 ${
                    entry.type === "work"
                      ? "bg-[#00E5FF] border-[#00E5FF]/50 group-hover:shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                      : "bg-[#7B61FF] border-[#7B61FF]/50 group-hover:shadow-[0_0_10px_rgba(123,97,255,0.5)]"
                  } transition-all duration-300`} />

                  {/* Icon */}
                  <div className={`absolute left-3 top-5 w-8 h-8 rounded-full flex items-center justify-center -translate-x-1/2 ${
                    entry.type === "work" ? "bg-[#00E5FF]/10" : "bg-[#7B61FF]/10"
                  }`}>
                    {entry.type === "work" ? (
                      <Briefcase className={`w-3.5 h-3.5 ${entry.type === "work" ? "text-[#00E5FF]" : "text-[#7B61FF]"}`} />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-[#7B61FF]" />
                    )}
                  </div>

                  <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group-hover:border-white/20 group-hover:bg-white/[0.04] transition-all duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                        {entry.position}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-white/40 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {"location" in entry ? (entry as any).location || data.personal_info.current_location : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {entry.duration}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#00E5FF]/70 mb-3 font-medium">{entry.company}</p>

                    <div className="space-y-1.5">
                      {entry.highlights.slice(0, 4).map((h, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-white/50">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-[#00E5FF]/40 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
