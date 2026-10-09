"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

function Sculpture() {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x +=
      (pointer.y * 0.14 - group.current.rotation.x) * Math.min(delta * 2, 1);
    group.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.08;
  });
  return (
    <Float speed={0.65} rotationIntensity={0.15} floatIntensity={0.15}>
      <group ref={group} rotation={[0.12, -0.4, -0.3]}>
        <mesh rotation={[Math.PI / 2.6, 0.25, 0.1]}>
          <torusGeometry args={[1.65, 0.14, 20, 120]} />
          <meshStandardMaterial color="#bcc8fb" metalness={0.9} roughness={0.22} />
        </mesh>
        <mesh rotation={[0.25, Math.PI / 2.7, -0.5]}>
          <torusGeometry args={[1.35, 0.22, 24, 100]} />
          <meshStandardMaterial color="#6e7ef5" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh rotation={[0.55, -0.6, 0.4]}>
          <torusGeometry args={[1.05, 0.31, 24, 100]} />
          <meshStandardMaterial color="#7899e9" metalness={0.88} roughness={0.25} />
        </mesh>
        <mesh rotation={[1.3, -0.3, 0.3]}>
          <torusGeometry args={[2.02, 0.009, 8, 128]} />
          <meshBasicMaterial color="#7699ff" transparent opacity={0.65} />
        </mesh>
        <mesh position={[1.8, 0.6, 0]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#aac1ff" />
        </mesh>
      </group>
    </Float>
  );
}

export default function OrbitalScene({ active }: { active: boolean }) {
  return (
    <Canvas
      className="orbital-canvas"
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6.8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[-3, 4, 4]} intensity={3.4} color="#d3e3ff" />
      <directionalLight position={[4, -1, 2]} intensity={2.8} color="#5b8cff" />
      <pointLight position={[0, 2, -2]} intensity={25} color="#8b5cf6" />
      <Sculpture />
    </Canvas>
  );
}
