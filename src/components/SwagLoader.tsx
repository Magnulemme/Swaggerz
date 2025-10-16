"use client";
import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

interface SwagLoaderProps {
  message?: string;
  showRandomMessages?: boolean;
  className?: string;
}

const swagMessages = [
  "Caricando il tuo stile",
  "Preparando l'esperienza",
  "Sintonizzando le vibes",
  "Assemblando il tutto",
  "Quasi pronti"
];

export function SwagLoader({
  message,
  showRandomMessages = true,
  className = ""
}: SwagLoaderProps) {
  const [currentMessage, setCurrentMessage] = useState(
    message || swagMessages[0]
  );

  useEffect(() => {
    if (!showRandomMessages || message) return;

    const interval = setInterval(() => {
      setCurrentMessage(swagMessages[Math.floor(Math.random() * swagMessages.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [showRandomMessages, message]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-black ${className}`}>
      
      <div className="text-center space-y-12">
        
        {/* SwaggerZ Firefox-style Spinner */}
        <div className="relative">
          <div className="relative w-36 h-36 mx-auto">
            
            {/* Scia dello spinner con estremità arrotondate - SVG approach */}
            <div className="absolute inset-0 z-10 animate-spin">
              <svg className="w-full h-full" viewBox="0 0 96 96">
                <defs>
                  <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(251, 146, 60, 0)" />
                    <stop offset="30%" stopColor="rgba(251, 146, 60, 0.1)" />
                    <stop offset="60%" stopColor="rgba(251, 146, 60, 0.4)" />
                    <stop offset="85%" stopColor="rgba(251, 146, 60, 0.7)" />
                    <stop offset="100%" stopColor="rgba(251, 146, 60, 0.9)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 48 6 A 42 42 0 0 1 84 32"
                  fill="none"
                  stroke="url(#trailGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="1"
                />
              </svg>
            </div>

            {/* Cerchio nero di sfondo per la fiamma - Layer intermedio */}
            <div className="absolute rounded-full bg-black z-20"
                style={{
                  top: '18px',
                  left: '18px',   
                  right: '18px',  
                  bottom: '18px'
                }}></div>
            
            {/* Fiamma - Layer superiore */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <Flame className="size-6 text-orange-500 animate-pulse" />
            </div>
          </div>
          
          {/* Floating particles migliorati */}
          <div className="absolute -top-2 -left-2 w-1.5 h-1.5 bg-orange-500/70 rounded-full animate-bounce"></div>
          <div className="absolute -top-1 right-4 w-1 h-1 bg-orange-500/50 rounded-full animate-ping"></div>
          <div className="absolute bottom-2 -left-1 w-1.5 h-1.5 bg-orange-500/60 rounded-full animate-pulse"></div>
          <div className="absolute top-0 right-2 w-0.5 h-0.5 bg-orange-500/40 rounded-full animate-bounce"></div>
        </div>

        {/* SwaggerZ Message with enhanced dots */}
        <div className="space-y-6">
          <div className="font-jost text-xl font-medium tracking-wider 
                          bg-gradient-to-r from-orange-500 to-red-500
                          bg-size-200 bg-clip-text text-transparent 
                          animate-gradient">
            {currentMessage}
          </div>
          
          {/* Solo 3 dots che scalano in sequenza */}
          <div className="flex justify-center items-center">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-sequential-dots-1"></div>
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-sequential-dots-2"></div>
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-sequential-dots-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwagLoader;