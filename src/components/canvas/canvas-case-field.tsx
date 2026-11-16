"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  className?: string;
};

/**
 * Case study detail backdrop: a calm, perspective-tilted Three.js dot-wave field.
 * Particles drift in slow harmonic waves and swell + illuminate smoothly
 * beneath the pointer, matching the site's dot-mesh visual language.
 */
export function CanvasCaseField({ className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let disposed = false;
    let raf = 0;
    let visible = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    const camBase = new THREE.Vector3(0, 1.55, 4.9);
    const lookTarget = new THREE.Vector3(0, -0.1, 0);
    camera.position.copy(camBase);
    camera.lookAt(lookTarget);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    wrap.appendChild(renderer.domElement);
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.pointerEvents = "none";
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const mobile = window.innerWidth < 768;
    const cols = mobile ? 42 : 76;
    const rows = mobile ? 28 : 44;
    const widthSpan = 15.5;
    const depthSpan = 10.2;
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      const v = r / (rows - 1) - 0.5;
      for (let c = 0; c < cols; c++) {
        const u = c / (cols - 1) - 0.5;
        positions[idx * 3] = u * widthSpan;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = v * depthSpan;
        seeds[idx] = Math.sin(c * 12.9898 + r * 78.233) * 0.5 + 0.5;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      glslVersion: THREE.GLSL3,
      uniforms: {
        uTime: { value: 0 },
        uDpr: { value: 1 },
        uCursorWorld: { value: new THREE.Vector3(0, 0, -99) },
        uHover: { value: 0 },
        uBaseColor: { value: new THREE.Color("#6d8b9a") },
        uAccentColor: { value: new THREE.Color("#8aabbc") },
        uHighlightColor: { value: new THREE.Color("#c5d4dc") },
      },
      vertexShader: /* glsl */ `
        in float aSeed;
        uniform float uTime;
        uniform float uDpr;
        uniform vec3 uCursorWorld;
        uniform float uHover;
        out float vAlpha;
        out float vBoost;

        void main() {
          vec3 p = position;

          // Smooth harmonic wave contour
          float w1 = sin(p.x * 0.48 + uTime * 0.52) * cos(p.z * 0.56 + uTime * 0.38) * 0.36;
          float w2 = sin((p.x - p.z * 0.7) * 0.32 - uTime * 0.36) * 0.18;
          float baseY = w1 + w2;

          // Local swell + concentric ripple around hovered world position
          float dist = length(p.xz - uCursorWorld.xz);
          float swell = exp(-(dist * dist) * 0.28) * uHover;
          float ripple = sin(dist * 2.6 - uTime * 3.4) * exp(-dist * 0.42) * 0.16 * uHover;

          p.y = baseY + swell * 0.58 + ripple;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Keep outer perimeter soft and keep reading column comfortable
          float xNorm = p.x / 7.75;
          float zNorm = p.z / 5.1;
          float edgeFade = smoothstep(1.02, 0.36, abs(xNorm)) * smoothstep(1.02, 0.28, abs(zNorm));
          float leftQuiet = mix(0.35, 0.85, smoothstep(-0.65, 0.35, xNorm));

          float crest = smoothstep(-0.28, 0.42, baseY);
          vBoost = clamp(swell * 0.85 + crest * 0.2, 0.0, 1.0);
          vAlpha = edgeFade * leftQuiet * (0.22 + crest * 0.16 + aSeed * 0.09 + swell * 0.26);

          float baseSize = (3.0 + aSeed * 1.1 + crest * 0.75 + swell * 2.2) * uDpr;
          gl_PointSize = clamp(baseSize * (5.0 / max(-mvPosition.z, 1.0)), 1.4, 10.5);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        in float vAlpha;
        in float vBoost;
        uniform vec3 uBaseColor;
        uniform vec3 uAccentColor;
        uniform vec3 uHighlightColor;
        out vec4 fragColor;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float r = length(uv);
          if (r > 0.5) discard;
          float disc = smoothstep(0.5, 0.18, r);
          vec3 col = mix(uBaseColor, uAccentColor, smoothstep(0.0, 0.5, vBoost));
          col = mix(col, uHighlightColor, smoothstep(0.5, 1.0, vBoost));
          fragColor = vec4(col, clamp(vAlpha, 0.0, 0.52) * disc);
        }
      `,
    });

    const fieldTilt = 0.24;
    const field = new THREE.Points(geometry, material);
    field.position.set(0.35, -0.1, -0.35);
    field.rotation.x = fieldTilt;
    scene.add(field);

    // Intersect against the actual tilted field plane so upper-hero hovers hit cleanly
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const planeNormal = new THREE.Vector3(0, Math.cos(fieldTilt), Math.sin(fieldTilt)).normalize();
    const hitPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, field.position);
    const hitPoint = new THREE.Vector3();
    const localHit = new THREE.Vector3();

    const pointer = {
      nx: 0,
      ny: 0,
      tx: 0,
      ty: 0,
      wx: 0,
      wz: -99,
      twx: 0,
      twz: -99,
      hover: 0,
      hoverTarget: 0,
    };

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 2 || h < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 1.75);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      material.uniforms.uDpr.value = dpr;
      camera.aspect = w / h;
      camera.fov = w / h > 1.45 ? 38 : 44;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) {
        pointer.hoverTarget = 0;
        return;
      }
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      pointer.hoverTarget = inside ? 1 : 0;
      if (!inside) return;

      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.tx = Math.max(-1, Math.min(1, nx));
      pointer.ty = Math.max(-1, Math.min(1, ny));

      ndc.set(pointer.tx, pointer.ty);
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(hitPlane, hitPoint)) {
        localHit.copy(hitPoint);
        field.worldToLocal(localHit);
        pointer.twx = localHit.x;
        pointer.twz = localHit.z;
      }

      if (reduced && raf === 0) raf = requestAnimationFrame(tick);
    };

    const renderFrame = (now: number) => {
      const t = reduced ? 0 : now * 0.001;
      material.uniforms.uTime.value = t;
      material.uniforms.uHover.value = pointer.hover;
      material.uniforms.uCursorWorld.value.set(pointer.wx, 0, pointer.wz);

      camera.position.set(
        camBase.x + pointer.nx * 0.34,
        camBase.y + pointer.ny * 0.16,
        camBase.z,
      );
      camera.lookAt(
        lookTarget.x + pointer.nx * 0.14,
        lookTarget.y + pointer.ny * 0.06,
        lookTarget.z,
      );

      renderer.render(scene, camera);
    };

    const settled = () =>
      Math.abs(pointer.tx - pointer.nx) < 0.004 &&
      Math.abs(pointer.ty - pointer.ny) < 0.004 &&
      Math.abs(pointer.hoverTarget - pointer.hover) < 0.008;

    const tick = (now: number) => {
      if (disposed) return;
      pointer.nx += (pointer.tx - pointer.nx) * 0.07;
      pointer.ny += (pointer.ty - pointer.ny) * 0.07;
      pointer.wx += (pointer.twx - pointer.wx) * 0.16;
      pointer.wz += (pointer.twz - pointer.wz) * 0.16;
      pointer.hover += (pointer.hoverTarget - pointer.hover) * 0.08;

      if (visible) renderFrame(now);
      if (!reduced || !settled()) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible && reduced) renderFrame(0);
      },
      { threshold: 0.02 },
    );
    io.observe(wrap);

    if (reduced) renderFrame(0);
    else raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (canvas.parentElement === wrap) wrap.removeChild(canvas);
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className={`canvas-case-field__stage ${className}`.trim()}
      aria-hidden
    />
  );
}
