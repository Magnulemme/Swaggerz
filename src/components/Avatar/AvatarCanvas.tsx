'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { AvatarMan } from './AvatarMan';
import { AvatarGirl } from './AvatarGirl';


interface AvatarCanvasProps {
  avatarType?: 'man' | 'girl';
  animation?: 'idle' | 'victory' | 'dance';
  className?: string;
  enableZoom?: boolean;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
}

export default function AvatarCanvas({
  avatarType = 'man',
  animation = 'idle',
  className = '',
  enableZoom = false,
  minAzimuthAngle = -Math.PI / 2,
  maxAzimuthAngle = Math.PI / 2,
}: AvatarCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
          camera={{ position: [0, -0.2, 2.5], fov: 57 }}
          shadows
          gl={{
            antialias: false, // Disable for better performance
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
          }}
          dpr={[1, 1.5]} // Limit pixel ratio for better performance
          performance={{ min: 0.5 }} // Auto-degrade performance if needed
        >
          <Suspense fallback={null}>          
          {/* Optimized Lighting - reduced for better performance */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />

          {/* Avatar Model */}
          {avatarType === 'man' ? (
            <AvatarMan
              animation={animation}
              position={[0, -1.2, 0]}
              scale={1.2}
            />
          ) : (
            <AvatarGirl
              animation={animation}
              position={[0, -1.2, 0]}
              scale={1.2}
            />
          )}
          
          {/* Contact Shadows - optimized */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.3}
            scale={8}
            blur={1.5}
            far={2.5}
            resolution={256}
          />

          {/* Additional Lighting - simplified */}
          <hemisphereLight intensity={0.4} groundColor="#000000" />
          
          {/* Orbit Controls */}
          <OrbitControls
            enableZoom={enableZoom}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={minAzimuthAngle}
            maxAzimuthAngle={maxAzimuthAngle}
            target={[0, -0.3, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}