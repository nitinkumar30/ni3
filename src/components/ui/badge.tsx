import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "success" | "premium"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full",
        variant === "default" &&
          "bg-gradient-to-r from-[#00E5FF]/20 to-[#7B61FF]/20 text-white border border-[#00E5FF]/30",
        variant === "outline" &&
          "border border-white/15 text-white/60",
        variant === "success" &&
          "bg-[#00FF9D]/15 text-[#00FF9D] border border-[#00FF9D]/30",
        variant === "premium" &&
          "bg-gradient-to-r from-[#00E5FF]/10 via-[#7B61FF]/10 to-[#00FF9D]/10 text-white border border-white/10",
        className
      )}
    >
      {children}
    </span>
  )
}
