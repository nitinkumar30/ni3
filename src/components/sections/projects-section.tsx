"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import type { FeaturedProject, Project } from "@/lib/types"
import { ExternalLink, Folder, Star } from "lucide-react"
import { GitHubIcon } from "@/lib/icons"

function hasTopics(p: FeaturedProject | Project): p is FeaturedProject {
  return "topics" in p
}

function hasTechnologies(p: FeaturedProject | Project): p is Project {
  return "technologies" in p
}

function hasUrl(p: FeaturedProject | Project): p is FeaturedProject {
  return "url" in p
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<"featured" | "all">("featured")
  const featured = data.featured_projects as FeaturedProject[]
  const allProjects = data.projects as Project[]

  const projects = activeTab === "featured" ? featured : allProjects

  const tags = (p: FeaturedProject | Project) =>
    hasTopics(p) ? p.topics : hasTechnologies(p) ? p.technologies : []

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <Folder className="w-3.5 h-3.5 mr-1.5" />
              Portfolio
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">Projects</span>
            </h2>
            <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/10 w-fit mx-auto">
              {(["featured", "all"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all duration-300 ${
                    activeTab === tab ? "bg-[#00E5FF]/20 text-[#00E5FF]" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {tab === "featured" ? "Featured" : "All Projects"}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <ScrollReveal key={project.name}>
                <Card hover glow className="h-full">
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        {hasUrl(project) && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] transition-all"
                          >
                            <GitHubIcon className="w-3.5 h-3.5 text-white/50" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-white/50 mb-4 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags(project).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-xs rounded-full bg-white/[0.03] border border-white/10 text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {"stars" in project && project.stars > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-white/40 mt-auto">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{project.stars} stars</span>
                      </div>
                    )}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
