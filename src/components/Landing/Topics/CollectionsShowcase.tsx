"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { CollectionCard } from "./CollectionCard";
import { SectionTitle } from "../SectionTitle";

interface Collection {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

const defaultCollections: Collection[] = [
  {
    title: "Essentials",
    subtitle: "Timeless Basics",
    imageUrl: "/mockups/essentials.png",
  },
  {
    title: "Generative Art",
    subtitle: "Digital Collection",
    imageUrl: "/mockups/generative.png",
  },
  {
    title: "Retrò",
    subtitle: "Vintage Collection",
    imageUrl: "/mockups/retro.png",
  },
];

export function CollectionsShowcase({
  collections = defaultCollections,
}: {
  collections?: Collection[];
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="relative w-full h-full flex flex-col items-center justify-center"
    >
      <SectionTitle
        title="Esplora le"
        shaderText="Collezioni"
        description="Tre stili unici per esprimere la tua personalità: Essentials, Generative Art e Retrò"
      />

      {collections.map((collection, i) => {
        const isLast = i === collections.length - 1;
        const cardsToScale = collections.length - 1;
        const targetScale = isLast ? 1 : 1 - (cardsToScale - i) * 0.05;

        // Ogni card scala solo nel suo range specifico, non oltre
        const start = i * (1 / collections.length);
        const end = Math.min(start + 1 / collections.length, 1); // Scala solo per il suo segmento

        return (
          <CollectionCard
            key={`collection_${i}`}
            index={i}
            totalCards={collections.length}
            {...collection}
            progress={scrollYProgress}
            range={[start, end]}
            targetScale={targetScale}
          />
        );
      })}
      {/* Compensazione per il margin negativo dell'ultima card */}
      <div style={{ height: "100px" }} />
    </div>
  );
}
