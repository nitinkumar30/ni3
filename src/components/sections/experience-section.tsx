
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/lib/portfolio-data";
import { Briefcase, ChevronRight } from "lucide-react";

const experience = portfolioData.work_experience;

const companyColors: Record<string, string> = {
  "Happiest Minds Technologies": "#00E5FF",
  "Tata Consultancy Services": "#7B61FF",
  "Arka Jain University": "#00FF9D",
  "Freelancing": "#00E5FF",
};

export function ExperienceSection() {
  return (
    <section id="work-experience" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Work Experience</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                Career Journey
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Main timeline */}
          <div className="absolute left-[1.15rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#00E5FF]/50 via-[#7B61FF]/30 to-transparent" />

          <div className="space-y-8">
            {experience.map((exp, i) => {
              const color = companyColors[exp.company] || "#00E5FF";
              const isCurrent = exp.duration.toLowerCase().includes("current");
              return (
                <motion.div
                  key={`${exp.company}-${exp.position}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="relative pl-14 group"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 top-1 w-7 h-7 rounded-full bg-[#050816] border-2 flex items-center justify-center transition-all duration-500 group-hover:shadow-lg ${
                    isCurrent
                      ? "border-[#00E5FF] shadow-[#00E5FF]/30 animate-pulse"
                      : "border-white/20 group-hover:border-[#00E5FF]/50"
                  }`}>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]" />
                  </div>

                  {/* Card */}
                  <div className={`p-5 rounded-xl border bg-white/[0.03] backdrop-blur-sm transition-all duration-500 group-hover:translate-x-2 ${
                    isCurrent
                      ? "border-[#00E5FF]/30 hover:border-[#00E5FF]/60"
                      : "border-white/10 hover:border-white/20"
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 group-hover:from-[#00E5FF]/30 group-hover:to-[#7B61FF]/30 transition-all duration-500 hidden sm:block">
                        <Briefcase className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                            {exp.position}
                          </h3>
                          {isCurrent && (
                            <Badge variant="success" className="text-[10px]">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm mb-2" style={{ color }}>
                          {exp.company}
                        </p>
                        <p className="text-white/40 text-xs mb-2">{exp.duration}</p>
                        <p className="text-white/50 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all duration-300 mt-2 flex-shrink-0" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

