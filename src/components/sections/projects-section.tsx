"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import { ExternalLink, Code2, Search, ArrowUpDown, Folder, Star, Sparkles } from "lucide-react"

const categories = [
  "Automation",
  "Development",
  "Cyber Security",
  "Data Science",
  "Data",
]

type Tab = "featured" | "all"

const tabStyles = (active: boolean) =>
  active
    ? {
        color: "var(--primary)",
        borderColor: "color-mix(in srgb, var(--primary) 40%, transparent)" as string,
        background: "color-mix(in srgb, var(--primary) 10%, transparent)" as string,
      }
    : {
        color: "var(--muted)" as string,
        borderColor: "var(--card-border)" as string,
        background: "transparent",
      }

export function ProjectsSection() {
  const allProjects = data.projects
  const [activeTab, setActiveTab] = useState<Tab>("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "stars">("stars")

  const featured = [...allProjects]
    .filter((p) => p.featured)
    .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
    .slice(0, 6)

  const filtered = allProjects.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = !activeCategory || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name)
    if (sortBy === "name-desc") return b.name.localeCompare(a.name)
    return (b.stars ?? 0) - (a.stars ?? 0)
  })

  const projects = activeTab === "featured" ? featured : sorted

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <Folder className="w-3.5 h-3.5 mr-1.5" />
              Project Vault
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">Projects</span>
            </h2>

            <div className="inline-flex items-center gap-1 p-1 rounded-xl" style={{ border: "1px solid var(--card-border)", background: "color-mix(in srgb, var(--foreground) 3%, transparent)" }}>
              <button
                onClick={() => setActiveTab("featured")}
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                style={tabStyles(activeTab === "featured")}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                style={tabStyles(activeTab === "all")}
              >
                <Folder className="w-3.5 h-3.5" />
                All Projects
              </button>
            </div>
          </div>
        </ScrollReveal>

        {activeTab === "all" && (
          <>
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
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
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
                    <div className="flex flex-wrap gap-1.5 mt-2">
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

        {projects.length === 0 && (
          <p className="text-center text-sm py-12" style={{ color: "var(--muted)" }}>
            No projects match your filters.
          </p>
        )}
      </div>
    </section>
  )
}
