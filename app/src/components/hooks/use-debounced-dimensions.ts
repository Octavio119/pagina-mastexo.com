'use client'

import { useState, useEffect, useCallback, useRef, RefObject } from 'react'

interface Dimensions {
  width: number
  height: number
}

export function useDebouncedDimensions(
  ref: RefObject<HTMLElement | null>,
  debounceMs = 100
): Dimensions {
  const [dims, setDims] = useState<Dimensions>({ width: 0, height: 0 })
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const measure = useCallback(() => {
    if (!ref.current) return
    const { width, height } = ref.current.getBoundingClientRect()
    setDims({ width, height })
  }, [ref])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(() => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(measure, debounceMs)
    })
    if (ref.current) ro.observe(ref.current)
    return () => {
      ro.disconnect()
      clearTimeout(timerRef.current)
    }
  }, [measure, debounceMs])

  return dims
}
