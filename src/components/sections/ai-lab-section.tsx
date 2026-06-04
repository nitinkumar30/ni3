"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { Brain, Bot, Workflow, Sparkles, Cpu, ArrowRight } from "lucide-react"

const aiIcons: Record<string, React.ReactNode> = {
  "LLM": <Brain className="w-4 h-4 text-[#00E5FF]" />,
  "Automation": <Workflow className="w-4 h-4 text-[#7B61FF]" />,
  "Agent": <Bot className="w-4 h-4 text-[#00FF9D]" />,
  "default": <Cpu className="w-4 h-4 text-white/50" />,
}

export function AILabSection() {
  return (
    <section id="ai-lab" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Innovation Lab
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">AI & Automation Lab</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Building intelligent agents, automated workflows, and AI-powered tools
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* AI Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-6">
              <Brain className="w-4 h-4 text-[#00E5FF]" />
              AI Tools & Models
            </h3>
            <div className="space-y-3">
              {data.ai_tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#00E5FF]/20 transition-all"
                >
                  <div className="p-1.5 rounded-md bg-[#00E5FF]/10">
                    {aiIcons[tool.category] || aiIcons.default}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/80">{tool.name}</p>
                    <p className="text-xs text-white/40">{tool.description || tool.category}</p>
                  </div>
                  <div className="p-1.5 rounded-md hover:bg-white/[0.08] transition-all opacity-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white/30" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Automation Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
          >
            <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-6">
              <Workflow className="w-4 h-4 text-[#7B61FF]" />
              Automation & Workflows
            </h3>
            <div className="space-y-3">
              {data.automation_tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#7B61FF]/20 transition-all"
                >
                  <div className="p-1.5 rounded-md bg-[#7B61FF]/10">
                    <Workflow className="w-3.5 h-3.5 text-[#7B61FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/80">{tool.name}</p>
                    <p className="text-xs text-white/40">{tool.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Lab projects highlight */}
        <ScrollReveal>
          <motion.div
            whileHover={{ borderColor: "rgba(0,229,255,0.3)" }}
            className="p-8 rounded-xl border border-white/10 bg-gradient-to-r from-[#00E5FF]/5 via-[#7B61FF]/5 to-[#00FF9D]/5 text-center"
          >
            <Cpu className="w-10 h-10 text-[#00E5FF] mx-auto mb-4 opacity-60" />
            <p className="text-white/60 text-sm max-w-lg mx-auto">
              The AI & Automation Lab showcases experimental projects, intelligent agents, and automated workflows.
              Visit the GitHub repositories for detailed documentation and source code.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
