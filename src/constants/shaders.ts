// Vertex shader
export const vertexShader: string = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader ottimizzato per testo: luminoso e adattivo
export const fragmentShader: string = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.4;

    // Onde calibrate per testo: privilegia movimento orizzontale
    float mainWave = sin(uv.x * 1.8 - time * 1.0);  // Onda principale orizzontale
    float verticalWave = sin(uv.y * 8.0 + time * 0.6) * 0.3;  // Minima variazione verticale
    float diagonalWave = cos((uv.x * 2.0 + uv.y * 0.5) + time * 1.3) * 0.4;
    float pulseWave = sin(time * 2.0) * 0.2;  // Pulsazione globale

    // Pattern semplice e visibile
    float pattern = (mainWave + verticalWave + diagonalWave) * 0.4 + 0.5;

    // 3 colori bilanciati: rosso, arancione, giallo
    vec3 brightRed = vec3(1.0, 0.2, 0.2);      // Rosso puro
    vec3 vibrantOrange = vec3(1.0, 0.5, 0.0);  // Arancione puro
    vec3 sunnyYellow = vec3(1.0, 0.8, 0.0);    // Giallo puro

    // Selezione colore semplice - 3 zone uguali (33% ciascuna)
    vec3 color;
    float colorIndex = fract(pattern + time * 0.15) * 3.0;

    if (colorIndex < 1.0) {
      // Rosso -> Arancione
      color = mix(brightRed, vibrantOrange, fract(colorIndex));
    } else if (colorIndex < 2.0) {
      // Arancione -> Giallo
      color = mix(vibrantOrange, sunnyYellow, fract(colorIndex));
    } else {
      // Giallo -> Rosso (chiude il ciclo)
      color = mix(sunnyYellow, brightRed, fract(colorIndex));
    }

    // Boost luminosità per visibilità ottimale
    float brightness = 1.1 + sin(time * 1.5 + uv.x * 3.0) * 0.1;
    color *= brightness;

    // Saturazione extra per colori vivaci
    color = mix(vec3(dot(color, vec3(0.299, 0.587, 0.114))), color, 1.3);

    // Clamp per evitare over-saturation
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Fragment shader scuro per background (ottimizzato per contrasto con testo bianco)
export const darkFragmentShader: string = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.4;

    // Onde identiche per mantenere lo stesso movimento
    float mainWave = sin(uv.x * 1.8 - time * 1.0);
    float verticalWave = sin(uv.y * 8.0 + time * 0.6) * 0.3;
    float diagonalWave = cos((uv.x * 2.0 + uv.y * 0.5) + time * 1.3) * 0.4;

    float pattern = (mainWave + verticalWave + diagonalWave) * 0.4 + 0.5;

    // Colori bilanciati per contrasto ottimale con testo bianco
    vec3 darkRed = vec3(0.88, 0.22, 0.22);     // Rosso bilanciato
    vec3 darkOrange = vec3(0.92, 0.48, 0.12);   // Arancione bilanciato
    vec3 darkYellow = vec3(0.92, 0.68, 0.12);   // Giallo bilanciato

    // Selezione colore identica
    vec3 color;
    float colorIndex = fract(pattern + time * 0.15) * 3.0;

    if (colorIndex < 1.0) {
      color = mix(darkRed, darkOrange, fract(colorIndex));
    } else if (colorIndex < 2.0) {
      color = mix(darkOrange, darkYellow, fract(colorIndex));
    } else {
      color = mix(darkYellow, darkRed, fract(colorIndex));
    }

    // Luminosità ottimizzata per contrasto con testo bianco
    float brightness = 0.82 + sin(time * 1.5 + uv.x * 3.0) * 0.10;
    color *= brightness;

    // Saturazione mantenuta per colori vivaci anche se scuri
    color = mix(vec3(dot(color, vec3(0.299, 0.587, 0.114))), color, 1.2);

    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;