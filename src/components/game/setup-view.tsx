'use client'

import { useEffect, useRef, useState } from 'react'
import { useGame } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Hand, MousePointer2, Plus, Trash2, Users, Volume2, VolumeX, Clock } from 'lucide-react'
import { PLAYER_COLORS, PLAYER_AVATARS, type Category, type Difficulty, type Player } from '@/lib/types'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import AvatarPicker from '@/components/game/avatar-picker'
import { sounds } from '@/lib/sounds'

export default function SetupView() {
  const setView = useGame((s) => s.setView)
  const setPlayers = useGame((s) => s.setPlayers)
  const setQuestions = useGame((s) => s.setQuestions)
  const categoryId = useGame((s) => s.categoryId)
  const setCategory = useGame((s) => s.setCategory)
  const difficulty = useGame((s) => s.difficulty)
  const setDifficulty = useGame((s) => s.setDifficulty)
  const questionsPerRound = useGame((s) => s.questionsPerRound)
  const setQuestionsPerRound = useGame((s) => s.setQuestionsPerRound)
  const timePerQuestion = useGame((s) => s.timePerQuestion)
  const setTimePerQuestion = useGame((s) => s.setTimePerQuestion)
  const handEnabled = useGame((s) => s.handEnabled)
  const setHandEnabled = useGame((s) => s.setHandEnabled)
  const soundEnabled = useGame((s) => s.soundEnabled)
  const setSoundEnabled = useGame((s) => s.setSoundEnabled)
  const startGame = useGame((s) => s.startGame)

  const [categories, setCategories] = useState<Category[]>([])
  const [players, setLocalPlayers] = useState<Player[]>([
    { id: 1, name: 'Người chơi 1', color: PLAYER_COLORS[0], score: 0, avatar: PLAYER_AVATARS[0] },
    { id: 2, name: 'Người chơi 2', color: PLAYER_COLORS[1], score: 0, avatar: PLAYER_AVATARS[1] },
  ])
  const [availableCount, setAvailableCount] = useState(0)
  const reqIdRef = useRef(0)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []))
      .catch(() => toast.error('Không tải được danh sách chủ đề'))
  }, [])

  useEffect(() => {
    const id = ++reqIdRef.current
    const params = new URLSearchParams()
    if (categoryId !== 'all') params.set('categoryId', categoryId)
    if (difficulty !== 'all') params.set('difficulty', difficulty)
    fetch(`/api/questions?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        if (id !== reqIdRef.current) return
        setAvailableCount(d.questions?.length || 0)
      })
      .catch(() => {
        if (id !== reqIdRef.current) return
        setAvailableCount(0)
      })
  }, [categoryId, difficulty])

  const addPlayer = () => {
    if (players.length >= 4) {
      toast.warning('Tối đa 4 người chơi')
      return
    }
    const idx = players.length
    setLocalPlayers([
      ...players,
      { id: idx + 1, name: `Người chơi ${idx + 1}`, color: PLAYER_COLORS[idx], score: 0, avatar: PLAYER_AVATARS[idx] },
    ])
  }

  const removePlayer = (id: number) => {
    if (players.length <= 1) {
      toast.warning('Cần ít nhất 1 người chơi')
      return
    }
    setLocalPlayers(players.filter((p) => p.id !== id))
  }

  const updatePlayerName = (id: number, name: string) => {
    setLocalPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  const updatePlayerAvatar = (id: number, avatar: string) => {
    sounds.click()
    setLocalPlayers(players.map((p) => (p.id === id ? { ...p, avatar } : p)))
  }

  const handleStart = () => {
    if (availableCount === 0) {
      toast.error('Không có câu hỏi phù hợp. Hãy chọn lại chủ đề/độ khó hoặc thêm câu hỏi.')
      return
    }
    const finalCount = Math.min(questionsPerRound, availableCount)
    const params = new URLSearchParams()
    if (categoryId !== 'all') params.set('categoryId', categoryId)
    if (difficulty !== 'all') params.set('difficulty', difficulty)
    fetch(`/api/questions?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        const qs = (d.questions || []).slice(0, finalCount)
        setPlayers(players.map((p) => ({ ...p, score: 0 })))
        setQuestions(qs)
        startGame()
      })
      .catch(() => toast.error('Không tải được câu hỏi'))
  }

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView('MENU')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">Thiết lập trò chơi</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Players config */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" /> Người chơi
              <Badge variant="secondary">{players.length}/4</Badge>
            </CardTitle>
            <Button size="sm" variant="outline" onClick={addPlayer} disabled={players.length >= 4}>
              <Plus className="w-4 h-4 mr-1" /> Thêm
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {players.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:shadow-md transition-shadow"
              >
                <AvatarPicker
                  value={p.avatar}
                  color={p.color}
                  onChange={(a) => updatePlayerAvatar(p.id, a)}
                />
                <Input
                  value={p.name}
                  onChange={(e) => updatePlayerName(p.id, e.target.value)}
                  className="flex-1"
                  maxLength={20}
                />
                <Badge style={{ backgroundColor: p.color, color: 'white' }}>P{p.id}</Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removePlayer(p.id)}
                  className="text-muted-foreground hover:text-destructive"
                  disabled={players.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
            <p className="text-xs text-muted-foreground">
              Mỗi người chơi lần lượt trả lời. Đáp án đúng được điểm. Đáp án sai mất lượt.
            </p>
          </CardContent>
        </Card>

        {/* Game options */}
        <Card>
          <CardHeader>
            <CardTitle>Tùy chỉnh câu hỏi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Chủ đề</Label>
              <Select value={categoryId} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🌐 Tất cả chủ đề</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c._count?.questions || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Độ khó</Label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty | 'all')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">⚡ Tất cả độ khó</SelectItem>
                  <SelectItem value="EASY">🟢 Dễ</SelectItem>
                  <SelectItem value="MEDIUM">🟡 Trung bình</SelectItem>
                  <SelectItem value="HARD">🔴 Khó</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Số câu mỗi lượt</Label>
                <Badge variant="secondary">{questionsPerRound} câu</Badge>
              </div>
              <Slider
                value={[questionsPerRound]}
                onValueChange={(v) => setQuestionsPerRound(v[0])}
                min={3}
                max={15}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                {`Có ${availableCount} câu hỏi phù hợp sẵn có.`}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Thời gian mỗi câu</Label>
                <Badge variant="secondary">{timePerQuestion}s / câu</Badge>
              </div>
              <Slider
                value={[timePerQuestion]}
                onValueChange={(v) => setTimePerQuestion(v[0])}
                min={10}
                max={60}
                step={5}
              />
              <p className="text-xs text-muted-foreground">
                Câu ghép cặp / sắp xếp sẽ tự ×1.5 thời gian. Mặc định 30s.
              </p>
            </div>

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
            {!handEnabled && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Đang tắt AR — bạn sẽ dùng chuột/touch để kéo-thả.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          size="lg"
          onClick={handleStart}
          disabled={availableCount === 0}
          className="px-8"
        >
          Bắt đầu <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
