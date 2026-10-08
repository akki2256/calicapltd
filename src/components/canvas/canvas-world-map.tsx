"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { sampleWorldMapParticles } from "@/lib/world-map-particles";

type Props = {
  className?: string;
};

/** Slow continuous Y spin — ~90s per turn */
const ROTATION_SPEED = 0.07;

/**
 * Match CanvasNodeMesh dots: tiny hard white disc (≈1.15px look).
 * Same Shape.xyz language as the impact-metrics background.
 */
function createNodeDotTexture(): THREE.CanvasTexture {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = false;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Geographic particle globe styled like CanvasNodeMesh (impact metrics):
 * tiny sharp white dots with varied opacity — no interior link lines.
 */
export function CanvasWorldMap({ className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let mobile = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    const camBase = new THREE.Vector3(0, 0, 0.55);
    const look = new THREE.Vector3(0, 0, 0);
    camera.position.copy(camBase);
    camera.lookAt(look);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.className = "canvas-world-map__canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.pointerEvents = "none";

    const globe = new THREE.Group();
    globe.rotation.y = -1.35;
    scene.add(globe);

    const dotMap = createNodeDotTexture();
    let points: THREE.Points | null = null;
    let geom: THREE.BufferGeometry | null = null;
    let mat: THREE.PointsMaterial | null = null;
    let bases: Float32Array = new Float32Array(0);
    let phases: Float32Array = new Float32Array(0);
    let amps: Float32Array = new Float32Array(0);
    /** Per-particle base opacity (CanvasNodeMesh: 0.35–1.0) */
    let nodeOpacity: Float32Array = new Float32Array(0);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const worldPos = new THREE.Vector3();
    let last = performance.now();
    let spinY = -1.35;
    let yawBias = 0;
    let pitchBias = 0;
    let builtForMobile: boolean | null = null;
    let buildGen = 0;

    const disposeLayer = () => {
      if (points) globe.remove(points);
      geom?.dispose();
      mat?.dispose();
      points = null;
      geom = null;
      mat = null;
    };

    const mountParticles = async (isMobile: boolean) => {
      const gen = ++buildGen;
      /* Slightly sparser than before — NodeMesh feel is airy, not dense fill */
      const data = await sampleWorldMapParticles({
        targetCount: isMobile ? 3200 : 5600,
        radius: 1,
        antarcticaDensity: 0.24,
      });
      if (disposed || gen !== buildGen) return;

      disposeLayer();
      bases = data.bases;
      phases = data.phases;
      amps = data.amps;

      const n = data.count;
      nodeOpacity = new Float32Array(n);
      const colors = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        /* Same opacity range as CanvasNodeMesh spawn() */
        const op = 0.35 + data.phases[i] * 0.65;
        nodeOpacity[i] = op;
        colors[i * 3] = op;
        colors[i * 3 + 1] = op;
        colors[i * 3 + 2] = op;
      }

      geom = new THREE.BufferGeometry();
      geom.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(new Float32Array(data.positions), 3),
      );
      geom.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      /* Tiny points ≈ NodeMesh nodeRadius 1.15 at this camera distance */
      mat = new THREE.PointsMaterial({
        size: isMobile ? 0.012 : 0.0085,
        map: dotMap,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.NormalBlending,
        vertexColors: true,
        sizeAttenuation: true,
        opacity: 0.9,
        alphaTest: 0.15,
      });

      points = new THREE.Points(geom, mat);
      globe.add(points);

      builtForMobile = isMobile;
    };

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h > 1.4 ? 30 : 34;
      camera.updateProjectionMatrix();
      mobile = w < 768;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (window.matchMedia("(pointer: fine)").matches === false) {
        pointer.tx = 0;
        pointer.ty = 0;
        return;
      }
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));
    };

    const updateParticles = (t: number, animate: boolean) => {
      if (!points || !geom) return;
      const pos = geom.getAttribute("position") as THREE.BufferAttribute;
      const cols = geom.getAttribute("color") as THREE.BufferAttribute;
      const n = pos.count;
      const camZ = camera.position.z;

      for (let i = 0; i < n; i++) {
        const ix = i * 3;
        let x = bases[ix];
        let y = bases[ix + 1];
        let z = bases[ix + 2];

        if (animate) {
          /* Extremely subtle drift — NodeMesh moves slowly; keep map readable */
          const phase = phases[i] * Math.PI * 2;
          const amp = amps[i] * 0.28;
          x += Math.sin(t * 0.35 + phase) * amp;
          y += Math.cos(t * 0.3 + phase * 1.1) * amp * 0.65;
          z += Math.sin(t * 0.28 + phase * 0.8) * amp;
        }

        pos.setXYZ(i, x, y, z);

        worldPos.set(x, y, z);
        points.localToWorld(worldPos);

        const dist = camera.position.distanceTo(worldPos);
        const depthT = 1 - Math.min(1, Math.max(0, (dist - (camZ - 0.7)) / 2.0));
        const facing = Math.max(0, (worldPos.z + 0.3) / 1.2);
        const fade = 0.2 + depthT * 0.3 + facing * 0.55;
        const b = Math.min(1, nodeOpacity[i] * fade);
        cols.setXYZ(i, b, b, b);
      }

      pos.needsUpdate = true;
      cols.needsUpdate = true;
    };

    const renderOnce = (animate: boolean, now: number) => {
      globe.updateMatrixWorld(true);
      updateParticles(animate ? now * 0.001 : 0, animate);
      renderer.render(scene, camera);
    };

    const tick = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (visible && !reduced) {
        spinY -= ROTATION_SPEED * dt;

        pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3.2);
        pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3.2);

        const targetYaw = pointer.x * 0.14;
        const targetPitch = pointer.y * 0.06;
        yawBias += (targetYaw - yawBias) * Math.min(1, dt * 3.5);
        pitchBias += (targetPitch - pitchBias) * Math.min(1, dt * 3.5);

        camera.position.set(
          camBase.x + pointer.x * 0.14,
          camBase.y - pointer.y * 0.1,
          camBase.z,
        );
        look.set(pointer.x * 0.03, -pointer.y * 0.02, 0);
        camera.lookAt(look);

        globe.rotation.set(pitchBias * 0.35, spinY + yawBias, -yawBias * 0.08);
        renderOnce(true, now);
      }

      raf = requestAnimationFrame(tick);
    };

    const syncBuild = () => {
      resize();
      if (builtForMobile === mobile) return;
      void mountParticles(mobile).then(() => {
        if (disposed) return;
        if (reduced) renderOnce(false, 0);
      });
    };

    syncBuild();
    const ro = new ResizeObserver(syncBuild);
    ro.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const aboutEl = document.querySelector(".canvas-about");
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible && reduced && points) renderOnce(false, 0);
      },
      { threshold: 0.01 },
    );
    if (aboutEl) io.observe(aboutEl);
    else visible = true;

    if (!reduced) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      disposeLayer();
      dotMap.dispose();
      renderer.dispose();
      if (canvas.parentElement === wrap) wrap.removeChild(canvas);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`canvas-world-map ${className}`.trim()}
      aria-hidden
    />
  );
}
