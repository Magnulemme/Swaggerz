import React, { useRef, useEffect, useState, useId } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { sharedRenderer } from '@/lib/sharedRenderer';
import { vertexShader, darkFragmentShader } from '@/constants/shaders';

interface CircularButtonProps {
  text?: string;
  onClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  isHovered?: boolean;
  setIsHovered?: (hovered: boolean) => void;
}

const CircularButton: React.FC<CircularButtonProps> = ({
  text = "SCOPRI - LA - SWAG - GALLERIA -",
  onClick,
  buttonRef,
  isHovered = false,
  setIsHovered
}) => {
  const uniqueId = useId();
  const taskId = `circular-button-${uniqueId.replace(/:/g, '-')}`;

  const size = 140;
  const center = size / 2;
  const textRadius = 44;

  // Calcola la spaziatura ottimale per riempire il cerchio
  const circumference = 2 * Math.PI * textRadius;
  const targetCoverage = 0.90; // Copri il 90% del perimetro

  // Separa parole e calcola spazio necessario per le lettere
  const words = text.split(' ');
  const totalChars = text.replace(/\s/g, '').length; // Conta solo le lettere
  const numSpaces = words.length; // Numero di spazi totali (circolare)

  // Stima larghezza base: ~9px per lettera + letter-spacing
  const baseCharWidth = 9.8;
  const totalCharWidth = totalChars * baseCharWidth;

  // Calcola word-spacing in px
  const availableForSpaces = (circumference * targetCoverage) - totalCharWidth;
  const wordSpacingPx = numSpaces > 0 ? availableForSpaces / numSpaces : 0;

  // Aggiungi spazio dopo l'ultima parola per chiudere il cerchio
  const textWithTrailingSpace = text + ' ';

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

    canvas.width = size;
    canvas.height = size;

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

    // Registra nel sharedRenderer (priorità 2 = media, 30fps per bottoni interattivi)
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
            timeRef.current += 0.033; // ~30fps
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
  }, [size, taskId]);

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Canvas nascosto per generare lo shader */}
      <canvas
        ref={shaderCanvasRef}
        style={{
          display: 'none',
          position: 'absolute'
        }}
        width={size}
        height={size}
      />

      {/* Anello di glow esterno per transizione morbida */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size + 40,
          height: size + 40,
          left: -20,
          top: -20,
          backgroundImage: `radial-gradient(circle,
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
        className="absolute group/btn focus:outline-none rounded-full p-0 overflow-hidden cursor-pointer"
        style={{
          width: size,
          height: size,
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
        {/* Testo rotante con SVG textPath */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: 'visible', pointerEvents: 'none' }}
        >
          <defs>
            <path
              id="textCircle"
              d={`
                M ${center}, ${center}
                m -${textRadius}, 0
                a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0
                a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0
              `}
              fill="none"
            />
          </defs>
          
          <g>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from={`0 ${center} ${center}`}
              to={`360 ${center} ${center}`}
              dur="10s"
              repeatCount="indefinite"
            />
            <text
              className="text-[14px] font-bold uppercase fill-white"
              style={{ 
                letterSpacing: '0.05em',
                wordSpacing: `${Math.max(0, wordSpacingPx)}px`,
                fontWeight: 700
              }}
            >
              <textPath
                href="#textCircle"
                startOffset="0%"
                textAnchor="start"
              >
                {textWithTrailingSpace} 
              </textPath>
            </text>
          </g>
        </svg>

        {/* Cerchio centrale con freccia statica */}
        <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-transparent flex items-center justify-center">
          <ArrowRight className="size-12 text-white font-bold" style={{ rotate: '-45deg' }} />
        </div>
      </motion.button>
    </div>
  );
};

export default CircularButton;