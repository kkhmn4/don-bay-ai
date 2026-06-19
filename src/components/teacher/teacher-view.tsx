'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useGame } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  HoverCard, HoverCardContent, HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  ArrowLeft, Plus, Trash2, Pencil, BookOpen, FlaskConical, Globe, Landmark, Languages, Sparkles, Calculator, Save, X, Download, Upload, History, Search, Music, Trophy as TrophyIcon, Copy,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Category, Difficulty, Question, QuestionType } from '@/lib/types'
import MatchHistory from './match-history'
import StatsDashboard from './stats-dashboard'
import SampleBundles from './sample-bundles'

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-4 h-4" />,
  Calculator: <Calculator className="w-4 h-4" />,
  FlaskConical: <FlaskConical className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Landmark: <Landmark className="w-4 h-4" />,
  Languages: <Languages className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Music: <Music className="w-4 h-4" />,
  Trophy: <TrophyIcon className="w-4 h-4" />,
}
const ICON_OPTIONS = ['BookOpen', 'Calculator', 'FlaskConical', 'Globe', 'Landmark', 'Languages', 'Sparkles', 'Music', 'Trophy']
const COLOR_OPTIONS = ['#10b981', '#f59e0b', '#06b6d4', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316']

interface QuestionForm {
  id?: string
  categoryId: string
  type: QuestionType
  prompt: string
  quizOptions: string[]
  quizCorrect: number
  matchPairs: { left: string; right: string }[]
  sortItems: string[]
  difficulty: Difficulty
}

const emptyForm = (categoryId: string): QuestionForm => ({
  categoryId,
  type: 'QUIZ',
  prompt: '',
  quizOptions: ['', '', '', ''],
  quizCorrect: 0,
  matchPairs: [
    { left: '', right: '' },
    { left: '', right: '' },
    { left: '', right: '' },
  ],
  sortItems: ['', '', '', ''],
  difficulty: 'EASY',
})

export default function TeacherView() {
  const setView = useGame((s) => s.setView)
  const [categories, setCategories] = useState<Category[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [filterCat, setFilterCat] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<QuestionForm | null>(null)
  const [saving, setSaving] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatColor, setNewCatColor] = useState(COLOR_OPTIONS[0])
  const [newCatIcon, setNewCatIcon] = useState('BookOpen')
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [importing, setImporting] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkDeleting, setBulkDeleting] = useState(false)

  const loadCategories = useCallback(async () => {
    const r = await fetch('/api/categories')
    const d = await r.json()
    setCategories(d.categories || [])
  }, [])

  const loadQuestions = useCallback(async () => {
    const params = new URLSearchParams()
    if (filterCat !== 'all') params.set('categoryId', filterCat)
    const r = await fetch(`/api/questions?${params.toString()}`)
    const d = await r.json()
    setQuestions(d.questions || [])
  }, [filterCat])

  useEffect(() => { loadCategories() }, [loadCategories])
  useEffect(() => { loadQuestions() }, [loadQuestions])

  const openNewForm = () => {
    const defaultCat = categories[0]?.id || ''
    setForm(emptyForm(defaultCat))
    setShowForm(true)
  }

  const openEditForm = (q: Question) => {
    const options = JSON.parse(q.options)
    const answer = JSON.parse(q.answer)
    if (q.type === 'QUIZ') {
      setForm({
        id: q.id, categoryId: q.categoryId, type: 'QUIZ', prompt: q.prompt,
        quizOptions: options, quizCorrect: Number(answer), matchPairs: [], sortItems: [], difficulty: q.difficulty,
      })
    } else if (q.type === 'MATCH') {
      setForm({
        id: q.id, categoryId: q.categoryId, type: 'MATCH', prompt: q.prompt,
        quizOptions: ['', '', '', ''], quizCorrect: 0,
        matchPairs: options.map((o: any) => ({ left: o.left, right: o.right })),
        sortItems: [], difficulty: q.difficulty,
      })
    } else {
      setForm({
        id: q.id, categoryId: q.categoryId, type: 'SORT', prompt: q.prompt,
        quizOptions: ['', '', '', ''], quizCorrect: 0, matchPairs: [],
        sortItems: options, difficulty: q.difficulty,
      })
    }
    setShowForm(true)
  }

  const saveQuestion = async () => {
    if (!form) return
    if (!form.prompt.trim()) { toast.error('Vui lòng nhập nội dung câu hỏi'); return }
    if (!form.categoryId) { toast.error('Vui lòng chọn chủ đề'); return }

    let options: any, answer: any
    if (form.type === 'QUIZ') {
      if (form.quizOptions.some((o) => !o.trim())) { toast.error('Vui lòng điền đủ 4 đáp án'); return }
      options = form.quizOptions
      answer = String(form.quizCorrect)
    } else if (form.type === 'MATCH') {
      if (form.matchPairs.some((p) => !p.left.trim() || !p.right.trim())) { toast.error('Vui lòng điền đủ các cặp ghép'); return }
      options = form.matchPairs
      answer = JSON.stringify(form.matchPairs.map((_, i) => i))
    } else {
      if (form.sortItems.some((s) => !s.trim())) { toast.error('Vui lòng điền đủ các phần tử'); return }
      options = form.sortItems
      answer = JSON.stringify(form.sortItems.map((_, i) => i))
    }

    setSaving(true)
    try {
      const body = {
        categoryId: form.categoryId, type: form.type, prompt: form.prompt,
        options, answer, difficulty: form.difficulty,
      }
      const url = form.id ? `/api/questions/${form.id}` : '/api/questions'
      const method = form.id ? 'PUT' : 'POST'
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Lỗi')
      toast.success(form.id ? 'Đã cập nhật câu hỏi' : 'Đã thêm câu hỏi mới')
      setShowForm(false)
      setForm(null)
      await loadQuestions()
      await loadCategories()
    } catch (e: any) {
      toast.error(e.message || 'Không lưu được')
    } finally {
      setSaving(false)
    }
  }

  const deleteQuestion = async (id: string) => {
    if (!confirm('Xóa câu hỏi này?')) return
    const r = await fetch(`/api/questions/${id}`, { method: 'DELETE' })
    if (r.ok) { toast.success('Đã xóa'); loadQuestions(); loadCategories() }
    else toast.error('Không xóa được')
  }

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Xóa ${selectedIds.size} câu hỏi đã chọn?`)) return
    setBulkDeleting(true)
    let ok = 0
    for (const id of selectedIds) {
      const r = await fetch(`/api/questions/${id}`, { method: 'DELETE' })
      if (r.ok) ok++
    }
    setBulkDeleting(false)
    setSelectedIds(new Set())
    toast.success(`Đã xóa ${ok} câu hỏi`)
    await loadQuestions()
    await loadCategories()
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredQuestions.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredQuestions.map((q) => q.id)))
    }
  }

  const duplicateQuestion = async (q: Question) => {
    try {
      const r = await fetch('/api/questions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: q.categoryId, type: q.type,
          prompt: q.prompt + ' (bản sao)', options: q.options, answer: q.answer, difficulty: q.difficulty,
        }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Lỗi')
      toast.success('Đã nhân bản câu hỏi')
      await loadQuestions()
      await loadCategories()
    } catch (e: any) {
      toast.error(e.message || 'Không nhân bản được')
    }
  }

  const addCategory = async () => {
    if (!newCatName.trim()) { toast.error('Nhập tên chủ đề'); return }
    const r = await fetch('/api/categories', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCatName, color: newCatColor, icon: newCatIcon }),
    })
    const d = await r.json()
    if (!r.ok) { toast.error(d.error || 'Lỗi'); return }
    toast.success('Đã thêm chủ đề')
    setNewCatName('')
    await loadCategories()
  }

  const deleteCategory = async (id: string, count: number) => {
    if (count > 0) { toast.error('Không thể xóa chủ đề đang có câu hỏi'); return }
    if (!confirm('Xóa chủ đề này?')) return
    const r = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    if (r.ok) { toast.success('Đã xóa'); loadCategories() } else toast.error('Lỗi')
  }

  const handleExport = async () => {
    try {
      const r = await fetch(`/api/questions/export${filterCat !== 'all' ? `?categoryId=${filterCat}` : ''}`)
      const data = await r.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `handquiz-questions-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      toast.success(`Đã xuất ${data.questions.length} câu hỏi`)
    } catch {
      toast.error('Không xuất được')
    }
  }

  const handleImport = async () => {
    if (!importText.trim()) { toast.error('Dán nội dung JSON vào ô'); return }
    setImporting(true)
    try {
      const parsed = JSON.parse(importText)
      const r = await fetch('/api/questions/import', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Lỗi')
      toast.success(`Đã nhập ${d.created} câu hỏi${d.skipped ? `, bỏ qua ${d.skipped}` : ''}`)
      setShowImport(false)
      setImportText('')
      await loadQuestions()
      await loadCategories()
    } catch (e: any) {
      toast.error('JSON không hợp lệ: ' + (e?.message || ''))
    } finally {
      setImporting(false)
    }
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { setImportText(String(reader.result || '')); setShowImport(true) }
    reader.readAsText(file)
    e.target.value = ''
  }

  const getCat = (id: string) => categories.find((c) => c.id === id)

  // Client-side keyword search on top of the category-filtered list
  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return questions
    return questions.filter((item) => {
      const inPrompt = item.prompt.toLowerCase().includes(q)
      let inOptions = false
      try {
        const opts = JSON.parse(item.options)
        if (Array.isArray(opts)) {
          inOptions = opts.some((o: any) => {
            const text = typeof o === 'string' ? o : (o?.left || '') + ' ' + (o?.right || '')
            return String(text).toLowerCase().includes(q)
          })
        }
      } catch {}
      return inPrompt || inOptions
    })
  }, [questions, searchQuery])

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setView('MENU')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">Khu giáo viên</h1>
        <Badge variant="secondary" className="ml-auto">{questions.length} câu hỏi · {categories.length} chủ đề</Badge>
      </div>

      <Tabs defaultValue="questions">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="questions">📚 Câu hỏi</TabsTrigger>
          <TabsTrigger value="categories">🗂️ Chủ đề</TabsTrigger>
          <TabsTrigger value="samples">✨ Bộ mẫu</TabsTrigger>
          <TabsTrigger value="stats">📊 Thống kê</TabsTrigger>
          <TabsTrigger value="history">🏆 Lịch sử</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={filterCat} onValueChange={setFilterCat}>
              <SelectTrigger className="w-48 sm:w-56"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chủ đề</SelectItem>
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="relative flex-1 min-w-40">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm câu hỏi..."
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1" /> Xuất</Button>
              <label>
                <input type="file" accept=".json" className="hidden" onChange={handleFileImport} />
                <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  <Upload className="w-4 h-4 mr-1" /> Nhập
                </span>
              </label>
              <Button onClick={openNewForm}>
                <Plus className="w-4 h-4 mr-1" /> Thêm
              </Button>
            </div>
          </div>

          {searchQuery && (
            <p className="text-sm text-muted-foreground">
              {filteredQuestions.length} kết quả cho "{searchQuery}"
            </p>
          )}

          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Đã chọn {selectedIds.size} câu hỏi
              </span>
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setSelectedIds(new Set())}>
                  Bỏ chọn
                </Button>
                <Button size="sm" variant="destructive" onClick={bulkDelete} disabled={bulkDeleting}>
                  <Trash2 className="w-4 h-4 mr-1" /> {bulkDeleting ? 'Đang xóa...' : `Xóa ${selectedIds.size}`}
                </Button>
              </div>
            </div>
          )}

          {filteredQuestions.length > 0 && selectedIds.size === 0 && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="select-all"
                checked={selectedIds.size === filteredQuestions.length && filteredQuestions.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <Label htmlFor="select-all" className="text-xs text-muted-foreground cursor-pointer">
                Chọn tất cả ({filteredQuestions.length})
              </Label>
            </div>
          )}

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-2">
              {filteredQuestions.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  {searchQuery ? `Không tìm thấy câu hỏi nào cho "${searchQuery}"` : 'Chưa có câu hỏi nào. Hãy thêm câu hỏi đầu tiên!'}
                </div>
              )}
              {filteredQuestions.map((q) => {
                const cat = getCat(q.categoryId)
                return (
                  <Card key={q.id} className={`hover:shadow-md transition-shadow ${selectedIds.has(q.id) ? 'ring-2 ring-emerald-500' : ''}`}>
                    <CardContent className="p-4 flex items-start gap-3">
                      <Checkbox
                        checked={selectedIds.has(q.id)}
                        onCheckedChange={() => toggleSelect(q.id)}
                        className="mt-1 shrink-0"
                        aria-label="Chọn câu hỏi"
                      />
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: (cat?.color || '#888') + '22', color: cat?.color }}>
                        {ICON_MAP[cat?.icon || 'BookOpen']}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <Badge variant="outline" style={{ borderColor: cat?.color, color: cat?.color }}>{cat?.name}</Badge>
                          <Badge variant="secondary">{q.type === 'QUIZ' ? 'Trắc nghiệm' : q.type === 'MATCH' ? 'Ghép cặp' : 'Sắp xếp'}</Badge>
                          <Badge variant="outline" className={
                            q.difficulty === 'EASY' ? 'border-emerald-500 text-emerald-600' :
                            q.difficulty === 'MEDIUM' ? 'border-amber-500 text-amber-600' :
                            'border-red-500 text-red-600'
                          }>
                            {q.difficulty === 'EASY' ? 'Dễ' : q.difficulty === 'MEDIUM' ? 'TB' : 'Khó'}
                          </Badge>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <p className="text-sm font-medium line-clamp-2 cursor-help">{q.prompt}</p>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80" side="right">
                            <QuestionPreview q={q} cat={cat} />
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button size="icon" variant="ghost" onClick={() => duplicateQuestion(q)} title="Nhân bản"><Copy className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => openEditForm(q)} title="Sửa"><Pencil className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteQuestion(q.id)} className="text-destructive" title="Xóa"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Thêm chủ đề mới</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-48 space-y-1.5">
                <Label className="text-xs">Tên chủ đề</Label>
                <Input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="VD: Âm nhạc" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Màu sắc</Label>
                <div className="flex gap-1.5">
                  {COLOR_OPTIONS.map((c) => (
                    <button key={c} onClick={() => setNewCatColor(c)}
                      className={`w-8 h-8 rounded-full border-2 ${newCatColor === c ? 'border-foreground scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Biểu tượng</Label>
                <Select value={newCatIcon} onValueChange={setNewCatIcon}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((i) => <SelectItem key={i} value={i}>{ICON_MAP[i]}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addCategory}><Plus className="w-4 h-4 mr-1" /> Thêm</Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: c.color + '22', color: c.color }}>
                    {ICON_MAP[c.icon] || <BookOpen className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c._count?.questions || 0} câu hỏi</div>
                  </div>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteCategory(c.id, c._count?.questions || 0)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="samples">
          <SampleBundles onImported={() => { loadCategories(); loadQuestions() }} />
        </TabsContent>

        <TabsContent value="stats">
          <StatsDashboard />
        </TabsContent>

        <TabsContent value="history">
          <MatchHistory onChanged={() => { loadCategories(); loadQuestions() }} />
        </TabsContent>
      </Tabs>

      {/* Question form dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form?.id ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới'}</DialogTitle>
          </DialogHeader>
          {form && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Chủ đề</Label>
                  <Select value={form.categoryId} onValueChange={(v) => setForm({ ...form, categoryId: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Loại câu hỏi</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as QuestionType })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QUIZ">Trắc nghiệm (4 đáp án)</SelectItem>
                      <SelectItem value="MATCH">Ghép cặp</SelectItem>
                      <SelectItem value="SORT">Sắp xếp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Nội dung câu hỏi</Label>
                <Textarea value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} rows={2} placeholder="Nhập câu hỏi..." />
              </div>

              <div className="space-y-1.5">
                <Label>Độ khó</Label>
                <Select value={form.difficulty} onValueChange={(v) => setForm({ ...form, difficulty: v as Difficulty })}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EASY">Dễ</SelectItem>
                    <SelectItem value="MEDIUM">Trung bình</SelectItem>
                    <SelectItem value="HARD">Khó</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.type === 'QUIZ' && (
                <div className="space-y-2">
                  <Label>Đáp án (chọn đáp án đúng)</Label>
                  {form.quizOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button
                        onClick={() => setForm({ ...form, quizCorrect: i })}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                          form.quizCorrect === i ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border'
                        }`}>
                        {String.fromCharCode(65 + i)}
                      </button>
                      <Input value={opt} onChange={(e) => {
                        const arr = [...form.quizOptions]; arr[i] = e.target.value
                        setForm({ ...form, quizOptions: arr })
                      }} placeholder={`Đáp án ${String.fromCharCode(65 + i)}`} />
                    </div>
                  ))}
                </div>
              )}

              {form.type === 'MATCH' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Các cặp ghép (trái ↔ phải)</Label>
                    <Button size="sm" variant="outline" onClick={() => setForm({ ...form, matchPairs: [...form.matchPairs, { left: '', right: '' }] })}>
                      <Plus className="w-3 h-3 mr-1" /> Thêm cặp
                    </Button>
                  </div>
                  {form.matchPairs.map((pair, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input value={pair.left} onChange={(e) => {
                        const arr = [...form.matchPairs]; arr[i] = { ...arr[i], left: e.target.value }
                        setForm({ ...form, matchPairs: arr })
                      }} placeholder={`Thành phần ${i + 1}`} />
                      <span className="text-muted-foreground">↔</span>
                      <Input value={pair.right} onChange={(e) => {
                        const arr = [...form.matchPairs]; arr[i] = { ...arr[i], right: e.target.value }
                        setForm({ ...form, matchPairs: arr })
                      }} placeholder={`Định nghĩa ${i + 1}`} />
                      <Button size="icon" variant="ghost" className="text-destructive" disabled={form.matchPairs.length <= 2}
                        onClick={() => setForm({ ...form, matchPairs: form.matchPairs.filter((_, j) => j !== i) })}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {form.type === 'SORT' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Các phần tử (theo thứ tự đúng)</Label>
                    <Button size="sm" variant="outline" onClick={() => setForm({ ...form, sortItems: [...form.sortItems, ''] })}>
                      <Plus className="w-3 h-3 mr-1" /> Thêm
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Nhập các phần tử theo thứ tự ĐÚNG. Game sẽ xáo trộn cho người chơi sắp xếp lại.</p>
                  {form.sortItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-7 justify-center">{i + 1}</Badge>
                      <Input value={item} onChange={(e) => {
                        const arr = [...form.sortItems]; arr[i] = e.target.value
                        setForm({ ...form, sortItems: arr })
                      }} placeholder={`Phần tử ${i + 1}`} />
                      <Button size="icon" variant="ghost" className="text-destructive" disabled={form.sortItems.length <= 2}
                        onClick={() => setForm({ ...form, sortItems: form.sortItems.filter((_, j) => j !== i) })}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Hủy</Button>
            <Button onClick={saveQuestion} disabled={saving}><Save className="w-4 h-4 mr-1" />{saving ? 'Đang lưu...' : 'Lưu'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import dialog */}
      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nhập câu hỏi từ JSON</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Dán nội dung JSON (định dạng xuất từ HandQuiz AR) vào ô bên dưới. Chủ đề sẽ được tự động tạo nếu chưa có.
            </p>
            <Textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={12}
              className="font-mono text-xs"
              placeholder='{ "format": "handquiz-ar-v1", "questions": [ ... ] }'
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImport(false)}>Hủy</Button>
            <Button onClick={handleImport} disabled={importing}>
              <Upload className="w-4 h-4 mr-1" />{importing ? 'Đang nhập...' : 'Nhập'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function QuestionPreview({ q, cat }: { q: Question; cat?: Category }) {
  let options: any[] = []
  let answerText = ''
  try {
    options = JSON.parse(q.options)
    if (q.type === 'QUIZ') {
      const correctIdx = Number(JSON.parse(q.answer))
      answerText = options[correctIdx] || ''
    } else if (q.type === 'MATCH') {
      answerText = options.map((o: any) => `${o.left} → ${o.right}`).join(', ')
    } else {
      answerText = options.join(' → ')
    }
  } catch {}

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {cat && <Badge variant="outline" style={{ borderColor: cat.color, color: cat.color }}>{cat.name}</Badge>}
        <Badge variant="secondary">{q.type === 'QUIZ' ? 'Trắc nghiệm' : q.type === 'MATCH' ? 'Ghép cặp' : 'Sắp xếp'}</Badge>
      </div>
      <p className="text-sm font-semibold">{q.prompt}</p>
      {q.type === 'QUIZ' && (
        <div className="space-y-1">
          {options.map((opt: any, i: number) => {
            const correctIdx = (() => { try { return Number(JSON.parse(q.answer)) } catch { return -1 } })()
            return (
              <div key={i} className={`text-xs px-2 py-1 rounded ${i === correctIdx ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-medium' : 'bg-muted'}`}>
                {String.fromCharCode(65 + i)}. {opt} {i === correctIdx && '✓'}
              </div>
            )
          })}
        </div>
      )}
      {q.type !== 'QUIZ' && answerText && (
        <div className="text-xs px-2 py-1.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
          <span className="font-medium">Đáp án: </span>{answerText}
        </div>
      )}
    </div>
  )
}
