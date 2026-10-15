"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  className?: string;
};

const CYAN = 0x3ad4ff;
const GOLD = 0xd4a84b;

function seeded(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

/** Circuit motherboard texture with cyan traces + amber nodes. */
function createCircuitTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#04060b";
  ctx.fillRect(0, 0, size, size);

  /* Board panels */
  const cell = size / 12;
  ctx.strokeStyle = "rgba(35, 70, 100, 0.55)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 12; i++) {
    const p = i * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.moveTo(0, p);
    ctx.lineTo(size, p);
    ctx.stroke();
  }

  /* Secondary fine grid */
  ctx.strokeStyle = "rgba(40, 90, 130, 0.22)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 48; i++) {
    const p = (i + 0.5) * (size / 48);
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.moveTo(0, p);
    ctx.lineTo(size, p);
    ctx.stroke();
  }

  /* Traces */
  ctx.lineCap = "square";
  for (let n = 0; n < 70; n++) {
    let x = seeded(n * 3.1) * size;
    let y = seeded(n * 7.7) * size;
    const segs = 4 + Math.floor(seeded(n * 2.2) * 6);
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let s = 0; s < segs; s++) {
      const horiz = seeded(n * 11 + s) > 0.5;
      const len = (0.05 + seeded(n * 13 + s * 2) * 0.16) * size;
      const dir = seeded(n + s * 3) > 0.5 ? 1 : -1;
      if (horiz) x += dir * len;
      else y += dir * len;
      ctx.lineTo(x, y);
    }
    const hot = seeded(n * 0.7) > 0.62;
    ctx.strokeStyle = hot
      ? "rgba(58, 212, 255, 0.85)"
      : "rgba(45, 130, 175, 0.45)";
    ctx.lineWidth = hot ? 2.4 : 1.4;
    ctx.stroke();
  }

  /* Signal nodes */
  for (let n = 0; n < 120; n++) {
    const x = seeded(n * 4.4) * size;
    const y = seeded(n * 9.1) * size;
    const r = 1.4 + seeded(n * 1.7) * 3.2;
    const warm = seeded(n * 6.3) > 0.74;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = warm
      ? "rgba(232, 168, 64, 0.95)"
      : "rgba(90, 220, 255, 0.75)";
    ctx.fill();
  }

  /* Chip blocks */
  for (let n = 0; n < 24; n++) {
    const x = seeded(n * 17.2) * size;
    const y = seeded(n * 23.5) * size;
    const w = 10 + seeded(n) * 28;
    const h = 8 + seeded(n + 1) * 18;
    ctx.fillStyle = "rgba(12, 22, 34, 0.95)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(58, 212, 255, 0.4)";
    ctx.lineWidth = 1.25;
    ctx.strokeRect(x + 0.5, y + 0.5, w, h);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function createGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(140, 235, 255, 1)");
  g.addColorStop(0.2, "rgba(50, 200, 255, 0.7)");
  g.addColorStop(0.5, "rgba(20, 110, 170, 0.25)");
  g.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createSkyTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "#010308");
  g.addColorStop(0.5, "#061018");
  g.addColorStop(0.78, "#0a1c2c");
  g.addColorStop(1, "#040810");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 8, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Wide-tooth hex cog — six lobes like the reference pedestal.
 * Explicit polygon in XY for ExtrudeGeometry (no self-intersections).
 */
function createCogShape(outerR: number, teeth = 6): THREE.Shape {
  const shape = new THREE.Shape();
  const valleyR = outerR * 0.62;
  const toothSpan = (Math.PI * 2) / teeth;
  const points: THREE.Vector2[] = [];

  for (let i = 0; i < teeth; i++) {
    const a0 = i * toothSpan - Math.PI / 2;
    /* Valley → outer tooth → valley */
    const corners: [number, number][] = [
      [a0 + toothSpan * 0.08, valleyR],
      [a0 + toothSpan * 0.2, outerR],
      [a0 + toothSpan * 0.8, outerR],
      [a0 + toothSpan * 0.92, valleyR],
    ];
    for (const [ang, r] of corners) {
      points.push(new THREE.Vector2(Math.cos(ang) * r, Math.sin(ang) * r));
    }
  }

  shape.moveTo(points[0]!.x, points[0]!.y);
  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i]!.x, points[i]!.y);
  }
  shape.closePath();
  return shape;
}

function createDeckTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;

  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.48);
  g.addColorStop(0, "#2a3140");
  g.addColorStop(0.55, "#171c26");
  g.addColorStop(1, "#0d1118");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = "rgba(58, 212, 255, 0.28)";
  ctx.lineWidth = 1.5;
  for (let ring = 1; ring <= 5; ring++) {
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.07 * ring, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * size * 0.06, cy + Math.sin(a) * size * 0.06);
    ctx.lineTo(cx + Math.cos(a) * size * 0.4, cy + Math.sin(a) * size * 0.4);
    ctx.stroke();
  }

  for (let n = 0; n < 36; n++) {
    const a0 = seeded(n * 3) * Math.PI * 2;
    const r0 = size * (0.1 + seeded(n) * 0.3);
    const len = size * (0.05 + seeded(n + 2) * 0.1);
    const x0 = cx + Math.cos(a0) * r0;
    const y0 = cy + Math.sin(a0) * r0;
    const a1 = a0 + (seeded(n + 4) - 0.5) * 1.4;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + Math.cos(a1) * len, y0 + Math.sin(a1) * len);
    ctx.strokeStyle =
      seeded(n) > 0.65 ? "rgba(212, 168, 75, 0.55)" : "rgba(58, 212, 255, 0.35)";
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Testimonials background — floating cog platform over a neon circuit cityscape.
 * Canvas theme only. Decorative; does not receive pointer events.
 */
