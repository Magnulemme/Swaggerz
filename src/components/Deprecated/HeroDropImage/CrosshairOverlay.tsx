'use client'

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/constants/shaders';

const CrosshairOverlay: React.FC = () => {
  // 🎨 CONFIGURAZIONE CROSSHAIR - Modifica questi valori
  const BORDER_WIDTH = '4px';  // Spessore del bordo (es: '1px', '2px', '2.5px')
  const CROSSHAIR_SIZE = 'w-10 h-10';  // Dimensione (es: 'w-6 h-6', 'w-8 h-8')
  const GLOW_INTENSITY = '0 0 3px rgba(239,68,68,0.5)';  // Intensità del glow

  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationRef = useRef<number | null>(null);
  const [shaderDataUrl, setShaderDataUrl] = useState<string>('');

  // Setup Three.js shader
  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    if (rendererRef.current) {
      rendererRef.current.dispose();
    }

    const size = 64;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      preserveDrawingBuffer: true,
      antialias: true
    });

    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0.0 }
      },
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    rendererRef.current = renderer;
    sceneRef.current = scene;
    materialRef.current = material;

    const animate = (time: number): void => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current) return;

      materialRef.current.uniforms.uTime.value = time * 0.001;
      rendererRef.current.render(sceneRef.current, camera);

      if (canvas) {
        setShaderDataUrl(canvas.toDataURL());
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
    };
  }, []);

  return (
    <motion.div
      className="absolute -inset-3 z-30 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      {/* Canvas nascosto per generare lo shader */}
      <canvas
        ref={shaderCanvasRef}
        style={{
          display: 'none',
          position: 'absolute'
        }}
        width={64}
        height={64}
      />

      <div className="relative w-full h-full">
        {/* Angoli crosshair con stagger animation */}
        {[
          { position: "top-0 left-0", corners: "rounded-tl-3xl", delay: 0 },
          { position: "top-0 right-0", corners: "rounded-tr-3xl", delay: 0.1 },
          { position: "bottom-0 left-0", corners: "rounded-bl-3xl", delay: 0.3 },
          { position: "bottom-0 right-0", corners: "rounded-br-3xl", delay: 0.2 }
        ].map((corner, index) => (
          <motion.div
            key={index}
            className={`absolute ${corner.position} ${CROSSHAIR_SIZE} ${corner.corners}`}
            style={{
              borderLeftWidth: index % 2 === 0 ? BORDER_WIDTH : '0',
              borderRightWidth: index % 2 === 1 ? BORDER_WIDTH : '0',
              borderTopWidth: index < 2 ? BORDER_WIDTH : '0',
              borderBottomWidth: index >= 2 ? BORDER_WIDTH : '0',
              borderStyle: 'solid',
              borderColor: 'transparent',
              backgroundImage: shaderDataUrl ? `url(${shaderDataUrl})` : 'linear-gradient(135deg, #dc2626, #ef4444, #b91c1c)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundClip: 'border-box',
              WebkitMask: 'linear-gradient(white, white) padding-box, linear-gradient(white, white)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              filter: `drop-shadow(${GLOW_INTENSITY})`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: corner.delay + 0.4,
              ease: [0.23, 1, 0.320, 1]
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CrosshairOverlay;