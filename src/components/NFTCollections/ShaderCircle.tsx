"use client";

import { useRef, useEffect, useState, useId } from 'react';
import * as THREE from 'three';
import { sharedRenderer } from '@/lib/sharedRenderer';
import { vertexShader, fragmentShader } from '@/constants/shaders';

export default function ShaderCircle() {
  const uniqueId = useId();
  const taskId = `shader-circle-${uniqueId.replace(/:/g, '-')}`;

  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [shaderDataUrl, setShaderDataUrl] = useState<string>('');
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    canvas.width = 48;
    canvas.height = 48;

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

    sceneRef.current = scene;
    materialRef.current = material;

    // Registra nel sharedRenderer (priorità 5 = decorativo, 20fps)
    sharedRenderer.registerTask(
      taskId,
      scene,
      camera,
      canvas,
      {
        priority: 5,
        targetFPS: 20
      }
    );

    // Update dataUrl e uTime
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

    return () => {
      clearInterval(updateInterval);
      sharedRenderer.unregisterTask(taskId);
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
    };
  }, [taskId]);

  return (
    <>
      <canvas
        ref={shaderCanvasRef}
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
    </>
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
