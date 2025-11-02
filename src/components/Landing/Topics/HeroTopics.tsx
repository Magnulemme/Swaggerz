"use client";

import { motion } from "framer-motion";
import { TopicBanner } from "./TopicBanner";

interface Topic {
  title: string;
  subtitle?: string;
  imageUrl: string;
  href?: string;
}

interface HeroTopicsProps {
  topics?: Topic[];
  className?: string;
}

const defaultTopics: Topic[] = [
  {
    title: "Urban Outfit",
    subtitle: "Collezione",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80",
    href: "#urban",
  },
  {
    title: "Disco Stars",
    subtitle: "Drop Limitato",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
    href: "#disco",
  },
  {
    title: "Street Legends",
    subtitle: "Best Sellers",
    imageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1920&q=80",
    href: "#legends",
  },
];

export function HeroTopics({
  topics = defaultTopics,
  className = "",
}: HeroTopicsProps) {
  return (
    <div className={`w-full pt-xl md:pt-2xl lg:pt-3xl bg-red-400 ${className}`}>
      {/* Header */}
      <motion.div
        className="text-center mb-lg md:mb-xl lg:mb-2xl space-y-xs"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/5 text-brand text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            Esplora per Topic
          </span>
        </motion.div>

        <motion.h3
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-light tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Scopri le Collezioni
        </motion.h3>
      </motion.div>

      {/* Stacked Banners - Con spazio per effetto sticky */}
      <div className="space-y-[200px] md:space-y-[300px] lg:space-y-[400px]">
        {topics.map((topic, index) => (
          <TopicBanner
            key={topic.title}
            title={topic.title}
            subtitle={topic.subtitle}
            imageUrl={topic.imageUrl}
            href={topic.href}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
