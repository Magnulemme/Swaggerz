'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { DeveloperModel } from './DeveloperModel';

type AnimationName = 'idle' | 'victory' | 'salute' | 'clapping';

interface DeveloperSceneProps {
  animation?: AnimationName;
}

export function DeveloperScene({ animation = 'idle' }: DeveloperSceneProps) {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 1, 3], fov: 50 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        {/* Developer Model */}
        <Suspense fallback={null}>
          <DeveloperModel position={[0, -1, 0]} scale={1} animation={animation} />

          {/* Ground Shadow */}
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>

        {/* Controls - permette di ruotare la camera con il mouse */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          target={[0, 0.5, 0]}
          minDistance={1}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
