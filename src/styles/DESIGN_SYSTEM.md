# Swaggerz Design System

Questo documento descrive il design system di Swaggerz e come utilizzare le classi semantiche custom per mantenere coerenza visiva in tutto il sito.

## 📋 Indice

- [Perché un Design System?](#perché-un-design-system)
- [Spacing](#spacing)
- [Typography](#typography)
- [Border Radius](#border-radius)
- [Shadows](#shadows)
- [Transitions](#transitions)
- [Classi Preset](#classi-preset)
- [Esempi Pratici](#esempi-pratici)
- [Migrazione](#migrazione)

---

## Perché un Design System?

Prima del design system, il codice aveva valori inconsistenti:
- ❌ `p-6` in alcuni card, `px-6 py-4` in altri
- ❌ `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8` (troppa variazione)
- ❌ `text-lg` vs `text-sm` per scopi simili
- ❌ Responsive padding non standardizzato

Con il design system:
- ✅ Classi semantiche come `p-md`, `text-header`, `rounded-xl`
- ✅ Valori coerenti e prevedibili
- ✅ Facile da mantenere e aggiornare
- ✅ Comunicazione chiara dell'intenzione

---

## Spacing

### Scale di Spacing

| Classe | Valore | Pixel | Uso Consigliato |
|--------|--------|-------|------------------|
| `xs` | 0.5rem | 8px | Spaziature minime, gap tight |
| `sm` | 0.75rem | 12px | Spaziature piccole, elementi vicini |
| `md` | 1rem | 16px | **Spaziature base** (default) |
| `lg` | 1.5rem | 24px | Spaziature medie, sezioni |
| `xl` | 2rem | 32px | Spaziature larghe |
| `2xl` | 2.5rem | 40px | Spaziature extra larghe |
| `3xl` | 3rem | 48px | Spaziature molto larghe |
| `4xl` | 4rem | 64px | Section spacing |
| `5xl` | 5rem | 80px | Large section spacing |
| `6xl` | 6rem | 96px | Hero spacing |

### Classi Disponibili

#### Padding
```css
/* Tutti i lati */
.p-xs, .p-sm, .p-md, .p-lg, .p-xl, .p-2xl, .p-3xl

/* Orizzontale (left + right) */
.px-xs, .px-sm, .px-md, .px-lg, .px-xl, .px-2xl, .px-3xl

/* Verticale (top + bottom) */
.py-xs, .py-sm, .py-md, .py-lg, .py-xl, .py-2xl, .py-3xl

/* Singoli lati */
.pt-xs, .pb-xs, .pl-xs, .pr-xs (e tutte le varianti)
```

#### Margin
```css
/* Stessa struttura del padding */
.m-xs, .mx-sm, .my-md, .mt-lg, .mb-xl, etc.
```

#### Gap (Flexbox/Grid)
```css
/* Gap standard */
.gap-xs, .gap-sm, .gap-md, .gap-lg, .gap-xl, .gap-2xl, .gap-3xl

/* Gap direzionale */
.gap-x-md, .gap-y-lg
```

#### Space Between
```css
/* Spacing tra children (flexbox) */
.space-x-sm, .space-y-md
```

### Esempi

```tsx
// Card con padding medio
<div className="p-lg rounded-2xl">
  <h2 className="text-header mb-sm">Titolo</h2>
  <p className="text-description">Descrizione</p>
</div>

// Grid con gap consistente
<div className="grid grid-cols-3 gap-lg">
  {items.map(item => <Card key={item.id} />)}
</div>

// Stack verticale
<div className="flex flex-col space-y-md">
  <Button />
  <Button />
</div>
```

---

## Typography

### Font Sizes Semantici

| Classe | Valore | Pixel | Uso |
|--------|--------|-------|-----|
| `text-caption` | 0.75rem | 12px | Note, piccoli testi |
| `text-small` | 0.875rem | 14px | Testo secondario |
| `text-description` | 0.875rem | 14px | Descrizioni prodotti |
| `text-label` | 0.875rem | 14px | Labels form |
| `text-body` | 1rem | 16px | **Testo principale** |
| `text-body-lg` | 1.125rem | 18px | Testo enfatizzato |
| `text-subheader` | 1.25rem | 20px | Sottotitoli |
| `text-header` | 1.5rem | 24px | Titoli sezioni |
| `text-header-lg` | 1.875rem | 30px | Titoli grandi |
| `text-display` | 2.25rem | 36px | Display text |
| `text-display-lg` | 3rem | 48px | Hero titles |
| `text-display-xl` | 3.75rem | 60px | Large hero |
| `text-display-2xl` | 4.5rem | 72px | Extra large hero |

### Line Heights

| Classe | Valore | Uso |
|--------|--------|-----|
| `leading-tight` | 1.25 | Titoli, headers |
| `leading-snug` | 1.375 | Sottotitoli |
| `leading-normal` | 1.5 | **Testo normale** (default) |
| `leading-relaxed` | 1.625 | Paragrafi lunghi |
| `leading-loose` | 2 | Testo molto spaziato |

### Esempi

```tsx
// Hero section
<h1 className="text-display-2xl leading-tight font-bold">
  Benvenuto su Swaggerz
</h1>

// Card title
<h3 className="text-header leading-snug font-semibold mb-sm">
  Nome Prodotto
</h3>

// Product description
<p className="text-description leading-normal text-gray-600">
  Descrizione del prodotto...
</p>

// Form label
<label className="text-label font-medium">
  Email
</label>
```

---

## Border Radius

### Scale di Border Radius

| Classe | Valore | Pixel | Uso |
|--------|--------|-------|-----|
| `rounded-xs` | 0.25rem | 4px | Extra small |
| `rounded-base` | 0.5rem | 8px | Inputs, small cards |
| `rounded-lg` | 0.75rem | 12px | Buttons, medium cards |
| `rounded-xl` | 1rem | 16px | Cards, panels |
| `rounded-2xl` | 1.25rem | 20px | **Large cards** (standard) |
| `rounded-3xl` | 1.75rem | 28px | Featured sections |
| `rounded-4xl` | 2rem | 32px | Hero sections |
| `rounded-full` | 9999px | ∞ | Circular elements |

### Classi per Angoli Specifici

```css
/* Top corners */
.rounded-t-base, .rounded-t-lg, .rounded-t-xl

/* Bottom corners */
.rounded-b-base, .rounded-b-lg, .rounded-b-xl
```

### Esempi

```tsx
// Card standard
<div className="rounded-2xl bg-white p-lg">
  Content
</div>

// Button
<button className="rounded-xl px-lg py-sm">
  Click me
</button>

// Avatar circolare
<img className="rounded-full w-12 h-12" />

// Input
<input className="rounded-base px-md py-sm" />
```

---

## Shadows

### Scale di Shadows

| Classe | Uso |
|--------|-----|
| `shadow-sm` | Subtle shadow, hover states |
| `shadow-base` | Default shadow per cards |
| `shadow-md` | Medium shadow, elevated cards |
| `shadow-lg` | Large shadow, modals |
| `shadow-xl` | Extra large shadow, popovers |
| `shadow-inner` | Inner shadow, depressed elements |
| `shadow-glow` | Glow effect |
| `shadow-glow-lg` | Large glow effect |
| `shadow-none` | Rimuovi shadow |

### Esempi

```tsx
// Card con shadow standard
<div className="rounded-2xl shadow-base p-lg">
  Content
</div>

// Card hover con shadow animata
<div className="rounded-2xl shadow-base hover:shadow-lg transition-base">
  Hover me
</div>

// CTA button con glow
<button className="rounded-xl shadow-glow hover:shadow-glow-lg">
  Shop Now
</button>
```

---

## Transitions

### Durate delle Transizioni

| Classe | Valore | Uso |
|--------|--------|-----|
| `transition-fast` | 150ms | Hover rapidi, micro-interactions |
| `transition-base` | 200ms | **Transizioni standard** |
| `transition-slow` | 300ms | Transizioni smooth |
| `transition-slower` | 500ms | Transizioni elaborate |

### Esempi

```tsx
// Button con hover
<button className="rounded-xl shadow-base hover:shadow-lg transition-base">
  Hover me
</button>

// Card con multiple transizioni
<div className="
  rounded-2xl
  shadow-base
  hover:shadow-xl
  hover:scale-105
  transition-slow
">
  Content
</div>
```

---

## Classi Preset

### Card Padding

Presets per padding dei card:

```css
.card-padding-sm  /* padding: 16px */
.card-padding-md  /* padding: 24px */
.card-padding-lg  /* padding: 32px */
```

### Container Padding (Responsive)

```css
.container-padding
/* Mobile:  16px */
/* Tablet:  32px */
/* Desktop: 48px */
```

### Section Spacing (Responsive)

```css
.section-spacing-y
/* Mobile:  py-16px */
/* Tablet:  py-24px */
/* Desktop: py-48px */
```

### Esempi

```tsx
// Card con preset
<div className="rounded-2xl shadow-base card-padding-md">
  Content
</div>

// Container con padding responsive
<div className="container-padding max-w-7xl mx-auto">
  <h1>Content</h1>
</div>

// Section con spacing verticale
<section className="section-spacing-y">
  <h2>Section Title</h2>
</section>
```

---

## Esempi Pratici

### Product Card

**Prima (inconsistente):**
```tsx
<div className="p-6 rounded-2xl shadow-md">
  <img className="aspect-square rounded-xl mb-3" />
  <h3 className="text-lg font-semibold mb-2">Product Name</h3>
  <p className="text-sm text-gray-600 mb-4">Description</p>
  <button className="px-5 py-3 rounded-xl">Shop Now</button>
</div>
```

**Dopo (design system):**
```tsx
<div className="p-lg rounded-2xl shadow-base">
  <img className="aspect-square rounded-xl mb-sm" />
  <h3 className="text-header font-semibold mb-xs">Product Name</h3>
  <p className="text-description text-gray-600 mb-md">Description</p>
  <button className="px-lg py-sm rounded-xl">Shop Now</button>
</div>
```

### Hero Section

**Prima:**
```tsx
<section className="py-8 md:py-12 lg:py-20 px-4 md:px-6">
  <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">Title</h1>
  <p className="text-lg mb-8">Description</p>
</section>
```

**Dopo:**
```tsx
<section className="section-spacing-y container-padding">
  <h1 className="text-display-2xl leading-tight mb-lg">Title</h1>
  <p className="text-body-lg mb-xl">Description</p>
</section>
```

### Form

**Prima:**
```tsx
<form className="space-y-4">
  <div>
    <label className="text-sm font-medium">Email</label>
    <input className="px-4 py-3 rounded-lg" />
  </div>
  <button className="px-6 py-4 rounded-xl">Submit</button>
</form>
```

**Dopo:**
```tsx
<form className="space-y-md">
  <div>
    <label className="text-label font-medium">Email</label>
    <input className="px-md py-sm rounded-base" />
  </div>
  <button className="px-lg py-sm rounded-xl">Submit</button>
</form>
```

---

## Migrazione

### Mappatura Rapida

Ecco come convertire le vecchie classi alle nuove:

#### Padding/Margin
```
p-2  → p-xs   (8px)
p-3  → p-sm   (12px)
p-4  → p-md   (16px)
p-6  → p-lg   (24px)
p-8  → p-xl   (32px)
p-10 → p-2xl  (40px)
p-12 → p-3xl  (48px)
```

#### Gap
```
gap-1   → gap-xs  (8px)
gap-1.5 → gap-xs  (8px)
gap-2   → gap-xs  (8px)
gap-3   → gap-sm  (12px)
gap-4   → gap-md  (16px)
gap-6   → gap-lg  (24px)
gap-8   → gap-xl  (32px)
```

#### Typography
```
text-xs  → text-caption     (12px)
text-sm  → text-small       (14px)
text-base → text-body       (16px)
text-lg  → text-body-lg     (18px)
text-xl  → text-subheader   (20px)
text-2xl → text-header      (24px)
text-3xl → text-header-lg   (30px)
text-4xl → text-display     (36px)
text-5xl → text-display-lg  (48px)
text-6xl → text-display-xl  (60px)
text-7xl → text-display-2xl (72px)
```

#### Border Radius
```
rounded-md  → rounded-base  (8px)
rounded-lg  → rounded-lg    (12px)
rounded-xl  → rounded-xl    (16px)
rounded-2xl → rounded-2xl   (20px)
rounded-3xl → rounded-3xl   (28px)
```

### Strategia di Migrazione

1. **Inizia dai componenti core**: Navbar, Card, Button
2. **Poi Hero sections**: Hanno più variazioni
3. **Forms e Auth**: Molti padding diversi
4. **Resta del sito**: Gradualmente

### Trova e Sostituisci Globale

Puoi usare search & replace nel tuo editor:

```bash
# Esempio: sostituire p-6 con p-lg
# Cerca:    className="(.*?)p-6(.*?)"
# Sostituisci: className="$1p-lg$2"
```

**⚠️ ATTENZIONE**: Verifica sempre manualmente dopo la sostituzione!

---

## Best Practices

### ✅ DO

- Usa classi semantiche: `text-header`, `p-lg`
- Scegli il valore giusto per il contesto
- Mantieni consistenza tra componenti simili
- Usa i preset per pattern comuni

### ❌ DON'T

- Non mixare vecchie e nuove classi: ~~`p-6 mb-lg`~~ → `p-lg mb-lg`
- Non usare valori custom quando esiste una classe: ~~`className="p-[24px]"`~~ → `p-lg`
- Non creare troppi spacing diversi: usa la scale esistente

---

## Riferimenti Rapidi

### Design Tokens File
[src/styles/design-tokens.ts](./design-tokens.ts) - Tutti i valori del design system

### CSS Variables
[src/app/globals.css](../app/globals.css) - Variabili CSS e utility classes

---

## Supporto

Per domande o suggerimenti sul design system, contatta il team di design o apri una issue su GitHub.

**Happy coding! 🎨**
