"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import { ExternalLink } from "lucide-react"

export function ProjectsSection() {
  const remaining = data.projects.filter((p) => !p.featured)

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold">
              <span className="text-gradient">All Projects</span>
            </h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              {remaining.length} more projects across automation, security, data science, and development
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {remaining.map((project, i) => (
            <ScrollReveal key={project.name}>
              <a href={project.url || "#"} target="_blank" rel="noopener noreferrer">
                <Card hover glow className="p-4 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {project.name}
                      </h4>
                      <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "var(--muted)" }} />
                    </div>
                    <p className="text-xs flex-1" style={{ color: "var(--muted)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                            color: "color-mix(in srgb, var(--primary) 50%, transparent)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
