"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ExpandableCard } from "@/components/ui/expandable-card"
import { data } from "@/lib/data"
import { Award, Star, BookOpen, ExternalLink, Trophy, Sparkles, ChevronRight } from "lucide-react"

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Trophy className="w-3.5 h-3.5 mr-1.5" />
              Credentials
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Certifications & Awards</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certifications as FAQ-style card */}
          <Card className="p-6" hover glow perspective>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-[#00E5FF]" />
              Certifications
              <span className="ml-auto text-xs text-white/20 font-mono">{data.certifications.length}</span>
            </h3>
            <div className="space-y-3">
              {data.certifications.map((cert, i) => (
                <ExpandableCard
                  key={cert.name}
                  title={cert.name}
                  icon={
                    <div className="p-1 rounded-md bg-[#00E5FF]/10">
                      <Star className="w-3 h-3 text-[#00E5FF]" />
                    </div>
                  }
                  badge={cert.year}
                >
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <ChevronRight className="w-3 h-3 text-[#00E5FF]/60" />
                    <span>{cert.issuer}</span>
                    {cert.credential_id && (
                      <>
                        <span className="text-white/20">·</span>
                        <span className="font-mono">ID: {cert.credential_id}</span>
                      </>
                    )}
                  </div>
                </ExpandableCard>
              ))}
            </div>
          </Card>

          {/* Honors + Publications */}
          <div className="space-y-8">
            <Card className="p-6" hover glow>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-[#7B61FF]" />
                Honors & Awards
              </h3>
              <div className="space-y-4">
                {data.honors.map((honor, i) => (
                  <motion.div
                    key={honor.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-[#7B61FF]/10 to-transparent border border-[#7B61FF]/20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <p className="text-sm font-semibold text-white">{honor.title}</p>
                    </div>
                    <p className="text-xs text-white/50 ml-6">{honor.description}</p>
                    <p className="text-xs text-white/30 ml-6 mt-1">{honor.issuer} · {honor.year}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-6" hover glow>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-[#00FF9D]" />
                Publications
              </h3>
              <div className="space-y-4">
                {data.publications.map((pub, i) => (
                  <motion.a
                    key={pub.title}
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="block p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-[#00FF9D]/30 transition-all duration-300 group"
                  >
                    <p className="text-sm font-medium text-white group-hover:text-[#00FF9D] transition-colors">
                      {pub.title}
                    </p>
                    <p className="text-xs text-white/50 mt-1">{pub.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-[#00FF9D]/60">
                      <ExternalLink className="w-3 h-3" />
                      <span>{pub.type}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
