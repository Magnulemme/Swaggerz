// components/auth/SocialProof.tsx
import React from 'react';
import { Star } from 'lucide-react';

interface SocialProofProps {
  memberCount?: string;
  testimonial?: string;
  rating?: number;
}

export const SocialProof = ({ 
  memberCount = '10K+ membri attivi',
  testimonial = 'La community streetwear più autentica',
  rating = 5
}: SocialProofProps) => {
  return (
    <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
      <div className="flex items-center justify-center gap-1 mb-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-white text-xs font-medium mb-1">{memberCount}</p>
      <p className="text-zinc-400 text-xs">
        &quot;{testimonial}&quot;
      </p>
    </div>
  );
};