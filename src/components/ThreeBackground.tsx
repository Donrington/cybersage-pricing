'use client';

import { useEffect, useRef } from 'react';

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let renderer: import('three').WebGLRenderer | null = null;
    let geometry: import('three').BufferGeometry | null = null;
    let material: import('three').PointsMaterial | null = null;
    let handleResize: (() => void) | null = null;
    let destroyed = false;

    const init = async () => {
      try {
        const THREE = await import('three');
        if (destroyed) return;

        const w = mount.clientWidth;
        const h = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
        camera.position.set(0, 0, 28);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const cols = 55;
        const rows = 35;
        const spacing = 1.1;
        const positions: number[] = [];
        const colors: number[] = [];

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            positions.push(
              (j - cols / 2) * spacing,
              (i - rows / 2) * spacing,
              0,
            );
            const isAccent = Math.random() < 0.025;
            if (isAccent) {
              colors.push(0.78, 0.58, 0.16);
            } else {
              const v = 0.07 + Math.random() * 0.06;
              colors.push(v, v, v);
            }
          }
        }

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        material = new THREE.PointsMaterial({
          size: 0.07,
          vertexColors: true,
          transparent: true,
          opacity: 0.75,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const lineMat = new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.4 });
        const hGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-40, 0, -1), new THREE.Vector3(40, 0, -1),
        ]);
        const vGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -25, -1), new THREE.Vector3(0, 25, -1),
        ]);
        scene.add(new THREE.Line(hGeom, lineMat));
        scene.add(new THREE.Line(vGeom, lineMat));

        const clock = new THREE.Clock();
        const posArr = geometry.attributes.position.array as Float32Array;
        const colArr = geometry.attributes.color.array as Float32Array;

        const animate = () => {
          if (destroyed) return;
          animId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              const idx = (i * cols + j) * 3;
              const x = (j - cols / 2) * spacing;
              const y = (i - rows / 2) * spacing;
              posArr[idx + 2] =
                Math.sin(x * 0.25 + t * 0.6) * Math.cos(y * 0.2 + t * 0.5) * 1.0 +
                Math.sin(x * 0.4 - t * 0.3) * 0.3;
            }
          }
          geometry!.attributes.position.needsUpdate = true;

          for (let k = 0; k < cols * rows; k++) {
            const ci = k * 3;
            if (colArr[ci] > 0.5) {
              const pulse = 0.6 + 0.4 * Math.sin(t * 3 + k * 0.7);
              colArr[ci] = 0.78 * pulse;
              colArr[ci + 1] = 0.58 * pulse;
              colArr[ci + 2] = 0.16 * pulse;
            }
          }
          geometry!.attributes.color.needsUpdate = true;

          points.rotation.x = Math.sin(t * 0.04) * 0.06;
          points.rotation.z = Math.cos(t * 0.025) * 0.03;

          renderer!.render(scene, camera);
        };

        animate();

        // Store the handler reference so we can remove it on cleanup
        handleResize = () => {
          if (!mount || destroyed) return;
          const nw = mount.clientWidth;
          const nh = mount.clientHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer!.setSize(nw, nh);
        };
        window.addEventListener('resize', handleResize);

      } catch (err) {
        // WebGL unavailable or import failed — fail silently
        console.warn('[ThreeBackground]', err);
      }
    };

    init();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    />
  );
}
