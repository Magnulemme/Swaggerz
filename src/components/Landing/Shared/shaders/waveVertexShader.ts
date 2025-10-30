/**
 * Vertex shader avanzato per effetto wave organico e complesso
 * Combina multiple onde, noise e movimento 3D per un look premium
 */
export const waveVertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uWaveLength;
  uniform float uSpeed;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vWave;
  varying vec3 vPosition;

  // Funzione noise semplificata per movimento organico
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // Smooth noise per effetto più naturale
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vUv = uv;
    vPosition = position;
    vec3 newPosition = position;

    // Wave 1: Onda principale orizzontale - più ampia
    float wave1 = sin(position.x * uWaveLength + uTime * uSpeed) * uAmplitude * 1.2;

    // Wave 2: Onda verticale sfasata - più intensa
    float wave2 = sin(position.y * (uWaveLength * 0.8) - uTime * uSpeed * 0.7) * uAmplitude * 0.8;

    // Wave 3: Onda diagonale per complessità
    float wave3 = sin((position.x + position.y) * (uWaveLength * 0.5) + uTime * uSpeed * 0.5) * uAmplitude * 0.6;

    // Wave 4: Onda contro-diagonale per ancora più complessità
    float wave4 = sin((position.x - position.y) * (uWaveLength * 0.6) - uTime * uSpeed * 0.4) * uAmplitude * 0.5;

    // Organic noise: movimento naturale e imprevedibile - molto più intenso
    float noiseValue = smoothNoise(vec2(
      position.x * 0.6 + uTime * 0.15,
      position.y * 0.6 + uTime * 0.12
    ));
    float organicMovement = (noiseValue - 0.5) * uAmplitude * 1.2;

    // Mouse interaction: onde concentriche che partono dal mouse
    vec2 mouseInfluence = position.xy - uMouse;
    float mouseDistance = length(mouseInfluence);

    // Onde concentriche con fade out
    float mouseFactor = smoothstep(1.5, 0.0, mouseDistance);
    float mouseWave = sin(mouseDistance * 8.0 - uTime * 3.0) * mouseFactor * uAmplitude * 1.2;

    // Ripple effect - spinta verso l'esterno
    float ripple = cos(mouseDistance * 6.0 - uTime * 2.5) * mouseFactor * uAmplitude * 0.6;

    // Combina tutte le onde - mouse interaction più prominente
    float complexWave = wave1 + wave2 + wave3 + wave4 + organicMovement + mouseWave + ripple;

    // Applica sull'asse Z per effetto 3D molto pronunciato
    newPosition.z = position.z + complexWave;

    // Deformazione XY più intensa per effetto organico evidente
    newPosition.x += sin(position.y * 4.0 + uTime * 0.6) * uAmplitude * 0.15;
    newPosition.y += cos(position.x * 3.5 + uTime * 0.5) * uAmplitude * 0.12;

    // Passa il valore wave al fragment shader per effetti aggiuntivi
    vWave = complexWave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;
