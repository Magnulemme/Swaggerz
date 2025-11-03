/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
  // Desktop images (keep high res for large screens)
  {
    input: 'public/hero desk/jc-gellidon-Zbrz62vBmb0-unsplash.jpg',
    output: 'public/hero desk/jc-gellidon-Zbrz62vBmb0-unsplash.avif',
    maxWidth: 1920, // Desktop
  },
  {
    input: 'public/hero desk/adam-barclay-S2W3jMJ6ayc-unsplash.jpg',
    output: 'public/hero desk/adam-barclay-S2W3jMJ6ayc-unsplash.avif',
    maxWidth: 1920,
  },
  {
    input: 'public/hero desk/swaggerz-hero.jpg',
    output: 'public/hero desk/swaggerz-hero.avif',
    maxWidth: 1920,
  },
  // Mobile images (reduce size significantly for mobile viewports)
  {
    input: 'public/hero mob/jc-gellidon-ktME4-TLi1Q-unsplash.jpg',
    output: 'public/hero mob/jc-gellidon-ktME4-TLi1Q-unsplash.avif',
    maxWidth: 800, // Mobile 2x retina (400px viewport)
  },
  {
    input: 'public/hero mob/hero-streetwear-1.jpg',
    output: 'public/hero mob/hero-streetwear-1.avif',
    maxWidth: 800,
  },
  {
    input: 'public/hero mob/hero-streetwear-4.jpg',
    output: 'public/hero mob/hero-streetwear-4.avif',
    maxWidth: 800,
  },
];

async function convertImages() {
  console.log('Starting image conversion to AVIF...\n');

  for (const image of imagesToConvert) {
    try {
      if (!fs.existsSync(image.input)) {
        console.log(`⚠️  Skipping ${image.input} (not found)`);
        continue;
      }

      const stats = fs.statSync(image.input);
      const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);

      console.log(`Converting: ${path.basename(image.input)} (${originalSizeMB}MB)`);

      await sharp(image.input)
        .avif({
          quality: 80, // Alta qualità, buona compressione
          effort: 6,   // Bilanciamento velocità/qualità
        })
        .toFile(image.output);

      const newStats = fs.statSync(image.output);
      const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

      console.log(`✅ Saved: ${path.basename(image.output)} (${newSizeMB}MB) - ${reduction}% smaller\n`);
    } catch (error) {
      console.error(`❌ Error converting ${image.input}:`, error.message);
    }
  }

  console.log('Conversion complete!');
}

convertImages();
