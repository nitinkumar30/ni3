"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  expandable?: boolean
  expanded?: boolean
  onToggle?: () => void
}

export function Card({ children, className, hover = false, glow = false, expandable, expanded, onToggle }: CardProps) {
  return (
    <motion.div
      layout={expandable ? true : undefined}
      onClick={expandable ? onToggle : undefined}
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        hover && "transition-all duration-500 hover:border-[#00E5FF]/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(0,229,255,0.05)]",
        glow && "shadow-[0_0_20px_rgba(0,229,255,0.08)]",
        expandable && "cursor-pointer",
        expanded && "border-[#00E5FF]/30",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
