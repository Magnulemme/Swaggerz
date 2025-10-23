/**
 * Fragment shader avanzato con distorsioni complesse e effetti premium
 * Include RGB split, distorsioni organiche e gradient effects
 */
export const waveFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uImageAspect;
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uSpeed;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vWave;
  varying vec3 vPosition;

  // Noise function per distorsioni organiche
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    // === 1. Distorsione UV organica e complessa ma ultra-sicura ===
    float distortionStrength = uAmplitude * 0.003; // Ancora più ridotto per zero problemi

    // Distorsione principale - onde pronunciate
    float distortX = sin(uv.y * 12.0 + uTime * uSpeed * 0.7) * distortionStrength;
    float distortY = cos(uv.x * 10.0 + uTime * uSpeed * 0.5) * distortionStrength;

    // Distorsione secondaria - movimento complesso
    float complexDistortX = sin(uv.y * 6.0 - uv.x * 4.0 + uTime * uSpeed * 0.6) * distortionStrength * 0.4;
    float complexDistortY = cos(uv.x * 5.0 + uv.y * 8.0 - uTime * uSpeed * 0.8) * distortionStrength * 0.4;

    // Distorsione terziaria - pattern intrecciato
    float warpX = sin(uv.x * 15.0 + uv.y * 10.0 + uTime * uSpeed) * distortionStrength * 0.25;
    float warpY = cos(uv.y * 12.0 - uv.x * 8.0 + uTime * uSpeed * 0.7) * distortionStrength * 0.25;

    // Noise distortion organico ma ultra-controllato
    vec2 noiseUv = uv * 4.0 + uTime * 0.15;
    float noiseDistort = (noise(noiseUv) - 0.5) * distortionStrength * 0.25;

    // Secondo layer di noise per organicità
    vec2 noiseUv2 = uv * 2.0 - uTime * 0.1;
    float noiseDistort2 = (noise(noiseUv2) - 0.5) * distortionStrength * 0.15;

    // Mouse proximity distortion - effetto che segue il mouse
    vec2 mouseDir = uv - (uMouse * 0.5 + 0.5);
    float mouseDist = length(mouseDir);

    // Effetto più intenso vicino al mouse, fade out graduale
    float mouseEffect = smoothstep(0.6, 0.0, mouseDist);

    // Distorsione direzionale - spinge via dal mouse
    vec2 mouseDistortion = mouseDir * mouseEffect * distortionStrength * 2.5;

    // Combina tutte le distorsioni - effetto complesso ma ultra-sicuro
    uv.x += distortX + complexDistortX + warpX + noiseDistort + noiseDistort2 + mouseDistortion.x;
    uv.y += distortY + complexDistortY + warpY + noiseDistort + noiseDistort2 + mouseDistortion.y;

    // === 2. RGB Chromatic Aberration molto sottile ===
    float aberrationStrength = uAmplitude * 0.001; // Ultra-ridotto per evitare colori strani
    vec2 aberrationOffset = vec2(
      aberrationStrength * sin(uTime * 1.2),
      aberrationStrength * cos(uTime * 1.2)
    );

    // Calcola aspect ratio scaling per object-fit: contain
    // Mantiene l'intera immagine visibile nel container
    float containerAspect = uResolution.x / uResolution.y;
    vec2 scale;
    if (containerAspect > uImageAspect) {
      // Container più largo: scala in base all'altezza
      scale = vec2(containerAspect / uImageAspect, 1.0);
    } else {
      // Container più alto: scala in base alla larghezza
      scale = vec2(1.0, uImageAspect / containerAspect);
    }

    // Sample texture con chromatic aberration
    vec2 centerUv = (uv - 0.5) * scale + 0.5;

    float r = texture2D(uTexture, centerUv + aberrationOffset).r;
    float g = texture2D(uTexture, centerUv).g;
    float b = texture2D(uTexture, centerUv - aberrationOffset).b;

    vec4 color = vec4(r, g, b, 1.0);

    // === 3. Gradient overlay disabilitato (causava tinte rosse) ===
    // Rimosso per mantenere colori accurati del prodotto

    // === 4. Vignette disabilitata (non necessaria per e-commerce) ===
    // Rimossa per mantenere luminosità uniforme

    gl_FragColor = color;
  }
`;
