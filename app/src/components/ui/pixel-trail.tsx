'use client'

import { useEffect, useRef, useCallback } from 'react'

interface PixelTrailProps {
  pixelSize?: number
  fadeDuration?: number
  delay?: number
  pixelClassName?: string
}

export function PixelTrail({
  pixelSize = 60,
  fadeDuration = 800,
  delay = 0,
  pixelClassName = '',
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

  const addPixel = useCallback(
    (x: number, y: number) => {
      const container = containerRef.current
      if (!container) return

      const el = document.createElement('div')

      // Inline styles guarantee visibility regardless of CSS purging
      el.style.position = 'absolute'
      el.style.pointerEvents = 'none'
      el.style.width = `${pixelSize}px`
      el.style.height = `${pixelSize}px`
      el.style.left = `${x - pixelSize / 2}px`
      el.style.top = `${y - pixelSize / 2}px`
      el.style.borderRadius = '50%'
      el.style.background = 'rgba(124,58,237,0.22)'
      el.style.opacity = '1'
      el.style.transition = `opacity ${fadeDuration}ms linear`

      if (pixelClassName) el.className = pixelClassName

      container.appendChild(el)

      // Trigger fade: two rAF to ensure transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = '0'
        })
      })

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el)
      }, fadeDuration + 100)
    },
    [pixelSize, fadeDuration, pixelClassName]
  )

  useEffect(() => {
    const parent = containerRef.current?.parentElement
    if (!parent) return

    const handler = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const last = lastPosRef.current
      if (last && Math.hypot(x - last.x, y - last.y) < pixelSize * 0.55) return
      lastPosRef.current = { x, y }

      if (delay > 0) {
        setTimeout(() => addPixel(x, y), delay)
      } else {
        addPixel(x, y)
      }
    }

    parent.addEventListener('mousemove', handler, { passive: true })
    return () => parent.removeEventListener('mousemove', handler)
  }, [addPixel, pixelSize, delay])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    />
  )
}
