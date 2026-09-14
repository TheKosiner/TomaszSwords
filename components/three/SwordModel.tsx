"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Group, Mesh, MeshStandardMaterial } from "three";

/* ------------------------------------------------------------------ */
/*  Geometria budowana proceduralnie – bez zewnętrznych plików GLTF.   */
/*  Jednostka = 10 cm. Miecz ~102 cm długości całkowitej.             */
/* ------------------------------------------------------------------ */

const BLADE_LEN = 8.1;

function crossHole(cx: number, cy: number, arm: number, w: number) {
  const p = new THREE.Path();
  p.moveTo(cx - w, cy - arm);
  p.lineTo(cx + w, cy - arm);
  p.lineTo(cx + w, cy - w);
  p.lineTo(cx + arm, cy - w);
  p.lineTo(cx + arm, cy + w);
  p.lineTo(cx + w, cy + w);
  p.lineTo(cx + w, cy + arm);
  p.lineTo(cx - w, cy + arm);
  p.lineTo(cx - w, cy + w);
  p.lineTo(cx - arm, cy + w);
  p.lineTo(cx - arm, cy - w);
  p.lineTo(cx - w, cy - w);
  p.closePath();
  return p;
}

function useBladeGeometry() {
  return useMemo(() => {
    const L = BLADE_LEN;
    const w0 = 0.245;
    const w1 = 0.135;
    const s = new THREE.Shape();
    s.moveTo(-w0, 0.25);
    s.lineTo(-w0, -L * 0.06);
    s.lineTo(-w1, -L * 0.8);
    s.quadraticCurveTo(-w1 * 0.75, -L * 0.94, 0, -L);
    s.quadraticCurveTo(w1 * 0.75, -L * 0.94, w1, -L * 0.8);
    s.lineTo(w0, -L * 0.06);
    s.lineTo(w0, 0.25);
    s.closePath();

    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.05,
      bevelSegments: 2,
      curveSegments: 24,
    });
    geo.translate(0, 0, -0.025);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function useGuardGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.18, -0.22);
    s.lineTo(-0.92, -0.085);
    s.lineTo(0.92, -0.085);
    s.lineTo(1.18, -0.22);
    s.lineTo(1.18, 0.22);
    s.lineTo(0.92, 0.085);
    s.lineTo(-0.92, 0.085);
    s.lineTo(-1.18, 0.22);
    s.closePath();
    s.holes.push(crossHole(-1.035, 0, 0.105, 0.035));
    s.holes.push(crossHole(1.035, 0, 0.105, 0.035));

    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
      curveSegments: 8,
    });
    geo.translate(0, 0, -0.1);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function useScabbardGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    const w = 0.24;
    const L = 8.35;
    s.moveTo(-w, 0);
    s.lineTo(-w * 0.82, L);
    s.quadraticCurveTo(0, L + 0.25, w * 0.82, L);
    s.lineTo(w, 0);
    s.quadraticCurveTo(0, -0.22, -w, 0);
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 0.19,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.06,
      bevelSegments: 3,
      curveSegments: 20,
    });
    geo.translate(0, 0, -0.095);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/* ------------------------------------------------------------- materiały */

const steelProps = {
  color: "#dbe3ea",
  metalness: 0.92,
  roughness: 0.2,
  envMapIntensity: 2.1,
} as const;

const darkSteelProps = {
  color: "#8d98a1",
  metalness: 0.9,
  roughness: 0.4,
  envMapIntensity: 1.4,
} as const;

const leatherProps = {
  color: "#63291f",
  metalness: 0.05,
  roughness: 0.78,
  envMapIntensity: 0.5,
} as const;

/* ------------------------------------------------------------- etykieta */

