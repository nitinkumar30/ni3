"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionParallax } from "@/components/three/SectionParallax";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/lib/portfolio-data";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";

const projects = portfolioData.featured_projects;

export function FeaturedProjectsSection() {
  return (
    <section id="featured-projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionParallax depth={0.03}>
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">Open Source</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <p className="text-white/50 mt-4 max-w-2xl mx-auto">
                Top projects from my GitHub — spanning automation, security, web development, and data science.
              </p>
            </div>
          </ScrollReveal>
        </SectionParallax>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#00E5FF]/40 hover:bg-white/[0.06] transition-all duration-500 block"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00E5FF]/5 via-transparent to-[#7B61FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10">
                    {project.language}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-[#00E5FF] transition-colors mb-2 truncate">
                  {project.name}
                </h3>

                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {project.topics && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF]/70 border border-[#00E5FF]/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 text-white/40 text-xs">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {project.stars}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-[#00E5FF] transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={portfolioData.social_links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-sm"
            >
              <GitFork className="w-4 h-4" />
              View all {portfolioData.statistics.projects} projects on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
