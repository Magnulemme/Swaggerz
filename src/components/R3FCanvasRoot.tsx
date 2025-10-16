'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, View as DreiView } from '@react-three/drei'
import { ReactNode, useEffect, useState } from 'react'

/**
 * Root Canvas per tutti i componenti Three.js nell'app
 * Usa il sistema View per rendering multipli con un singolo WebGL context
 */
export default function R3FCanvasRoot({ children }: { children: ReactNode }) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setRootElement(document.getElementById('root'))
  }, [])

  return (
    <>
      {/* Canvas root nascosto - gestisce tutto il rendering WebGL */}
      {mounted && (
        <Canvas
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
          }}
          dpr={[1, 2]}
          eventSource={rootElement || undefined}
          eventPrefix="client"
        >
          {/* Preload assets comuni */}
          <Preload all />

          {/* View container per gestire tutti i View */}
          <DreiView.Port />
        </Canvas>
      )}

      {/* Contenuto normale dell'app */}
      {children}
    </>
  )
}
