"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { GitFork, Star, Eye, Code2, Users, BarChart3 } from "lucide-react"
import { GitHubIcon } from "@/lib/icons"

interface GitHubStats {
  public_repos: number
  total_stars: number
  total_forks: number
  followers: number
  following: number
  total_commits: number
  top_languages: { name: string; percentage: number; color: string }[]
}

const defaultStats: GitHubStats = {
  public_repos: 200,
  total_stars: 150,
  total_forks: 45,
  followers: 50,
  following: 30,
  total_commits: 5000,
  top_languages: [
    { name: "TypeScript", percentage: 35, color: "#3178c6" },
    { name: "JavaScript", percentage: 25, color: "#f7df1e" },
    { name: "Python", percentage: 20, color: "#3572a5" },
    { name: "Java", percentage: 10, color: "#b07219" },
    { name: "Others", percentage: 10, color: "#6e7681" },
  ],
}

function StatCard({ icon: Icon, label, value, delay }: { icon: any; label: string; value: number | string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#00E5FF]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[#00E5FF]/10">
          <Icon className="w-4 h-4 text-[#00E5FF]" />
        </div>
        <span className="text-sm text-white/50">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  )
}

function LanguageBar({ name, percentage, color, index }: { name: string; percentage: number; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-3"
    >
      <span className="text-xs text-white/50 w-24 shrink-0">{name}</span>
      <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-white/40 w-8 text-right">{percentage}%</span>
    </motion.div>
  )
}

export function GitHubSection() {
  const [stats] = useState<GitHubStats>(defaultStats)
  const [repos] = useState(data.projects.filter((p) => p.featured).slice(0, 6))

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <GitHubIcon className="w-3.5 h-3.5 mr-1.5" />
              Open Source Intelligence
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">GitHub Dashboard</span>
            </h2>
            <p className="text-white/40 text-sm mt-2 max-w-xl mx-auto">
              {data.navigation[2]?.label || "GitHub"} analytics — powered by {data.personal_info.name}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <StatCard icon={Code2} label="Repositories" value={stats.public_repos} delay={0} />
          <StatCard icon={Star} label="Stars" value={stats.total_stars} delay={0.05} />
          <StatCard icon={GitFork} label="Forks" value={stats.total_forks} delay={0.1} />
          <StatCard icon={Users} label="Followers" value={stats.followers} delay={0.15} />
          <StatCard icon={Eye} label="Following" value={stats.following} delay={0.2} />
          <StatCard icon={BarChart3} label="Commits" value={`${(stats.total_commits / 1000).toFixed(1)}k+`} delay={0.25} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Language distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <h3 className="text-sm font-semibold text-white/80 mb-6">Language Distribution</h3>
            <div className="space-y-3">
              {stats.top_languages.map((lang, i) => (
                <LanguageBar key={lang.name} {...lang} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Top repos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <h3 className="text-sm font-semibold text-white/80 mb-6">Top Repositories</h3>
            <div className="space-y-3">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-[#00E5FF]/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <GitHubIcon className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/70">{repo.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {Math.floor(Math.random() * 50) + 1}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> {Math.floor(Math.random() * 10) + 1}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
