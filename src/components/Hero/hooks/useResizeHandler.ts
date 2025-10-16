import { useEffect } from 'react';
import * as THREE from 'three';

interface UseResizeHandlerProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  rendererRef: React.RefObject<THREE.WebGLRenderer | null>;
  materialRef: React.RefObject<THREE.ShaderMaterial | null>;
  isInitialized: boolean;
}

export const useResizeHandler = ({
  canvasRef,
  rendererRef,
  materialRef,
  isInitialized,
}: UseResizeHandlerProps) => {
  useEffect(() => {
    if (!canvasRef.current || !isInitialized) return;

    const canvas = canvasRef.current;
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    const handleResize = () => {
      const width = parentElement.clientWidth;
      const height = parentElement.clientHeight;

      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }

      if (materialRef.current?.uniforms.uResolution) {
        materialRef.current.uniforms.uResolution.value.set(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parentElement);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, rendererRef, materialRef, isInitialized]);
};
