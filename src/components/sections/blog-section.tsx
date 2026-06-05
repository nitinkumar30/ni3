"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { BookOpen, ExternalLink, Calendar, Search, ArrowUpDown, Sparkles, Clock, Heart, Eye, X, ArrowRight } from "lucide-react"

interface BlogArticle {
  id: number
  title: string
  category: string
  tags: string[]
  reactions: number
  comments: number
  views: number
  readTime: number
  featured: boolean
  date: string
  url: string
}

const ARTICLES: BlogArticle[] = [
  { id: 1, title: "Built with Google Gemini: AI Essay Generator with Gemini", category: "AI", tags: ["gemini", "python", "ai", "writing"], reactions: 3, comments: 0, views: 144, readTime: 8, featured: true, date: "2026-03-03", url: "https://dev.to/nitinkumar30/ai-essay-generator-with-gemini-34pc" },
  { id: 2, title: "Transition from pip to uv package manager", category: "Python", tags: ["python", "uv", "package-manager", "productivity"], reactions: 0, comments: 0, views: 38, readTime: 6, featured: false, date: "2026-03-03", url: "https://dev.to/nitinkumar30/transition-from-pip-to-uv-package-manager-3ike" },
  { id: 3, title: "Guide to publish your first PyPI library 🚀", category: "Python", tags: ["python", "pypi", "tutorial", "packaging"], reactions: 1, comments: 0, views: 25, readTime: 10, featured: false, date: "2026-02-08", url: "https://dev.to/nitinkumar30/guide-to-publish-your-first-pypi-library-1bnh" },
  { id: 4, title: "Guide to Publishing a Python Project as a VS Code Extension", category: "Open Source", tags: ["vscode", "python", "tutorial", "extension"], reactions: 0, comments: 0, views: 151, readTime: 12, featured: false, date: "2026-02-07", url: "https://dev.to/nitinkumar30/guide-to-publishing-a-python-project-as-a-vs-code-extension-4emf" },
  { id: 5, title: "How to Build India's Cheapest (Yet Most Effective) Penetration Testing Tool 🔥", category: "Cybersecurity", tags: ["cybersecurity", "arduino", "badusb", "pentesting"], reactions: 0, comments: 0, views: 88, readTime: 15, featured: false, date: "2025-12-21", url: "https://dev.to/nitinkumar30/how-to-build-indias-cheapest-yet-most-effective-penetration-testing-tool-4m5h" },
  { id: 6, title: "Quick Fix for Git's \"Error Setting Certificate File\" Issue", category: "Git", tags: ["git", "github", "troubleshooting", "certificate"], reactions: 3, comments: 4, views: 2343, readTime: 5, featured: true, date: "2025-04-09", url: "https://dev.to/nitinkumar30/git-certificate-error-eradication-1jkj" },
  { id: 7, title: "Implement BDD in python using behave & allure", category: "Testing", tags: ["python", "bdd", "behave", "allure"], reactions: 0, comments: 0, views: 343, readTime: 10, featured: true, date: "2025-04-08", url: "https://dev.to/nitinkumar30/implement-bdd-in-python-using-behave-allure-56c3" },
  { id: 8, title: "Add SSH key in GitLab account", category: "Git", tags: ["gitlab", "git", "ssh", "tutorial"], reactions: 0, comments: 0, views: 80, readTime: 4, featured: false, date: "2025-01-22", url: "https://dev.to/nitinkumar30/add-ssh-key-in-gitlab-account-45j9" },
  { id: 9, title: "My VAPT Learning Journey", category: "Cybersecurity", tags: ["cybersecurity", "vapt", "learning", "infosec"], reactions: 0, comments: 0, views: 160, readTime: 8, featured: true, date: "2024-12-15", url: "https://dev.to/nitinkumar30/journey-in-vapt-self-training-58k3" },
  { id: 10, title: "Erasing evidence after attacking a host", category: "Cybersecurity", tags: ["cybersecurity", "forensics", "ethical-hacking", "education"], reactions: 0, comments: 0, views: 25, readTime: 7, featured: false, date: "2024-09-06", url: "https://dev.to/nitinkumar30/erasing-evidence-after-attacking-a-host-2lg0" },
  { id: 11, title: "Slack chatGPT AI bot", category: "AI", tags: ["slack", "chatgpt", "ai", "bot"], reactions: 1, comments: 0, views: 35, readTime: 6, featured: false, date: "2024-07-10", url: "https://dev.to/nitinkumar30/slack-chatgpt-ai-bot-2aoc" },
  { id: 12, title: "Challenges for a perfect resume", category: "Career", tags: ["career", "resume", "job-search", "advice"], reactions: 1, comments: 0, views: 368, readTime: 5, featured: true, date: "2024-03-20", url: "https://dev.to/nitinkumar30/challenges-for-a-perfect-resume-4ac9" },
  { id: 13, title: "How to create ransomware script in python", category: "Cybersecurity", tags: ["python", "cybersecurity", "ransomware", "education"], reactions: 0, comments: 0, views: 283, readTime: 10, featured: true, date: "2023-11-04", url: "https://dev.to/nitinkumar30/how-to-create-ransomware-script-in-python-test-28i0" },
  { id: 14, title: "Use & Search files created using Ubuntu on Windows", category: "Tutorial", tags: ["ubuntu", "wsl", "windows", "tutorial"], reactions: 0, comments: 0, views: 27, readTime: 4, featured: false, date: "2023-11-04", url: "https://dev.to/nitinkumar30/use-search-files-created-using-ubuntu-on-windows-1jid" },
  { id: 15, title: "My TestVagrant Interview Experience 🚀", category: "Career", tags: ["career", "interview", "testing", "experience"], reactions: 0, comments: 0, views: 110, readTime: 7, featured: false, date: "2023-08-30", url: "https://dev.to/nitinkumar30/my-testvagrant-interview-experience-4265" },
  { id: 16, title: "Harnessing GitHub Actions for Seamless Workflow Automation", category: "DevOps", tags: ["github-actions", "devops", "automation", "cicd"], reactions: 1, comments: 0, views: 66, readTime: 9, featured: false, date: "2023-08-19", url: "https://dev.to/nitinkumar30/harnessing-github-actions-for-seamless-workflow-automation-40kp" },
  { id: 17, title: "The Art and Science of API Testing Automation", category: "Testing", tags: ["api-testing", "automation", "testing", "python"], reactions: 1, comments: 0, views: 73, readTime: 8, featured: false, date: "2023-08-19", url: "https://dev.to/nitinkumar30/the-art-and-science-of-api-testing-automation-1mlg" },
]

