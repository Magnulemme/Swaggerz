"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface WaveImageShaderProps {
  imageUrl: string;
  waveIntensity?: number;
  waveSpeed?: number;
  foldCount?: number;
  className?: string;
}

export function WaveImageShader({
  imageUrl,
  waveIntensity = 0.25, // Amplitude più visibile
  waveSpeed = 0.6, // Velocità lenta e fluida
  foldCount = 5, // Numero onde
  className = "",
}: WaveImageShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Main setup effect
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Create WebGL renderer with maximum quality
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      precision: "highp",
      stencil: false,
      depth: false,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup perspective camera for 3D wave effect visibility
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.5, 5); // Camera più lontana per vista migliore
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Resize logic
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);

      // Update perspective camera aspect ratio
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    updateSize();

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        // Maximum texture quality settings
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.generateMipmaps = true;
        texture.needsUpdate = true;

        // Calculate aspect ratio from image texture
        const imageAspect = texture.image.width / texture.image.height;

        // Calculate aspect ratio for UV scaling (Olivier Larose approach)
        const aspectRatio = imageAspect;

        // Create shader material - Inflated canvas effect (balloon-like)
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uAmplitude: { value: waveIntensity },
            uWaveLength: { value: foldCount },
            vUvScale: { value: new THREE.Vector2(1, aspectRatio) },
          },
          vertexShader: `
            varying vec2 vUv;
            uniform float uTime;
            uniform float uAmplitude;
            uniform float uWaveLength;

            void main() {
              vUv = uv;
              vec3 newPosition = position;

              // Calcola la distanza dal centro (effetto radiale)
              vec2 center = vec2(0.0, 0.0);
              float distanceFromCenter = length(position.xy - center);

              // Effetto gonfiato: più forte al centro, si attenua ai bordi
              // Usa una curva più morbida per mantenere l'effetto visibile
              float inflate = 1.0 - distanceFromCenter * 0.3;
              inflate = max(0.2, inflate); // minimo 0.2 invece di 0 per mantenere movimento ai bordi

              // Animazione circolare lenta tipo respiro
              float breathe = sin(uTime * 0.4) * 0.5 + 0.5; // oscillazione tra 0 e 1

              // Movimento organico con noise-like pattern
              float wave1 = sin(position.x * uWaveLength * 0.5 + uTime * 0.3);
              float wave2 = sin(position.y * uWaveLength * 0.4 + uTime * 0.4);
              float organicWave = (wave1 + wave2) * 0.3;

              // Combina: gonfiaggio radiale + movimento organico + respiro
              // Aumentato il moltiplicatore per rendere l'effetto più visibile
              float displacement = inflate * uAmplitude * 3.0 * (1.0 + organicWave * 0.3) * (0.6 + breathe * 0.4);

              newPosition.z = position.z + displacement;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform vec2 vUvScale;
            varying vec2 vUv;

            void main() {
              vec2 uv = (vUv - 0.5) * vUvScale + 0.5;
              vec4 color = texture2D(uTexture, uv);
              gl_FragColor = color;
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
        });

        // Create geometry - Olivier Larose uses 15x15 segments
        const planeWidth = 1;
        const planeHeight = 1;
        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 15, 15);

        const mesh = new THREE.Mesh(geometry, material);

        // Fixed scale for all images - same size
        const fixedScale = 3.5; // Tutte le immagini hanno la stessa dimensione
        mesh.scale.set(fixedScale, fixedScale, 1);

        meshRef.current = mesh;
        materialRef.current = material;
        scene.add(mesh);

        // Animation loop - Olivier Larose style
        const animate = () => {
          if (!isVisible) {
            animationIdRef.current = requestAnimationFrame(animate);
            return;
          }

          // Update uTime uniform (increment by 0.04 like original)
          material.uniforms.uTime.value += 0.04;

          // Render scene
          renderer.render(scene, camera);

          animationIdRef.current = requestAnimationFrame(animate);
        };

        animationIdRef.current = requestAnimationFrame(animate);
        setIsReady(true);
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );

    // Resize handler
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      resizeObserver.disconnect();

      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [imageUrl, waveIntensity, waveSpeed, foldCount, isVisible]);

  // Handle visibility changes for performance optimization
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        imageRendering: "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        style={{
          display: "block",
          imageRendering: "auto",
        }}
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
