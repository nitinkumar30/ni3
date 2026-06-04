"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import { GitHubIcon } from "@/lib/icons"
import {
  ThumbsUp,
  Send,
  Clock,
  Quote,
  ChevronLeft,
  ChevronRight,
  Trophy,
  GitFork,
  Award,
  Code2,
  FileText,
  Users,
  Megaphone,
} from "lucide-react"

export function RecommendationsSection() {
  const recs = data.recommendations
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [detailModal, setDetailModal] = useState<"given" | "pending" | null>(null)

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1)
    setCurrent(i)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % recs.list.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + recs.list.length) % recs.list.length)
  }

  const phIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    Trophy,
    GitFork,
    Award,
    Code2,
  }

  const ciIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    GitHubIcon,
    FileText,
    Users,
    Megaphone,
  }

  return (
    <section id="recommendations" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <ThumbsUp className="w-3.5 h-3.5 mr-1.5" />
              Endorsements
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">Recommendations</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-lg mx-auto">
          {[
            { icon: ThumbsUp, label: "Received", value: recs.received_count, key: "received" as const },
            { icon: Send, label: "Given", value: recs.given_count, key: "given" as const },
            { icon: Clock, label: "Pending", value: recs.pending_count, key: "pending" as const },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => stat.key !== "received" && setDetailModal(stat.key)}
              className="text-center p-4 rounded-xl border backdrop-blur-sm bg-[var(--card-bg)] border-[var(--card-border)]"
              style={stat.key !== "received" ? { cursor: "pointer" } : {}}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                style={{ background: "var(--theme-gradient)" }}
              >
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Detail modal */}
        <AnimatePresence>
          {detailModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailModal(null)}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.6)" }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-md w-full p-6 rounded-xl backdrop-blur-xl"
                style={{
                  background: "var(--nav-bg)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--foreground)" }}>
                  {detailModal === "given" ? "Given Recommendations" : "Pending Recommendations"}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {detailModal === "given" ? recs.given_details : recs.pending_details}
                </p>
                <button
                  onClick={() => setDetailModal(null)}
                  className="mt-6 px-4 py-2 rounded-lg text-sm text-white transition-all"
                  style={{ background: "var(--theme-gradient)" }}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subsection 1: Received Recommendations Carousel */}
        <ScrollReveal>
          <div className="mb-16">
            <h3
              className="text-2xl font-bold text-center mb-10"
              style={{ color: "var(--foreground)" }}
            >
              Received Recommendations
            </h3>

            <div className="relative max-w-3xl mx-auto min-h-[320px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                  className="w-full"
                >
                  <Card className="p-6 sm:p-8">
                    <Quote
                      className="w-6 h-6 mb-3"
                      style={{
                        color: "color-mix(in srgb, var(--primary) 40%, transparent)",
                      }}
                    />
                    <p
                      className="text-sm sm:text-base leading-relaxed mb-6 italic line-clamp-6"
                      style={{ color: "var(--foreground)" }}
                    >
                      &ldquo;{recs.list[current].text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                          {recs.list[current].name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                          {recs.list[current].role}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                            {recs.list[current].date}
                          </span>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded"
                            style={{
                              background: "color-mix(in srgb, var(--foreground) 5%, transparent)",
                              color: "var(--muted)",
                            }}
                          >
                            {recs.list[current].relationship}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={goPrev}
                className="p-2 rounded-full border transition-all"
                style={{
                  borderColor: "var(--card-border)",
                  color: "var(--muted)",
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {recs.list.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "1.5rem" : "0.5rem",
                      background:
                        i === current
                          ? "var(--primary)"
                          : "color-mix(in srgb, var(--foreground) 20%, transparent)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="p-2 rounded-full border transition-all"
                style={{
                  borderColor: "var(--card-border)",
                  color: "var(--muted)",
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Subsection 2: Professional Highlights */}
        {recs.professional_highlights && (
          <ScrollReveal>
            <div className="mb-16">
              <h3
                className="text-2xl font-bold text-center mb-10"
                style={{ color: "var(--foreground)" }}
              >
                {recs.professional_highlights.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recs.professional_highlights.items.map((item, i) => {
                  const Icon = phIconMap[item.icon ?? ""]
                  return (
                    <Card key={i} className="p-6 text-center" hover>
                      {Icon && (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                          style={{
                            background:
                              "color-mix(in srgb, var(--primary) 12%, transparent)",
                          }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: "var(--primary)" }}
                          />
                        </div>
                      )}
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        {item.description}
                      </p>
                    </Card>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Subsection 3: Community Impact */}
        {recs.community_impact && (
          <ScrollReveal>
            <div>
              <h3
                className="text-2xl font-bold text-center mb-10"
                style={{ color: "var(--foreground)" }}
              >
                {recs.community_impact.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recs.community_impact.items.map((item, i) => {
                  const Icon = ciIconMap[item.icon ?? ""]
                  return (
                    <Card key={i} className="p-6 text-center" hover>
                      {Icon && (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                          style={{
                            background:
                              "color-mix(in srgb, var(--accent) 12%, transparent)",
                          }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: "var(--accent)" }}
                          />
                        </div>
                      )}
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        {item.description}
                      </p>
                    </Card>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
