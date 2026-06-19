'use client'

import { useGame } from '@/lib/store'
import { useTheme } from 'next-themes'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hand, MousePointer2, Volume2, VolumeX, Clock, Sun, Moon, Monitor, Settings as SettingsIcon, TrendingUp } from 'lucide-react'
import { sounds } from '@/lib/sounds'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const handEnabled = useGame((s) => s.handEnabled)
  const setHandEnabled = useGame((s) => s.setHandEnabled)
  const soundEnabled = useGame((s) => s.soundEnabled)
  const setSoundEnabled = useGame((s) => s.setSoundEnabled)
  const timePerQuestion = useGame((s) => s.timePerQuestion)
  const setTimePerQuestion = useGame((s) => s.setTimePerQuestion)
  const adaptiveDifficulty = useGame((s) => s.adaptiveDifficulty)
  const setAdaptiveDifficulty = useGame((s) => s.setAdaptiveDifficulty)

  const { theme, setTheme } = useTheme()

  const themeOptions = [
    { value: 'light', label: 'Sáng', icon: <Sun className="w-4 h-4" /> },
    { value: 'dark', label: 'Tối', icon: <Moon className="w-4 h-4" /> },
    { value: 'system', label: 'Hệ thống', icon: <Monitor className="w-4 h-4" /> },
  ] as const

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" /> Cài đặt
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Theme */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Giao diện</Label>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { sounds.click(); setTheme(opt.value) }}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                    theme === opt.value
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  {opt.icon}
                  <span className="text-xs font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between p-3 rounded-xl border bg-card">
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-500" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
              <div>
                <div className="text-sm font-medium">Âm thanh hiệu ứng</div>
                <div className="text-xs text-muted-foreground">Đúng/sai, kẹp thẻ, đếm giờ...</div>
              </div>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          {/* Hand tracking */}
          <div className="flex items-center justify-between p-3 rounded-xl border bg-card">
            <div className="flex items-center gap-2">
              {handEnabled ? <Hand className="w-5 h-5 text-emerald-500" /> : <MousePointer2 className="w-5 h-5 text-muted-foreground" />}
              <div>
                <div className="text-sm font-medium">Chơi bằng tay (AR)</div>
                <div className="text-xs text-muted-foreground">Dùng webcam + theo dõi tay</div>
              </div>
            </div>
            <Switch checked={handEnabled} onCheckedChange={setHandEnabled} />
          </div>

          {/* Adaptive difficulty */}
          <div className="flex items-center justify-between p-3 rounded-xl border bg-card">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-sm font-medium">Độ khó tăng dần</div>
                <div className="text-xs text-muted-foreground">Câu Dễ → Trung bình → Khó</div>
              </div>
            </div>
            <Switch checked={adaptiveDifficulty} onCheckedChange={setAdaptiveDifficulty} />
          </div>

          {/* Timer */}
          <div className="space-y-2 p-3 rounded-xl border bg-card">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <Clock className="w-4 h-4" /> Thời gian mỗi câu
              </Label>
              <Badge variant="secondary">{timePerQuestion}s</Badge>
            </div>
            <Slider
              value={[timePerQuestion]}
              onValueChange={(v) => setTimePerQuestion(v[0])}
              min={10}
              max={60}
              step={5}
            />
            <p className="text-xs text-muted-foreground">
              Câu ghép cặp/sắp xếp sẽ tự ×1.5. Mặc định 30s.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={() => { sounds.click(); onOpenChange(false) }}>Xong</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
