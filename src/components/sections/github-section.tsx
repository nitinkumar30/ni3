"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import {
  Star,
  GitFork,
  Code2,
  Users,
  Eye,
  BarChart3,
  Activity,
  TrendingUp,
  Flame,
  Search,
  Filter,
  Zap,
  Award,
  Globe,
  Clock,
} from "lucide-react"
import { GitHubIcon } from "@/lib/icons"

interface GitHubStats {
  public_repos: number
  total_stars: number
  total_forks: number
  followers: number
  following: number
  total_commits: number
}

interface ContributionStats {
  streak: number
  weekly: number
  monthly: number
  yearly: number
}

interface LanguageStat {
  name: string
  percentage: number
  color: string
}


const defaultStats: GitHubStats = {
  public_repos: 227,
  total_stars: 160,
  total_forks: 45,
  followers: 50,
  following: 30,
  total_commits: 8000,
}

const defaultContributions: ContributionStats = {
  streak: 12,
  weekly: 45,
  monthly: 180,
  yearly: 2100,
}

const topLanguages: LanguageStat[] = [
  { name: "Python", percentage: 40, color: "#3572a5" },
  { name: "JavaScript", percentage: 20, color: "#f7df1e" },
  { name: "TypeScript", percentage: 20, color: "#3178c6" },
  { name: "HTML", percentage: 10, color: "#e34c26" },
  { name: "CSS", percentage: 5, color: "#563d7c" },
  { name: "Others", percentage: 5, color: "#6e7681" },
]

const weeklyActivity = [
  { day: "Mon", commits: 8 },
  { day: "Tue", commits: 12 },
  { day: "Wed", commits: 6 },
  { day: "Thu", commits: 10 },
  { day: "Fri", commits: 14 },
  { day: "Sat", commits: 4 },
  { day: "Sun", commits: 3 },
]

const languageUniverse: LanguageStat[] = [
  { name: "Python", percentage: 40, color: "#3572a5" },
  { name: "JavaScript", percentage: 20, color: "#f7df1e" },
  { name: "TypeScript", percentage: 20, color: "#3178c6" },
  { name: "HTML", percentage: 10, color: "#e34c26" },
  { name: "CSS", percentage: 5, color: "#563d7c" },
  { name: "Swift", percentage: 2, color: "#f05138" },
  { name: "Go", percentage: 1.5, color: "#00add8" },
  { name: "Rust", percentage: 1, color: "#dea584" },
  { name: "Java", percentage: 0.5, color: "#b07219" },
]

function StatCard({ icon: Icon, label, value, delay }: { icon: any; label: string; value: number | string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--primary)]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ background: "color-mix(in srgb, var(--primary) 15%, transparent)" }}>
          <Icon className="w-4 h-4" style={{ color: "var(--primary)" }} />
        </div>
        <span className="text-sm" style={{ color: "var(--muted)" }}>{label}</span>
      </div>
      <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{value}</p>
    </motion.div>
  )
}

function ContributionCard({ icon: Icon, label, value, suffix, delay }: { icon: any; label: string; value: number | string; suffix?: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)" }}>
          <Icon className="w-4 h-4" style={{ color: "var(--accent)" }} />
        </div>
        <span className="text-sm" style={{ color: "var(--muted)" }}>{label}</span>
      </div>
      <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        {value}{suffix && <span className="text-sm" style={{ color: "var(--muted)" }}> {suffix}</span>}
      </p>
    </motion.div>
  )
}

function LanguageBar({ name, percentage, color, index }: { name: string; percentage: number; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center gap-3"
    >
      <span className="text-xs shrink-0 w-24" style={{ color: "var(--muted)" }}>{name}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "color-mix(in srgb, var(--foreground) 8%, transparent)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs w-8 text-right" style={{ color: "var(--muted)" }}>{percentage}%</span>
    </motion.div>
  )
}

