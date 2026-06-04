"use client"

import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  perspective?: boolean
}

export function Card({ children, className, hover = false, glow = false, perspective = false }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!perspective || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(4px)`
  }

  const handleLeave = () => {
    if (!perspective || !ref.current) return
    ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={perspective ? handleMove : undefined}
      onMouseLeave={perspective ? handleLeave : undefined}
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500",
        hover && "hover:border-[#00E5FF]/30 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(0,229,255,0.05)]",
        glow && "shadow-[0_0_20px_rgba(0,229,255,0.08)]",
        perspective && "cursor-default",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  )
}
