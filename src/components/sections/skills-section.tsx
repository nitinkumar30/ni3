"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { Code2, Zap, Shield, Brain, Database, Globe, Cloud, Wrench, ShieldCheck } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-4 h-4" />,
  Automation: <Zap className="w-4 h-4" />,
  Testing: <Shield className="w-4 h-4" />,
  AI: <Brain className="w-4 h-4" />,
  Data: <Database className="w-4 h-4" />,
  Development: <Globe className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  Frontend: <Code2 className="w-4 h-4" />,
  Tools: <Wrench className="w-4 h-4" />,
  Security: <ShieldCheck className="w-4 h-4" />,
}

function SkillRing({ name, proficiency, index }: { name: string; proficiency: number; index: number }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (proficiency / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#00E5FF]/30 hover:bg-white/[0.04] transition-all duration-300 group"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="url(#grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#7B61FF" />
              <stop offset="100%" stopColor="#00FF9D" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{proficiency}%</span>
        </div>
      </div>
      <span className="text-sm text-white/70 group-hover:text-white transition-colors text-center">{name}</span>
    </motion.div>
  )
}

export function SkillsSection() {
  const categories = [...new Set(data.skills.map((s) => s.category))]
  const topSkills = data.skills.filter((s) => s.proficiency >= 70)
  const otherSkills = data.skills.filter((s) => s.proficiency < 70)

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Technical Proficiency
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">My Skills</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Top skills as rings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-16">
          {topSkills.map((skill, i) => (
            <SkillRing key={skill.name} name={skill.name} proficiency={skill.proficiency} index={i} />
          ))}
        </div>

        {/* Other skills as badges */}
        <div className="space-y-8">
          {categories.map((cat) => {
            const catSkills = data.skills.filter((s) => s.category === cat && s.proficiency < 70)
            if (catSkills.length === 0) return null
            return (
              <ScrollReveal key={cat}>
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-4">
                    {categoryIcons[cat] || <Code2 className="w-4 h-4 text-[#00E5FF]" />}
                    <h3 className="text-sm font-semibold text-white/80">{cat}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {catSkills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10"
                      >
                        <span className="text-sm text-white/70">{skill.name}</span>
                        <span className="text-xs text-white/30">{skill.proficiency}%</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>


      </div>
    </section>
  )
}
