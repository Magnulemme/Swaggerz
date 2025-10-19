"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sharedRenderer } from "@/lib/sharedRenderer";

interface WaveImageShaderProps {
  imageUrl: string;
  waveIntensity?: number; // Intensità dell'effetto 3D (default: 0.03 per effetto leggero)
  waveSpeed?: number; // Velocità animazione (default: 0.5)
  foldCount?: number; // Numero di pieghe verticali (default: 12)
  className?: string;
}

export function WaveImageShader({
  imageUrl,
  waveIntensity = 0.25, // ✅ Intensità alta per effetto visibile
  waveSpeed = 1.0,
  foldCount = 6,
  className = "",
}: WaveImageShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const taskId = `wave-image-${imageUrl}`;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ✅ Perspective camera per vedere il displacement 3D
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3;
    cameraRef.current = camera;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // ✅ Shader stile curtains.js - CORRETTO con UV displacement
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uIntensity: { value: waveIntensity },
            uSpeed: { value: waveSpeed },
            uFolds: { value: foldCount },
          },
          vertexShader: `
            varying vec2 vUv;

            uniform float uTime;
            uniform float uIntensity;
            uniform float uSpeed;
            uniform float uFolds;

            #define PI 3.14159265359

            void main() {
              vUv = uv;
              vec3 newPosition = position;

              // ✅ Wave che viaggia da sinistra a destra
              float waveCoords = ((uTime * uSpeed / 45.0) * 3.5) - 1.75;
              float distanceToWave = distance(vec2(position.x, 0.0), vec2(waveCoords, 0.0));

              // Wave principale
              float wave = (cos(clamp(distanceToWave, 0.0, 0.75) * PI) - cos(0.75 * PI)) * uIntensity;

              // ✅ Oscillazioni multiple per movimento organico
              wave += sin(PI * uTime * uSpeed / 90.0) * uIntensity * 0.5;
              wave += cos(PI * uTime * uSpeed / 60.0) * uIntensity * 0.3;

              // ✅ Pieghe verticali DINAMICHE (cambiano nel tempo)
              float foldFrequency = uFolds + sin(uTime * uSpeed * 0.1) * 2.0; // Frequenza variabile
              float foldPhase = uTime * uSpeed * 0.2; // Fase che cambia

              float foldPattern = sin(position.x * foldFrequency * PI * 0.5 + foldPhase);

              // ✅ Aggiungi variazione verticale alle pieghe
              foldPattern += cos(position.y * 3.0 + uTime * uSpeed * 0.15) * 0.3;

              float curtainEffect = foldPattern * uIntensity * 0.4;

              // ✅ Wave secondaria più veloce per dettaglio
              float detailWave = sin(position.x * 15.0 + uTime * uSpeed * 2.0) *
                                 cos(position.y * 10.0 + uTime * uSpeed * 1.5) *
                                 uIntensity * 0.15;

              // ✅ DISPLACEMENT Z per effetto 3D reale
              newPosition.z += wave + curtainEffect + detailWave;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform float uTime;
            uniform float uIntensity;
            uniform float uSpeed;
            uniform float uFolds;
            varying vec2 vUv;

            #define PI 3.14159265359

            void main() {
              vec2 distortedUV = vUv;

              // ✅ WAVE TRAVELING che distorce le UV
              float waveCoords = ((uTime * uSpeed / 45.0) * 3.5) - 1.75;
              float distanceToWave = distance(vec2(vUv.x * 2.0 - 1.0, 0.0), vec2(waveCoords, 0.0));

              float wave = (cos(clamp(distanceToWave, 0.0, 0.75) * PI) - cos(0.75 * PI)) * uIntensity;
              wave += sin(PI * uTime * uSpeed / 90.0) * uIntensity * 0.5;
              wave += cos(PI * uTime * uSpeed / 60.0) * uIntensity * 0.3;

              // ✅ CURTAIN FOLDS DINAMICHE - cambiano nel tempo
              float foldFrequency = uFolds + sin(uTime * uSpeed * 0.1) * 2.0;
              float foldPhase = uTime * uSpeed * 0.2;
              float foldPattern = sin(vUv.x * foldFrequency * PI + foldPhase);

              // ✅ Aggiungi movimento verticale
              foldPattern += cos(vUv.y * 3.0 + uTime * uSpeed * 0.15) * 0.3;

              // ✅ Distorsione UV DINAMICA
              distortedUV.x += wave * 0.05 + foldPattern * wave * 0.03;
              distortedUV.y += foldPattern * 0.02 * sin(uTime * uSpeed * 0.3);

              // ✅ Aggiungi distorsione secondaria per più dettaglio
              distortedUV.x += sin(vUv.y * 10.0 + uTime * uSpeed * 1.5) * 0.01;
              distortedUV.y += cos(vUv.x * 8.0 + uTime * uSpeed * 1.2) * 0.01;

              // Sample texture con UV distorte
              vec4 texColor = texture2D(uTexture, distortedUV);

              // ✅ Shading DINAMICO basato sulle pieghe
              float shading = 1.0 - abs(foldPattern * wave) * 0.4;
              shading = clamp(shading, 0.6, 1.0);

              gl_FragColor = vec4(texColor.rgb * shading, texColor.a);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
        });

        // Geometry con alta risoluzione per pieghe smooth
        const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
        const mesh = new THREE.Mesh(geometry, material);
        meshRef.current = mesh;
        materialRef.current = material;
        scene.add(mesh);

        // Registra task nel shared renderer
        sharedRenderer.registerTask(taskId, scene, camera, canvas, {
          priority: 5,
          targetFPS: 30, // 30fps sufficiente per effetto smooth
          visible: true,
        });

        setIsReady(true);

        // Animation loop per aggiornare uTime
        let animationId: number;
        const animate = (time: number) => {
          if (material.uniforms.uTime) {
            material.uniforms.uTime.value = time * 0.001;
          }
          animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);

        // Cleanup
        return () => {
          cancelAnimationFrame(animationId);
        };
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );

    // Cleanup on unmount
    return () => {
      sharedRenderer.unregisterTask(taskId);

      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, [imageUrl, waveIntensity, waveSpeed, foldCount]);

  // Handle resize
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const camera = cameraRef.current;
      if (!container || !canvas || !camera) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // ✅ Update camera aspect ratio
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();

      const taskId = `wave-image-${imageUrl}`;
      sharedRenderer.resize(taskId, canvas.width, canvas.height);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/20 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
            <div className="text-white/50 text-sm">Caricamento...</div>
          </div>
        </div>
      )}
    </div>
  );
}
