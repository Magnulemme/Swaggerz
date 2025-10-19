import { useRef, useEffect, useId } from 'react';
import * as THREE from 'three';
import { sharedRenderer } from '@/lib/sharedRenderer';

interface UseSharedRendererOptions {
  priority?: number;
  targetFPS?: number;
  enableVisibilityTracking?: boolean;
  visibilityThreshold?: number;
}

/**
 * Hook personalizzato per gestire il rendering con sharedRenderer
 * Include IntersectionObserver automatico per lazy rendering
 */
export function useSharedRenderer(
  setup: () => {
    scene: THREE.Scene;
    camera: THREE.Camera;
    material: THREE.ShaderMaterial;
    geometry: THREE.BufferGeometry;
  },
  options: UseSharedRendererOptions = {}
) {
  const {
    priority = 5,
    targetFPS = 30,
    enableVisibilityTracking = true,
    visibilityThreshold = 0.1,
  } = options;

  const uniqueId = useId();
  const taskId = `shader-task-${uniqueId.replace(/:/g, '-')}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  // Setup Three.js e registrazione nel sharedRenderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Chiama la funzione di setup fornita dall'utente
    const { scene, camera, material, geometry } = setup();

    // Salva i riferimenti
    sceneRef.current = scene;
    materialRef.current = material;
    geometryRef.current = geometry;

    // Registra nel sharedRenderer con visibilità iniziale = false se tracking abilitato
    sharedRenderer.registerTask(taskId, scene, camera, canvas, {
      priority,
      targetFPS,
      visible: !enableVisibilityTracking, // Se tracking OFF, visibile subito
    });

    return () => {
      sharedRenderer.unregisterTask(taskId);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, [taskId, priority, targetFPS, enableVisibilityTracking, setup]);

  // IntersectionObserver per lazy rendering
  useEffect(() => {
    if (!enableVisibilityTracking || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        sharedRenderer.setTaskVisible(taskId, isVisible);
      },
      {
        threshold: visibilityThreshold,
        rootMargin: '50px', // Pre-render quando si avvicina al viewport
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [taskId, enableVisibilityTracking, visibilityThreshold]);

  return {
    containerRef,
    canvasRef,
    taskId,
    sceneRef,
    materialRef,
    geometryRef,
  };
}
