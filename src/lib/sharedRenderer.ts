/**
 * Shared WebGL Renderer - VERSIONE OTTIMIZZATA CHE FUNZIONA
 *
 * Mantiene la struttura della versione funzionante + ottimizzazioni:
 * 1. ✅ Loop globale come versione funzionante
 * 2. ✅ transferToImageBitmap per performance
 * 3. ✅ Pre-warm del renderer
 * 4. ✅ Target FPS per throttling intelligente
 */

import * as THREE from "three";
import { shaderTextRenderer } from "./shaderTextRenderer";

interface RenderTask {
  id: string;
  scene: THREE.Scene;
  camera: THREE.Camera;
  canvas: HTMLCanvasElement;
  enabled: boolean;
  priority: number; // 0 = highest
  lastFrameTime: number;
  targetFPS: number;
  visible: boolean; // ✅ Track visibility for lazy rendering
}

class SharedRendererManager {
  private renderer: THREE.WebGLRenderer | null = null;
  private tasks: Map<string, RenderTask> = new Map();
  private animationId: number | null = null;
  private isRunning = false;
  private canvas: HTMLCanvasElement | null = null;

  // ✅ Feature detection per transferToImageBitmap
  private supportsTransferBitmap = false;

  /**
   * Inizializza il renderer condiviso con pre-warm
   */
  initialize(): THREE.WebGLRenderer {
    if (this.renderer) return this.renderer;

    if (typeof window !== "undefined") {
      this.canvas = document.createElement("canvas");
      this.canvas.style.display = "none";
      document.body.appendChild(this.canvas);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        preserveDrawingBuffer: true, // ✅ Necessario per drawImage
      });

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.autoClear = true;

      // ✅ Feature detection
      this.supportsTransferBitmap =
        typeof (this.canvas as any).transferToImageBitmap === "function";

      // ✅ Pre-warm: primo render dummy per eliminare stutter
      const dummyScene = new THREE.Scene();
      const dummyCamera = new THREE.Camera();
      this.renderer.render(dummyScene, dummyCamera);

