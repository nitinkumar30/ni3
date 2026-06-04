"use client"

import { useMemo } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { Briefcase, MapPin, Calendar, ChevronRight, Building2 } from "lucide-react"

function parseStartDate(duration: string): number {
  const start = duration.split(" - ")[0] || duration
  const parts = start.split("/")
  if (parts.length === 2) {
    return new Date(parseInt(parts[1]), parseInt(parts[0]) - 1, 1).getTime()
  }
  return new Date(parseInt(parts[0]), 0, 1).getTime()
}

export function ExperienceSection() {
  const sorted = useMemo(
    () =>
      [...data.work_experience].sort(
        (a, b) => parseStartDate(b.duration) - parseStartDate(a.duration)
      ),
    []
  )

  const grouped = useMemo(() => {
    const groups: { company: string; entries: typeof sorted }[] = []
    for (const entry of sorted) {
      const existing = groups.find((g) => g.company === entry.company)
      if (existing) {
        existing.entries.push(entry)
      } else {
        groups.push({ company: entry.company, entries: [entry] })
      }
    }
    return groups
  }, [sorted])

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
              <span className="text-gradient">Experience</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Side image */}
        <div className="fixed right-4 top-1/3 -translate-y-1/2 hidden xl:block z-30">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--card-border)] opacity-40 hover:opacity-80 transition-all duration-500">
            <img
              src={data.images.experience}
              alt="Experience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-8 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--theme-gradient), transparent)",
              opacity: 0.4,
            }}
          />

          <div className="space-y-12">
            {grouped.map((group, gi) => (
              <div key={group.company}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1, duration: 0.5 }}
                  className="relative pl-16 mb-8"
                >
                  <div
                    className="absolute left-4 top-1 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      background:
                        "color-mix(in srgb, var(--primary) 15%, transparent)",
                      border: "2px solid color-mix(in srgb, var(--primary) 40%, transparent)",
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: "var(--theme-gradient)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold flex items-center gap-2"
                      style={{ color: "var(--foreground)" }}
                    >
                      <Building2
                        className="w-5 h-5 shrink-0"
                        style={{ color: "var(--primary)" }}
                      />
                      {group.company}
                    </h3>
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: "var(--muted)" }}
                    >
                      {group.entries.length}{" "}
                      {group.entries.length === 1 ? "position" : "positions"}
                    </p>
                  </div>
                </motion.div>

                <div className="space-y-6">
                  {group.entries.map((entry, ei) => (
                    <ScrollReveal
                      key={`${entry.position}-${entry.duration}`}
                      delay={ei * 0.05}
                      direction="right"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ei * 0.05 }}
                        className="relative pl-16 group"
                      >
                        <div
                          className="absolute left-4 top-6 w-2 h-2 rounded-full border-2 transition-all duration-300"
                          style={{
                            background: "var(--primary)",
                            borderColor:
                              "color-mix(in srgb, var(--primary) 50%, transparent)",
                          }}
                        />

                        <div
                          className="p-5 rounded-xl border backdrop-blur-sm transition-all duration-500 relative overflow-hidden"
                          style={{
                            background: "var(--card-bg)",
                            borderColor: "var(--card-border)",
                          }}
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 w-0.5"
                            style={{
                              background: "var(--theme-gradient)",
                            }}
                          />

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                            <h3
                              className="text-lg font-semibold transition-colors"
                              style={{ color: "var(--foreground)" }}
                            >
                              {entry.position}
                            </h3>
                            <div
                              className="flex items-center gap-3 text-xs flex-wrap"
                              style={{ color: "var(--muted)" }}
                            >
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {entry.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {entry.duration}
                              </span>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                                {entry.type}
                              </Badge>
                            </div>
                          </div>

                          <p
                            className="text-sm mb-1"
                            style={{ color: "var(--primary)" }}
                          >
                            {entry.company}
                          </p>

                          {entry.description && (
                            <p
                              className="text-sm mb-3 leading-relaxed"
                              style={{ color: "var(--muted)" }}
                            >
                              {entry.description}
                            </p>
                          )}

                          <div className="space-y-1.5">
                            {entry.highlights.map((h, j) => (
                              <div
                                key={j}
                                className="flex items-start gap-2 text-sm"
                                style={{ color: "var(--muted)" }}
                              >
                                <ChevronRight
                                  className="w-3 h-3 mt-0.5 shrink-0"
                                  style={{
                                    color: "var(--primary)",
                                    opacity: 0.6,
                                  }}
                                />
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
