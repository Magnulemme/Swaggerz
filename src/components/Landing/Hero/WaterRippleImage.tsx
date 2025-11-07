"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  waterRippleVertexShader,
  waterRippleFragmentShader,
} from "./shaders/waterRippleShader";

interface WaterRippleImageProps {
  texture: THREE.Texture | null;
  isActive: boolean;
  onReady?: () => void;
}

export default function WaterRippleImage({
  texture,
  isActive,
  onReady,
}: WaterRippleImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isActiveRef = useRef(isActive);
  const animateFnRef = useRef<(() => void) | null>(null);
  const hasNotifiedReady = useRef(false);

  // Aggiorna refs quando cambiano le props
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

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
      antialias: false, // Disabilitato per migliori performance
      premultipliedAlpha: true
    });

    // Check if context was created successfully
    const gl = renderer.getContext();
    if (!gl) {
      console.error('[WaterRipple] Failed to create WebGL context!');
      return;
    }

    renderer.setClearColor(0x000000, 0); // Trasparente
    renderer.setSize(width, height);
    renderer.setPixelRatio(1); // Ridotto a 1 per migliori performance
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

      let shouldContinue = false;

      try {

      // Aggiorna progress basato sullo stato
      if (isActiveRef.current && startTimeRef.current > 0) {
        // In transizione: anima da 0 a 1
        const elapsed = (Date.now() - startTimeRef.current) / 1800; // 1.8s duration
        const progress = Math.min(elapsed, 1);

        // Easing function
        const easedProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        materialRef.current.uniforms.uProgress.value = easedProgress;

        if (progress < 1) {
          shouldContinue = true; // Continua ad animare
        } else {
          materialRef.current.uniforms.uProgress.value = 1;
          startTimeRef.current = 0; // Reset per la prossima animazione
        }
      } else {
        // Non in transizione: mostra sempre immagine completa (sia attivo che background)
        materialRef.current.uniforms.uProgress.value = 1;
      }

        // Render frame
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      } catch (error) {
        console.error('[WaterRipple] Error during render:', error);
        // Ferma l'animazione in caso di errore
        animationFrameRef.current = null;
        return;
      }

      // Continua solo se necessario
      if (shouldContinue) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    animateFnRef.current = animate;
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

    // ResizeObserver per tracciare cambi di dimensione del container
    const resizeObserver = new ResizeObserver(() => {
      // Trigger resize update when container dimensions change
      handleResize();
    });

    resizeObserver.observe(container);

    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
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
      // Texture disposal è gestito dal parent component
    };
  }, []); // Solo al mount - isActive è tracciato tramite ref

  // Aggiorna la texture quando cambia la prop
  useEffect(() => {
    if (!materialRef.current || !containerRef.current || !texture) return;

    // Calculate aspect ratio to match object-fit: cover
    const imageAspect = texture.image.width / texture.image.height;
    const containerAspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;

    // Aggiorna gli uniforms del materiale
    materialRef.current.uniforms.uTexture.value = texture;
    materialRef.current.uniforms.uImageAspect.value = imageAspect;
    materialRef.current.uniforms.uContainerAspect.value = containerAspect;

    // Se isActive, avvia l'animazione
    if (isActive) {
      // Reset progress a 0 e avvia il timer
      startTimeRef.current = Date.now();
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = 0;
      }

      // Riavvia il loop di animazione se non è già in corso
      if (!animationFrameRef.current && animateFnRef.current) {
        animateFnRef.current();
      }
    }

    // Renderizza un singolo frame per mostrare la nuova texture
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      // Aspetta che il browser abbia effettivamente dipinto il frame sullo schermo
      // Doppio requestAnimationFrame assicura che il paint sia completato
      if (!hasNotifiedReady.current && onReady) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!hasNotifiedReady.current && onReady) {
              hasNotifiedReady.current = true;
              onReady();
            }
          });
        });
      }
    }
  }, [texture, onReady, isActive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: isActive ? 2 : 1 }}
    />
  );
}
