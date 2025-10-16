# Prossimi Step di Ottimizzazione

## Risultati Attuali (Lighthouse)
- **Performance: 80/100** ✅ Target raggiunto: LCP 1.5s (da ~13s)
- **FCP: 1.2s** ✅ Ottimo
- **LCP: 1.5s** ✅ Ottimo
- **TBT: 210ms** ⚠️ Può migliorare
- **CLS: 0.054** ✅ Ottimo

## Obiettivo: 90+ Performance

### 1. Ridurre JavaScript Execution Time (3.5s → <2s)

#### Problema: Three.js caricato 3 volte
- ShaderText: ~1.2s
- LiquidVideoShader: ~1.5s
- AvatarCanvas: ~0.8s

#### Soluzioni:

**A. Shared Three.js Instance**
```typescript
// src/lib/sharedThreeJS.ts
let sharedRenderer: THREE.WebGLRenderer | null = null;

export function getSharedRenderer(canvas: HTMLCanvasElement) {
  if (!sharedRenderer) {
    sharedRenderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
  }
  return sharedRenderer;
}
```

**B. Lazy Load Avatar**
```typescript
// Carica avatar solo al click
<button onClick={() => setShowAvatar(true)}>
  Visualizza Avatar 3D
</button>
{showAvatar && <AvatarCanvas />}
```

**C. Alternative CSS per ShaderText** (trade-off qualità/performance)
```typescript
// Usa gradient CSS invece di Three.js shader
// Guadagno: -1.2s execution time
// Perdita: Effetto visivo meno "wow"
```

### 2. Ridurre Unused JavaScript (1,878 KiB)

#### Analisi Bundle
```bash
# Genera bundle analyzer
npm install --save-dev @next/bundle-analyzer
```

```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

```bash
# Run analysis
ANALYZE=true npm run build
```

#### Azioni:
- Rimuovere librerie non usate
- Sostituire librerie pesanti con alternative più leggere
- Esempio: Embla Carousel → CSS Scroll Snap?

### 3. Ottimizzare Network Payload (9.1 MB → <5 MB)

#### Video Ottimizzazione Avanzata
```bash
# Ultra-compressed video per mobile
ffmpeg -i hero-video.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1280:-2" \
  -movflags +faststart \
  hero-video-mobile.mp4
```

```typescript
// Responsive video loading
<video>
  <source
    src="/videos/hero-video-mobile.mp4"
    media="(max-width: 768px)"
  />
  <source src="/videos/hero-video-optimized.mp4" />
</video>
```

#### Immagini WebP/AVIF
```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
}
```

### 4. Ridurre Total Blocking Time (210ms → <150ms)

#### Code Splitting Aggressivo
```typescript
// Split GridContent in sotto-componenti lazy
const ProductShowcase = lazy(() => import('./ProductShowcase'));
const FeaturedArtist = lazy(() => import('./FeaturedArtist'));
const TopCollections = lazy(() => import('./TopCollections'));

// Carica uno alla volta con Intersection Observer
```

#### Web Workers per Computazioni Pesanti
```typescript
// Sposta calcoli Three.js in Web Worker
// Esempio: Shader calculations, geometry processing
```

### 5. Preloading Strategico

```typescript
// app/layout.tsx
<head>
  {/* Preload video ottimizzato */}
  <link
    rel="preload"
    href="/videos/hero-video-optimized.mp4"
    as="video"
    type="video/mp4"
  />

  {/* Preconnect a domini esterni */}
  <link rel="preconnect" href="https://images.unsplash.com" />
  <link rel="dns-prefetch" href="https://images.unsplash.com" />
</head>
```

### 6. Service Worker per Caching

```typescript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/videos/hero-video-optimized.mp4',
        '/fonts/jost.woff2',
        // Altri asset critici
      ]);
    })
  );
});
```

### 7. Accessibility Fixes (85 → 95)

```typescript
// Aggiungere aria-labels
<button aria-label="Esplora collezione">
  <span>→</span>
</button>

// Video captions
<video>
  <track kind="captions" src="/captions.vtt" srclang="it" />
</video>

// Migliorare contrasto colori
// Attuale: alcuni testi hanno contrast ratio < 4.5:1
// Target: tutti i testi > 4.5:1
```

### 8. SEO Fixes (63 → 90)

```typescript
// src/app/layout.tsx
export const metadata = {
  title: "Swaggerz - NFT Streetwear",
  description: "...",
  robots: {
    index: true,  // Attualmente false!
    follow: true,
  },
  openGraph: {
    images: ['/og-image.jpg'],
  },
}
```

## Priority Matrix

| Ottimizzazione | Impatto | Effort | Priority |
|---|---|---|---|
| Lazy load Avatar | Alto (+15) | Basso | 🔥 HIGH |
| Video mobile | Alto (+10) | Medio | 🔥 HIGH |
| Bundle analysis | Medio (+8) | Basso | ⭐ MEDIUM |
| CSS ShaderText | Alto (+12) | Alto | ⚡ LOW (trade-off) |
| Web Workers | Medio (+5) | Alto | ⚡ LOW |
| Service Worker | Basso (+3) | Medio | ⚡ LOW |

## Roadmap Suggerita

### Phase 1: Quick Wins (1-2 giorni)
1. ✅ Lazy load Avatar (click to view)
2. ✅ Video ottimizzato mobile
3. ✅ Bundle analysis
4. ✅ Accessibility fixes
5. ✅ SEO robots fix

**Expected Result: Performance 85-87**

### Phase 2: Medium Effort (3-5 giorni)
1. Code splitting più granulare
2. Immagini WebP/AVIF
3. Preloading strategico
4. Shared Three.js instance

**Expected Result: Performance 90-92**

### Phase 3: Advanced (1-2 settimane)
1. Web Workers per Three.js
2. Service Worker caching
3. Alternative CSS ShaderText (opzionale)

**Expected Result: Performance 93-95**

## Conclusioni

**Attuale:** 80/100 con LCP 1.5s è un **ottimo risultato** considerando:
- Video 4.6 MB
- 3 istanze Three.js con shader complessi
- Avatar 3D interattivo
- 20+ immagini lazy-loaded

**Per 90+:** Necessario trade-off tra visual impact e performance.

**Raccomandazione:**
- Mantenere l'architettura attuale (80/100 è buono!)
- Implementare solo Phase 1 quick wins (→ 85-87)
- User experience già molto migliorata (da 13s a 1.5s LCP!)
