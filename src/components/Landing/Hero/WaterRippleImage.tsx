"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  waterRippleVertexShader,
  waterRippleFragmentShader,
} from "./shaders/waterRippleShader";

interface WaterRippleImageProps {
  imageSrc: string;
  isActive: boolean;
  isTransitioning: boolean;
  onLoadComplete?: () => void;
}

export default function WaterRippleImage({
  imageSrc,
  isActive,
  isTransitioning,
  onLoadComplete,
}: WaterRippleImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const textureRef = useRef<THREE.Texture | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader>(new THREE.TextureLoader());
  const isActiveRef = useRef(isActive);
  const isTransitioningRef = useRef(isTransitioning);
  const textureLoadedRef = useRef(false);

  // Aggiorna refs quando cambiano le props
  useEffect(() => {
    isActiveRef.current = isActive;
    isTransitioningRef.current = isTransitioning;
  }, [isActive, isTransitioning]);

  // Setup iniziale del canvas (una sola volta)
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      premultipliedAlpha: true
    });
    renderer.setClearColor(0x000000, 0); // Trasparente
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.objectFit = 'cover';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create shader material (senza texture inizialmente)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uProgress: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(width, height),
        },
        uCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uImageAspect: { value: 1.0 },
        uContainerAspect: { value: width / height },
      },
      vertexShader: waterRippleVertexShader,
      fragmentShader: waterRippleFragmentShader,
      transparent: true,
    });
    materialRef.current = material;

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      // Aggiorna progress basato sullo stato
      if (isTransitioningRef.current && isActiveRef.current && textureLoadedRef.current) {
        // In transizione e texture caricata: anima da 0 a 1
        const elapsed = (Date.now() - startTimeRef.current) / 1800; // 1.8s duration
        const progress = Math.min(elapsed, 1);

        // Easing function
        const easedProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        materialRef.current.uniforms.uProgress.value = easedProgress;

        if (progress >= 1) {
          materialRef.current.uniforms.uProgress.value = 1;
        }
      } else if (isTransitioningRef.current && isActiveRef.current && !textureLoadedRef.current) {
        // In transizione ma texture non ancora caricata: resta trasparente
        materialRef.current.uniforms.uProgress.value = 0;
      } else {
        // Non in transizione: mostra sempre immagine completa (sia attivo che background)
        materialRef.current.uniforms.uProgress.value = 1;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !materialRef.current)
        return;

      const newWidth = containerRef.current.offsetWidth;
      const newHeight = containerRef.current.offsetHeight;

      rendererRef.current.setSize(newWidth, newHeight);
      materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      materialRef.current.uniforms.uContainerAspect.value = newWidth / newHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (textureRef.current) {
        textureRef.current.dispose();
      }
    };
  }, []); // Solo al mount

  // Carica/aggiorna la texture quando cambia imageSrc
  useEffect(() => {
    if (!materialRef.current) return;

    // Segna texture come non caricata
    textureLoadedRef.current = false;

    // Dispose della vecchia texture
    if (textureRef.current) {
      textureRef.current.dispose();
    }

    const textureLoader = textureLoaderRef.current;
    const texture = textureLoader.load(imageSrc, (loadedTexture) => {
      if (!materialRef.current || !containerRef.current) return;

      // Calculate aspect ratio to match object-fit: cover
      const imageAspect = loadedTexture.image.width / loadedTexture.image.height;
      const containerAspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;

      // Aggiorna gli uniforms del materiale
      materialRef.current.uniforms.uTexture.value = texture;
      materialRef.current.uniforms.uImageAspect.value = imageAspect;
      materialRef.current.uniforms.uContainerAspect.value = containerAspect;

      // Segna texture come caricata
      textureLoadedRef.current = true;

      onLoadComplete?.();
    });

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    textureRef.current = texture;

  }, [imageSrc, onLoadComplete]);

  // Update progress when transitioning starts
  useEffect(() => {
    if (isTransitioning && isActive) {
      startTimeRef.current = Date.now();
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = 0;
      }
    }
  }, [isTransitioning, isActive, imageSrc]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: isActive ? 2 : 1 }}
    />
  );
}
