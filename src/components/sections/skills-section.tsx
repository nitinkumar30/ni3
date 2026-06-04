"use client"

import { useRef, type ReactNode } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import {
  Code2, Zap, Shield, Globe, Database, ShieldCheck, Brain,
  Wrench, Cloud, Terminal, Palette, Server, Lock, GitBranch,
} from "lucide-react"

const iconMap: Record<string, ReactNode> = {
  Zap: <Zap className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Lock: <Lock className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Technical Arsenal
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Skills</span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {data.skill_groups.map((group) => (
            <motion.div
              key={group.category}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <ScrollReveal>
                <div
                  className="group relative rounded-xl border backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-[0_0_30px_var(--theme-gradient)]"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(600px circle at 50% 50%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 40%)",
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="p-2.5 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
                        style={{
                          background: "color-mix(in srgb, var(--primary) 12%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        {iconMap[group.icon] || <Code2 className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--foreground)" }}>
                          {group.category}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--foreground) 55%, transparent)" }}>
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-default"
                          style={{
                            background: "color-mix(in srgb, var(--foreground) 4%, transparent)",
                            border: "1px solid color-mix(in srgb, var(--foreground) 8%, transparent)",
                            color: "color-mix(in srgb, var(--foreground) 75%, transparent)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
