# Swaggerz Design System

Sistema di design **dedotto** dal codice esistente. Non imponiamo un sistema, lo estraiamo.

---

## 🎯 Approccio: Deduzione, non Induzione

1. **Analizziamo** i componenti esistenti
2. **Estraiamo** i pattern ricorrenti
3. **Standardizziamo** solo ciò che ha senso
4. **Migriamo** gradualmente

---

## 📐 Spacing/Padding System

Scala Tailwind standard (multipli di 4px): **4px → 80px**

```css
p-2xs  → 4px   (0.25rem)  = p-1
p-xs   → 8px   (0.5rem)   = p-2
p-sm   → 16px  (1rem)     = p-4
p-md   → 24px  (1.5rem)   = p-6
p-lg   → 32px  (2rem)     = p-8
p-xl   → 48px  (3rem)     = p-12
p-2xl  → 64px  (4rem)     = p-16
p-3xl  → 80px  (5rem)     = p-20
```

### Utilizzo

Funziona con **tutte le utility Tailwind**:

```tsx
// Padding
<div className="p-xl">      {/* 16px tutti i lati */}
<div className="px-lg">     {/* 12px horizontal */}
<div className="py-2xl">    {/* 20px vertical */}

// Margin
<div className="m-lg">      {/* 12px */}
<div className="mb-xl">     {/* 16px bottom */}

// Gap
<div className="gap-md">    {/* 8px gap */}
<div className="gap-x-lg">  {/* 12px horizontal gap */}

// Space Between
<div className="space-y-xl"> {/* 16px tra children */}
```

### Quando usare cosa?

- **Tailwind defaults** (p-1, p-2, p-4...): Per multipli di 4px (4, 8, 16, 32...)
- **Custom scale** (p-xs, p-sm...): Per valori intermedi (2, 6, 12, 20...)

---

## 📏 Max-Width System (Leggibilità)

Sistema per contenitori di testo con larghezze ottimali per la lettura.

```css
max-w-prose-sm  → 384px (24rem)  - Testo breve/didascalie (40-50 caratteri)
max-w-prose     → 512px (32rem)  - Testo medio (50-60 caratteri)
max-w-prose-lg  → 672px (42rem)  - Testo lungo/paragrafi (60-70 caratteri)
max-w-title     → 768px (48rem)  - Titoli/headline
```

### Utilizzo

```tsx
// Footer description (testo breve)
<p className="text-zinc-400 max-w-prose-sm">
  L'unico marketplace dove i tuoi NFT diventano streetwear esclusivo.
</p>

// Paragrafo normale
<p className="text-zinc-300 leading-relaxed max-w-prose">
  Swaggerz nasce per chi vive la strada come una tela da reinventare.
  Non seguiamo le tendenze: le creiamo.
</p>

// Paragrafo lungo
<p className="text-zinc-200 max-w-prose-lg">
  Con ogni drop, celebriamo l'arte, la libertà e la voglia di cambiare
  le regole — insieme. Non avere paura, entra nel movimento.
</p>
```

### Quando usare cosa?

- `max-w-prose-sm`: Descrizioni brevi, footer, cards
- `max-w-prose`: Paragrafi standard, body text
- `max-w-prose-lg`: Articoli, contenuti lunghi
- `max-w-title`: Titoli hero, headlines

---

## ✍️ Typography (TODO)

**Da dedurre analizzando i componenti**

Per ora: usa Tailwind defaults
```css
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl...
font-light, font-normal, font-medium, font-semibold, font-bold
leading-tight, leading-normal, leading-relaxed
```

---

## 🎨 Color System - Semantico

**Sistema semantico light/dark**: non numeri, ma SIGNIFICATI.

### Perché Semantico?

❌ `text-zinc-400` → Devi ricordare: 400 = secondario?
✅ `text-light-secondary` → Capisci subito: testo secondario!

**Coerenza**: Usiamo già `p-sm`, `gap-md` (semantico), perché i colori dovrebbero essere diversi?

---

### Backgrounds (Dark Mode)

```tsx
bg-dark            → Base surface (fondazione del sito)
```
**Perché**: Profondità massima, crea atmosfera premium
**Valore**: zinc-950
**Dove**: Body, hero sections, base page

```tsx
bg-dark-elevated   → Elevated surface (elementi fluttuanti)
```
**Perché**: Contrasto con base, fa "levitare" elementi
**Valore**: black
**Dove**: Navbar pill, overlay, elementi rialzati

```tsx
bg-dark-element    → Element surface (contenitori, icone)
```
**Perché**: Separazione visiva senza peso
**Valore**: zinc-900
**Dove**: Card, icone, buttons, footer, qualsiasi elemento che necessita contrasto

---

