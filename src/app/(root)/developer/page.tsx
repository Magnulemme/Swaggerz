'use client';

import { DeveloperScene } from '@/components/Developer';
import { useState } from 'react';

type AnimationName = 'idle' | 'victory' | 'salute' | 'clapping';

export default function DeveloperPage() {
  const [animation, setAnimation] = useState<AnimationName>('idle');

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute top-4 left-4 z-10 text-white">
        <h1 className="text-2xl font-bold mb-2">Developer Model</h1>
        <p className="text-sm text-gray-400 mb-4">
          Usa il mouse per ruotare • Scroll per zoom • Drag per spostare
        </p>

        {/* Animation Controls */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Animazioni</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setAnimation('idle')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animation === 'idle'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Idle
            </button>
            <button
              onClick={() => setAnimation('victory')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animation === 'victory'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Victory
            </button>
            <button
              onClick={() => setAnimation('salute')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animation === 'salute'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Salute
            </button>
            <button
              onClick={() => setAnimation('clapping')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animation === 'clapping'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Clapping
            </button>
          </div>
        </div>
      </div>
      <DeveloperScene animation={animation} />
    </div>
  );
}
