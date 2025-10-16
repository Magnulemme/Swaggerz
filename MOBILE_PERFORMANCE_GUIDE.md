# 📱 Guida Ottimizzazione Performance Mobile

Raccomandazioni specifiche per migliorare le performance su dispositivi mobili e tablet.

---

## 🎯 Problemi Identificati e Soluzioni

### 1. **Componenti Three.js Caricati su Mobile** ⚠️ PRIORITÀ ALTA

#### Problema
- `ShaderText` viene caricato su **tutti i dispositivi** (anche mobile)
- Ogni istanza di ShaderText crea:
  - Scene Three.js separata
  - Canvas nascosto
  - Loop di rendering a 30fps
  - Conversione canvas → dataURL ogni 66ms

**Impatto**: 3-4 istanze di ShaderText = rendering multiplo inutile su mobile

#### Soluzione: Conditional Rendering con Mouse Detection

```tsx
// src/components/ShaderText.tsx - Wrapper condizionale
"use client"

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Lazy load del componente shader
const ShaderTextCore = dynamic(() => import('./ShaderTextCore'), {
  ssr: false,
  loading: () => <span className="text-zinc-100">Loading...</span>
});

interface ShaderTextProps {
  children?: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

export default function ShaderText(props: ShaderTextProps) {
  const [hasMouseSupport, setHasMouseSupport] = useState(false);

  useEffect(() => {
    // Desktop con mouse = shader
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isLargeScreen = window.innerWidth >= 1024;
    setHasMouseSupport(supportsHover && isLargeScreen);
  }, []);

  // Mobile: testo normale senza shader
  if (!hasMouseSupport) {
    return (
      <span
        className={props.className}
        style={{
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          fontFamily: 'Jost, sans-serif',
          // Gradient CSS come fallback
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {props.children}
      </span>
    );
  }

  // Desktop: componente con shader
  return <ShaderTextCore {...props} />;
}
```

**Benefit**:
- ✅ Elimina Three.js su mobile (risparmio ~200KB bundle + GPU)
- ✅ Gradient CSS nativo è istantaneo
- ✅ Nessun rendering loop su mobile

---

### 2. **Immagini Non Ottimizzate** ⚠️ PRIORITÀ ALTA

#### Problema
```
trending-1.png      2.8 MB  ❌
rebkon-logo.png     2.6 MB  ❌
trending-2.png      1.3 MB  ❌
trending-3.png      1.1 MB  ❌
feature.png         952 KB  ❌
hero-shoe.png       852 KB  ❌
```

**Impatto**: 9+ MB solo in immagini PNG non compresse!

#### Soluzione: Conversione WebP + Next.js Image

```bash
# Converti tutte le PNG in WebP (80% compressione)
npm install sharp
```

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = './public';
const images = [
  'trending-1.png',
  'trending-2.png',
  'trending-3.png',
  'rebkon-logo.png',
  'feature.png',
  'hero-shoe.png',
  'hero-bg.png'
];

images.forEach(async (img) => {
  const input = path.join(publicDir, img);
  const output = path.join(publicDir, img.replace('.png', '.webp'));

  await sharp(input)
    .webp({ quality: 85 })
    .toFile(output);

  console.log(`✅ ${img} → ${output}`);
});
```

Poi usa `next/image`:
```tsx
import Image from 'next/image';

<Image
  src="/trending-1.webp"
  alt="Trending"
  width={800}
  height={400}
  loading="lazy"
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Benefit**:
- ✅ 70-80% riduzione dimensione (2.8MB → ~600KB)
- ✅ Lazy loading automatico
- ✅ Responsive images
- ✅ WebP con fallback PNG

---

### 3. **Modelli 3D Avatar Pesanti** ⚠️ PRIORITÀ MEDIA

#### Problema
```
avatar-girl.glb     1.6 MB  ⚠️
avatar-full.glb     1.3 MB  ⚠️
```

**Impatto**: Caricamento lento su 3G/4G + parsing GPU

#### Soluzione: Draco Compression + Lazy Loading

```bash
# Comprimi GLB con Draco
npm install -g gltf-pipeline
```

```bash
gltf-pipeline -i public/models/avatar/avatar-girl.glb \
  -o public/models/avatar/avatar-girl-draco.glb \
  -d
```

Poi lazy load condizionale:
```tsx
// src/components/Avatar/AvatarCanvas.tsx
const [shouldLoad3D, setShouldLoad3D] = useState(false);

useEffect(() => {
  // Carica 3D solo su desktop con mouse
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isLargeScreen = window.innerWidth >= 1024;
  setShouldLoad3D(supportsHover && isLargeScreen);
}, []);

if (!shouldLoad3D) {
  // Mobile: mostra immagine statica invece di modello 3D
  return (
    <Image
      src="/avatar-preview.webp"
      alt="Avatar"
      width={300}
      height={600}
      className="object-cover"
    />
  );
}
```

**Benefit**:
- ✅ 60-70% compressione (1.6MB → ~500KB)
- ✅ Mobile usa immagini statiche (~50KB)
- ✅ Risparmio GPU su dispositivi touch

---

### 4. **Lazy Loading Componenti Pesanti** ⚠️ PRIORITÀ ALTA

#### Problema
Tutti i componenti vengono caricati immediatamente, anche sotto la fold.

#### Soluzione: Dynamic Imports + Intersection Observer

