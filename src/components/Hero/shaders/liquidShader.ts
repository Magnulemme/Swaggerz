export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;

  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Calcola distanza dal mouse
    vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 adjustedUv = uv * aspectRatio;
    vec2 adjustedMouse = uMouse * aspectRatio;
    float dist = distance(adjustedUv, adjustedMouse);

    // Influenza più ampia e morbida
    float radius = 0.4;
    float mouseInfluence = smoothstep(radius, 0.0, dist);
    mouseInfluence = pow(mouseInfluence, 1.5);

    vec2 distortion = vec2(0.0);

    if (mouseInfluence > 0.001) {
      // Usa il rumore per creare onde fluide
      float noiseScale = 8.0;
      float noiseStrength = 0.15;
      
      // Due layer di rumore per maggiore fluidità
      float noise1 = snoise(uv * noiseScale + uTime * 0.3);
      float noise2 = snoise(uv * noiseScale * 0.5 - uTime * 0.2);
      
      // Combina i rumori
      vec2 noiseDistortion = vec2(noise1, noise2) * noiseStrength;
      
      // Direzione verso il mouse
      vec2 toMouse = adjustedMouse - adjustedUv;
      float distToMouse = length(toMouse);
      
      if (distToMouse > 0.001) {
        vec2 direction = toMouse / distToMouse;
        
        // Combina attrazione + rumore
        float strength = mouseInfluence * 0.06;
        distortion = direction * strength;
        distortion += noiseDistortion * mouseInfluence;
      }
    }

    vec2 distortedUv = clamp(uv + distortion, 0.0, 1.0);
    vec4 color = texture2D(uTexture, distortedUv);

    gl_FragColor = color;
  }
`;