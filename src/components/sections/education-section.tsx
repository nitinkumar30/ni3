"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { GraduationCap, BookOpen, Award } from "lucide-react"

const degreeIcons = [GraduationCap, BookOpen, Award]

export function EducationSection() {
  const education = data.education

  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Education</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">
                Academic Journey
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)]/50 via-[var(--secondary)]/30 to-transparent" />

          {/* Timeline image */}
          <div className="absolute -right-32 top-1/3 -translate-y-1/2 hidden xl:block">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[var(--card-border)] opacity-60 hover:opacity-100 transition-opacity">
              <img
                src={data.images.timeline}
                alt="Timeline"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-12">
            {education.map((edu, i) => {
              const Icon = degreeIcons[i] || GraduationCap
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  className="relative pl-20 group"
                >
                  <div className="absolute left-4 top-1 w-9 h-9 rounded-full bg-[#050816] border-2 border-[#00E5FF]/50 flex items-center justify-center group-hover:border-[#00E5FF] group-hover:shadow-lg group-hover:shadow-[#00E5FF]/20 transition-all duration-500">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]" />
                  </div>

                  <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#00E5FF]/30 hover:bg-white/[0.06] transition-all duration-500 group-hover:translate-x-2">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 group-hover:from-[#00E5FF]/30 group-hover:to-[#7B61FF]/30 transition-all duration-500">
                        <Icon className="w-5 h-5 text-[#00E5FF]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                            {edu.degree}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {edu.duration || edu.year}
                          </Badge>
                        </div>
                        <p className="text-[#00E5FF]/80 text-sm mb-2">{edu.institution}</p>
                        <p className="text-white/50 text-sm leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