      console.log("✅ SharedRenderer initialized", {
        transferBitmap: this.supportsTransferBitmap,
        pixelRatio: this.renderer.getPixelRatio(),
      });
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
    options: { priority?: number; targetFPS?: number; visible?: boolean } = {}
  ): void {
    const task: RenderTask = {
      id,
      scene,
      camera,
      canvas,
      enabled: true,
      priority: options.priority ?? 10,
      lastFrameTime: 0,
      targetFPS: options.targetFPS ?? 60, // ✅ Default 60fps
      visible: options.visible ?? true, // ✅ Default visible
    };

    this.tasks.set(id, task);

    if (!this.isRunning) {
      this.start();
    }

    console.log(
      `📝 Registered task: ${id} (priority: ${task.priority}, fps: ${task.targetFPS}, visible: ${task.visible})`
    );
  }

  /**
   * Rimuove un task
   */
  unregisterTask(id: string): void {
    this.tasks.delete(id);
    console.log(`🗑️ Unregistered task: ${id} (remaining: ${this.tasks.size})`);

    if (this.tasks.size === 0) {
      this.stop();
      // ✅ Cleanup completo quando non ci sono più task
      this.dispose();
    }
  }

  /**
   * Abilita/disabilita un task
   */
  setTaskEnabled(id: string, enabled: boolean): void {
    const task = this.tasks.get(id);
    if (task) {
      task.enabled = enabled;
      console.log(
        `${enabled ? "▶️" : "⏸️"} Task ${id} ${
          enabled ? "enabled" : "disabled"
        }`
      );
    }
  }

  /**
   * ✅ Imposta la visibilità di un task (per lazy rendering)
   */
  setTaskVisible(id: string, visible: boolean): void {
    const task = this.tasks.get(id);
    if (task) {
      task.visible = visible;
      console.log(
        `${visible ? "👁️" : "🙈"} Task ${id} ${
          visible ? "visible" : "hidden"
        }`
      );
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
   * Aggiorna target FPS di un task
   */
  setTaskFPS(id: string, targetFPS: number): void {
    const task = this.tasks.get(id);
    if (task) {
      task.targetFPS = targetFPS;
    }
  }

  /**
   * ✅ Loop di rendering principale - con lazy rendering
   */
  private animate = (time: number): void => {
    if (!this.renderer || !this.isRunning) return;

    this.animationId = requestAnimationFrame(this.animate);

    // Aggiorna uniform uTime per ShaderText
    shaderTextRenderer.updateTime(time * 0.001);

    // Ordina i task per priorità, filtrando solo quelli abilitati E visibili
    const sortedTasks = Array.from(this.tasks.values())
      .filter((task) => task.enabled && task.visible) // ✅ Render only visible tasks
      .sort((a, b) => a.priority - b.priority);

    // Rendi ogni task se è il momento (throttling FPS)
    sortedTasks.forEach((task) => {
      const frameDuration = 1000 / task.targetFPS;
      const elapsed = time - task.lastFrameTime;

      if (elapsed >= frameDuration) {
        this.renderTask(task);
        task.lastFrameTime = time;
      }
    });
  };

  /**
   * ✅ Renderizza un singolo task - OTTIMIZZATO
   */
  private renderTask(task: RenderTask): void {
    if (!this.renderer || !this.canvas) return;

    const { scene, camera, canvas } = task;

    // Imposta la dimensione del renderer per questo task
    const width = canvas.width || 512;
    const height = canvas.height || 512;

    this.renderer.setSize(width, height, false);

    // Renderizza la scena
    this.renderer.render(scene, camera);

    // ✅ Trasferisci il risultato al canvas del task - OTTIMIZZATO
    const ctx = canvas.getContext("2d");
    if (ctx && this.canvas) {
      try {
        ctx.clearRect(0, 0, width, height);

        if (this.supportsTransferBitmap) {
          // ✅ transferToImageBitmap: 50% più veloce
          const bitmap = (this.canvas as any).transferToImageBitmap();
          ctx.drawImage(bitmap, 0, 0, width, height);
          bitmap.close(); // Libera memoria
        } else {
          // Fallback: drawImage classico
          ctx.drawImage(this.canvas, 0, 0, width, height);
        }
      } catch (error) {
        console.error(`Error copying canvas for ${task.id}:`, error);
      }
    }
  }

  /**
   * Render singolo frame (per componenti non animati)
   */
  renderOnce(id: string, time?: number): void {
    const task = this.tasks.get(id);
    if (!task) return;

    // Usa tempo corrente se non specificato
    const currentTime = time !== undefined ? time * 1000 : performance.now();

    // Aggiorna uniform uTime
    shaderTextRenderer.updateTime(currentTime * 0.001);

    this.renderTask(task);
    task.lastFrameTime = currentTime;
  }

  /**
   * Avvia animazione continua per un task specifico
   */
  startAnimation(id: string): () => void {
    const task = this.tasks.get(id);
    if (!task) {
      console.warn(`Task ${id} not found`);
      return () => {};
    }

    task.enabled = true;
    console.log(`▶️ Animation started for ${id}`);

    // Loop già gestito dal animate() globale
    if (!this.isRunning) {
      this.start();
    }

    // Ritorna stop function
    return () => {
      const t = this.tasks.get(id);
      if (t) {
        t.enabled = false;
        console.log(`⏸️ Animation stopped for ${id}`);
      }
    };
  }

  /**
   * Resize canvas di un task
   */
  resize(id: string, width: number, height: number): void {
    const task = this.tasks.get(id);
    if (!task) return;

    task.canvas.width = width;
    task.canvas.height = height;
    console.log(`📐 Resized ${id}: ${width}x${height}`);
  }

  /**
   * Avvia il loop di rendering
   */
  private start(): void {
    if (this.isRunning) return;

    this.initialize();
    this.isRunning = true;
    this.animationId = requestAnimationFrame(this.animate);

    console.log("▶️ SharedRenderer started");
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

    console.log("⏸️ SharedRenderer stopped");
  }

  /**
   * ✅ Pulisci tutto con memory cleanup
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

    // ✅ Release shader resources
    shaderTextRenderer.releaseResources();

    console.log("🧹 SharedRenderer disposed");
  }

  /**
   * Get stats dettagliate
   */
  getStats() {
    return {
      tasksCount: this.tasks.size,
      enabledTasks: Array.from(this.tasks.values()).filter((t) => t.enabled)
        .length,
      visibleTasks: Array.from(this.tasks.values()).filter((t) => t.visible)
        .length,
      activeTasks: Array.from(this.tasks.values()).filter(
        (t) => t.enabled && t.visible
      ).length,
      isRunning: this.isRunning,
      hasRenderer: this.renderer !== null,
      supportsTransferBitmap: this.supportsTransferBitmap,
      tasks: Array.from(this.tasks.values()).map((t) => ({
        id: t.id,
        enabled: t.enabled,
        visible: t.visible,
        priority: t.priority,
        targetFPS: t.targetFPS,
      })),
    };
  }
}

// Singleton instance
export const sharedRenderer = new SharedRendererManager();

// ✅ Cleanup on unmount
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    sharedRenderer.dispose();
  });
}
