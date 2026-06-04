"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import { Star, ExternalLink, Code2, Search, ArrowUpDown, Folder, Sparkles } from "lucide-react"

const categories = [
  "Python",
  "Automation",
  "Testing",
  "Cyber Security",
  "Data Science",
  "Web Development",
  "AI",
  "Open Source",
]

export function ProjectsSection() {
  const featured = data.projects.filter((p) => p.featured)
  const nonFeatured = data.projects.filter((p) => !p.featured)
  const [tab, setTab] = useState<"featured" | "all">("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "stars">("stars")

  const filtered = nonFeatured.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !activeCategory || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name)
    if (sortBy === "name-desc") return b.name.localeCompare(a.name)
    return (b.stars ?? 0) - (a.stars ?? 0)
  })

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <Folder className="w-3.5 h-3.5 mr-1.5" />
              Project Vault
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Projects</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setTab("featured")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              color: tab === "featured" ? "var(--primary)" : "var(--muted)",
              background: tab === "featured" ? "color-mix(in srgb, var(--primary) 10%, transparent)" : "transparent",
              border: `1px solid ${tab === "featured" ? "color-mix(in srgb, var(--primary) 30%, transparent)" : "var(--card-border)"}`,
            }}
          >
            <Sparkles className="w-4 h-4" />
            Featured
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{
                background: "color-mix(in srgb, var(--foreground) 10%, transparent)",
                color: "var(--muted)",
              }}
            >
              {featured.length}
            </span>
          </button>
          <button
            onClick={() => setTab("all")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              color: tab === "all" ? "var(--primary)" : "var(--muted)",
              background: tab === "all" ? "color-mix(in srgb, var(--primary) 10%, transparent)" : "transparent",
              border: `1px solid ${tab === "all" ? "color-mix(in srgb, var(--primary) 30%, transparent)" : "var(--card-border)"}`,
            }}
          >
            <Folder className="w-4 h-4" />
            All Projects
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{
                background: "color-mix(in srgb, var(--foreground) 10%, transparent)",
                color: "var(--muted)",
              }}
            >
              {nonFeatured.length}
            </span>
          </button>
        </div>

        {/* Featured tab */}
        {tab === "featured" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((project, pi) => (
              <ScrollReveal key={project.name}>
                <a href={project.url || "#"} target="_blank" rel="noopener noreferrer">
                  <Card hover glow className="p-4 h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-[var(--card-border)]">
                            <img
                              src={data.images.cards[pi % data.images.cards.length]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                            {project.name}
                          </h4>
                        </div>
                        <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "var(--muted)" }} />
                      </div>
                      <p className="text-xs flex-1" style={{ color: "var(--muted)" }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {project.language && (
                          <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--muted)" }}>
                            <Code2 className="w-3 h-3" />
                            {project.language}
                          </span>
                        )}
                        {project.stars !== undefined && (
                          <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--muted)" }}>
                            <Star className="w-3 h-3" style={{ color: "var(--accent)" }} />
                            {project.stars}
                          </span>
                        )}
                      </div>
                      {project.category && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-mono self-start mt-2"
                          style={{
                            background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                            color: "var(--accent)",
                            border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
                          }}
                        >
                          {project.category}
                        </span>
                      )}
                    </div>
                  </Card>
                </a>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* All Projects tab */}
        {tab === "all" && (
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <div className="relative flex-1 w-full max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "var(--muted)" }}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-transparent outline-none transition-colors"
                  style={{
                    color: "var(--foreground)",
                    borderColor: "var(--card-border)",
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" style={{ color: "var(--muted)" }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm rounded-lg border bg-transparent px-3 py-2 outline-none transition-colors"
                  style={{
                    color: "var(--foreground)",
                    borderColor: "var(--card-border)",
                  }}
                >
                  <option value="stars">Most Stars</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all"
                  style={{
                    color: activeCategory === cat ? "var(--primary)" : "var(--muted)",
                    borderColor:
                      activeCategory === cat
                        ? "color-mix(in srgb, var(--primary) 40%, transparent)"
                        : "var(--card-border)",
                    background:
                      activeCategory === cat
                        ? "color-mix(in srgb, var(--primary) 10%, transparent)"
                        : "transparent",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sorted.map((project) => (
                <ScrollReveal key={project.name}>
                  <a href={project.url || "#"} target="_blank" rel="noopener noreferrer">
                    <Card hover className="p-4 h-full">
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
                        {project.category && (
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-mono self-start mt-2"
                            style={{
                              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                              color: "var(--accent)",
                              border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
                            }}
                          >
                            {project.category}
                          </span>
                        )}
                      </div>
                    </Card>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {sorted.length === 0 && (
              <p className="text-center text-sm py-12" style={{ color: "var(--muted)" }}>
                No projects match your filters.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
