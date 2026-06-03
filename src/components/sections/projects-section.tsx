"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/lib/portfolio-data";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = portfolioData.projects;

const categories = ["All", "Automation", "Python", "Data Science", "Web Development", "Cyber Security"];

const projectCategory = (index: number): string => {
  const map = ["Automation", "Automation", "Automation", "Web Development", "Data Science", "Automation", "Data Science", "Automation", "Cyber Security"];
  return map[index] || "Python";
};

const projectColors = ["#00E5FF", "#7B61FF", "#00FF9D", "#00E5FF", "#7B61FF", "#00E5FF", "#00FF9D", "#7B61FF", "#00E5FF"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = projects.filter(
    (p, i) => activeFilter === "All" || projectCategory(i) === activeFilter
  );

  return (
    <section id="my-work" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">My Work</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  activeFilter === cat
                    ? "bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-white shadow-lg"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const color = projectColors[i] || "#00E5FF";
              return (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="group"
                >
                  <div className="relative h-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-[#00E5FF]/5">
                    {/* Thumbnail area */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#050816] via-[#0a0a1a] to-[#050816]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-16 h-16">
                          <FolderOpen className="w-16 h-16 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `radial-gradient(circle at center, ${color}20, transparent)`,
                            }}
                          />
                        </div>
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                      {/* Top label */}
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-[#050816]/80"
                        >
                          {projectCategory(i)}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#00E5FF] transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {["Python", "Automation"].slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(600px circle at 50% 0%, ${color}08, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
