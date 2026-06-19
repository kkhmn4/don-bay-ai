'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGame } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LogOut, Clock, CheckCircle2, XCircle, Hand, MousePointer2, Volume2, VolumeX } from 'lucide-react'
import type { Question, Player } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { sounds } from '@/lib/sounds'
import { ParticleBurst } from '@/components/game/confetti'

interface GameCard {
  id: string
  label: string
  originalIndex: number
  color: string
}
interface GameSlot {
  id: string
  label: string
  acceptIndex: number
}
interface Prepared {
  mode: 'single' | 'multi'
  cards: GameCard[]
  slots: GameSlot[]
  type: Question['type']
}

interface CursorState {
  x: number
  y: number
  grabbing: boolean
  source: 'hand' | 'mouse'
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function prepareQuestion(q: Question, playerColor: string): Prepared {
  const options = JSON.parse(q.options)
  if (q.type === 'QUIZ') {
    const correct = Number(JSON.parse(q.answer))
    const cards: GameCard[] = options.map((text: string, i: number) => ({
      id: `c${i}`, label: text, originalIndex: i, color: playerColor,
    }))
    return { mode: 'single', cards: shuffle(cards), slots: [{ id: 's0', label: 'Đáp án', acceptIndex: correct }], type: 'QUIZ' }
  }
  if (q.type === 'MATCH') {
    const slots: GameSlot[] = options.map((o: any, i: number) => ({ id: `s${i}`, label: o.left, acceptIndex: i }))
    const cards: GameCard[] = options.map((o: any, i: number) => ({ id: `c${i}`, label: o.right, originalIndex: i, color: playerColor }))
    return { mode: 'multi', cards: shuffle(cards), slots, type: 'MATCH' }
  }
  const slots: GameSlot[] = options.map((_: any, i: number) => ({ id: `s${i}`, label: `${i + 1}`, acceptIndex: i }))
  const cards: GameCard[] = options.map((text: string, i: number) => ({ id: `c${i}`, label: text, originalIndex: i, color: playerColor }))
  return { mode: 'multi', cards: shuffle(cards), slots, type: 'SORT' }
}

const TIME_LIMIT: Record<string, number> = { QUIZ: 30, MATCH: 45, SORT: 45 }
// Multiplier so MATCH/SORT get a bit more time than QUIZ relative to the base.
const TYPE_MULTIPLIER: Record<string, number> = { QUIZ: 1, MATCH: 1.5, SORT: 1.5 }

interface QuestionBoardProps {
  cursorRefs: React.MutableRefObject<CursorState[]>
  twoHandMode: boolean
  handActive: boolean
}

export default function QuestionBoard({ cursorRefs, twoHandMode, handActive }: QuestionBoardProps) {
  const players = useGame((s) => s.players)
  const questions = useGame((s) => s.questions)
  const qIndex = useGame((s) => s.currentQuestionIndex)
  const playerIndex = useGame((s) => s.currentPlayerIndex)
  const handEnabled = useGame((s) => s.handEnabled)
  const timePerQuestion = useGame((s) => s.timePerQuestion)
  const setView = useGame((s) => s.setView)
  const nextQuestion = useGame((s) => s.nextQuestion)
  const nextPlayer = useGame((s) => s.nextPlayer)
  const addScore = useGame((s) => s.addScore)
  const soundEnabled = useGame((s) => s.soundEnabled)
  const setSoundEnabled = useGame((s) => s.setSoundEnabled)
  const recordAnswer = useGame((s) => s.recordAnswer)
  const startQuestionTimer = useGame((s) => s.startQuestionTimer)
  const playerStats = useGame((s) => s.playerStats)

  const currentQ = questions[qIndex]
  // In 2-hand mode both players play simultaneously — "currentPlayer" is only
  // used for the turn-based HUD display; both players' cursors are active.
  const currentPlayer: Player = players[playerIndex] || players[0]
  const currentStreak = playerStats[currentPlayer?.id]?.currentStreak || 0

  // prepared is derived (no setState needed)
  const prepared = useMemo<Prepared | null>(() => {
    if (!currentQ || !currentPlayer) return null
    return prepareQuestion(currentQ, currentPlayer.color)
  }, [currentQ, currentPlayer])

  // Use the host-configured base time × type multiplier (MATCH/SORT get more time).
  const limit = prepared ? Math.round(timePerQuestion * (TYPE_MULTIPLIER[prepared.type] || 1)) : timePerQuestion

  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [phase, setPhase] = useState<'playing' | 'feedback'>('playing')
  const [feedback, setFeedback] = useState<{ correct: boolean; points: number; correctSlots: boolean[]; winnerId?: number } | null>(null)
  const [timeLeft, setTimeLeft] = useState(limit)
  // Per-cursor drag state: index 0 = cursor 0 (left hand / mouse), index 1 = cursor 1 (right hand)
  const [draggingIds, setDraggingIds] = useState<(string | null)[]>([null, null])
  const [hoverSlots, setHoverSlots] = useState<(string | null)[]>([null, null])
  const [burstFire, setBurstFire] = useState(0)
  const [burstPos, setBurstPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // refs for rAF loop
  const slotRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const trayCardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const slotCardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const draggingIdsRef = useRef<(string | null)[]>([null, null])
  const assignmentsRef = useRef<Record<string, string>>({})
  const phaseRef = useRef<'playing' | 'feedback'>('playing')
  const preparedRef = useRef<Prepared | null>(null)
  const timeLeftRef = useRef(limit)
  const hoverSlotsRef = useRef<(string | null)[]>([null, null])
  // Direct-DOM dragged card elements (index = cursor index) — avoids setState per frame
  const draggedCardRefs = useRef<(HTMLDivElement | null)[]>([null, null])
  const dragPositionsRef = useRef<{ x: number; y: number }[]>([{ x: 0, y: 0 }, { x: 0, y: 0 }])
  const rafRef = useRef<number | null>(null)
  const grabDebounceRefs = useRef<number[]>([0, 0])
  const winnerRef = useRef<number | null>(null) // which player won this question (2-hand mode)

  useEffect(() => { draggingIdsRef.current = draggingIds }, [draggingIds])
  useEffect(() => { assignmentsRef.current = assignments }, [assignments])
  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { preparedRef.current = prepared }, [prepared])
  useEffect(() => { timeLeftRef.current = timeLeft }, [timeLeft])
  useEffect(() => { hoverSlotsRef.current = hoverSlots }, [hoverSlots])

  // Start the question timer when a new question loads (for achievement speed tracking)
  useEffect(() => {
    if (prepared && phase === 'playing') {
      winnerRef.current = null
      startQuestionTimer()
    }
  }, [qIndex, prepared, phase, startQuestionTimer])

  // Evaluate the current assignments. In 2-hand mode, `winnerPlayerId` is the
  // player who made the winning drop; they get a first-correct bonus.
  const evaluate = useCallback((winnerPlayerId?: number) => {
    const p = preparedRef.current
    if (!p) return
    if (phaseRef.current === 'feedback') return
    const correctSlots = p.slots.map((s) => {
      const cardId = assignmentsRef.current[s.id]
      if (!cardId) return false
      const card = p.cards.find((c) => c.id === cardId)
      return card ? card.originalIndex === s.acceptIndex : false
    })
    const correctCount = correctSlots.filter(Boolean).length
    let points = 0
    let scoringPlayerId: number | undefined
    if (p.mode === 'single') {
      points = correctSlots[0] ? 10 + Math.min(5, Math.ceil(timeLeftRef.current / 5)) : 0
      // In 2-hand mode, the winner is the player who dropped the card.
      // In single mode, use currentPlayer (turn-based).
      scoringPlayerId = winnerPlayerId !== undefined ? winnerPlayerId : (currentPlayer?.id)
    } else if (p.type === 'MATCH') {
      points = correctCount * 4
      scoringPlayerId = winnerPlayerId !== undefined ? winnerPlayerId : (currentPlayer?.id)
    } else {
      points = correctCount * 3 + (correctCount === p.slots.length ? 8 : 0)
      scoringPlayerId = winnerPlayerId !== undefined ? winnerPlayerId : (currentPlayer?.id)
    }
    const allCorrect = correctCount === p.slots.length
    setFeedback({ correct: allCorrect, points, correctSlots, winnerId: scoringPlayerId })
    setPhase('feedback')
    if (scoringPlayerId !== undefined && allCorrect) {
      // First-correct bonus in 2-hand mode
      const bonus = twoHandMode ? 5 : 0
      addScore(scoringPlayerId, points + bonus)
      recordAnswer(scoringPlayerId, true)
    } else if (scoringPlayerId !== undefined) {
      // Partial / wrong — still record the answer
      recordAnswer(scoringPlayerId, allCorrect)
    }
    if (allCorrect) {
      sounds.correct()
      const slotEl = slotRefs.current[p.slots[0]?.id]
      const r = slotEl?.getBoundingClientRect()
      setBurstPos({
        x: r ? r.left + r.width / 2 : window.innerWidth / 2,
        y: r ? r.top + r.height / 2 : window.innerHeight / 2,
      })
      setBurstFire((f) => f + 1)
    } else {
      sounds.wrong()
    }
  }, [currentPlayer, addScore, recordAnswer, twoHandMode])

  // Main rAF drag loop — handles both cursors independently.
  // Performance: during drag we move the card element directly via style
  // (no React re-render), only using setState for hover/assignment changes.
  // Bounding rects are cached per-frame to avoid repeated layout thrashing.
  useEffect(() => {
    const GRACE = 40  // slightly larger for easier targeting
    const GRAB_DEBOUNCE = 60   // ms (was 100)
    const DROP_DEBOUNCE = 50   // ms (was 80)

    // Cache bounding rects for the current frame — avoids multiple getBoundingClientRect calls
    function getRects(): {
      slots: Record<string, DOMRect>
      tray: Record<string, DOMRect>
      slotCards: Record<string, DOMRect>
    } {
      const p = preparedRef.current
      if (!p) return { slots: {}, tray: {}, slotCards: {} }
      const slots: Record<string, DOMRect> = {}
      const tray: Record<string, DOMRect> = {}
      const slotCards: Record<string, DOMRect> = {}
      for (const slot of p.slots) {
        const el = slotRefs.current[slot.id]
        if (el) slots[slot.id] = el.getBoundingClientRect()
      }
      for (const card of p.cards) {
        const el = trayCardRefs.current[card.id]
        if (el) tray[card.id] = el.getBoundingClientRect()
      }
      for (const [slotId] of Object.entries(assignmentsRef.current)) {
        const el = slotCardRefs.current[slotId]
        if (el) slotCards[slotId] = el.getBoundingClientRect()
      }
      return { slots, tray, slotCards }
    }

    function hitTest(x: number, y: number, r: DOMRect): boolean {
      return x >= r.left - GRACE && x <= r.right + GRACE && y >= r.top - GRACE && y <= r.bottom + GRACE
    }

    function tick() {
      const p = preparedRef.current
      if (p && phaseRef.current === 'playing') {
        const now = performance.now()
        const rects = getRects()
        const assignedCardIds = new Set(Object.values(assignmentsRef.current))

        // Process each cursor independently
        for (let ci = 0; ci < cursorRefs.current.length; ci++) {
          const cur = cursorRefs.current[ci]
          if (!cur) continue
          const wasGrabbing = draggingIdsRef.current[ci] !== null
          const draggedEl = draggedCardRefs.current[ci]

          if (cur.grabbing && !wasGrabbing) {
            // --- GRAB ---
            if (now - grabDebounceRefs.current[ci] > GRAB_DEBOUNCE) {
              let topCard: string | null = null
              // Check slot cards for un-assign (MATCH/SORT only)
              if (p.mode === 'multi') {
                for (const [slotId, cardId] of Object.entries(assignmentsRef.current)) {
                  if (draggingIdsRef.current.includes(cardId)) continue
                  const r = rects.slotCards[slotId]
                  if (r && hitTest(cur.x, cur.y, r)) {
                    topCard = cardId
                    const newAssign = { ...assignmentsRef.current }
                    delete newAssign[slotId]
                    assignmentsRef.current = newAssign
                    setAssignments(newAssign)
                    assignedCardIds.delete(cardId)
                    break
                  }
                }
              }
              // Check tray cards
              if (!topCard) {
                for (const card of p.cards) {
                  if (assignedCardIds.has(card.id)) continue
                  if (draggingIdsRef.current.includes(card.id)) continue
                  const r = rects.tray[card.id]
                  if (r && hitTest(cur.x, cur.y, r)) {
                    topCard = card.id
                    break
                  }
                }
              }
              if (topCard) {
                draggingIdsRef.current[ci] = topCard
                setDraggingIds((prev) => {
                  const next = [...prev]
                  next[ci] = topCard
                  return next
                })
                // Position the dragged card element directly (no setState)
                if (draggedEl) {
                  draggedEl.style.display = 'block'
                  draggedEl.style.left = cur.x + 'px'
                  draggedEl.style.top = cur.y + 'px'
                  const card = p.cards.find((c) => c.id === topCard)
                  if (card) {
                    draggedEl.textContent = card.label
                    draggedEl.style.backgroundColor = card.color
                    draggedEl.style.boxShadow = `0 8px 30px ${card.color}99`
                  }
                }
                dragPositionsRef.current[ci] = { x: cur.x, y: cur.y }
                grabDebounceRefs.current[ci] = now
                sounds.pickup()
              }
            }
          } else if (cur.grabbing && wasGrabbing) {
            // --- DRAG (move) ---
            // Update position directly via DOM (no setState → no re-render)
            if (draggedEl) {
              draggedEl.style.left = cur.x + 'px'
              draggedEl.style.top = cur.y + 'px'
            }
            dragPositionsRef.current[ci] = { x: cur.x, y: cur.y }
            // Hover detection — only setState when hover changes
            let hover: string | null = null
            for (const slot of p.slots) {
              const r = rects.slots[slot.id]
              if (r && hitTest(cur.x, cur.y, r)) {
                hover = slot.id
                break
              }
            }
            if (hover !== hoverSlotsRef.current[ci]) {
              hoverSlotsRef.current[ci] = hover
              setHoverSlots((prev) => {
                const next = [...prev]
                next[ci] = hover
                return next
              })
            }
          } else if (!cur.grabbing && wasGrabbing) {
            // --- DROP ---
            if (now - grabDebounceRefs.current[ci] > DROP_DEBOUNCE) {
              const cardId = draggingIdsRef.current[ci]
              const hover = hoverSlotsRef.current[ci]
              // Hide dragged card element
              if (draggedEl) draggedEl.style.display = 'none'
              if (cardId && hover) {
                const slotFilled = !!assignmentsRef.current[hover]
                if (p.mode === 'single') {
                  const newAssign = { ...assignmentsRef.current, [hover]: cardId }
                  assignmentsRef.current = newAssign
                  setAssignments(newAssign)
                  sounds.drop()
                  const winnerPlayerId = twoHandMode ? players[ci]?.id : undefined
                  setTimeout(() => evaluate(winnerPlayerId), 40)
                } else if (!slotFilled) {
                  const newAssign = { ...assignmentsRef.current, [hover]: cardId }
                  assignmentsRef.current = newAssign
                  setAssignments(newAssign)
                  sounds.drop()
                  if (Object.keys(newAssign).length === p.slots.length) {
                    const winnerPlayerId = twoHandMode ? players[ci]?.id : undefined
                    setTimeout(() => evaluate(winnerPlayerId), 400)
                  }
                } else {
                  sounds.drop()
                }
              } else {
                sounds.drop()
              }
              draggingIdsRef.current[ci] = null
              setDraggingIds((prev) => {
                const next = [...prev]
                next[ci] = null
                return next
              })
              hoverSlotsRef.current[ci] = null
              setHoverSlots((prev) => {
                const next = [...prev]
                next[ci] = null
                return next
              })
              grabDebounceRefs.current[ci] = now
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [cursorRefs, evaluate, twoHandMode, players])

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return
    if (timeLeft <= 0) {
      evaluate()
      return
    }
    if (timeLeft <= 5 && timeLeft > 0) {
      sounds.tick()
    }
    const t = setTimeout(() => setTimeLeft((tl) => tl - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, phase, evaluate])

  // Advance after feedback
  useEffect(() => {
    if (phase !== 'feedback') return
    const t = setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        setView('RESULTS')
      } else {
        nextQuestion()
        // In 2-hand mode both players play simultaneously — no turn rotation.
        if (!twoHandMode) nextPlayer()
      }
    }, 2400)
    return () => clearTimeout(t)
  }, [phase, qIndex, questions.length, setView, nextQuestion, nextPlayer, twoHandMode])

  const trayCards = useMemo(() => {
    if (!prepared) return []
    return prepared.cards.filter((c) => !Object.values(assignments).includes(c.id) && !draggingIds.includes(c.id))
  }, [prepared, assignments, draggingIds])

  if (!currentQ || !currentPlayer || !prepared) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <p className="text-white mb-4">Không có câu hỏi.</p>
          <Button onClick={() => setView('MENU')}>Về trang chủ</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Top HUD — single clean bar with high-contrast pill chips */}
      <div className="fixed top-0 left-0 right-0 z-30 px-3 pt-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Exit */}
          <button
            onClick={() => { if (confirm('Thoát trò chơi?')) setView('MENU') }}
            className="shrink-0 w-9 h-9 rounded-full bg-black/80 backdrop-blur flex items-center justify-center text-white hover:bg-black/90 transition-colors shadow-lg"
            aria-label="Thoát"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Timer — big, bold, high contrast */}
          <div className="shrink-0 flex items-center gap-1.5 px-3 h-9 rounded-full bg-black/80 backdrop-blur shadow-lg">
            <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400' : 'text-white/70'}`} />
            <span className={`text-base font-mono font-black ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
          </div>

          {/* Question counter */}
          <div className="shrink-0 flex items-center gap-1 px-3 h-9 rounded-full bg-black/80 backdrop-blur shadow-lg">
            <span className="text-sm font-bold text-white">{qIndex + 1}<span className="text-white/50">/{questions.length}</span></span>
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => { sounds.click(); setSoundEnabled(!soundEnabled) }}
            className="shrink-0 w-9 h-9 rounded-full bg-black/80 backdrop-blur flex items-center justify-center text-white hover:bg-black/90 transition-colors shadow-lg"
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            aria-label="Âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Player scores — right aligned, all in one row */}
          <div className="ml-auto flex items-center gap-2">
            {players.map((p) => {
              const isCurrent = p.id === currentPlayer.id
              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-1.5 px-2.5 h-9 rounded-full backdrop-blur shadow-lg transition-all ${
                    isCurrent ? 'scale-105' : ''
                  }`}
                  style={{
                    backgroundColor: isCurrent ? p.color : 'rgba(0,0,0,0.8)',
                    border: `2px solid ${isCurrent ? '#fff' : p.color + '66'}`,
                  }}
                >
                  <span className="text-base">{p.avatar}</span>
                  <span className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-white/80'}`}>{p.score}</span>
                  {isCurrent && currentStreak >= 2 && (
                    <span className="text-xs font-bold text-white/90" title="Chuỗi đúng">🔥{currentStreak}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Timer progress bar */}
        <Progress value={(timeLeft / limit) * 100} className="h-1 bg-white/20 mt-2" />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col h-full pt-20 pb-4 px-4">
        <motion.div key={qIndex} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
              {prepared.type === 'QUIZ' ? 'Trắc nghiệm' : prepared.type === 'MATCH' ? 'Ghép cặp' : 'Sắp xếp'}
            </Badge>
            <Badge variant="outline" className={
              currentQ.difficulty === 'EASY' ? 'border-emerald-400 text-emerald-300 bg-emerald-500/20' :
              currentQ.difficulty === 'MEDIUM' ? 'border-amber-400 text-amber-300 bg-amber-500/20' :
              'border-red-400 text-red-300 bg-red-500/20'
            }>
              {currentQ.difficulty === 'EASY' ? '🟢 Dễ' : currentQ.difficulty === 'MEDIUM' ? '🟡 TB' : '🔴 Khó'}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-tight">{currentQ.prompt}</h2>
          {prepared.type === 'SORT' && <p className="text-white/90 text-sm mt-1 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Kéo các thẻ vào ô theo thứ tự đúng</p>}
          {prepared.type === 'MATCH' && <p className="text-white/90 text-sm mt-1 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Kéo đáp án vào ô tương ứng</p>}
        </motion.div>

        {/* Slots */}
        <div className="flex-1 flex flex-col justify-center items-center gap-4 min-h-0">
          <div className="flex flex-wrap justify-center gap-3">
            {prepared.slots.map((slot, i) => {
              const assignedCardId = assignments[slot.id]
              const assignedCard = assignedCardId ? prepared.cards.find((c) => c.id === assignedCardId) : null
              const isHover = hoverSlots.includes(slot.id) && draggingIds.some((d) => d !== null)
              const isCorrect = feedback?.correctSlots[i]
              const showFeedback = phase === 'feedback' && assignedCardId
              const anyDragging = draggingIds.some((d) => d !== null)
              return (
                <div
                  key={slot.id}
                  ref={(el) => { slotRefs.current[slot.id] = el }}
                  className={`relative rounded-2xl border-2 transition-all flex flex-col items-center justify-center p-2 ${
                    prepared.type === 'SORT' ? 'w-28 h-24 sm:w-32 sm:h-28' : prepared.type === 'MATCH' ? 'w-36 h-24 sm:w-44 sm:h-28' : 'w-48 h-28 sm:w-56 sm:h-32'
                  } ${
                    showFeedback
                      ? isCorrect ? 'border-emerald-400 bg-emerald-500/30' : 'border-red-400 bg-red-500/30'
                      : isHover
                      ? 'border-amber-300 bg-amber-400/20 scale-105 animate-pulse-glow'
                      : !assignedCardId && anyDragging
                      ? 'border-white/60 bg-white/15 backdrop-blur animate-pulse'
                      : 'border-white/40 bg-white/10 backdrop-blur'
                  }`}
                  style={isHover && !showFeedback ? { boxShadow: '0 0 24px 4px rgba(251, 191, 36, 0.5)' } : undefined}
                >
                  <span className="text-white/60 text-xs font-medium mb-1 text-center break-words">
                    {prepared.type === 'MATCH' ? slot.label : prepared.type === 'SORT' ? `Ô ${slot.label}` : 'Ô đáp án'}
                  </span>
                  {assignedCard ? (
                    <motion.div
                      ref={(el) => { slotCardRefs.current[slot.id] = el }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className={`px-2 py-1.5 rounded-lg font-semibold text-white text-center shadow-lg text-xs sm:text-sm max-w-full break-words ${
                        prepared.mode === 'multi' && phase === 'playing' ? 'cursor-grab hover:scale-105' : ''
                      }`}
                      style={{ backgroundColor: assignedCard.color }}
                    >
                      {assignedCard.label}
                    </motion.div>
                  ) : (
                    <span className="text-white/30 text-xs" ref={() => { slotCardRefs.current[slot.id] = null }}>Thả vào đây</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Tray */}
          <div className="w-full max-w-4xl mt-auto">
            <div className="flex flex-wrap justify-center gap-3 p-3 rounded-2xl bg-black/30 backdrop-blur min-h-20">
              {trayCards.length === 0 && !draggingIds.some((d) => d !== null) && (
                <span className="text-white/40 text-sm py-4">{phase === 'playing' ? 'Tất cả thẻ đã được đặt' : '—'}</span>
              )}
              {trayCards.map((card) => (
                <motion.div
                  key={card.id}
                  ref={(el) => { trayCardRefs.current[card.id] = el }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-semibold text-white shadow-lg text-xs sm:text-sm max-w-44 text-center cursor-grab"
                  style={{ backgroundColor: card.color, boxShadow: `0 4px 14px ${card.color}66` }}
                >
                  {card.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dragged cards — 2 direct-DOM elements moved via rAF (no React re-render per frame) */}
      <div
        ref={(el) => { draggedCardRefs.current[0] = el }}
        className="fixed z-40 pointer-events-none px-4 py-3 rounded-xl font-semibold text-white shadow-2xl text-sm max-w-56 text-center"
        style={{ display: 'none', left: 0, top: 0, transform: 'translate(-50%, -50%) scale(1.1)' }}
      />
      <div
        ref={(el) => { draggedCardRefs.current[1] = el }}
        className="fixed z-40 pointer-events-none px-4 py-3 rounded-xl font-semibold text-white shadow-2xl text-sm max-w-56 text-center"
        style={{ display: 'none', left: 0, top: 0, transform: 'translate(-50%, -50%) scale(1.1)' }}
      />

      {/* Feedback overlay */}
      <AnimatePresence>
        {phase === 'feedback' && feedback && prepared && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <Card className={`border-2 ${feedback.correct ? 'border-emerald-500 bg-emerald-500/95' : 'border-red-500 bg-red-500/95'} text-white shadow-2xl max-w-md`}>
              <CardContent className="p-6 text-center">
                {feedback.correct ? <CheckCircle2 className="w-14 h-14 mx-auto mb-2" /> : <XCircle className="w-14 h-14 mx-auto mb-2" />}
                <div className="text-2xl font-black mb-1">{feedback.correct ? 'Chính xác!' : 'Chưa đúng!'}</div>
                {twoHandMode && feedback.winnerId !== undefined && feedback.correct && (() => {
                  const winner = players.find((p) => p.id === feedback.winnerId)
                  return winner ? (
                    <div className="text-sm mb-1" style={{ color: winner.color }}>
                      🏆 {winner.avatar} {winner.name} trả lời trước! +5 bonus
                    </div>
                  ) : null
                })()}
                <div className="text-lg mb-2">{feedback.points > 0 ? `+${feedback.points}${twoHandMode && feedback.correct ? ' +5' : ''} điểm` : 'Không điểm'}</div>
                {!feedback.correct && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 pt-3 border-t border-white/20 text-left"
                  >
                    <p className="text-xs text-white/70 mb-1">Đáp án đúng:</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {prepared.slots.map((slot, i) => {
                        const correctCard = prepared.cards.find((c) => c.originalIndex === slot.acceptIndex)
                        if (!correctCard) return null
                        return (
                          <div key={slot.id} className="px-2 py-1 rounded-lg bg-white/20 text-sm font-medium text-center max-w-40 break-words">
                            {prepared.type === 'MATCH' && <span className="text-white/70 text-xs block">{slot.label}: </span>}
                            {correctCard.label}
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mouse hint when hand disabled */}
      {!handEnabled && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
          <MousePointer2 className="w-4 h-4" /> Chế độ chuột: nhấn giữ thẻ, kéo vào ô, thả ra
        </div>
      )}
      {/* No-hands hint */}
      {handEnabled && !handActive && phase === 'playing' && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 pointer-events-none">
          <Hand className="w-4 h-4 animate-pulse" /> Đưa tay vào camera hoặc dùng chuột
        </div>
      )}

      {/* Particle burst on correct answer */}
      <ParticleBurst fire={burstFire} x={burstPos.x} y={burstPos.y} colors={[currentPlayer.color, '#fbbf24', '#34d399', '#60a5fa']} />
    </div>
  )
}
