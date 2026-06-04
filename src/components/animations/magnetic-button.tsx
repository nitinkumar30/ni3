import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  const handleMove = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el || isTouch) return;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left - rect.width / 2) * 0.3;
    const y = (clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouse = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const handleTouch = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) handleMove(t.clientX, t.clientY);
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onTouchMove={handleTouch}
      onMouseLeave={handleLeave}
      onTouchEnd={handleLeave}
      className={`inline-block ${className}`}
      style={{
        transform: !isTouch ? `translate(${position.x}px, ${position.y}px)` : undefined,
        transition: "transform 0.3s cubic-bezier(0.25, 0.4, 0.25, 1)",
      }}
    >
      {children}
    </div>
  );
}
