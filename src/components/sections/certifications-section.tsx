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
          <Card className="p-6" hover glow>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6" style={{ color: "var(--foreground)" }}>
              <Award className="w-5 h-5" style={{ color: "var(--primary)" }} />
              Certifications
              <span className="ml-auto text-xs font-mono" style={{ color: "color-mix(in srgb, var(--foreground) 20%, transparent)" }}>{data.certifications.length}</span>
            </h3>
            <div className="space-y-3">
              {data.certifications.map((cert, i) => (
                <ExpandableCard
                  key={cert.name}
                  title={cert.name}
                  icon={
                    <div className="p-1 rounded-md" style={{ background: "color-mix(in srgb, var(--primary) 10%, transparent)" }}>
                      <Star className="w-3 h-3" style={{ color: "var(--primary)" }} />
                    </div>
                  }
                  badge={cert.year}
                >
                  <div className="flex items-center gap-2 text-xs" style={{ color: "color-mix(in srgb, var(--foreground) 40%, transparent)" }}>
                    <ChevronRight className="w-3 h-3" style={{ color: "color-mix(in srgb, var(--primary) 60%, transparent)" }} />
                    <span>{cert.issuer}</span>
                    {cert.credential_id && (
                      <>
                        <span style={{ color: "color-mix(in srgb, var(--foreground) 20%, transparent)" }}>·</span>
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
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-6" style={{ color: "var(--foreground)" }}>
                <Trophy className="w-5 h-5" style={{ color: "var(--primary)" }} />
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
                    className="p-4 rounded-lg"
                    style={{
                      background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4" style={{ color: "var(--accent)" }} />
                      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{honor.title}</p>
                    </div>
                    <p className="text-xs ml-6" style={{ color: "color-mix(in srgb, var(--foreground) 50%, transparent)" }}>{honor.description}</p>
                    <p className="text-xs ml-6 mt-1" style={{ color: "color-mix(in srgb, var(--foreground) 30%, transparent)" }}>{honor.issuer} · {honor.year}</p>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-6" hover glow>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-6" style={{ color: "var(--foreground)" }}>
                <BookOpen className="w-5 h-5" style={{ color: "var(--primary)" }} />
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
                    className="block p-4 rounded-lg transition-all duration-300 group"
                    style={{
                      background: "color-mix(in srgb, var(--foreground) 2%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--foreground) 5%, transparent)",
                    }}
                  >
                    <p className="text-sm font-medium transition-colors" style={{ color: "var(--foreground)" }}>{pub.title}</p>
                    <p className="text-xs mt-1" style={{ color: "color-mix(in srgb, var(--foreground) 50%, transparent)" }}>{pub.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "color-mix(in srgb, var(--primary) 60%, transparent)" }}>
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
