"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { ThumbsUp, Users, Send, Clock, Quote, ChevronLeft, ChevronRight } from "lucide-react"

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
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
          {[
            { icon: ThumbsUp, label: "Received", value: recs.received_count, key: "received" as const, color: "from-[var(--primary)] to-[var(--secondary)]" },
            { icon: Send, label: "Given", value: recs.given_count, key: "given" as const, color: "from-[var(--secondary)] to-[var(--success)]" },
            { icon: Clock, label: "Pending", value: recs.pending_count, key: "pending" as const, color: "from-[#FF6B6B] to-[#FFA500]" },
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
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2`} style={{ background: "var(--theme-gradient)" }}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{stat.value}</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>{stat.label}</p>
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

        {/* Carousel */}
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
              <div className="p-6 sm:p-8 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
                <Quote className="w-6 h-6 text-[#00E5FF]/30 mb-3" />
                <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 italic line-clamp-6">
                  &ldquo;{recs.list[current].text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{recs.list[current].name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{recs.list[current].role}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-white/30">{recs.list[current].date}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.03] text-white/30">{recs.list[current].relationship}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button onClick={goPrev} className="p-2 rounded-full border border-white/10 hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 transition-all">
            <ChevronLeft className="w-4 h-4 text-white/50" />
          </button>
          <div className="flex items-center gap-2">
            {recs.list.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[#00E5FF]" : "bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button onClick={goNext} className="p-2 rounded-full border border-white/10 hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 transition-all">
            <ChevronRight className="w-4 h-4 text-white/50" />
          </button>
        </div>

        <p className="text-center text-white/20 text-xs mt-4 flex items-center justify-center gap-1">
          <Users className="w-3 h-3" /> All LinkedIn members
        </p>
      </div>
    </section>
  )
}
