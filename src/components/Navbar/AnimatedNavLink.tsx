"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface AnimatedNavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

// Componente per il testo animato con slide
function AnimatedText({ 
  icon, 
  label, 
  isActive,
  isSemiActive
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean;
  isSemiActive: boolean;
}) {
  const whiteIconRef = useRef<HTMLSpanElement>(null);
  const orangeIconRef = useRef<HTMLSpanElement>(null);

  // Forza i colori delle icone con !important per sovrascrivere l'eredità del parent
  useEffect(() => {
    if (whiteIconRef.current) {
      whiteIconRef.current.style.setProperty('color', 'rgb(255 255 255)', 'important');
      const svg = whiteIconRef.current.querySelector('svg');
      if (svg) {
        svg.style.setProperty('color', 'rgb(255 255 255)', 'important');
      }
    }
    
    if (orangeIconRef.current) {
      const color = isActive ? 'rgb(249 115 22)' : 'rgb(251 146 60)';
      orangeIconRef.current.style.setProperty('color', color, 'important');
      const svg = orangeIconRef.current.querySelector('svg');
      if (svg) {
        svg.style.setProperty('color', color, 'important');
      }
    }
  }, [isActive, isSemiActive]);

  return (
    <span className="flex items-center gap-2">
      {/* Contenitore dell'icona con animazione sliding */}
      <span className="relative inline-flex items-center w-[1.2em] h-[1.2em] overflow-visible flex-shrink-0">
        {/* Icona bianca - esce verso l'alto */}
        <motion.span
          ref={whiteIconRef}
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: isActive || isSemiActive ? '-150%' : '0%',
            opacity: isActive || isSemiActive ? 0 : 1
          }}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
            opacity: { duration: 0.15, ease: "easeOut" }
          }}
        >
          {icon}
        </motion.span>

        {/* Icona arancione - entra dal basso */}
        <motion.span
          ref={orangeIconRef}
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: isActive || isSemiActive ? '0%' : '150%',
            opacity: isActive || isSemiActive ? 1 : 0
          }}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
            opacity: { duration: 0.15, ease: "easeIn", delay: isActive || isSemiActive ? 0.1 : 0 }
          }}
        >
          {icon}
        </motion.span>
      </span>

      {/* Contenitore del testo con overflow */}
      <span className="relative inline-flex flex-col h-[1.5em] overflow-visible">
        {/* Testo bianco - esce verso l'alto */}
        <motion.span
          className="text-sm font-medium text-white whitespace-nowrap leading-relaxed"
          animate={{
            y: isActive || isSemiActive ? '-150%' : '0%',
            opacity: isActive || isSemiActive ? 0 : 1
          }}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
            opacity: { duration: 0.15, ease: "easeOut" }
          }}
        >
          {label}
        </motion.span>

        {/* Testo arancione - entra dal basso */}
        <motion.span
          className="absolute top-0 text-sm font-medium whitespace-nowrap leading-relaxed"
          style={{
            color: isActive ? "rgb(249 115 22)" : "rgb(251 146 60)"
          }}
          animate={{
            y: isActive || isSemiActive ? '0%' : '150%',
            opacity: isActive || isSemiActive ? 1 : 0
          }}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
            opacity: { duration: 0.15, ease: "easeIn", delay: isActive || isSemiActive ? 0.1 : 0 }
          }}
        >
          {label}
        </motion.span>
      </span>
    </span>
  );
}

export default function AnimatedNavLink({
  href,
  label,
  icon,
  hasDropdown = false,
  dropdownItems = []
}: AnimatedNavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hasDropdown || !triggerRef.current) return;

    const checkState = () => {
      const state = triggerRef.current?.getAttribute('data-state');
      setIsOpen(state === 'open');
    };

    const observer = new MutationObserver(checkState);
    observer.observe(triggerRef.current, {
      attributes: true,
      attributeFilter: ['data-state']
    });

    checkState();

    return () => observer.disconnect();
  }, [hasDropdown]);

  // Colore della freccia del dropdown
  const getChevronColor = () => {
    if (isHovered) return "rgb(249 115 22)";
    if (isOpen) return "rgb(251 146 60)";
    return "rgb(255 255 255)";
  };

  if (hasDropdown) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          ref={triggerRef}
          className="!bg-zinc-950 focus:bg-transparent data-[active]:bg-transparent h-12 px-5 py-3 overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            // Forza il colore per tutto il contenuto inclusa la freccia SVG
            color: getChevronColor()
          }}
        >
          <AnimatedText 
            icon={icon} 
            label={label} 
            isActive={isHovered}
            isSemiActive={isOpen && !isHovered}
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent 
          className="!bg-zinc-950 backdrop-blur-xl border border-white/10 shadow-2xl shadow-red-500/10 rounded-lg"
        >
          <ul className="grid w-48 gap-2 p-2">
            {dropdownItems.map((item) => (
              <li key={item.label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-sm text-zinc-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 rounded-md transition-all"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link
          href={href}
          className="!bg-zinc-950 hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent h-12 px-5 py-3 overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatedText 
            icon={icon} 
            label={label} 
            isActive={isHovered}
            isSemiActive={false}
          />
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}