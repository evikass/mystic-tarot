"use client"

import { useState, useEffect, useCallback } from "react"
import { StarryBackground } from "@/components/starry-bg"
import { TarotCardView } from "@/components/tarot-card"
import { CardSVG, CardBack } from "@/lib/tarot-svg"
import {
  allTarotCards,
  drawCards,
  suitInfo,
  rankNames,
  type TarotCard,
} from "@/lib/tarot-data"
import {
  elementArchetypes,
  getElementCompatibility,
  analyzePsychologicalProfile,
  majorPsychologyMap,
} from "@/lib/tarot-psychology"
import {
  getHistory,
  saveReading,
  deleteReading,
  clearHistory,
  formatDate,
  type ReadingRecord,
} from "@/lib/tarot-storage"
import { initVKBridge, isVKEnvironment, vkShare } from "@/lib/vk-bridge"
import { successSteps, stepCategories, type SuccessStep } from "@/lib/success-steps-data"
import {
  getAllProgress,
  getStepProgress,
  toggleChecklistItem,
  toggleExercise,
  updateNotes,
  getOverallProgress,
  resetAllProgress,
  type StepProgress,
} from "@/lib/success-progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  Sparkles,
  Moon,
  Star,
  Sun,
  Heart,
  Brain,
  History,
  Layers,
  Crown,
  BookOpen,
  Send,
  Trash2,
  Eye,
  EyeOff,
  Compass,
  Zap,
  Target,
  CheckCircle2,
  Circle,
  RotateCcw,
  Trophy,
  Lightbulb,
  Pencil,
  BookMarked,
  Video,
  GraduationCap,
  PenLine,
} from "lucide-react"

type Section = "home" | "daily" | "readings" | "compatibility" | "psychology" | "history" | "success"

interface DrawnCard {
  card: TarotCard
  isReversed: boolean
  position?: string
}

export default function Home() {
  const [section, setSection] = useState<Section>("home")
  const { toast } = useToast()

  useEffect(() => {
    initVKBridge()
  }, [])

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Главная", icon: <Sparkles className="w-4 h-4"/> },
    { id: "daily", label: "Карта дня", icon: <Sun className="w-4 h-4"/> },
    { id: "readings", label: "Расклады", icon: <Layers className="w-4 h-4"/> },
    { id: "compatibility", label: "Совместимость", icon: <Heart className="w-4 h-4"/> },
    { id: "psychology", label: "Психология", icon: <Brain className="w-4 h-4"/> },
    { id: "success", label: "14 Шагов", icon: <Target className="w-4 h-4"/> },
    { id: "history", label: "История", icon: <History className="w-4 h-4"/> },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <StarryBackground/>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header navItems={navItems} section={section} setSection={setSection}/>
        <main className="flex-1 px-4 sm:px-6 pb-20 max-w-7xl mx-auto w-full">
          {section === "home" && <HomeSection onNavigate={setSection}/>}
          {section === "daily" && <DailyCardSection/>}
          {section === "readings" && <ReadingsSection/>}
          {section === "compatibility" && <CompatibilitySection/>}
          {section === "psychology" && <PsychologySection/>}
          {section === "success" && <SuccessStepsSection/>}
          {section === "history" && <HistorySection/>}
        </main>
        <Footer/>
      </div>
    </div>
  )
}

// ===================== HEADER =====================
function Header({
  navItems,
  section,
  setSection,
}: {
  navItems: { id: Section; label: string; icon: React.ReactNode }[]
  section: Section
  setSection: (s: Section) => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 glass-mystic border-b border-amber-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => setSection("home")}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7"/>
              <text x="20" y="26" fontSize="20" textAnchor="middle" fill="#fbbf24">✦</text>
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i / 8) * Math.PI * 2
                return (
                  <line
                    key={i}
                    x1={20 + Math.cos(a) * 18}
                    y1={20 + Math.sin(a) * 18}
                    x2={20 + Math.cos(a) * 22}
                    y2={20 + Math.sin(a) * 22}
                    stroke="#fbbf24"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                )
              })}
            </svg>
          </div>
          <div className="text-left">
            <div className="text-lg sm:text-xl font-bold text-gold-gradient tracking-wider" style={{ fontFamily: "var(--font-cinzel)" }}>
              MYSTIC TAROT
            </div>
            <div className="text-[10px] text-amber-200/60 -mt-1 tracking-widest uppercase">
              Мудрость арканов
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                section === item.id
                  ? "bg-amber-400/20 text-amber-100 border border-amber-400/40"
                  : "text-amber-200/70 hover:bg-amber-400/10 hover:text-amber-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-amber-200"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-amber-400/20 px-4 py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSection(item.id)
                setMobileOpen(false)
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                section === item.id
                  ? "bg-amber-400/20 text-amber-100 border border-amber-400/40"
                  : "text-amber-200/70 hover:bg-amber-400/10"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

