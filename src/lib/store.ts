'use client'

import { create } from 'zustand'
import type { GameView, Player, Question, Difficulty } from '@/lib/types'

interface PlayerStats {
  correctCount: number
  fastestCorrectMs: number | null
  questionStartTime: number | null
  currentStreak: number   // consecutive correct answers (resets on wrong)
  maxStreak: number       // best streak this game
}

interface GameState {
  view: GameView
  players: Player[]
  questions: Question[]
  currentQuestionIndex: number
  currentPlayerIndex: number
  categoryId: string
  difficulty: Difficulty | 'all'
  questionsPerRound: number
  timePerQuestion: number
  handEnabled: boolean
  soundEnabled: boolean
  adaptiveDifficulty: boolean
  gameStartTime: number | null
  lastSessionId: string | null
  // Per-player answer stats tracked across a game (for achievements)
  playerStats: Record<number, PlayerStats>

  setView: (v: GameView) => void
  setPlayers: (p: Player[]) => void
  setQuestions: (q: Question[]) => void
  setCategory: (id: string) => void
  setDifficulty: (d: Difficulty | 'all') => void
  setQuestionsPerRound: (n: number) => void
  setTimePerQuestion: (n: number) => void
  setHandEnabled: (b: boolean) => void
  setSoundEnabled: (b: boolean) => void
  setAdaptiveDifficulty: (b: boolean) => void
  nextQuestion: () => void
  nextPlayer: () => void
  addScore: (playerId: number, points: number) => void
  resetGame: () => void
  startGame: () => void
  setLastSessionId: (id: string | null) => void
  // Achievement tracking
  recordAnswer: (playerId: number, correct: boolean) => void
  startQuestionTimer: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const SETTINGS_KEY = 'handquiz-settings-v1'

/** Persist a single setting into the localStorage settings object. */
function persistSetting(key: string, value: boolean): void {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    const obj = raw ? JSON.parse(raw) : {}
    obj[key] = value
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(obj))
  } catch {}
}

/** Read initial boolean setting from localStorage (SSR-safe, defaults true). */
function readSetting(key: string): boolean {
  if (typeof window === 'undefined') return true
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY)
    if (!raw) return true
    const obj = JSON.parse(raw)
    return obj[key] !== undefined ? !!obj[key] : true
  } catch {
    return true
  }
}

export const useGame = create<GameState>((set, get) => ({
  view: 'MENU',
  players: [],
  questions: [],
  currentQuestionIndex: 0,
  currentPlayerIndex: 0,
  categoryId: 'all',
  difficulty: 'all',
  questionsPerRound: 8,
  timePerQuestion: 30,
  handEnabled: readSetting('handEnabled'),
  soundEnabled: readSetting('soundEnabled'),
  adaptiveDifficulty: readSetting('adaptiveDifficulty'),
  gameStartTime: null,
  lastSessionId: null,
  playerStats: {},

  setView: (v) => set({ view: v }),
  setPlayers: (p) => set({ players: p }),
  setQuestions: (q) => set({ questions: q, currentQuestionIndex: 0, currentPlayerIndex: 0 }),
  setCategory: (id) => set({ categoryId: id }),
  setDifficulty: (d) => set({ difficulty: d }),
  setQuestionsPerRound: (n) => set({ questionsPerRound: n }),
  setTimePerQuestion: (n) => set({ timePerQuestion: n }),
  setHandEnabled: (b) => {
    set({ handEnabled: b })
    persistSetting('handEnabled', b)
  },
  setSoundEnabled: (b) => {
    set({ soundEnabled: b })
    persistSetting('soundEnabled', b)
  },
  setAdaptiveDifficulty: (b) => {
    set({ adaptiveDifficulty: b })
    persistSetting('adaptiveDifficulty', b)
  },
  setLastSessionId: (id) => set({ lastSessionId: id }),

  nextQuestion: () => set((s) => ({ currentQuestionIndex: s.currentQuestionIndex + 1 })),
  nextPlayer: () =>
    set((s) => ({
      currentPlayerIndex: (s.currentPlayerIndex + 1) % Math.max(1, s.players.length),
    })),
  addScore: (playerId, points) =>
    set((s) => ({
      players: s.players.map((p) =>
        p.id === playerId ? { ...p, score: p.score + points } : p
      ),
    })),
  resetGame: () =>
    set((s) => ({
      players: s.players.map((p) => ({ ...p, score: 0 })),
      currentQuestionIndex: 0,
      currentPlayerIndex: 0,
      gameStartTime: null,
      lastSessionId: null,
      playerStats: {},
    })),
  startGame: () => {
    const { questions, adaptiveDifficulty } = get()
    // If adaptive difficulty is on, sort EASY → MEDIUM → HARD (progressive).
    // Within each difficulty tier, questions are still shuffled for variety.
    let ordered = questions
    if (adaptiveDifficulty) {
      const byDiff: Record<string, typeof questions> = { EASY: [], MEDIUM: [], HARD: [] }
      for (const q of questions) {
        const d = (q.difficulty in byDiff) ? q.difficulty : 'EASY'
        byDiff[d].push(q)
      }
      ordered = [...shuffle(byDiff.EASY), ...shuffle(byDiff.MEDIUM), ...shuffle(byDiff.HARD)]
    } else {
      ordered = shuffle(questions)
    }
    set({
      questions: ordered,
      currentQuestionIndex: 0,
      currentPlayerIndex: 0,
      players: get().players.map((p) => ({ ...p, score: 0 })),
      view: 'GAME',
      gameStartTime: Date.now(),
      lastSessionId: null,
      playerStats: {},
    })
  },
  startQuestionTimer: () => {
    const now = Date.now()
    set((s) => {
      const stats = { ...s.playerStats }
      for (const p of s.players) {
        if (!stats[p.id]) stats[p.id] = { correctCount: 0, fastestCorrectMs: null, questionStartTime: now, currentStreak: 0, maxStreak: 0 }
        else stats[p.id] = { ...stats[p.id], questionStartTime: now }
      }
      return { playerStats: stats }
    })
  },
  recordAnswer: (playerId, correct) =>
    set((s) => {
      const stats = { ...s.playerStats }
      const cur = stats[playerId] || { correctCount: 0, fastestCorrectMs: null, questionStartTime: null, currentStreak: 0, maxStreak: 0 }
      if (correct) {
        const elapsed = cur.questionStartTime ? Date.now() - cur.questionStartTime : null
        const fastest = cur.fastestCorrectMs === null
          ? elapsed
          : (elapsed !== null ? Math.min(cur.fastestCorrectMs, elapsed) : cur.fastestCorrectMs)
        const newStreak = cur.currentStreak + 1
        stats[playerId] = {
          correctCount: cur.correctCount + 1,
          fastestCorrectMs: fastest,
          questionStartTime: null,
          currentStreak: newStreak,
          maxStreak: Math.max(cur.maxStreak, newStreak),
        }
      } else {
        stats[playerId] = { ...cur, questionStartTime: null, currentStreak: 0 }
      }
      return { playerStats: stats }
    }),
}))
