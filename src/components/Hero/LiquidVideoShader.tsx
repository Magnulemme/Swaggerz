"use client";

import React, { useRef, useEffect, useState, useId } from 'react';
import * as THREE from 'three';
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

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef(new THREE.Vector2(-10, -10));
  const prevMouseRef = useRef(new THREE.Vector2(-10, -10));
  const animationIdRef = useRef<number | null>(null);
  const isMovingRef = useRef(0); // 0 = stopped, 1 = moving
  const targetMovingRef = useRef(0); // Target per lerp
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

      // WebGL Renderer dedicato per performance ottimali
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
        preserveDrawingBuffer: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

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
      videoTexture.format = THREE.RGBAFormat;
      videoTexture.generateMipmaps = false;

      // Shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uMouse: { value: mouseRef.current },
          uTime: { value: 0 },
          uTexture: { value: videoTexture },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uMouseMoving: { value: 0 }, // Inizia fermo
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
        renderer.setSize(width, height, false);
        material.uniforms.uResolution.value.set(width, height);
      };
      handleResize();

      // Animation loop dedicato con rendering diretto
      const animate = (time: number) => {
        animationIdRef.current = requestAnimationFrame(animate);

        // Smooth lerp per transizione fluida (velocità di fade: 0.05 = slow, 0.2 = fast)
        const lerpSpeed = 0.1;
        isMovingRef.current += (targetMovingRef.current - isMovingRef.current) * lerpSpeed;

        // Aggiorna gli uniform nel materiale
        if (material.uniforms.uMouseMoving) {
          material.uniforms.uMouseMoving.value = isMovingRef.current;
        }
        if (material.uniforms.uTime) {
          material.uniforms.uTime.value = time * 0.001;
        }

        // Render direttamente sul canvas WebGL
        renderer.render(scene, camera);
      };
      animationIdRef.current = requestAnimationFrame(animate);

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

        // Controlla se il mouse si è effettivamente mosso
        const dx = Math.abs(mouseRef.current.x - x);
        const dy = Math.abs(mouseRef.current.y - y);

        if (dx > 0.001 || dy > 0.001) {
          // Il mouse si è mosso!
          mouseRef.current.set(x, y);
          targetMovingRef.current = 1;

          // Clear timeout precedente
          if (stopTimeoutRef.current) {
            clearTimeout(stopTimeoutRef.current);
          }

          // Dopo 150ms di inattività, inizia il fade-out
          stopTimeoutRef.current = setTimeout(() => {
            targetMovingRef.current = 0;
            console.log('🎬 Mouse stopped - fading out effect');
          }, 150);
        }
      };

      const handleMouseLeave = () => {
        mouseRef.current.set(-10, -10);
        targetMovingRef.current = 0;
        console.log('🎬 Mouse left - fading out effect');

        if (stopTimeoutRef.current) {
          clearTimeout(stopTimeoutRef.current);
        }
      };

      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
      }

      // Set ready immediately after setup
      setIsReady(true);

      // Cleanup
      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        if (stopTimeoutRef.current) {
          clearTimeout(stopTimeoutRef.current);
          stopTimeoutRef.current = null;
        }

        resizeObserver.disconnect();
        window.removeEventListener('resize', handleResize);

        if (container) {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseleave', handleMouseLeave);
        }

        geometry.dispose();
        material.dispose();
        videoTexture.dispose();

        if (rendererRef.current) {
          rendererRef.current.dispose();
          rendererRef.current = null;
        }
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
  }, [containerRef, videoSrc]);

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
        style={{ pointerEvents: 'none', willChange: 'transform' }}
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
