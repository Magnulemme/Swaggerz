// components/Categories/index.tsx
"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollVideo } from '@/hooks/useScrollVideo';
import VideoPlayer from './VideoPlayer';
import { FixedTextSection, scrollConfig } from './TextSection';
import { ProgressIndicator } from './ProgressIndicator';
import { videoData } from '@/data/videoData';

const Categories: React.FC = () => {
  const { containerRef, currentVideo } = useScrollVideo(videoData.length);
  const [scrollDuration, setScrollDuration] = useState(400);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVideoPositioned, setIsVideoPositioned] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Callback per quando il video è pronto
  const handleVideoReady = useCallback(() => {
    setIsVideoPositioned(true);
  }, []);

  // Reset del flag quando cambia video
  useEffect(() => {
    setIsVideoPositioned(false);
    // Piccolo delay per permettere al video di caricarsi
    const timer = setTimeout(() => {
      setIsVideoPositioned(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentVideo]);
  
  // Detect device type and window size
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Set scroll duration based on device
      if (width < 768) {
        setScrollDuration(scrollConfig.snapConfig.scrollDuration.mobile);
      } else if (width < 1024) {
        setScrollDuration(scrollConfig.snapConfig.scrollDuration.tablet);
      } else {
        setScrollDuration(scrollConfig.snapConfig.scrollDuration.desktop);
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  // Apply scroll behavior styles
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // CSS custom properties for smooth scrolling
      container.style.setProperty('--scroll-duration', `${scrollDuration}ms`);
      
      // Adjust scroll snap behavior based on device
      if (isMobile) {
        container.style.scrollSnapType = 'y proximity';
        container.style.scrollSnapStop = 'always';
        (container.style as any).webkitOverflowScrolling = 'touch'; // iOS smooth scrolling
      } else {
        container.style.scrollSnapType = 'y mandatory';
        container.style.scrollSnapStop = 'always';
      }
      
      // Set scroll padding to account for navbar
      container.style.scrollPaddingTop = '0px';
    }
  }, [scrollDuration, isMobile]);
  
  // Enhanced scroll handling with debouncing for mobile
  useEffect(() => {
    if (!containerRef.current) return;
    
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;
    
    const handleScroll = () => {
      if (isMobile && !isScrolling) {
        isScrolling = true;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, scrollDuration);
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [containerRef, isMobile, scrollDuration]);

  // Render del layout basato sul dispositivo
  const renderLayout = () => {
    if (isMobile) {
      // Layout mobile - dinamico con flexbox column
      return (
        <div className='flex flex-col h-full justify-end'>
          {/* Video Player Section - flex-1 per prendere lo spazio disponibile */}
          <div className="flex-1 w-full">
            <VideoPlayer
              videoData={videoData}
              currentVideo={currentVideo}
              onVideoReady={handleVideoReady}
            />
          </div>
          
          {/* Text Content Section - flex-shrink-0 per mantenere la sua altezza naturale */}
          <div className={`flex-shrink-0 justify-self-end w-full overflow-hidden transition-opacity duration-200 ${
            isVideoPositioned ? 'opacity-100' : 'opacity-0'
          }`}>
            <ProgressIndicator
              totalItems={videoData.length}
              currentIndex={currentVideo}
            />
            
            {videoData.map((item, index) => (
              <FixedTextSection
                key={item.id}
                item={item}
                index={index}
                isActive={index === currentVideo}
              />
            ))}
          </div>
        </div>
      );
    } else if (isTablet) {
      // Layout tablet - proporzione controllata 60/40
      return (
        <div className="flex flex-col h-full">
          {/* Video Player Section - 60% dell'altezza */}
          <div className="h-3/5 w-full">
            <VideoPlayer
              videoData={videoData}
              currentVideo={currentVideo}
              onVideoReady={handleVideoReady}
            />
          </div>
          
          {/* Text Content Section - 40% dell'altezza */}
          <div className={`h-2/5 w-full relative overflow-hidden transition-opacity duration-200 ${
            isVideoPositioned ? 'opacity-100' : 'opacity-0'
          }`}>
            <ProgressIndicator
              totalItems={videoData.length}
              currentIndex={currentVideo}
            />
            
            {videoData.map((item, index) => (
              <FixedTextSection
                key={item.id}
                item={item}
                index={index}
                isActive={index === currentVideo}
              />
            ))}
          </div>
        </div>
      );
    } else {
      // Layout desktop - side by side 50/50
      return (
        <>
          <div className="w-full xl:w-1/2 flex-1 xl:h-full min-h-0">
            <VideoPlayer
              videoData={videoData}
              currentVideo={currentVideo}
              onVideoReady={handleVideoReady}
            />
          </div>
          
          <div className={`w-full xl:w-1/2 flex-shrink-0 xl:h-full relative overflow-hidden transition-opacity duration-200 ${
            isVideoPositioned ? 'opacity-100' : 'opacity-0'
          }`}>
            <ProgressIndicator
              totalItems={videoData.length}
              currentIndex={currentVideo}
            />
            
            {videoData.map((item, index) => (
              <FixedTextSection
                key={item.id}
                item={item}
                index={index}
                isActive={index === currentVideo}
              />
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-dark-900"
      style={{ 
        height: `${videoData.length * 100}vh`,
      }}
    >
      <div 
        ref={scrollContainerRef} 
        className={`sticky top-20 ${!isMobile && !isTablet ? 'flex xl:flex-row' : ''}`}
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {renderLayout()}
      </div>
      
      {/* Optional: Add smooth scroll CSS */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
          }
        }
        
        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ef4444, #eab308);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #dc2626, #ca8a04);
        }
        
        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #ef4444 rgba(0, 0, 0, 0.1);
        }
        
        /* Tablet specific optimizations */
        @media (min-width: 768px) and (max-width: 1023px) {
          /* Assicuriamoci che il text content sia scrollabile se necessario */
          .text-content-tablet {
            overflow-y: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .text-content-tablet::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Categories;