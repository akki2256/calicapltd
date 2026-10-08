"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  className?: string;
};

const WORDS = ["ENVISION", "CREATE", "TRANSFORM"] as const;
/** Slow elegant Y-spin — ~40s per turn */
const ROTATION_SPEED = 0.155;

type FaceDef = {
  apex: THREE.Vector3;
  left: THREE.Vector3;
  right: THREE.Vector3;
  word: string;
  normal: THREE.Vector3;
};

function outwardNormal(
  a: THREE.Vector3,
  b: THREE.Vector3,
  c: THREE.Vector3,
  centroid: THREE.Vector3,
): THREE.Vector3 {
  const n = new THREE.Vector3()
    .subVectors(b, a)
    .cross(new THREE.Vector3().subVectors(c, a))
    .normalize();
  const mid = new THREE.Vector3().addVectors(a, b).add(c).multiplyScalar(1 / 3);
  if (n.dot(new THREE.Vector3().subVectors(mid, centroid)) < 0) n.negate();
  return n;
}

/** Soft circular sprite — sharp enough to read as discrete points like the reference. */
function createDotTexture(): THREE.CanvasTexture {
  const size = 64;
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
  tex.needsUpdate = true;
  return tex;
}

function pushPoint(
  positions: number[],
  bases: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  kinds: number[],
  faces: number[],
  p: THREE.Vector3,
  kind: number,
  face: number,
  id: number,
) {
  positions.push(p.x, p.y, p.z);
  bases.push(p.x, p.y, p.z);
  colors.push(1, 1, 1);
  phases.push((Math.sin(id * 12.9898) * 43758.5453) % 1);
  amps.push(kind === 2 ? 0.012 : kind === 1 ? 0.002 : 0.003);
  kinds.push(kind);
  faces.push(face);
}

/**
 * Structured lattice points on a triangular face — rows parallel to the base,
 * columns converging to the apex (sphere-reference equivalent of lat/long grid).
 */
function addFaceLattice(
  face: FaceDef,
  faceIndex: number,
  rows: number,
  positions: number[],
  bases: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  kinds: number[],
  faces: number[],
  idRef: { n: number },
) {
  const { apex, left, right } = face;
  const tmpL = new THREE.Vector3();
  const tmpR = new THREE.Vector3();
  const p = new THREE.Vector3();

  /* Skip row 0 — removes the tiny tip line at the apex */
  for (let row = 1; row <= rows; row++) {
    const t = row / rows;
    tmpL.lerpVectors(apex, left, t);
    tmpR.lerpVectors(apex, right, t);
    const cols = Math.max(1, Math.round(2 + t * (rows + 2)));
    for (let col = 0; col <= cols; col++) {
      const u = col / cols;
      p.lerpVectors(tmpL, tmpR, u);
      pushPoint(
        positions,
        bases,
        colors,
        phases,
        amps,
        kinds,
        faces,
        p,
        0,
        faceIndex,
        idRef.n++,
      );
    }
  }

  const meridians = 9;
  for (let m = 0; m <= meridians; m++) {
    const u = m / meridians;
    const basePt = new THREE.Vector3().lerpVectors(left, right, u);
    for (let row = 1; row <= rows; row++) {
      const t = row / rows;
      p.lerpVectors(apex, basePt, t);
      pushPoint(
        positions,
        bases,
        colors,
        phases,
        amps,
        kinds,
        faces,
        p,
        0,
        faceIndex,
        idRef.n++,
      );
    }
  }
}

function addEdge(
  a: THREE.Vector3,
  b: THREE.Vector3,
  count: number,
  positions: number[],
  bases: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  kinds: number[],
  faces: number[],
  idRef: { n: number },
) {
  const p = new THREE.Vector3();
  for (let i = 0; i <= count; i++) {
    p.lerpVectors(a, b, i / count);
    pushPoint(
      positions,
      bases,
      colors,
      phases,
      amps,
      kinds,
      faces,
      p,
      0,
      -1,
      idRef.n++,
    );
  }
}

/** Horizontal triangular cross-sections — very sparse volumetric cue. */
function addAltitudeRings(
  apex: THREE.Vector3,
  corners: THREE.Vector3[],
  rings: number,
  positions: number[],
  bases: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  kinds: number[],
  faces: number[],
  idRef: { n: number },
) {
  const p = new THREE.Vector3();
  const c0 = new THREE.Vector3();
  const c1 = new THREE.Vector3();
  const n = corners.length;
  /* Start at r=2 so the smallest tip ring is omitted */
  for (let r = 2; r <= rings; r++) {
    const t = r / (rings + 0.35);
    const perSide = Math.max(10, Math.round(8 + t * 14));
    for (let s = 0; s < n; s++) {
      c0.lerpVectors(apex, corners[s], t);
      c1.lerpVectors(apex, corners[(s + 1) % n], t);
      for (let i = 0; i < perSide; i++) {
        /* Keep only every other sample so rings stay delicate */
        if (i % 2 === 1) continue;
        p.lerpVectors(c0, c1, i / perSide);
        pushPoint(
          positions,
          bases,
          colors,
          phases,
          amps,
          kinds,
          faces,
          p,
          0,
          -1,
          idRef.n++,
        );
      }
    }
  }
}

/** Particle-sampled word on a face — no dark plate; readability via front-face timing. */
function sampleTextOnFace(
  face: FaceDef,
  faceIndex: number,
  word: string,
  positions: number[],
  bases: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  kinds: number[],
  faces: number[],
  idRef: { n: number },
) {
  const canvas = document.createElement("canvas");
  const tw = 720;
  const th = 180;
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  ctx.clearRect(0, 0, tw, th);
  ctx.fillStyle = "#fff";
  ctx.font = "700 78px Syne, Outfit, ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(word.split("").join(" "), tw / 2, th / 2);

  const { data } = ctx.getImageData(0, 0, tw, th);
  const p = new THREE.Vector3();
  const basePt = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);
  const viewRight = new THREE.Vector3()
    .crossVectors(worldUp, face.normal)
    .normalize();
  const across = new THREE.Vector3().subVectors(face.right, face.left);
  const textLeft = across.dot(viewRight) >= 0 ? face.left : face.right;
  const textRight = across.dot(viewRight) >= 0 ? face.right : face.left;
  const step = 2;

  for (let py = 0; py < th; py += step) {
    for (let px = 0; px < tw; px += step) {
      if (data[(py * tw + px) * 4 + 3] < 100) continue;
      const u = px / (tw - 1);
      const vv = py / (th - 1);
      const along = 0.12 + u * 0.76;
      const height = 0.28 + (1 - vv) * 0.38;
      basePt.lerpVectors(textLeft, textRight, along);
      p.lerpVectors(basePt, face.apex, height);
      p.addScaledVector(face.normal, 0.04);
      pushPoint(
        positions,
        bases,
        colors,
        phases,
        amps,
        kinds,
        faces,
        p,
        1,
        faceIndex,
        idRef.n++,
      );
    }
  }
}

function addAmbient(
  scale: number,
  count: number,
  positions: number[],
  bases: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  kinds: number[],
  faces: number[],
  idRef: { n: number },
) {
  const p = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const theta = ((Math.sin(i * 19.1) * 43758.5) % 1) * Math.PI * 2;
    const y = ((Math.sin(i * 7.3) * 43758.5) % 1) * 2 - 1;
    const rad = scale * (0.95 + ((Math.sin(i * 3.7) * 43758.5) % 1) * 0.35);
    const r = Math.sqrt(Math.max(0, 1 - y * y)) * rad * 0.55;
    p.set(Math.cos(theta) * r, y * scale * 0.55, Math.sin(theta) * r);
    pushPoint(
      positions,
      bases,
      colors,
      phases,
      amps,
      kinds,
      faces,
      p,
      2,
      -1,
      idRef.n++,
    );
  }
}

