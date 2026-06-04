
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus } from "@react-three/drei";
import { Mesh } from "three";

export function AvatarScene() {
  const groupRef = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.x * 0.3;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Head */}
        <Sphere args={[0.5, 32, 32]} position={[0, 0.8, 0]}>
          <meshPhysicalMaterial
            color="#4a9eff"
            metalness={0.1}
            roughness={0.3}
            emissive="#00E5FF"
            emissiveIntensity={0.05}
          />
        </Sphere>

        {/* Eyes */}
        <Sphere args={[0.08, 16, 16]} position={[-0.15, 0.9, 0.45]}>
          <meshPhysicalMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.08, 16, 16]} position={[0.15, 0.9, 0.45]}>
          <meshPhysicalMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} />
        </Sphere>

        {/* Body */}
        <Sphere args={[0.6, 32, 32]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#1a1a2e"
            metalness={0.3}
            roughness={0.4}
            transparent
            opacity={0.9}
          />
        </Sphere>

        {/* Floating rings around body */}
        <Torus args={[0.8, 0.02, 16, 50]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.3} transparent opacity={0.4} />
        </Torus>
        <Torus args={[1, 0.02, 16, 50]} rotation={[0, Math.PI / 3, 0]}>
          <meshPhysicalMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={0.3} transparent opacity={0.3} />
        </Torus>

        {/* Glow aura */}
        <Sphere args={[0.8, 32, 32]} position={[0, 0.3, 0]}>
          <meshPhysicalMaterial
            color="#00E5FF"
            transparent
            opacity={0.05}
            emissive="#00E5FF"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

