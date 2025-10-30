import React from 'react';
import HeroGradientShader from './HeroGradientShader';

/**
 * Background component with animated gradients and shader effects
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-20">
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Main card emphasis gradient with shader */}
      <HeroGradientShader />
    </div>
  );
}
