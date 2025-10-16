import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders/liquidShader';

interface UseThreeSceneProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  videoElement: HTMLVideoElement | null;
  onReady?: () => void;
}

export const useThreeScene = ({ canvasRef, videoElement, onReady }: UseThreeSceneProps) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !videoElement || isInitialized) return;

    const canvas = canvasRef.current;
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
      premultipliedAlpha: false,
    });
    renderer.setClearColor(0x000000, 1);
    rendererRef.current = renderer;

    // Create video texture
    const videoTexture = new THREE.VideoTexture(videoElement);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.generateMipmaps = false;
    videoTexture.flipY = false;
    videoTexture.premultiplyAlpha = false;
    videoTexture.needsUpdate = true;
    videoTextureRef.current = videoTexture;

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uTime: { value: 0 },
        uTexture: { value: videoTexture },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader,
      fragmentShader,
    });
    materialRef.current = material;

    // Create plane
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initial resize
    const width = parentElement.clientWidth;
    const height = parentElement.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    material.uniforms.uResolution.value.set(width, height);

    setIsInitialized(true);
    onReady?.();

    // Cleanup
    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      videoTexture.dispose();
    };
  }, [canvasRef, videoElement, isInitialized, onReady]);

  return {
    sceneRef,
    cameraRef,
    rendererRef,
    materialRef,
    videoTextureRef,
    isInitialized,
  };
};
