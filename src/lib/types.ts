// Shared types for HandQuiz AR

export type QuestionType = 'QUIZ' | 'MATCH' | 'SORT'
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  createdAt: string
  _count?: { questions: number }
}

export interface Question {
  id: string
  categoryId: string
  category?: Category
  type: QuestionType
  prompt: string
  options: string // JSON string
  answer: string // JSON string
  difficulty: Difficulty
  createdAt: string
  updatedAt: string
}

// Parsed question shapes
export interface QuizOption {
  id: string
  text: string
}

export interface MatchPair {
  id: string
  left: string
  right: string
}

export interface ParsedQuiz {
  options: QuizOption[]
  correctIndex: number
}
export interface ParsedMatch {
  pairs: MatchPair[] // left side as given, right side to be matched
  correctOrder: number[] // for each left index, the correct right index in shuffled order
}
export interface ParsedSort {
  items: { id: string; text: string }[]
  correctOrder: number[] // correct order indices into shuffled items
}

export type GameView = 'MENU' | 'SETUP' | 'GAME' | 'RESULTS' | 'TEACHER' | 'INSTRUCTIONS' | 'LEADERBOARD'

export interface Player {
  id: number
  name: string
  color: string
  score: number
  avatar: string
}

export const PLAYER_COLORS = ['#10b981', '#f59e0b', '#06b6d4', '#ec4899']
export const PLAYER_AVATARS = ['🦊', '🐼', '🐯', '🦁']

// Expanded avatar palette for the avatar picker — animal + fun emojis for students
export const AVATAR_PALETTE = [
  '🦊', '🐼', '🐯', '🦁', '🐸', '🐵', '🐰', '🐨',
  '🐮', '🐷', '🐔', '🦄', '🐲', '🦉', '🐧', '🦋',
  '🐙', '🦀', '🐠', '🐬', '🦓', '🐘', '🦒', '🐢',
]
