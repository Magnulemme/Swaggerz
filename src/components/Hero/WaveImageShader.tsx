"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  waveVertexShader,
  waveFragmentShader,
  SHADER_CONSTANTS,
  createShaderUniforms,
} from "./shaders";

interface WaveImageShaderProps {
  imageUrl: string;
  className?: string;
  aspectRatio?: number;
  amplitude?: number;
  waveSpeed?: number;
}

export function WaveImageShader({
  imageUrl,
  className = "",
  aspectRatio = 2 / 3,
  amplitude = 0.12,
  waveSpeed = 0.4,
}: WaveImageShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const geometryDimensionsRef = useRef({ width: 1, height: 1 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const targetAmplitudeRef = useRef(0); // Amplitude target (0 quando non hover, amplitude quando hover)
  const currentAmplitudeRef = useRef(0); // Amplitude corrente (interpolata)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera: FOV ridotto per vedere più contenuto (effetto zoom-out)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.0;
    cameraRef.current = camera;

    // Resize handler
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();

      // Update material resolution uniform
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(
          rect.width,
          rect.height
        );
      }

      // Update mesh dimensions to fill viewport with perspective compensation
      if (meshRef.current && geometryDimensionsRef.current) {
        const distance = camera.position.z;
        const vFov = (camera.fov * Math.PI) / 180;
        const planeHeight = 2 * Math.tan(vFov / 2) * distance;
        const planeWidth = planeHeight * camera.aspect;

        meshRef.current.scale.set(
          (planeWidth / geometryDimensionsRef.current.width) * 1,
          (planeHeight / geometryDimensionsRef.current.height) * 1,
          1
        );
      }
    };
    updateSize();

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // Shader con onde - inizia con amplitude 0 (attivato solo al hover)
        const uniforms = createShaderUniforms(
          texture,
          0, // amplitude: parte da 0, viene animata al hover
          2.5, // waveLength: onde più ampie e sicure
          waveSpeed, // speed: personalizzabile per ogni card
          aspectRatio
        );

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: waveVertexShader,
          fragmentShader: waveFragmentShader,
          transparent: true,
        });

        // Geometry: plane che riempie il viewport
        const distance = camera.position.z;
        const vFov = (camera.fov * Math.PI) / 180;
        const planeHeight = 2 * Math.tan(vFov / 2) * distance;
        const planeWidth = planeHeight * camera.aspect;

        // Salva le dimensioni per il resize
        geometryDimensionsRef.current = {
          width: planeWidth,
          height: planeHeight,
        };

        // Geometria semplice - gli angoli arrotondati sono gestiti nel fragment shader
        const geometry = new THREE.PlaneGeometry(
          planeWidth,
          planeHeight,
          32,
          32
        );

        const mesh = new THREE.Mesh(geometry, material);

        // Apply perspective scale factor to prevent clipping
        const scaleFactor = SHADER_CONSTANTS.PERSPECTIVE_SCALE_FACTOR;
        mesh.scale.set(1, 1, 1);

        // Trasla il mesh verso il basso per eliminare il gap inferiore
        const bottomGap = (1 - scaleFactor) * planeHeight;
        mesh.position.y = -bottomGap;

        // Nessuna rotazione - camera perfettamente frontale per allineamento preciso
        // mesh.rotation.y = 0.02; // Rimossa per evitare disallineamento
        // mesh.rotation.x = 0.01; // Rimossa per evitare disallineamento

        // Update resolution uniform
        material.uniforms.uResolution.value.set(
          container.getBoundingClientRect().width,
          container.getBoundingClientRect().height
        );

        meshRef.current = mesh;
        materialRef.current = material;
        scene.add(mesh);

        setIsReady(true);

        // Animation loop con smooth amplitude transition
        const animate = () => {
          // Usa materialRef per accesso consistente
          const mat = materialRef.current;
          if (!mat) return;

          if (mat.uniforms.uTime) {
            mat.uniforms.uTime.value += 0.016;
          }

          // Smooth lerp per amplitude - fade in/out elegante
          const lerpSpeed = 0.08; // Velocità transizione (più basso = più smooth)
          currentAmplitudeRef.current +=
            (targetAmplitudeRef.current - currentAmplitudeRef.current) * lerpSpeed;

          // Aggiorna amplitude nello shader
          if (mat.uniforms.uAmplitude) {
            mat.uniforms.uAmplitude.value = currentAmplitudeRef.current;
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

    // Mouse move handler per interattività
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Normalizza coordinate mouse da -1 a 1
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value.set(
          mouseRef.current.x,
          mouseRef.current.y
        );
      }
    };

    // Mouse enter handler - attiva effetto
    const handleMouseEnter = () => {
      setIsHovered(true);
      targetAmplitudeRef.current = amplitude; // Attiva effetto
    };

    // Mouse leave handler - disattiva effetto
    const handleMouseLeave = () => {
      setIsHovered(false);
      targetAmplitudeRef.current = 0; // Disattiva effetto

      if (materialRef.current) {
        // Reset mouse position
        materialRef.current.uniforms.uMouse.value.lerp(
          new THREE.Vector2(0, 0),
          0.1
        );
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Resize observer
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      renderer.dispose();
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, [imageUrl, aspectRatio, amplitude, waveSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative block w-full h-full ${className}`}
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
