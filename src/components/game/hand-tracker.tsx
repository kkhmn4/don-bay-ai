'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { HandLandmarker, FilesetResolver, type HandLandmarkerResult } from '@mediapipe/tasks-vision'

export interface HandCursor {
  x: number // window x
  y: number // window y
  pinching: boolean
  visible: boolean
}

interface HandTrackerProps {
  enabled: boolean
  /** Called with an array of cursors (max 2). Index 0 = left hand, 1 = right hand. */
  onHandsUpdate: (cursors: HandCursor[]) => void
  onStatus?: (status: 'loading' | 'ready' | 'error' | 'denied' | 'no-hands', message?: string) => void
}

// Pinch detection thresholds (normalized distance thumb<->index / hand size).
// Hysteresis prevents flickering: pinch STARTS below PINCH_ON, ENDS above PINCH_OFF.
const PINCH_ON = 0.28  // distance below which pinch activates (slightly higher = easier to pinch)
const PINCH_OFF = 0.45 // distance above which pinch releases (wider hysteresis = more stable)
// Exponential moving average factor for cursor smoothing (0-1, lower = smoother but laggier).
// 0.3 = 30% old + 70% new — responsive with mild jitter reduction.
const SMOOTHING = 0.3
const MAX_HANDS = 2

interface HandState {
  pinching: boolean
  smoothX: number
  smoothY: number
  smoothInit: boolean
}

function makeHandState(): HandState {
  return { pinching: false, smoothX: 0, smoothY: 0, smoothInit: false }
}

