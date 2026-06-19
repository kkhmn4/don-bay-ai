// Achievement definitions + evaluation logic for HandQuiz AR.
// Each achievement checks a player's performance across one game session.

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string // emoji
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface PlayerGameStats {
  name: string
  score: number
  correctCount: number
  totalQuestions: number
  fastestCorrectMs: number | null // fastest correct answer time, or null if none correct
  isWinner: boolean
  playerCount: number
  maxStreak: number // longest consecutive correct streak this game
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'perfect',
    name: 'Hoàn hảo',
    description: 'Trả lời đúng tất cả câu hỏi',
    icon: '💯',
    color: '#fbbf24',
    rarity: 'legendary',
  },
  {
    id: 'lightning',
    name: 'Tia chớp',
    description: 'Trả lời đúng trong dưới 5 giây',
    icon: '⚡',
    color: '#06b6d4',
    rarity: 'epic',
  },
  {
    id: 'champion',
    name: 'Nhà vô địch',
    description: 'Thắng trận đấu',
    icon: '👑',
    color: '#f59e0b',
    rarity: 'rare',
  },
  {
    id: 'comeback',
    name: 'Vươn lên',
    description: 'Thắng khi có 3+ người chơi',
    icon: '🚀',
    color: '#8b5cf6',
    rarity: 'epic',
  },
  {
    id: 'first-blood',
    name: 'Khởi đầu tốt',
    description: 'Trả lời đúng câu đầu tiên',
    icon: '🎯',
    color: '#10b981',
    rarity: 'common',
  },
  {
    id: 'sharpshooter',
    name: 'Bắn tỉa',
    description: 'Đúng ít nhất 3 câu trong ván',
    icon: '🎖️',
    color: '#ec4899',
    rarity: 'rare',
  },
  {
    id: 'survivor',
    name: 'Kiên cường',
    description: 'Hoàn thành ván dù không đúng câu nào',
    icon: '🛡️',
    color: '#64748b',
    rarity: 'common',
  },
  {
    id: 'high-scorer',
    name: 'Điểm cao',
    description: 'Đạt 30+ điểm trong một ván',
    icon: '🏆',
    color: '#f97316',
    rarity: 'rare',
  },
  {
    id: 'streak',
    name: 'Chuỗi đúng',
    description: 'Đúng 4+ câu liên tiếp không gián đoạn',
    icon: '🔥',
    color: '#ef4444',
    rarity: 'epic',
  },
  {
    id: 'speed-demon',
    name: 'Tốc độ ánh sáng',
    description: 'Đúng dưới 3 giây',
    icon: '⚡',
    color: '#06b6d4',
    rarity: 'legendary',
  },
  {
    id: 'marathon',
    name: 'Người sôi động',
    description: 'Hoàn thành ván 8+ câu',
    icon: '🏃',
    color: '#14b8a6',
    rarity: 'common',
  },
]

/** Evaluate which achievements a player earned based on their game stats. */
export function evaluateAchievements(stats: PlayerGameStats): Achievement[] {
  const earned: Achievement[] = []

  if (stats.correctCount === stats.totalQuestions && stats.totalQuestions > 0) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'perfect')!)
  }
  if (stats.fastestCorrectMs !== null && stats.fastestCorrectMs < 5000) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'lightning')!)
  }
  if (stats.fastestCorrectMs !== null && stats.fastestCorrectMs < 3000) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'speed-demon')!)
  }
  if (stats.isWinner && stats.score > 0) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'champion')!)
  }
  if (stats.isWinner && stats.playerCount >= 3) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'comeback')!)
  }
  if (stats.correctCount >= 1) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'first-blood')!)
  }
  if (stats.correctCount >= 3) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'sharpshooter')!)
  }
  if (stats.maxStreak >= 4) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'streak')!)
  }
  if (stats.correctCount === 0 && stats.totalQuestions > 0) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'survivor')!)
  }
  if (stats.score >= 30) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'high-scorer')!)
  }
  if (stats.totalQuestions >= 8) {
    earned.push(ACHIEVEMENTS.find((a) => a.id === 'marathon')!)
  }

  return earned
}

export const RARITY_LABEL: Record<Achievement['rarity'], string> = {
  common: 'Phổ biến',
  rare: 'Hiếm',
  epic: 'Sử thi',
  legendary: 'Huyền thoại',
}

export const RARITY_GLOW: Record<Achievement['rarity'], string> = {
  common: '0 0 12px rgba(100,116,139,0.4)',
  rare: '0 0 14px rgba(245,158,11,0.5)',
  epic: '0 0 16px rgba(139,92,246,0.6)',
  legendary: '0 0 20px rgba(251,191,36,0.7)',
}
