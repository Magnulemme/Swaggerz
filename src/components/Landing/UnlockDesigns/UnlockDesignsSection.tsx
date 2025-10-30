"use client";

import React, { useRef, useEffect, useState, useId, useMemo } from "react";
import Image from "next/image";
import ShaderText from "@/components/ShaderText";
import CircularDiagram from "./CircularDiagram";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { exclusiveNFTs } from "@/constants/nftCollections";
import * as THREE from "three";
import { sharedRenderer } from "@/lib/sharedRenderer";
import { vertexShader, fragmentShader } from "@/constants/shaders";
import { useJostAlignment } from "@/hooks/useAlignedFontSize";

export default function UnlockDesignsSection() {
  const uniqueId = useId();

  const [shaderDataUrls, setShaderDataUrls] = useState<string[]>(["", "", ""]);
  const canvasRef0 = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRefs = useMemo(() => [canvasRef0, canvasRef1, canvasRef2], []);
  const materialsRef = useRef<THREE.ShaderMaterial[]>([]);
  const timeRefs = useRef<number[]>([0, 1, 2]); // Offset iniziali diversi

  // Ref e hook per allineamento font Jost -> ShaderText
  const jostTitleRef = useRef<HTMLHeadingElement>(null);
  const alignedFontSize = useJostAlignment(jostTitleRef);

  // Setup Three.js con sharedRenderer per tutti i cerchi
  useEffect(() => {
    const geometries: THREE.PlaneGeometry[] = [];
    const materials: THREE.ShaderMaterial[] = [];
    const taskIds: string[] = [];

    // Setup per ogni canvas con sharedRenderer
    canvasRefs.forEach((canvasRef, index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const taskId = `unlock-circle-${uniqueId.replace(/:/g, "-")}-${index}`;
      taskIds.push(taskId);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      canvas.width = 48;
      canvas.height = 48;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: timeRefs.current[index] },
        },
        transparent: true,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      materialsRef.current[index] = material;
      geometries.push(geometry);
      materials.push(material);

      // Registra nel sharedRenderer (priorità 5 = decorativo, 20fps)
      sharedRenderer.registerTask(taskId, scene, camera, canvas, {
        priority: 5,
        targetFPS: 20,
      });
    });

    // Update dataUrls e uTime per tutti i canvas
    const updateInterval = setInterval(() => {
      const newDataUrls: string[] = [];

      canvasRefs.forEach((canvasRef, index) => {
        const canvas = canvasRef.current;
        const material = materialsRef.current[index];

        if (canvas && material) {
          try {
            newDataUrls[index] = canvas.toDataURL();
            timeRefs.current[index] += 0.05; // ~20fps
            material.uniforms.uTime.value = timeRefs.current[index];
          } catch {
            newDataUrls[index] = "";
          }
        } else {
          newDataUrls[index] = "";
        }
      });

      setShaderDataUrls(newDataUrls);
    }, 100); // ~20fps

    return () => {
      clearInterval(updateInterval);
      taskIds.forEach((id) => sharedRenderer.unregisterTask(id));
      geometries.forEach((geometry) => geometry?.dispose());
      materials.forEach((material) => material?.dispose());
    };
  }, [uniqueId, canvasRefs]);

  return (
    <section className="w-full py-16 lg:py-24">
      {/* Canvas nascosti per generare gli shader */}
      {canvasRefs.map((ref, index) => (
        <canvas
          key={index}
          ref={ref}
          style={{
            display: "none",
            position: "absolute",
          }}
          width={48}
          height={48}
        />
      ))}

      {/* Layout a schermo intero */}
      <div className="relative grid xl:grid-cols-2 gap-12 xl:gap-16 items-center max-w-7xl mx-auto md:px-4">
        {/* Colonna 1: Header */}
        <div className="order-2 xl:order-2 text-center">
          <div className="mb-6 flex flex-col items-center">
            <h2
              ref={jostTitleRef}
              className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-2 font-jost tracking-tight leading-none"
            >
              Sblocca Design
            </h2>
            <div className="w-fit">
              <ShaderText fontSize={alignedFontSize || "72px"} fontWeight="900">
                Esclusivi
              </ShaderText>
            </div>
          </div>

          <p className="text-zinc-400 text-lg max-w-prose mx-auto mb-8">
            Possiedi l&apos;NFT, stampa il design. Solo tu puoi indossarlo
            finché non decidi di rivenderlo.
          </p>

          {/* NFT Preview Card Stack */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-32 md:w-28 md:h-36 lg:w-32 lg:h-40">
              {exclusiveNFTs.slice(0, 3).map((nft, index) => (
                <div
                  key={nft.id}
                  className="absolute group rounded-xl overflow-hidden border-2 border-zinc-800 hover:border-purple-500/50 transition-all duration-300 shadow-2xl"
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `rotate(${(index - 1) * 6}deg) translateY(${
                      index * 3
                    }px)`,
                    zIndex: 3 - index,
                    left: `${index * 20}px`,
                  }}
                >
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <AnimatedButton
              href="/nft-collections"
              size="md"
              className="bg-black/40"
            >
              Esplora la galleria
            </AnimatedButton>
          </div>
        </div>

        {/* Colonna 2: Diagramma Circolare */}
        <div className="order-1">
          <CircularDiagram shaderDataUrls={shaderDataUrls} />
        </div>
      </div>
    </section>
  );
}