export default function HandTracker({ enabled, onHandsUpdate, onStatus }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastVideoTimeRef = useRef<number>(-1)
  // Per-hand state (left=0, right=1). We track by handedness when available,
  // otherwise by wrist x position (mirrored: lower x = right hand on screen).
  const handStatesRef = useRef<HandState[]>([makeHandState(), makeHandState()])
  const onHandsUpdateRef = useRef(onHandsUpdate)
  const onStatusRef = useRef(onStatus)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    onHandsUpdateRef.current = onHandsUpdate
    onStatusRef.current = onStatus
  }, [onHandsUpdate, onStatus])

  // Draw hand skeletons for all detected hands
  const drawHands = useCallback((result: HandLandmarkerResult, w: number, h: number, colors: string[]) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!result.landmarks || result.landmarks.length === 0) return

    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [5, 9], [9, 10], [10, 11], [11, 12],
      [9, 13], [13, 14], [14, 15], [15, 16],
      [13, 17], [17, 18], [18, 19], [19, 20],
      [0, 17],
    ]

    result.landmarks.forEach((landmarks, handIdx) => {
      const pts = landmarks.map((lm) => ({ x: (1 - lm.x) * w, y: lm.y * h }))
      const color = colors[handIdx] || 'rgba(16, 185, 129, 0.9)'

      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.shadowColor = color
      ctx.shadowBlur = 8
      for (const [a, b] of connections) {
        ctx.beginPath()
        ctx.moveTo(pts[a].x, pts[a].y)
        ctx.lineTo(pts[b].x, pts[b].y)
        ctx.stroke()
      }
      ctx.shadowBlur = 0
      ctx.fillStyle = '#fef08a'
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
        ctx.fill()
      }
      const indexTip = pts[8]
      const thumbTip = pts[4]
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(indexTip.x, indexTip.y, 9, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(thumbTip.x, thumbTip.y, 9, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [])

  useEffect(() => {
    if (!enabled) return
    let cancelled = false
    let stream: MediaStream | null = null

    async function init() {
      try {
        onStatusRef.current?.('loading', 'Đang tải mô hình nhận dạng tay...')
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
        )
        if (cancelled) return
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: MAX_HANDS,
        })
        if (cancelled) {
          landmarker.close()
          return
        }
        landmarkerRef.current = landmarker

        onStatusRef.current?.('loading', 'Đang mở webcam...')
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false,
        })
        if (cancelled) return
        const video = videoRef.current
        if (!video) return
        video.srcObject = stream
        await video.play()

        onStatusRef.current?.('ready')
        setErrorMsg(null)
        loop()
      } catch (e: any) {
        if (cancelled) return
        const name = e?.name || ''
        if (name === 'NotAllowedError' || name === 'SecurityError') {
          onStatusRef.current?.('denied', 'Không được cấp quyền webcam. Hãy dùng chuột/touch để chơi.')
          setErrorMsg('Không được cấp quyền webcam. Bạn vẫn có thể chơi bằng chuột/touch.')
        } else {
          onStatusRef.current?.('error', 'Không thể khởi tạo camera: ' + (e?.message || 'lỗi không xác định'))
          setErrorMsg('Không thể khởi tạo camera. Bạn vẫn có thể chơi bằng chuột/touch.')
        }
      }
    }

    function loop() {
      if (cancelled) return
      const video = videoRef.current
      const canvas = canvasRef.current
      const landmarker = landmarkerRef.current
      if (!video || !canvas || !landmarker) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }
      if (video.readyState >= 2 && video.currentTime !== lastVideoTimeRef.current) {
        lastVideoTimeRef.current = video.currentTime
        const now = performance.now()
        let result: HandLandmarkerResult | null = null
        try {
          result = landmarker.detectForVideo(video, now)
        } catch {
          result = null
        }

        const w = window.innerWidth
        const h = window.innerHeight
        canvas.width = w
        canvas.height = h

        if (result && result.landmarks && result.landmarks.length > 0) {
          // Sort hands by wrist x (mirrored): leftmost on screen = index 0.
          // We mirror x: (1 - lm.x), so a lower raw lm.x = higher screen x = right side.
          // After mirror, sort by screen x ascending → left hand first.
          const indexed = result.landmarks.map((lm, i) => ({ lm, i, screenX: (1 - lm[0].x) }))
          indexed.sort((a, b) => a.screenX - b.screenX)

          // Reset states for hands not detected this frame
          const newStates: HandState[] = [makeHandState(), makeHandState()]
          const cursors: HandCursor[] = []
          const drawColors: string[] = []

          for (let slot = 0; slot < Math.min(indexed.length, MAX_HANDS); slot++) {
            const { lm } = indexed[slot]
            const indexTip = lm[8]
            const thumbTip = lm[4]
            const wrist = lm[0]
            const middleMcp = lm[9]
            const handSize = Math.hypot(wrist.x - middleMcp.x, wrist.y - middleMcp.y) || 0.1
            const pinchDist = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y) / handSize

            // Carry over previous state for this slot (for hysteresis + smoothing continuity)
            const prev = handStatesRef.current[slot]
            let pinching: boolean
            if (!prev.pinching) {
              pinching = pinchDist < PINCH_ON
            } else {
              pinching = pinchDist < PINCH_OFF
            }

            const rawX = (1 - indexTip.x) * w
            const rawY = indexTip.y * h
            let smoothX: number, smoothY: number
            if (!prev.smoothInit) {
              smoothX = rawX
              smoothY = rawY
            } else {
              smoothX = prev.smoothX * SMOOTHING + rawX * (1 - SMOOTHING)
              smoothY = prev.smoothY * SMOOTHING + rawY * (1 - SMOOTHING)
            }

            newStates[slot] = { pinching, smoothX, smoothY, smoothInit: true }
            cursors[slot] = { x: smoothX, y: smoothY, pinching, visible: true }
            // Alternate skeleton colors: emerald for slot 0, cyan for slot 1
            drawColors[slot] = slot === 0 ? 'rgba(16, 185, 129, 0.9)' : 'rgba(6, 182, 212, 0.9)'
          }

          handStatesRef.current = newStates
          onHandsUpdateRef.current(cursors)
          drawHands(result, w, h, drawColors)
          onStatusRef.current?.('ready')
        } else {
          // No hands — reset all states
          handStatesRef.current = [makeHandState(), makeHandState()]
          onHandsUpdateRef.current([])
          const ctx = canvas.getContext('2d')
          ctx?.clearRect(0, 0, canvas.width, canvas.height)
          onStatusRef.current?.('no-hands', 'Đưa tay vào khung hình để chơi')
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    init()

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (stream) stream.getTracks().forEach((t) => t.stop())
      if (landmarkerRef.current) {
        try {
          landmarkerRef.current.close()
        } catch {}
        landmarkerRef.current = null
      }
      const video = videoRef.current
      if (video) video.srcObject = null
    }
  }, [enabled, drawHands])

  if (!enabled) return null

  return (
    <>
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover -scale-x-100 pointer-events-none"
        playsInline
        muted
      />
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-10" />
      {errorMsg && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-30 bg-amber-500/95 text-white text-sm px-4 py-2 rounded-lg shadow-lg max-w-md text-center">
          {errorMsg}
        </div>
      )}
    </>
  )
}
