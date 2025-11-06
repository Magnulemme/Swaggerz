"use client";

import React, { useEffect, useState } from "react";
import { ScrollingGradientBlobs } from "./ScrollingGradientBlobs";

/**
 * Lazy loading wrapper for ScrollingGradientBlobs.
 * Loads the expensive gradient blob animations only after user starts scrolling,
 * giving priority to hero section and critical above-the-fold content.
 */
export function LazyScrollingGradientBlobs() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let hasScrolled = false;

    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 50) {
        hasScrolled = true;
        setShouldLoad(true);
        // Cleanup: remove listener after first scroll
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Fallback: load after 3 seconds even if user doesn't scroll
    const timeoutId = setTimeout(() => {
      if (!hasScrolled) {
        setShouldLoad(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }, 3000);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return shouldLoad ? <ScrollingGradientBlobs /> : null;
}
