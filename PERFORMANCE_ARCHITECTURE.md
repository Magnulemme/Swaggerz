# Performance Architecture - Swaggerz

## Panoramica delle Ottimizzazioni

Questo documento descrive l'architettura implementata per ottimizzare i tempi di caricamento della homepage.

## Problema Iniziale

- **Tempo di caricamento:** 10+ secondi per visualizzare il contenuto completo
- **Causa:** ~20+ immagini, 3 istanze di Three.js, carousel pesanti caricati tutti insieme nell'Hero
- **Risultato:** Esperienza utente molto lenta

## Architettura Ottimizzata

### 1. Separazione delle Sezioni

#### Hero Component (Contenuto Critico)
**File:** `src/components/Hero.tsx`

Contiene SOLO:
- `HeroVideoBanner` - Video con shader liquido (4.6MB ottimizzato)
- `Hero3dContent` - Avatar 3D + ShaderText
- `HeroBackground` - Gradienti animati

**Tempo di caricamento atteso (production):** ~3-5 secondi

#### GridContent Component (Contenuto Non Critico)
**File:** `src/components/GridContent.tsx`

Contiene:
- `BannerSectionLeft` - Carousel collezioni (Embla)
- `BannerSectionRight` - Descrizioni e CTA
- `BrandIdentityWindow` - Brand info
- `ProductShowcase` - 6 immagini prodotti
- `TopCollections` - Sidebar collezioni
- `FeaturedArtist` - Include CircularGallery (8 immagini in 3D)

**Totale:** ~20 immagini + carousel pesanti

### 2. Lazy Loading con Intersection Observer

#### GridContentWrapper Component
**File:** `src/components/GridContentWrapper.tsx`

```typescript
'use client'

import { Suspense, lazy, useState, useEffect, useRef } from 'react';

const GridContent = lazy(() => import('./GridContent'));

export default function GridContentWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '400px', // Inizia a caricare 400px prima
        threshold: 0
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={triggerRef} className="h-1" />
      {shouldLoad && (
        <Suspense fallback={<LoadingPlaceholder />}>
          <GridContent />
        </Suspense>
      )}
    </>
  );
}
```

**Benefici:**
- GridContent si carica SOLO quando l'utente scrolla vicino
- Riduce il carico iniziale di ~20 immagini e componenti pesanti
- Mostra placeholder elegante durante il caricamento

### 3. Ottimizzazioni Video

#### Prima
- File: `/public/videos/hero-video.mp4` - **27MB** ❌
- Preload: `metadata` (carica solo metadati)

#### Dopo
- File: `/public/videos/hero-video-optimized.mp4` - **4.6MB** ✅ (83% più leggero)
- Preload: `auto` (inizia il download subito)

**Impatto:** Download 6x più veloce

### 4. Ottimizzazioni Three.js

#### ShaderText
**File:** `src/components/ShaderText.tsx`

Ottimizzazioni:
- Throttling a 30fps (invece di 60fps)
- Intersection Observer per pausare quando non visibile
- `antialiasing: false` per migliori performance
- Pixel ratio limitato a max 2
- Conversione canvas→data URL ogni 2 frame (invece di ogni frame)

#### LiquidVideoShader
**File:** `src/components/Hero/LiquidVideoShader.tsx`

Ottimizzazioni:
- Throttling a 30fps
- `antialiasing: false`
- Texture RGB invece di RGBA (più leggera)
- `generateMipmaps: false` per video
- Intersection Observer per pausare rendering e video quando non visibile
- Pixel ratio limitato a max 2

#### AvatarCanvas
**File:** `src/components/Avatar/AvatarCanvas.tsx`

Ottimizzazioni:
- Intersection Observer - carica solo quando vicino al viewport (200px prima)
- `antialiasing: false`
- `dpr: [1, 1.5]` - Limita pixel ratio
- `performance: { min: 0.5 }` - Auto-degrading se necessario
- Shadow map ridotte: 512x512 (invece di default 2048x2048)
- ContactShadows con resolution 256 (invece di 512)

### 5. Dynamic Imports

Tutti i componenti non critici in GridContent usano dynamic imports:

```typescript
const BannerSectionLeft = dynamic(() => import('./Hero/BannerSectionLeft'), { ssr: false });
const BannerSectionRight = dynamic(() => import('./Hero/BannerSectionRight'), { ssr: false });
const BrandIdentityWindow = dynamic(() => import('./Hero/BrandIdentityWindow'), { ssr: false });
const TopCollections = dynamic(() => import('./Hero/TopCollections'), { ssr: false });
const ProductShowcase = dynamic(() => import('./Hero/ProductShowcase'), { ssr: false });
const FeaturedArtist = dynamic(() => import('./FeaturedArtist'), { ssr: false });
```

## Risultati

### Development Mode
- Prima compilazione: ~13s (normale - include compilazione TypeScript)
- Reload: ~300ms ✅

### Production Mode (Atteso)
- First Load: **3-5 secondi** (solo Hero)
- GridContent: Carica on-demand quando si scrolla
- Reload: **< 1 secondo**

### Metriche Chiave
- **Riduzione iniziale del bundle:** ~70% (solo Hero invece di tutto)
- **Riduzione download video:** 83% (da 27MB a 4.6MB)
- **Immagini lazy-loaded:** ~20 immagini non caricate subito
- **Three.js performance:** 30fps instead of 60fps = 50% meno overhead

## Best Practices Implementate

1. ✅ **Code Splitting** - Separazione logica tra contenuto critico e non critico
2. ✅ **Lazy Loading** - Caricamento on-demand con Intersection Observer
3. ✅ **Asset Optimization** - Video ottimizzato, texture ridotte
4. ✅ **Render Optimization** - Throttling, pausing quando non visibile
5. ✅ **Progressive Enhancement** - Contenuto critico prima, resto dopo

## Come Testare in Production

```bash
# Build production
npm run build

# Start production server
npm start
```

Apri DevTools → Network tab → Disable cache → Refresh
Osserva che:
1. Hero si carica rapidamente (~3-5s)
2. GridContent NON viene scaricato finché non scrolli
3. Quando scrolli vicino, vedi il placeholder e poi GridContent appare

## Ulteriori Ottimizzazioni Possibili

Se servono ulteriori miglioramenti:

1. **Image Optimization**
   - Usare `next/image` con placeholder blur per tutte le immagini
   - Convertire immagini a WebP/AVIF
   - Ridurre dimensioni immagini

2. **ShaderText Alternative**
   - Sostituire Three.js con gradienti CSS animati (100x più veloce)
   - Trade-off: meno effetto "wow", molto più veloce

3. **Avatar Loading**
   - Caricare avatar solo on-demand (click button)
   - Usare immagine statica come placeholder

4. **Video Further Optimization**
   - Ridurre risoluzione video
   - Usare poster image come placeholder
   - Caricare video solo su desktop (immagine statica su mobile)

5. **Preloading Strategic**
   - Preload font critici
   - Preconnect a domini esterni (Unsplash, ecc.)

## Conclusioni

L'architettura attuale bilancia:
- ✅ Esperienza visiva di alta qualità (shader, 3D, animazioni)
- ✅ Performance accettabili (~3-5s first load in production)
- ✅ Caricamento progressivo e user-friendly

In development mode i 13s sono normali per la compilazione. In production ci aspettiamo 3-5s per l'Hero, che è un tempo accettabile per contenuto così ricco.
