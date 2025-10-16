# Guida per Aggiungere Nuove Animazioni

## Problema risolto
Le animazioni originali dell'avatar non funzionavano perché:
- File FBX troppo grandi (2-3 MB vs 500-700 KB)
- Possibili problemi di compatibilità con la versione FBX
- Struttura skeleton potenzialmente diversa

## Come scaricare animazioni da Mixamo che funzionano

### 1. Vai su [Mixamo](https://www.mixamo.com/)

### 2. Carica il tuo modello
- Vai su "Upload Character"
- Carica `public/models/avatar/avatar-full.glb` o `public/models/developer/developer.glb`

### 3. Seleziona un'animazione
- Naviga tra le animazioni disponibili
- Clicca su quella che ti interessa

### 4. Impostazioni di download IMPORTANTI ⚠️
Clicca su "Download" e usa queste impostazioni:
```
Format: FBX Binary (.fbx)
Skin: Without Skin ← IMPORTANTE!
Frame Rate: 30 fps
Keyframe Reduction: ✓ (lascia attivo)
```

### 5. Rinomina e salva il file
- Rinomina il file con un nome semplice senza spazi: `wave.fbx`, `dance.fbx`, etc.
- Salva in `/public/models/avatar/` o `/public/models/developer/`

## Come aggiungere l'animazione al codice

### Per Avatar (`src/components/Avatar/AvatarModel.tsx`):

1. **Aggiungi il tipo di animazione**:
```typescript
type AnimationName = 'idle' | 'victory' | 'dance' | 'wave'; // ← aggiungi 'wave'
```

2. **Carica il file FBX**:
```typescript
const { animations: waveAnimation } = useFBX('/models/avatar/wave.fbx');
```

3. **Aggiungi al retargeting**:
```typescript
const retargetedAnimations = React.useMemo(() => {
  const retarget = (clip: THREE.AnimationClip, name: string) => {
    // ... codice esistente
  };

  return [
    retarget(idleAnimation[0], 'idle'),
    retarget(victoryAnimation[0], 'victory'),
    retarget(danceAnimation[0], 'dance'),
    retarget(waveAnimation[0], 'wave'), // ← aggiungi questa riga
  ];
}, [idleAnimation, victoryAnimation, danceAnimation, waveAnimation]); // ← aggiungi waveAnimation
```

4. **Aggiungi il preload**:
```typescript
useFBX.preload('/models/avatar/wave.fbx');
```

### Per la pagina Avatar (`src/app/(root)/avatar/page.tsx`):

1. **Aggiungi il tipo**:
```typescript
type AnimationName = 'idle' | 'victory' | 'dance' | 'wave';
```

2. **Aggiungi il pulsante**:
```tsx
<button
  onClick={() => setAnimation('wave')}
  className={`px-4 py-2 rounded-lg font-medium transition-all ${
    animation === 'wave'
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
  }`}
>
  Wave
</button>
```

## Perché le animazioni di Developer funzionano

Le animazioni in `/public/models/developer/` funzionano perché:
- ✅ Dimensioni ottimizzate (500-700 KB)
- ✅ Scaricate con le impostazioni corrette da Mixamo
- ✅ Formato FBX compatibile con Three.js
- ✅ Struttura skeleton corretta

## Soluzione attuale

Attualmente, sia Avatar che Developer usano le stesse animazioni:
- `idle.fbx`, `victory.fbx`, `salute.fbx`, `clapping.fbx` da `/models/developer/`

Puoi tranquillamente scaricare nuove animazioni seguendo questa guida e sostituirle!

## File di animazione problematici (da NON usare)

Questi file erano troppo grandi e non funzionavano:
- ❌ `/models/avatar/idle.fbx` (2.3 MB - troppo grande)
- ❌ `/models/avatar/Victory.fbx` (545 KB - possibile problema di compatibilità)
- ❌ `/models/avatar/Wave Hip Hop Dance.fbx` (883 KB - problema di compatibilità)

## Tips

1. **Mantieni i file FBX sotto 1 MB** quando possibile
2. **Usa sempre "Without Skin"** quando scarichi da Mixamo
3. **Frame rate 30 fps** è lo standard
4. **Keyframe Reduction attivo** riduce la dimensione del file
5. **Testa sempre una nuova animazione** prima di committare
