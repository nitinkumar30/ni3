"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion } from "motion/react"

interface AnimateHeightProps {
  open: boolean
  children: ReactNode
  className?: string
}

export function AnimateHeight({ open, children, className }: AnimateHeightProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [children, open])

  return (
    <motion.div
      initial={false}
      animate={{ height: open ? height : 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="overflow-hidden"
    >
      <div ref={contentRef} className={className}>
        {children}
      </div>
    </motion.div>
  )
}
