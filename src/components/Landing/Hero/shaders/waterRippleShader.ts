export const waterRippleVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const waterRippleFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uCenter;
  uniform float uImageAspect;
  uniform float uContainerAspect;

  varying vec2 vUv;

  const float PI = 3.14159265359;

  void main() {
    vec2 center = uCenter;
    vec2 uv = vUv;

    // Simulate object-fit: cover
    vec2 textureUv = uv;
    float containerRatio = uContainerAspect;
    float imageRatio = uImageAspect;

    // Calcola il fattore di scala per coprire completamente il container
    vec2 scale = vec2(1.0);

    if (imageRatio > containerRatio) {
      // Immagine più larga: adatta altezza e croppa i lati
      scale.x = imageRatio / containerRatio;
    } else {
      // Immagine più alta: adatta larghezza e croppa alto/basso
      scale.y = containerRatio / imageRatio;
    }

    // Applica lo scaling centrato
    textureUv = (uv - 0.5) / scale + 0.5;

    // Normalizza le coordinate UV per aspect ratio per ottenere un cerchio perfetto
    vec2 normalizedUv = uv - center;
    normalizedUv.x *= uContainerAspect; // Correggi aspect ratio del container

    // Distanza circolare perfetta usando coordinate normalizzate
    float dist = length(normalizedUv);

    // Raggio massimo basato sul progress - aumentato per coprire l'intera immagine
    // Usiamo una diagonale per assicurarci di coprire tutto
    float maxRadius = uProgress * 1.2;

    // Larghezza dell'anello dell'onda (quanto è "spessa" l'onda visibile)
    float waveThickness = 0.12;

    // Distanza dal fronte dell'onda
    float distanceFromWavefront = abs(dist - maxRadius);

    // Se siamo vicini al fronte dell'onda (solo l'onda più esterna)
    if (distanceFromWavefront < waveThickness && uProgress > 0.0 && dist < maxRadius) {
      // Calcolo dell'intensità dell'onda (massima al centro della banda, 0 ai bordi)
      float waveIntensity = 1.0 - (distanceFromWavefront / waveThickness);
      waveIntensity = smoothstep(0.0, 1.0, waveIntensity);

      // Oscillazione per l'effetto ripple con più frequenza
      float ripple = sin(distanceFromWavefront * 60.0) * 0.5 + 0.5;

      // Effetto bolla: distorsione più forte al bordo
      float bubbleEffect = pow(waveIntensity, 1.5);

      // Ampiezza della distorsione più drammatica
      float amplitude = 0.045 * bubbleEffect;

      // Direzione della distorsione (radiale dal centro)
      vec2 direction = normalize(uv - center);

      // Applica distorsione con ripple
      float distortion = ripple * amplitude;
      textureUv += direction * distortion;

      // Effetto di luminosità sul bordo dell'onda più marcato
      float brightness = ripple * 0.35 * waveIntensity;

      // Effetto cromatico leggero sui bordi (simula rifrazione)
      vec4 colorR = texture2D(uTexture, textureUv + direction * distortion * 0.3);
      vec4 colorG = texture2D(uTexture, textureUv);
      vec4 colorB = texture2D(uTexture, textureUv - direction * distortion * 0.3);

      vec4 color = vec4(colorR.r, colorG.g, colorB.b, 1.0);
      color.rgb += brightness;

      // Smooth edge del cerchio
      float alpha = smoothstep(maxRadius, maxRadius - 0.02, dist);

      gl_FragColor = vec4(color.rgb, alpha);
    } else if (dist < maxRadius) {
      // Dentro il cerchio ma non nell'onda: mostra immagine normale
      vec4 color = texture2D(uTexture, textureUv);
      float alpha = smoothstep(maxRadius, maxRadius - 0.02, dist);
      gl_FragColor = vec4(color.rgb, alpha);
    } else {
      // Fuori dal raggio: trasparente
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
  }
`;
