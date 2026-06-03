"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SceneContainer({ children, className = "" }: SceneContainerProps) {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 3, 0]} intensity={0.5} color="#00E5FF" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
