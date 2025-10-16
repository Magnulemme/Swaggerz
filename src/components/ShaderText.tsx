"use client"

import React, { useRef, useEffect, useState, useCallback, useId } from 'react';
import * as THREE from 'three';
import { sharedRenderer } from '@/lib/sharedRenderer';
import { shaderTextRenderer } from '@/lib/shaderTextRenderer';

interface ShaderTextProps {
  children?: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

interface TextDimensions {
  width: number;
  height: number;
}

const ShaderText: React.FC<ShaderTextProps> = ({
  children = "TEST",
  className = "",
  fontSize = "72px",
  fontWeight = "900"
}) => {
  const uniqueId = useId();
  const taskId = `shader-text-${uniqueId.replace(/:/g, '-')}`;
  const patternId = `shader-pattern-${uniqueId.replace(/:/g, '-')}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hiddenTextRef = useRef<SVGTextElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [textDimensions, setTextDimensions] = useState<TextDimensions>({
    width: 0,
    height: 0
  });
  const [isReady, setIsReady] = useState<boolean>(false);

  // Misura le dimensioni del testo nascosto
  const measureText = useCallback(() => {
    if (!hiddenTextRef.current) return;
    
    try {
      const bbox = hiddenTextRef.current.getBBox();
      
      if (bbox.width === 0 || bbox.height === 0) {
        setTimeout(measureText, 50);
        return;
      }

      const buffer = 0;
      const newDimensions = {
        width: Math.ceil(bbox.width + buffer),
        height: Math.ceil(bbox.height + buffer)
      };
      
      setTextDimensions(newDimensions);
      setIsReady(true);
    } catch {
      // Error measuring text
    }
  }, []);

  // Misura il testo al mount e quando cambia il contenuto
  useEffect(() => {
    setIsReady(false);
    const timer = setTimeout(() => {
      measureText();
    }, 50);
    
    return () => clearTimeout(timer);
  }, [children, fontSize, fontWeight, measureText]);

  // Funzione di animazione con gestione continua del tempo e throttling

  // Setup Three.js con sharedRenderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady || textDimensions.width === 0 || textDimensions.height === 0) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Imposta dimensioni canvas
    canvas.width = textDimensions.width;
    canvas.height = textDimensions.height;

    // Usa risorse condivise
    const { material, geometry } = shaderTextRenderer.getResources();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Salva i riferimenti
    sceneRef.current = scene;
    cameraRef.current = camera;
    materialRef.current = material;
    geometryRef.current = geometry;

    // Registra nel sharedRenderer (priorità 1 = alta, 30fps per testo)
    sharedRenderer.registerTask(
      taskId,
      scene,
      camera,
      canvas,
      {
        priority: 1,
        targetFPS: 30
      }
    );

    // Update dataUrl periodicamente
    const updateInterval = setInterval(() => {
      if (canvas) {
        try {
          const newDataUrl = canvas.toDataURL('image/png');
          setDataUrl(newDataUrl);
        } catch {
          // Error
        }
      }
    }, 66); // ~30fps (2 frames @ 60fps)

    return () => {
      clearInterval(updateInterval);
      sharedRenderer.unregisterTask(taskId);
      shaderTextRenderer.releaseResources();
    };
  }, [textDimensions, isReady, taskId]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      measureText();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureText]);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      {/* Canvas nascosto per generare lo shader */}
      <canvas
        ref={canvasRef}
        style={{
          display: 'none',
          position: 'absolute',
          pointerEvents: 'none'
        }}
        width={textDimensions.width || 1}
        height={textDimensions.height || 1}
      />

      {/* SVG con il testo che usa lo shader come pattern */}
      <svg
        ref={svgRef}
        width={textDimensions.width || 'auto'}
        height={textDimensions.height || 'auto'}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          overflow: 'visible',
          maxWidth: '100%',
          height: 'auto'
        }}
      >
        <defs>
          <pattern 
            id={patternId}
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={textDimensions.width || 1} 
            height={textDimensions.height || 1}
            patternContentUnits="userSpaceOnUse"
          >
            {dataUrl && isReady && (
              <image 
                href={dataUrl} 
                x="0"
                y="0"
                width={textDimensions.width}
                height={textDimensions.height}
                preserveAspectRatio="none"
              />
            )}
          </pattern>
        </defs>
        
        {/* Testo nascosto per il calcolo delle dimensioni */}
        <text
          ref={hiddenTextRef}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily="Jost, sans-serif"
          fill="transparent"
          stroke="none"
          style={{ opacity: 0, pointerEvents: 'none', position: 'absolute' }}
        >
          {children}
        </text>

        {/* Testo visibile con pattern shader applicato */}
        {isReady && dataUrl && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily="Jost, sans-serif"
            fill={`url(#${patternId})`}
            style={{ isolation: 'isolate' }}
          >
            {children}
          </text>
        )}
      </svg>
    </div>
  );
};

export default ShaderText;