export function CanvasTestimonialPlatform({ className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let raf = 0;
    let webglOk = true;
    let visible = true;
    let mobile = false;

    const scene = new THREE.Scene();
    /* Deep fog — only the near cyan core punches through */
    scene.fog = new THREE.FogExp2(0x04060a, 0.055);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 140);
    const camBase = new THREE.Vector3(0, 6.4, 8.6);
    const lookAt = new THREE.Vector3(1.2, 0.2, -1.2);
    camera.position.copy(camBase);
    camera.lookAt(lookAt);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      webglOk = false;
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.72;
    wrap.appendChild(renderer.domElement);
    const canvasEl = renderer.domElement;
    canvasEl.className = "canvas-testimonial-platform__canvas";
    canvasEl.setAttribute("aria-hidden", "true");
    canvasEl.style.pointerEvents = "none";

    const root = new THREE.Group();
    scene.add(root);

    const textures: THREE.Texture[] = [];
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const track = <T extends THREE.Material>(m: T) => (materials.push(m), m);
    const trackG = <T extends THREE.BufferGeometry>(g: T) => (geometries.push(g), g);
    const trackT = <T extends THREE.Texture>(t: T) => (textures.push(t), t);

    /* Sky dome */
    scene.add(
      new THREE.Mesh(
        trackG(new THREE.SphereGeometry(70, 24, 16)),
        track(
          new THREE.MeshBasicMaterial({
            map: trackT(createSkyTexture()),
            side: THREE.BackSide,
            depthWrite: false,
          }),
        ),
      ),
    );

    /* Circuit floor — barely readable, overshadowed */
    const circuitTex = trackT(createCircuitTexture(1024));
    circuitTex.repeat.set(5, 5);
    const floorMat = track(
      new THREE.MeshStandardMaterial({
        map: circuitTex,
        color: 0x4a5560,
        roughness: 0.92,
        metalness: 0.25,
        emissive: 0x0a2030,
        emissiveMap: circuitTex,
        emissiveIntensity: 0.22,
      }),
    );
    const floor = new THREE.Mesh(trackG(new THREE.PlaneGeometry(56, 56)), floorMat);
    floor.rotation.x = -Math.PI / 2;
    root.add(floor);

    /* Horizon mist — swallows the far field */
    const mist = new THREE.Mesh(
      trackG(new THREE.PlaneGeometry(60, 14)),
      track(
        new THREE.MeshBasicMaterial({
          color: 0x04060a,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
        }),
      ),
    );
    mist.position.set(2, 2.2, -14);
    root.add(mist);

    /* Distant skyline — silhouette only */
    const city = new THREE.Group();
    city.position.set(2.5, 0, -12.5);
    root.add(city);
    const buildingMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x05080e,
        roughness: 0.85,
        metalness: 0.4,
        emissive: 0x061018,
        emissiveIntensity: 0.12,
      }),
    );
    const windowMat = track(
      new THREE.MeshBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.08,
      }),
    );
    const cityGeoms: THREE.BufferGeometry[] = [];
    const clearCity = () => {
      while (city.children.length) city.remove(city.children[0]!);
      for (const g of cityGeoms) g.dispose();
      cityGeoms.length = 0;
    };
    const buildCity = (count: number) => {
      clearCity();
      for (let i = 0; i < count; i++) {
        const w = 0.3 + seeded(i * 2.1) * 0.85;
        const d = 0.3 + seeded(i * 3.3) * 0.8;
        const h = 1.4 + seeded(i * 5.7) * 6.2;
        const box = new THREE.BoxGeometry(w, h, d);
        cityGeoms.push(box);
        const mesh = new THREE.Mesh(box, buildingMat);
        const x = (seeded(i * 1.1) - 0.5) * 24;
        const z = (seeded(i * 2.7) - 0.4) * 9;
        mesh.position.set(x, h * 0.5, z);
        city.add(mesh);
        if (seeded(i * 8) > 0.35) {
          const plane = new THREE.PlaneGeometry(w * 0.5, h * 0.65);
          cityGeoms.push(plane);
          const win = new THREE.Mesh(plane, windowMat);
          win.position.set(x, h * 0.45, z + d * 0.52);
          city.add(win);
        }
      }
    };

    /* —— Floating cog platform —— */
    const platform = new THREE.Group();
    /* Slight pitch so the gold deck reads like the reference three-quarter shot */
    platform.rotation.x = 0.32;
    platform.rotation.z = -0.08;
    root.add(platform);

    const depth = 0.58;
    const cogR = 2.15;
    const extrude = new THREE.ExtrudeGeometry(createCogShape(cogR, 6), {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.03,
      bevelSegments: 1,
    });
    extrude.rotateX(-Math.PI / 2);
    extrude.computeVertexNormals();
    trackG(extrude);

    /* Body as near-black silhouette — only cyan rim light defines it */
    const bodyMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x05070c,
        roughness: 0.92,
        metalness: 0.35,
        flatShading: false,
      }),
    );
    const body = new THREE.Mesh(extrude, bodyMat);
    platform.add(body);

    const sideShell = new THREE.Mesh(
      trackG(new THREE.CylinderGeometry(cogR * 0.78, cogR * 0.78, depth * 0.92, 48, 1, true)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x080a10,
          roughness: 0.9,
          metalness: 0.3,
          side: THREE.BackSide,
        }),
      ),
    );
    sideShell.position.y = depth * 0.5;
    platform.add(sideShell);

    const deckTex = trackT(createDeckTexture());
    const deck = new THREE.Mesh(
      trackG(new THREE.CircleGeometry(cogR * 0.72, 64)),
      track(
        new THREE.MeshStandardMaterial({
          map: deckTex,
          color: 0x1a1e26,
          roughness: 0.75,
          metalness: 0.4,
          emissive: 0x061018,
          emissiveIntensity: 0.08,
        }),
      ),
    );
    deck.rotation.x = -Math.PI / 2;
    deck.position.y = depth + 0.01;
    platform.add(deck);

    /* Gold barely whispers — overshadowed with the rest */
    const rimMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x6a5520,
        roughness: 0.55,
        metalness: 0.7,
        emissive: GOLD,
        emissiveIntensity: 0.06,
      }),
    );
    const rim = new THREE.Mesh(
      trackG(new THREE.TorusGeometry(cogR * 0.7, 0.038, 12, 64)),
      rimMat,
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = depth + 0.02;
    platform.add(rim);

    const rimInner = new THREE.Mesh(
      trackG(new THREE.TorusGeometry(cogR * 0.44, 0.014, 10, 48)),
      rimMat,
    );
    rimInner.rotation.x = Math.PI / 2;
    rimInner.position.y = depth + 0.022;
    platform.add(rimInner);

    /*
     * Hero: tight cyan core only.
     * Keep spill off the cog teeth so the body stays a dark silhouette.
     */
    const underMat = track(
      new THREE.MeshBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    const underRing = new THREE.Mesh(
      trackG(new THREE.RingGeometry(cogR * 0.2, cogR * 0.72, 64)),
      underMat,
    );
    underRing.rotation.x = -Math.PI / 2;
    underRing.position.y = 0.01;
    platform.add(underRing);

    const lip = new THREE.Mesh(
      trackG(new THREE.CylinderGeometry(cogR * 0.7, cogR * 0.55, 0.22, 48, 1, true)),
      track(
        new THREE.MeshBasicMaterial({
          color: CYAN,
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    lip.position.y = 0.1;
    platform.add(lip);

    const glowTex = trackT(createGlowTexture());
    const glowMat = track(
      new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    /* Soft bloom pools — the shiny blue the early preview had */
    const glowNear = new THREE.Mesh(trackG(new THREE.PlaneGeometry(6.2, 6.2)), glowMat);
    glowNear.rotation.x = -Math.PI / 2;
    glowNear.position.y = 0.04;
    root.add(glowNear);

    const glowMid = new THREE.Mesh(
      trackG(new THREE.PlaneGeometry(3.6, 3.6)),
      track(
        new THREE.MeshBasicMaterial({
          map: glowTex,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    glowMid.rotation.x = -Math.PI / 2;
    glowMid.position.y = 0.055;
    root.add(glowMid);

    const glowFar = new THREE.Mesh(
      trackG(new THREE.PlaneGeometry(11, 11)),
      track(
        new THREE.MeshBasicMaterial({
          map: glowTex,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    glowFar.rotation.x = -Math.PI / 2;
    glowFar.position.y = 0.02;
    root.add(glowFar);

    /* Lights — cyan core only; keep mesh dark */
    scene.add(new THREE.AmbientLight(0x0a1018, 0.1));
    const underLight = new THREE.PointLight(CYAN, 6.5, 7.5, 1.4);
    underLight.position.set(0, 0.15, 0);
    platform.add(underLight);

    /* Sparse faint nodes — atmosphere only */
    const nodeCount = 36;
    const nodePos = new Float32Array(nodeCount * 3);
    const nodePhase = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      nodePos[i * 3] = (seeded(i * 1.3) - 0.5) * 28;
      nodePos[i * 3 + 1] = 0.06;
      nodePos[i * 3 + 2] = (seeded(i * 3.7) - 0.5) * 28;
      nodePhase[i] = seeded(i * 4.4) * Math.PI * 2;
    }
    const nodeGeom = trackG(new THREE.BufferGeometry());
    nodeGeom.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    root.add(
      new THREE.Points(
        nodeGeom,
        track(
          new THREE.PointsMaterial({
            color: 0x3ad4ff,
            size: 0.045,
            transparent: true,
            opacity: 0.22,
            depthWrite: false,
            sizeAttenuation: true,
          }),
        ),
      ),
    );

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const placePlatform = () => {
      /* Centered under the quote zone — glow is the focal point */
      const px = mobile ? 0.15 : 0.55;
      const pz = mobile ? 0.35 : 0.2;
      const py = mobile ? 1.35 : 1.55;
      platform.position.set(px, py, pz);
      glowNear.position.set(px, 0.04, pz);
      glowMid.position.set(px, 0.05, pz);
      glowFar.position.set(px, 0.02, pz);
    };

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      const wasMobile = mobile;
      mobile = w < 768;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h > 1.2 ? 36 : 42;
      camera.updateProjectionMatrix();

      if (mobile) {
        camBase.set(0.1, 7.4, 9.0);
        lookAt.set(0.15, 0.85, -0.3);
      } else {
        camBase.set(-0.35, 6.4, 7.8);
        lookAt.set(0.55, 0.9, -0.15);
      }
      camera.position.copy(camBase);
      camera.lookAt(lookAt);
      placePlatform();

      if (wasMobile !== mobile || city.children.length === 0) {
        buildCity(mobile ? 14 : 28);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) {
        pointer.tx = 0;
        pointer.ty = 0;
        return;
      }
      const rect = wrap.getBoundingClientRect();
      pointer.tx = Math.max(
        -1,
        Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1),
      );
      pointer.ty = Math.max(
        -1,
        Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1),
      );
    };

    const renderFrame = (now: number) => {
      const t = now * 0.001;
      /* Slow, quiet motion — glow pulse is the main life */
      const bob = reduced ? 0 : Math.sin(t * 0.55) * 0.045;
      const spin = reduced ? 0.2 : t * 0.028;

      placePlatform();
      platform.position.y += bob;
      platform.rotation.y = spin;
      platform.rotation.x = 0.28;
      platform.rotation.z = -0.06;

      const pulse = 0.5 + 0.5 * Math.sin(t * 1.15);
      underMat.opacity = 0.78 + pulse * 0.14;
      underLight.intensity = 5.8 + pulse * 1.2;
      glowMat.opacity = 0.9 + pulse * 0.1;

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      camera.position.set(
        camBase.x + pointer.x * 0.85,
        camBase.y - pointer.y * 0.55,
        camBase.z,
      );
      camera.lookAt(
        lookAt.x + pointer.x * 0.22,
        lookAt.y - pointer.y * 0.14,
        lookAt.z,
      );

      root.rotation.y = pointer.x * 0.08;
      root.rotation.x = -pointer.y * 0.045;

      const pos = nodeGeom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < nodeCount; i++) {
        pos.setY(i, 0.05 + Math.sin(t * 0.9 + nodePhase[i]) * 0.02);
      }
      pos.needsUpdate = true;

      circuitTex.offset.x = (t * 0.004) % 1;
      circuitTex.offset.y = (t * 0.0025) % 1;

      renderer.render(scene, camera);
    };

    const tick = (now: number) => {
      if (disposed) return;
      if (visible) renderFrame(now);
      if (!reduced) raf = requestAnimationFrame(tick);
    };

    resize();
    renderFrame(performance.now());

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const section = wrap.closest(".canvas-testimonials") ?? wrap;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible && !reduced) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.02 },
    );
    io.observe(section);

    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      clearCity();
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
      for (const t of textures) t.dispose();
      if (webglOk) {
        renderer.dispose();
        if (canvasEl.parentElement === wrap) wrap.removeChild(canvasEl);
      }
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`canvas-testimonial-platform ${className}`.trim()}
      aria-hidden
    />
  );
}
