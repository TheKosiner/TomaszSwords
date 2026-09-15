"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import SwordModel from "./SwordModel";

const BASE_DISTANCE = 27;

/** Płynne dojeżdżanie kamery do zadanego przybliżenia. */
function CameraRig({ zoom }: { zoom: number }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const target = BASE_DISTANCE / zoom;
    camera.position.z += (target - camera.position.z) * Math.min(delta * 4.5, 1);
  });
  return null;
}

export function SwordScene({
  exploded,
  zoom = 1,
  active = true,
  compact = false,
  onPointerMoveNormalized,
}: {
  exploded: boolean;
  zoom?: number;
  /** wąski ekran — etykiety w wersji kompaktowej */
  compact?: boolean;
  /** false = scena poza ekranem lub karta w tle; pętla renderowania stoi */
  active?: boolean;
  onPointerMoveNormalized?: (x: number, y: number) => void;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);
  /* Rozdzielczość renderowania.
     Sufit to 1 CSS piksel: na ekranie retina scena liczyłaby inaczej czterokrotnie
     więcej pikseli, czego gołym okiem na ciemnym metalu i tak nie widać.
     Poniżej sufitu schodzimy tylko wtedy, gdy pomiar płynności tego wymaga. */
  const [dpr, setDpr] = useState(1);
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, 1));
  }, []);
  const onPerf = useCallback(
    ({ factor }: { factor: number }) =>
      setDpr(Math.round((0.6 + factor * 0.4) * 20) / 20),
    [],
  );

  if (failed) return null;

  return (
    <Canvas
      className={`!absolute inset-x-0 top-0 lg:bottom-28 ${compact ? "bottom-0" : "bottom-16"}`}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, BASE_DISTANCE], fov: 32 }}
      frameloop={active ? "always" : "never"}
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
      <PerformanceMonitor
        /* Progi podane wprost, bez zgadywania z odświeżania ekranu:
           poniżej 24 kl./s schodzimy z rozdzielczości, powyżej 50 wracamy. */
        bounds={() => [24, 50]}
        ms={250}
        iterations={10}
        /* duży krok = zwykle jedna zmiana rozmiaru bufora zamiast kilku */
        step={0.4}
        onChange={onPerf}
      />
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
          count={12}
          scale={[7, 13, 5]}
          size={2.6}
          speed={0.32}
          opacity={0.55}
          color="#ffb060"
        />

        <CameraRig zoom={zoom} />
        <SwordModel exploded={exploded} compact={compact} pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}

export default SwordScene;
