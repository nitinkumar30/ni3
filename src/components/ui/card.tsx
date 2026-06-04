"use client"

import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  tilt?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = false, glow = false, tilt = false, onClick }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={tilt ? handleMove : undefined}
      onMouseLeave={tilt ? handleLeave : undefined}
      onClick={onClick}
      className={cn(
        "rounded-xl border backdrop-blur-sm transition-all duration-500",
        "bg-[var(--card-bg)] border-[var(--card-border)]",
        hover && "hover:border-[var(--primary)]/30 hover:bg-[var(--card-bg)] hover:shadow-[0_0_30px_var(--primary)/10]",
        glow && "shadow-[0_0_20px_var(--primary)/8]",
        tilt && "cursor-default",
        onClick && "cursor-pointer",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  )
}
