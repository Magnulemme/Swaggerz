"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroVideoButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  buttonRef?: React.RefObject<HTMLAnchorElement | null>;
  style?: React.CSSProperties;
}

export function HeroVideoButton({
  href,
  children,
  className,
  buttonRef,
  style,
}: HeroVideoButtonProps) {
  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className={cn(
        "group  overflow-hidden relative bg-transparent p-[2px] text-xl inline-flex rounded-full",
        className
      )}
      style={style}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute -inset-10 rounded-full z-0">
        <MovingBorder duration={3000} rx="50%" ry="50%">
          <div className="h-32 w-32 bg-[radial-gradient(#f97316_50%,transparent_70%)] opacity-[0.6] -z-10" />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center gap-2 md:gap-3 rounded-full px-10 py-6 md:px-12 md:py-8 text-white text-sm md:text-base lg:text-lg uppercase tracking-[0.3em] font-semibold backdrop-blur-sm bg-transparent border border-orange-500/40 transition-all duration-300"
        )}
      >
        {children}
      </div>
    </motion.a>
  );
}

const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue<number>(0);
  const [borderRadius, setBorderRadius] = React.useState({
    rx: rx || "0",
    ry: ry || "0",
  });

  // Calcola il border-radius effettivo basato sulle dimensioni del container
  React.useEffect(() => {
    const updateBorderRadius = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Per rounded-full, il border-radius CSS è min(width, height) / 2
        // Convertiamo in percentuale per l'SVG
        const radiusPx = Math.min(width, height) / 2;
        const rxPercent = (radiusPx / width) * 100;
        const ryPercent = (radiusPx / height) * 100;

        setBorderRadius({
          rx: `${rxPercent}%`,
          ry: `${ryPercent}%`,
        });
      }
    };

    updateBorderRadius();
    window.addEventListener("resize", updateBorderRadius);
    return () => window.removeEventListener("resize", updateBorderRadius);
  }, []);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <div ref={containerRef} className="absolute inset-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={borderRadius.rx}
          ry={borderRadius.ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
