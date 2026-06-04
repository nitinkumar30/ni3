import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "glow"
    size?: "sm" | "md" | "lg"
  }
>(({ className, variant = "default", size = "md", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 touch-manipulation",
        variant === "default" &&
          "bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-white hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95",
        variant === "outline" &&
          "border border-white/20 text-white/80 hover:border-[#00E5FF]/50 hover:text-white hover:bg-white/5",
        variant === "ghost" &&
          "text-white/60 hover:text-white hover:bg-white/5",
        variant === "glow" &&
          "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/20 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3 text-base",
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
