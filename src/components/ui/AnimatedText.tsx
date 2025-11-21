"use client";

import { motion, Variants } from "framer-motion";
import { waveText, waveTextSubtle } from "@/lib/animations";

interface AnimatedTextProps {
  /**
   * Il testo da animare
   */
  text: string;

  /**
   * Stile del wave effect
   * @default "normal"
   */
  variant?: "normal" | "subtle";

  /**
   * Delay iniziale prima di iniziare l'animazione (secondi)
   * @default 0
   */
  delay?: number;

  /**
   * Delay tra ogni carattere (secondi)
   * @default 0.03
   */
  charDelay?: number;

  /**
   * ClassName da applicare al container
   */
  className?: string;

  /**
   * ClassName da applicare a ogni carattere
   * @default "inline-block"
   */
  charClassName?: string;

  /**
   * Se true, anima al mount invece che al viewport enter
   * @default false
   */
  animateOnMount?: boolean;
}

/**
 * AnimatedText - Componente riutilizzabile per text wave effect
 *
 * Usage:
 * <AnimatedText text="Hello World" variant="normal" delay={0.2} />
 */
export function AnimatedText({
  text,
  variant = "normal",
  delay = 0,
  charDelay = 0.03,
  className = "",
  charClassName = "inline-block",
  animateOnMount = false,
}: AnimatedTextProps) {
  // Determina i valori in base al variant
  const animationValues = variant === "subtle"
    ? { y: 10, duration: 0.6 }
    : { y: 20, duration: 0.8 };

  // Split text preservando spazi
  const chars = text.split("");

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: animationValues.y }}
          {...(animateOnMount
            ? {
                animate: { opacity: 1, y: 0 },
              }
            : {
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.3 },
              })}
          transition={{
            duration: animationValues.duration,
            delay: delay + i * charDelay,
            ease: [0.65, 0, 0.35, 1],
          }}
          className={charClassName}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
