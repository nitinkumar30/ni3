"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Shield, Database, Globe, Cpu, Brain, Terminal, Network } from "lucide-react";

const icons = [
  { Icon: Code2, color: "#00E5FF", label: "Code" },
  { Icon: Shield, color: "#7B61FF", label: "Security" },
  { Icon: Database, color: "#00FF9D", label: "Data" },
  { Icon: Globe, color: "#00E5FF", label: "Web" },
  { Icon: Cpu, color: "#7B61FF", label: "CPU" },
  { Icon: Brain, color: "#00FF9D", label: "AI" },
  { Icon: Terminal, color: "#00E5FF", label: "Terminal" },
  { Icon: Network, color: "#7B61FF", label: "Network" },
];

export function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, color, label }, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const radius = 120 + Math.random() * 60;
        const x = 50 + Math.cos(angle) * radius / 3;
        const y = 50 + Math.sin(angle) * radius / 3;
        const duration = 4 + Math.random() * 3;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={label}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <div
              className="p-3 rounded-xl backdrop-blur-sm border"
              style={{
                borderColor: `${color}20`,
                background: `${color}08`,
                boxShadow: `0 0 20px ${color}10`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
