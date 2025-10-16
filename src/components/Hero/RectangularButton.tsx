import React, { useRef, useEffect, useState, useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { sharedRenderer } from '@/lib/sharedRenderer';
import { vertexShader, darkFragmentShader } from '@/constants/shaders';

interface RectangularButtonProps {
  text?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
}

const RectangularButton: React.FC<RectangularButtonProps> = ({
  text = "SCOPRI LA GALLERIA",
  onClick,
  buttonRef,
  isHovered = false,
  setIsHovered
}) => {
  const uniqueId = useId();
  const taskId = `rectangular-button-${uniqueId.replace(/:/g, '-')}`;

  const width = 240;
  const height = 64;

  // Shader background refs
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [shaderDataUrl, setShaderDataUrl] = useState<string>('');
  const timeRef = useRef<number>(0);

  // Setup Three.js con sharedRenderer
  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    canvas.width = width;
    canvas.height = height;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: darkFragmentShader,
      uniforms: {
        uTime: { value: 0.0 }
      },
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = scene;
    materialRef.current = material;

    // Registra nel sharedRenderer (priorità 2 = media, 30fps)
    sharedRenderer.registerTask(
      taskId,
      scene,
      camera,
      canvas,
      {
        priority: 2,
        targetFPS: 30
      }
    );

    // Update dataUrl e uTime
    const updateInterval = setInterval(() => {
      if (canvas) {
        try {
          setShaderDataUrl(canvas.toDataURL());

          if (materialRef.current) {
            timeRef.current += 0.033;
            materialRef.current.uniforms.uTime.value = timeRef.current;
          }
        } catch {
          // Error
        }
      }
    }, 66); // ~30fps

    return () => {
      clearInterval(updateInterval);
      sharedRenderer.unregisterTask(taskId);
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
    };
  }, [width, height, taskId]);

  return (
    <div
      className="relative"
      style={{
        width,
        height,
      }}
    >
      {/* Canvas nascosto per generare lo shader */}
      <canvas
        ref={shaderCanvasRef}
        style={{
          display: 'none',
          position: 'absolute'
        }}
        width={width}
        height={height}
      />

      {/* Glow esterno per transizione morbida */}
      <motion.div
        className="absolute rounded-2xl pointer-events-none"
        style={{
          width: width + 40,
          height: height + 40,
          left: -20,
          top: -20,
          backgroundImage: `radial-gradient(ellipse,
            rgba(249, 115, 22, 0.3) 0%,
            rgba(239, 68, 68, 0.2) 40%,
            rgba(234, 179, 8, 0.1) 60%,
            transparent 80%
          )`,
          filter: 'blur(12px)',
          opacity: isHovered ? 0.8 : 0.5
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      <motion.button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered?.(true)}
        onMouseLeave={() => setIsHovered?.(false)}
        className="absolute group/btn focus:outline-none rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center gap-3 px-6"
        style={{
          width,
          height,
          left: 0,
          top: 0,
          backgroundImage: shaderDataUrl
            ? `url(${shaderDataUrl})`
            : 'linear-gradient(to bottom right, rgb(239, 68, 68), rgb(249, 115, 22), rgb(234, 179, 8))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: `
            0 0 20px rgba(249, 115, 22, 0.4),
            0 0 40px rgba(239, 68, 68, 0.3),
            0 8px 32px rgba(0, 0, 0, 0.3)
          `
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: `
            0 0 30px rgba(249, 115, 22, 0.6),
            0 0 60px rgba(239, 68, 68, 0.4),
            0 12px 48px rgba(0, 0, 0, 0.4)
          `
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Testo del button */}
        <span className="text-white font-bold text-sm tracking-wider uppercase">
          {text}
        </span>

        {/* Freccia */}
        <ArrowRight className="size-5 text-white" />
      </motion.button>
    </div>
  );
};

export default RectangularButton;
