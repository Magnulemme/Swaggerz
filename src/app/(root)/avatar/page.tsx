'use client';

import { AvatarScene } from '@/components/Avatar';
import { useState } from 'react';

type AnimationName = 'idle' | 'victory' | 'dance';

export default function AvatarPage() {
  const [animation, setAnimation] = useState<AnimationName>('idle');

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute top-4 left-4 z-10 text-white">
        <h1 className="text-2xl font-bold mb-2">Ready Player Me Avatar</h1>
        <p className="text-sm text-gray-400 mb-4">
          Usa il mouse per ruotare • Scroll per zoom • Drag per spostare
        </p>

        {/* Animation Controls */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Animazioni</p>
          <div className="flex gap-2">
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
              onClick={() => setAnimation('dance')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                animation === 'dance'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Dance
            </button>
          </div>
        </div>
      </div>
      <AvatarScene animation={animation} />
    </div>
  );
}
