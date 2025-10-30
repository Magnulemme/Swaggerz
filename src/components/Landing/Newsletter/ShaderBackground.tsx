"use client";

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useSharedRenderer } from '@/hooks/useSharedRenderer';
import { vertexShader, darkFragmentShader } from '@/constants/shaders';

interface ShaderBackgroundProps {
  className?: string;
}

export default function ShaderBackground({ className = '' }: ShaderBackgroundProps) {
  const timeRef = useRef<number>(0);

  // Setup Three.js scene
  const setup = useCallback(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: darkFragmentShader,
      uniforms: {
        uTime: { value: 0.0 }
      },
      transparent: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return { scene, camera, material, geometry };
  }, []);

  const { containerRef, canvasRef, materialRef } = useSharedRenderer(setup, {
    priority: 3,
    targetFPS: 30,
    enableVisibilityTracking: true,
  });

  // Update uTime for animation
  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (materialRef.current) {
        timeRef.current += 0.033; // ~30fps
        materialRef.current.uniforms.uTime.value = timeRef.current;
      }
    }, 33); // ~30fps

    return () => clearInterval(updateInterval);
  }, [materialRef]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
