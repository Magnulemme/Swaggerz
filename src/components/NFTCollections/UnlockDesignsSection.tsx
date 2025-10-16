"use client";

import React, { useRef, useEffect, useState, useId, useMemo } from 'react';
import ShaderText from '@/components/ShaderText';
import CircularDiagram from './CircularDiagram';
import * as THREE from 'three';
import { sharedRenderer } from '@/lib/sharedRenderer';
import { vertexShader, fragmentShader } from '@/constants/shaders';

export default function UnlockDesignsSection() {
  const uniqueId = useId();

  const [shaderDataUrls, setShaderDataUrls] = useState<string[]>(['', '', '']);
  const canvasRef0 = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRefs = useMemo(() => [canvasRef0, canvasRef1, canvasRef2], []);
  const materialsRef = useRef<THREE.ShaderMaterial[]>([]);
  const timeRefs = useRef<number[]>([0, 1, 2]); // Offset iniziali diversi

  // Setup Three.js con sharedRenderer per tutti i cerchi
  useEffect(() => {
    const geometries: THREE.PlaneGeometry[] = [];
    const materials: THREE.ShaderMaterial[] = [];
    const taskIds: string[] = [];

    // Setup per ogni canvas con sharedRenderer
    canvasRefs.forEach((canvasRef, index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const taskId = `unlock-circle-${uniqueId.replace(/:/g, '-')}-${index}`;
      taskIds.push(taskId);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      canvas.width = 48;
      canvas.height = 48;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: timeRefs.current[index] }
        },
        transparent: true
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      materialsRef.current[index] = material;
      geometries.push(geometry);
      materials.push(material);

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
    });

    // Update dataUrls e uTime per tutti i canvas
    const updateInterval = setInterval(() => {
      const newDataUrls: string[] = [];

      canvasRefs.forEach((canvasRef, index) => {
        const canvas = canvasRef.current;
        const material = materialsRef.current[index];

        if (canvas && material) {
          try {
            newDataUrls[index] = canvas.toDataURL();
            timeRefs.current[index] += 0.05; // ~20fps
            material.uniforms.uTime.value = timeRefs.current[index];
          } catch {
            newDataUrls[index] = '';
          }
        } else {
          newDataUrls[index] = '';
        }
      });

      setShaderDataUrls(newDataUrls);
    }, 100); // ~20fps

    return () => {
      clearInterval(updateInterval);
      taskIds.forEach(id => sharedRenderer.unregisterTask(id));
      geometries.forEach(geometry => geometry?.dispose());
      materials.forEach(material => material?.dispose());
    };
  }, [uniqueId, canvasRefs]);

  return (
    <section className="w-full min-h-screen py-20">
      {/* Canvas nascosti per generare gli shader */}
      {canvasRefs.map((ref, index) => (
        <canvas
          key={index}
          ref={ref}
          style={{
            display: 'none',
            position: 'absolute'
          }}
          width={48}
          height={48}
        />
      ))}

      {/* Layout a schermo intero */}
      <div className="relative grid xl:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto px-4">
        {/* Colonna 1: Header */}
        <div className="xl:order-2">
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Sblocca Design
            </h2>
            <ShaderText fontSize="48px" fontWeight="900">
              Esclusivi
            </ShaderText>
          </div>
          <p className="text-zinc-400 text-lg">
            Possiedi l&apos;NFT, stampa il design. Solo tu puoi indossarlo finché non decidi di rivenderlo.
          </p>
        </div>

        {/* Colonna 2: Diagramma Circolare */}
        <CircularDiagram shaderDataUrls={shaderDataUrls} />
      </div>
    </section>
  );
}