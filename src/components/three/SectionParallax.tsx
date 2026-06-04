"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface SectionParallaxProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export function SectionParallax({ children, className = "", depth = 0.05 }: SectionParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isInView) return;
    const handler = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * depth;
      const y = (e.clientY - rect.top - rect.height / 2) * depth;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [isInView, depth]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${mouse.y * 0.02}deg) rotateY(${mouse.x * 0.02}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </motion.div>
  );
}