/** Triangular pyramid (tetrahedron) — 3 side faces + triangular base. */
function buildPyramidGeometry(scale: number) {
  const h = scale * 1.15;
  const r = scale * 0.78;
  const yApex = h * 0.48;
  const yBase = -h * 0.42;

  const apex = new THREE.Vector3(0, yApex, 0);
  /* Equilateral triangular base in XZ */
  const corners = [
    new THREE.Vector3(r, yBase, 0),
    new THREE.Vector3(-r * 0.5, yBase, (r * Math.sqrt(3)) / 2),
    new THREE.Vector3(-r * 0.5, yBase, (-r * Math.sqrt(3)) / 2),
  ];

  const centroid = new THREE.Vector3(0, (yApex + yBase) * 0.5, 0);

  const faceDefs: FaceDef[] = corners.map((_, i) => {
    const left = corners[i];
    const right = corners[(i + 1) % 3];
    return {
      apex,
      left,
      right,
      word: WORDS[i],
      normal: outwardNormal(apex, left, right, centroid),
    };
  });

  const positions: number[] = [];
  const bases: number[] = [];
  const colors: number[] = [];
  const phases: number[] = [];
  const amps: number[] = [];
  const kinds: number[] = [];
  const faces: number[] = [];
  const idRef = { n: 0 };

  /* Dense silhouette edges */
  for (const c of corners) {
    addEdge(
      apex,
      c,
      64,
      positions,
      bases,
      colors,
      phases,
      amps,
      kinds,
      faces,
      idRef,
    );
  }
  for (let i = 0; i < 3; i++) {
    addEdge(
      corners[i],
      corners[(i + 1) % 3],
      48,
      positions,
      bases,
      colors,
      phases,
      amps,
      kinds,
      faces,
      idRef,
    );
  }

  /* Structured face lattices — the reference look */
  faceDefs.forEach((face, fi) => {
    addFaceLattice(
      face,
      fi,
      32,
      positions,
      bases,
      colors,
      phases,
      amps,
      kinds,
      faces,
      idRef,
    );
  });

  /* Sparse volumetric accent — triangular altitude rings */
  addAltitudeRings(
    apex,
    corners,
    4,
    positions,
    bases,
    colors,
    phases,
    amps,
    kinds,
    faces,
    idRef,
  );

  addAmbient(
    scale,
    36,
    positions,
    bases,
    colors,
    phases,
    amps,
    kinds,
    faces,
    idRef,
  );

  return {
    positions,
    bases,
    colors,
    phases,
    amps,
    kinds,
    faces,
    faceDefs,
    count: positions.length / 3,
  };
}

/** Optional face words — omitted on narrow viewports. */
function addFaceWords(
  faceDefs: FaceDef[],
  positions: number[],
  bases: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  kinds: number[],
  faces: number[],
  idRef: { n: number },
) {
  faceDefs.forEach((face, fi) => {
    sampleTextOnFace(
      face,
      fi,
      face.word,
      positions,
      bases,
      colors,
      phases,
      amps,
      kinds,
      faces,
      idRef,
    );
  });
}

/**
 * Premium volumetric particle pyramid for Canvas About.
 * Three.js point lattice — structured grids inspired by the reference sphere.
 */
