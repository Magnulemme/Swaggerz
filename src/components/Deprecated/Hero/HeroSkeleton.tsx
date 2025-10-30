'use client'

/**
 * Skeleton loader per Hero
 * Appare istantaneamente e migliora:
 * 1. Performance percepita dall'utente
 * 2. Punteggio Lighthouse (LCP più veloce)
 * 3. Layout Stability (CLS = 0, già lo hai!)
 */
export default function HeroSkeleton() {
  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px] relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Animated gradient overlay - simula il video shader */}
      <div className="absolute inset-0 animate-pulse">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(234, 179, 8, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(250, 204, 21, 0.1) 0%, transparent 50%)
            `,
            animation: 'float 3s ease-in-out infinite'
          }}
        />
      </div>

      {/* Brand name skeleton */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center space-y-4">
          {/* SWAGGERZ text skeleton */}
          <div className="h-20 w-[400px] bg-gradient-to-r from-yellow-600/20 via-orange-600/30 to-yellow-600/20 rounded-lg animate-pulse" />

          {/* Subtitle skeleton */}
          <div className="h-6 w-[320px] mx-auto bg-white/10 rounded animate-pulse delay-100" />

          {/* CTA skeleton */}
          <div className="h-12 w-[250px] mx-auto bg-white/5 rounded-full animate-pulse delay-200" />
        </div>
      </div>

      {/* 3D Avatar placeholder - simula la posizione */}
      <div className="absolute right-8 bottom-8 h-[400px] w-[200px] bg-gradient-to-t from-zinc-800/50 to-transparent rounded-2xl animate-pulse delay-300" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
