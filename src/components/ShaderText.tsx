"use client";

import React, { useRef, useEffect, useState, useCallback, useId } from "react";
import * as THREE from "three";
import { sharedRenderer } from "@/lib/sharedRenderer";
import { shaderTextRenderer } from "@/lib/shaderTextRenderer";

interface ShaderTextProps {
  children?: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
  fontFamily?: string; // Custom font family
  maxFontSize?: number; // Maximum font size in pixels (overrides fontSize max)
  maxHeight?: number; // Maximum height in pixels
}

interface TextDimensions {
  width: number;
  height: number;
  x: number;
  y: number;
}

const ShaderText: React.FC<ShaderTextProps> = ({
  children = "TEST",
  className = "",
  fontSize = "72px",
  fontWeight = "900",
  fontFamily = "var(--font-pastor-of-muppets), cursive",
  maxFontSize,
  maxHeight,
}) => {
  const uniqueId = useId();
  const taskId = `shader-text-${uniqueId.replace(/:/g, "-")}`;
  const patternId = `shader-pattern-${uniqueId.replace(/:/g, "-")}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hiddenTextRef = useRef<SVGTextElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const [dataUrl, setDataUrl] = useState<string>("");
  const [textDimensions, setTextDimensions] = useState<TextDimensions>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [isReady, setIsReady] = useState<boolean>(false);

  // Usa il fontSize come fornito, senza cap automatici
  const scaledFontSize = React.useMemo(() => {
    // Se maxFontSize è specificato, applicalo
    if (maxFontSize) {
      const fontSizeMatch = fontSize.match(/([\d.]+)px\)?$/);
      const originalMaxSize = fontSizeMatch ? parseFloat(fontSizeMatch[1]) : 72;
      const cappedMaxSize = Math.min(originalMaxSize, maxFontSize);
      return fontSize.replace(/([\d.]+)px\)?$/, `${cappedMaxSize}px)`);
    }

    // Altrimenti usa il fontSize originale senza modifiche
    return fontSize;
  }, [fontSize, maxFontSize]);

  // Misura le dimensioni del testo con il fontSize cappato
  const measureText = useCallback(() => {
    if (!hiddenTextRef.current || !svgRef.current) return;

    try {
      const bbox = hiddenTextRef.current.getBBox();

      if (bbox.width === 0 || bbox.height === 0) {
        setTimeout(measureText, 50);
        return;
      }

      // PROBLEMA: Pastor of Muppets ha decorazioni che escono dai bounds del glifo
      // Queste decorazioni non sono catturate da getBBox() né da getBoundingClientRect()
      // perché il browser non le considera parte "interattiva" del testo

      // SOLUZIONE: Per font decorativi, aggiungiamo uno spazio extra proporzionale
      // al fontSize solo per il canvas shader, non per il layout SVG
      const fontSizeMatch = scaledFontSize.match(/([\d.]+)px/);
      const currentFontSize = fontSizeMatch ? parseFloat(fontSizeMatch[1]) : 72;

      // 100% extra per le decorazioni - Pastor of Muppets ha decorazioni MOLTO estreme
      const decorationBuffer = currentFontSize * 0;

      console.log("ShaderText measurement:", {
        text: children,
        fontSize: currentFontSize,
        bboxWidth: bbox.width,
        buffer: decorationBuffer,
        finalWidth: bbox.width + decorationBuffer,
      });

      const newDimensions = {
        width: Math.ceil(bbox.width + decorationBuffer),
        height: Math.ceil(bbox.height),
        x: 0,
        y: 0,
      };

      setTextDimensions(newDimensions);
      setIsReady(true);
    } catch {
      // Error measuring text
    }
  }, [children, scaledFontSize]);

  // Misura il testo al mount e quando cambia il contenuto
  // Aspetta che i font siano caricati prima di misurare
  useEffect(() => {
    setIsReady(false);

    const measureAfterFontLoad = async () => {
      // Aspetta che tutti i font siano caricati
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;

        // Aspetta anche che il font specifico sia caricato
        if (fontFamily) {
          try {
            // Prova a caricare esplicitamente il font
            await document.fonts.load(
              `${fontWeight} ${scaledFontSize} ${fontFamily}`
            );
          } catch (e) {
            // Ignora errori di caricamento font
          }
        }

        // Doppio delay per sicurezza - lascia il browser renderizzare
        await new Promise((resolve) => setTimeout(resolve, 150));
        measureText();

        // Misura di nuovo dopo un altro delay per essere sicuri
        await new Promise((resolve) => setTimeout(resolve, 150));
        measureText();
      } else {
        // Fallback per browser che non supportano document.fonts
        setTimeout(() => {
          measureText();
        }, 300);
      }
    };

    measureAfterFontLoad();
  }, [children, fontSize, fontWeight, fontFamily, measureText, scaledFontSize]);

  // Funzione di animazione con gestione continua del tempo e throttling

  // Setup Three.js con sharedRenderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      !isReady ||
      textDimensions.width === 0 ||
      textDimensions.height === 0
    )
      return;

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
    sharedRenderer.registerTask(taskId, scene, camera, canvas, {
      priority: 1,
      targetFPS: 30,
    });

    // Update dataUrl periodicamente
    const updateInterval = setInterval(() => {
      if (canvas) {
        try {
          const newDataUrl = canvas.toDataURL("image/png");
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureText]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* Canvas nascosto per generare lo shader - più grande per coprire decorazioni */}
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
          position: "absolute",
          pointerEvents: "none",
        }}
        width={textDimensions.width || 1}
        height={textDimensions.height || 1}
      />

      {/* SVG con il testo che usa lo shader come pattern */}
      <svg
        ref={svgRef}
        width={textDimensions.width || "auto"}
        height={textDimensions.height || "auto"}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          overflow: "visible",
          width: "auto",
          height: "auto",
        }}
        viewBox={`0 0 ${textDimensions.width} ${textDimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            x={-(textDimensions.width * 0.25)}
            y={-(textDimensions.height * 0.25)}
            width={textDimensions.width * 1.5 || 1}
            height={textDimensions.height * 1.5 || 1}
            patternContentUnits="userSpaceOnUse"
          >
            {dataUrl && isReady && (
              <image
                href={dataUrl}
                x={-(textDimensions.width * 0.25)}
                y={-(textDimensions.height * 0.25)}
                width={textDimensions.width * 1.5}
                height={textDimensions.height * 1.5}
                preserveAspectRatio="none"
              />
            )}
          </pattern>
        </defs>

        {/* Testo nascosto per il calcolo delle dimensioni */}
        <text
          ref={hiddenTextRef}
          x={textDimensions.width / 2}
          y={textDimensions.height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={scaledFontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          fill="transparent"
          stroke="none"
          style={{ opacity: 0, pointerEvents: "none", position: "absolute" }}
        >
          {children}
        </text>

        {/* Testo visibile con pattern shader applicato e fontSize scalato */}
        {isReady && dataUrl && (
          <text
            x={textDimensions.width / 2}
            y={textDimensions.height / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={scaledFontSize}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            fill={`url(#${patternId})`}
            style={{ isolation: "isolate" }}
          >
            {children}
          </text>
        )}
      </svg>
    </div>
  );
};

export default ShaderText;