export function CanvasParticlePyramid({ className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    /* Locked mesh size — stage CSS can grow without enlarging the tetrahedron */
    let scale = 1.9;
    let wordsEnabled = true;

    const scene = new THREE.Scene();
    /* Slightly wider FOV = more framing room at the same camera distance */
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 0.08, 5.35);
    camera.lookAt(0, 0.12, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.className = "canvas-particle-pyramid__canvas";
    canvas.setAttribute("aria-hidden", "true");

    const pyramid = new THREE.Group();
    /* Center in the taller stage so base + particle sprites clear the bottom */
    pyramid.position.y = 0.22;
    scene.add(pyramid);

    const dotMap = createDotTexture();
    let structurePoints: THREE.Points | null = null;
    let textPoints: THREE.Points | null = null;
    let structureGeom: THREE.BufferGeometry | null = null;
    let textGeom: THREE.BufferGeometry | null = null;
    let structureMat: THREE.PointsMaterial | null = null;
    let textMat: THREE.PointsMaterial | null = null;
    let bases = new Float32Array();
    let phases = new Float32Array();
    let amps = new Float32Array();
    let kinds = new Float32Array();
    let faceIdx = new Int8Array();
    let structureIndex: number[] = [];
    let textIndex: number[] = [];
    let faceDefs: FaceDef[] = [];
    const faceBright = [0.55, 0.55, 0.55];
    /** Smoothed reveal 0→1 per face — drives particle-word timing */
    const faceReveal = [0, 0, 0];

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const camBase = new THREE.Vector3(0, 0.08, 5.35);
    const look = new THREE.Vector3(0, 0.12, 0);
    const worldPos = new THREE.Vector3();
    const faceN = new THREE.Vector3();
    let last = performance.now();
    let yawBias = 0;
    let pitchBias = 0;
    let spinY = -0.55;

    const disposeLayer = (
      pts: THREE.Points | null,
      geom: THREE.BufferGeometry | null,
      mat: THREE.PointsMaterial | null,
    ) => {
      if (pts) pyramid.remove(pts);
      geom?.dispose();
      mat?.dispose();
    };

    const makeLayer = (
      indices: number[],
      built: ReturnType<typeof buildPyramidGeometry>,
      size: number,
      order: number,
      blending: THREE.Blending,
    ) => {
      const n = indices.length;
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const src = indices[i] * 3;
        pos[i * 3] = built.positions[src];
        pos[i * 3 + 1] = built.positions[src + 1];
        pos[i * 3 + 2] = built.positions[src + 2];
        col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = 1;
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      geom.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
      const mat = new THREE.PointsMaterial({
        size,
        map: dotMap,
        transparent: true,
        depthWrite: false,
        blending,
        vertexColors: true,
        sizeAttenuation: true,
        opacity: 1,
      });
      const pts = new THREE.Points(geom, mat);
      pts.renderOrder = order;
      pyramid.add(pts);
      return { geom, mat, pts };
    };

    const rebuild = () => {
      disposeLayer(structurePoints, structureGeom, structureMat);
      disposeLayer(textPoints, textGeom, textMat);
      structurePoints = textPoints = null;
      structureGeom = textGeom = null;
      structureMat = textMat = null;

      const built = buildPyramidGeometry(scale);
      if (wordsEnabled) {
        const idRef = { n: built.count };
        addFaceWords(
          built.faceDefs,
          built.positions,
          built.bases,
          built.colors,
          built.phases,
          built.amps,
          built.kinds,
          built.faces,
          idRef,
        );
      }
      faceDefs = built.faceDefs;
      bases = new Float32Array(built.bases);
      phases = new Float32Array(built.phases);
      amps = new Float32Array(built.amps);
      kinds = new Float32Array(built.kinds);
      faceIdx = new Int8Array(built.faces);
      const total = built.positions.length / 3;

      structureIndex = [];
      textIndex = [];
      for (let i = 0; i < total; i++) {
        if (kinds[i] === 1) textIndex.push(i);
        else structureIndex.push(i);
      }

      const structureSize = Math.min(0.032, Math.max(0.024, scale * 0.035));
      const sLayer = makeLayer(
        structureIndex,
        built,
        structureSize,
        0,
        THREE.NormalBlending,
      );
      structureGeom = sLayer.geom;
      structureMat = sLayer.mat;
      structurePoints = sLayer.pts;
      /* Additive text: faded (near-black) points add nothing — lattice stays visible */
      const tLayer = makeLayer(
        textIndex,
        built,
        structureSize * 1.65,
        2,
        THREE.AdditiveBlending,
      );
      textGeom = tLayer.geom;
      textMat = tLayer.mat;
      textPoints = tLayer.pts;
    };

    const wordsMq = window.matchMedia("(min-width: 768px)");
    const syncWords = () => {
      const next = wordsMq.matches;
      if (next === wordsEnabled) return false;
      wordsEnabled = next;
      return true;
    };
    wordsEnabled = wordsMq.matches;
    let hasBuilt = false;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      /* Fixed mesh size — stage CSS grows for layout margin; scale must not follow width */
      scale = 1.9;
      if (!hasBuilt) {
        rebuild();
        hasBuilt = true;
      }
    };

    const onWordsMq = () => {
      if (syncWords()) rebuild();
    };

    const setPointerFromEvent = (e: PointerEvent, inside: boolean) => {
      if (!inside) {
        pointer.active = false;
        pointer.tx = 0;
        pointer.ty = 0;
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      pointer.active = true;
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setPointerFromEvent(e, inside);
    };

    const onPointerEnter = (e: PointerEvent) => setPointerFromEvent(e, true);
    const onPointerLeave = (e: PointerEvent) => setPointerFromEvent(e, false);

    const updateLayer = (
      pts: THREE.Points | null,
      geom: THREE.BufferGeometry | null,
      indices: number[],
      t: number,
      animate: boolean,
      isText: boolean,
    ) => {
      if (!pts || !geom) return;
      const pos = geom.getAttribute("position") as THREE.BufferAttribute;
      const cols = geom.getAttribute("color") as THREE.BufferAttribute;

      for (let i = 0; i < indices.length; i++) {
        const gi = indices[i];
        const ix = gi * 3;
        let x = bases[ix];
        let y = bases[ix + 1];
        let z = bases[ix + 2];
        if (animate) {
          const phase = phases[gi] * Math.PI * 2;
          const amp = amps[gi] * scale * (isText ? 0.02 : 0.04);
          x += Math.sin(t * 0.55 + phase) * amp;
          y += Math.cos(t * 0.48 + phase * 1.2) * amp * 0.7;
          z += Math.sin(t * 0.42 + phase * 0.7) * amp;
        }
        pos.setXYZ(i, x, y, z);

        worldPos.set(x, y, z);
        pts.localToWorld(worldPos);
        const dist = camera.position.distanceTo(worldPos);
        const depthT = 1 - Math.min(1, Math.max(0, (dist - 3.4) / 4.6));
        const kind = kinds[gi];
        const fi = faceIdx[gi];

        let brightness = 0.58 + depthT * 0.38;

        if (isText && fi >= 0) {
          /* Timing: word resolves on front face; fully off otherwise so lattice returns */
          const reveal = faceReveal[fi];
          if (reveal < 0.04) {
            /* Park off-stage — no black sprites punching holes in the structure */
            pos.setXYZ(i, 0, -50, 0);
            cols.setXYZ(i, 0, 0, 0);
            continue;
          }
          brightness = (0.65 + depthT * 0.35) * reveal;
        } else if (fi >= 0) {
          brightness *= 0.75 + faceBright[fi] * 0.35;
        } else if (kind === 2) {
          brightness *= 0.28;
        }

        const g = Math.min(1, brightness);
        cols.setXYZ(i, g, g, g);
      }
      pos.needsUpdate = true;
      cols.needsUpdate = true;
    };

    const updateFrame = (animate: boolean, now: number) => {
      pyramid.updateMatrixWorld(true);

      for (let i = 0; i < faceDefs.length; i++) {
        faceN.copy(faceDefs[i].normal).applyQuaternion(pyramid.quaternion);
        const facing = Math.max(0, faceN.z);
        faceBright[i] += (0.15 + facing * 1.05 - faceBright[i]) * 0.1;

        /* Gate: word appears only after face is clearly front; fades before it turns away */
        const targetReveal =
          facing > 0.62 ? Math.min(1, (facing - 0.55) / 0.4) : 0;
        const rate = targetReveal > faceReveal[i] ? 0.07 : 0.12;
        faceReveal[i] += (targetReveal - faceReveal[i]) * rate;
      }

      const t = animate ? now * 0.001 : 0;
      updateLayer(
        structurePoints,
        structureGeom,
        structureIndex,
        t,
        animate,
        false,
      );
      updateLayer(textPoints, textGeom, textIndex, t, animate, true);
      renderer.render(scene, camera);
    };

    const tick = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (visible && !reduced) {
        spinY -= ROTATION_SPEED * dt;

        pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 4.5);
        pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 4.5);

        /* Noticeable parallax + gentle tilt toward the pointer */
        const targetYaw = pointer.x * 0.55;
        const targetPitch = pointer.y * 0.12;
        yawBias += (targetYaw - yawBias) * Math.min(1, dt * 4);
        pitchBias += (targetPitch - pitchBias) * Math.min(1, dt * 4);

        camera.position.set(
          camBase.x + pointer.x * 0.85,
          camBase.y - pointer.y * 0.55,
          camBase.z,
        );
        look.set(pointer.x * 0.2, 0.12 - pointer.y * 0.12, 0);
        camera.lookAt(look);

        pyramid.rotation.set(pitchBias, spinY + yawBias, -yawBias * 0.28);

        updateFrame(true, now);
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    if (typeof wordsMq.addEventListener === "function") {
      wordsMq.addEventListener("change", onWordsMq);
    } else {
      wordsMq.addListener(onWordsMq);
    }

    /* Window-level move so hover still works if a child canvas steals events */
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerenter", onPointerEnter, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave, { passive: true });
    canvas.style.pointerEvents = "auto";
    canvas.style.touchAction = "none";

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    if (reduced) {
      updateFrame(false, 0);
    } else {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (typeof wordsMq.removeEventListener === "function") {
        wordsMq.removeEventListener("change", onWordsMq);
      } else {
        wordsMq.removeListener(onWordsMq);
      }
      window.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerenter", onPointerEnter);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      disposeLayer(structurePoints, structureGeom, structureMat);
      disposeLayer(textPoints, textGeom, textMat);
      dotMap.dispose();
      renderer.dispose();
      if (canvas.parentElement === wrap) wrap.removeChild(canvas);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`canvas-particle-pyramid ${className}`.trim()}
      aria-hidden
    />
  );
}