function ActivityBar({ day, commits, maxCommits, index }: { day: string; commits: number; maxCommits: number; index: number }) {
  const heightPercent = (commits / maxCommits) * 100
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <span className="text-[10px]" style={{ color: "var(--muted)" }}>{commits}</span>
      <div className="w-full h-20 rounded-lg overflow-hidden relative" style={{ background: "color-mix(in srgb, var(--foreground) 5%, transparent)" }}>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: `${heightPercent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="absolute bottom-0 w-full rounded-lg"
          style={{ background: "var(--theme-gradient)" }}
        />
      </div>
      <span className="text-[10px]" style={{ color: "var(--muted)" }}>{day}</span>
    </div>
  )
}

function LanguageCard({ lang, index }: { lang: LanguageStat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="flex items-center gap-3 p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:scale-105 transition-all duration-300"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
        style={{ backgroundColor: lang.color, color: "#fff" }}
      >
        {lang.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{lang.name}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "color-mix(in srgb, var(--foreground) 8%, transparent)" }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${lang.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="h-full rounded-full"
              style={{ backgroundColor: lang.color }}
            />
          </div>
          <span className="text-xs font-semibold" style={{ color: lang.color }}>{lang.percentage}%</span>
        </div>
      </div>
    </motion.div>
  )
}

export function GitHubSection() {
  const [stats] = useState<GitHubStats>(defaultStats)
  const [contributions] = useState<ContributionStats>(defaultContributions)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"stars" | "name">("stars")

  const allProjects = data.projects || []

  const mostStarred = allProjects.reduce(
    (best, p) => ((p.stars || 0) > (best?.stars || 0) ? p : best),
    allProjects[0]
  )

  const mostForked = allProjects.reduce(
    (best, p) => (((p as any).forks || 0) > ((best as any)?.forks || 0) ? p : best),
    allProjects[0]
  )

  const recentlyUpdated = allProjects.length > 0 ? allProjects[allProjects.length - 1] : allProjects[0]

  const fastestGrowing = [...allProjects].sort((a, b) => (b.stars || 0) - (a.stars || 0))[0]

  const filteredRepos = allProjects
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "stars") return (b.stars || 0) - (a.stars || 0)
      return a.name.localeCompare(b.name)
    })

  const sectionStyle = "p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"

  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <GitHubIcon className="w-3.5 h-3.5 mr-1.5" />
              Open Source Intelligence
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">GitHub Dashboard</span>
            </h2>
            <p className="text-sm mt-2 max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              Real-time analytics and insights from {data.personal_info.name}&apos;s open source footprint
            </p>
          </div>
        </ScrollReveal>

        {/* 1. GitHub Overview */}
        <ScrollReveal>
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <BarChart3 className="w-5 h-5" style={{ color: "var(--primary)" }} />
              GitHub Overview
            </h3>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <StatCard icon={Code2} label="Repositories" value={stats.public_repos} delay={0} />
          <StatCard icon={Star} label="Total Stars" value={stats.total_stars} delay={0.04} />
          <StatCard icon={GitFork} label="Total Forks" value={stats.total_forks} delay={0.08} />
          <StatCard icon={Users} label="Followers" value={stats.followers} delay={0.12} />
          <StatCard icon={Eye} label="Following" value={stats.following} delay={0.16} />
          <StatCard icon={BarChart3} label="Commits" value={`${(stats.total_commits / 1000).toFixed(1)}k+`} delay={0.2} />
        </div>

        {/* 2. Contribution Analytics */}
        <ScrollReveal>
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Activity className="w-5 h-5" style={{ color: "var(--accent)" }} />
              Contribution Analytics
            </h3>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <ContributionCard icon={Flame} label="Contribution Streak" value={contributions.streak} suffix="days" delay={0} />
          <ContributionCard icon={Activity} label="Weekly" value={contributions.weekly} suffix="commits" delay={0.05} />
          <ContributionCard icon={BarChart3} label="Monthly" value={contributions.monthly} suffix="commits" delay={0.1} />
          <ContributionCard icon={TrendingUp} label="Yearly" value={contributions.yearly} suffix="commits" delay={0.15} />
        </div>

        {/* 3. Repository Insights */}
        <ScrollReveal>
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Zap className="w-5 h-5" style={{ color: "var(--primary)" }} />
              Repository Insights
            </h3>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.4 }}
            className={sectionStyle}
          >
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>Most Starred</span>
            </div>
            <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{mostStarred.name}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{mostStarred.stars || 0} stars</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={sectionStyle}
          >
            <div className="flex items-center gap-2 mb-3">
              <GitFork className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>Most Forked</span>
            </div>
            <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{mostForked.name}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{(mostForked as any).forks || 0} forks</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={sectionStyle}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>Recently Updated</span>
            </div>
            <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{recentlyUpdated.name}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{recentlyUpdated.language || "N/A"}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={sectionStyle}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>Fastest Growing</span>
            </div>
            <p className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>{fastestGrowing.name}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{fastestGrowing.stars || 0} stars</p>
          </motion.div>
        </div>

        {/* 4. Technology Breakdown + 5. Coding Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Technology Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={sectionStyle}
          >
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Technology Breakdown</h3>
            </div>
            <div className="space-y-3">
              {topLanguages.map((lang, i) => (
                <LanguageBar key={lang.name} {...lang} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Coding Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={sectionStyle}
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4" style={{ color: "var(--accent)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Coding Activity</h3>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "var(--muted)" }}>This Week</span>
                <span className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                  {weeklyActivity.reduce((a, b) => a + b.commits, 0)}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>commits</span>
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
                <span>Frequency:</span>
                <span className="font-semibold" style={{ color: "var(--accent)" }}>High</span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-28">
              {weeklyActivity.map((day, i) => (
                <ActivityBar key={day.day} {...day} maxCommits={Math.max(...weeklyActivity.map((d) => d.commits))} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* 6. Open Source Impact */}
        <ScrollReveal>
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Award className="w-5 h-5" style={{ color: "var(--accent)" }} />
              Open Source Impact
            </h3>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.4 }}
            className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-center"
          >
            <Star className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--primary)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{stats.total_stars}+</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Stars Received</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-center"
          >
            <GitFork className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--accent)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{stats.total_forks}+</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Forks Received</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-center"
          >
            <Users className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--primary)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{stats.followers}+</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Community Engagement</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-center"
          >
            <Globe className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--accent)" }} />
            <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{stats.public_repos}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Repository Reach</p>
          </motion.div>
        </div>

        {/* 7. Repository Explorer */}
        <ScrollReveal>
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Search className="w-5 h-5" style={{ color: "var(--primary)" }} />
              Repository Explorer
            </h3>
          </div>
        </ScrollReveal>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={sectionStyle + " mb-12"}
        >
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted)" }} />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[var(--card-border)] bg-transparent focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                style={{ color: "var(--foreground)" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" style={{ color: "var(--muted)" }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "stars" | "name")}
                className="text-sm rounded-lg border border-[var(--card-border)] bg-transparent px-3 py-2 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                <option value="stars" style={{ background: "var(--card-bg)" }}>Sort by Stars</option>
                <option value="name" style={{ background: "var(--card-bg)" }}>Sort by Name</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={repo.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="p-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--primary)]/20 transition-all duration-300 block"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <GitHubIcon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--muted)" }} />
                    <span className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{repo.name}</span>
                  </div>
                  <p className="text-xs line-clamp-2 mb-2" style={{ color: "var(--muted)" }}>{repo.description}</p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: topLanguages.find((l) => l.name === repo.language)?.color || "#6e7681" }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {repo.stars || 0}
                    </span>
                  </div>
                </motion.a>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-sm" style={{ color: "var(--muted)" }}>
                No repositories found for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </motion.div>

        {/* 8. Language Universe */}
        <ScrollReveal>
          <div className="mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Globe className="w-5 h-5" style={{ color: "var(--accent)" }} />
              Language Universe
            </h3>
          </div>
        </ScrollReveal>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={sectionStyle}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {languageUniverse.map((lang, i) => (
              <LanguageCard key={lang.name} lang={lang} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
