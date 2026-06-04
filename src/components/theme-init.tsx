"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"

export function ThemeInit() {
  const theme = useAppStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return null
}
