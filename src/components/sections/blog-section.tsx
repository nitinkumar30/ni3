"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { BookOpen, ExternalLink, Calendar, Tag, ArrowRight } from "lucide-react"

interface DevToArticle {
  id: number
  title: string
  description: string
  url: string
  published_at: string
  tag_list: string[]
  positive_reactions_count: number
  comments_count: number
  social_image: string
}

const sampleArticles: DevToArticle[] = [
  {
    id: 1,
    title: "Building Production-Grade AI Agents with Azure AI Foundry",
    description: "A comprehensive guide to designing, deploying, and monitoring intelligent agents using Azure's enterprise AI platform.",
    url: "https://dev.to/nicedoc",
    published_at: "2025-11-15T00:00:00Z",
    tag_list: ["azure", "ai", "agents", "production"],
    positive_reactions_count: 42,
    comments_count: 8,
    social_image: "",
  },
  {
    id: 2,
    title: "The Developer Operating System: Rethinking Portfolio Design",
    description: "How I built an interactive 3D portfolio that functions as a full developer OS with 20+ sections.",
    url: "https://dev.to/nicedoc",
    published_at: "2025-10-20T00:00:00Z",
    tag_list: ["webdev", "react", "threejs", "design"],
    positive_reactions_count: 36,
    comments_count: 5,
    social_image: "",
  },
  {
    id: 3,
    title: "Automating Everything: From CI/CD to AI-Powered Deployments",
    description: "End-to-end automation strategies combining GitHub Actions, Azure DevOps, and AI-driven workflows.",
    url: "https://dev.to/nicedoc",
    published_at: "2025-09-05T00:00:00Z",
    tag_list: ["automation", "devops", "cicd", "azure"],
    positive_reactions_count: 28,
    comments_count: 3,
    social_image: "",
  },
]

export function BlogSection() {
  const [articles] = useState<DevToArticle[]>(sampleArticles)

  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Writings
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">Latest Articles</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Thoughts on AI, automation, full-stack development, and system design
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.id}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card hover glow className="h-full">
                  <div className="p-5 flex flex-col h-full">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {article.tag_list.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] rounded-full bg-[#00E5FF]/10 text-[#00E5FF]/70 border border-[#00E5FF]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#00E5FF] transition-colors">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-white/50 mb-4 flex-grow line-clamp-3">
                      {article.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <div className="flex items-center gap-3">
                        <span>❤️ {article.positive_reactions_count}</span>
                        <span>💬 {article.comments_count}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* dev.to link */}
        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-8 text-center"
          >
            <a
              href="https://dev.to/nicedoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#00E5FF]/30 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/10 transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              View all articles on dev.to
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
