// components/Categories/VideoPlayer.tsx
"use client"

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { VideoDataItem } from '@/types/video.types';

interface VideoPlayerProps {
  videoData: VideoDataItem[];
  currentVideo: number;
  onVideoReady?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoData, currentVideo, onVideoReady }) => {
  useEffect(() => {
    if (onVideoReady) {
      const timer = setTimeout(onVideoReady, 50);
      return () => clearTimeout(timer);
    }
  }, [currentVideo, onVideoReady]);

  return (
    <div className="w-full h-full xl:sticky xl:top-0 flex flex-col p-4 lg:p-16">
      <motion.div
        className="flex flex-col h-full w-full max-w-none"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Container che DEVE mantenere le sue dimensioni flex */}
        <div className="relative flex-1 w-full bg-zinc-900 rounded-xl overflow-hidden min-h-0">
          {/* IMPORTANTE: absolute + inset-0 forza il video a rimanere nel container */}
          <div className="absolute inset-0">
            <motion.video
              key={currentVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              // Aggiungi questi attributi per forzare le dimensioni
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                height: '100%'
              }}
            >
              <source src={videoData[currentVideo]?.src} type="video/mp4" />
            </motion.video>
          </div>
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-center justify-center">
            <motion.div
              className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer border border-white/20"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </motion.div>
          </div>
          
          {/* Progress Indicator */}
          <div className="absolute top-2 lg:top-6 right-2 lg:right-6 z-10">
            <div className="flex flex-row items-center gap-1 lg:gap-2">
              {videoData.map((_, index: number) => (
                <motion.div
                  key={index}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentVideo
                      ? 'w-6 h-1 lg:w-8 lg:h-1 bg-white'
                      : 'w-2 h-1 lg:w-2 lg:h-1 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;