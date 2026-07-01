/* eslint-disable react-hooks/immutability --
 * R3F scenes mutate Three.js buffer attributes and camera state in-place
 * each frame inside useFrame. This is the canonical pattern from the
 * @react-three/fiber docs; the lint rule's "values from hooks shouldn't
 * be mutated" guidance is correct for normal React but not for the WebGL
 * render loop. Mutations here are intentional and isolated to useFrame.
 */
"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  type Points as PointsType,
  type LineSegments as LineSegmentsType,
} from "three";
import { useR3fStore } from "@/lib/r3fStore";
import { Whisper } from "@/webgl/effects/Whisper";

// Scene config — tuned for "whisper" intensity.
const PARTICLE_COUNT = 90;
const ACCENT_RATIO = 0.18; // ~18% of particles take the coral accent color.
const FIELD_X = 11;
const FIELD_Y = 6;
const FIELD_Z = 4;
const CONNECT_DIST = 1.15;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const MAX_LINES = 180;
const RECONNECT_EVERY_FRAMES = 3; // O(n^2) pair-scan throttle.
const DRIFT_SPEED = 0.18;
const DRIFT_AMPLITUDE_Y = 0.16;
const DRIFT_AMPLITUDE_X = 0.08;
const CAMERA_PARALLAX_RANGE_X = 0.4;
const CAMERA_PARALLAX_RANGE_Y = 0.25;
const CAMERA_LERP = 0.04;
const PARTICLE_SIZE = 0.05;
const LINE_OPACITY = 0.25;
const PARTICLE_OPACITY = 0.75;
const COLOR_BASE = new Color("#f4f1ed"); // warm off-white, matches site bg tone
const COLOR_ACCENT = new Color("#e8735a"); // brand coral
const COLOR_LINE = new Color("#e8735a"); // brand coral — readable orange lines

interface SeedParticle {
  x: number;
  y: number;
  z: number;
  offset: number;
  isAccent: boolean;
}

interface SceneRefs {
  seeds: SeedParticle[];
  pointsGeometry: BufferGeometry;
  linesGeometry: BufferGeometry;
  linePositions: Float32Array;
  livePositions: Float32Array;
  frameCount: number;
}

function buildSceneRefs(): SceneRefs {
  // Deterministic-ish layout via a simple LCG so the field looks balanced,
  // not clumpy. (Math.random sometimes clusters; this is fine for whisper.)
  let s = 1337;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const seeds: SeedParticle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    seeds.push({
      x: (rand() - 0.5) * FIELD_X,
      y: (rand() - 0.5) * FIELD_Y,
      z: (rand() - 0.5) * FIELD_Z,
      offset: rand() * Math.PI * 2,
      isAccent: rand() < ACCENT_RATIO,
    });
  }

  const pointPositions = new Float32Array(PARTICLE_COUNT * 3);
  const pointColors = new Float32Array(PARTICLE_COUNT * 3);
  seeds.forEach((p, i) => {
    pointPositions[i * 3 + 0] = p.x;
    pointPositions[i * 3 + 1] = p.y;
    pointPositions[i * 3 + 2] = p.z;
    const c = p.isAccent ? COLOR_ACCENT : COLOR_BASE;
    pointColors[i * 3 + 0] = c.r;
    pointColors[i * 3 + 1] = c.g;
    pointColors[i * 3 + 2] = c.b;
  });

  const pointsGeometry = new BufferGeometry();
  pointsGeometry.setAttribute(
    "position",
    new BufferAttribute(pointPositions, 3)
  );
  pointsGeometry.setAttribute("color", new BufferAttribute(pointColors, 3));

  const linePositions = new Float32Array(MAX_LINES * 6);
  const linesGeometry = new BufferGeometry();
  linesGeometry.setAttribute("position", new BufferAttribute(linePositions, 3));
  linesGeometry.setDrawRange(0, 0);

  return {
    seeds,
    pointsGeometry,
    linesGeometry,
    linePositions,
    livePositions: new Float32Array(PARTICLE_COUNT * 3),
    frameCount: 0,
  };
}

