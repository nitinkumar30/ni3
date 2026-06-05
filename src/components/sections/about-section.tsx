"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import { Code2, Shield, Database, Globe, Award, Briefcase, Languages, Wrench, Bot, UserCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { label: "Experience", value: 5, suffix: "+ Years", icon: Briefcase, color: "#00E5FF" },
  { label: "Projects", value: 200, suffix: "+", icon: Code2, color: "#7B61FF" },
  { label: "Certifications", value: 30, suffix: "+", icon: Award, color: "#00FF9D" },
  { label: "Tools", value: 11, suffix: "+", icon: Wrench, color: "#00E5FF" },
  { label: "AI Tools", value: 4, suffix: "+", icon: Bot, color: "#7B61FF" },
  { label: "Languages", value: 4, suffix: "+", icon: Languages, color: "#00FF9D" },
]

const roleIcons: Record<string, React.ReactNode> = {
  "Senior Automation Engineer": <Database className="w-4 h-4" />,
  "Python Developer": <Code2 className="w-4 h-4" />,
  "Aspiring Data Scientist": <Globe className="w-4 h-4" />,
  "Cyber Security Enthusiast": <Shield className="w-4 h-4" />,
  "Prompt Engineer": <Bot className="w-4 h-4" />,
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <UserCheck className="w-3.5 h-3.5 mr-1.5" />
              About Me
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Who I Am</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 via-[#7B61FF]/10 to-[#00FF9D]/20 animate-gradient-xy">
                  <div className="absolute inset-1 rounded-2xl bg-[#050816] flex flex-col items-center justify-start overflow-y-auto">
                      <div className="text-center p-4 sm:p-8">
                      <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] p-[2px] mb-6">
                        <div className="w-full h-full rounded-full bg-[#050816] overflow-hidden">
                          <img src={data.images.about} alt={data.personal_info.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">{data.about.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Professional Summary</h3>
                <p className="text-white/50 leading-relaxed">{data.about.summary}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Roles & Specializations</h4>
                <div className="space-y-3">
                  {data.about.roles.map((role, i) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#00E5FF]/30 transition-all duration-300 group"
                    >
                      <span className="p-2 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] group-hover:bg-[#00E5FF]/20 transition-colors">
                        {roleIcons[role] || <Code2 className="w-4 h-4" />}
                      </span>
                      <span className="text-white/80 group-hover:text-white transition-colors text-sm">{role}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {data.about.interests.map((interest, i) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Badge variant="premium" className="text-sm px-4 py-2">{interest}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Statistics */}
        <div className="mt-20">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-center group hover:border-white/20 transition-all duration-300"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
                  <div className="text-2xl font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
