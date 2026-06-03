import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30",
        secondary:
          "bg-white/10 text-white border border-white/20",
        destructive:
          "bg-red-500/10 text-red-400 border border-red-500/30",
        outline:
          "text-white/70 border border-white/20",
        success:
          "bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
