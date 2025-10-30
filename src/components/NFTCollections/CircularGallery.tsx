"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Card {
  id: number;
  image: string;
  title: string;
}

interface CircularGalleryProps {
  cards?: Card[];
}

const defaultCards: Card[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', title: 'Mountain Vista' },
  { id: 2, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', title: 'Forest Path' },
  { id: 3, image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449', title: 'Ocean Waves' },
  { id: 4, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', title: 'Sunset Sky' },
  { id: 5, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', title: 'Wild Nature' },
  { id: 6, image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', title: 'Desert Dunes' },
  { id: 7, image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f', title: 'Glacier Lake' },
  { id: 8, image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1', title: 'Canyon View' },
];

const CircularGallery: React.FC<CircularGalleryProps> = ({ cards = defaultCards }) => {
  const quantity = cards.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Calcola le dimensioni delle card in base al container
  const baseCardWidth = Math.min(dimensions.width * 0.30, 180);
  const cardWidth = baseCardWidth;

  // Calcola carouselSize in base alle dimensioni disponibili
  const carouselSize = dimensions.width;
  
  // FORMULA CORRETTA con fattore prospettiva
  // radius = (carouselSize / 2) - (cardWidth / 2) * p
  // dove p = 4/15 ≈ 0.2667 è il fattore prospettiva
  const perspectiveFactor = 4 / 15;
  const cardHeight = dimensions.height - (dimensions.height * perspectiveFactor);
  const radius = (carouselSize / 2) - (cardWidth / 2) * perspectiveFactor;

  // Perspective dinamica basata sul carouselSize
  const perspective = carouselSize * 2;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden"
    >
      <style jsx>{`
        @keyframes rotate360 {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(-360deg);
          }
        }
        .rotating-carousel {
          animation: rotate360 40s linear infinite;
        }
      `}</style>

      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative"
          style={{
            width: `${radius * 2}px`,
            height: `${dimensions.height}px`,
            perspective: `${perspective}px`,
            perspectiveOrigin: '50% 50%'
          }}
        >
          <div
            ref={carouselRef}
            className="rotating-carousel relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {cards.map((item, index) => {
              const angle = (index * 2 * Math.PI) / quantity;
              const x = Math.sin(angle) * radius;
              const z = Math.cos(angle) * radius;
              const cardRotation = (index * 360) / quantity;

              return (
                <div
                  key={item.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${cardRotation}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/20"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                      willChange: 'transform',
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularGallery;