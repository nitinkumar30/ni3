"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { BookOpen, ExternalLink, Calendar, ArrowRight } from "lucide-react"

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

const FALLBACK_ARTICLES: DevToArticle[] = [
  {
    id: 1,
    title: "Built with Google Gemini: AI Essay Generator with Gemini",
    description: "AI-powered essay generation using Google Gemini API for the Writing Challenge.",
    url: "https://dev.to/nitinkumar30/ai-essay-generator-with-gemini-34pc",
    published_at: "2026-03-03T12:47:15Z",
    tag_list: ["gemini", "python", "ai", "devchallenge"],
    positive_reactions_count: 3,
    comments_count: 0,
    social_image: "",
  },
  {
    id: 2,
    title: "Transition from pip to uv package manager",
    description: "Why and how to migrate from traditional pip to the blazing-fast uv package manager.",
    url: "https://dev.to/nitinkumar30/transition-from-pip-to-uv-package-manager-3ike",
    published_at: "2026-03-03T12:30:27Z",
    tag_list: ["python", "uv", "programming", "productivity"],
    positive_reactions_count: 0,
    comments_count: 0,
    social_image: "",
  },
  {
    id: 3,
    title: "Guide to publish your first PyPI library",
    description: "Step-by-step guide to publishing your first Python package on PyPI.",
    url: "https://dev.to/nitinkumar30/guide-to-publish-your-first-pypi-library-1bnh",
    published_at: "2026-02-08T18:33:55Z",
    tag_list: ["python", "pypi", "tutorial", "learning"],
    positive_reactions_count: 1,
    comments_count: 0,
    social_image: "",
  },
  {
    id: 4,
    title: "Guide to Publishing a Python Project as a VS Code Extension",
    description: "How I built and published a VS Code extension from a Python project.",
    url: "https://dev.to/nitinkumar30/guide-to-publishing-a-python-project-as-a-vs-code-extension-4emf",
    published_at: "2026-02-07T20:10:20Z",
    tag_list: ["vscode", "vscodextension", "python", "tutorial"],
    positive_reactions_count: 0,
    comments_count: 0,
    social_image: "",
  },
  {
    id: 5,
    title: "How to Build India's Cheapest Penetration Testing Tool",
    description: "Building an affordable BadUSB-based penetration testing tool for security research.",
    url: "https://dev.to/nitinkumar30/how-to-build-indias-cheapest-yet-most-effective-penetration-testing-tool-4m5h",
    published_at: "2025-12-21T18:45:19Z",
    tag_list: ["cybersecurity", "arduino", "badusb", "securitytesting"],
    positive_reactions_count: 0,
    comments_count: 0,
    social_image: "",
  },
  {
    id: 6,
    title: "Quick Fix for Git Certificate Error",
    description: "Resolve Git's certificate verification errors when pushing to remote repositories.",
    url: "https://dev.to/nitinkumar30/git-certificate-error-eradication-1jkj",
    published_at: "2025-04-09T10:16:04Z",
    tag_list: ["git", "github", "errors", "programming"],
    positive_reactions_count: 3,
    comments_count: 4,
    social_image: "",
  },
]

export function BlogSection() {
  const [articles, setArticles] = useState<DevToArticle[]>(FALLBACK_ARTICLES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=nitinkumar30&per_page=6")
      .then((r) => r.json())
      .then((data: DevToArticle[]) => {
        if (data && data.length > 0) setArticles(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

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

        {loading ? (
          <div className="text-center text-white/20 text-sm py-12">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article, i) => (
              <ScrollReveal key={article.id}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card hover glow className="h-full">
                    <div className="p-5 flex flex-col h-full">
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

                      <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#00E5FF] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-xs text-white/50 mb-4 flex-grow line-clamp-3">
                        {article.description}
                      </p>

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
        )}

        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-8 text-center"
          >
            <a
              href="https://dev.to/nitinkumar30"
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
