'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useGame } from '@/lib/store'
import HandTracker, { type HandCursor } from './hand-tracker'
import QuestionBoard from './question-board'
import { sounds } from '@/lib/sounds'

export interface CursorState {
  x: number
  y: number
  grabbing: boolean
  source: 'hand' | 'mouse'
}

interface CursorVis {
  x: number
  y: number
  show: boolean
  pinching: boolean
  playerIndex: number // which player this cursor belongs to
}

export default function GameView() {
  const handEnabled = useGame((s) => s.handEnabled)
  const qIndex = useGame((s) => s.currentQuestionIndex)
  const players = useGame((s) => s.players)

  // Determine if we're in 2-hand simultaneous mode:
  // AR enabled AND exactly 2 players → each hand = one player.
  const twoHandMode = handEnabled && players.length === 2

  // Cursor refs: in 2-hand mode we have 2 (index 0 = left hand / player 0,
  // index 1 = right hand / player 1). In single mode we use index 0 only.
  const cursorRefs = useRef<CursorState[]>([
    { x: 0, y: 0, grabbing: false, source: 'mouse' },
    { x: 0, y: 0, grabbing: false, source: 'mouse' },
  ])
  const handActiveRef = useRef(false)
  const [cursorsVis, setCursorsVis] = useState<CursorVis[]>([
    { x: 0, y: 0, show: false, pinching: false, playerIndex: 0 },
    { x: 0, y: 0, show: false, pinching: false, playerIndex: 1 },
  ])
  const [status, setStatus] = useState<{ s: string; m?: string }>({ s: 'loading' })

  // Hand tracker callback — receives array of up to 2 cursors
  const onHandsUpdate = useCallback((cs: HandCursor[]) => {
    if (cs.length > 0) {
      handActiveRef.current = true
      // Update both cursor refs from the hand data
      const newRefs = [...cursorRefs.current]
      let anyVisible = false
      const newVis0 = { x: 0, y: 0, show: false, pinching: false, playerIndex: 0 }
      const newVis1 = { x: 0, y: 0, show: false, pinching: false, playerIndex: 1 }
      for (let i = 0; i < 2; i++) {
        const c = cs[i]
        if (c && c.visible) {
          anyVisible = true
          newRefs[i] = { x: c.x, y: c.y, grabbing: c.pinching, source: 'hand' }
          if (i === 0) Object.assign(newVis0, { x: c.x, y: c.y, show: true, pinching: c.pinching })
          else Object.assign(newVis1, { x: c.x, y: c.y, show: true, pinching: c.pinching })
        } else {
          newRefs[i] = { ...newRefs[i], grabbing: false, source: 'hand' }
        }
      }
      cursorRefs.current = newRefs
      setCursorsVis([newVis0, newVis1])
      if (!anyVisible) handActiveRef.current = false
    } else {
      handActiveRef.current = false
      // Hide both cursors
      setCursorsVis([
        { x: 0, y: 0, show: false, pinching: false, playerIndex: 0 },
        { x: 0, y: 0, show: false, pinching: false, playerIndex: 1 },
      ])
    }
  }, [])

  // Play start chime once on game mount
  const startPlayedRef = useRef(false)
  useEffect(() => {
    if (startPlayedRef.current) return
    startPlayedRef.current = true
    sounds.start()
  }, [])

  // Mouse/touch fallback (always active — only affects cursor 0 when no hand visible)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!handActiveRef.current) {
        cursorRefs.current[0] = { ...cursorRefs.current[0], x: e.clientX, y: e.clientY, source: 'mouse' }
        setCursorsVis((v) => {
          const next = [...v]
          next[0] = { ...next[0], x: e.clientX, y: e.clientY, show: false }
          return next
        })
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!handActiveRef.current) {
        cursorRefs.current[0] = { ...cursorRefs.current[0], x: e.clientX, y: e.clientY, grabbing: true, source: 'mouse' }
        setCursorsVis((v) => {
          const next = [...v]
          next[0] = { ...next[0], x: e.clientX, y: e.clientY, pinching: true }
          return next
        })
      }
    }
    const onUp = () => {
      if (!handActiveRef.current) {
        cursorRefs.current[0] = { ...cursorRefs.current[0], grabbing: false }
        setCursorsVis((v) => {
          const next = [...v]
          next[0] = { ...next[0], pinching: false }
          return next
        })
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* AR background */}
      {handEnabled && <HandTracker enabled={handEnabled} onHandsUpdate={onHandsUpdate} onStatus={(s, m) => setStatus({ s, m })} />}

      {/* Dark overlay */}
      {handEnabled && <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none z-[15]" />}

      {/* Loading / status hint */}
      {handEnabled && status.s === 'loading' && status.m && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-black/70 backdrop-blur text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-lg">
          <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" /> {status.m}
        </div>
      )}

      {/* 2-hand mode banner */}
      {twoHandMode && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs flex items-center gap-2 shadow-lg">
          🤝 2 tay đồng thời — tay trái = {players[0]?.avatar} {players[0]?.name} · tay phải = {players[1]?.avatar} {players[1]?.name}
        </div>
      )}

      {/* Keyed board — remounts each question to reset state cleanly */}
      <QuestionBoard
        key={qIndex}
        cursorRefs={cursorRefs}
        twoHandMode={twoHandMode}
        handActive={cursorsVis.some((c) => c.show)}
      />

      {/* Virtual cursors (hand mode) — render up to 2 */}
      {cursorsVis.map((cv, idx) => {
        if (!cv.show) return null
        const player = players[idx] || players[0]
        if (!player) return null
        return (
          <div
            key={idx}
            className="fixed z-40 pointer-events-none"
            style={{ left: cv.x, top: cv.y, transform: 'translate(-50%, -50%)' }}
          >
            {/* Pinch glow halo */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-150"
              style={{
                boxShadow: cv.pinching
                  ? `0 0 32px 10px ${player.color}, 0 0 70px 16px ${player.color}66`
                  : `0 0 20px 4px ${player.color}55`,
                transform: cv.pinching ? 'scale(1.5)' : 'scale(1)',
              }}
            />
            <div
              className="relative w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-100"
              style={{
                borderColor: player.color,
                backgroundColor: cv.pinching ? player.color : 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(2px)',
                transform: cv.pinching ? 'scale(70%)' : 'scale(1)',
              }}
            >
              {cv.pinching ? (
                <span className="text-white text-base">✊</span>
              ) : (
                <span className="text-white/50 text-xs">👆</span>
              )}
            </div>
            {/* Player name label */}
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
              style={{ backgroundColor: player.color }}
            >
              {player.avatar} {player.name}
            </div>
            {/* Pinch state label */}
            {cv.pinching && (
              <div
                className="absolute top-14 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
                style={{ backgroundColor: player.color }}
              >
                KẸP
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
