'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Play, ArrowLeft, Gamepad2, Award, Zap, Camera, Users } from 'lucide-react'

type GameInfo = {
  id: string
  title: string
  subject: string
  desc: string
  features: string[]
  icon: any
  path: string
  requiresCamera: boolean
  players: string
  accentColor: string
  bgGrad: string
}

const GAMES: GameInfo[] = [
  {
    id: 'ar-knowledge',
    title: 'Vũ Trụ Tri Thức AR',
    subject: 'Toán học AR',
    desc: 'Trò chơi tương tác thực tế tăng cường. Sử dụng camera và cử chỉ bàn tay (Hand Pinch) để tóm lấy các quả cầu đáp án trôi nổi trong không gian.',
    features: ['Nhận diện cử chỉ AI', 'Tương tác 3D Realtime', 'Hỗ trợ bảng vàng kỷ lục'],
    icon: Camera,
    path: '/games/ar-knowledge-universe/index.html',
    requiresCamera: true,
    players: 'Chơi đơn',
    accentColor: 'from-[#00f2ff] to-[#006e75]',
    bgGrad: 'rgba(0, 242, 255, 0.05)'
  },
  {
    id: 'handquiz-ar',
    title: 'HandQuiz AR',
    subject: 'Trắc nghiệm & Tương tác AR',
    desc: 'Trò chơi trắc nghiệm tương tác thực tế tăng cường bằng cử chỉ tay. Hỗ trợ tối đa 4 người chơi cùng lúc, có công cụ biên soạn câu hỏi cho giáo viên.',
    features: ['Camera cử chỉ bàn tay', 'Chế độ 1 - 4 người chơi', 'Quản lý câu hỏi & Thống kê'],
    icon: Camera,
    path: '/games/handquiz/index.html',
    requiresCamera: true,
    players: '1 - 4 Người chơi',
    accentColor: 'from-[#10b981] to-[#047857]',
    bgGrad: 'rgba(16, 185, 129, 0.05)'
  },
  {
    id: 'energy-match',
    title: 'Sóng Năng Lượng',
    subject: 'Vật lý 11',
    desc: 'Thử thách ghép cặp đấu đối kháng trực tiếp giúp học sinh ghi nhớ sâu sắc các công thức Dao động điều hòa và các khái niệm sóng cơ bản.',
    features: ['Thi đấu đối kháng 1-4 đội', 'Hệ thống tính điểm trực quan', 'Ghi danh kỷ lục thời gian'],
    icon: Users,
    path: '/games/energy-match/index.html',
    requiresCamera: false,
    players: '1 - 4 Đội chơi',
    accentColor: 'from-[#ff007f] to-[#7f003f]',
    bgGrad: 'rgba(255, 0, 127, 0.05)'
  }
]

export default function GamePage() {
  const [activeGame, setActiveGame] = useState<GameInfo | null>(null)

  return (
    <div className="min-h-screen bg-[#020813] text-white flex flex-col font-sans selection:bg-deep-teal selection:text-white">
      {activeGame === null ? (
        /* ================= GAME PORTAL MAIN MENU ================= */
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">
          {/* Neon background decorations */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-deep-teal/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#ff007f]/5 blur-[120px] pointer-events-none" />

          <div className="w-full max-w-5xl z-10 space-y-12">
            {/* Header Lockup */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-ash text-xs font-mono uppercase tracking-[0.2em]">
                <Gamepad2 className="w-3.5 h-3.5 text-deep-teal" />
                Hệ sinh thái game tương tác
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-deep-teal bg-clip-text text-transparent">
                CỔNG TRÒ CHƠI HỌC TẬP AR & ĐỐI KHÁNG
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">
                Tích hợp các học liệu trò chơi hóa chuẩn GEMS giúp học sinh tiếp thu kiến thức một cách tự nhiên qua trải nghiệm tương tác 3D và thi đấu đội nhóm.
              </p>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {GAMES.map((game) => {
                const IconComponent = game.icon
                return (
                  <div
                    key={game.id}
                    className="group relative bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1"
                    style={{
                      backgroundImage: `radial-gradient(circle at top right, ${game.bgGrad}, transparent 60%)`
                    }}
                  >
                    <div className="space-y-6">
                      {/* Badge / Type */}
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-semibold text-gray-300">
                          {game.subject}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {game.players}
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                          <IconComponent className="w-6 h-6 text-deep-teal group-hover:scale-110 transition-transform duration-300" />
                          {game.title}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {game.desc}
                        </p>
                      </div>

                      {/* Feature Bullet points */}
                      <ul className="space-y-2 pt-2">
                        {game.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                            <Zap className="w-3.5 h-3.5 text-deep-teal shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Launch CTA */}
                    <div className="pt-8 mt-auto">
                      <button
                        onClick={() => setActiveGame(game)}
                        className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${game.accentColor} text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-deep-teal/10 hover:shadow-deep-teal/20 transition-all active:scale-98 cursor-pointer`}
                      >
                        <Play className="w-4 h-4 fill-current" />
                        BẮT ĐẦU CHƠI
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Back to main portal link */}
            <div className="text-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Quay lại Trang chủ Đòn Bẩy AI
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* ================= FULLSCREEN GAME CONTAINER (IFRAME) ================= */
        <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col w-screen h-screen">
          {/* Floating HUD Controller */}
          <div className="absolute top-6 left-6 z-[110] flex items-center gap-4">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-black/85 text-white text-sm font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Thoát Game
            </button>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/5 bg-black/75 text-gray-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {activeGame.title} · {activeGame.players}
            </div>
          </div>

          {/* Fullscreen Frame */}
          <iframe
            src={activeGame.path}
            className="w-full h-full border-0 bg-black"
            allow="camera; microphone; autoplay; encrypted-media;"
          />
        </div>
      )}
    </div>
  )
}
