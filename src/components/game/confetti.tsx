'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  color: string
  shape: 'rect' | 'circle'
  life: number
  maxLife: number
}

interface ConfettiProps {
  /** trigger key — when this value changes, a new burst fires */
  fire: number | string
  /** number of particles per burst, default 80 */
  count?: number
  /** burst origin x in window coords; default = center top */
  x?: number
  /** burst origin y in window coords; default = center */
  y?: number
  /** colors palette; defaults to a festive set */
  colors?: string[]
  /** duration of the effect in ms; default 2500 */
  duration?: number
  /** particle shapes: 'rect' | 'circle' | 'mixed'; default 'mixed' */
  shape?: 'rect' | 'circle' | 'mixed'
  /** z-index of the canvas; default 60 */
  zIndex?: number
}

interface ParticleBurstProps {
  fire: number | string
  x?: number
  y?: number
  colors?: string[]
}

const DEFAULT_COLORS: string[] = [
  '#10b981', '#f59e0b', '#06b6d4', '#ec4899',
  '#8b5cf6', '#ef4444', '#fbbf24', '#34d399',
]

const FRAME_MS = 16
const CONFETTI_GRAVITY = 0.15
const CONFETTI_AIR = 0.99
const BURST_AIR = 0.95
const BURST_COUNT = 30
const BURST_DURATION = 1000

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function pickShape(mode: 'rect' | 'circle' | 'mixed'): 'rect' | 'circle' {
  if (mode === 'mixed') return Math.random() < 0.5 ? 'rect' : 'circle'
  return mode
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle): void {
  const lifeRatio = p.life / p.maxLife
  // Fade alpha in the last 30% of life
  const alpha = lifeRatio < 0.3 ? Math.max(0, lifeRatio / 0.3) : 1
  ctx.globalAlpha = alpha
  ctx.fillStyle = p.color

  if (p.shape === 'rect') {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size * 0.5)
    ctx.restore()
  } else {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

type StepFn = (p: Particle) => void

// Per-frame physics for the celebratory confetti burst (gravity + horizontal drag)
const confettiStep: StepFn = (p) => {
  p.vy += CONFETTI_GRAVITY
  p.vx *= CONFETTI_AIR
}

// Per-frame physics for the small radial sparkle (no gravity, gentle drag)
const burstStep: StepFn = (p) => {
  p.vx *= BURST_AIR
  p.vy *= BURST_AIR
}

/**
 * Internal engine: owns the full-screen canvas, the rAF loop, resize handling
 * and device-pixel-ratio scaling. Exposes the canvas ref, the particle store
 * ref and a "kick" function that (re)starts the loop when new particles are
 * pushed from outside (e.g. when `fire` changes).
 *
 * The `step` function is kept in a ref synced via effect so the animation
 * loop always reads the latest physics without tearing down the canvas.
 */
function useParticleCanvas(step: StepFn) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)
  const kickRef = useRef<(() => void) | null>(null)
  const stepRef = useRef<StepFn>(step)

  // Keep the latest step function available to the animation loop.
  useEffect(() => {
    stepRef.current = step
  }, [step])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let logicalW = window.innerWidth
    let logicalH = window.innerHeight

    const resize = (): void => {
      const dpr = window.devicePixelRatio || 1
      logicalW = window.innerWidth
      logicalH = window.innerHeight
      canvas.width = Math.max(1, Math.floor(logicalW * dpr))
      canvas.height = Math.max(1, Math.floor(logicalH * dpr))
      canvas.style.width = `${logicalW}px`
      canvas.style.height = `${logicalH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = (): void => {
      const particles = particlesRef.current
      ctx.clearRect(0, 0, logicalW, logicalH)
      const stepFn = stepRef.current

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        stepFn(p)
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.life -= FRAME_MS

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        drawParticle(ctx, p)
      }

      // Stop the loop when nothing remains to draw (idle cleanup)
      if (particles.length > 0) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        rafRef.current = null
      }
    }

    kickRef.current = (): void => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    // Resume the loop if particles already exist when this effect (re)mounts.
    // Keeps bursts alive across React StrictMode's dev double-invoke.
    if (particlesRef.current.length > 0 && rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      kickRef.current = null
      window.removeEventListener('resize', resize)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return { canvasRef, particlesRef, kickRef }
}

function canvasStyle(zIndex: number): CSSProperties {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex,
  }
}

/**
 * Full-screen confetti effect. Mount once and change the `fire` prop
 * (a number or string) whenever you want a fresh burst to fire.
 */
const Confetti = ({
  fire,
  count = 80,
  x,
  y,
  colors = DEFAULT_COLORS,
  duration = 2500,
  shape = 'mixed',
  zIndex = 60,
}: ConfettiProps) => {
  const { canvasRef, particlesRef, kickRef } = useParticleCanvas(confettiStep)
  // Track previous fire value so we only spawn on actual changes (this also
  // protects against React StrictMode's dev double-invoke of effects).
  const lastFireRef = useRef<number | string | null>(null)

  useEffect(() => {
    if (lastFireRef.current === fire) return
    lastFireRef.current = fire
    const originX = x ?? window.innerWidth / 2
    const originY = y ?? window.innerHeight / 2
    const palette = colors.length > 0 ? colors : DEFAULT_COLORS

    for (let i = 0; i < count; i++) {
      // Upward fan: angles in [-0.85π, -0.15π]; straight up is -0.5π
      const angle = rand(-Math.PI * 0.85, -Math.PI * 0.15)
      const speed = rand(6, 14)
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: rand(0, Math.PI * 2),
        rotationSpeed: rand(-0.2, 0.2),
        size: rand(6, 12),
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: pickShape(shape),
        life: duration,
        maxLife: duration,
      })
    }
    kickRef.current?.()
  }, [fire, count, x, y, colors, duration, shape])

  return <canvas ref={canvasRef} aria-hidden="true" style={canvasStyle(zIndex)} />
}

export default Confetti

/**
 * Smaller one-shot radial sparkle — good for a quick "correct answer" ping.
 * No gravity; particles drift outward in all directions and fade out.
 */
export const ParticleBurst = ({
  fire,
  x,
  y,
  colors = DEFAULT_COLORS,
}: ParticleBurstProps) => {
  const { canvasRef, particlesRef, kickRef } = useParticleCanvas(burstStep)
  const lastFireRef = useRef<number | string | null>(null)

  useEffect(() => {
    if (lastFireRef.current === fire) return
    lastFireRef.current = fire
    const originX = x ?? window.innerWidth / 2
    const originY = y ?? window.innerHeight / 2
    const palette = colors.length > 0 ? colors : DEFAULT_COLORS

    for (let i = 0; i < BURST_COUNT; i++) {
      // Radial burst: all directions
      const angle = rand(0, Math.PI * 2)
      const speed = rand(2, 7)
      particlesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: rand(0, Math.PI * 2),
        rotationSpeed: rand(-0.3, 0.3),
        size: rand(3, 7),
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: 'circle',
        life: BURST_DURATION,
        maxLife: BURST_DURATION,
      })
    }
    kickRef.current?.()
  }, [fire, x, y, colors])

  return <canvas ref={canvasRef} aria-hidden="true" style={canvasStyle(60)} />
}
