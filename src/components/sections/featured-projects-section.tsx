"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import { Star, ExternalLink, GitFork, Code2 } from "lucide-react"

const categoryColors: Record<string, string> = {
  Automation: "#00E5FF",
  "Cyber Security": "#FF4D4D",
  Development: "#7B61FF",
  "Data Science": "#00FF9D",
  Data: "#FF8C00",
}

export function FeaturedProjectsSection() {
  const featured = data.projects.filter((p) => p.featured)
  const stats = data.statistics

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Featured Work
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Projects</span>
            </h2>
            <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: "var(--muted)" }}>
              {stats.projects} projects built with precision. Here are the highlights.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {featured.map((project, i) => (
            <ScrollReveal key={project.name}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Card tilt glow hover className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
                          {project.name}
                        </h3>
                        {project.category && (
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                            style={{
                              background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                              color: "var(--primary)",
                              border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                            }}
                          >
                            {project.category}
                          </span>
                        )}
                      </div>
                      <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        {project.language && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
                            <Code2 className="w-3 h-3" />
                            {project.language}
                          </span>
                        )}
                        {project.stars !== undefined && (
                          <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
                            <Star className="w-3 h-3" style={{ color: "var(--accent)" }} />
                            {project.stars}
                          </span>
                        )}
                        {project.topics?.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                              color: "color-mix(in srgb, var(--primary) 60%, transparent)",
                            }}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 shrink-0 mt-1" style={{ color: "var(--muted)" }} />
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
