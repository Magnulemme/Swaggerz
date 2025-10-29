import * as THREE from "three";

// Vertex shader con wave distortion
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uWaveAmplitude;
  uniform float uWaveFrequency;
  uniform float uWaveSpeed;

  void main() {
    vUv = uv;
    vPosition = position;

    // Calculate wave distortion
    float wave = sin(position.x * uWaveFrequency + uTime * uWaveSpeed) *
                 cos(position.y * uWaveFrequency * 0.5 + uTime * uWaveSpeed * 0.7);

    vec3 newPosition = position;
    newPosition.z += wave * uWaveAmplitude;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment shader con texture e distortion
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform float uDistortionStrength;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Wave distortion sulle UV
    vec2 distortedUv = vUv;
    float wave = sin(vUv.y * 10.0 + uTime * 2.0) * cos(vUv.x * 8.0 + uTime * 1.5);
    distortedUv.x += wave * uDistortionStrength * 0.02;
    distortedUv.y += wave * uDistortionStrength * 0.015;

    // Extra distortion on hover
    float hoverWave = sin(vUv.x * 5.0 + uTime * 3.0) * uHover * 0.03;
    distortedUv.y += hoverWave;

    // Sample texture con UV distorte
    vec4 texture = texture2D(uTexture, distortedUv);

    // Slight vignette effect
    float vignette = 1.0 - length(vUv - 0.5) * 0.3;

    // Glow effect on hover
    vec3 glowColor = vec3(1.0, 0.5, 0.2); // Orange glow
    float glow = uHover * 0.15 * (1.0 - length(vUv - 0.5));

    vec3 finalColor = texture.rgb * vignette + glowColor * glow;

    gl_FragColor = vec4(finalColor, texture.a);
  }
`;

export interface WaveShaderUniforms {
  [uniform: string]: { value: any };
  uTexture: { value: THREE.Texture | null };
  uTime: { value: number };
  uHover: { value: number };
  uWaveAmplitude: { value: number };
  uWaveFrequency: { value: number };
  uWaveSpeed: { value: number };
  uDistortionStrength: { value: number };
}

export class WaveShaderManager {
  private static instance: WaveShaderManager;
  private materials: Map<string, THREE.ShaderMaterial> = new Map();
  private geometries: Map<string, THREE.PlaneGeometry> = new Map();

  private constructor() {}

  static getInstance(): WaveShaderManager {
    if (!WaveShaderManager.instance) {
      WaveShaderManager.instance = new WaveShaderManager();
    }
    return WaveShaderManager.instance;
  }

  createMaterial(id: string): THREE.ShaderMaterial {
    const uniforms: WaveShaderUniforms = {
      uTexture: { value: null },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uWaveAmplitude: { value: 0.15 }, // Altezza dell'onda
      uWaveFrequency: { value: 3.0 }, // Frequenza dell'onda
      uWaveSpeed: { value: 1.5 }, // Velocità
      uDistortionStrength: { value: 1.0 }, // Forza distortion UV
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.materials.set(id, material);
    return material;
  }

  getMaterial(id: string): THREE.ShaderMaterial | undefined {
    return this.materials.get(id);
  }

  createGeometry(id: string, width: number, height: number): THREE.PlaneGeometry {
    // Più segmenti = wave più smooth
    const segments = 32;
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
    this.geometries.set(id, geometry);
    return geometry;
  }

  getGeometry(id: string): THREE.PlaneGeometry | undefined {
    return this.geometries.get(id);
  }

  updateTime(id: string, time: number): void {
    const material = this.materials.get(id);
    if (material && material.uniforms.uTime) {
      material.uniforms.uTime.value = time;
    }
  }

  updateHover(id: string, hover: number): void {
    const material = this.materials.get(id);
    if (material && material.uniforms.uHover) {
      material.uniforms.uHover.value = hover;
    }
  }

  setTexture(id: string, texture: THREE.Texture): void {
    const material = this.materials.get(id);
    if (material && material.uniforms.uTexture) {
      material.uniforms.uTexture.value = texture;
    }
  }

  dispose(id: string): void {
    const material = this.materials.get(id);
    const geometry = this.geometries.get(id);

    if (material) {
      material.dispose();
      this.materials.delete(id);
    }

    if (geometry) {
      geometry.dispose();
      this.geometries.delete(id);
    }
  }

  disposeAll(): void {
    this.materials.forEach((material) => material.dispose());
    this.geometries.forEach((geometry) => geometry.dispose());
    this.materials.clear();
    this.geometries.clear();
  }
}

export const waveShaderManager = WaveShaderManager.getInstance();
