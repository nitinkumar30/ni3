
import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Box } from "@react-three/drei";

export function FloatingCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box ref={meshRef} args={[0.5, 0.5, 0.5]}>
        <meshPhysicalMaterial
          color="#00E5FF"
          transparent
          opacity={0.3}
          wireframe
          emissive="#00E5FF"
          emissiveIntensity={0.2}
        />
      </Box>
    </Float>
  );
}

