"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionParallax } from "@/components/three/SectionParallax";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/lib/portfolio-data";
import { Code2, Shield, Database, Globe, Award, Briefcase, Languages, Wrench, Bot } from "lucide-react";

const data = portfolioData.about;
const stats = portfolioData.statistics;

const statItems = [
  { label: "Certifications", value: parseInt(stats.certifications), suffix: "+", icon: Award, color: "#00E5FF" },
  { label: "Projects", value: parseInt(stats.projects), suffix: "+", icon: Briefcase, color: "#7B61FF" },
  { label: "Experience", value: parseInt(stats.working_years), suffix: "+ Years", icon: Code2, color: "#00FF9D" },
  { label: "Languages", value: parseInt(stats.languages_known), suffix: "+", icon: Languages, color: "#00E5FF" },
  { label: "Tools", value: parseInt(stats.tools_used), suffix: "+", icon: Wrench, color: "#7B61FF" },
  { label: "AI Tools", value: parseInt(stats.ai_tools), suffix: "+", icon: Bot, color: "#00FF9D" },
];

const roleIcons: Record<string, React.ReactNode> = {
  "Senior Automation Engineer": <Database className="w-4 h-4" />,
  "Python Developer": <Code2 className="w-4 h-4" />,
  "Aspiring Data Scientist": <Globe className="w-4 h-4" />,
  "Cyber Security Enthusiast": <Shield className="w-4 h-4" />,
};

export function AboutSection() {
  return (
    <section id="about-me" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionParallax depth={0.03}>
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">About Me</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                  Who I Am
                </span>
              </h2>
            </div>
          </ScrollReveal>
        </SectionParallax>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Profile visual */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Animated portrait placeholder */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 via-[#7B61FF]/10 to-[#00FF9D]/20 animate-gradient-xy">
                  <div className="absolute inset-1 rounded-2xl bg-[#050816] flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] p-1 mb-6">
                        <div className="w-full h-full rounded-full bg-[#050816] overflow-hidden">
                          <img
                            src="/images/nitin.jpg"
                            alt="Nitin Kumar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <p className="text-white/60 text-sm max-w-xs mx-auto px-6">
                        {data.summary}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Floating decor */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-lg border border-[#00E5FF]/30 bg-[#00E5FF]/5 backdrop-blur-sm flex items-center justify-center animate-float">
                  <Code2 className="w-8 h-8 text-[#00E5FF]" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-lg border border-[#7B61FF]/30 bg-[#7B61FF]/5 backdrop-blur-sm flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                  <Shield className="w-6 h-6 text-[#7B61FF]" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Content */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Professional Summary</h3>
                <p className="text-white/60 leading-relaxed">{data.summary}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Roles & Specializations</h4>
                <div className="space-y-3">
                  {data.roles.map((role, i) => (
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
                      <span className="text-white/80 group-hover:text-white transition-colors">{role}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest, i) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Badge variant="outline" className="text-sm px-4 py-2">
                        {interest}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Statistics */}
        <div className="mt-20">
          <SectionParallax depth={0.02}>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statItems.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-center group hover:border-white/20 transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-3" style={{ color: stat.color }} />
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
          </SectionParallax>
        </div>
      </div>
    </section>
  );
}
