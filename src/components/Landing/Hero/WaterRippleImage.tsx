"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  waterRippleVertexShader,
  waterRippleFragmentShader,
} from "./shaders/waterRippleShader";

// Debug: conta i WebGL context attivi
let activeContexts = 0;

interface WaterRippleImageProps {
  texture: THREE.Texture | null;
  isActive: boolean;
  isTransitioning: boolean;
  onReady?: () => void;
}

export default function WaterRippleImage({
  texture,
  isActive,
  isTransitioning,
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
  const isTransitioningRef = useRef(isTransitioning);
  const animateFnRef = useRef<(() => void) | null>(null);
  const hasNotifiedReady = useRef(false);

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

    console.log('[WaterRipple] Creating WebGL context', { isActive, width, height });

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

    activeContexts++;
    console.log('[WaterRipple] WebGL context created successfully', {
      isActive,
      activeContexts,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER)
    });

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
      if (isTransitioningRef.current && isActiveRef.current) {
        // Se il timer non è ancora partito (startTimeRef === 0), avvialo
        if (startTimeRef.current === 0) {
          startTimeRef.current = Date.now();
        }

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

    window.addEventListener("resize", handleResize);

    return () => {
      activeContexts--;
      console.log('[WaterRipple] Cleaning up WebGL context', { activeContexts });
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
      console.log('[WaterRipple] WebGL context disposed', { activeContexts });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo al mount - isActive è tracciato tramite ref

  // Aggiorna la texture quando cambia la prop
  useEffect(() => {
    if (!materialRef.current || !containerRef.current || !texture) return;

    console.log('[WaterRipple] Updating texture', {
      textureSize: `${texture.image.width}x${texture.image.height}`,
      hasImage: !!texture.image
    });

    // Calculate aspect ratio to match object-fit: cover
    const imageAspect = texture.image.width / texture.image.height;
    const containerAspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;

    // Aggiorna gli uniforms del materiale
    materialRef.current.uniforms.uTexture.value = texture;
    materialRef.current.uniforms.uImageAspect.value = imageAspect;
    materialRef.current.uniforms.uContainerAspect.value = containerAspect;

    // Renderizza un singolo frame per mostrare la nuova texture
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      // Notifica che la prima immagine è stata renderizzata
      if (!hasNotifiedReady.current && onReady) {
        console.log('[WaterRipple] First image rendered, notifying ready');
        hasNotifiedReady.current = true;
        onReady();
      }
    }
  }, [texture, onReady]);

  // Update progress when transitioning starts
  useEffect(() => {
    if (isTransitioning && isActive) {
      console.log('[WaterRipple] Starting transition', { isActive });
      // Reset timer to 0 - partirà nel loop animate
      startTimeRef.current = 0;
      if (materialRef.current) {
        materialRef.current.uniforms.uProgress.value = 0;
      }

      // Riavvia il loop di animazione se non è già in corso
      if (!animationFrameRef.current && animateFnRef.current) {
        console.log('[WaterRipple] Restarting animation loop');
        animateFnRef.current();
      }
    } else if (!isTransitioning && isActive) {
      console.log('[WaterRipple] Transition complete', { isActive });
    }
  }, [isTransitioning, isActive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: isActive ? 2 : 1 }}
    />
  );
}
