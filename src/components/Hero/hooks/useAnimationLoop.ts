import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface UseAnimationLoopProps {
  rendererRef: React.RefObject<THREE.WebGLRenderer | null>;
  sceneRef: React.RefObject<THREE.Scene | null>;
  cameraRef: React.RefObject<THREE.OrthographicCamera | null>;
  materialRef: React.RefObject<THREE.ShaderMaterial | null>;
  isInitialized: boolean;
}

export const useAnimationLoop = ({
  rendererRef,
  sceneRef,
  cameraRef,
  materialRef,
  isInitialized,
}: UseAnimationLoopProps) => {
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInitialized) return;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (materialRef.current?.uniforms.uTime) {
        materialRef.current.uniforms.uTime.value += 0.016;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [rendererRef, sceneRef, cameraRef, materialRef, isInitialized]);

  return animationIdRef;
};
