"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = "ontouchstart" in window
    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`
    }

    const down = () => cursor.style.transform += " scale(0.8)"
    const up = () => cursor.style.transform = cursor.style.transform.replace(" scale(0.8)", "")

    document.addEventListener("mousemove", move)
    document.addEventListener("mousedown", down)
    document.addEventListener("mouseup", up)

    return () => {
      document.removeEventListener("mousemove", move)
      document.removeEventListener("mousedown", down)
      document.removeEventListener("mouseup", up)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#00E5FF]/60 pointer-events-none z-[9999] mix-blend-difference hidden md:block transition-transform duration-75 ease-linear"
      style={{ transform: "translate(-100px, -100px)" }}
    />
  )
}
