"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ProjectCard3DProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectCard3D({ children, className = "" }: ProjectCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  const handleMove = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    if (!isTouch) {
      setRotate({ x: (y - 0.5) * -15, y: (x - 0.5) * 15 });
    }
    setGlow({ x: x * 100, y: y * 100 });
  };

  const handleMouse = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const handleTouch = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) handleMove(t.clientX, t.clientY);
  };

  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onTouchMove={handleTouch}
      onMouseLeave={handleLeave}
      onTouchEnd={handleLeave}
      className={className}
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div
        style={{
          transform: !isTouch ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` : undefined,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <div
          className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(0,229,255,0.12), transparent 60%)`,
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}
