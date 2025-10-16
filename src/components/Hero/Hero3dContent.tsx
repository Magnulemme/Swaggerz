"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RectangularButton from './RectangularButton';
import ShaderText from '@/components/ShaderText';
import AvatarCanvas from '@/components/Avatar/AvatarCanvas';

const Hero3dContent: React.FC = () => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const [titleFontSize, setTitleFontSize] = useState('2rem');

  // Calcola dinamicamente la dimensione del titolo
  useEffect(() => {
    const calculateFontSize = () => {
      if (!titleContainerRef.current) return;

      const container = titleContainerRef.current;
      const availableWidth = container.clientWidth;

      // "Colleziona." è la parola più lunga (11 caratteri + punto)
      // Stima: larghezza carattere ≈ 0.6 × fontSize per font bold
      const charCount = 12;
      const charWidthRatio = 0.6;

      // Calcola fontSize ideale con margine del 10%
      const idealFontSize = (availableWidth * 0.9) / (charCount * charWidthRatio);

      // Limiti min/max in px
      const minSize = 40;
      const maxSize = 50;
      const fontSize = Math.max(minSize, Math.min(maxSize, idealFontSize));

      setTitleFontSize(`${fontSize}px`);
    };

    calculateFontSize();

    const resizeObserver = new ResizeObserver(calculateFontSize);
    if (titleContainerRef.current) {
      resizeObserver.observe(titleContainerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      className="group relative h-full"
    >
      {/* Layout responsive: colonna singola su mobile, due colonne su desktop */}
      <div className="relative h-full flex flex-col lg:flex-row p-8 lg:p-10">

        {/* Left Column - Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Title with ShaderText preserved */}
          <motion.div
            ref={titleContainerRef}
            className="flex flex-col justify-center items-center lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Main Title - "Colleziona. Stampa." normale, "Indossa." con ShaderText */}
            <div className="text-center lg:text-left font-jost">
              <div
                className="text-zinc-100 leading-none"
                style={{ fontSize: titleFontSize, fontWeight: 900 }}
              >
                Colleziona. Stampa.
              </div>
              <ShaderText
                className="block leading-none"
                fontSize={titleFontSize}
                fontWeight="900"
              >
                Indossa.
              </ShaderText>
            </div>

            {/* Brand Description */}
            <motion.p
              className="text-zinc-300 text-base md:text-lg text-center lg:text-left max-w-md px-4 lg:px-0 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Personalizza i tuoi capi NFT certificati dei migliori artisti digitali, o acquista i capi esclusivi delle nostre collezioni. 
            </motion.p>
          </motion.div>

          {/* Rectangular Button */}
          <div className='flex justify-center lg:justify-start mt-6 lg:mt-8'>
            <RectangularButton />
          </div>
        </div>

        {/* Right Column - Avatars */}
        <div className="h-full lg:w-[600px] lg:flex-shrink-0">
          {/* Avatar Preview - mobile (solo uno per spazio limitato) */}
          <div className='w-full h-full flex justify-center lg:hidden'>
            <div className="h-full max-w-[600px] w-full">
              <AvatarCanvas
                avatarType="man"
                animation="idle"
                enableZoom={false}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
              />
            </div>
          </div>

          {/* Avatar singolo - desktop (lg+) - performance ottimizzate */}
          <div className="h-full w-full hidden lg:flex justify-center max-h-[450px]">
            {/* Avatar Man - carica solo 1 per migliori performance */}
            <motion.div
              className="aspect-[9/16] h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AvatarCanvas
                avatarType="man"
                animation="idle"
                enableZoom={false}
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
              />
            </motion.div>

            {/* Avatar Girl - RIMOSSO per performance
                Riduci da 2 a 1 avatar = -50% carico GPU */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero3dContent;