"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  /** Button content - can be text, icons, or any React nodes */
  children: React.ReactNode;
  /** Optional href for link behavior */
  href?: string;
  /** Optional onClick handler for button behavior */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Ref for the underlying element */
  buttonRef?: React.RefObject<HTMLAnchorElement | HTMLButtonElement | null>;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Size variant - affects padding */
  size?: "sm" | "md" | "lg";
  /** Whether to render as a button or link */
  as?: "button" | "a";
  /** Button type (for form submissions) */
  type?: "button" | "submit" | "reset";
  /** Border color for the animated gradient (hex color) */
  borderColor?: string;
}

const sizeVariants = {
  sm: "px-6 py-4 md:px-8 md:py-5 text-xs md:text-sm",
  md: "px-10 py-6 md:px-12 md:py-8 text-sm md:text-base",
  lg: "px-12 py-7 md:px-14 md:py-9 text-base md:text-lg",
};

export function AnimatedButton({
  children,
  href,
  onClick,
  className,
  buttonRef,
  style,
  size = "md",
  as = "a",
  type = "button",
  borderColor = "#f97316",
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const Component = motion[as] as typeof motion.a | typeof motion.button;

  const props = {
    ...(as === "a" && href ? { href } : {}),
    ...(as === "button" ? { onClick, type } : {}),
  };

  return (
    <Component
      ref={buttonRef as any}
      className={cn(
        "group relative inline-flex rounded-full p-[3px] overflow-hidden w-fit",
        className
      )}
      style={style}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Gradient border with CSS mask to show only ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none p-[3px] overflow-hidden"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      >
        <div
          className="absolute inset-[-200%] animate-[spin_2s_linear_infinite]"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, ${borderColor} 0%, transparent 50%, ${borderColor} 100%)`,
          }}
        />
      </div>

      {/* Button content - transparent with backdrop blur */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full items-center justify-center rounded-full uppercase tracking-[0.3em] font-semibold backdrop-blur-md transition-all duration-300",
          sizeVariants[size]
        )}
      >
        {/* Text and content container with slide animation */}
        <span className="relative inline-flex items-center gap-xs md:gap-sm">
          {/* White content - slides up on hover */}
          <motion.span
            className="flex items-center gap-xs md:gap-sm text-light-primary whitespace-nowrap leading-relaxed"
            animate={{
              y: isHovered ? "-150%" : "0%",
              opacity: isHovered ? 0 : 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {children}
          </motion.span>

          {/* Colored content - slides in from bottom on hover */}
          <motion.span
            className="absolute top-0 flex items-center gap-xs md:gap-sm whitespace-nowrap leading-relaxed"
            style={{ color: borderColor }}
            animate={{
              y: isHovered ? "0%" : "150%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {children}
          </motion.span>
        </span>
      </div>
    </Component>
  );
}
