/**
 * Shared WebGL Renderer Manager
 *
 * Problema: Ogni componente Three.js crea il proprio renderer WebGL,
 * causando overhead GPU e rallentamenti.
 *
 * Soluzione: Un singolo renderer condiviso da tutti i componenti,
 * con rendering su offscreen canvas e trasferimento texture.
 */

import * as THREE from 'three';
import { shaderTextRenderer } from './shaderTextRenderer';

interface RenderTask {
  id: string;
  scene: THREE.Scene;
  camera: THREE.Camera;
  canvas: HTMLCanvasElement | OffscreenCanvas;
  enabled: boolean;
  priority: number; // 0 = highest
  lastFrameTime: number;
  targetFPS: number;
}

class SharedRendererManager {
  private renderer: THREE.WebGLRenderer | null = null;
  private tasks: Map<string, RenderTask> = new Map();
  private animationId: number | null = null;
  private isRunning = false;
  private canvas: HTMLCanvasElement | null = null;

  /**
   * Inizializza il renderer condiviso
   */
  initialize(): THREE.WebGLRenderer {
    if (this.renderer) return this.renderer;

    // Crea un canvas offscreen per il renderer
    if (typeof window !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.canvas.style.display = 'none';
      document.body.appendChild(this.canvas);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      });

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);

      console.log('✅ SharedRenderer initialized');
    }

    return this.renderer!;
  }

  /**
   * Registra un task di rendering
   */
  registerTask(
    id: string,
    scene: THREE.Scene,
    camera: THREE.Camera,
    canvas: HTMLCanvasElement,
    options: { priority?: number; targetFPS?: number } = {}
  ): void {
    const task: RenderTask = {
      id,
      scene,
      camera,
      canvas,
      enabled: true,
      priority: options.priority ?? 10,
      lastFrameTime: 0,
      targetFPS: options.targetFPS ?? 30, // Default 30fps
    };

    this.tasks.set(id, task);

    if (!this.isRunning) {
      this.start();
    }

    console.log(`📝 Registered task: ${id} (priority: ${task.priority}, fps: ${task.targetFPS})`);
  }

  /**
   * Rimuove un task
   */
  unregisterTask(id: string): void {
    this.tasks.delete(id);
    console.log(`🗑️ Unregistered task: ${id}`);

    if (this.tasks.size === 0) {
      this.stop();
    }
  }

  /**
   * Abilita/disabilita un task
   */
  setTaskEnabled(id: string, enabled: boolean): void {
    const task = this.tasks.get(id);
    if (task) {
      task.enabled = enabled;
    }
  }

  /**
   * Aggiorna la priorità di un task
   */
  setTaskPriority(id: string, priority: number): void {
    const task = this.tasks.get(id);
    if (task) {
      task.priority = priority;
    }
  }

  /**
   * Loop di rendering principale
   */
  private animate = (time: number): void => {
    if (!this.renderer || !this.isRunning) return;

    this.animationId = requestAnimationFrame(this.animate);

    // Aggiorna uniform uTime per ShaderText
    shaderTextRenderer.updateTime(time * 0.001);

    // Ordina i task per priorità
    const sortedTasks = Array.from(this.tasks.values())
      .filter(task => task.enabled)
      .sort((a, b) => a.priority - b.priority);

    // Rendi ogni task se è il momento
    sortedTasks.forEach(task => {
      const frameDuration = 1000 / task.targetFPS;
      const elapsed = time - task.lastFrameTime;

      if (elapsed >= frameDuration) {
        this.renderTask(task);
        task.lastFrameTime = time;
      }
    });
  };

  /**
   * Renderizza un singolo task
   */
  private renderTask(task: RenderTask): void {
    if (!this.renderer) return;

    const { scene, camera, canvas } = task;

    // Imposta la dimensione del renderer per questo task
    const width = canvas.width || 512;
    const height = canvas.height || 512;

    this.renderer.setSize(width, height, false);

    // Renderizza la scena
    this.renderer.render(scene, camera);

    // Trasferisci il risultato al canvas del task
    const ctx = canvas.getContext('2d');
    if (ctx && this.canvas) {
      try {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(this.canvas, 0, 0, width, height);
      } catch (error) {
        console.error('Error copying canvas:', error);
      }
    }
  }

  /**
   * Avvia il loop di rendering
   */
  private start(): void {
    if (this.isRunning) return;

    this.initialize();
    this.isRunning = true;
    this.animationId = requestAnimationFrame(this.animate);

    console.log('▶️ SharedRenderer started');
  }

  /**
   * Ferma il loop di rendering
   */
  private stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    console.log('⏸️ SharedRenderer stopped');
  }

  /**
   * Pulisci tutto
   */
  dispose(): void {
    this.stop();
    this.tasks.clear();

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
    }

    console.log('🧹 SharedRenderer disposed');
  }

  /**
   * Get stats
   */
  getStats() {
    return {
      tasksCount: this.tasks.size,
      enabledTasks: Array.from(this.tasks.values()).filter(t => t.enabled).length,
      isRunning: this.isRunning,
    };
  }
}

// Singleton instance
export const sharedRenderer = new SharedRendererManager();

// Cleanup on unmount (for development)
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    sharedRenderer.dispose();
  });
}
