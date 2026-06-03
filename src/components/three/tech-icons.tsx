"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const techs: { label: string; color: string; position: [number, number, number] }[] = [
  { label: "Py", color: "#00E5FF", position: [-2, 1, -1] },
  { label: "AI", color: "#7B61FF", position: [2, 0.5, -0.5] },
  { label: "JS", color: "#00FF9D", position: [-1.5, -1, 0] },
  { label: "TC", color: "#00E5FF", position: [1.8, -0.8, -1.5] },
  { label: "DS", color: "#7B61FF", position: [0, 1.5, -2] },
];

export function TechIcons() {
  return (
    <>
      {techs.map((tech, i) => (
        <TechIcon key={i} {...tech} />
      ))}
    </>
  );
}

function TechIcon({ label, color, position }: { label: string; color: string; position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.002;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}
