"use client";

import React, { useRef, useEffect, useState } from 'react';

interface OptimizedVideoProps {
  src: string; // Base path without extension (e.g., '/videos/hero-video')
  className?: string;
  poster?: string;
}

/**
 * Optimized video component with:
 * - Multi-format support (WebM + MP4 fallback)
 * - Lazy loading with Intersection Observer
 * - Automatic pause when not visible
 * - Preload optimization
 */
export default function OptimizedVideo({ src, className = '', poster }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoad) {
            setShouldLoad(true);
          }
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [shouldLoad]);

  // Auto pause/play based on visibility
  useEffect(() => {
    if (!videoRef.current || !shouldLoad) return;

    if (isVisible) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked by browser
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
    >
      {shouldLoad && (
        <>
          {/* WebM for better compression (modern browsers) */}
          <source src={`${src}.webm`} type="video/webm" />
          {/* MP4 fallback (all browsers) */}
          <source src={`${src}-optimized.mp4`} type="video/mp4" />
        </>
      )}
      Your browser does not support the video tag.
    </video>
  );
}
