'use client'

import { useGame } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Hand, Trophy, MousePointer2, Grab, Move, CheckCircle2, Zap } from 'lucide-react'

export default function InstructionsView() {
  const setView = useGame((s) => s.setView)

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView('MENU')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">Hướng dẫn chơi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="md:col-span-2 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Hand className="w-6 h-6 text-emerald-500" /> Cách chơi bằng tay (AR)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Step n={1} icon={<Move className="w-5 h-5" />} title="Di chuyển tay" desc="Đưa tay vào webcam (cách 30-50cm). Ngón trỏ là con trỏ — vòng tròn màu theo dõi tay." />
              <Step n={2} icon={<Grab className="w-5 h-5" />} title="Kẹp để chọn" desc="Chập ngón cái và ngón trỏ lại gần nhau để kẹp thẻ. Hiện ✊ + chữ KẸP khi đã kẹp." />
              <Step n={3} icon={<CheckCircle2 className="w-5 h-5" />} title="Thả vào ô" desc="Kéo thẻ vào ô đáp án (có vùng rộng ~35px quanh ô) rồi mở ngón tay ra." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MousePointer2 className="w-5 h-5 text-amber-500" /> Chế độ chuột/touch
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nếu không có webcam hoặc không muốn dùng tay, bạn có thể chơi bằng chuột hoặc
              cảm ứng: nhấn giữ vào thẻ đáp án, kéo vào ô rồi thả ra. Chế độ này luôn khả dụng
              dự phòng để đảm bảo không bị lỗi.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-cyan-500" /> Luật điểm
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Trắc nghiệm đúng: <span className="text-emerald-600 font-semibold">+10 điểm</span> (+thưởng thời gian)</li>
              <li>• Ghép cặp: <span className="text-emerald-600 font-semibold">+4 điểm</span> / cặp đúng</li>
              <li>• Sắp xếp: <span className="text-emerald-600 font-semibold">+3 điểm</span> / vị trí đúng, +8 nếu hết</li>
              <li>• Mỗi người chơi lần lượt trả lời</li>
              <li>• Hết giờ = 0 điểm, chuyển lượt</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-6">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Mẹo chơi
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Giữ tay cách camera ~30-50cm, đủ sáng, nền đơn giản. Khi vòng tròn màu ở ngón tay
              thu nhỏ (✊) nghĩa là đang kẹp. Đưa thẻ vào ô đáp án cho đến khi ô sáng lên rồi mở tay ra.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-8">
        <Button size="lg" onClick={() => setView('SETUP')}>
          <Zap className="w-5 h-5 mr-2" /> Bắt đầu chơi
        </Button>
      </div>
    </div>
  )
}

function Step({ n, icon, title, desc }: { n: number; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl bg-background/60">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">{n}</div>
        <div className="text-emerald-600">{icon}</div>
      </div>
      <div className="font-semibold text-sm">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </div>
  )
}
