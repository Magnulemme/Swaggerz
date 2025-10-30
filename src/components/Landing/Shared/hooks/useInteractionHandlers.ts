import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface UseInteractionHandlersProps {
  containerRef: React.RefObject<HTMLElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  materialRef: React.RefObject<THREE.ShaderMaterial | null>;
  isInitialized: boolean;
}

export const useInteractionHandlers = ({
  containerRef,
  canvasRef,
  materialRef,
  isInitialized,
}: UseInteractionHandlersProps) => {
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-10, -10));

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !isInitialized) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const updateMousePosition = (x: number, y: number) => {
      mouseRef.current.set(x, y);
      if (materialRef.current?.uniforms.uMouse) {
        materialRef.current.uniforms.uMouse.value.set(x, y);
      }
    };

    const resetMousePosition = () => {
      updateMousePosition(-10, -10);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height;
      updateMousePosition(x, y);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = 1.0 - (touch.clientY - rect.top) / rect.height;
        updateMousePosition(x, y);
      }
    };

    // Listen on container instead of canvas to allow text interaction
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', resetMousePosition);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', resetMousePosition);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', resetMousePosition);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', resetMousePosition);
    };
  }, [containerRef, canvasRef, materialRef, isInitialized]);

  return mouseRef;
};
