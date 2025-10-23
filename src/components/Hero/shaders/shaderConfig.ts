/**
 * Configurazione e costanti per gli shader wave
 */
import * as THREE from "three";

export const SHADER_CONSTANTS = {
  // Fade zones
  FADE_START: 0.2, // Base fissa nei primi 20%
  FADE_TOP: 0.92, // Riduci le onde negli ultimi 8%

  // Rounded corners
  CORNER_RADIUS: 0.12,

  // Perspective compensation
  PERSPECTIVE_SCALE_FACTOR: 0.92,
} as const;

export interface WaveShaderUniforms {
  uTexture: { value: THREE.Texture | null };
  uTime: { value: number };
  uAmplitude: { value: number };
  uWaveLength: { value: number };
  uSpeed: { value: number };
  uResolution: { value: THREE.Vector2 };
  uImageAspect: { value: number };
  uMouse: { value: THREE.Vector2 };
}

export const createShaderUniforms = (
  texture: THREE.Texture | null,
  amplitude: number,
  waveLength: number,
  speed: number,
  aspectRatio: number
): WaveShaderUniforms => ({
  uTexture: { value: texture },
  uTime: { value: 0 },
  uAmplitude: { value: amplitude },
  uWaveLength: { value: waveLength },
  uSpeed: { value: speed },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uImageAspect: { value: aspectRatio },
  uMouse: { value: new THREE.Vector2(0, 0) },
});
