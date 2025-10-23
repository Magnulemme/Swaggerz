"use client";

import RectangularButton from "./Hero/RectangularButton";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function CTABanner({
  title = "Hai bisogno di più streetwear?",
  subtitle = "Esplora l'intera collezione e trova il tuo stile perfetto",
  buttonText = "ESPLORA IL CATALOGO",
  onButtonClick,
  className = "",
}: CTABannerProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative max-w-4xl w-full border border-zinc-700/60 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-500 bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-black/95 backdrop-blur-sm">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5 opacity-50" />

        {/* Content */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 px-8 md:px-12 py-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {title}
            </h3>
            <p className="text-base text-zinc-400">{subtitle}</p>
          </div>
          <RectangularButton
            text={buttonText}
            width={320}
            onClick={onButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