### Text Colors (On Dark)

```tsx
text-light                → Primary text
```
**Perché**: Massima leggibilità, contrasto perfetto
**Valore**: white
**Dove**: Titoli, CTA, testo principale

```tsx
text-light-secondary      → Secondary text
```
**Perché**: Gerarchia visiva, senza perdere leggibilità
**Valore**: zinc-300 (più chiaro)
**Dove**: Sottotitoli, descrizioni importanti, testo di supporto

```tsx
text-light-tertiary       → Tertiary text
```
**Perché**: Info non critiche, livello più basso nella gerarchia
**Valore**: zinc-400 (più scuro)
**Dove**: Descrizioni nelle card, caption, metadata

---

### Brand Colors

```tsx
text-brand         → Primary brand
bg-brand           → Brand background
border-brand       → Brand borders
```
**Perché**: Identità, energia, attenzione
**Valore**: orange-500
**Dove**: CTA, link, focus, elementi interattivi

```tsx
/* Brand Gradient Signature */
from-red-500 via-orange-500 to-yellow-400
```
**Perché**: Firma distintiva Swaggerz
**Dove**: Logo, hero titles, elementi premium

---

### Interactive States (Verified - NavbarActions)

```tsx
bg-dark-element-hover      → Hover state per elementi
```
**Perché**: Feedback visivo chiaro senza essere invasivo
**Valore**: zinc-800
**Dove**: Hover su icon buttons, elementi interattivi

---

### Borders (Verified)

```tsx
border-white/10            → Separatori sottili
```
**Perché**: Separazione delicata, non invasiva
**Valore**: white con 10% opacità
**Dove**: Borders di default, separatori, outline

```tsx
border-brand/40            → Interactive borders
```
**Perché**: Feedback hover con colore brand
**Valore**: orange-500 con 40% opacità
**Dove**: Hover/focus state su borders

---

### Transizioni Standard

```tsx
transition-all duration-300  → Smooth transitions
```
**Dove**: Tutti gli stati hover, animazioni UI

---

### Esempi d'Uso

```tsx
// Card standard
<div className="bg-dark-element border border-light">
  <h3 className="text-light">Title</h3>
  <p className="text-light-secondary">Description</p>
  <span className="text-light-tertiary">Metadata</span>
</div>

// Icon button
<button className="bg-dark-element">
  <Icon className="text-light-secondary" />
</button>

// Link brand
<a className="text-brand">Learn more</a>
```

---

### Scala di Gerarchia

**Backgrounds** (dal più scuro al più chiaro):
1. `bg-dark` → Foundation
2. `bg-dark-elevated` → Floating elements
3. `bg-dark-element` → Content containers, icons, buttons

**Text** (dal più visibile al meno):
1. `text-light` (white) → Headings, titoli principali
2. `text-light-secondary` (zinc-300) → Sottotitoli, descrizioni importanti
3. `text-light-tertiary` (zinc-400) → Descrizioni card, caption, metadata
4. `text-brand` (orange-500) → Interactive, CTA

---

## 📦 Esempi Base

```tsx
// Card con spacing custom
<div className="p-xl rounded-2xl border">
  <h3 className="text-2xl font-semibold mb-lg">Titolo</h3>
  <p className="text-sm mb-xl">Descrizione</p>
</div>

// Grid con gap custom
<div className="grid grid-cols-3 gap-lg">
  <Card />
  <Card />
  <Card />
</div>

// Navigation con padding custom
<nav className="px-xl py-lg flex gap-md">
  <a>Home</a>
  <a>Shop</a>
</nav>
```

---

## 🔄 Migrazione

### Step 1: Spacing ✅ (Completato)
- [x] Definita scala pragmatica 2-24px
- [x] Zero conflitti con Tailwind
- [x] Implementata in `globals.css`

### Step 2: Typography (In attesa)
- [ ] Analizzare font-size usati nei componenti
- [ ] Identificare pattern ricorrenti
- [ ] Creare variabili semantiche

### Step 3: Colors (In attesa)
- [ ] Analizzare palette colori usata
- [ ] Identificare brand colors
- [ ] Standardizzare naming

### Step 4: Ottimizzazione componenti (In attesa)
- [ ] Migrare componenti chiave
- [ ] Testare consistenza visiva
- [ ] Refactoring graduale

---

## 📁 File

- **globals.css** - Definizioni `@theme` con scale spacing
- **DESIGN_SYSTEM.md** - Questa documentazione (living document)

---

## 🚀 Next Steps

1. **Analizzare un componente** (es. Navbar, Card)
2. **Estrarre valori reali** di typography e colors
3. **Discutere** quali standardizzare
4. **Iterare** componente per componente

---

**Living document - Si evolve con il progetto**
