"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { Group, Mesh } from "three";

export function AvatarScene() {
  const groupRef = useRef<Group>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);
  const orbRef = useRef<Mesh>(null);
  const eyeLeft = useRef<Mesh>(null);
  const eyeRight = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.x * 0.4;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.z = t * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.25;
      ring3Ref.current.rotation.z = t * 0.35;
    }
    if (orbRef.current) {
      orbRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    }
    if (eyeLeft.current) {
      eyeLeft.current.position.x = -0.15 + pointer.x * 0.02;
      eyeLeft.current.position.y = 0.9 + pointer.y * 0.01;
    }
    if (eyeRight.current) {
      eyeRight.current.position.x = 0.15 + pointer.x * 0.02;
      eyeRight.current.position.y = 0.9 + pointer.y * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        {/* Core glow sphere */}
        <Sphere ref={orbRef} args={[0.6, 48, 48]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#4a9eff"
            metalness={0.1}
            roughness={0.2}
            emissive="#00E5FF"
            emissiveIntensity={0.2}
            distort={0.15}
            speed={1.5}
          />
        </Sphere>

        {/* Floating outer shell */}
        <Sphere args={[0.72, 32, 32]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#00E5FF"
            transparent
            opacity={0.06}
            wireframe
          />
        </Sphere>

        {/* Head */}
        <Sphere args={[0.4, 32, 32]} position={[0, 0.9, 0]}>
          <meshPhysicalMaterial
            color="#3a7bd5"
            metalness={0.3}
            roughness={0.3}
            emissive="#00E5FF"
            emissiveIntensity={0.08}
          />
        </Sphere>

        {/* Eyes */}
        <Sphere ref={eyeLeft} args={[0.07, 16, 16]} position={[-0.15, 0.9, 0.35]}>
          <meshPhysicalMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
        </Sphere>
        <Sphere ref={eyeRight} args={[0.07, 16, 16]} position={[0.15, 0.9, 0.35]}>
          <meshPhysicalMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
        </Sphere>

        {/* Ring system */}
        <Torus ref={ring1Ref} args={[0.9, 0.015, 16, 60]} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.3} transparent opacity={0.5} />
        </Torus>
        <Torus ref={ring2Ref} args={[1.05, 0.012, 16, 60]} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={0.3} transparent opacity={0.4} />
        </Torus>
        <Torus ref={ring3Ref} args={[1.2, 0.01, 16, 60]} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#00FF9D" emissive="#00FF9D" emissiveIntensity={0.2} transparent opacity={0.3} />
        </Torus>

        {/* Orbiting geometry */}
        <Icosahedron args={[0.12, 0]} position={[1.4, 0.5, 0]}>
          <meshPhysicalMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.5} metalness={0.8} roughness={0.1} />
        </Icosahedron>
        <Icosahedron args={[0.08, 0]} position={[-1.3, -0.4, 0.5]}>
          <meshPhysicalMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={0.5} metalness={0.8} roughness={0.1} />
        </Icosahedron>
        <Icosahedron args={[0.1, 0]} position={[0.5, -0.8, -1.2]}>
          <meshPhysicalMaterial color="#00FF9D" emissive="#00FF9D" emissiveIntensity={0.5} metalness={0.8} roughness={0.1} />
        </Icosahedron>

        {/* Connecting lines (using simple ring geometry as base) */}
        <Torus args={[0.8, 0.005, 3, 60]} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial color="#00E5FF" transparent opacity={0.15} />
        </Torus>
      </Float>
    </group>
  );
}
