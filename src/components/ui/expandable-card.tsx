"use client"

import { useState, type ReactNode } from "react"
import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimateHeight } from "./animate-height"

interface ExpandableCardProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  defaultOpen?: boolean
  badge?: string
}

export function ExpandableCard({ title, icon, children, className, defaultOpen = false, badge }: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500",
        "hover:border-[#00E5FF]/30 hover:bg-white/[0.06]",
        open && "border-[#00E5FF]/30",
        className
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-[#00E5FF] shrink-0">{icon}</span>}
          <span className="text-sm font-medium text-white/90">{title}</span>
          {badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
              {badge}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </button>
      <AnimateHeight open={open}>
        <div className="px-4 pb-4">
          {children}
        </div>
      </AnimateHeight>
    </div>
  )
}