const CATEGORIES = ["All", "Python", "Cybersecurity", "Testing", "DevOps", "AI", "Open Source", "Career", "Git", "Tutorial"]

type Tab = "featured" | "all"
type SortKey = "newest" | "oldest" | "popular" | "reading"

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

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let startTime: number | null = null
    const raf = requestAnimationFrame(function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    })
    return () => cancelAnimationFrame(raf)
  }, [end, duration])
  return count
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export function BlogSection() {
  const [activeTab, setActiveTab] = useState<Tab>("featured")
  const [searchInput, setSearchInput] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState<SortKey>("newest")

  const searchQuery = useDebounce(searchInput, 300)

  const featured = useMemo(() =>
    [...ARTICLES]
      .sort((a, b) => (b.views + b.reactions * 3 + b.comments * 5) - (a.views + a.reactions * 3 + a.comments * 5))
      .slice(0, 6),
  [])

  const filtered = useMemo(() => {
    let result = ARTICLES
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q),
      )
    }
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory)
    }
    return result
  }, [searchQuery, activeCategory])

  const sorted = useMemo(() => {
    const result = [...filtered]
    switch (sortBy) {
      case "newest": return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case "oldest": return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case "popular": return result.sort((a, b) => (b.views + b.reactions * 3 + b.comments * 5) - (a.views + a.reactions * 3 + a.comments * 5))
      case "reading": return result.sort((a, b) => a.readTime - b.readTime)
    }
  }, [filtered, sortBy])

  const displayArticles = activeTab === "featured" ? featured : sorted

  const postsCount = useCounter(17)
  const commentsCount = useCounter(4)
  const tagsCount = useCounter(4)

  const handleReset = useCallback(() => {
    setSearchInput("")
    setActiveCategory("All")
    setSortBy("newest")
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">Latest Articles</span>
            </h2>

            <div className="inline-flex items-center gap-1 p-1 rounded-xl" style={{ border: "1px solid var(--card-border)", background: "color-mix(in srgb, var(--foreground) 3%, transparent)" }}>
              <button
                onClick={() => setActiveTab("featured")}
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                style={tabStyles(activeTab === "featured")}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured Articles
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all"
                style={tabStyles(activeTab === "all")}
              >
                <BookOpen className="w-3.5 h-3.5" />
                All Articles
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Articles Published", value: postsCount, suffix: "+" },
            { label: "Comments Written", value: commentsCount, suffix: "+" },
            { label: "Tags Followed", value: tagsCount, suffix: "+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl"
              style={{
                background: "color-mix(in srgb, var(--foreground) 3%, transparent)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "var(--primary)" }}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

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
                  placeholder="Search articles..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border bg-transparent outline-none transition-colors"
                  style={{
                    color: "var(--foreground)",
                    borderColor: "var(--card-border)",
                  }}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--muted)" }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" style={{ color: "var(--muted)" }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="text-sm rounded-lg border bg-transparent px-3 py-2 outline-none transition-colors"
                  style={{
                    color: "var(--foreground)",
                    borderColor: "var(--card-border)",
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="reading">Reading Time</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((article, i) => (
            <ScrollReveal key={article.id}>
              <motion.a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Card hover glow className="h-full relative overflow-hidden">
                  {article.featured && (
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                        color: "var(--accent)",
                        border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                      }}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </div>
                  )}
                  <div className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                        style={{
                          background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                          color: "var(--primary)",
                          border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                        }}
                      >
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--muted)" }}>
                        <Clock className="w-2.5 h-2.5" />
                        {article.readTime} min
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold mb-3 line-clamp-2 transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--foreground)" }}>
                      {article.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                            color: "color-mix(in srgb, var(--primary) 50%, transparent)",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" style={{ color: "var(--accent)" }} />
                          {article.reactions}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-1 text-[10px] font-medium mt-3 transition-all group-hover:gap-2"
                      style={{ color: "var(--primary)" }}
                    >
                      Read Article
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Card>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        {displayArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4 opacity-30">📄</div>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>No articles found.</p>
            <button
              onClick={handleReset}
              className="text-xs px-4 py-2 rounded-lg border transition-all"
              style={{
                color: "var(--primary)",
                borderColor: "color-mix(in srgb, var(--primary) 40%, transparent)",
                background: "color-mix(in srgb, var(--primary) 10%, transparent)",
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        <ScrollReveal>
          <motion.div whileHover={{ scale: 1.02 }} className="mt-10 text-center">
            <a
              href="https://dev.to/nitinkumar30"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm transition-all duration-300"
              style={{
                borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
                color: "var(--primary)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--primary) 10%, transparent)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
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