// ===================== HOME =====================
function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const featuredCards = [0, 1, 8, 17, 18, 19].map(i => allTarotCards[i])

  return (
    <div className="py-8 sm:py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="section-divider mb-8">
          <span>Добро пожаловать</span>
        </div>
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-mystic-gradient inline-block"
          style={{
            fontFamily: "var(--font-cinzel)",
            lineHeight: 1.3,
            paddingTop: "0.2em",
            paddingBottom: "0.1em",
            letterSpacing: "0.02em",
          }}
        >
          Мистическое Таро
        </h1>
        <p className="text-lg sm:text-xl text-amber-100/80 max-w-2xl mx-auto mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
          Семьдесят восемь арканов древней мудрости
        </p>
        <p className="text-sm sm:text-base text-amber-200/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Откройте врата подсознания через карты Таро. Получите ответы на вопросы о любви,
          карьере, духовном пути. Загляните в архетипы своей души и найдите ключи к совместимости.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => onNavigate("daily")}
            className="btn-gold px-8 py-3 text-base"
          >
            <Sun className="w-5 h-5 mr-2"/>
            Карта дня
          </Button>
          <Button
            onClick={() => onNavigate("readings")}
            className="btn-mystic px-8 py-3 text-base"
          >
            <Layers className="w-5 h-5 mr-2"/>
            Сделать расклад
          </Button>
        </div>
      </section>

      {/* Featured cards carousel */}
      <section className="mb-20">
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {featuredCards.map((card, i) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="transition-all duration-500 cursor-pointer"
              style={{
                transform: hoveredCard === i ? "translateY(-12px) scale(1.05)" : "none",
                filter: hoveredCard === null || hoveredCard === i ? "none" : "brightness(0.6)",
              }}
            >
              <CardSVG card={card} width={120} height={192}/>
            </div>
          ))}
        </div>
      </section>

      {/* Sections grid */}
      <section>
        <div className="section-divider mb-10">
          <span>Разделы</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Sun className="w-7 h-7"/>}
            title="Карта дня"
            description="Ежедневная карта для фокуса, совета и настройки намерения. Получите энергию нового дня через мудрость арканов."
            onClick={() => onNavigate("daily")}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={<Layers className="w-7 h-7"/>}
            title="Расклады"
            description="Три карты (прошлое-настоящее-будущее), Кельтский крест (10 карт) и быстрый ответ Да/Нет на ваш вопрос."
            onClick={() => onNavigate("readings")}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={<Heart className="w-7 h-7"/>}
            title="Совместимость"
            description="Анализ совместимости двух людей через стихии и карты. Узнайте сильные стороны и точки роста вашего союза."
            onClick={() => onNavigate("compatibility")}
            accent="#f9a8d4"
          />
          <FeatureCard
            icon={<Brain className="w-7 h-7"/>}
            title="Психология"
            description="Архетипический анализ расклада. Какие силы души активированы, какие раны и дары проявляются, путь интеграции."
            onClick={() => onNavigate("psychology")}
            accent="#7dd3fc"
          />
          <FeatureCard
            icon={<History className="w-7 h-7"/>}
            title="История"
            description="Все ваши расклады сохраняются локально на устройстве. Возвращайтесь к ним, чтобы отследить динамику пути."
            onClick={() => onNavigate("history")}
            accent="#86efac"
          />
          <FeatureCard
            icon={<Target className="w-7 h-7"/>}
            title="14 Шагов Успеха"
            description="Полный курс трансформации по методологии Тойчи: теория, упражнения, книги, курсы и чек-листы с отслеживанием прогресса."
            onClick={() => onNavigate("success")}
            accent="#fbbf24"
          />
          <FeatureCard
            icon={<BookOpen className="w-7 h-7"/>}
            title="78 арканов"
            description="Полная база интерпретаций всех 22 старших и 56 младших арканов с прямыми и перевёрнутыми значениями."
            onClick={() => onNavigate("readings")}
            accent="#fde68a"
          />
        </div>
      </section>

      {/* Intro text */}
      <section className="mt-20 max-w-3xl mx-auto text-center">
        <div className="section-divider mb-10">
          <span>О Таро</span>
        </div>
        <p className="text-amber-100/80 text-base sm:text-lg leading-relaxed mb-6" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
          Таро — это не предсказание будущего, а зеркало души. Каждая карта — архетип,
          живущий в коллективном бессознательном. Когда вы тянете карту, вы активируете
          этот архетип внутри себя и получаете возможность увидеть то, что раньше было
          скрыто.
        </p>
        <p className="text-amber-100/80 text-base sm:text-lg leading-relaxed mb-6" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
          Старшие арканы (22 карты) описывают великий путь души от невинности Шута до
          целостности Мира. Младшие арканы (56 карт) показывают повседневные ритмы через
          четыре стихии — Огонь, Воду, Воздух и Землю.
        </p>
        <p className="text-amber-200/70 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>
          Это приложение создано как инструмент самопознания. Относитесь к нему как к
          разговору с мудрым собеседником — не как к оракулу, который решит за вас.
        </p>
      </section>

      {/* VK badge */}
      {isVKEnvironment() && (
        <section className="mt-16 max-w-md mx-auto">
          <Card className="glass-card border-amber-400/30">
            <CardContent className="pt-6 text-center">
              <Badge className="bg-blue-500/20 text-blue-200 border border-blue-400/40 mb-2">
                VK Mini App
              </Badge>
              <p className="text-amber-100/70 text-sm">
                Приложение работает в среде ВКонтакте. Поделитесь раскладом со друзьями!
              </p>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  onClick,
  accent,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  accent: string
}) {
  return (
    <button
      onClick={onClick}
      className="text-left glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group hover:border-amber-400/40"
      style={{ borderColor: `${accent}30` }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${accent}25`, color: accent, boxShadow: `0 0 20px ${accent}30` }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
        {title}
      </h3>
      <p className="text-amber-200/70 text-sm leading-relaxed">{description}</p>
    </button>
  )
}

// ===================== DAILY CARD =====================
function DailyCardSection() {
  const [drawnCard, setDrawnCard] = useState<DrawnCard | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const { toast } = useToast()
  const today = new Date().toLocaleDateString("ru-RU", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })

  const drawDailyCard = useCallback(() => {
    setIsDrawing(true)
    setRevealed(false)
    setDrawnCard(null)

    setTimeout(() => {
      const drawn = drawCards(1)[0]
      setDrawnCard({ card: drawn.card, isReversed: drawn.isReversed })
      setIsDrawing(false)
      // Авто-reveal через 1 секунду
      setTimeout(() => setRevealed(true), 1500)
      // Сохранение в историю
      saveReading({
        type: "daily",
        typeLabel: "Карта дня",
        cards: [{
          card: drawn.card,
          isReversed: drawn.isReversed,
          position: "Карта дня",
        }],
      })
      toast({
        title: "✦ Карта дня вытянута",
        description: `${drawn.card.name}${drawn.isReversed ? " (перевёрнута)" : ""}`,
      })
    }, 1800)
  }, [toast])

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6">
          <span>{today}</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-3 text-gold-gradient inline-block"
          style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}
        >
          Карта Дня
        </h2>
        <p className="text-amber-200/70 max-w-xl mx-auto">
          Одна карта — фокус, совет и энергия вашего сегодняшнего дня. Тяните утром
          или в любое время, когда нужна подсказка.
        </p>
      </div>

      {!drawnCard && !isDrawing && (
        <div className="flex flex-col items-center gap-8">
          {/* Стопка карт */}
          <div className="relative w-[200px] h-[320px]">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  transform: `translate(${i * 4}px, ${i * 4}px) rotate(${(i - 1.5) * 2}deg)`,
                  zIndex: 4 - i,
                }}
              >
                <CardBack width={200} height={320} className="rounded-xl shadow-2xl"/>
              </div>
            ))}
          </div>
          <Button onClick={drawDailyCard} className="btn-gold px-10 py-4 text-lg">
            <Sparkles className="w-5 h-5 mr-2"/>
            Вытянуть карту дня
          </Button>
        </div>
      )}

      {isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-[200px] h-[320px]">
            <div className="absolute inset-0 animate-pulse">
              <CardBack width={200} height={320} className="rounded-xl"/>
            </div>
          </div>
          <p className="text-amber-200/80 text-lg animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            Тасую колоду, концентрируясь на энергии дня...
          </p>
        </div>
      )}

      {drawnCard && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <TarotCardView
            card={drawnCard.card}
            isReversed={drawnCard.isReversed}
            revealed={revealed}
            onReveal={() => setRevealed(true)}
            width={240}
            height={384}
          />

          {revealed && (
            <div className="max-w-2xl w-full animate-fade-in">
              <Card className="glass-mystic border-amber-400/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge
                      className="border"
                      style={{
                        backgroundColor: `${drawnCard.card.accent}20`,
                        color: drawnCard.card.accent,
                        borderColor: `${drawnCard.card.accent}50`,
                      }}
                    >
                      {drawnCard.card.suit === "major"
                        ? `Старший аркан ${drawnCard.card.number}`
                        : `${suitInfo[drawnCard.card.suit].name} · ${suitInfo[drawnCard.card.suit].element}`}
                    </Badge>
                    {drawnCard.isReversed && (
                      <Badge variant="outline" className="text-rose-300 border-rose-400/40">
                        Перевёрнута
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl text-amber-100 mt-2">
                    {drawnCard.card.name}
                  </CardTitle>
                  <CardDescription className="text-amber-200/70">
                    {drawnCard.card.keyword}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-amber-200/80 mb-1 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5"/>
                      Основное значение
                    </h4>
                    <p className="text-amber-100/85 text-sm leading-relaxed">
                      {drawnCard.isReversed
                        ? drawnCard.card.reversed.summary
                        : drawnCard.card.upright.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="glass-card rounded-lg p-3">
                      <h5 className="text-xs font-semibold text-rose-200 mb-1 flex items-center gap-1">
                        <Heart className="w-3 h-3"/>
                        В любви
                      </h5>
                      <p className="text-xs text-amber-100/75 leading-relaxed">
                        {drawnCard.isReversed
                          ? drawnCard.card.reversed.love
                          : drawnCard.card.upright.love}
                      </p>
                    </div>
                    <div className="glass-card rounded-lg p-3">
                      <h5 className="text-xs font-semibold text-blue-200 mb-1 flex items-center gap-1">
                        <Crown className="w-3 h-3"/>
                        В работе
                      </h5>
                      <p className="text-xs text-amber-100/75 leading-relaxed">
                        {drawnCard.isReversed
                          ? drawnCard.card.reversed.career
                          : drawnCard.card.upright.career}
                      </p>
                    </div>
                  </div>

                  <div className="glass-card rounded-lg p-3 border-purple-400/20">
                    <h5 className="text-xs font-semibold text-purple-200 mb-1 flex items-center gap-1">
                      <Brain className="w-3 h-3"/>
                      Психологический аспект
                    </h5>
                    <p className="text-xs text-amber-100/75 leading-relaxed italic">
                      {drawnCard.isReversed
                        ? drawnCard.card.reversed.psychology
                        : drawnCard.card.upright.psychology}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        vkShare(`Моя карта дня — ${drawnCard.card.name}${drawnCard.isReversed ? " (перевёрнута)" : ""}: ${drawnCard.isReversed ? drawnCard.card.reversed.summary : drawnCard.card.upright.summary}`)
                      }}
                      className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
                    >
                      <Send className="w-3.5 h-3.5 mr-1"/>
                      Поделиться
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={drawDailyCard}
                      className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1"/>
                      Вытянуть заново
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===================== READINGS =====================
function ReadingsSection() {
  const [readingType, setReadingType] = useState<"three-card" | "celtic-cross" | "yes-no">("three-card")

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6">
          <span>Расклады Таро</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-3 text-gold-gradient inline-block"
          style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}
        >
          Глубокие расклады
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Выберите тип расклада в зависимости от глубины вопроса. Три карты — для быстрой
          диагностики, Кельтский крест — для глубокого анализа, Да/Нет — для конкретного ответа.
        </p>
      </div>

      <Tabs value={readingType} onValueChange={(v) => setReadingType(v as typeof readingType)}>
        <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8 bg-purple-950/40 border border-amber-400/20">
          <TabsTrigger value="three-card" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100">
            3 карты
          </TabsTrigger>
          <TabsTrigger value="celtic-cross" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100">
            Кельтский крест
          </TabsTrigger>
          <TabsTrigger value="yes-no" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100">
            Да / Нет
          </TabsTrigger>
        </TabsList>

        <TabsContent value="three-card">
          <ThreeCardReading/>
        </TabsContent>
        <TabsContent value="celtic-cross">
          <CelticCrossReading/>
        </TabsContent>
        <TabsContent value="yes-no">
          <YesNoReading/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReadingQuestionInput({
  question,
  setQuestion,
  placeholder,
}: {
  question: string
  setQuestion: (s: string) => void
  placeholder: string
}) {
  return (
    <div className="max-w-xl mx-auto mb-6">
      <label className="block text-sm text-amber-200/70 mb-2 text-center">
        Сформулируйте вопрос (необязательно)
      </label>
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={placeholder}
        className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
      />
    </div>
  )
}

function ThreeCardReading() {
  const [question, setQuestion] = useState("")
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const { toast } = useToast()

  const positions = ["Прошлое", "Настоящее", "Будущее"]

  const draw = useCallback(() => {
    setIsDrawing(true)
    setDrawnCards([])
    setRevealedIndexes([])
    setTimeout(() => {
      const drawn = drawCards(3)
      setDrawnCards(drawn.map((d, i) => ({
        card: d.card,
        isReversed: d.isReversed,
        position: positions[i],
      })))
      setIsDrawing(false)
      // Сохранить в историю
      saveReading({
        type: "three-card",
        typeLabel: "Расклад на три карты",
        question: question || undefined,
        cards: drawn.map((d, i) => ({
          card: d.card,
          isReversed: d.isReversed,
          position: positions[i],
        })),
      })
      toast({ title: "✦ Карты вытянуты", description: "Нажмите на каждую карту, чтобы открыть" })
    }, 1500)
  }, [question, toast])

  const revealCard = (i: number) => {
    if (!revealedIndexes.includes(i)) {
      setRevealedIndexes([...revealedIndexes, i])
    }
  }

  const allRevealed = drawnCards.length > 0 && revealedIndexes.length === drawnCards.length

  return (
    <div>
      <ReadingQuestionInput
        question={question}
        setQuestion={setQuestion}
        placeholder="Например: что мне нужно знать о текущей ситуации?"
      />

      {!drawnCards.length && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ transform: `rotate(${(i - 1) * 4}deg)` }}>
                <CardBack width={140} height={224} className="rounded-xl shadow-2xl"/>
              </div>
            ))}
          </div>
          <Button onClick={draw} className="btn-gold px-8 py-3">
            <Sparkles className="w-5 h-5 mr-2"/>
            Тянуть три карты
          </Button>
        </div>
      )}

      {isDrawing && (
        <div className="text-center py-12">
          <div className="spinner-mystic mx-auto mb-4"/>
          <p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            Тасую колоду...
          </p>
        </div>
      )}

      {drawnCards.length > 0 && !isDrawing && (
        <div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {drawnCards.map((d, i) => (
              <TarotCardView
                key={i}
                card={d.card}
                isReversed={d.isReversed}
                revealed={revealedIndexes.includes(i)}
                onReveal={() => revealCard(i)}
                width={160}
                height={256}
                position={d.position}
                showPosition
              />
            ))}
          </div>

          {allRevealed && (
            <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
              {drawnCards.map((d, i) => (
                <Card key={i} className="glass-mystic border-amber-400/20">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        className="border"
                        style={{
                          backgroundColor: `${d.card.accent}25`,
                          color: d.card.accent,
                          borderColor: `${d.card.accent}50`,
                        }}
                      >
                        {d.position}
                      </Badge>
                      <h4 className="text-lg font-bold text-amber-100">
                        {d.card.name}
                        {d.isReversed && <span className="ml-2 text-xs text-rose-300">(перевёрнута)</span>}
                      </h4>
                    </div>
                    <p className="text-sm text-amber-100/80 leading-relaxed">
                      {d.isReversed ? d.card.reversed.summary : d.card.upright.summary}
                    </p>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={draw}
                variant="outline"
                className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
              >
                <Sparkles className="w-4 h-4 mr-2"/>
                Новый расклад
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CelticCrossReading() {
  const [question, setQuestion] = useState("")
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const { toast } = useToast()

  const positions = [
    "1. Суть ситуации",
    "2. Что пересекает (препятствие)",
    "3. Основа (корни)",
    "4. Недавнее прошлое",
    "5. Возможный исход",
    "6. Ближайшее будущее",
    "7. Вы в ситуации",
    "8. Влияние окружения",
    "9. Надежды и страхи",
    "10. Итог",
  ]

  const draw = useCallback(() => {
    setIsDrawing(true)
    setDrawnCards([])
    setRevealedIndexes([])
    setTimeout(() => {
      const drawn = drawCards(10)
      setDrawnCards(drawn.map((d, i) => ({
        card: d.card,
        isReversed: d.isReversed,
        position: positions[i],
      })))
      setIsDrawing(false)
      saveReading({
        type: "celtic-cross",
        typeLabel: "Кельтский крест",
        question: question || undefined,
        cards: drawn.map((d, i) => ({
          card: d.card,
          isReversed: d.isReversed,
          position: positions[i],
        })),
      })
      toast({ title: "✦ Кельтский крест вытянут", description: "Откройте карты по очереди" })
    }, 1800)
  }, [question, toast])

  const revealCard = (i: number) => {
    if (!revealedIndexes.includes(i)) {
      setRevealedIndexes([...revealedIndexes, i])
    }
  }

  return (
    <div>
      <ReadingQuestionInput
        question={question}
        setQuestion={setQuestion}
        placeholder="Опишите ситуацию, которую хотите проанализировать..."
      />

      {!drawnCards.length && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-[140px] h-[224px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{ transform: `translate(${i * 5}px, ${i * 5}px) rotate(${(i - 2) * 3}deg)` }}
              >
                <CardBack width={140} height={224} className="rounded-xl shadow-2xl"/>
              </div>
            ))}
          </div>
          <Button onClick={draw} className="btn-gold px-8 py-3">
            <Sparkles className="w-5 h-5 mr-2"/>
            Разложить Кельтский крест
          </Button>
          <p className="text-xs text-amber-200/60 max-w-md text-center">
            10 карт дадут детальный разбор ситуации: основа, препятствия, прошлое, будущее,
            ваше внутреннее состояние и итог.
          </p>
        </div>
      )}

      {isDrawing && (
        <div className="text-center py-12">
          <div className="spinner-mystic mx-auto mb-4"/>
          <p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            Тасую колоду для большого расклада...
          </p>
        </div>
      )}

      {drawnCards.length > 0 && !isDrawing && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8 justify-items-center">
            {drawnCards.map((d, i) => (
              <TarotCardView
                key={i}
                card={d.card}
                isReversed={d.isReversed}
                revealed={revealedIndexes.includes(i)}
                onReveal={() => revealCard(i)}
                width={110}
                height={176}
                position={d.position}
                showPosition
              />
            ))}
          </div>

          {revealedIndexes.length === drawnCards.length && (
            <div className="max-w-3xl mx-auto space-y-3 animate-fade-in">
              {drawnCards.map((d, i) => (
                <Card key={i} className="glass-mystic border-amber-400/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className="shrink-0 border"
                        style={{
                          backgroundColor: `${d.card.accent}25`,
                          color: d.card.accent,
                          borderColor: `${d.card.accent}50`,
                        }}
                      >
                        {d.position}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-amber-100 mb-1">
                          {d.card.name}
                          {d.isReversed && <span className="ml-2 text-xs text-rose-300">(перевёрнута)</span>}
                        </h4>
                        <p className="text-xs text-amber-100/80 leading-relaxed">
                          {d.isReversed ? d.card.reversed.summary : d.card.upright.summary}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={draw}
                variant="outline"
                className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
              >
                <Sparkles className="w-4 h-4 mr-2"/>
                Новый расклад
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function YesNoReading() {
  const [question, setQuestion] = useState("")
  const [drawnCard, setDrawnCard] = useState<DrawnCard | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [answer, setAnswer] = useState<"yes" | "no" | "maybe" | null>(null)
  const { toast } = useToast()

  const draw = useCallback(() => {
    if (!question.trim()) {
      toast({ title: "Сформулируйте вопрос", description: "Для Да/Нет нужен конкретный вопрос", variant: "destructive" })
      return
    }
    setIsDrawing(true)
    setRevealed(false)
    setDrawnCard(null)
    setAnswer(null)
    setTimeout(() => {
      const drawn = drawCards(1)[0]
      setDrawnCard({ card: drawn.card, isReversed: drawn.isReversed })
      setIsDrawing(false)
      // Определение ответа
      const isPositive = !drawn.isReversed && ["major-0","major-1","major-3","major-6","major-7","major-8","major-10","major-14","major-17","major-19","major-20","major-21",
        "wands-ace","wands-three","wands-four","wands-six","wands-eight",
        "cups-ace","cups-two","cups-three","cups-six","cups-nine","cups-ten",
        "swords-ace","swords-four","swords-six",
        "pentacles-ace","pentacles-three","pentacles-six","pentacles-nine","pentacles-ten"].includes(drawn.card.id)
      const isNegative = drawn.isReversed || ["major-13","major-15","major-16","major-18",
        "swords-three","swords-five","swords-seven","swords-nine","swords-ten",
        "cups-four","cups-five","cups-seven","cups-eight",
        "pentacles-five"].includes(drawn.card.id)
      setAnswer(isPositive ? "yes" : isNegative ? "no" : "maybe")
      setTimeout(() => setRevealed(true), 1500)
      saveReading({
        type: "yes-no",
        typeLabel: "Вопрос Да/Нет",
        question,
        cards: [{
          card: drawn.card,
          isReversed: drawn.isReversed,
          position: "Ответ",
        }],
      })
      toast({ title: "✦ Ответ получен" })
    }, 1500)
  }, [question, toast])

  return (
    <div>
      <div className="max-w-xl mx-auto mb-6">
        <label className="block text-sm text-amber-200/70 mb-2 text-center">
          Задайте конкретный вопрос, на который можно ответить Да или Нет
        </label>
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Например: Стоит ли мне принять это предложение работы?"
          className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 min-h-[80px]"
        />
      </div>

      {!drawnCard && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <CardBack width={180} height={288} className="rounded-xl shadow-2xl animate-float"/>
          <Button onClick={draw} className="btn-gold px-8 py-3" disabled={!question.trim()}>
            <Zap className="w-5 h-5 mr-2"/>
            Получить ответ
          </Button>
        </div>
      )}

      {isDrawing && (
        <div className="text-center py-12">
          <div className="spinner-mystic mx-auto mb-4"/>
          <p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            Ищу ответ в картах...
          </p>
        </div>
      )}

      {drawnCard && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <TarotCardView
            card={drawnCard.card}
            isReversed={drawnCard.isReversed}
            revealed={revealed}
            width={200}
            height={320}
          />

          {revealed && answer && (
            <div className="max-w-md w-full text-center animate-fade-in">
              <div
                className="text-5xl sm:text-6xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  background: answer === "yes"
                    ? "linear-gradient(135deg, #86efac 0%, #34d399 100%)"
                    : answer === "no"
                    ? "linear-gradient(135deg, #fca5a5 0%, #ef4444 100%)"
                    : "linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {answer === "yes" ? "ДА" : answer === "no" ? "НЕТ" : "ВОЗМОЖНО"}
              </div>
              <p className="text-amber-200/70 text-sm mb-4">
                {answer === "yes" && "Карты указывают на положительный ответ. Энергия способствует вашему намерению."}
                {answer === "no" && "Карты указывают на отрицательный ответ. Сейчас не время или путь неверен."}
                {answer === "maybe" && "Ответ неоднозначен. Многое зависит от вашего выбора и обстоятельств."}
              </p>
              <Card className="glass-card border-amber-400/20 text-left">
                <CardContent className="p-4">
                  <p className="text-xs text-amber-100/80 italic">
                    {drawnCard.isReversed ? drawnCard.card.reversed.summary : drawnCard.card.upright.summary}
                  </p>
                </CardContent>
              </Card>
              <Button
                onClick={draw}
                variant="outline"
                className="mt-4 border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
              >
                <Sparkles className="w-4 h-4 mr-2"/>
                Новый вопрос
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===================== COMPATIBILITY =====================
function CompatibilitySection() {
  const [person1Cards, setPerson1Cards] = useState<DrawnCard | null>(null)
  const [person2Cards, setPerson2Cards] = useState<DrawnCard | null>(null)
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [isDrawing, setIsDrawing] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const draw = useCallback(() => {
    setIsDrawing(true)
    setPerson1Cards(null)
    setPerson2Cards(null)
    setShowResult(false)
    setTimeout(() => {
      const d1 = drawCards(1)[0]
      const d2 = drawCards(1)[0]
      setPerson1Cards({ card: d1.card, isReversed: d1.isReversed })
      setPerson2Cards({ card: d2.card, isReversed: d2.isReversed })
      setIsDrawing(false)
      setTimeout(() => setShowResult(true), 1200)
      saveReading({
        type: "compatibility",
        typeLabel: "Совместимость пары",
        question: `${name1 || "Человек 1"} и ${name2 || "Человек 2"}`,
        cards: [
          { card: d1.card, isReversed: d1.isReversed, position: name1 || "Человек 1" },
          { card: d2.card, isReversed: d2.isReversed, position: name2 || "Человек 2" },
        ],
      })
    }, 1500)
  }, [name1, name2])

  const getElement = (card: TarotCard): string => {
    if (card.suit === "major") return "Дух"
    return card.element || "Дух"
  }

  const compatibility = person1Cards && person2Cards
    ? getElementCompatibility(
        getElement(person1Cards.card),
        getElement(person2Cards.card)
      )
    : null

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6">
          <span>Совместимость</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block"
          style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}
        >
          Парный расклад
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Вытяните карту для каждого партнёра и узнайте совместимость стихий,
          сильные стороны союза и зоны роста.
        </p>
      </div>

      <div className="max-w-xl mx-auto grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">Имя первого</label>
          <Input
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Человек 1"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40"
          />
        </div>
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">Имя второго</label>
          <Input
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Человек 2"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40"
          />
        </div>
      </div>

      {!person1Cards && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-8 items-center">
            <CardBack width={140} height={224} className="rounded-xl shadow-2xl"/>
            <Heart className="w-10 h-10 text-rose-400 animate-pulse"/>
            <CardBack width={140} height={224} className="rounded-xl shadow-2xl"/>
          </div>
          <Button onClick={draw} className="btn-gold px-8 py-3">
            <Heart className="w-5 h-5 mr-2"/>
            Вытянуть карты совместимости
          </Button>
        </div>
      )}

      {isDrawing && (
        <div className="text-center py-12">
          <div className="spinner-mystic mx-auto mb-4"/>
          <p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            Соединяю энергии пары...
          </p>
        </div>
      )}

      {person1Cards && person2Cards && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 sm:gap-8 items-center flex-wrap justify-center">
            <div className="text-center">
              <div className="text-sm text-amber-200/80 mb-2">{name1 || "Человек 1"}</div>
              <CardSVG card={person1Cards.card} isReversed={person1Cards.isReversed} width={150} height={240} className="rounded-xl shadow-2xl"/>
              <Badge className="mt-2 border" style={{
                backgroundColor: `${person1Cards.card.accent}25`,
                color: person1Cards.card.accent,
                borderColor: `${person1Cards.card.accent}50`,
              }}>
                {getElement(person1Cards.card)}
              </Badge>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-rose-400 mx-auto mb-2 animate-pulse"/>
              <div className="text-amber-200/60 text-xs">+</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-amber-200/80 mb-2">{name2 || "Человек 2"}</div>
              <CardSVG card={person2Cards.card} isReversed={person2Cards.isReversed} width={150} height={240} className="rounded-xl shadow-2xl"/>
              <Badge className="mt-2 border" style={{
                backgroundColor: `${person2Cards.card.accent}25`,
                color: person2Cards.card.accent,
                borderColor: `${person2Cards.card.accent}50`,
              }}>
                {getElement(person2Cards.card)}
              </Badge>
            </div>
          </div>

          {showResult && compatibility && (
            <div className="max-w-2xl w-full animate-fade-in space-y-4">
              <Card className="glass-mystic border-amber-400/30 text-center">
                <CardContent className="pt-6">
                  <div className="text-6xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {compatibility.score}%
                  </div>
                  <h3 className="text-xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {compatibility.title}
                  </h3>
                  <p className="text-sm text-amber-200/80 leading-relaxed">
                    {compatibility.description}
                  </p>
                  <Progress value={compatibility.score} className="mt-4 bg-purple-950/60"/>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="glass-card border-green-400/20">
                  <CardHeader>
                    <CardTitle className="text-base text-green-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4"/>
                      Сильные стороны
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1.5">
                      {compatibility.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-amber-100/80 flex gap-2">
                          <span className="text-green-400">✦</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="glass-card border-rose-400/20">
                  <CardHeader>
                    <CardTitle className="text-base text-rose-200 flex items-center gap-2">
                      <Compass className="w-4 h-4"/>
                      Зоны роста
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1.5">
                      {compatibility.challenges.map((c, i) => (
                        <li key={i} className="text-xs text-amber-100/80 flex gap-2">
                          <span className="text-rose-400">✦</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-amber-400/30">
                <CardContent className="pt-5">
                  <h4 className="text-sm font-semibold text-amber-200 mb-2 flex items-center gap-2">
                    <Crown className="w-4 h-4"/>
                    Совет паре
                  </h4>
                  <p className="text-sm text-amber-100/85 italic leading-relaxed">
                    {compatibility.advice}
                  </p>
                </CardContent>
              </Card>

              <Button
                onClick={draw}
                variant="outline"
                className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
              >
                <Heart className="w-4 h-4 mr-2"/>
                Новый расклад совместимости
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===================== PSYCHOLOGY =====================
function PsychologySection() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([])
  const [isDrawing, setIsDrawing] = useState(false)

  const draw = useCallback(() => {
    setIsDrawing(true)
    setDrawnCards([])
    setRevealedIndexes([])
    setTimeout(() => {
      const drawn = drawCards(5)
      setDrawnCards(drawn.map((d, i) => ({
        card: d.card,
        isReversed: d.isReversed,
        position: ["Текущее состояние", "Внутренний ребёнок", "Внутренний взрослый", "Тень", "Духовная задача"][i],
      })))
      setIsDrawing(false)
      saveReading({
        type: "psychology",
        typeLabel: "Психологический портрет",
        cards: drawn.map((d, i) => ({
          card: d.card,
          isReversed: d.isReversed,
          position: ["Текущее состояние", "Внутренний ребёнок", "Внутренний взрослый", "Тень", "Духовная задача"][i],
        })),
      })
    }, 1800)
  }, [])

  const allRevealed = drawnCards.length > 0 && revealedIndexes.length === drawnCards.length
  const profile = allRevealed
    ? analyzePsychologicalProfile(drawnCards)
    : null

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6">
          <span>Психология и архетипы</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block"
          style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}
        >
          Архетипический портрет
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          5 карт раскроют вашу внутреннюю панораму: текущее состояние, активные
          субличности, тень и духовная задача. Этот расклад — инструмент самопознания,
          основанный на юнгианской психологии.
        </p>
      </div>

      {!drawnCards.length && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ transform: `rotate(${(i - 2) * 3}deg)` }}>
                <CardBack width={100} height={160} className="rounded-xl shadow-2xl"/>
              </div>
            ))}
          </div>
          <Button onClick={draw} className="btn-gold px-8 py-3">
            <Brain className="w-5 h-5 mr-2"/>
            Разложить архетипы
          </Button>
        </div>
      )}

      {isDrawing && (
        <div className="text-center py-12">
          <div className="spinner-mystic mx-auto mb-4"/>
          <p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>
            Открываю панораму души...
          </p>
        </div>
      )}

      {drawnCards.length > 0 && !isDrawing && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8 justify-items-center">
            {drawnCards.map((d, i) => (
              <TarotCardView
                key={i}
                card={d.card}
                isReversed={d.isReversed}
                revealed={revealedIndexes.includes(i)}
                onReveal={() => {
                  if (!revealedIndexes.includes(i)) {
                    setRevealedIndexes([...revealedIndexes, i])
                  }
                }}
                width={120}
                height={192}
                position={d.position}
                showPosition
              />
            ))}
          </div>

          {profile && (
            <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
              {/* Профиль */}
              <Card className="glass-mystic border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-100 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-purple-300"/>
                    Психологический профиль
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="glass-card rounded-lg p-3 text-center">
                      <div className="text-xs text-amber-200/60 mb-1">Доминирующая стихия</div>
                      <div className="text-lg font-bold text-amber-100">{profile.dominantElement}</div>
                    </div>
                    <div className="glass-card rounded-lg p-3 text-center">
                      <div className="text-xs text-amber-200/60 mb-1">Старших арканов</div>
                      <div className="text-lg font-bold text-amber-100">{profile.majorCount} / {drawnCards.length}</div>
                    </div>
                    <div className="glass-card rounded-lg p-3 text-center">
                      <div className="text-xs text-amber-200/60 mb-1">Перевёрнутых</div>
                      <div className="text-lg font-bold text-amber-100">{profile.reversedCount} / {drawnCards.length}</div>
                    </div>
                  </div>

                  {/* Распределение стихий */}
                  <div>
                    <div className="text-xs text-amber-200/60 mb-2">Распределение стихий</div>
                    <div className="space-y-1.5">
                      {Object.entries(profile.elementCounts).map(([el, count]) => (
                        <div key={el} className="flex items-center gap-2">
                          <div className="text-xs text-amber-100/70 w-16">{el}</div>
                          <div className="flex-1 bg-purple-950/40 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(count / drawnCards.length) * 100}%`,
                                background: el === "Огонь" ? "#fb923c"
                                  : el === "Вода" ? "#60a5fa"
                                  : el === "Воздух" ? "#94a3b8"
                                  : el === "Земля" ? "#a3e635"
                                  : "#fbbf24",
                              }}
                            />
                          </div>
                          <div className="text-xs text-amber-200/60 w-6 text-right">{count}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Архетип */}
              {elementArchetypes[profile.dominantElement] && (
                <Card className="glass-mystic border-amber-400/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-gold-gradient flex items-center gap-2">
                      <Crown className="w-5 h-5"/>
                      {elementArchetypes[profile.dominantElement].name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-xs text-amber-200/70 mb-1">✦ Дар</div>
                      <p className="text-sm text-amber-100/85">{elementArchetypes[profile.dominantElement].coreGift}</p>
                    </div>
                    <div>
                      <div className="text-xs text-amber-200/70 mb-1">✦ Рана</div>
                      <p className="text-sm text-amber-100/85">{elementArchetypes[profile.dominantElement].coreWound}</p>
                    </div>
                    <div>
                      <div className="text-xs text-amber-200/70 mb-1">✦ Тень</div>
                      <p className="text-sm text-amber-100/85">{elementArchetypes[profile.dominantElement].shadow}</p>
                    </div>
                    <div>
                      <div className="text-xs text-amber-200/70 mb-1">✦ Путь роста</div>
                      <p className="text-sm text-amber-100/85">{elementArchetypes[profile.dominantElement].growth}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Инсайты */}
              <Card className="glass-card border-amber-400/20">
                <CardHeader>
                  <CardTitle className="text-base text-amber-100 flex items-center gap-2">
                    <Brain className="w-4 h-4"/>
                    Инсайты расклада
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {profile.insights.map((insight, i) => (
                      <li key={i} className="text-sm text-amber-100/85 flex gap-2 leading-relaxed">
                        <span className="text-amber-400">✦</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Аффирмации */}
              {profile.affirmations.length > 0 && (
                <Card className="glass-card border-purple-400/20">
                  <CardHeader>
                    <CardTitle className="text-base text-purple-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4"/>
                      Аффирмации для работы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {profile.affirmations.map((aff, i) => (
                        <li key={i} className="text-sm italic text-amber-100/85 pl-4 border-l-2 border-purple-400/40">
                          {aff}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Расшифровка позиций */}
              <Card className="glass-card border-amber-400/20">
                <CardHeader>
                  <CardTitle className="text-base text-amber-100 flex items-center gap-2">
                    <BookOpen className="w-4 h-4"/>
                    Расшифровка позиций
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {drawnCards.map((d, i) => (
                    <div key={i} className="border-l-2 pl-3" style={{ borderColor: `${d.card.accent}50` }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-amber-200/60">{d.position}</span>
                        <span className="text-sm font-semibold text-amber-100">{d.card.name}</span>
                        {d.isReversed && <Badge variant="outline" className="text-xs text-rose-300 border-rose-400/40">перевёрнута</Badge>}
                      </div>
                      <p className="text-xs text-amber-100/75 italic">
                        {d.isReversed ? d.card.reversed.psychology : d.card.upright.psychology}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button
                onClick={draw}
                variant="outline"
                className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
              >
                <Brain className="w-4 h-4 mr-2"/>
                Новый архетипический портрет
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===================== SUCCESS STEPS (14 ШАГОВ УСПЕХА) =====================
function SuccessStepsSection() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [progressVersion, setProgressVersion] = useState(0)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const { toast } = useToast()

  const overall = getOverallProgress()
  const allProgress = getAllProgress()

  const refresh = () => setProgressVersion(v => v + 1)

  const filteredSteps = filterCategory
    ? successSteps.filter(s => s.category === filterCategory)
    : successSteps

  const step = selectedStep !== null ? successSteps.find(s => s.number === selectedStep) : null

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6">
          <span>14 Шагов Успеха по Тойчи</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block"
          style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}
        >
          Путь Мастера
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Полный курс трансформации по методологии Тойчи — 14 шагов от ясного намерения
          до целостного наследия. Каждый шаг включает теорию, практические упражнения,
          рекомендованные книги и курсы, аффирмации и чек-листы с отслеживанием прогресса.
        </p>
      </div>

      {/* Прогресс-бар */}
      <Card className="glass-mystic border-amber-400/30 mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-amber-300"/>
                <h3 className="text-lg font-bold text-amber-100">Ваш прогресс</h3>
              </div>
              <div className="flex gap-4 text-sm text-amber-200/70 mb-2">
                <span>Шагов начато: <strong className="text-amber-100">{overall.completedSteps} / 14</strong></span>
                <span>Пунктов чек-листа: <strong className="text-amber-100">{overall.completedChecklist}</strong></span>
              </div>
              <Progress
                value={(overall.completedSteps / 14) * 100}
                className="bg-purple-950/60"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetAllProgress()
                refresh()
                toast({ title: "Прогресс сброшен" })
              }}
              className="border-rose-400/30 text-rose-200 hover:bg-rose-400/10"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1"/>
              Сбросить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Фильтр по категориям */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Button
          variant={filterCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterCategory(null)}
          className={filterCategory === null
            ? "bg-amber-400/30 text-amber-100 border-amber-400/40"
            : "border-amber-400/30 text-amber-200 hover:bg-amber-400/10"}
        >
          Все шаги (14)
        </Button>
        {stepCategories.map(cat => (
          <Button
            key={cat.id}
            variant={filterCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory(cat.id)}
            className={filterCategory === cat.id
              ? "text-white border"
              : "border-amber-400/30 text-amber-200 hover:bg-amber-400/10"}
            style={filterCategory === cat.id
              ? { backgroundColor: `${cat.color}30`, borderColor: `${cat.color}50` }
              : { borderColor: `${cat.color}30` }}
          >
            {cat.id}
          </Button>
        ))}
      </div>

      {/* Сетка из 14 шагов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSteps.map((s) => {
          const prog = allProgress[s.number]
          const completedCount = prog?.completedChecklist.length || 0
          const totalCount = s.checklist.length
          const percent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
          const isCompleted = completedCount === totalCount && totalCount > 0
          return (
            <button
              key={s.number}
              onClick={() => setSelectedStep(s.number)}
              className="text-left glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
              style={{ borderColor: `${s.color}30` }}
            >
              {/* Декоративный фон номера */}
              <div
                className="absolute -top-4 -right-4 text-8xl font-bold opacity-10 select-none"
                style={{ color: s.color, fontFamily: "var(--font-cinzel)" }}
              >
                {s.number}
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      backgroundColor: `${s.color}25`,
                      boxShadow: `0 0 15px ${s.color}30`,
                    }}
                  >
                    {s.icon}
                  </div>
                  <Badge
                    className="border"
                    style={{
                      backgroundColor: `${s.color}20`,
                      color: s.color,
                      borderColor: `${s.color}50`,
                    }}
                  >
                    {s.category}
                  </Badge>
                </div>

                <div className="text-xs text-amber-200/60 mb-1">
                  Шаг {s.number} из 14
                </div>
                <h3
                  className="text-lg font-bold text-amber-100 mb-1"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {s.title}
                </h3>
                <p className="text-xs text-amber-200/70 mb-3 italic">{s.subtitle}</p>
                <p className="text-sm text-amber-100/75 leading-relaxed line-clamp-3 mb-3">
                  {s.description}
                </p>

                {/* Прогресс шага */}
                {completedCount > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-amber-200/60 mb-1">
                      <span>Прогресс чек-листа</span>
                      <span>{completedCount}/{totalCount}</span>
                    </div>
                    <Progress value={percent} className="h-1.5 bg-purple-950/60"/>
                  </div>
                )}

                {isCompleted && (
                  <div className="mt-2 flex items-center gap-1 text-emerald-300 text-xs">
                    <CheckCircle2 className="w-3 h-3"/>
                    <span>Шаг завершён</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Модальное окно с деталями шага */}
      <Dialog open={selectedStep !== null} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-[#1a0a3a] border-amber-400/30">
          <ScrollArea className="max-h-[90vh]">
            {step && (
              <StepDetails
                step={step}
                progress={allProgress[step.number]}
                onToggleChecklist={(idx) => {
                  toggleChecklistItem(step.number, idx)
                  refresh()
                }}
                onToggleExercise={(idx) => {
                  toggleExercise(step.number, idx)
                  refresh()
                }}
                onNotesChange={(notes) => {
                  updateNotes(step.number, notes)
                  refresh()
                }}
                key={progressVersion}
              />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StepDetails({
  step,
  progress,
  onToggleChecklist,
  onToggleExercise,
  onNotesChange,
}: {
  step: SuccessStep
  progress?: StepProgress
  onToggleChecklist: (idx: number) => void
  onToggleExercise: (idx: number) => void
  onNotesChange: (notes: string) => void
}) {
  const [notes, setNotes] = useState(progress?.notes || "")
  const completedChecklist = progress?.completedChecklist || []
  const completedExercises = progress?.completedExercises || []

  const materialIcon = (type: string) => {
    switch (type) {
      case "book": return <BookMarked className="w-4 h-4"/>
      case "course": return <GraduationCap className="w-4 h-4"/>
      case "video": return <Video className="w-4 h-4"/>
      case "article": return <BookOpen className="w-4 h-4"/>
      case "practice": return <PenLine className="w-4 h-4"/>
      default: return <BookOpen className="w-4 h-4"/>
    }
  }

  const materialLabel = (type: string) => {
    const labels: Record<string, string> = {
      book: "Книга",
      course: "Курс",
      video: "Видео",
      article: "Статья",
      practice: "Практика",
    }
    return labels[type] || type
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Шапка */}
      <div
        className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${step.color}20, transparent)`,
          border: `1px solid ${step.color}40`,
        }}
      >
        <div
          className="absolute -top-6 -right-6 text-9xl font-bold opacity-15 select-none"
          style={{ color: step.color, fontFamily: "var(--font-cinzel)" }}
        >
          {step.number}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
              style={{
                backgroundColor: `${step.color}30`,
                boxShadow: `0 0 25px ${step.color}40`,
              }}
            >
              {step.icon}
            </div>
            <div>
              <Badge
                className="border"
                style={{
                  backgroundColor: `${step.color}25`,
                  color: step.color,
                  borderColor: `${step.color}50`,
                }}
              >
                {step.category} · Шаг {step.number}/14
              </Badge>
              <h2
                className="text-2xl sm:text-3xl font-bold text-amber-100 mt-1"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {step.title}
              </h2>
            </div>
          </div>
          <p className="text-amber-200/80 italic">{step.subtitle}</p>
          <p className="text-amber-100/85 mt-3 leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Ключевая мысль */}
      <Card className="glass-card border-amber-400/40 mb-6">
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-300 mt-0.5 shrink-0"/>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">Ключевая мысль</div>
              <p className="text-amber-100 font-medium italic">{step.keyInsight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Теория */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <BookOpen className="w-5 h-5 text-amber-300"/>
          Теория
        </h3>
        <Card className="glass-card border-amber-400/20">
          <CardContent className="pt-5">
            <p className="text-amber-100/85 text-sm leading-relaxed whitespace-pre-line">
              {step.fullTheory}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Принципы */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <Compass className="w-5 h-5 text-amber-300"/>
          Ключевые принципы
        </h3>
        <Card className="glass-card border-amber-400/20">
          <CardContent className="pt-5 space-y-2">
            {step.principles.map((p, i) => (
              <div key={i} className="flex gap-3 items-start text-sm text-amber-100/85">
                <span className="text-amber-400 mt-1">✦</span>
                <span>{p}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Упражнения */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <Zap className="w-5 h-5 text-amber-300"/>
          Практические упражнения
        </h3>
        <div className="space-y-3">
          {step.exercises.map((ex, i) => {
            const isDone = completedExercises.includes(i)
            return (
              <Card key={i} className={`glass-card transition-all ${isDone ? "border-emerald-400/40" : "border-amber-400/20"}`}>
                <CardContent className="pt-5">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleExercise(i)}
                      className="mt-1 shrink-0"
                      aria-label="Отметить упражнение"
                    >
                      {isDone
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-400"/>
                        : <Circle className="w-5 h-5 text-amber-400/60 hover:text-amber-300"/>
                      }
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`font-semibold ${isDone ? "text-emerald-200 line-through" : "text-amber-100"}`}>
                          {ex.title}
                        </h4>
                        <Badge variant="outline" className="text-xs border-amber-400/40 text-amber-200/70 shrink-0">
                          {ex.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-amber-100/75 leading-relaxed">{ex.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Материалы и курсы */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <GraduationCap className="w-5 h-5 text-amber-300"/>
          Рекомендованные материалы ({step.materials.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {step.materials.map((m, i) => (
            <Card key={i} className="glass-card border-amber-400/20">
              <CardContent className="pt-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${step.color}25`,
                      color: step.color,
                    }}
                  >
                    {materialIcon(m.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className="text-xs border"
                        style={{
                          backgroundColor: `${step.color}20`,
                          color: step.color,
                          borderColor: `${step.color}50`,
                        }}
                      >
                        {materialLabel(m.type)}
                      </Badge>
                      {m.duration && (
                        <span className="text-xs text-amber-200/60">{m.duration}</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-amber-100 text-sm mb-0.5">{m.title}</h4>
                    {m.author && (
                      <p className="text-xs text-amber-200/70 mb-1">{m.author}</p>
                    )}
                    <p className="text-xs text-amber-100/70 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Аффирмации */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <Sparkles className="w-5 h-5 text-amber-300"/>
          Аффирмации
        </h3>
        <Card className="glass-card border-purple-400/20">
          <CardContent className="pt-5 space-y-2">
            {step.affirmations.map((a, i) => (
              <div key={i} className="text-sm italic text-amber-100/85 pl-4 border-l-2" style={{ borderColor: `${step.color}50` }}>
                {a}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Вопросы для размышления */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <Brain className="w-5 h-5 text-amber-300"/>
          Вопросы для размышления
        </h3>
        <Card className="glass-card border-purple-400/20">
          <CardContent className="pt-5 space-y-3">
            {step.reflectionQuestions.map((q, i) => (
              <div key={i} className="flex gap-3 items-start text-sm text-amber-100/85">
                <span className="text-purple-300 font-bold mt-0.5">{i + 1}.</span>
                <span>{q}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Чек-лист */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <CheckCircle2 className="w-5 h-5 text-amber-300"/>
          Чек-лист ({completedChecklist.length}/{step.checklist.length})
        </h3>
        <Card className="glass-card border-amber-400/30">
          <CardContent className="pt-5 space-y-2">
            {step.checklist.map((item, i) => {
              const isDone = completedChecklist.includes(i)
              return (
                <button
                  key={i}
                  onClick={() => onToggleChecklist(i)}
                  className="flex gap-3 items-start text-left w-full hover:bg-amber-400/5 p-2 rounded-lg transition-colors"
                >
                  {isDone
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0"/>
                    : <Circle className="w-5 h-5 text-amber-400/60 mt-0.5 shrink-0"/>
                  }
                  <span className={`text-sm ${isDone ? "text-emerald-200 line-through" : "text-amber-100/85"}`}>
                    {item}
                  </span>
                </button>
              )
            })}
          </CardContent>
        </Card>
      </section>

      {/* Заметки пользователя */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-amber-100 mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          <Pencil className="w-5 h-5 text-amber-300"/>
          Мои заметки
        </h3>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => onNotesChange(notes)}
          placeholder="Запишите свои инсайты, открытия, планы по этому шагу..."
          className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 min-h-[120px]"
        />
        <p className="text-xs text-amber-200/50 mt-1">Заметки сохраняются автоматически при потере фокуса</p>
      </section>
    </div>
  )
}

// ===================== HISTORY =====================
function HistorySection() {
  const [history, setHistory] = useState<ReadingRecord[]>(() => {
    if (typeof window === "undefined") return []
    return getHistory()
  })
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    deleteReading(id)
    setHistory(getHistory())
  }

  const handleClear = () => {
    clearHistory()
    setHistory([])
  }

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6">
          <span>История раскладов</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-3 text-gold-gradient inline-block"
          style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}
        >
          Ваш дневник
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Все ваши расклады сохраняются на этом устройстве. Возвращайтесь к ним, чтобы
          отследить динамику и понять, как менялись вопросы и ответы.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/30 mb-6">
            <History className="w-10 h-10 text-amber-300/70"/>
          </div>
          <h3 className="text-xl text-amber-100/80 mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
            История пуста
          </h3>
          <p className="text-amber-200/60 text-sm">
            Сделайте первый расклад, и он появится здесь.
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-amber-200/60">{history.length} раскладов</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="border-rose-400/30 text-rose-200 hover:bg-rose-400/10"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1"/>
              Очистить всё
            </Button>
          </div>

          {history.map((record) => (
            <Card key={record.id} className="glass-card border-amber-400/20">
              <CardContent className="p-4">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => setExpanded(expanded === record.id ? null : record.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className="text-amber-200 border-amber-400/40">
                        {record.typeLabel}
                      </Badge>
                      <span className="text-xs text-amber-200/60">{formatDate(record.createdAt)}</span>
                    </div>
                    {record.question && (
                      <p className="text-sm text-amber-100/80 mb-2 italic">«{record.question}»</p>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {record.cards.slice(0, 6).map((c, i) => (
                        <div key={i} className="text-xs px-2 py-1 rounded bg-purple-950/40 text-amber-100/80">
                          {c.card.name}{c.isReversed ? " ⇋" : ""}
                        </div>
                      ))}
                      {record.cards.length > 6 && (
                        <div className="text-xs px-2 py-1 text-amber-200/60">
                          +{record.cards.length - 6}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-amber-200/60">
                    {expanded === record.id ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  </Button>
                </div>

                {expanded === record.id && (
                  <div className="mt-4 pt-4 border-t border-amber-400/20 space-y-2 animate-fade-in">
                    {record.cards.map((c, i) => (
                      <div key={i} className="text-sm">
                        {c.position && <span className="text-xs text-amber-200/60 mr-2">{c.position}:</span>}
                        <span className="text-amber-100 font-medium">{c.card.name}</span>
                        {c.isReversed && <span className="text-xs text-rose-300 ml-1">(перевёрнута)</span>}
                        <p className="text-xs text-amber-100/70 italic mt-1 pl-3">
                          {c.isReversed ? c.card.reversed.summary : c.card.upright.summary}
                        </p>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(record.id)}
                      className="text-rose-300/70 hover:bg-rose-400/10 mt-2"
                    >
                      <Trash2 className="w-3 h-3 mr-1"/>
                      Удалить расклад
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// ===================== FOOTER =====================
function Footer() {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-amber-400/20 glass-mystic">
      <div className="max-w-7xl mx-auto text-center">
        <div className="section-divider mb-6">
          <span>✦ ✦ ✦</span>
        </div>
        <p className="text-sm text-amber-200/70 mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>
          Таро — это зеркало души, а не предсказание будущего.
        </p>
        <p className="text-xs text-amber-200/50">
          © {new Date().getFullYear()} Mystic Tarot · Сделано с любовью к мудрости арканов
        </p>
        {isVKEnvironment() && (
          <p className="text-xs text-blue-300/60 mt-2">
            Запущено как VK Mini App · Поддерживается VK Bridge SDK
          </p>
        )}
      </div>
    </footer>
  )
}
