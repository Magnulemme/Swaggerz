"use client"

import { useEffect, useRef, useState } from 'react';

export const useScrollVideo = (totalVideos: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Calcolo corretto del progresso dello scroll
      // Quando rect.top è 0 siamo all'inizio (scrollProgress = 0)
      // Quando rect.top è negativo (scrolliamo giù), il progresso aumenta
      const totalScrollableHeight = rect.height - window.innerHeight;
      
      if (totalScrollableHeight <= 0) return;
      
      // Usa -rect.top perché rect.top diventa negativo quando scrolliamo giù
      const scrolled = -rect.top;
      const scrollProgress = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
      
      // Calcola l'indice del video basato sul progresso
      const videoIndex = Math.floor(scrollProgress * totalVideos);
      
      // Assicurati che l'indice sia nel range corretto
      const clampedIndex = Math.max(0, Math.min(totalVideos - 1, videoIndex));
      
      setCurrentVideo(clampedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Chiamata iniziale

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalVideos]);

  return { containerRef, currentVideo };
};
