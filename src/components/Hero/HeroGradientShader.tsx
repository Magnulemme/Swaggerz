"use client"

import React, { useRef, useEffect } from 'react';

const HeroGradientShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.03;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create multiple animated gradient blobs
      const blobs = [
        {
          x: width * 0.3 + Math.sin(time * 0.8) * 150,
          y: height * 0.4 + Math.cos(time * 0.6) * 120,
          radius: 300 + Math.sin(time * 0.5) * 80,
          color1: 'rgba(249, 115, 22, 0.25)', // orange-500
          color2: 'rgba(249, 115, 22, 0)'
        },
        {
          x: width * 0.5 + Math.cos(time * 0.7) * 100,
          y: height * 0.5 + Math.sin(time * 0.9) * 100,
          radius: 250 + Math.cos(time * 0.7) * 60,
          color1: 'rgba(239, 68, 68, 0.2)', // red-500
          color2: 'rgba(239, 68, 68, 0)'
        },
        {
          x: width * 0.4 + Math.sin(time * 1.2) * 130,
          y: height * 0.6 + Math.cos(time * 0.4) * 90,
          radius: 280 + Math.sin(time * 0.9) * 70,
          color1: 'rgba(251, 146, 60, 0.22)', // orange-400
          color2: 'rgba(251, 146, 60, 0)'
        },
        {
          x: width * 0.2 + Math.cos(time * 0.5) * 110,
          y: height * 0.3 + Math.sin(time * 0.8) * 95,
          radius: 220 + Math.cos(time * 1.1) * 50,
          color1: 'rgba(251, 113, 133, 0.18)', // pink-400
          color2: 'rgba(251, 113, 133, 0)'
        },
        {
          x: width * 0.6 + Math.sin(time * 0.6) * 140,
          y: height * 0.45 + Math.cos(time * 1.0) * 110,
          radius: 260 + Math.sin(time * 0.8) * 65,
          color1: 'rgba(234, 179, 8, 0.15)', // yellow-500
          color2: 'rgba(234, 179, 8, 0)'
        }
      ];

      // Draw each blob
      blobs.forEach(blob => {
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, blob.color1);
        gradient.addColorStop(1, blob.color2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-32 left-0 lg:left-8 xl:left-16 w-[700px] lg:w-[900px] h-[700px] lg:h-[900px] z-20"
      style={{
        filter: 'blur(120px)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default HeroGradientShader;
