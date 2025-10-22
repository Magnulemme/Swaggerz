"use client";

import { WaveImageShader } from "./WaveImageShader";
import { Sparkles, ShoppingBag } from "lucide-react";

interface ImageConfig {
  url: string;
  alt: string;
  description?: string;
  price?: string;
  category?: string;
  waveIntensity?: number;
  waveSpeed?: number;
  isExclusive?: boolean;
}

interface HeroWaveImagesProps {
  images?: ImageConfig[];
  className?: string;
}

const defaultImages: ImageConfig[] = [
  {
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=90",
    alt: "Midnight Velvet Blazer",
    description: "Sartoria italiana in velluto premium",
    price: "€1.299",
    category: "Haute Couture",
    isExclusive: true,
    waveIntensity: 0.2,
    waveSpeed: 0.8,
  },
  {
    url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=90",
    alt: "Cashmere Heritage Coat",
    description: "100% cashmere mongolo, edizione limitata",
    price: "€2.499",
    category: "Winter Collection",
    isExclusive: true,
    waveIntensity: 0.2,
    waveSpeed: 0.8,
  },
  {
    url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=90",
    alt: "Silk Evening Gown",
    description: "Seta naturale con ricami a mano",
    price: "€3.799",
    category: "Evening Wear",
    isExclusive: true,
    waveIntensity: 0.2,
    waveSpeed: 0.8,
  },
  {
    url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=90",
    alt: "Leather Artisan Jacket",
    description: "Pelle italiana conciata a mano",
    price: "€1.899",
    category: "Premium Leather",
    waveIntensity: 0.2,
    waveSpeed: 0.8,
  },
];

export function HeroWaveImages({
  images = defaultImages,
  className = "",
}: HeroWaveImagesProps) {
  return (
    <div className={`w-full py-24 px-6 lg:px-16 ${className}`}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-sm font-medium text-white/90 tracking-wider uppercase">
              Exclusive Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Haute Couture
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Pezzi unici e collezioni limitate, selezionati dai migliori atelier
            europei
          </p>
        </div>

        {/* Grid Layout - Responsive: 2 cols tablet, 3-4 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-16 h-[200px] md:h-[300px] lg:h-[350px] xl:h-[400px]">
          {images.map((image, index) => (
            <article
              key={image.url}
              className="group relative flex flex-col cursor-pointer h-full"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-full">
                {/* Exclusive Badge */}
                {image.isExclusive && (
                  <div className="absolute left-4 top-4 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 shadow-lg shadow-amber-500/50 backdrop-blur-sm">
                      <Sparkles size={12} className="text-white" />
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        Exclusive
                      </span>
                    </div>
                  </div>
                )}

                {/* Image with Wave Shader */}
                <WaveImageShader
                  imageUrl={image.url}
                  waveIntensity={image.waveIntensity ?? 0.2}
                  waveSpeed={image.waveSpeed ?? 0.8}
                  className="w-full h-full"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                {/* Quick Action Button - Visible on Hover */}
                <button className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-400 hover:scale-105 shadow-lg">
                  <ShoppingBag size={16} />
                  <span>Acquista</span>
                </button>
              </div>

              {/* Content Section - Below Image */}
              <div className="mt-4 space-y-2">
                {/* Category */}
                {image.category && (
                  <span className="inline-block text-xs font-medium text-amber-400 uppercase tracking-widest">
                    {image.category}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-amber-400 transition-colors duration-300">
                  {image.alt}
                </h3>

                {/* Description */}
                {image.description && (
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {image.description}
                  </p>
                )}

                {/* Price with Premium Styling */}
                {image.price && (
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                      {image.price}
                    </span>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">
                      IVA incl.
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-base shadow-lg shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
            <span>Esplora l&apos;intera collezione</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
