
import { useEffect, useRef } from "react";

export function GradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      resize();
      time += 0.003;
      const gradient = ctx.createRadialGradient(
        canvas.width * (0.5 + 0.3 * Math.sin(time)),
        canvas.height * (0.5 + 0.3 * Math.cos(time * 0.7)),
        0,
        canvas.width * (0.5 + 0.2 * Math.sin(time * 0.5)),
        canvas.height * (0.5 + 0.2 * Math.cos(time * 0.8)),
        canvas.width * 0.7
      );
      gradient.addColorStop(0, "rgba(0, 229, 255, 0.03)");
      gradient.addColorStop(0.3, "rgba(123, 97, 255, 0.02)");
      gradient.addColorStop(0.6, "rgba(0, 255, 157, 0.01)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

