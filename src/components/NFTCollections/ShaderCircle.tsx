"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useSharedRenderer } from '@/hooks/useSharedRenderer';
import { vertexShader, fragmentShader } from '@/constants/shaders';

export default function ShaderCircle() {
  const [shaderDataUrl, setShaderDataUrl] = useState<string>('');
  const timeRef = useRef<number>(0);

  // Setup Three.js con useSharedRenderer
  const setup = useCallback(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 }
      },
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return { scene, camera, material, geometry };
  }, []);

  const { containerRef, canvasRef, materialRef } = useSharedRenderer(setup, {
    priority: 5, // decorativo
    targetFPS: 20,
    enableVisibilityTracking: true,
  });

  // Update dataUrl e uTime
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 48;
    canvas.height = 48;

    const updateInterval = setInterval(() => {
      if (canvas) {
        try {
          setShaderDataUrl(canvas.toDataURL());

          if (materialRef.current) {
            timeRef.current += 0.05; // ~20fps
            materialRef.current.uniforms.uTime.value = timeRef.current;
          }
        } catch {
          // Error
        }
      }
    }, 100); // ~20fps

    return () => clearInterval(updateInterval);
  }, [canvasRef, materialRef]);

  return (
    <div ref={containerRef}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'none',
          position: 'absolute'
        }}
        width={48}
        height={48}
      />
      {shaderDataUrl && (
        <div className="shader-data" data-shader-url={shaderDataUrl} />
      )}
    </div>
  );
}

export function useShaderDataUrl() {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const shaderData = document.querySelector('.shader-data');
      if (shaderData) {
        const url = shaderData.getAttribute('data-shader-url');
        if (url) setDataUrl(url);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return dataUrl;
}
