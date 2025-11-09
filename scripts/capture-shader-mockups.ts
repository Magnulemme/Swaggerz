import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

async function captureShaderMockups() {
  console.log('🚀 Starting screenshot capture...');

  // Crea la cartella mockups se non esiste
  const mockupsDir = join(process.cwd(), 'public', 'mockups');
  await mkdir(mockupsDir, { recursive: true });

  // Avvia il browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  try {
    console.log('📡 Navigating to mockup page...');
    // Assicurati che il dev server sia in esecuzione su localhost:3002
    await page.goto('http://localhost:3002/mockup-shader', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Aspetta che gli ShaderText siano renderizzati
    console.log('⏳ Waiting for ShaderText to render...');
    await page.waitForTimeout(3000); // Aspetta 3 secondi per l'animazione shader

    // Screenshot SwaggerZ con sfondo bianco
    console.log('📸 Capturing SwaggerZ (white background)...');
    const swaggerzElement = page.locator('#swaggerz-text').first();
    await swaggerzElement.screenshot({
      path: join(mockupsDir, 'swaggerz-white.png'),
      omitBackground: false, // Mantieni lo sfondo bianco
    });
    console.log('✅ SwaggerZ (white background) saved!');

    // Screenshot SwaggerZ isolato (sfondo trasparente)
    console.log('📸 Capturing SwaggerZ (isolated)...');
    await swaggerzElement.screenshot({
      path: join(mockupsDir, 'swaggerz-isolated.png'),
      omitBackground: true, // Sfondo trasparente
    });
    console.log('✅ SwaggerZ (isolated) saved!');

    console.log('\n🎉 All screenshots captured successfully!');
    console.log(`📁 Saved to: ${mockupsDir}`);

  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Esegui lo script
captureShaderMockups().catch(console.error);
