"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  color: string;
  index: number;
  shaderDataUrl: string;
}

export default function StepCard({
  icon: Icon,
  number,
  title,
  description,
  color,
  index,
  shaderDataUrl,
}: StepCardProps) {
  const getPosition = (index: number) => {
    const angles = [-90, 30, 150];
    const angleRad = (angles[index] * Math.PI) / 180;
    const radius = 38;
    // Su mobile card più piccole, quindi offset più piccolo (spostate a dx)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const cardOffsetX = isMobile ? -13.5 : -18.5;
    const cardOffsetY = -5;

    return {
      x: 50 + radius * Math.cos(angleRad) + cardOffsetX,
      y: 50 + radius * Math.sin(angleRad) + cardOffsetY,
    };
  };

  const position = getPosition(index);
  const topOffset = index === 0 ? -50 : 0;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `calc(${position.y}% + ${topOffset}px)`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.15,
        type: "spring",
      }}
    >
      <div className="relative">
        {/* Linea di connessione verso il centro */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-1/2 left-1/2 w-[1px] bg-gradient-to-b from-zinc-700 to-transparent"
            style={{
              height: "80px",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div className="relative inline-flex overflow-hidden rounded-xl p-[1px]">
          {/* Animated rotating gradient border - stile ExploreButton */}
          <motion.span
            className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#d37918_0%,#111111_50%,#d37918_100%)]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: index * 2.5,
            }}
            style={{ originX: "50%", originY: "50%" }}
          />

          {/* Card content */}
          <div className="relative bg-zinc-900/95 backdrop-blur-sm rounded-xl p-2 md:p-5 w-24 md:w-52 hover:shadow-lg hover:shadow-orange-500/20 transition-all flex flex-col items-center md:items-start">
            {/* Header compatto */}
            <div className="flex items-center justify-center md:justify-between mb-2 md:mb-4">
              {/* Numero con cerchio shader e glow esterno */}
              <div className="hidden md:block relative w-10 h-10 md:w-12 md:h-12">
                {/* Anello di glow esterno */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 60,
                    height: 60,
                    left: -6,
                    top: -6,
                    backgroundImage: `radial-gradient(circle,
                    rgba(249, 115, 22, 0.3) 0%,
                    rgba(239, 68, 68, 0.2) 40%,
                    rgba(234, 179, 8, 0.1) 60%,
                    transparent 80%
                  )`,
                    filter: "blur(8px)",
                    opacity: 0.6,
                  }}
                />

                {/* Cerchio shader */}
                <div
                  className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundImage: shaderDataUrl
                      ? `url(${shaderDataUrl})`
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: `
                    0 0 15px rgba(249, 115, 22, 0.4),
                    0 0 30px rgba(239, 68, 68, 0.3),
                    0 4px 20px rgba(0, 0, 0, 0.3)
                  `,
                  }}
                >
                  {/* Numero in bianco sopra */}
                  <span className="relative z-10 text-white font-black text-lg md:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    {number}
                  </span>
                </div>
              </div>

              {/* Icona */}
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            </div>

            {/* Titolo e descrizione */}
            <h3 className="text-white font-bold text-xs md:text-base mb-1 md:mb-2 text-center md:text-left">
              <span className="md:hidden">
                {number === "1"
                  ? "Acquista"
                  : number === "2"
                  ? "Stampa"
                  : "Vendi"}
              </span>
              <span className="hidden md:inline">{title}</span>
            </h3>
            <p className="hidden md:block text-zinc-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
