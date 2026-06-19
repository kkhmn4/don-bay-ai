'use client'

import { useGame } from '@/lib/store'
import MenuView from '@/components/game/menu-view'
import SetupView from '@/components/game/setup-view'
import GameView from '@/components/game/game-view'
import ResultsView from '@/components/game/results-view'
import InstructionsView from '@/components/game/instructions-view'
import LeaderboardView from '@/components/game/leaderboard-view'
import TeacherView from '@/components/teacher/teacher-view'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

interface HandQuizContainerProps {
  onExit: () => void
}

export default function HandQuizContainer({ onExit }: HandQuizContainerProps) {
  const view = useGame((s) => s.view)
  const setView = useGame((s) => s.setView)

  // Reset view to MENU when mounting HandQuiz
  useEffect(() => {
    setView('MENU')
  }, [setView])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative select-none">
      {/* Floating HUD Controller to Exit Game */}
      {view !== 'GAME' ? (
        <div className="absolute top-6 left-6 z-[110] flex items-center gap-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-black/85 text-white text-sm font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Thoát Game
          </button>
        </div>
      ) : (
        <div className="fixed top-6 left-6 z-[110] flex items-center gap-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-black/85 text-white text-sm font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Thoát Game
          </button>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {view === 'MENU' && <MenuView />}
        {view === 'SETUP' && <SetupView />}
        {view === 'GAME' && <GameView />}
        {view === 'RESULTS' && <ResultsView />}
        {view === 'INSTRUCTIONS' && <InstructionsView />}
        {view === 'LEADERBOARD' && <LeaderboardView />}
        {view === 'TEACHER' && <TeacherView />}
      </main>
    </div>
  )
}
