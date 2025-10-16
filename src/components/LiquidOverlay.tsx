"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface LiquidOverlayProps {
  className?: string;
  videoElement?: HTMLVideoElement | null;
}

const LiquidOverlay: React.FC<LiquidOverlayProps> = ({ className = "", videoElement }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(-10, -10));
  const animationIdRef = useRef<number | null>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const parentElement = canvas.parentElement;
    if (!parentElement) return;

    console.log('LiquidOverlay: initializing', { hasVideo: !!videoElement });

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup (orthographic for 2D effect)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Create video texture if video element is provided
    let videoTexture: THREE.VideoTexture | null = null;
    if (videoElement) {
      videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBAFormat;
      videoTextureRef.current = videoTexture;
    }

    // Shader material with simple distortion effect
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uTime: { value: 0 },
        uTexture: { value: videoTexture },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 uMouse;
        uniform float uTime;
        uniform sampler2D uTexture;

        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Distanza dal mouse
          float dist = distance(uv, uMouse);

          // Influenza in base alla distanza (raggio di 0.3)
          float influence = smoothstep(0.3, 0.0, dist);

          // Distorsione semplice: spingi i pixel verso l'esterno dal mouse
          vec2 direction = uv - uMouse;
          vec2 distortion = direction * influence * 0.05;

          // Coordinate distorte
          vec2 distortedUv = uv + distortion;

          // Campiona il video con le coordinate distorte
          vec4 color = texture2D(uTexture, distortedUv);

          // Aggiungi un bordo colorato per vedere l'effetto
          float edge = influence * 0.5;
          color.rgb += vec3(0.2, 0.4, 0.8) * edge;

          gl_FragColor = color;
        }
      `,
    });
    materialRef.current = material;

    // Create plane geometry that fills the canvas
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Resize handler
    const handleResize = () => {
      const width = parentElement.clientWidth;
      const height = parentElement.clientHeight;

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    // Mouse move handler - convert to normalized coordinates (0-1)
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height; // Flip Y

      mouseRef.current.set(x, y);

      if (material.uniforms.uMouse) {
        material.uniforms.uMouse.value.set(x, y);
      }
    };

    // Mouse leave handler - move effect off screen
    const handleMouseLeave = () => {
      mouseRef.current.set(-10, -10);
      if (material.uniforms.uMouse) {
        material.uniforms.uMouse.value.set(-10, -10);
      }
    };

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (material.uniforms.uTime) {
        material.uniforms.uTime.value += 0.016; // ~60fps
      }

      renderer.render(scene, camera);
    };

    // Initialize
    handleResize();
    animate();

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // ResizeObserver for container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parentElement);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (videoTextureRef.current) {
        videoTextureRef.current.dispose();
      }
    };
  }, [videoElement]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full rounded-3xl ${className}`}
    />
  );
};

export default LiquidOverlay;
