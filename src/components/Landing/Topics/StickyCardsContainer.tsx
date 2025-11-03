"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { StickyCard } from "./StickyCard";
import { SectionTitle } from "../SectionTitle";

interface Topic {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

const defaultTopics: Topic[] = [
  {
    title: "Swaggerz's Everyday",
    subtitle: "Urban Essentials",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Swaggerz's Glow",
    subtitle: "Night Energy",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
  },
  {
    title: "Swaggerz's Rhythm",
    subtitle: "Party Vibes",
    imageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1920&q=80",
  },
];

export function StickyCardsContainer({
  topics = defaultTopics,
}: {
  topics?: Topic[];
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
        title="Scegli il tuo"
        shaderText="Mood"
        description="Scopri le nostre collezioni e trova il mood più adatto a te"
      />

      {topics.map((topic, i) => {
        const isLast = i === topics.length - 1;
        // Calcola scale uniforme: solo le card che non sono l'ultima scalano
        const cardsToScale = topics.length - 1; // Escludi l'ultima dal calcolo
        const targetScale = isLast ? 1 : 1 - (cardsToScale - i) * 0.05;
        // Quando entra l'ultima card (a 0.5), tutte smettono di scalare
        const lastCardEntry = (topics.length - 1) * 0.25;
        return (
          <StickyCard
            key={`topic_${i}`}
            index={i}
            totalCards={topics.length}
            {...topic}
            progress={scrollYProgress}
            range={[i * 0.25, lastCardEntry]}
            targetScale={targetScale}
          />
        );
      })}
      {/* Compensazione per il margin negativo dell'ultima card */}
      <div style={{ height: "100px" }} />
    </div>
  );
}
