'use client'

import { cn } from '@/lib/utils'
import { type ReactNode, useRef, useEffect, useState } from 'react'

interface BannerProps {
  children: ReactNode
  variant?: 'default' | 'rainbow'
  rainbowColors?: string[]
  className?: string
  speed?: number // px per second, default 60
}

export function Banner({
  children,
  variant = 'default',
  rainbowColors = [],
  className,
  speed = 60,
}: BannerProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(20)

  // Calculate animation duration based on track width + speed
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const half = el.scrollWidth / 2
    setDuration(half / speed)
  }, [speed, children])

  // Build gradient for rainbow variant
  const gradientStyle =
    variant === 'rainbow' && rainbowColors.length > 0
      ? {
          background: `linear-gradient(90deg, ${[...rainbowColors, ...rainbowColors].join(', ')})`,
          backgroundSize: '200% 100%',
          animation: 'bannerGradient 6s linear infinite',
        }
      : {}

  return (
    <>
      <style>{`
        @keyframes bannerMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes bannerGradient {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      <div
        className="relative w-full overflow-hidden py-3"
        style={gradientStyle}
        aria-hidden
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#111111] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#111111] to-transparent" />

        {/* Scrolling track — content duplicated for seamless loop */}
        <div
          ref={trackRef}
          className="flex whitespace-nowrap"
          style={{
            animation: `bannerMarquee ${duration}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {/* Render 4 copies so even very wide screens see content */}
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn('inline-block px-6 select-none', className)}
            >
              {children}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
