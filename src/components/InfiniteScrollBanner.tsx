"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const phrases: string[] = [
  "STREET VIBES ONLY",
  "URBAN CULTURE", 
  "SWAGGERZ LIFESTYLE",
  "MADE IN FIRENZE",
  "DIGITAL ART MEETS FASHION",
  "STREETWEAR REVOLUTION",
  "AUTHENTIC STYLE",
  "UNDERGROUND CULTURE",
  "FRESH DROPS DAILY",
  "STREET FASHION DNA"
];

// Il tuo vertex shader originale
const vertexShader: string = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader ottimizzato per testo: luminoso e adattivo
const fragmentShader: string = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.4;
    
    // Onde calibrate per testo: privilegia movimento orizzontale
    float mainWave = sin(uv.x * 1.8 - time * 1.0);  // Onda principale orizzontale
    float verticalWave = sin(uv.y * 8.0 + time * 0.6) * 0.3;  // Minima variazione verticale
    float diagonalWave = cos((uv.x * 2.0 + uv.y * 0.5) + time * 1.3) * 0.4;
    float pulseWave = sin(time * 2.0) * 0.2;  // Pulsazione globale
    
    // Pattern semplice e visibile
    float pattern = (mainWave + verticalWave + diagonalWave) * 0.4 + 0.5;
    
    // 3 colori bilanciati: rosso, arancione, giallo
    vec3 brightRed = vec3(1.0, 0.2, 0.2);      // Rosso puro
    vec3 vibrantOrange = vec3(1.0, 0.5, 0.0);  // Arancione puro
    vec3 sunnyYellow = vec3(1.0, 0.8, 0.0);    // Giallo puro
    
    // Selezione colore semplice - 3 zone uguali (33% ciascuna)
    vec3 color;
    float colorIndex = fract(pattern + time * 0.15) * 3.0;
    
    if (colorIndex < 1.0) {
      // Rosso -> Arancione
      color = mix(brightRed, vibrantOrange, fract(colorIndex));
    } else if (colorIndex < 2.0) {
      // Arancione -> Giallo
      color = mix(vibrantOrange, sunnyYellow, fract(colorIndex));
    } else {
      // Giallo -> Rosso (chiude il ciclo)
      color = mix(sunnyYellow, brightRed, fract(colorIndex));
    }
    
    // Boost luminosità per visibilità ottimale
    float brightness = 1.1 + sin(time * 1.5 + uv.x * 3.0) * 0.1;
    color *= brightness;
    
    // Saturazione extra per colori vivaci
    color = mix(vec3(dot(color, vec3(0.299, 0.587, 0.114))), color, 1.3);
    
    // Clamp per evitare over-saturation
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ShaderBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true 
    });
    
    const rect = currentMount.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    currentMount.appendChild(renderer.domElement);

    // Shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 }
      }
    });

    // Fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    materialRef.current = material;

    // Animation loop
    const animate = (time: number): void => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = time * 0.001;
      }
      
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = (): void => {
      if (!currentMount || !rendererRef.current) return;
      
      const rect = currentMount.getBoundingClientRect();
      rendererRef.current.setSize(rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (currentMount && rendererRef.current?.domElement) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" style={{ zIndex: 1 }} />;
};

interface TextPosition {
  phrase: string;
  x: number;
  width: number;
}

const InfiniteScrollBanner: React.FC = () => {
  const [uniqueId] = useState<string>(() => `text-mask-${Math.random().toString(36).substr(2, 9)}`);
  const [textPositions, setTextPositions] = useState<TextPosition[]>([]);
  const [totalWidth, setTotalWidth] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Crea un SVG temporaneo per misurare le larghezze del testo
    const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tempSvg.style.position = 'absolute';
    tempSvg.style.visibility = 'hidden';
    document.body.appendChild(tempSvg);

    const positions: TextPosition[] = [];
    let currentX = 0;
    const spacing = 80; // Spaziatura tra le frasi

    phrases.forEach((phrase) => {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("font-family", "Arial Black, sans-serif");
      text.setAttribute("font-size", "28");
      text.setAttribute("font-weight", "900");
      text.setAttribute("letter-spacing", "0.3em");
      text.textContent = phrase.toUpperCase();
      
      tempSvg.appendChild(text);
      const bbox = text.getBBox();
      const width = bbox.width;
      
      positions.push({
        phrase: phrase.toUpperCase(),
        x: currentX,
        width: width
      });
      
      currentX += width + spacing;
      tempSvg.removeChild(text);
    });

    document.body.removeChild(tempSvg);
    
    setTextPositions(positions);
    setTotalWidth(currentX);
  }, []);

  // Velocità dell'animazione basata sulla larghezza totale
  const animationDuration = totalWidth > 0 ? (totalWidth / 50) : 30; // 50px al secondo

  return (
    <div className="relative overflow-hidden h-32 bg-black">
      {/* Shader Background - Fisso */}
      <ShaderBackground />

      {/* SVG con maschera corretta per il testo scorrevole */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ zIndex: 2 }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Maschera corretta */}
          <mask id={uniqueId}>
            {/* Sfondo bianco = opaco (mostra il rettangolo nero = sfondo nero) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white"/>
            
            {/* Gruppo animato con testo nero = trasparente (mostra lo shader) */}
            <g 
              className="text-scroll-group"
              style={{
                animation: `infiniteScroll ${animationDuration}s linear infinite`
              }}
            >
              {/* Prima serie di frasi */}
              {textPositions.map((item, index) => (
                <text
                  key={`first-${index}`}
                  x={item.x}
                  y="50%"
                  dominantBaseline="middle"
                  fontFamily="Arial Black, sans-serif"
                  fontSize="28"
                  fontWeight="900"
                  letterSpacing="0.3em"
                  fill="black"
                >
                  {item.phrase}
                </text>
              ))}
              
              {/* Seconda serie per loop infinito */}
              {textPositions.map((item, index) => (
                <text
                  key={`second-${index}`}
                  x={totalWidth + item.x}
                  y="50%"
                  dominantBaseline="middle"
                  fontFamily="Arial Black, sans-serif"
                  fontSize="28"
                  fontWeight="900"
                  letterSpacing="0.3em"
                  fill="black"
                >
                  {item.phrase}
                </text>
              ))}
            </g>
          </mask>
        </defs>
        
        {/* Rettangolo nero con maschera applicata */}
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          fill="black" 
          mask={`url(#${uniqueId})`}
        />
      </svg>

      {/* Gradient overlay ai bordi (opzionale) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <style jsx>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }

        /* Pausa su hover */
        svg:hover .text-scroll-group {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrollBanner;