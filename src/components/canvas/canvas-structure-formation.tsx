"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  buildStructureFormation,
  sampleStream,
  type StructureFormationSet,
} from "@/lib/structure-formation";

type Props = {
  className?: string;
};

/** ~55s per full turn around the vertical axis */
const YAW_SPEED = 0.115;

function createIconTexture(kind: "user" | "play" | "card"): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (kind === "user") {
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.36, size * 0.14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.78, size * 0.28, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
  } else if (kind === "play") {
    const s = size * 0.22;
    ctx.strokeRect(size * 0.28, size * 0.28, size * 0.44, size * 0.44);
    ctx.beginPath();
    ctx.moveTo(size * 0.42, size * 0.38);
    ctx.lineTo(size * 0.42, size * 0.62);
    ctx.lineTo(size * 0.42 + s, size * 0.5);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.strokeRect(size * 0.26, size * 0.32, size * 0.48, size * 0.36);
    ctx.beginPath();
    ctx.moveTo(size * 0.26, size * 0.42);
    ctx.lineTo(size * 0.74, size * 0.42);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Services-only: real Three.js modular glass cube structure that rotates
 * around the vertical axis. Canvas theme only.
 */
export function CanvasStructureFormation({ className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let raf = 0;
    let mobile = false;
    let webglOk = true;
    let builtForMobile: boolean | null = null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
    const camBase = new THREE.Vector3(0, 0.16, 1.55);
    camera.position.copy(camBase);
    camera.lookAt(0, 0.02, 0);

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
    wrap.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.className = "canvas-structure-formation__canvas";
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.pointerEvents = "none";

    const root = new THREE.Group();
    scene.add(root);

    const meshGroup = new THREE.Group();
    const streamGroup = new THREE.Group();
    root.add(meshGroup);
    root.add(streamGroup);

    /* Soft key from upper-left like the reference beam */
    const key = new THREE.DirectionalLight(0xf2f6f8, 1.15);
    key.position.set(-3.2, 4.2, 2.4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb8c4cc, 0.35);
    fill.position.set(2.5, -1.2, -1.5);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x9aa8b4, 0.45));

    const iconTextures: THREE.CanvasTexture[] = [];
    const disposables: THREE.Object3D[] = [];

    type GlassPiece = {
      mesh: THREE.Mesh;
      edges: THREE.LineSegments;
      glassMat: THREE.MeshPhysicalMaterial | THREE.MeshBasicMaterial;
      edgeMat: THREE.LineBasicMaterial;
      baseGlass: number;
      baseEdge: number;
      core: boolean;
    };

    const pieces: GlassPiece[] = [];
    const streams: {
      line: THREE.Line;
      mat: THREE.LineBasicMaterial;
      debris: THREE.LineSegments[];
      debrisMats: THREE.LineBasicMaterial[];
      streamIndex: number;
      t0: number[];
    }[] = [];

    let data: StructureFormationSet | null = null;
    let last = performance.now();
    let spinY = 0.55;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const applySettledOpacities = () => {
      for (const p of pieces) {
        p.glassMat.opacity = p.baseGlass;
        p.edgeMat.opacity = p.baseEdge * 0.92;
      }
      for (const s of streams) {
        s.mat.opacity = 0.32;
        for (const m of s.debrisMats) m.opacity = 0.9;
      }
      for (const obj of disposables) {
        const ud = obj.userData as { iconMat?: THREE.MeshBasicMaterial; base?: number };
        if (ud.iconMat) ud.iconMat.opacity = ud.base ?? 0.7;
      }
    };

    const clearScene = () => {
      for (const p of pieces) {
        meshGroup.remove(p.mesh);
        meshGroup.remove(p.edges);
        p.mesh.geometry.dispose();
        p.edges.geometry.dispose();
        p.glassMat.dispose();
        p.edgeMat.dispose();
      }
      pieces.length = 0;

      for (const s of streams) {
        streamGroup.remove(s.line);
        s.line.geometry.dispose();
        s.mat.dispose();
        for (const d of s.debris) {
          streamGroup.remove(d);
          d.geometry.dispose();
        }
        for (const m of s.debrisMats) m.dispose();
      }
      streams.length = 0;

      for (const obj of disposables) {
        meshGroup.remove(obj);
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      }
      disposables.length = 0;
    };

    const mount = (isMobile: boolean) => {
      clearScene();
      data = buildStructureFormation({ mobile: isMobile });

      for (const cube of data.cubes) {
        const size = cube.half * 2;
        const box = new THREE.BoxGeometry(size, size, size);

        let glassMat: THREE.MeshPhysicalMaterial | THREE.MeshBasicMaterial;
        try {
          glassMat = new THREE.MeshPhysicalMaterial({
            color: cube.core ? 0xf4f7fa : 0xd5dee6,
            transparent: true,
            opacity: 0,
            roughness: cube.core ? 0.25 : 0.18,
            metalness: 0.05,
            transmission: cube.core ? 0.15 : 0.55,
            thickness: cube.core ? 0.4 : 0.8,
            ior: 1.35,
            depthWrite: false,
            side: THREE.DoubleSide,
          });
        } catch {
          glassMat = new THREE.MeshBasicMaterial({
            color: cube.core ? 0xf4f7fa : 0xd5dee6,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            side: THREE.DoubleSide,
          });
        }

        const mesh = new THREE.Mesh(box, glassMat);
        mesh.position.set(cube.cx, cube.cy, cube.cz);
        mesh.renderOrder = cube.core ? 3 : 1;
        meshGroup.add(mesh);

        const edgeGeom = new THREE.EdgesGeometry(box, 20);
        const edgeMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        const edges = new THREE.LineSegments(edgeGeom, edgeMat);
        edges.position.copy(mesh.position);
        edges.renderOrder = 4;
        meshGroup.add(edges);

        pieces.push({
          mesh,
          edges,
          glassMat,
          edgeMat,
          baseGlass: cube.glass,
          baseEdge: cube.edge,
          core: !!cube.core,
        });

        if (cube.icon && !isMobile) {
          const tex = createIconTexture(cube.icon);
          iconTextures.push(tex);
          const iconMat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            side: THREE.DoubleSide,
          });
          const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(cube.half * 0.9, cube.half * 0.9),
            iconMat,
          );
          /* Stick icon on the outward face */
          const ax = Math.abs(cube.cx);
          const ay = Math.abs(cube.cy);
          const az = Math.abs(cube.cz);
          if (ax >= ay && ax >= az) {
            plane.position.set(
              cube.cx + Math.sign(cube.cx || 1) * (cube.half + 0.002),
              cube.cy,
              cube.cz,
            );
            plane.rotation.y = Math.sign(cube.cx || 1) > 0 ? Math.PI / 2 : -Math.PI / 2;
          } else if (az >= ay) {
            plane.position.set(
              cube.cx,
              cube.cy,
              cube.cz + Math.sign(cube.cz || 1) * (cube.half + 0.002),
            );
            if (Math.sign(cube.cz || 1) < 0) plane.rotation.y = Math.PI;
          } else {
            plane.position.set(
              cube.cx,
              cube.cy + Math.sign(cube.cy || 1) * (cube.half + 0.002),
              cube.cz,
            );
            plane.rotation.x = Math.sign(cube.cy || 1) > 0 ? -Math.PI / 2 : Math.PI / 2;
          }
          plane.renderOrder = 5;
          meshGroup.add(plane);
          disposables.push(plane);
          (plane.userData as { iconMat: THREE.MeshBasicMaterial; base: number }).iconMat =
            iconMat;
          (plane.userData as { base: number }).base = 0.7;
        }
      }

      for (let si = 0; si < data.streams.length; si++) {
        const stream = data.streams[si];
        const samples = 64;
        const positions = new Float32Array(samples * 3);
        for (let i = 0; i < samples; i++) {
          const t = i / (samples - 1);
          const [x, y, z] = sampleStream(stream, t);
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const mat = new THREE.LineBasicMaterial({
          color: 0xe8eef2,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        });
        const line = new THREE.Line(geom, mat);
        line.renderOrder = 0;
        streamGroup.add(line);

        const debris: THREE.LineSegments[] = [];
        const debrisMats: THREE.LineBasicMaterial[] = [];
        const t0: number[] = [];
        for (let d = 0; d < stream.debris; d++) {
          const bitSize = 0.028 + (d % 3) * 0.01;
          const solid =
            d % 2 === 0
              ? new THREE.BoxGeometry(bitSize, bitSize, bitSize)
              : new THREE.TetrahedronGeometry(bitSize * 0.95);
          const edgeGeom = new THREE.EdgesGeometry(solid);
          solid.dispose();
          const bitMat = new THREE.LineBasicMaterial({
            color: 0xe8eef2,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          });
          const wire = new THREE.LineSegments(edgeGeom, bitMat);
          wire.renderOrder = 6;
          streamGroup.add(wire);
          debris.push(wire);
          debrisMats.push(bitMat);
          /* Stagger along the path — avoid clustering at the core */
          t0.push(0.08 + ((d + 0.35) / stream.debris) * 0.84);
        }

        streams.push({ line, mat, debris, debrisMats, streamIndex: si, t0 });
      }

      applySettledOpacities();
      builtForMobile = isMobile;
      last = performance.now();
    };

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h > 1.35 ? 22 : 26;
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

    const update = (now: number) => {
      if (!data) return;
      const t = now * 0.001;

      for (const s of streams) {
        const stream = data.streams[s.streamIndex];
        if (!stream) continue;
        for (let di = 0; di < s.debris.length; di++) {
          const u = (s.t0[di] + t * 0.22) % 1;
          const [x, y, z] = sampleStream(stream, u);
          const bit = s.debris[di];
          bit.position.set(x, y, z);
          bit.rotation.y = t * 1.1 + di;
          bit.rotation.x = t * 0.7;
        }
      }

      /* Subtle core pulse — keep structure present */
      for (const p of pieces) {
        if (!p.core) continue;
        const pulse = 0.94 + 0.06 * Math.sin(t * 1.6);
        p.glassMat.opacity = Math.min(1, p.baseGlass * pulse);
      }

      renderer.render(scene, camera);
    };

    const tick = (now: number) => {
      if (disposed) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (!reduced) {
        spinY += YAW_SPEED * dt;
      }

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3.4);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3.4);

      camera.position.set(
        camBase.x + pointer.x * 0.42,
        camBase.y - pointer.y * 0.28,
        camBase.z,
      );
      camera.lookAt(pointer.x * 0.08, 0.05 - pointer.y * 0.05, 0);

      /* Vertical-axis rotation + hover parallax on the full 3D assembly */
      root.rotation.set(
        0.18 + pointer.y * 0.1,
        spinY + pointer.x * 0.24,
        -pointer.x * 0.05,
      );
      update(now);

      if (!reduced) raf = requestAnimationFrame(tick);
    };

    const syncBuild = () => {
      resize();
      if (builtForMobile === mobile) return;
      mount(mobile);
      update(performance.now());
    };

    syncBuild();
    const ro = new ResizeObserver(syncBuild);
    ro.observe(wrap);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    if (!reduced) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    } else {
      update(performance.now());
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      clearScene();
      for (const tex of iconTextures) tex.dispose();
      if (webglOk) {
        renderer.dispose();
        if (canvas.parentElement === wrap) wrap.removeChild(canvas);
      }
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`canvas-structure-formation ${className}`.trim()}
      aria-hidden
    />
  );
}