```tsx
// src/app/(root)/page.tsx
import dynamic from 'next/dynamic';

// Lazy load componenti sotto la fold
const GridContentWrapper = dynamic(() => import('@/components/GridContentWrapper'), {
  ssr: false,
  loading: () => <div className="min-h-screen animate-pulse bg-zinc-900" />
});

const Hero3dContent = dynamic(() => import('@/components/Hero/Hero3dContent'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-zinc-900 animate-pulse" />
});

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* Carica solo quando visibile */}
      <GridContentWrapper />
    </div>
  );
}
```

**Benefit**:
- ✅ Initial bundle -40%
- ✅ First Contentful Paint più veloce
- ✅ Caricamento progressivo

---

### 5. **Video: Versione Mobile Più Leggera** ⚠️ PRIORITÀ MEDIA

#### Problema
Stesso video 20MB su mobile e desktop

#### Soluzione: Video Responsive con Source Multiple

```tsx
// src/components/Hero/HeroVideoBanner.tsx
<video autoPlay loop muted playsInline preload="auto">
  {/* Mobile: 720p, bitrate basso */}
  <source
    src="/videos/hero-video-mobile.mp4"
    type="video/mp4"
    media="(max-width: 1023px)"
  />
  {/* Desktop: 1080p, alta qualità */}
  <source
    src="/videos/hero-video-hq.mp4"
    type="video/mp4"
    media="(min-width: 1024px)"
  />
</video>
```

Crea versione mobile:
```bash
ffmpeg -i public/videos/hero-video.mp4 \
  -vf "scale=1280:720:flags=lanczos" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -profile:v main \
  -level 3.1 \
  -movflags +faststart \
  -an \
  public/videos/hero-video-mobile.mp4
```

**Benefit**:
- ✅ Mobile: 720p @ 3 Mbps (~6MB invece di 20MB)
- ✅ -70% tempo caricamento su 4G
- ✅ Risparmio dati per utenti

---

### 6. **Preload e Resource Hints** ⚠️ PRIORITÀ BASSA

#### Soluzione: Preload risorse critiche

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Preload font critico */}
        <link
          rel="preload"
          href="/fonts/jost-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preconnect a domini esterni */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

### 7. **Throttle Resize Events** ⚠️ PRIORITÀ BASSA

#### Problema
Ogni componente ascolta `window.resize` senza throttling

#### Soluzione: Custom Hook con Debounce

```tsx
// src/hooks/useWindowSize.ts
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 150); // Debounce 150ms
    };

    handleResize(); // Initial
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
}
```

Usa nei componenti:
```tsx
const { width } = useWindowSize();
const isLargeScreen = width >= 1024;
```

---

## 📊 Impatto Stimato delle Ottimizzazioni

| Ottimizzazione | Bundle Size | LCP (4G) | GPU Usage | Priorità |
|----------------|-------------|----------|-----------|----------|
| ShaderText condizionale | -200 KB | -0.3s | -60% | 🔴 Alta |
| Immagini WebP | -7 MB | -2.5s | - | 🔴 Alta |
| Lazy loading componenti | -300 KB | -0.8s | - | 🔴 Alta |
| Avatar condizionale | -150 KB | -0.5s | -80% | 🟡 Media |
| Video mobile | -14 MB | -4s | - | 🟡 Media |
| GLB Draco compression | -2 MB | -1s | -20% | 🟡 Media |
| Preload/Prefetch | - | -0.2s | - | 🟢 Bassa |
| Resize throttling | - | - | -10% | 🟢 Bassa |

**Totale stimato**:
- 📦 Bundle: **-650 KB** (-40%)
- 🖼️ Media: **-23 MB** (-75%)
- ⚡ LCP mobile: **-8.3s** (da ~12s a ~4s)
- 🎮 GPU usage: **-70%** su mobile

---

## 🚀 Piano di Implementazione Consigliato

### Fase 1 - Quick Wins (1-2 ore)
1. ✅ Shader video già fatto (mouse detection)
2. Wrapper condizionale per ShaderText
3. Lazy load GridContentWrapper e Hero3dContent

### Fase 2 - Ottimizzazione Media (2-3 ore)
4. Conversione immagini PNG → WebP
5. Creazione video mobile 720p
6. Sostituzione `<img>` con `<Image>` di Next.js

### Fase 3 - Ottimizzazioni Avanzate (3-4 ore)
7. Avatar condizionale (immagine su mobile, 3D su desktop)
8. Compressione GLB con Draco
9. Preload e resource hints

### Fase 4 - Rifinitura (1-2 ore)
10. Custom hook useWindowSize con debounce
11. Testing su dispositivi reali
12. Lighthouse audit e fix finali

---

## 🧪 Testing

Testa le performance con:

```bash
# Lighthouse CI
npm run build
npx lighthouse http://localhost:3000 --view --throttling.cpuSlowdownMultiplier=4

# Bundle analyzer
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... resto config
});
```

```bash
ANALYZE=true npm run build
```

---

## 📱 Target Performance Metrics

### Mobile (4G, Mid-tier phone)
- **FCP**: < 1.5s ✅
- **LCP**: < 3.5s ✅
- **TTI**: < 5s ✅
- **CLS**: < 0.1 ✅
- **FID**: < 100ms ✅

### Desktop
- **FCP**: < 0.8s ✅
- **LCP**: < 2s ✅
- **TTI**: < 3s ✅

---

**Implementa queste ottimizzazioni per un'esperienza mobile eccellente!** 🚀
