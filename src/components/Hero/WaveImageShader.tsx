"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface WaveImageShaderProps {
  imageUrl: string;
  waveIntensity?: number; // Intensità onde (default: 0.2)
  waveSpeed?: number; // Velocità animazione (default: 0.8)
  className?: string;
}

export function WaveImageShader({
  imageUrl,
  waveIntensity = 0.2,
  waveSpeed = 0.8,
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

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ✅ Calcolo matematico per riempire il viewport con padding
    // Padding per compensare l'espansione delle onde (10% = 0.9 scale)
    const viewportScale = 0.9; // Il plane occupa il 90% del viewport (10% padding)

    // Plane size ridotto per lasciare margine
    const planeHeight = 2 * viewportScale;
    const planeWidth = 2 * viewportScale;

    // Distanza camera fissa
    const cameraDistance = 2.5;

    // Calcolo FOV verticale per il plane ridotto
    // tan(fov/2) = (planeHeight/2) / cameraDistance
    // fov = 2 * atan((planeHeight/2) / cameraDistance)
    const vFov =
      2 * Math.atan(planeHeight / 2 / cameraDistance) * (180 / Math.PI);

    const camera = new THREE.PerspectiveCamera(vFov, 1, 0.1, 100);
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Resize handler
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    updateSize();

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // ✅ SHADER: Tela tesa con onde fluide tipo vento
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uIntensity: { value: waveIntensity },
            uSpeed: { value: waveSpeed },
          },
          vertexShader: `
            varying vec2 vUv;
            uniform float uTime;
            uniform float uIntensity;
            uniform float uSpeed;

            // Noise function per movimento organico
            float noise(vec2 p) {
              return sin(p.x * 10.0 + uTime * uSpeed) *
                     cos(p.y * 10.0 + uTime * uSpeed * 0.7) * 0.5 + 0.5;
            }

            void main() {
              vUv = uv;
              vec3 pos = position;

              // ✅ ONDA 1: Traveling wave da sinistra a destra
              float wave1 = sin(position.x * 3.0 - uTime * uSpeed * 2.0) *
                           cos(position.y * 2.0 + uTime * uSpeed * 1.5);

              // ✅ ONDA 2: Circular bubbles che appaiono e scompaiono
              vec2 center1 = vec2(sin(uTime * uSpeed * 0.5) * 0.5, cos(uTime * uSpeed * 0.3) * 0.5);
              vec2 center2 = vec2(cos(uTime * uSpeed * 0.4) * 0.5, sin(uTime * uSpeed * 0.6) * 0.5);

              float dist1 = length(position.xy - center1);
              float dist2 = length(position.xy - center2);

              float bubble1 = exp(-dist1 * 3.0) * sin(uTime * uSpeed * 2.0);
              float bubble2 = exp(-dist2 * 3.0) * cos(uTime * uSpeed * 1.7);

              // ✅ ONDA 3: Smooth organic noise
              float organicWave = noise(position.xy + uTime * uSpeed * 0.1) * 0.5;

              // ✅ Combina tutte le onde
              float totalDisplacement = (wave1 * 0.3 + bubble1 * 0.4 + bubble2 * 0.4 + organicWave * 0.3) * uIntensity;

              pos.z += totalDisplacement;

              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform float uTime;
            uniform float uIntensity;
            uniform float uSpeed;
            varying vec2 vUv;

            void main() {
              vec2 uv = vUv;

              // ✅ Leggera distorsione UV per seguire le onde
              float wave = sin(uv.x * 5.0 - uTime * uSpeed * 2.0) *
                          cos(uv.y * 4.0 + uTime * uSpeed * 1.5);

              uv.x += wave * uIntensity * 0.02;
              uv.y += wave * uIntensity * 0.015;

              // Sample texture
              vec4 texColor = texture2D(uTexture, uv);

              gl_FragColor = texColor;
            }
          `,
          transparent: true,
        });

        // Geometry con segments per smooth deformation
        // Size ridotto del 10% per lasciare padding (90% del viewport)
        const viewportScale = 0.9;
        const geometry = new THREE.PlaneGeometry(
          2 * viewportScale,
          2 * viewportScale,
          32,
          32
        );
        const mesh = new THREE.Mesh(geometry, material);

        meshRef.current = mesh;
        materialRef.current = material;
        scene.add(mesh);

        setIsReady(true);

        // Animation loop
        const animate = () => {
          if (material.uniforms.uTime) {
            material.uniforms.uTime.value += 0.016; // ~60fps
          }
          renderer.render(scene, camera);
          animationIdRef.current = requestAnimationFrame(animate);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );

    // Resize observer
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      resizeObserver.disconnect();
      renderer.dispose();
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, [imageUrl, waveIntensity, waveSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative block overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`block w-full h-full transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/20">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
            <div className="text-white/50 text-sm">Caricamento...</div>
          </div>
        </div>
      )}
    </div>
  );
}
