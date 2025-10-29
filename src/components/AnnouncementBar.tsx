"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (barRef.current && !isHidden) {
      const height = barRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        '--announcement-bar-height',
        `${height}px`
      );
    } else if (isHidden) {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
    }
  }, [isHidden]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => {
    setIsHidden(true);
  };

  if (isHidden) return null;

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 w-full bg-brand text-light-primary py-xs px-sm text-center text-sm font-medium tracking-wide z-[70] transition-transform duration-500 shadow-lg"
      style={{
        transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-sm relative">
        <p className="flex-1 text-center">
          <span className="font-bold">NFT Esclusivi</span> fuori ora - Collezione limitata disponibile
          <a
            href="/shop/nft"
            className="ml-2 underline underline-offset-2 hover:bg-white/20 rounded px-xs py-2xs transition-colors font-semibold"
          >
            Scopri ora
          </a>
        </p>

        <button
          onClick={handleClose}
          className="absolute right-0 p-2xs hover:bg-white/20 rounded transition-colors"
          aria-label="Chiudi banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
