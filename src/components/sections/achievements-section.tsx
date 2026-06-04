"use client"

import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { data } from "@/lib/data"
import { Trophy, Target, TrendingUp, Flame, Zap, Medal } from "lucide-react"

export function AchievementsSection() {
  const achievements = [
    { icon: <Flame className="w-4 h-4" />, label: "Years Active", value: "5+" },
    { icon: <Zap className="w-4 h-4" />, label: "Projects Delivered", value: "200+" },
    { icon: <Medal className="w-4 h-4" />, label: "Certifications", value: "30+" },
    { icon: <Trophy className="w-4 h-4" />, label: "Awards", value: "5+" },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Technologies", value: "50+" },
    { icon: <Target className="w-4 h-4" />, label: "Automation Flows", value: "100+" },
  ]

  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <Trophy className="w-3.5 h-3.5 mr-1.5" />
              Dashboard
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-gradient">Achievements</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, i) => (
            <ScrollReveal key={achievement.label} delay={i * 0.05}>
              <Card hover glow className="text-center p-6">
                <div className="p-2 rounded-lg bg-[#00E5FF]/10 w-fit mx-auto mb-3">
                  {achievement.icon}
                </div>
                <p className="text-2xl font-bold text-white mb-1">{achievement.value}</p>
                <p className="text-xs text-white/50">{achievement.label}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