function PartLabel({
  position,
  title,
  desc,
  visible,
  align = "left",
}: {
  position: [number, number, number];
  title: string;
  desc: string;
  visible: boolean;
  align?: "left" | "right";
}) {
  return (
    <Html
      position={position}
      center
      distanceFactor={11}
      zIndexRange={[20, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        className={[
          "hidden w-52 transition-all duration-500 md:block",
          align === "left" ? "text-left -translate-x-24" : "text-right translate-x-24",
          visible ? "opacity-100 blur-0" : "opacity-0 blur-sm",
        ].join(" ")}
      >
        <div
          className={[
            "h-px w-full bg-gradient-to-r",
            align === "left" ? "from-transparent to-gold-500" : "from-gold-500 to-transparent",
          ].join(" ")}
        />
        <p className="mt-2 font-display text-[13px] uppercase tracking-[0.3em] text-gold-400">
          {title}
        </p>
        <p className="mt-1 text-[11px] leading-snug text-parchment-dim">{desc}</p>
      </div>
    </Html>
  );
}

/* ----------------------------------------------------------------- miecz */

export function SwordModel({
  exploded,
  pointer,
}: {
  exploded: boolean;
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  const root = useRef<Group>(null);
  const bladeGeo = useBladeGeometry();
  const guardGeo = useGuardGeometry();
  const scabbardGeo = useScabbardGeometry();

  const pommel = useRef<Group>(null);
  const grip = useRef<Group>(null);
  const guard = useRef<Group>(null);
  const blade = useRef<Group>(null);
  const tang = useRef<Mesh<THREE.BufferGeometry, MeshStandardMaterial>>(null);
  const scabbard = useRef<Group>(null);

  const t = useRef(0);

  useFrame((state, delta) => {
    const target = exploded ? 1 : 0;
    t.current += (target - t.current) * Math.min(delta * 3.2, 1);
    const e = t.current;
    const ease = e * e * (3 - 2 * e);

    if (pommel.current) pommel.current.position.y = 2.32 + ease * 1.5;
    if (grip.current) grip.current.position.y = 1.4 + ease * 0.75;
    if (guard.current) {
      guard.current.position.y = 0.62 + ease * 0.2;
      guard.current.position.z = ease * 0.12;
    }
    if (blade.current) blade.current.position.y = 0.5 - ease * 0.9;
    if (tang.current) tang.current.material.opacity = 0.2 + ease * 0.8;

    if (scabbard.current) {
      scabbard.current.position.x = 2.15 + ease * 1.1;
      scabbard.current.rotation.z = -ease * 0.12;
    }

    if (root.current) {
      const p = pointer.current ?? { x: 0, y: 0 };
      const idleSpin = state.clock.elapsedTime * 0.12;
      const targetY = p.x * 0.5 + (exploded ? 0.3 : Math.sin(idleSpin) * 0.5);
      const targetX = -p.y * 0.2;
      root.current.rotation.y += (targetY - root.current.rotation.y) * Math.min(delta * 2.2, 1);
      root.current.rotation.x += (targetX - root.current.rotation.x) * Math.min(delta * 2.2, 1);
      root.current.position.y = 2.66 + Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
      const s = 1.12 - ease * 0.26;
      root.current.scale.setScalar(s);
    }
  });

  const wraps = useMemo(() => Array.from({ length: 13 }, (_, i) => i), []);

  return (
    <group ref={root} rotation={[0, 0.3, 0]} position={[0, 2.66, 0]}>
      {/* ---------------------------------------------------- głownia */}
      <group ref={blade} position={[0, 0.5, 0]}>
        <mesh geometry={bladeGeo} castShadow>
          <meshStandardMaterial {...steelProps} />
        </mesh>
        {/* zbrocze – po obu stronach głowni */}
        {[0.062, -0.062].map((z) => (
          <mesh key={z} position={[0, -BLADE_LEN * 0.34, z]}>
            <boxGeometry args={[0.1, BLADE_LEN * 0.6, 0.02]} />
            <meshStandardMaterial {...darkSteelProps} color="#5d666e" />
          </mesh>
        ))}
        {/* trzpień – widoczny po rozłożeniu */}
        <mesh ref={tang} position={[0, 1.15, 0]}>
          <boxGeometry args={[0.1, 2.3, 0.08]} />
          <meshStandardMaterial {...darkSteelProps} transparent opacity={0.25} />
        </mesh>
        <PartLabel
          position={[0.55, -BLADE_LEN * 0.5, 0]}
          title="Głownia"
          desc="Hartowana stal sprężynowa. Zbrocze odbiera masę ze środka, zostawiając sztywność przy krawędziach."
          visible={exploded}
          align="right"
        />
        <PartLabel
          position={[0.5, 1.15, 0]}
          title="Trzpień"
          desc="Przedłużenie głowni biegnące przez całą rękojeść, nitowane na głowicy."
          visible={exploded}
          align="right"
        />
      </group>

      {/* ------------------------------------------------------- jelec */}
      <group ref={guard} position={[0, 0.62, 0]}>
        <mesh geometry={guardGeo} castShadow>
          <meshStandardMaterial {...steelProps} roughness={0.24} />
        </mesh>
        <PartLabel
          position={[-1.25, 0, 0]}
          title="Jelec"
          desc="Chroni dłoń i pozwala wiązać broń przeciwnika. Przekrój ósemkowy, ramiona przewężone."
          visible={exploded}
        />
      </group>

      {/* --------------------------------------------------- rękojeść */}
      <group ref={grip} position={[0, 1.4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.108, 0.128, 1.25, 28]} />
          <meshStandardMaterial {...leatherProps} />
        </mesh>
        {wraps.map((i) => (
          <mesh key={i} position={[0, -0.56 + i * 0.094, 0]} rotation={[Math.PI / 2, 0, 0.16]}>
            <torusGeometry args={[0.121, 0.012, 6, 22]} />
            <meshStandardMaterial color="#2c120e" roughness={0.9} metalness={0.02} />
          </mesh>
        ))}
        <PartLabel
          position={[0.45, 0, 0]}
          title="Rękojeść"
          desc="Drewniany rdzeń kryty skórą i owinięty rzemieniem – chwyt nie ślizga się w dłoni."
          visible={exploded}
          align="right"
        />
      </group>

      {/* ---------------------------------------------------- głowica */}
      <group ref={pommel} position={[0, 2.32, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.36, 0.36, 0.2, 40]} />
          <meshStandardMaterial {...steelProps} roughness={0.22} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.005]}>
          <torusGeometry args={[0.24, 0.022, 10, 40]} />
          <meshStandardMaterial {...darkSteelProps} />
        </mesh>
        {[0, Math.PI / 2].map((rot, i) => (
          <mesh key={i} position={[0, 0, 0.105]} rotation={[0, 0, rot]}>
            <boxGeometry args={[0.06, 0.3, 0.03]} />
            <meshStandardMaterial {...darkSteelProps} color="#5a636b" />
          </mesh>
        ))}
        <PartLabel
          position={[-0.5, 0.05, 0]}
          title="Głowica"
          desc="Przeciwwaga przesuwająca punkt równowagi do dłoni. Bez niej miecz ciągnąłby rękę w przód."
          visible={exploded}
        />
      </group>

      {/* ----------------------------------------------------- pochwa */}
      <group ref={scabbard} position={[2.15, -7.85, 0]}>
        <mesh geometry={scabbardGeo} castShadow>
          <meshStandardMaterial color="#54211b" metalness={0.08} roughness={0.72} />
        </mesh>
        {/* trzewik */}
        <mesh position={[0, -0.12, 0]}>
          <coneGeometry args={[0.25, 0.7, 20]} />
          <meshStandardMaterial {...steelProps} roughness={0.3} />
        </mesh>
        {/* szyjka */}
        <mesh position={[0, 8.15, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.5, 20]} />
          <meshStandardMaterial color="#652a22" roughness={0.65} metalness={0.05} />
        </mesh>
        {/* okucia zawiesia: opaska + kabłąk z kółkiem */}
        {[7.05, 6.15].map((y) => (
          <group key={y} position={[0, y, 0]}>
            <mesh>
              <boxGeometry args={[0.7, 0.15, 0.4]} />
              <meshStandardMaterial {...darkSteelProps} roughness={0.3} />
            </mesh>
            <mesh position={[0.32, -0.14, 0]} rotation={[0, 0, -0.42]}>
              <boxGeometry args={[0.08, 0.3, 0.06]} />
              <meshStandardMaterial {...darkSteelProps} roughness={0.35} />
            </mesh>
            <mesh position={[0.43, -0.31, 0]} rotation={[0.35, 0, 0]}>
              <torusGeometry args={[0.12, 0.028, 8, 20]} />
              <meshStandardMaterial {...darkSteelProps} roughness={0.35} />
            </mesh>
          </group>
        ))}
        <PartLabel
          position={[0.7, 4.2, 0]}
          title="Pochwa"
          desc="Drewniany rdzeń kryty skórą, stalowy trzewik i pas zawiesia z okuciami."
          visible={exploded}
          align="right"
        />
      </group>
    </group>
  );
}

export default SwordModel;
