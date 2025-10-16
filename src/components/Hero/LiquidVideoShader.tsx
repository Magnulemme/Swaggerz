"use client";

import React, { useRef, useEffect, useState, useId } from 'react';
import * as THREE from 'three';
import { sharedRenderer } from '@/lib/sharedRenderer';
import { vertexShader, fragmentShader } from './shaders/liquidShader';

interface LiquidVideoShaderProps {
  videoSrc: string;
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

const LiquidVideoShader: React.FC<LiquidVideoShaderProps> = ({
  videoSrc,
  className = "",
  containerRef: externalContainerRef
}) => {
  const uniqueId = useId();
  const taskId = `liquid-video-${uniqueId.replace(/:/g, '-')}`;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef(new THREE.Vector2(-10, -10));

  // Use external container ref if provided, otherwise use internal
  const containerRef = externalContainerRef || internalContainerRef;

  // Main Three.js setup
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    let isSetup = false;

    const setupScene = () => {
      if (isSetup) return;
      isSetup = true;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      cameraRef.current = camera;

      // Video texture with optimized settings
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBFormat; // RGB instead of RGBA for better performance
      videoTexture.generateMipmaps = false; // Disable mipmaps for videos

      // Shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uMouse: { value: mouseRef.current },
          uTime: { value: 0 },
          uTexture: { value: videoTexture },
          uResolution: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader,
        fragmentShader,
      });
      materialRef.current = material;

      // Mesh
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Resize
      const handleResize = () => {
        const width = parentElement.clientWidth;
        const height = parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
        material.uniforms.uResolution.value.set(width, height);
      };
      handleResize();

      // Registra il task nel shared renderer (priorità 0 = massima, 60fps per hero video)
      sharedRenderer.registerTask(
        taskId,
        scene,
        camera,
        canvas,
        {
          priority: 0,
          targetFPS: 60
        }
      );

      // Update shader time uniform (il rendering è gestito dal sharedRenderer)
      let lastTime = 0;
      const updateUniforms = (time: number) => {
        if (material.uniforms.uTime) {
          const deltaTime = (time - lastTime) * 0.001;
          lastTime = time;
          material.uniforms.uTime.value += deltaTime;
        }
        requestAnimationFrame(updateUniforms);
      };
      requestAnimationFrame(updateUniforms);

      // Resize observer
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(parentElement);
      window.addEventListener('resize', handleResize);

      // Auto-play video (no intersection observer)
      if (video) {
        video.play().catch(() => {});
      }

      // Mouse events
      const container = containerRef.current;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        mouseRef.current.set(x, y);
      };

      const handleMouseLeave = () => {
        mouseRef.current.set(-10, -10);
      };

      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }

      // Set ready immediately after setup
      setIsReady(true);

      // Cleanup
      return () => {
        sharedRenderer.unregisterTask(taskId);

        resizeObserver.disconnect();
        window.removeEventListener('resize', handleResize);

        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', handleMouseLeave);
        }

        geometry.dispose();
        material.dispose();
        videoTexture.dispose();
      };
    };

    // Setup immediately if video is ready, otherwise wait
    if (video.readyState >= 2) {
      return setupScene();
    }

    const handleCanPlay = () => {
      setupScene();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, [containerRef, videoSrc, taskId]);

  const content = (
    <>
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute opacity-0 pointer-events-none w-1 h-1"
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        style={{ pointerEvents: 'none' }}
      />
      {!isReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-zinc-900 to-black animate-pulse pointer-events-none" />
      )}
    </>
  );

  if (externalContainerRef) {
    return content;
  }

  return (
    <div ref={internalContainerRef} className="absolute inset-0">
      {content}
    </div>
  );
};

export default LiquidVideoShader;
