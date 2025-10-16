import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/constants/shaders';

/**
 * Singleton per condividere Material e Geometry tra tutte le istanze di ShaderText
 * Riduce overhead GPU e memoria
 */
class ShaderTextRenderer {
  private material: THREE.ShaderMaterial | null = null;
  private geometry: THREE.PlaneGeometry | null = null;
  private refCount = 0;

  private initialize(): void {
    if (this.material) return;

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 }
      },
      transparent: true
    });

    this.geometry = new THREE.PlaneGeometry(2, 2);
    console.log('✅ ShaderTextRenderer initialized');
  }

  /**
   * Ottieni risorse condivise (Material + Geometry)
   * Incrementa reference count
   */
  getResources() {
    this.initialize();
    this.refCount++;
    console.log(`📊 Active ShaderText instances: ${this.refCount}`);

    return {
      material: this.material!,
      geometry: this.geometry!
    };
  }

  /**
   * Rilascia risorse
   * Decrementa reference count e dispone risorse quando arriva a 0
   */
  releaseResources(): void {
    this.refCount--;

    if (this.refCount === 0) {
      this.material?.dispose();
      this.geometry?.dispose();
      this.material = null;
      this.geometry = null;
      console.log('🧹 ShaderTextRenderer disposed (no active instances)');
    } else {
      console.log(`📊 Active ShaderText instances: ${this.refCount}`);
    }
  }

  /**
   * Aggiorna uniform uTime per l'animazione
   * Chiamato dal sharedRenderer
   */
  updateTime(time: number): void {
    if (this.material) {
      this.material.uniforms.uTime.value = time;
    }
  }
}

export const shaderTextRenderer = new ShaderTextRenderer();
