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
          "text-white border",
        variant === "outline" &&
          "border text-white/60",
        variant === "success" &&
          "border text-[var(--success)]",
        variant === "premium" &&
          "text-white border",
        className
      )}
      style={
        variant === "default"
          ? { background: "color-mix(in srgb, var(--primary) 40%, transparent)", borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)" }
          : variant === "outline"
          ? { background: "transparent", borderColor: "color-mix(in srgb, var(--foreground) 15%, transparent)" }
          : variant === "success"
          ? { background: "color-mix(in srgb, var(--success) 15%, transparent)", borderColor: "color-mix(in srgb, var(--success) 30%, transparent)" }
          : { background: "color-mix(in srgb, var(--primary) 10%, transparent)", borderColor: "color-mix(in srgb, var(--foreground) 10%, transparent)" }
      }
    >
      {children}
    </span>
  )
}
