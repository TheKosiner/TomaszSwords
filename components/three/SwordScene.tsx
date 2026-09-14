"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, AdaptiveDpr } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import SwordModel from "./SwordModel";

export function SwordScene({
  exploded,
  onPointerMoveNormalized,
}: {
  exploded: boolean;
  onPointerMoveNormalized?: (x: number, y: number) => void;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 27], fov: 32 }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.05;
      }}
      onError={() => setFailed(true)}
      onPointerMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 2 - 1;
        const y = ((e.clientY - r.top) / r.height) * 2 - 1;
        pointer.current = { x, y };
        onPointerMoveNormalized?.(x, y);
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 9, 8]} intensity={2.6} color="#fff2df" />
        <directionalLight position={[-7, -3, 4]} intensity={1.8} color="#ff8a3c" />
        <directionalLight position={[0, 4, -9]} intensity={1.4} color="#bcd2ff" />
        <pointLight position={[0, -9, 5]} intensity={22} color="#ff7a2a" distance={24} decay={2} />

        {/* Studio zbudowane z lightformerów – żadnych plików HDRI z sieci */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={9} form="rect" position={[-5, 2, 5]} scale={[4, 22, 1]} rotation={[0, Math.PI / 2.4, 0]} color="#fff0dc" />
          <Lightformer intensity={6} form="rect" position={[5, 0, 4]} scale={[3, 24, 1]} rotation={[0, -Math.PI / 2.6, 0]} color="#dce8ff" />
          <Lightformer intensity={4} form="circle" position={[0, 9, -5]} scale={9} color="#ffcf9a" />
          <Lightformer intensity={3} form="rect" position={[0, -8, 3]} scale={[14, 4, 1]} rotation={[Math.PI / 2, 0, 0]} color="#ff7a2a" />
          <mesh scale={40}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#22262c" side={1} />
          </mesh>
        </Environment>

        <Sparkles
          count={45}
          scale={[7, 13, 5]}
          size={2.6}
          speed={0.32}
          opacity={0.55}
          color="#ffb060"
        />

        <SwordModel exploded={exploded} pointer={pointer} />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}

export default SwordScene;
