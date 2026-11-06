import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { OrchestratorStage } from '../../animations/orchestration/AgentOrchestrator';

export interface Construction3DCanvasProps {
  stage?: OrchestratorStage;
}

export const Construction3DCanvas: React.FC<Construction3DCanvasProps> = ({ stage = 'BOOTING' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.012);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
    camera.position.set(0, -6, 55);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer with High-Performance & Transparent Background
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      // Graceful WebGL fallback if context initialization fails
      return;
    }

    // 3. Faint Depth-Aware Isometric Ground Grid
    const gridHelper = new THREE.GridHelper(120, 48, 0x38bdf8, 0xb44cff);
    gridHelper.position.set(0, -18, -10);
    gridHelper.rotation.x = 0.28;
    const gridMaterial = gridHelper.material as THREE.LineBasicMaterial;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.12;
    scene.add(gridHelper);

    // 4. Ambient 3D Energy Particle Field (Restrained, Sophisticated)
    const particleCount = 160;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    const palette = [
      new THREE.Color(0xb44cff), // Muted Violet
      new THREE.Color(0xc4b5fd), // Soft Lavender
      new THREE.Color(0x38bdf8), // Soft Cyan
      new THREE.Color(0x818cf8), // Blue-Violet
      new THREE.Color(0xe2e8f0), // Cool Silver
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 75;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      opacities[i] = 0.2 + Math.random() * 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Delicate Center Geometric Ring Structure
    const ringGeometry = new THREE.RingGeometry(18, 18.25, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xb44cff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const centerRing = new THREE.Mesh(ringGeometry, ringMaterial);
    centerRing.position.set(0, 0, -5);
    scene.add(centerRing);

    // Secondary concentric segmented ring
    const innerRingGeo = new THREE.RingGeometry(9, 9.2, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.set(0, 0, -4);
    scene.add(innerRing);

    // 6. Dynamic Spatial Ripples Pool for Agent Arrival & Blueprint Events
    interface SpatialRipple {
      mesh: THREE.LineLoop;
      maxRadius: number;
      currentRadius: number;
      life: number;
      maxLife: number;
    }
    const activeRipples: SpatialRipple[] = [];

    const createRipple = (worldX: number, worldY: number, colorHex: number) => {
      if (activeRipples.length > 8) return; // Cap simultaneous ripples
      const segments = 32;
      const geo = new THREE.BufferGeometry();
      const pts = new Float32Array((segments + 1) * 3);
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        pts[i * 3] = Math.cos(theta);
        pts[i * 3 + 1] = Math.sin(theta);
        pts[i * 3 + 2] = 0;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      const mat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });
      const loop = new THREE.LineLoop(geo, mat);
      loop.position.set(worldX, worldY, 0);
      scene.add(loop);

      activeRipples.push({
        mesh: loop,
        maxRadius: 4.5,
        currentRadius: 0.2,
        life: 0,
        maxLife: 0.45,
      });
    };

    // Global listener for construction events
    const handleSpatialPulse = (e: Event) => {
      const custom = e as CustomEvent<{ x: number; y: number; color?: string }>;
      if (!custom.detail) return;
      const { x, y, color = '#38BDF8' } = custom.detail;

      // Project 2D Screen (x, y) into 3D World space at Z = 0
      const normX = (x / width) * 2 - 1;
      const normY = -(y / height) * 2 + 1;
      const vector = new THREE.Vector3(normX, normY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const parsedColor = new THREE.Color(color).getHex();
      createRipple(pos.x, pos.y, parsedColor);
    };

    window.addEventListener('three:spatial-pulse', handleSpatialPulse);

    // 7. Controlled Animation Clock & Render Loop
    let animId: number;
    let lastTime = performance.now();
    let isTabVisible = true;

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      if (!isTabVisible || !renderer) return;

      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      // Subtle atmospheric rotations
      centerRing.rotation.z += delta * 0.08;
      innerRing.rotation.z -= delta * 0.12;
      gridHelper.position.z = -10 + Math.sin(currentTime * 0.0004) * 1.5;

      // Drift particle positions gently
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(currentTime * 0.001 + i) * 0.015;
      }
      posAttr.needsUpdate = true;

      // Update active spatial ripples
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const r = activeRipples[i];
        r.life += delta;
        const progress = r.life / r.maxLife;
        if (progress >= 1) {
          scene.remove(r.mesh);
          r.mesh.geometry.dispose();
          (r.mesh.material as THREE.Material).dispose();
          activeRipples.splice(i, 1);
        } else {
          const scale = r.currentRadius + progress * r.maxRadius;
          r.mesh.scale.set(scale, scale, 1);
          (r.mesh.material as THREE.LineBasicMaterial).opacity = (1 - progress) * 0.65;
        }
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 8. Responsive Viewport Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 9. Comprehensive Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('three:spatial-pulse', handleSpatialPulse);
      document.removeEventListener('visibilitychange', handleVisibility);

      activeRipples.forEach((r) => {
        scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        (r.mesh.material as THREE.Material).dispose();
      });

      scene.remove(particles);
      particleGeometry.dispose();
      particleMaterial.dispose();

      scene.remove(gridHelper);
      gridHelper.geometry.dispose();
      gridMaterial.dispose();

      scene.remove(centerRing);
      ringGeometry.dispose();
      ringMaterial.dispose();

      scene.remove(innerRing);
      innerRingGeo.dispose();
      innerRingMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};

