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
        "rounded-xl border backdrop-blur-sm transition-all duration-500",
        "bg-[var(--card-bg)] border-[var(--card-border)]",
        "hover:border-[var(--primary)]/30 hover:bg-[var(--card-bg)]",
        open && "border-[var(--primary)]/30",
        className
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="shrink-0" style={{ color: "var(--primary)" }}>{icon}</span>}
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{title}</span>
          {badge && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full border text-[var(--primary)]"
              style={{
                background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "color-mix(in srgb, var(--foreground) 30%, transparent)" }} />
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
