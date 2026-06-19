'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  className?: string
  suffix?: string
}

/** Animates a number from 0 to `end` over `duration` ms using requestAnimationFrame. */
export default function CountUp({ end, duration = 1000, className, suffix = '' }: CountUpProps) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    startRef.current = null
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      // easeOutQuart for a nice deceleration
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(eased * end))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [end, duration])

  return <span className={className}>{value}{suffix}</span>
}
