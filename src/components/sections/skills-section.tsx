"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/lib/portfolio-data";
import { Code2, Cpu, Brain, Globe } from "lucide-react";

const skills = portfolioData.skills;

const skillIcons = [Code2, Cpu, Brain, Globe];
const skillColors = ["#00E5FF", "#7B61FF", "#00FF9D", "#00E5FF"];

export function SkillsSection() {
  return (
    <section id="my-skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">My Skills</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                Technical Proficiency
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => {
            const Icon = skillIcons[i] || Code2;
            const color = skillColors[i] || "#00E5FF";
            const proficiency = parseInt(skill.proficiency);
            const circumference = 2 * Math.PI * 54;
            const offset = circumference - (proficiency / 100) * circumference;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/20 transition-all duration-500 group"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Circular progress */}
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="6"
                      />
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke={color}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.15 + 0.3, ease: "easeOut" }}
                        style={{
                          filter: `drop-shadow(0 0 6px ${color}40)`,
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-8 h-8" style={{ color }} />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                    {skill.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.15 + 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs font-mono" style={{ color }}>
                      {skill.proficiency}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