/**
 * Particle constellation network — "Human Connector" atmospheric layer.
 *
 * 140 particles drift in a 3D box. Connection lines render between any
 * particle pair within CONNECT_DIST. Pair-scan throttled to every Nth frame.
 * Cursor parallax shifts the camera, not the field itself, so the parallax
 * reads as depth instead of "the scene is following me."
 *
 * Geometries are held in a ref so the per-frame BufferAttribute mutations
 * (the canonical Three.js update pattern) stay outside React's immutability
 * contract.
 */
export function ConstellationField() {
  // useState's lazy initializer runs exactly once and gives us a stable
  // value React 19 can safely read during render. We mutate the geometries
  // in useFrame; React never observes those mutations because R3F's render
  // loop is driven by refs, not state.
  const [scene] = useState<SceneRefs>(buildSceneRefs);

  const pointsRef = useRef<PointsType>(null);
  const linesRef = useRef<LineSegmentsType>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { mouseX, mouseY } = useR3fStore.getState();

    // Drift particles & cache live positions for the pair-scan below.
    const { seeds, pointsGeometry, livePositions, linePositions, linesGeometry } =
      scene;
    const pointsPos = pointsGeometry.attributes.position as BufferAttribute;
    const rawPos = pointsPos.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const seed = seeds[i];
      const phase = t * DRIFT_SPEED + seed.offset;
      const x = seed.x + Math.cos(phase) * DRIFT_AMPLITUDE_X;
      const y = seed.y + Math.sin(phase) * DRIFT_AMPLITUDE_Y;
      const z = seed.z;
      rawPos[i * 3 + 0] = x;
      rawPos[i * 3 + 1] = y;
      rawPos[i * 3 + 2] = z;
      livePositions[i * 3 + 0] = x;
      livePositions[i * 3 + 1] = y;
      livePositions[i * 3 + 2] = z;
    }
    pointsPos.needsUpdate = true;

    // Throttle pair-scan — visually imperceptible at every 3 frames.
    scene.frameCount += 1;
    if (scene.frameCount % RECONNECT_EVERY_FRAMES === 0) {
      let lineCount = 0;
      outer: for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = livePositions[i * 3 + 0];
        const iy = livePositions[i * 3 + 1];
        const iz = livePositions[i * 3 + 2];
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = ix - livePositions[j * 3 + 0];
          const dy = iy - livePositions[j * 3 + 1];
          const dz = iz - livePositions[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < CONNECT_DIST_SQ) {
            const k = lineCount * 6;
            linePositions[k + 0] = ix;
            linePositions[k + 1] = iy;
            linePositions[k + 2] = iz;
            linePositions[k + 3] = livePositions[j * 3 + 0];
            linePositions[k + 4] = livePositions[j * 3 + 1];
            linePositions[k + 5] = livePositions[j * 3 + 2];
            lineCount += 1;
            if (lineCount >= MAX_LINES) break outer;
          }
        }
      }
      const linesGeoPos = linesGeometry.attributes.position as BufferAttribute;
      linesGeoPos.needsUpdate = true;
      linesGeometry.setDrawRange(0, lineCount * 2);
    }

    // Camera parallax — subtle drift toward cursor, never snaps.
    const targetX = mouseX * CAMERA_PARALLAX_RANGE_X;
    const targetY = mouseY * CAMERA_PARALLAX_RANGE_Y;
    state.camera.position.x +=
      (targetX - state.camera.position.x) * CAMERA_LERP;
    state.camera.position.y +=
      (targetY - state.camera.position.y) * CAMERA_LERP;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <points ref={pointsRef} geometry={scene.pointsGeometry}>
        <pointsMaterial
          vertexColors
          size={PARTICLE_SIZE}
          sizeAttenuation
          transparent
          opacity={PARTICLE_OPACITY}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={scene.linesGeometry}>
        <lineBasicMaterial
          color={COLOR_LINE}
          transparent
          opacity={LINE_OPACITY}
          depthWrite={false}
        />
      </lineSegments>
      <Whisper />
    </>
  );
}
