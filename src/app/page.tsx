"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { StarryBackground } from "@/components/starry-bg"
import { TarotCardView } from "@/components/tarot-card"
import { CardSVG, CardBack } from "@/lib/tarot-svg"
import { ColorQuiz } from "@/components/color-quiz"
import { GeometryQuiz } from "@/components/geometry-quiz"
import { PalmInteractive } from "@/components/palm-interactive"
import { ShareImageButton } from "@/components/share-image-button"
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
  calculateBirthDate,
  getZodiacSign,
  getChineseZodiac,
  getBirthStone,
  getFlowerSign,
  getCelticTree,
  colorArchetypes,
  geometryArchetypes,
  palmLines,
  palmMounts,
  palmExtraLines,
  handTypes,
  getZodiacCompatibility,
  calculateNumerologyCompatibility,
  type BirthDateResult,
  type ZodiacSign,
  type ColorArchetype,
  type GeometryArchetype,
  type PalmLine,
  type ZodiacCompatibility,
  type NumerologyCompatibility,
  type ChineseZodiac,
  type BirthStone,
  type FlowerSign,
  type CelticTree,
} from "@/lib/psychology-data"
import {
  runes,
  drawRunes,
  getMoonPhase,
  getMoonAdvice,
  getMoonInfluence,
  getLunarDay,
  moonPhases,
  type RuneDraw,
} from "@/lib/runes-moon-data"
import {
  calculateMonthFavorability,
  getDayAdvice,
  getWeekdayShort,
  getWeekdayName,
  type DayFavorability,
} from "@/lib/favorable-days"
import {
  getDailyHoroscope,
  getWeeklyHoroscope,
  getSignByBirthDate,
  horoscopeSigns,
  type HoroscopeCategory,
  type HoroscopePeriod,
} from "@/lib/horoscope-data"
import {
  getYearHoroscope,
  type YearHoroscope,
} from "@/lib/horoscope-year-data"
import {
  findNameSecret,
  searchNames,
  getNameOfTheDay,
  type NameSecret,
} from "@/lib/name-secret-data"
import {
  castIChing,
  getHexagram,
  calculateBiorhythm,
  getBiorhythmSeries,
  calculatePsychomatrix,
  calculateNameNumerology,
  shareResult,
  type Hexagram,
  type BiorhythmResult,
  type Psychomatrix,
  type NameNumerology,
} from "@/lib/divination-data"
import {
  calculateNatalChart,
  calculateAspects,
  calculateKeyDates,
  planets as natalPlanets,
  zodiacInNatal,
  natalHouses,
  type NatalChartResult,
  type PlanetPosition,
  type CalculatedAspect,
  type KeyDate,
} from "@/lib/natal-chart-data"
import {
  getHistory,
  saveReading,
  deleteReading,
  clearHistory,
  formatDate,
  type ReadingRecord,
} from "@/lib/tarot-storage"
import { initVKBridge, isVKEnvironment, vkShare } from "@/lib/vk-bridge"
import { useTheme } from "@/lib/use-theme"
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
import { getStepQuiz, type QuizQuestion } from "@/lib/success-quiz-data"
import {
  getAllKeys,
  saveKey,
  hasKey,
  getKeysCount,
  getAllKeysCount,
  isVaultUnlocked,
  markVaultUnlocked,
  resetKeys,
  formatDate as formatKeyDate,
  type StepKey,
} from "@/lib/success-keys"
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
  Key,
  Lock,
  Unlock,
  DoorClosed,
  DoorOpen,
  Award,
  Flame,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Sparkle,
  Calendar,
  Palette,
  Hexagon,
  Hand,
  Globe,
  Activity,
  Type,
  Share2,
  Grid3x3,
  Dices,
} from "lucide-react"

type Section = "home" | "daily" | "readings" | "tarot-forecast" | "horoscope" | "compatibility" | "psychology" | "history" | "success" | "moon" | "favorable" | "catalog" | "theme"

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
    { id: "tarot-forecast", label: "Таро дня", icon: <Sparkles className="w-4 h-4"/> },
    { id: "horoscope", label: "Гороскоп", icon: <Star className="w-4 h-4"/> },
    { id: "readings", label: "Расклады", icon: <Layers className="w-4 h-4"/> },
    { id: "catalog", label: "Каталог", icon: <BookOpen className="w-4 h-4"/> },
    { id: "compatibility", label: "Совместимость", icon: <Heart className="w-4 h-4"/> },
    { id: "psychology", label: "Психология", icon: <Brain className="w-4 h-4"/> },
    { id: "moon", label: "Луна", icon: <Moon className="w-4 h-4"/> },
    { id: "favorable", label: "Дни", icon: <Calendar className="w-4 h-4"/> },
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
          {section === "tarot-forecast" && <TarotForecastSection/>}
          {section === "horoscope" && <HoroscopeSection/>}
          {section === "readings" && <ReadingsSection/>}
          {section === "compatibility" && <CompatibilitySection/>}
          {section === "psychology" && <PsychologySection/>}
          {section === "moon" && <MoonSection/>}
          {section === "favorable" && <FavorableDaysSection/>}
          {section === "catalog" && <CatalogSection/>}
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
  const { theme, toggleTheme, mounted } = useTheme()
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
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
            className="ml-1 flex items-center justify-center w-9 h-9 rounded-lg text-amber-200 hover:bg-amber-400/10 hover:text-amber-100 transition-all border border-amber-400/20"
          >
            {mounted && theme === "light" ? <Moon className="w-4 h-4"/> : <Sun className="w-4 h-4"/>}
          </button>
        </nav>

        {/* Mobile: theme toggle + menu button */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-amber-200 hover:bg-amber-400/10 hover:text-amber-100 transition-all border border-amber-400/20"
          >
            {mounted && theme === "light" ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
          </button>
          <button
            className="p-2 text-amber-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </div>
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
            icon={<Sparkles className="w-7 h-7"/>}
            title="Таро дня"
            description="Три карты дня: Энергия, Совет и Предупреждение. Прогноз стабильный на сутки — можно вернуться в течение дня и перечитать."
            onClick={() => onNavigate("tarot-forecast")}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={<Star className="w-7 h-7"/>}
            title="Гороскоп"
            description="Прогноз на сегодня, завтра, неделю и год для каждого знака. 5 сфер: общий, любовь, карьера, финансы и здоровье. Годовой прогноз с 12 месяцами."
            onClick={() => onNavigate("horoscope")}
            accent="#f9a8d4"
          />
          <FeatureCard
            icon={<Layers className="w-7 h-7"/>}
            title="Расклады"
            description="Таро (3 карты, Кельтский крест, Да/Нет), руны Старшего Футарка, И-Цзин (64 гексаграммы), биоритмы и психоматрица Александрова — все расклады и гадания в одном разделе."
            onClick={() => onNavigate("readings")}
            accent="#a78bfa"
          />
          <FeatureCard
            icon={<Heart className="w-7 h-7"/>}
            title="Совместимость"
            description="Совместимость пары по картам Таро, по знакам зодиака и по дате рождения (нумерология). Сильные стороны союза, зоны роста и совет паре."
            onClick={() => onNavigate("compatibility")}
            accent="#f9a8d4"
          />
          <FeatureCard
            icon={<Brain className="w-7 h-7"/>}
            title="Психология"
            description="Девять инструментов самопознания: архетип Таро, дата рождения, гороскоп, цвет, геометрия, ладонь, натальная карта, нумерология имени и тайна имени с этимологией."
            onClick={() => onNavigate("psychology")}
            accent="#7dd3fc"
          />
          <FeatureCard
            icon={<Calendar className="w-7 h-7"/>}
            title="Благоприятные дни"
            description="Календарь по знаку зодиака: день управителя, лунная фаза, нумерология даты и стихия — оценка каждого дня и топ благоприятных дат месяца."
            onClick={() => onNavigate("favorable")}
            accent="#86efac"
          />
          <FeatureCard
            icon={<History className="w-7 h-7"/>}
            title="История"
            description="Все ваши расклады сохраняются локально на устройстве. Возвращайтесь к ним, чтобы отследить динамику пути."
            onClick={() => onNavigate("history")}
            accent="#c4b5fd"
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
  const resultRef = useRef<HTMLDivElement>(null)
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
              <Card ref={resultRef as React.RefObject<HTMLDivElement>} className="glass-mystic border-amber-400/30">
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

                  <div className="flex gap-3 pt-2 flex-wrap">
                    <ShareImageButton
                      targetRef={resultRef}
                      filename={`map-dnya-${drawnCard.card.id}`}
                      textFallback={`Моя карта дня — ${drawnCard.card.name}${drawnCard.isReversed ? " (перевёрнута)" : ""}: ${drawnCard.isReversed ? drawnCard.card.reversed.summary : drawnCard.card.upright.summary}`}
                      label="📲 Поделиться картинкой"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        vkShare(`Моя карта дня — ${drawnCard.card.name}${drawnCard.isReversed ? " (перевёрнута)" : ""}: ${drawnCard.isReversed ? drawnCard.card.reversed.summary : drawnCard.card.upright.summary}`)
                      }}
                      className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
                    >
                      <Send className="w-3.5 h-3.5 mr-1"/>
                      Текстом
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
  const [readingType, setReadingType] = useState<
    "three-card" | "celtic-cross" | "yes-no" | "runes" | "iching" | "biorhythms" | "psychomatrix"
  >("three-card")

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6">
          <span>Расклады и гадания</span>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-3 text-gold-gradient inline-block"
          style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}
        >
          Расклады
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Таро, руны, И-Цзин и нумерологические расчёты в одном месте. Выберите инструмент —
          от быстрого ответа «Да/Нет» до глубокого анализа через Кельтский крест или психоматрицу.
        </p>
      </div>

      <Tabs value={readingType} onValueChange={(v) => setReadingType(v as typeof readingType)}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 max-w-5xl mx-auto mb-8 bg-purple-950/40 border border-amber-400/20">
          <TabsTrigger value="three-card" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Layers className="w-3.5 h-3.5 mr-1"/>
            3 карты
          </TabsTrigger>
          <TabsTrigger value="celtic-cross" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Compass className="w-3.5 h-3.5 mr-1"/>
            Кельтский
          </TabsTrigger>
          <TabsTrigger value="yes-no" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1"/>
            Да / Нет
          </TabsTrigger>
          <TabsTrigger value="runes" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Flame className="w-3.5 h-3.5 mr-1"/>
            Руны
          </TabsTrigger>
          <TabsTrigger value="iching" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Dices className="w-3.5 h-3.5 mr-1"/>
            И-Цзин
          </TabsTrigger>
          <TabsTrigger value="biorhythms" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Activity className="w-3.5 h-3.5 mr-1"/>
            Биоритмы
          </TabsTrigger>
          <TabsTrigger value="psychomatrix" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Grid3x3 className="w-3.5 h-3.5 mr-1"/>
            Матрица
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
        <TabsContent value="runes">
          <RunesSection/>
        </TabsContent>
        <TabsContent value="iching">
          <IChingSection/>
        </TabsContent>
        <TabsContent value="biorhythms">
          <BiorhythmsSection/>
        </TabsContent>
        <TabsContent value="psychomatrix">
          <PsychomatrixSection/>
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
  const [compatTab, setCompatTab] = useState<"tarot" | "zodiac" | "birthdate">("tarot")

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
          Три способа узнать совместимость пары: через карты Таро (по стихиям арканов),
          по знакам зодиака и по числам даты рождения (нумерология).
        </p>
      </div>

      <Tabs value={compatTab} onValueChange={(v) => setCompatTab(v as typeof compatTab)}>
        <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8 bg-purple-950/40 border border-amber-400/20">
          <TabsTrigger value="tarot" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Layers className="w-3.5 h-3.5 mr-1"/>
            <span className="hidden sm:inline">По Таро</span>
            <span className="sm:hidden">Таро</span>
          </TabsTrigger>
          <TabsTrigger value="zodiac" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Star className="w-3.5 h-3.5 mr-1"/>
            <span className="hidden sm:inline">По гороскопу</span>
            <span className="sm:hidden">Знак</span>
          </TabsTrigger>
          <TabsTrigger value="birthdate" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Calendar className="w-3.5 h-3.5 mr-1"/>
            <span className="hidden sm:inline">По дате рождения</span>
            <span className="sm:hidden">Дата</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tarot">
          <CompatibilityTarotTab/>
        </TabsContent>
        <TabsContent value="zodiac">
          <CompatibilityZodiacTab/>
        </TabsContent>
        <TabsContent value="birthdate">
          <CompatibilityBirthDateTab/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// === Таб 1: Совместимость по Таро (существующий) ===
function CompatibilityTarotTab() {
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
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          Совместимость по Таро
        </h3>
        <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
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

// === Таб 2: Совместимость по гороскопу ===
function CompatibilityZodiacTab() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [day1, setDay1] = useState("")
  const [month1, setMonth1] = useState("")
  const [day2, setDay2] = useState("")
  const [month2, setMonth2] = useState("")
  const [sign1, setSign1] = useState<ZodiacSign | null>(null)
  const [sign2, setSign2] = useState<ZodiacSign | null>(null)
  const [error, setError] = useState("")

  const handleCalculate = () => {
    const d1 = parseInt(day1), m1 = parseInt(month1)
    const d2 = parseInt(day2), m2 = parseInt(month2)
    if (!d1 || !m1 || !d2 || !m2) {
      setError("Заполните даты обоих партнёров")
      setSign1(null); setSign2(null)
      return
    }
    const s1 = getZodiacSign(d1, m1)
    const s2 = getZodiacSign(d2, m2)
    if (!s1 || !s2) {
      setError("Проверьте даты")
      setSign1(null); setSign2(null)
      return
    }
    setError("")
    setSign1(s1)
    setSign2(s2)
  }

  const compatibility = sign1 && sign2 ? getZodiacCompatibility(sign1, sign2) : null

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          Совместимость по гороскопу
        </h3>
        <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
          Введите даты рождения партнёров — узнаете знаки зодиака и совместимость
          по стихиям, сильные стороны союза и зоны роста.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Партнёр 1 */}
        <Card className="glass-card border-amber-400/20">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Партнёр 1</div>
            <Input
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Имя"
              className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 mb-3"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number" min="1" max="31"
                value={day1}
                onChange={(e) => setDay1(e.target.value)}
                placeholder="День"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
              <Input
                type="number" min="1" max="12"
                value={month1}
                onChange={(e) => setMonth1(e.target.value)}
                placeholder="Месяц"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
            </div>
            {sign1 && (
              <div className="mt-3 flex items-center gap-2 p-2 rounded-lg" style={{ background: `${sign1.color}20`, border: `1px solid ${sign1.color}40` }}>
                <span className="text-2xl">{sign1.symbol}</span>
                <div>
                  <div className="text-sm font-bold" style={{ color: sign1.color }}>{sign1.name}</div>
                  <div className="text-xs text-amber-200/70">{sign1.element}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Партнёр 2 */}
        <Card className="glass-card border-amber-400/20">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Партнёр 2</div>
            <Input
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Имя"
              className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 mb-3"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number" min="1" max="31"
                value={day2}
                onChange={(e) => setDay2(e.target.value)}
                placeholder="День"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
              <Input
                type="number" min="1" max="12"
                value={month2}
                onChange={(e) => setMonth2(e.target.value)}
                placeholder="Месяц"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
            </div>
            {sign2 && (
              <div className="mt-3 flex items-center gap-2 p-2 rounded-lg" style={{ background: `${sign2.color}20`, border: `1px solid ${sign2.color}40` }}>
                <span className="text-2xl">{sign2.symbol}</span>
                <div>
                  <div className="text-sm font-bold" style={{ color: sign2.color }}>{sign2.name}</div>
                  <div className="text-xs text-amber-200/70">{sign2.element}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-8">
        <Button onClick={handleCalculate} className="btn-gold px-8 py-3">
          <Heart className="w-5 h-5 mr-2"/>
          Узнать совместимость
        </Button>
        {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
      </div>

      {compatibility && sign1 && sign2 && (
        <div className="max-w-3xl mx-auto animate-fade-in space-y-4">
          {/* Шапка пары */}
          <Card className="glass-mystic border-amber-400/40">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
                <div className="text-center">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto flex items-center justify-center text-3xl sm:text-4xl"
                    style={{
                      backgroundColor: `${sign1.color}30`,
                      border: `2px solid ${sign1.color}`,
                      boxShadow: `0 0 20px ${sign1.color}40`,
                    }}
                  >
                    {sign1.symbol}
                  </div>
                  <div className="text-sm font-bold text-amber-100 mt-2">{name1 || "Партнёр 1"}</div>
                  <div className="text-xs" style={{ color: sign1.color }}>{sign1.name}</div>
                </div>
                <Heart className="w-10 h-10 text-rose-400 animate-pulse shrink-0"/>
                <div className="text-center">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto flex items-center justify-center text-3xl sm:text-4xl"
                    style={{
                      backgroundColor: `${sign2.color}30`,
                      border: `2px solid ${sign2.color}`,
                      boxShadow: `0 0 20px ${sign2.color}40`,
                    }}
                  >
                    {sign2.symbol}
                  </div>
                  <div className="text-sm font-bold text-amber-100 mt-2">{name2 || "Партнёр 2"}</div>
                  <div className="text-xs" style={{ color: sign2.color }}>{sign2.name}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Результат */}
          <Card className="glass-mystic border-amber-400/30 text-center">
            <CardContent className="pt-6">
              <div className="text-6xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                {compatibility.score}%
              </div>
              <h3 className="text-xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                {compatibility.title}
              </h3>
              <p className="text-sm text-amber-200/80 leading-relaxed">{compatibility.description}</p>
              <Progress value={compatibility.score} className="mt-4 bg-purple-950/60"/>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card border-emerald-400/20">
              <CardHeader>
                <CardTitle className="text-base text-emerald-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4"/>
                  Сильные стороны
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5">
                  {compatibility.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-amber-100/85 flex gap-2">
                      <span className="text-emerald-400">✦</span>
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
                    <li key={i} className="text-xs text-amber-100/85 flex gap-2">
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
        </div>
      )}
    </div>
  )
}

// === Таб 3: Совместимость по дате рождения (нумерология) ===
function CompatibilityBirthDateTab() {
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [day1, setDay1] = useState("")
  const [month1, setMonth1] = useState("")
  const [year1, setYear1] = useState("")
  const [day2, setDay2] = useState("")
  const [month2, setMonth2] = useState("")
  const [year2, setYear2] = useState("")
  const [result, setResult] = useState<{ birth1: BirthDateResult; birth2: BirthDateResult; compat: NumerologyCompatibility } | null>(null)
  const [error, setError] = useState("")

  const handleCalculate = () => {
    const d1 = parseInt(day1), m1 = parseInt(month1), y1 = parseInt(year1)
    const d2 = parseInt(day2), m2 = parseInt(month2), y2 = parseInt(year2)
    if (!d1 || !m1 || !y1 || !d2 || !m2 || !y2) {
      setError("Заполните все поля даты для обоих партнёров")
      setResult(null)
      return
    }
    const b1 = calculateBirthDate(d1, m1, y1)
    const b2 = calculateBirthDate(d2, m2, y2)
    if (!b1 || !b2) {
      setError("Проверьте корректность дат")
      setResult(null)
      return
    }
    setError("")
    setResult({ birth1: b1, birth2: b2, compat: calculateNumerologyCompatibility(b1, b2) })
  }

  const renderNumberCard = (n: number, title: string, name: string, accent: string) => (
    <div
      className="rounded-xl p-3 text-center"
      style={{
        background: `linear-gradient(135deg, ${accent}20, rgba(26,10,58,0.6))`,
        border: `1px solid ${accent}40`,
      }}
    >
      <div className="text-xs text-amber-200/70 mb-1">{name || "Партнёр"}</div>
      <div
        className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-xl font-bold mb-1"
        style={{
          background: `linear-gradient(135deg, ${accent}40, ${accent}20)`,
          border: `1px solid ${accent}60`,
          color: accent,
        }}
      >
        {n}
      </div>
      <div className="text-xs text-amber-200/80">{title}</div>
    </div>
  )

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          Совместимость по дате рождения
        </h3>
        <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
          Расчёт совместимости по трём числам нумерологии: Жизненный путь (по полной дате),
          Душа (по дню), Личность (по месяцу). Узнайте архетипную совместимость пары.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Партнёр 1 */}
        <Card className="glass-card border-amber-400/20">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Партнёр 1</div>
            <Input
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Имя"
              className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 mb-3"
            />
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number" min="1" max="31"
                value={day1}
                onChange={(e) => setDay1(e.target.value)}
                placeholder="День"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
              <Input
                type="number" min="1" max="12"
                value={month1}
                onChange={(e) => setMonth1(e.target.value)}
                placeholder="Месяц"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
              <Input
                type="number" min="1900" max="2100"
                value={year1}
                onChange={(e) => setYear1(e.target.value)}
                placeholder="Год"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
            </div>
          </CardContent>
        </Card>

        {/* Партнёр 2 */}
        <Card className="glass-card border-amber-400/20">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Партнёр 2</div>
            <Input
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Имя"
              className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 mb-3"
            />
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="number" min="1" max="31"
                value={day2}
                onChange={(e) => setDay2(e.target.value)}
                placeholder="День"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
              <Input
                type="number" min="1" max="12"
                value={month2}
                onChange={(e) => setMonth2(e.target.value)}
                placeholder="Месяц"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
              <Input
                type="number" min="1900" max="2100"
                value={year2}
                onChange={(e) => setYear2(e.target.value)}
                placeholder="Год"
                className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-8">
        <Button onClick={handleCalculate} className="btn-gold px-8 py-3">
          <Heart className="w-5 h-5 mr-2"/>
          Рассчитать совместимость
        </Button>
        {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
      </div>

      {result && (
        <div className="max-w-3xl mx-auto animate-fade-in space-y-4">
          {/* Три числа обоих партнёров */}
          <Card className="glass-mystic border-amber-400/40">
            <CardContent className="pt-6">
              <h4 className="text-sm font-semibold text-amber-200 mb-4 text-center" style={{ fontFamily: "var(--font-cinzel)" }}>
                Числа пары
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-amber-300/80 text-center mb-2">Жизненный путь</div>
                  <div className="grid grid-cols-2 gap-2">
                    {renderNumberCard(result.birth1.lifePathNumber, result.birth1.lifePath.title.slice(0, 20), name1, "#fbbf24")}
                    {renderNumberCard(result.birth2.lifePathNumber, result.birth2.lifePath.title.slice(0, 20), name2, "#fbbf24")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-amber-300/80 text-center mb-2">Душа</div>
                  <div className="grid grid-cols-2 gap-2">
                    {renderNumberCard(result.birth1.soulNumber, result.birth1.soul.title.slice(0, 20), name1, "#a78bfa")}
                    {renderNumberCard(result.birth2.soulNumber, result.birth2.soul.title.slice(0, 20), name2, "#a78bfa")}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-amber-300/80 text-center mb-2">Личность</div>
                  <div className="grid grid-cols-2 gap-2">
                    {renderNumberCard(result.birth1.personalityNumber, result.birth1.personality.title.slice(0, 20), name1, "#7dd3fc")}
                    {renderNumberCard(result.birth2.personalityNumber, result.birth2.personality.title.slice(0, 20), name2, "#7dd3fc")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Результат совместимости */}
          <Card className="glass-mystic border-amber-400/30 text-center">
            <CardContent className="pt-6">
              <div className="text-6xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                {result.compat.score}%
              </div>
              <h3 className="text-xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
                {result.compat.title}
              </h3>
              <p className="text-sm text-amber-200/80 leading-relaxed">{result.compat.description}</p>
              <Progress value={result.compat.score} className="mt-4 bg-purple-950/60"/>
              <div className="flex justify-center gap-3 mt-3 flex-wrap">
                <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs">
                  Путь: {result.compat.lifePathPair}
                </Badge>
                <Badge variant="outline" className="border-purple-400/40 text-purple-200 text-xs">
                  Душа: {result.compat.soulPair}
                </Badge>
                <Badge variant="outline" className="border-blue-400/40 text-blue-200 text-xs">
                  Личность: {result.compat.personalityPair}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card border-emerald-400/20">
              <CardHeader>
                <CardTitle className="text-base text-emerald-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4"/>
                  Сильные стороны
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-1.5">
                  {result.compat.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-amber-100/85 flex gap-2">
                      <span className="text-emerald-400">✦</span>
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
                  {result.compat.challenges.map((c, i) => (
                    <li key={i} className="text-xs text-amber-100/85 flex gap-2">
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
                {result.compat.advice}
              </p>
            </CardContent>
          </Card>

          {/* Краткие архетипы партнёров */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="glass-card border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-sm text-amber-100">
                  {name1 || "Партнёр 1"} — Путь {result.birth1.lifePathNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-amber-200/80 mb-1">{result.birth1.lifePath.title}</p>
                <p className="text-xs text-amber-100/75 italic">{result.birth1.lifePath.archetype}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-sm text-amber-100">
                  {name2 || "Партнёр 2"} — Путь {result.birth2.lifePathNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-amber-200/80 mb-1">{result.birth2.lifePath.title}</p>
                <p className="text-xs text-amber-100/75 italic">{result.birth2.lifePath.archetype}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

// ===================== PSYCHOLOGY =====================
function PsychologySection() {
  const [psychTab, setPsychTab] = useState<"archetype" | "birthdate" | "zodiac" | "color" | "geometry" | "palm" | "natal" | "name" | "etymology">("archetype")

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
          Архетипы и Самопознание
        </h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Девять инструментов самопознания: архетип Таро, дата рождения, гороскоп, цвет, геометрия, ладонь, натальная карта, нумерология имени и тайна имени (этимология).
        </p>
      </div>

      <Tabs value={psychTab} onValueChange={(v) => setPsychTab(v as typeof psychTab)}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-9 max-w-5xl mx-auto mb-8 bg-purple-950/40 border border-amber-400/20">
          <TabsTrigger value="archetype" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Brain className="w-3.5 h-3.5 mr-1"/>
            <span>Таро</span>
          </TabsTrigger>
          <TabsTrigger value="birthdate" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Calendar className="w-3.5 h-3.5 mr-1"/>
            <span>Дата</span>
          </TabsTrigger>
          <TabsTrigger value="zodiac" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Star className="w-3.5 h-3.5 mr-1"/>
            <span>Знак</span>
          </TabsTrigger>
          <TabsTrigger value="color" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Palette className="w-3.5 h-3.5 mr-1"/>
            <span>Цвет</span>
          </TabsTrigger>
          <TabsTrigger value="geometry" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Hexagon className="w-3.5 h-3.5 mr-1"/>
            <span>Форма</span>
          </TabsTrigger>
          <TabsTrigger value="palm" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Hand className="w-3.5 h-3.5 mr-1"/>
            <span>Ладонь</span>
          </TabsTrigger>
          <TabsTrigger value="natal" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Globe className="w-3.5 h-3.5 mr-1"/>
            <span>Натал</span>
          </TabsTrigger>
          <TabsTrigger value="name" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <Type className="w-3.5 h-3.5 mr-1"/>
            <span>Имя</span>
          </TabsTrigger>
          <TabsTrigger value="etymology" className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
            <BookOpen className="w-3.5 h-3.5 mr-1"/>
            <span>Тайна</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="archetype">
          <ArchetypeTab/>
        </TabsContent>
        <TabsContent value="birthdate">
          <BirthDateTab/>
        </TabsContent>
        <TabsContent value="zodiac">
          <ZodiacTab/>
        </TabsContent>
        <TabsContent value="color">
          <ColorTab/>
        </TabsContent>
        <TabsContent value="geometry">
          <GeometryTab/>
        </TabsContent>
        <TabsContent value="palm">
          <PalmTab/>
        </TabsContent>
        <TabsContent value="natal">
          <NatalChartTab/>
        </TabsContent>
        <TabsContent value="name">
          <NameNumerologySection/>
        </TabsContent>
        <TabsContent value="etymology">
          <NameSecretTab/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// === Таб 1: Архетипический портрет (существующий) ===
function ArchetypeTab() {
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
    <div>

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

// === Таб 2: Психология по дате рождения ===
function BirthDateTab() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [result, setResult] = useState<BirthDateResult | null>(null)
  const [error, setError] = useState("")

  const handleCalculate = () => {
    const d = parseInt(day)
    const m = parseInt(month)
    const y = parseInt(year)
    if (!d || !m || !y) {
      setError("Заполните все поля")
      setResult(null)
      return
    }
    const r = calculateBirthDate(d, m, y)
    if (!r) {
      setError("Проверьте корректность даты")
      setResult(null)
      return
    }
    setError("")
    setResult(r)
  }

  const renderNumberCard = (title: string, data: BirthDateResult["lifePath"], icon: string) => (
    <Card className="glass-mystic border-amber-400/30">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(251,191,36,0.3), rgba(167,139,250,0.3))",
              border: "1px solid rgba(251,191,36,0.5)",
              color: "#fef3c7",
            }}
          >
            {data.number}
          </div>
          <div>
            <Badge variant="outline" className="text-xs border-amber-400/40 text-amber-200/70">
              {icon}
            </Badge>
            <CardTitle className="text-lg text-amber-100 mt-1" style={{ fontFamily: "var(--font-cinzel)" }}>
              {data.title}
            </CardTitle>
            <CardDescription className="text-amber-200/70 text-xs">
              {data.archetype} · {data.element} · {data.planet}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-amber-300/80 mb-1">Психология</div>
          <p className="text-sm text-amber-100/85 leading-relaxed">{data.psychology}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass-card rounded-lg p-3">
            <div className="text-xs text-emerald-300 mb-1">✦ Силы</div>
            <ul className="text-xs text-amber-100/80 space-y-1">
              {data.strengths.map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          </div>
          <div className="glass-card rounded-lg p-3">
            <div className="text-xs text-rose-300 mb-1">✦ Тень</div>
            <ul className="text-xs text-amber-100/80 space-y-1">
              {data.challenges.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-amber-300/70 text-xs">💼 Карьера: </span>
            <span className="text-amber-100/85">{data.career}</span>
          </div>
          <div>
            <span className="text-amber-300/70 text-xs">❤️ Отношения: </span>
            <span className="text-amber-100/85">{data.relationships}</span>
          </div>
          <div>
            <span className="text-amber-300/70 text-xs">🌱 Путь роста: </span>
            <span className="text-amber-100/85">{data.growth}</span>
          </div>
        </div>
        <div className="glass-card rounded-lg p-3 border-purple-400/20">
          <div className="text-xs text-purple-300 mb-1">✦ Аффирмация</div>
          <p className="text-sm italic text-amber-100/90">{data.affirmation}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          Психология по дате рождения
        </h3>
        <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
          Расчёт трёх ключевых чисел: Жизненного Пути (по полной дате), Души (по дню) и
          Личности (по месяцу). Каждое число раскрывает свой архетип.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-6 grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">День</label>
          <Input
            type="number"
            min="1" max="31"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="15"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
          />
        </div>
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">Месяц</label>
          <Input
            type="number"
            min="1" max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="08"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
          />
        </div>
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">Год</label>
          <Input
            type="number"
            min="1900" max="2100"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="1990"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <Button onClick={handleCalculate} className="btn-gold px-8 py-3">
          <Sparkles className="w-5 h-5 mr-2"/>
          Рассчитать архетип
        </Button>
        {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
      </div>

      {result && (
        <div className="max-w-3xl mx-auto space-y-5 animate-fade-in">
          <div className="section-divider">
            <span>Ваш психологический портрет по дате</span>
          </div>
          {renderNumberCard("Число Жизненного Пути", result.lifePath, "🌟 Путь")}
          {renderNumberCard("Число Души", result.soul, "💫 Душа")}
          {renderNumberCard("Число Личности", result.personality, "🎭 Личность")}
        </div>
      )}
    </div>
  )
}


// === Таб 3: Гороскоп по дате рождения (европейский + китайский) ===
function ZodiacTab() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [sign, setSign] = useState<ZodiacSign | null>(null)
  const [chinese, setChinese] = useState<ChineseZodiac | null>(null)
  const [error, setError] = useState("")

  const handleCalculate = () => {
    const d = parseInt(day)
    const m = parseInt(month)
    const y = parseInt(year)
    if (!d || !m) {
      setError("Заполните день и месяц")
      setSign(null); setChinese(null)
      return
    }
    const s = getZodiacSign(d, m)
    if (!s) {
      setError("Проверьте дату")
      setSign(null); setChinese(null)
      return
    }
    setError("")
    setSign(s)
    if (y) setChinese(getChineseZodiac(y))
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          Гороскоп по дате рождения
        </h3>
        <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
          Две системы: европейский (западный) знак зодиака по дню и месяцу +
          китайский (восточный) знак года по 12-летнему и 60-летнему циклу с пятью стихиями.
        </p>
      </div>

      <div className="max-w-sm mx-auto mb-6 grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">День</label>
          <Input type="number" min="1" max="31" value={day}
            onChange={(e) => setDay(e.target.value)} placeholder="15"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
        </div>
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">Месяц</label>
          <Input type="number" min="1" max="12" value={month}
            onChange={(e) => setMonth(e.target.value)} placeholder="08"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
        </div>
        <div>
          <label className="text-xs text-amber-200/70 mb-1 block">Год</label>
          <Input type="number" min="1900" max="2100" value={year}
            onChange={(e) => setYear(e.target.value)} placeholder="1990"
            className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
        </div>
      </div>

      <div className="text-center mb-8">
        <Button onClick={handleCalculate} className="btn-gold px-8 py-3">
          <Star className="w-5 h-5 mr-2"/>
          Узнать знаки зодиака
        </Button>
        {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
        {year && !sign && <p className="text-xs text-amber-200/50 mt-2">Год нужен для китайского гороскопа</p>}
      </div>

      {sign && (
        <div className="max-w-3xl mx-auto animate-fade-in space-y-5">
          {/* Разделитель — европейский */}
          <div className="section-divider">
            <span>♈ Европейский гороскоп</span>
          </div>

          {/* Шапка европейского знака */}
          <Card className="mb-4 relative overflow-hidden" style={{
            background: `linear-gradient(135deg, ${sign.color}30, rgba(26,10,58,0.6))`,
            border: `1px solid ${sign.color}60`,
          }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-5xl shrink-0" style={{
                  backgroundColor: `${sign.color}30`, border: `2px solid ${sign.color}`, boxShadow: `0 0 25px ${sign.color}50`,
                }}>
                  {sign.symbol}
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1" style={{ color: sign.color, fontFamily: "var(--font-cinzel)" }}>{sign.name}</h3>
                  <p className="text-amber-100/80 text-sm">{sign.dates}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="border" style={{ backgroundColor: `${sign.color}25`, color: sign.color, borderColor: `${sign.color}50` }}>{sign.element}</Badge>
                    <Badge variant="outline" className="border-amber-400/40 text-amber-200">{sign.quality}</Badge>
                    <Badge variant="outline" className="border-amber-400/40 text-amber-200">{sign.ruler}</Badge>
                  </div>
                </div>
              </div>
              <p className="text-amber-200/80 italic text-sm mt-4">{sign.archetype}</p>
            </CardContent>
          </Card>

          <Card className="glass-mystic border-amber-400/30 mb-4">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Психология</div>
              <p className="text-amber-100/85 text-sm leading-relaxed">{sign.psychology}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Card className="glass-card border-emerald-400/20">
              <CardHeader><CardTitle className="text-base text-emerald-200">✦ Силы</CardTitle></CardHeader>
              <CardContent className="pt-0"><ul className="space-y-1.5">
                {sign.strengths.map((s, i) => <li key={i} className="text-xs text-amber-100/85 flex gap-2"><span className="text-emerald-400">✦</span><span>{s}</span></li>)}
              </ul></CardContent>
            </Card>
            <Card className="glass-card border-rose-400/20">
              <CardHeader><CardTitle className="text-base text-rose-200">✦ Тень</CardTitle></CardHeader>
              <CardContent className="pt-0"><ul className="space-y-1.5">
                {sign.shadow.map((s, i) => <li key={i} className="text-xs text-amber-100/85 flex gap-2"><span className="text-rose-400">✦</span><span>{s}</span></li>)}
              </ul></CardContent>
            </Card>
          </div>

          <Card className="glass-card border-amber-400/20 mb-4">
            <CardContent className="pt-5 space-y-3">
              <div><div className="text-xs text-amber-300/70 mb-1">💼 Карьера</div><p className="text-sm text-amber-100/85">{sign.career}</p></div>
              <div><div className="text-xs text-amber-300/70 mb-1">❤️ Отношения</div><p className="text-sm text-amber-100/85">{sign.relationships}</p></div>
              <div><div className="text-xs text-amber-300/70 mb-1">🌱 Путь роста</div><p className="text-sm text-amber-100/85">{sign.growth}</p></div>
              <div><div className="text-xs text-amber-300/70 mb-1">✨ Совместимость</div>
                <div className="flex flex-wrap gap-2 mt-1">{sign.compatibility.map((c, i) => <Badge key={i} variant="outline" className="border-amber-400/40 text-amber-200">{c}</Badge>)}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-mystic border-purple-400/30 mb-6">
            <CardContent className="pt-5">
              <div className="text-xs text-purple-300 mb-1">✦ Аффирмация</div>
              <p className="text-lg italic text-amber-100 text-center">{sign.affirmation}</p>
            </CardContent>
          </Card>

          {/* === КИТАЙСКИЙ ГОРОСКОП === */}
          {chinese && (
            <>
              <div className="section-divider">
                <span>🐉 Китайский гороскоп</span>
              </div>

              <Card className="mb-4 relative overflow-hidden" style={{
                background: `linear-gradient(135deg, ${chinese.elementColor}25, rgba(26,10,58,0.6))`,
                border: `1px solid ${chinese.elementColor}50`,
              }}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-5xl shrink-0" style={{
                      backgroundColor: `${chinese.elementColor}25`, border: `2px solid ${chinese.elementColor}`, boxShadow: `0 0 25px ${chinese.elementColor}40`,
                    }}>
                      {chinese.animalSymbol}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-1" style={{ color: chinese.elementColor, fontFamily: "var(--font-cinzel)" }}>
                        {chinese.animal}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge className="border" style={{ backgroundColor: `${chinese.elementColor}20`, color: chinese.elementColor, borderColor: `${chinese.elementColor}50` }}>
                          Стихия: {chinese.element}
                        </Badge>
                        <Badge variant="outline" className="border-amber-400/40 text-amber-200">
                          60-летний цикл
                        </Badge>
                      </div>
                      <p className="text-xs text-amber-200/60 mt-2">
                        Годы: {chinese.years.join(", ")}
                      </p>
                    </div>
                  </div>
                  <p className="text-amber-200/80 italic text-sm mt-4">{chinese.archetype}</p>
                </CardContent>
              </Card>

              <Card className="glass-mystic border-amber-400/30 mb-4">
                <CardContent className="pt-5">
                  <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Психология</div>
                  <p className="text-amber-100/85 text-sm leading-relaxed">{chinese.psychology}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Card className="glass-card border-emerald-400/20">
                  <CardHeader><CardTitle className="text-base text-emerald-200">✦ Силы</CardTitle></CardHeader>
                  <CardContent className="pt-0"><ul className="space-y-1.5">
                    {chinese.strengths.map((s, i) => <li key={i} className="text-xs text-amber-100/85 flex gap-2"><span className="text-emerald-400">✦</span><span>{s}</span></li>)}
                  </ul></CardContent>
                </Card>
                <Card className="glass-card border-rose-400/20">
                  <CardHeader><CardTitle className="text-base text-rose-200">✦ Тень</CardTitle></CardHeader>
                  <CardContent className="pt-0"><ul className="space-y-1.5">
                    {chinese.challenges.map((c, i) => <li key={i} className="text-xs text-amber-100/85 flex gap-2"><span className="text-rose-400">✦</span><span>{c}</span></li>)}
                  </ul></CardContent>
                </Card>
              </div>

              <Card className="glass-card border-amber-400/20 mb-4">
                <CardContent className="pt-5 space-y-3">
                  <div><div className="text-xs text-amber-300/70 mb-1">💼 Карьера</div>
                    <div className="flex flex-wrap gap-1.5">{chinese.career.map((c, i) => <Badge key={i} variant="outline" className="text-xs border-amber-400/30 text-amber-200">{c}</Badge>)}</div>
                  </div>
                  <div><div className="text-xs text-amber-300/70 mb-1">❤️ Отношения</div><p className="text-sm text-amber-100/85">{chinese.relationships}</p></div>
                  <div><div className="text-xs text-amber-300/70 mb-1">✨ Совместимость</div>
                    <div className="flex flex-wrap gap-2 mt-1">{chinese.compatibility.map((c, i) => <Badge key={i} variant="outline" className="border-amber-400/40 text-amber-200">{c}</Badge>)}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-mystic border-purple-400/30">
                <CardContent className="pt-5">
                  <div className="text-xs text-purple-300 mb-1">✦ Аффирмация</div>
                  <p className="text-lg italic text-amber-100 text-center">{chinese.affirmation}</p>
                </CardContent>
              </Card>
            </>
          )}

          {/* === КАМЕНЬ ПО МЕСЯЦУ === */}
          {(() => {
            const stone = sign ? getBirthStone(parseInt(month)) : null
            if (!stone) return null
            return (
              <>
                <div className="section-divider">
                  <span>💎 Камень по месяцу рождения</span>
                </div>
                <Card className="mb-4 relative overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${stone.hexColor}25, rgba(26,10,58,0.6))`,
                  border: `1px solid ${stone.hexColor}50`,
                }}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full shrink-0" style={{
                        background: `radial-gradient(circle at 30% 30%, ${stone.hexColor}, ${stone.hexColor}80)`,
                        boxShadow: `0 0 20px ${stone.hexColor}60`,
                        border: `2px solid ${stone.hexColor}`,
                      }}/>
                      <div>
                        <h3 className="text-2xl font-bold mb-1" style={{ color: stone.hexColor, fontFamily: "var(--font-cinzel)" }}>{stone.name}</h3>
                        <Badge variant="outline" className="text-xs border" style={{ backgroundColor: `${stone.hexColor}20`, color: stone.hexColor, borderColor: `${stone.hexColor}50` }}>{stone.color}</Badge>
                      </div>
                    </div>
                    <p className="text-amber-100/85 text-sm leading-relaxed mt-4">{stone.psychology}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {stone.properties.map((p, i) => <Badge key={i} variant="outline" className="text-xs border-amber-400/30 text-amber-200">{p}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              </>
            )
          })()}

          {/* === ЦВЕТОЧНЫЙ ГОРОСКОП === */}
          {(() => {
            const flower = sign ? getFlowerSign(parseInt(month)) : null
            if (!flower) return null
            return (
              <>
                <div className="section-divider">
                  <span>🌸 Цветочный гороскоп</span>
                </div>
                <Card className="mb-4 relative overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${flower.color}20, rgba(26,10,58,0.6))`,
                  border: `1px solid ${flower.color}40`,
                }}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center text-4xl shrink-0" style={{
                        background: `${flower.color}25`, border: `2px solid ${flower.color}60`,
                      }}>{flower.emoji}</div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1" style={{ color: flower.color, fontFamily: "var(--font-cinzel)" }}>{flower.name}</h3>
                      </div>
                    </div>
                    <p className="text-amber-100/85 text-sm leading-relaxed mt-4">{flower.psychology}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {flower.qualities.map((q, i) => <Badge key={i} variant="outline" className="text-xs border-amber-400/30 text-amber-200">{q}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              </>
            )
          })()}

          {/* === КЕЛЬТСКИЙ ГОРОСКОП ДЕРЕВЬЕВ === */}
          {(() => {
            const tree = sign ? getCelticTree(parseInt(month), parseInt(day)) : null
            if (!tree) return null
            return (
              <>
                <div className="section-divider">
                  <span>🌳 Кельтский гороскоп деревьев</span>
                </div>
                <Card className="mb-4 relative overflow-hidden" style={{
                  background: `linear-gradient(135deg, rgba(134,239,172,0.15), rgba(26,10,58,0.6))`,
                  border: `1px solid rgba(134,239,172,0.4)`,
                }}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center text-4xl shrink-0" style={{
                        background: "rgba(134,239,172,0.2)", border: "2px solid rgba(134,239,172,0.5)",
                      }}>{tree.symbol}</div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-emerald-300" style={{ fontFamily: "var(--font-cinzel)" }}>{tree.name}</h3>
                        <p className="text-xs text-amber-200/60">{tree.dates} · {tree.element}</p>
                      </div>
                    </div>
                    <p className="text-amber-100/85 text-sm leading-relaxed mt-4">{tree.psychology}</p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="glass-card rounded-lg p-2">
                        <div className="text-xs text-emerald-300 mb-1">✦ Силы</div>
                        <ul className="text-xs text-amber-100/80 space-y-0.5">
                          {tree.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                        </ul>
                      </div>
                      <div className="glass-card rounded-lg p-2">
                        <div className="text-xs text-rose-300 mb-1">✦ Вызовы</div>
                        <ul className="text-xs text-amber-100/80 space-y-0.5">
                          {tree.challenges.map((c, i) => <li key={i}>• {c}</li>)}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}

// === Таб 4: Цветовой архетип (интерактивный квиз) ===
function ColorTab() {
  return <ColorQuiz/>
}

// === Таб 5: Геометрический архетип (интерактивный квиз) ===
function GeometryTab() {
  return <GeometryQuiz/>
}

// === Таб 6: Линии на ладони (интерактивная хиромантия) ===
function PalmTab() {
  return <PalmInteractive/>
}

// === Таб 7: Натальная карта ===
function NatalChartTab() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [result, setResult] = useState<NatalChartResult | null>(null)
  const [error, setError] = useState("")

  const handleCalculate = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year)
    const h = parseInt(hour) || 12, min = parseInt(minute) || 0
    if (!d || !m || !y) {
      setError("Заполните дату рождения")
      setResult(null)
      return
    }
    const r = calculateNatalChart(d, m, y, h, min)
    if (!r) {
      setError("Проверьте корректность даты")
      setResult(null)
      return
    }
    setError("")
    setResult(r)
  }

  // SVG зодиакального круга
  const renderNatalWheel = (chart: NatalChartResult) => {
    const cx = 200, cy = 200
    const r1 = 180 // внешний круг
    const r2 = 150 // круг знаков
    const r3 = 110 // круг планет
    const r4 = 70 // внутренний круг

    return (
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-md mx-auto">
        <defs>
          <radialGradient id="natal-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.08)"/>
            <stop offset="100%" stopColor="rgba(167,139,250,0.05)"/>
          </radialGradient>
        </defs>

        {/* Фон */}
        <circle cx={cx} cy={cy} r={r1} fill="url(#natal-bg)" stroke="rgba(251,191,36,0.3)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="0.5"/>
        <circle cx={cx} cy={cy} r={r3} fill="none" stroke="rgba(251,191,36,0.15)" strokeWidth="0.5"/>
        <circle cx={cx} cy={cy} r={r4} fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="0.5"/>

        {/* 12 секторов (знаков) */}
        {zodiacInNatal.map((sign, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180
          const angleNext = ((i + 1) * 30 - 90) * Math.PI / 180
          const x1 = cx + Math.cos(angle) * r1
          const y1 = cy + Math.sin(angle) * r1
          const x2 = cx + Math.cos(angleNext) * r1
          const y2 = cy + Math.sin(angleNext) * r1
          const x3 = cx + Math.cos(angleNext) * r2
          const y3 = cy + Math.sin(angleNext) * r2
          const x4 = cx + Math.cos(angle) * r2
          const y4 = cy + Math.sin(angle) * r2

          // Позиция символа знака
          const midAngle = ((i * 30 + 15) - 90) * Math.PI / 180
          const sx = cx + Math.cos(midAngle) * ((r1 + r2) / 2)
          const sy = cy + Math.sin(midAngle) * ((r1 + r2) / 2)

          // Линии-разделители
          const lx1 = cx + Math.cos(angle) * r4
          const ly1 = cy + Math.sin(angle) * r4
          const lx2 = cx + Math.cos(angle) * r1
          const ly2 = cy + Math.sin(angle) * r1

          return (
            <g key={i}>
              <path d={`M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`}
                fill={sign.element === "Огонь" ? "rgba(251,146,60,0.08)"
                  : sign.element === "Земля" ? "rgba(163,230,53,0.08)"
                  : sign.element === "Воздух" ? "rgba(125,211,252,0.08)"
                  : "rgba(96,165,250,0.08)"}
                stroke="none"
              />
              <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="rgba(251,191,36,0.15)" strokeWidth="0.5"/>
              <text x={sx} y={sy + 5} fontSize="14" textAnchor="middle" fill="rgba(254,243,199,0.7)" fontWeight="bold">
                {sign.symbol}
              </text>
            </g>
          )
        })}

        {/* Линии домов (круг r4) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180
          const x1 = cx + Math.cos(angle) * r4
          const y1 = cy + Math.sin(angle) * r4
          const x2 = cx + Math.cos(angle) * r3
          const y2 = cy + Math.sin(angle) * r3
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(167,139,250,0.2)" strokeWidth="0.5"/>
        })}

        {/* Планеты на своих позициях + расчёт координат для аспектов */}
        {(() => {
          // Сначала вычислим позиции всех планет
          const planetCoords = chart.planets.map((pp, i) => {
            const angle = ((pp.signIndex * 30 + pp.degree) - 90) * Math.PI / 180
            const offset = i % 3 === 0 ? 0 : i % 3 === 1 ? -8 : 8
            const pr = r3 + offset
            return {
              px: cx + Math.cos(angle) * pr,
              py: cy + Math.sin(angle) * pr,
              pp,
              i,
            }
          })

          // Вычислим аспекты
          const calculatedAspects = calculateAspects(chart.planets)

          return (
            <>
              {/* Линии аспектов */}
              {calculatedAspects.map((asp, i) => {
                const idx1 = chart.planets.findIndex(p => p.planet.id === asp.planet1.id)
                const idx2 = chart.planets.findIndex(p => p.planet.id === asp.planet2.id)
                if (idx1 === -1 || idx2 === -1) return null
                const c1 = planetCoords[idx1]
                const c2 = planetCoords[idx2]
                if (!c1 || !c2) return null

                const color = asp.aspect.type === "harmonious"
                  ? "rgba(52,211,153,0.4)"
                  : asp.aspect.type === "tense"
                  ? "rgba(248,113,113,0.4)"
                  : "rgba(251,191,36,0.35)"
                const sw = asp.strength === "точный" ? 2 : asp.strength === "сильный" ? 1.5 : 1
                const dash = asp.aspect.name === "Квадрат" ? "4 2"
                  : asp.aspect.name === "Оппозиция" ? "6 3"
                  : asp.aspect.name === "Секстиль" ? "2 2"
                  : "none"

                return (
                  <line key={`asp-${i}`}
                    x1={c1.px} y1={c1.py} x2={c2.px} y2={c2.py}
                    stroke={color} strokeWidth={sw} strokeDasharray={dash}
                    opacity={asp.strength === "умеренный" ? 0.5 : 0.8}
                  />
                )
              })}

              {/* Сами планеты */}
              {planetCoords.map(({ px, py, pp, i }) => (
                <g key={`planet-${i}`}>
                  <circle cx={px} cy={py} r="12" fill={pp.planet.color} opacity="0.15"/>
                  <text x={px} y={py + 5} fontSize="16" textAnchor="middle" fill={pp.planet.color} fontWeight="bold">
                    {pp.planet.symbol}
                  </text>
                  <text x={px} y={py + 18} fontSize="6" textAnchor="middle" fill="rgba(254,243,199,0.5)">
                    {Math.round(pp.degree)}°
                  </text>
                </g>
              ))}
            </>
          )
        })()}

        {/* Асцендент — отмечен на круге */}
        <line x1={cx} y1={cy} x2={cx + Math.cos((-90) * Math.PI / 180) * r1} y2={cy + Math.sin((-90) * Math.PI / 180) * r1}
          stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" strokeDasharray="3 2"/>

        {/* Центр */}
        <circle cx={cx} cy={cy} r="4" fill="rgba(251,191,36,0.6)"/>
        <text x={cx} y={cy - 12} fontSize="8" textAnchor="middle" fill="rgba(254,243,199,0.4)">ASC</text>

        {/* Подпись даты */}
        <text x={cx} y={cy + 8} fontSize="7" textAnchor="middle" fill="rgba(254,243,199,0.3)">
          {chart.chartDate.slice(0, 10)}
        </text>
      </svg>
    )
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-amber-100 mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>
          Натальная карта
        </h3>
        <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
          Полная натальная карта по дате и времени рождения: 10 планет в знаках зодиака,
          Асцендент, 12 домов, доминирующая стихия и качество. Визуализация зодиакального круга.
        </p>
      </div>

      {!result && (
        <Card className="glass-mystic border-amber-400/30 mb-6 max-w-xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <Globe className="w-10 h-10 text-amber-300 mx-auto mb-2"/>
              <p className="text-sm text-amber-100/80">
                Введите дату и время рождения для построения натальной карты.
                Время рождения влияет на Асцендент и положения домов.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
              <div>
                <label className="text-xs text-amber-200/70 mb-1 block">День</label>
                <Input type="number" min="1" max="31" value={day}
                  onChange={(e) => setDay(e.target.value)} placeholder="15"
                  className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
              </div>
              <div>
                <label className="text-xs text-amber-200/70 mb-1 block">Месяц</label>
                <Input type="number" min="1" max="12" value={month}
                  onChange={(e) => setMonth(e.target.value)} placeholder="08"
                  className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
              </div>
              <div>
                <label className="text-xs text-amber-200/70 mb-1 block">Год</label>
                <Input type="number" min="1900" max="2100" value={year}
                  onChange={(e) => setYear(e.target.value)} placeholder="1990"
                  className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
              </div>
              <div>
                <label className="text-xs text-amber-200/70 mb-1 block">Час</label>
                <Input type="number" min="0" max="23" value={hour}
                  onChange={(e) => setHour(e.target.value)} placeholder="12"
                  className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
              </div>
              <div>
                <label className="text-xs text-amber-200/70 mb-1 block">Мин</label>
                <Input type="number" min="0" max="59" value={minute}
                  onChange={(e) => setMinute(e.target.value)} placeholder="00"
                  className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/>
              </div>
            </div>
            <p className="text-xs text-amber-200/50 mb-4 text-center">
              Если время рождения неизвестно — оставьте пустым, будет использовано 12:00
            </p>
            <div className="text-center">
              <Button onClick={handleCalculate} className="btn-gold px-8 py-3">
                <Globe className="w-5 h-5 mr-2"/>
                Построить натальную карту
              </Button>
              {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-5">
          {/* Зодиакальный круг */}
          <Card className="glass-mystic border-amber-400/40">
            <CardContent className="pt-6">
              {renderNatalWheel(result)}
            </CardContent>
          </Card>

          {/* Сводка */}
          <Card className="glass-mystic border-amber-400/30">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Сводка карты</div>
              <p className="text-amber-100/85 text-sm leading-relaxed">{result.summary}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs">
                  ☉ Солнце: {result.sunSign.name}
                </Badge>
                <Badge variant="outline" className="border-purple-400/40 text-purple-200 text-xs">
                  ☾ Луна: {result.moonSign.name}
                </Badge>
                <Badge variant="outline" className="border-emerald-400/40 text-emerald-200 text-xs">
                  ASC: {result.ascendant.name}
                </Badge>
                <Badge variant="outline" className="border-blue-400/40 text-blue-200 text-xs">
                  MC: {result.midheaven.name}
                </Badge>
                <Badge variant="outline" className="border-rose-400/40 text-rose-200 text-xs">
                  Стихия: {result.dominantElement}
                </Badge>
                <Badge variant="outline" className="border-cyan-400/40 text-cyan-200 text-xs">
                  Качество: {result.dominantQuality}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Планеты в знаках */}
          <Card className="glass-card border-amber-400/20">
            <CardHeader>
              <CardTitle className="text-lg text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                Планеты в знаках зодиака
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.planets.map((pp, i) => (
                <div key={i} className="border-l-2 pl-3" style={{ borderColor: `${pp.planet.color}50` }}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-lg" style={{ color: pp.planet.color }}>{pp.planet.symbol}</span>
                    <span className="text-sm font-bold text-amber-100">{pp.planet.name}</span>
                    <span className="text-xs text-amber-200/70">в</span>
                    <span className="text-sm font-semibold" style={{ color: pp.planet.color }}>{pp.sign.symbol} {pp.sign.name}</span>
                    <span className="text-xs text-amber-200/50">· {Math.round(pp.degree)}°</span>
                    <Badge variant="outline" className="text-xs border-amber-400/30 text-amber-200/60">
                      Дом {pp.house}
                    </Badge>
                  </div>
                  <p className="text-xs text-amber-100/75 leading-relaxed italic">
                    {pp.interpretation}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Стихии */}
          <Card className="glass-card border-amber-400/20">
            <CardHeader>
              <CardTitle className="text-base text-amber-100">Баланс стихий</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(result.elementCounts).map(([el, count]) => (
                <div key={el} className="flex items-center gap-2">
                  <div className="text-xs text-amber-100/70 w-16">{el}</div>
                  <div className="flex-1 bg-purple-950/40 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(count / 10) * 100}%`,
                        background: el === "Огонь" ? "#fb923c"
                          : el === "Земля" ? "#a3e635"
                          : el === "Воздух" ? "#7dd3fc"
                          : "#60a5fa",
                      }}
                    />
                  </div>
                  <div className="text-xs text-amber-200/60 w-6 text-right">{count}</div>
                </div>
              ))}
              <p className="text-xs text-amber-100/60 mt-2 italic">
                Доминирующая стихия — {result.dominantElement}. Это определяет общий тон вашей энергии.
              </p>
            </CardContent>
          </Card>

          {/* 12 домов */}
          <Card className="glass-card border-amber-400/20">
            <CardHeader>
              <CardTitle className="text-base text-amber-100">12 домов натальной карты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {natalHouses.map((house) => (
                  <div key={house.number} className="glass-card rounded-lg p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-amber-300">{house.number}</span>
                      <span className="text-xs font-semibold text-amber-100">{house.name}</span>
                    </div>
                    <p className="text-xs text-amber-100/60 leading-relaxed">{house.sphere}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-100/50 mt-3 italic">
                Дома показывают сферы жизни, в которых проявляются энергии планет.
                Номер дома планеты указан в разделе "Планеты в знаках зодиака".
              </p>
            </CardContent>
          </Card>

          {/* Аспекты между планетами */}
          {(() => {
            const calculatedAspects = calculateAspects(result.planets)
            const tenseAspects = calculatedAspects.filter(a => a.aspect.type === "tense")
            const harmoniousAspects = calculatedAspects.filter(a => a.aspect.type === "harmonious")
            const conjunctions = calculatedAspects.filter(a => a.aspect.type === "neutral")

            return (
              <Card className="glass-card border-amber-400/20">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                    Аспекты между планетами ({calculatedAspects.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Легенда */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-0.5 bg-emerald-400/60"/>
                      <span className="text-emerald-200">Гармоничные ({harmoniousAspects.length})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-0.5 bg-rose-400/60"/>
                      <span className="text-rose-200">Напряжённые ({tenseAspects.length})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-0.5 bg-amber-400/60"/>
                      <span className="text-amber-200">Соединения ({conjunctions.length})</span>
                    </div>
                  </div>

                  {/* Список аспектов */}
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {calculatedAspects.map((asp, i) => (
                      <div key={i} className="glass-card rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-base" style={{ color: asp.planet1.color }}>{asp.planet1.symbol}</span>
                          <span className="text-xs font-medium text-amber-100">{asp.planet1.name}</span>
                          <span className="text-xs text-amber-200/50">→</span>
                          <span className="text-xs" style={{
                            color: asp.aspect.type === "harmonious" ? "#34d399"
                              : asp.aspect.type === "tense" ? "#f87171" : "#fbbf24"
                          }}>
                            {asp.aspect.symbol} {asp.aspect.name}
                          </span>
                          <span className="text-xs text-amber-200/50">→</span>
                          <span className="text-base" style={{ color: asp.planet2.color }}>{asp.planet2.symbol}</span>
                          <span className="text-xs font-medium text-amber-100">{asp.planet2.name}</span>
                          <Badge variant="outline" className={`text-xs ml-auto ${
                            asp.strength === "точный" ? "border-amber-400/60 text-amber-200"
                            : asp.strength === "сильный" ? "border-purple-400/40 text-purple-200"
                            : "border-slate-400/30 text-slate-300"
                          }`}>
                            {asp.strength} · орб {Math.round(asp.orb)}°
                          </Badge>
                        </div>
                        <p className="text-xs text-amber-100/75 leading-relaxed italic">
                          {asp.interpretation}
                        </p>
                      </div>
                    ))}
                  </div>

                  {calculatedAspects.length === 0 && (
                    <p className="text-sm text-amber-200/60 text-center py-4">
                      В вашей карте нет значимых аспектов в пределах допустимого орба.
                      Это бывает редко — возможно, планеты находятся в промежуточных положениях.
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })()}

          {/* Ключевые даты (возрастные точки) */}
          {(() => {
            const keyDates = calculateKeyDates(
              parseInt(year || "1990"),
              parseInt(month || "1"),
              parseInt(day || "1")
            )
            return (
              <Card className="glass-card border-amber-400/20">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                    Ключевые даты жизни ({keyDates.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-amber-200/60 mb-4">
                    Возрастные точки — это моменты, когда планеты возвращаются на свои натальные позиции
                    или делают значимые аспекты. Каждая отмечает важный жизненный переход.
                  </p>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {keyDates.map((kd, i) => (
                      <div key={i} className="glass-card rounded-lg p-3 flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                          style={{
                            background: kd.significance === "высокая"
                              ? "rgba(251,191,36,0.25)"
                              : "rgba(167,139,250,0.15)",
                            border: kd.significance === "высокая"
                              ? "1px solid rgba(251,191,36,0.5)"
                              : "1px solid rgba(167,139,250,0.3)",
                            color: kd.significance === "высокая" ? "#fbbf24" : "#c4b5fd",
                          }}
                        >
                          {kd.age}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-bold text-amber-100">{kd.title}</span>
                            <span className="text-xs text-amber-200/50">{kd.planet}</span>
                            {kd.significance === "высокая" && (
                              <Badge className="text-xs bg-amber-400/20 text-amber-200 border border-amber-400/40">
                                высокая значимость
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-amber-300/70 mb-1">
                            Возраст {kd.age} · {kd.date}
                          </div>
                          <p className="text-xs text-amber-100/75 leading-relaxed">
                            {kd.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })()}

          {/* Кнопка перестроения */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setResult(null)}
              className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
            >
              <Globe className="w-4 h-4 mr-2"/>
              Новая карта
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ===================== RUNES (РУНЫ) =====================
function RunesSection() {
  const [drawnRunes, setDrawnRunes] = useState<RuneDraw[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([])
  const [question, setQuestion] = useState("")

  const draw = useCallback(() => {
    setIsDrawing(true)
    setDrawnRunes([])
    setRevealedIndexes([])
    setTimeout(() => {
      setDrawnRunes(drawRunes(3))
      setIsDrawing(false)
      saveReading({
        type: "psychology",
        typeLabel: "Расклад рун (3 руны)",
        question: question || undefined,
        cards: [],
      })
    }, 1200)
  }, [question])

  const revealRune = (i: number) => {
    if (!revealedIndexes.includes(i)) setRevealedIndexes([...revealedIndexes, i])
  }

  return (
    <div>
      <p className="text-center text-amber-200/70 max-w-2xl mx-auto mb-6 text-sm">
        24 руны + пустая руна Вирд. Расклад из 3 рун: прошлое, настоящее, будущее.
      </p>

      <ReadingQuestionInput question={question} setQuestion={setQuestion} placeholder="О чём хотите спросить руны?" />

      {!drawnRunes.length && !isDrawing && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-3">
            {[0,1,2].map((i) => <div key={i} style={{ transform: `rotate(${(i-1)*5}deg)` }}>
              <div className="w-20 h-28 rounded-xl glass-mystic border-amber-400/30 flex items-center justify-center">
                <span className="text-3xl text-amber-300/30">ᚱ</span>
              </div>
            </div>)}
          </div>
          <Button onClick={draw} className="btn-gold px-8 py-3"><Flame className="w-5 h-5 mr-2"/>Бросить руны</Button>
        </div>
      )}

      {isDrawing && <div className="text-center py-8"><div className="spinner-mystic mx-auto mb-4"/><p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>Руны выбирают вас...</p></div>}

      {drawnRunes.length > 0 && !isDrawing && (
        <div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {drawnRunes.map((rd, i) => {
              const revealed = revealedIndexes.includes(i)
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-xs uppercase tracking-wider text-amber-200/60 mb-2">{rd.position}</div>
                  <button onClick={() => revealRune(i)} className="w-24 h-32 rounded-xl glass-mystic border-amber-400/40 flex items-center justify-center transition-all hover:scale-105">
                    {revealed ? (
                      <span className="text-5xl text-amber-300" style={{ transform: rd.isReversed ? "rotate(180deg)" : "none" }}>{rd.rune.symbol}</span>
                    ) : <span className="text-3xl text-amber-300/30">?</span>}
                  </button>
                  {revealed && (
                    <div className="mt-2 text-center animate-fade-in">
                      <div className="text-sm font-bold text-amber-100">{rd.rune.name}</div>
                      {rd.isReversed && <div className="text-xs text-rose-300">перевёрнута</div>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {revealedIndexes.length === 3 && (
            <div className="max-w-2xl mx-auto space-y-3 animate-fade-in">
              {drawnRunes.map((rd, i) => (
                <Card key={i} className="glass-mystic border-amber-400/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs">{rd.position}</Badge>
                      <span className="text-2xl text-amber-300" style={{ transform: rd.isReversed ? "rotate(180deg)" : "none", display: "inline-block" }}>{rd.rune.symbol}</span>
                      <h4 className="text-lg font-bold text-amber-100">{rd.rune.name}</h4>
                      {rd.isReversed && <Badge variant="outline" className="text-xs text-rose-300 border-rose-400/40">перевёрнута</Badge>}
                    </div>
                    <p className="text-sm text-amber-100/80 italic">{rd.rune.psychology}</p>
                    <p className="text-xs text-amber-100/70 mt-2">
                      <span className="text-emerald-300">Прямое:</span> {rd.rune.upright}
                    </p>
                    {rd.rune.id !== 25 && rd.rune.reversed !== rd.rune.upright && (
                      <p className="text-xs text-amber-100/70 mt-1">
                        <span className="text-rose-300">Перевёрнутое:</span> {rd.rune.reversed}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button onClick={draw} variant="outline" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"><Flame className="w-4 h-4 mr-2"/>Новый расклад</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===================== MOON (ЛУННЫЙ КАЛЕНДАРЬ) =====================
function MoonSection() {
  const [moonData, setMoonData] = useState(() => getMoonPhase(new Date()))
  const advice = getMoonAdvice(moonData.phaseIndex)
  const influence = getMoonInfluence(moonData.phaseIndex, moonData.zodiacSign)
  const lunarDay = getLunarDay(new Date())

  const influenceCards: { label: string; icon: string; text: string; color: string }[] = [
    { label: "Настроение", icon: "🙂", text: influence.mood, color: "#fbbf24" },
    { label: "Отношения", icon: "❤", text: influence.relationships, color: "#f9a8d4" },
    { label: "Финансы", icon: "💰", text: influence.finance, color: "#86efac" },
    { label: "Дела", icon: "📋", text: influence.affairs, color: "#7dd3fc" },
    { label: "Здоровье", icon: "🌿", text: influence.health, color: "#c4b5fd" },
  ]

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6"><span>Лунный календарь</span></div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block" style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}>Фаза Луны</h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">Текущая фаза Луны, лунный день, знак зодиака Луны, влияние на 5 сфер жизни и рекомендации.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Текущая фаза + лунный день */}
        <Card className="glass-mystic border-amber-400/30 text-center" style={{ background: `linear-gradient(135deg, ${moonData.phase.color}20, rgba(26,10,58,0.6))` }}>
          <CardContent className="pt-8 pb-6">
            <div className="text-8xl mb-4">{moonData.phase.emoji}</div>
            <h3 className="text-3xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{moonData.phase.name}</h3>
            <div className="flex justify-center gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className="border-amber-400/40 text-amber-200">Освещённость: {moonData.illumination}%</Badge>
              <Badge variant="outline" className="border-purple-400/40 text-purple-200">Луна в {moonData.zodiacSign}</Badge>
              <Badge variant="outline" className="border-amber-400/40 text-amber-200">Лунный день: {lunarDay}</Badge>
            </div>
            {/* Прогресс-бар освещённости */}
            <div className="mt-4 max-w-xs mx-auto">
              <Progress value={moonData.illumination} className="bg-purple-950/60" />
            </div>
          </CardContent>
        </Card>

        {/* Описание */}
        <Card className="glass-mystic border-amber-400/30">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Описание фазы</div>
            <p className="text-amber-100/85 text-sm leading-relaxed">{moonData.phase.description}</p>
          </CardContent>
        </Card>

        {/* Влияние на 5 сфер жизни (как на horo.mail.ru) */}
        <div>
          <div className="text-center text-xs uppercase tracking-wider text-amber-300 mb-3">Влияние Луны на 5 сфер жизни</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {influenceCards.map((c, i) => (
              <Card key={i} className="glass-mystic" style={{ borderColor: `${c.color}40` }}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{c.icon}</span>
                    <h4 className="text-sm font-bold" style={{ color: c.color }}>{c.label}</h4>
                  </div>
                  <p className="text-xs text-amber-100/80 leading-relaxed">{c.text}</p>
                </CardContent>
              </Card>
            ))}
            {/* Настроение занимает всю ширину на мобильных */}
            <Card className="glass-mystic sm:col-span-2" style={{ borderColor: `${influenceCards[0].color}40` }}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{influenceCards[0].icon}</span>
                  <h4 className="text-sm font-bold" style={{ color: influenceCards[0].color }}>{influenceCards[0].label}</h4>
                </div>
                <p className="text-xs text-amber-100/80 leading-relaxed">{influenceCards[0].text}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Энергия */}
        <Card className="glass-card border-purple-400/20">
          <CardContent className="pt-5">
            <div className="text-xs text-purple-300 mb-1">✦ Энергия фазы</div>
            <p className="text-sm text-amber-100/85">{moonData.phase.energy}</p>
          </CardContent>
        </Card>

        {/* Совет */}
        <Card className="glass-card border-amber-400/20">
          <CardContent className="pt-5">
            <div className="text-xs text-amber-300/70 mb-1">💡 Совет дня</div>
            <p className="text-sm text-amber-100/85 italic">{moonData.phase.advice}</p>
          </CardContent>
        </Card>

        {/* Благоприятные и неблагоприятные дни */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="glass-card border-emerald-400/20">
            <CardHeader><CardTitle className="text-base text-emerald-200">✦ Благоприятно</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5">
                {advice.favorable.map((f, i) => <li key={i} className="text-xs text-amber-100/85 flex gap-2"><span className="text-emerald-400">✦</span><span>{f}</span></li>)}
              </ul>
            </CardContent>
          </Card>
          <Card className="glass-card border-rose-400/20">
            <CardHeader><CardTitle className="text-base text-rose-200">✦ Неблагоприятно</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1.5">
                {advice.unfavorable.map((f, i) => <li key={i} className="text-xs text-amber-100/85 flex gap-2"><span className="text-rose-400">✦</span><span>{f}</span></li>)}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Все фазы */}
        <Card className="glass-card border-amber-400/20">
          <CardHeader><CardTitle className="text-base text-amber-100">Лунный цикл (8 фаз)</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {moonPhases.map((p, i) => (
                <div key={i} className={`text-center p-2 rounded-lg transition-all ${i === moonData.phaseIndex ? "glass-mystic border border-amber-400/40" : "opacity-50"}`}>
                  <div className="text-3xl">{p.emoji}</div>
                  <div className="text-xs text-amber-100/80 mt-1">{p.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ===================== БЛАГОПРИЯТНЫЕ ДНИ =====================
function FavorableDaysSection() {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [selectedDay, setSelectedDay] = useState<DayFavorability | null>(null)
  const [zodiacName, setZodiacName] = useState<string>("")
  const [zodiacElement, setZodiacElement] = useState<string>("")
  const [error, setError] = useState("")

  // По умолчанию показываем расчёт для текущего знака (на основе сегодняшней даты)
  useEffect(() => {
    if (!zodiacName) {
      const sign = getZodiacSign(today.getDate(), today.getMonth() + 1)
      if (sign) {
        setZodiacName(sign.name)
        setZodiacElement(sign.element)
      }
    }
  }, [zodiacName])

  const handleCalculate = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year)
    if (!d || !m || !y) { setError("Заполните дату"); return }
    const sign = getZodiacSign(d, m)
    if (!sign) { setError("Не удалось определить знак"); return }
    setZodiacName(sign.name)
    setZodiacElement(sign.element)
    setError("")
  }

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

  const favorability = zodiacName && zodiacElement
    ? calculateMonthFavorability(viewYear, viewMonth, zodiacName, zodiacElement)
    : []

  // Группируем по дням недели для календарной сетки
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const calendarCells: (DayFavorability | null)[] = []
  for (let i = 0; i < firstWeekday; i++) calendarCells.push(null)
  favorability.forEach(d => calendarCells.push(d))

  const favorableCount = favorability.filter(d => d.level === "favorable").length
  const unfavorableCount = favorability.filter(d => d.level === "unfavorable").length

  const goPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }
  const goNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }

  const advice = selectedDay ? getDayAdvice(selectedDay) : null

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6"><span>Календарь благоприятных дней</span></div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block" style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}>Благоприятные дни</h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Календарь рассчитывает благоприятность каждого дня по вашему знаку зодиака:
          учитываются день управителя знака, лунная фаза, нумерология даты и стихия.
        </p>
      </div>

      {/* Ввод даты рождения для определения знака */}
      <div className="max-w-2xl mx-auto mb-8">
        <Card className="glass-mystic border-amber-400/30">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-3">Ваш знак зодиака</div>
            <div className="max-w-sm mx-auto grid grid-cols-3 gap-3 mb-4">
              <div><label className="text-xs text-amber-200/70 mb-1 block">День</label><Input type="number" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} placeholder="15" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
              <div><label className="text-xs text-amber-200/70 mb-1 block">Месяц</label><Input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="08" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
              <div><label className="text-xs text-amber-200/70 mb-1 block">Год</label><Input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(e.target.value)} placeholder="1990" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
            </div>
            <div className="text-center"><Button onClick={handleCalculate} className="btn-gold px-6 py-2"><Calendar className="w-4 h-4 mr-2"/>Определить знак</Button></div>
            {error && <p className="text-rose-300 text-sm text-center mt-3">{error}</p>}
            {zodiacName && !error && (
              <div className="text-center mt-4">
                <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-sm">
                  {zodiacName} · стихия {zodiacElement}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Календарная сетка */}
      {favorability.length > 0 && (
        <div className="max-w-3xl mx-auto">
          {/* Навигация по месяцам */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={goPrevMonth} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
              <ArrowLeft className="w-4 h-4 mr-1"/>Назад
            </Button>
            <div className="text-lg font-bold text-gold-gradient" style={{ fontFamily: "var(--font-cinzel)" }}>
              {monthNames[viewMonth]} {viewYear}
            </div>
            <Button variant="outline" size="sm" onClick={goNextMonth} className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
              Вперёд<ArrowRight className="w-4 h-4 ml-1"/>
            </Button>
          </div>

          {/* Легенда */}
          <div className="flex justify-center gap-4 mb-4 text-xs flex-wrap">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500/70"/>Благоприятный ({favorableCount})</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500/50"/>Нейтральный</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500/60"/>Неблагоприятный ({unfavorableCount})</span>
          </div>

          {/* Сетка дней недели */}
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((w, i) => (
              <div key={i} className="text-center text-xs font-semibold text-amber-200/60 py-1">{w}</div>
            ))}
          </div>

          {/* Сам календарь */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarCells.map((cell, i) => {
              if (!cell) return <div key={`empty-${i}`} className="aspect-square"/>
              const isToday = cell.date.toDateString() === today.toDateString()
              const isSelected = selectedDay?.day === cell.day && selectedDay?.date.getMonth() === cell.date.getMonth()
              const bgColor = cell.level === "favorable"
                ? "rgba(16,185,129,0.25)"
                : cell.level === "unfavorable"
                ? "rgba(244,63,94,0.2)"
                : "rgba(251,191,36,0.15)"
              const borderColor = cell.level === "favorable"
                ? "rgba(16,185,129,0.5)"
                : cell.level === "unfavorable"
                ? "rgba(244,63,94,0.5)"
                : "rgba(251,191,36,0.3)"
              return (
                <button
                  key={cell.day}
                  onClick={() => setSelectedDay(cell)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 transition-all hover:scale-105 relative ${isToday ? "ring-2 ring-amber-400" : ""} ${isSelected ? "ring-2 ring-purple-400" : ""}`}
                  style={{ background: bgColor, border: `1px solid ${borderColor}` }}
                >
                  <div className={`text-sm font-bold ${cell.level === "favorable" ? "text-emerald-200" : cell.level === "unfavorable" ? "text-rose-200" : "text-amber-100/80"}`}>
                    {cell.day}
                  </div>
                  <div className="text-[10px] leading-none mt-0.5 opacity-70">{cell.moonEmoji}</div>
                </button>
              )
            })}
          </div>

          {/* Детали выбранного дня */}
          {selectedDay && advice && (
            <Card className="glass-mystic border-amber-400/40 mt-6 animate-fade-in">
              <CardContent className="pt-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <div className="text-xs text-amber-200/60">{getWeekdayName(selectedDay.weekday)}</div>
                    <h3 className="text-xl font-bold text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                      {selectedDay.day} {monthNames[selectedDay.date.getMonth()].toLowerCase()} {selectedDay.date.getFullYear()}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-amber-400/40 text-amber-200">
                      {selectedDay.moonEmoji} {selectedDay.moonName}
                    </Badge>
                    <Badge className={
                      selectedDay.level === "favorable"
                        ? "bg-emerald-500/30 text-emerald-100 border border-emerald-400/40"
                        : selectedDay.level === "unfavorable"
                        ? "bg-rose-500/30 text-rose-100 border border-rose-400/40"
                        : "bg-amber-500/30 text-amber-100 border border-amber-400/40"
                    }>
                      {selectedDay.score}/100
                    </Badge>
                  </div>
                </div>
                <div className="text-sm font-semibold text-amber-200 mb-1">{advice.title}</div>
                <p className="text-sm text-amber-100/85 mb-3">{advice.advice}</p>
                <div className="text-xs uppercase tracking-wider text-amber-300/70 mb-2">Почему так</div>
                <ul className="space-y-1">
                  {selectedDay.reasons.map((r, i) => (
                    <li key={i} className="text-xs text-amber-100/80 flex gap-2">
                      <span className="text-amber-400">✦</span><span>{r}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Сводка по лучшим дням месяца */}
          <Card className="glass-card border-amber-400/20 mt-4">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Топ-5 благоприятных дней месяца</div>
              <div className="flex flex-wrap gap-2">
                {[...favorability]
                  .filter(d => d.level === "favorable")
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5)
                  .map((d, i) => (
                    <button
                      key={d.day}
                      onClick={() => setSelectedDay(d)}
                      className="px-3 py-1.5 rounded-lg text-xs bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/25 transition-all"
                    >
                      {d.day} {monthNames[d.date.getMonth()].slice(0, 3).toLowerCase()} · {d.score}
                    </button>
                  ))}
                {favorability.filter(d => d.level === "favorable").length === 0 && (
                  <p className="text-xs text-amber-200/60 italic">В этом месяце особо благоприятных дней нет.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// ===================== ГОРОСКОП =====================
function HoroscopeSection() {
  const today = new Date()
  const [signId, setSignId] = useState<string>("aries")
  const [period, setPeriod] = useState<HoroscopePeriod>("today")
  const [category, setCategory] = useState<HoroscopeCategory>("general")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [autoDetected, setAutoDetected] = useState(false)

  // Дата прогноза
  const forecastDate = new Date(today)
  if (period === "tomorrow") forecastDate.setDate(forecastDate.getDate() + 1)

  const horoscope = getDailyHoroscope(signId, forecastDate, period)
  const weekly = period === "week" ? getWeeklyHoroscope(signId, today) : null
  const yearly = period === "year" ? getYearHoroscope(signId, today.getFullYear()) : null

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

  const handleDetect = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year)
    if (!d || !m || !y) return
    const id = getSignByBirthDate(d, m)
    setSignId(id)
    setAutoDetected(true)
  }

  const categoryLabels: { id: HoroscopeCategory; label: string; icon: string }[] = [
    { id: "general", label: "Общий", icon: "✦" },
    { id: "love", label: "Любовь", icon: "❤" },
    { id: "career", label: "Карьера", icon: "💼" },
    { id: "finance", label: "Финансы", icon: "💰" },
    { id: "health", label: "Здоровье", icon: "🌿" },
  ]

  const periodLabels: { id: HoroscopePeriod; label: string }[] = [
    { id: "today", label: "Сегодня" },
    { id: "tomorrow", label: "Завтра" },
    { id: "week", label: "Неделя" },
    { id: "year", label: "Год" },
  ]

  const dateLabel = forecastDate.toLocaleDateString("ru-RU", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  })

  const sign = horoscopeSigns.find(s => s.id === signId)!
  const currentText = horoscope.texts[category]

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6"><span>Ежедневный гороскоп</span></div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block" style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}>Гороскоп</h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Прогноз на сегодня, завтра и неделю для каждого знака зодиака. 5 сфер: общий, любовь, карьера, финансы и здоровье.
          Учитывается фаза Луны, знак Луны, нумерология даты и стихия знака.
        </p>
      </div>

      {/* Авто-определение знака по дате рождения */}
      <div className="max-w-2xl mx-auto mb-6">
        <Card className="glass-mystic border-amber-400/30">
          <CardContent className="pt-5">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-3">Определить мой знак по дате рождения</div>
            <div className="max-w-sm mx-auto grid grid-cols-3 gap-3 mb-3">
              <div><label className="text-xs text-amber-200/70 mb-1 block">День</label><Input type="number" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} placeholder="15" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
              <div><label className="text-xs text-amber-200/70 mb-1 block">Месяц</label><Input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="08" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
              <div><label className="text-xs text-amber-200/70 mb-1 block">Год</label><Input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(e.target.value)} placeholder="1990" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
            </div>
            <div className="text-center">
              <Button onClick={handleDetect} className="btn-gold px-6 py-2">
                <Star className="w-4 h-4 mr-2"/>Определить знак
              </Button>
            </div>
            {autoDetected && (
              <div className="text-center mt-3 text-sm text-emerald-300">✦ Ваш знак определён: <strong>{sign.name}</strong></div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Сетка выбора знака */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mb-6 max-w-4xl mx-auto">
        {horoscopeSigns.map(s => (
          <button
            key={s.id}
            onClick={() => { setSignId(s.id); setAutoDetected(false) }}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all border ${
              signId === s.id ? "scale-105" : "hover:scale-105 opacity-80 hover:opacity-100"
            }`}
            style={{
              background: signId === s.id ? `${s.color}30` : "rgba(45, 27, 78, 0.4)",
              borderColor: signId === s.id ? `${s.color}80` : "rgba(251, 191, 36, 0.2)",
            }}
          >
            <div className="text-3xl mb-1" style={{ color: s.color }}>{s.symbol}</div>
            <div className={`text-xs font-medium ${signId === s.id ? "text-amber-100" : "text-amber-200/70"}`}>{s.name}</div>
          </button>
        ))}
      </div>

      {/* Периоды */}
      <div className="flex justify-center gap-2 mb-6">
        {periodLabels.map(p => (
          <Button
            key={p.id}
            variant={period === p.id ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriod(p.id)}
            className={period === p.id ? "btn-gold" : "border-amber-400/40 text-amber-200 hover:bg-amber-400/10"}
          >
            {p.label}
          </Button>
        ))}
      </div>

      {/* Прогноз */}
      <div className="max-w-3xl mx-auto">
        {/* Шапка прогноза */}
        <Card className="glass-mystic border-amber-400/40 mb-4" style={{ background: `linear-gradient(135deg, ${sign.color}15, rgba(26,10,58,0.7))` }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="text-5xl" style={{ color: sign.color }}>{sign.symbol}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gold-gradient" style={{ fontFamily: "var(--font-cinzel)" }}>{sign.name}</h3>
                  <div className="text-xs text-amber-200/60">{sign.dateRange} · стихия {sign.element}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-amber-200/60 capitalize">{dateLabel}</div>
                {period !== "week" && (
                  <Badge className="mt-1 border" style={{
                    backgroundColor: currentText.rating >= 7 ? "rgba(16,185,129,0.2)" : currentText.rating >= 4 ? "rgba(251,191,36,0.2)" : "rgba(244,63,94,0.2)",
                    color: currentText.rating >= 7 ? "#10b981" : currentText.rating >= 4 ? "#fbbf24" : "#f43f5e",
                    borderColor: currentText.rating >= 7 ? "rgba(16,185,129,0.4)" : currentText.rating >= 4 ? "rgba(251,191,36,0.4)" : "rgba(244,63,94,0.4)",
                  }}>
                    Рейтинг дня: {currentText.rating}/10
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Категории (только для дневных прогнозов) */}
        {period !== "week" && (
          <>
            <Tabs value={category} onValueChange={(v) => setCategory(v as HoroscopeCategory)}>
              <TabsList className="grid grid-cols-5 max-w-2xl mx-auto mb-4 bg-purple-950/40 border border-amber-400/20">
                {categoryLabels.map(c => (
                  <TabsTrigger key={c.id} value={c.id} className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-100 text-xs sm:text-sm">
                    <span className="mr-1">{c.icon}</span>
                    <span className="hidden sm:inline">{c.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {categoryLabels.map(c => {
                const t = horoscope.texts[c.id]
                return (
                  <TabsContent key={c.id} value={c.id}>
                    <Card className="glass-mystic border-amber-400/30 animate-fade-in">
                      <CardContent className="pt-5 space-y-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="text-lg font-bold text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                            {c.icon} {t.title}
                          </h4>
                          <Badge variant="outline" className="border-amber-400/40 text-amber-200">{t.rating}/10</Badge>
                        </div>
                        <p className="text-sm sm:text-base text-amber-100/85 leading-relaxed">{t.text}</p>
                        {t.luckyItem && (
                          <div className="glass-card rounded-lg p-3 border-amber-400/20">
                            <div className="text-xs text-amber-300/70 mb-1">✦ Счастливый предмет дня</div>
                            <div className="text-sm text-amber-100">{t.luckyItem}</div>
                          </div>
                        )}
                        <div className="glass-card rounded-lg p-3 border-purple-400/20">
                          <div className="text-xs text-purple-300 mb-1">💡 Совет дня</div>
                          <p className="text-sm text-amber-100/85 italic">{t.advice}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )
              })}
            </Tabs>
          </>
        )}

        {/* Недельный прогноз */}
        {period === "week" && weekly && (
          <div className="space-y-4 animate-fade-in">
            <Card className="glass-mystic border-amber-400/30">
              <CardContent className="pt-5">
                <h4 className="text-lg font-bold text-amber-100 mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>
                  {weekly.title}
                </h4>
                <p className="text-sm text-amber-100/85 leading-relaxed mb-3">{weekly.summary}</p>
                <p className="text-sm text-amber-100/85 leading-relaxed">{weekly.text}</p>
              </CardContent>
            </Card>

            <Card className="glass-mystic border-amber-400/30">
              <CardContent className="pt-5">
                <div className="text-xs uppercase tracking-wider text-amber-300 mb-3">Рейтинги дней недели</div>
                <div className="grid grid-cols-7 gap-2">
                  {weekly.ratings.map((r, i) => (
                    <div key={i} className="text-center p-2 rounded-lg" style={{
                      background: r.rating >= 7 ? "rgba(16,185,129,0.2)" : r.rating >= 4 ? "rgba(251,191,36,0.15)" : "rgba(244,63,94,0.15)",
                      border: `1px solid ${r.rating >= 7 ? "rgba(16,185,129,0.4)" : r.rating >= 4 ? "rgba(251,191,36,0.3)" : "rgba(244,63,94,0.3)"}`,
                    }}>
                      <div className="text-[10px] text-amber-200/60">{r.weekday.slice(0, 2)}</div>
                      <div className="text-xs font-bold text-amber-100">{r.day.getDate()}</div>
                      <div className="text-xs mt-1" style={{ color: r.rating >= 7 ? "#10b981" : r.rating >= 4 ? "#fbbf24" : "#f43f5e" }}>{r.rating}</div>
                    </div>
                  ))}
                </div>
                {weekly.bestDay && weekly.worstDay && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="glass-card rounded-lg p-3 border-emerald-400/20">
                      <div className="text-xs text-emerald-300 mb-1">✦ Лучший день</div>
                      <div className="text-sm font-bold text-amber-100">{weekly.bestDay.weekday}, {weekly.bestDay.day.getDate()}</div>
                      <div className="text-xs text-emerald-200">Рейтинг {weekly.bestDay.rating}/10</div>
                    </div>
                    <div className="glass-card rounded-lg p-3 border-rose-400/20">
                      <div className="text-xs text-rose-300 mb-1">⚠ Сложный день</div>
                      <div className="text-sm font-bold text-amber-100">{weekly.worstDay.weekday}, {weekly.worstDay.day.getDate()}</div>
                      <div className="text-xs text-rose-200">Рейтинг {weekly.worstDay.rating}/10</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Годовой прогноз */}
        {period === "year" && yearly && (
          <div className="space-y-4 animate-fade-in">
            {/* Общая характеристика года */}
            <Card className="glass-mystic border-amber-400/40" style={{ background: `linear-gradient(135deg, ${sign.color}15, rgba(26,10,58,0.7))` }}>
              <CardContent className="pt-5">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h4 className="text-xl font-bold text-gold-gradient" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {yearly.sign} · {yearly.year}
                  </h4>
                  <Badge className="border" style={{
                    backgroundColor: yearly.overallRating >= 7 ? "rgba(16,185,129,0.2)" : yearly.overallRating >= 4 ? "rgba(251,191,36,0.2)" : "rgba(244,63,94,0.2)",
                    color: yearly.overallRating >= 7 ? "#10b981" : yearly.overallRating >= 4 ? "#fbbf24" : "#f43f5e",
                    borderColor: yearly.overallRating >= 7 ? "rgba(16,185,129,0.4)" : yearly.overallRating >= 4 ? "rgba(251,191,36,0.4)" : "rgba(244,63,94,0.4)",
                  }}>
                    Общий рейтинг года: {yearly.overallRating}/10
                  </Badge>
                </div>
                <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">{yearly.personalYearTitle}</div>
                <p className="text-sm text-amber-100/85 leading-relaxed mb-3">{yearly.overallText}</p>
                {yearly.chineseAnimal && (
                  <div className="glass-card rounded-lg p-3 border-amber-400/20">
                    <div className="text-xs text-amber-300/70 mb-1">🐉 Год {yearly.chineseAnimal}</div>
                    <p className="text-sm text-amber-100/85">{yearly.chineseAdvice}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Сферы года */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Card className="glass-card border-rose-400/20">
                <CardContent className="pt-4">
                  <div className="text-xs text-rose-300 mb-1">❤ Любовь в {yearly.year}</div>
                  <p className="text-sm text-amber-100/85">{yearly.love}</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-blue-400/20">
                <CardContent className="pt-4">
                  <div className="text-xs text-blue-300 mb-1">💼 Карьера в {yearly.year}</div>
                  <p className="text-sm text-amber-100/85">{yearly.career}</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-emerald-400/20">
                <CardContent className="pt-4">
                  <div className="text-xs text-emerald-300 mb-1">💰 Финансы в {yearly.year}</div>
                  <p className="text-sm text-amber-100/85">{yearly.finance}</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-purple-400/20">
                <CardContent className="pt-4">
                  <div className="text-xs text-purple-300 mb-1">🌿 Здоровье в {yearly.year}</div>
                  <p className="text-sm text-amber-100/85">{yearly.health}</p>
                </CardContent>
              </Card>
            </div>

            {/* Лучшие и худшие месяцы */}
            <Card className="glass-mystic border-amber-400/30">
              <CardContent className="pt-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card rounded-lg p-3 border-emerald-400/20">
                    <div className="text-xs text-emerald-300 mb-1">✦ Лучшие месяцы</div>
                    <div className="text-sm text-amber-100">{yearly.bestMonths.map(m => monthNames[m - 1]).join(", ")}</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 border-rose-400/20">
                    <div className="text-xs text-rose-300 mb-1">⚠ Сложные месяцы</div>
                    <div className="text-sm text-amber-100">{yearly.worstMonths.map(m => monthNames[m - 1]).join(", ")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Сетка по 12 месяцам */}
            <Card className="glass-mystic border-amber-400/30">
              <CardContent className="pt-5">
                <div className="text-xs uppercase tracking-wider text-amber-300 mb-3">Прогноз по месяцам</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {yearly.months.map((m, i) => (
                    <div key={i} className="rounded-lg p-3" style={{
                      background: m.rating >= 7 ? "rgba(16,185,129,0.15)" : m.rating >= 4 ? "rgba(251,191,36,0.12)" : "rgba(244,63,94,0.12)",
                      border: `1px solid ${m.rating >= 7 ? "rgba(16,185,129,0.3)" : m.rating >= 4 ? "rgba(251,191,36,0.25)" : "rgba(244,63,94,0.3)"}`,
                    }}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-bold text-amber-100">{m.name}</div>
                        <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs">{m.rating}/10</Badge>
                      </div>
                      <div className="text-xs text-amber-200/70 mb-1">{m.theme}</div>
                      <p className="text-xs text-amber-100/80 leading-relaxed">{m.advice}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// ===================== ТАРО-ПРОГНОЗ ДНЯ (3 карты) =====================
function TarotForecastSection() {
  const today = new Date()
  const [forecast, setForecast] = useState(() => drawTarotForecast(today))
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([])

  const redraw = () => {
    setForecast(drawTarotForecast(today))
    setRevealedIndexes([])
  }

  const revealCard = (i: number) => {
    if (!revealedIndexes.includes(i)) setRevealedIndexes([...revealedIndexes, i])
  }

  const allRevealed = revealedIndexes.length === 3
  const dateLabel = today.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6"><span>Таро-прогноз дня</span></div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-mystic-gradient inline-block" style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}>Таро дня</h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">
          Три карты дня: <strong>Энергия</strong> (что наполняет день), <strong>Совет</strong> (как действовать) и <strong>Предупреждение</strong> (чего избегать).
        </p>
      </div>

      <div className="text-center text-sm text-amber-200/60 capitalize mb-6">{dateLabel}</div>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {forecast.map((f, i) => {
          const revealed = revealedIndexes.includes(i)
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="text-xs uppercase tracking-wider text-amber-200/70 mb-2">{f.position}</div>
              <TarotCardView
                card={f.card}
                isReversed={f.isReversed}
                revealed={revealed}
                onReveal={() => revealCard(i)}
                width={160}
                height={256}
              />
            </div>
          )
        })}
      </div>

      {allRevealed && (
        <div className="max-w-3xl mx-auto animate-fade-in space-y-3">
          {forecast.map((f, i) => (
            <Card key={i} className="glass-mystic border-amber-400/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <Badge variant="outline" className="border-amber-400/40 text-amber-200 text-xs">{f.position}</Badge>
                  <h4 className="text-lg font-bold text-amber-100">
                    {f.card.name}
                    {f.isReversed && <span className="ml-2 text-xs text-rose-300">(перевёрнута)</span>}
                  </h4>
                </div>
                <p className="text-sm text-amber-100/80 leading-relaxed">
                  {f.isReversed ? f.card.reversed.summary : f.card.upright.summary}
                </p>
                <p className="text-xs text-amber-200/60 italic mt-2">{f.hint}</p>
              </CardContent>
            </Card>
          ))}
          <div className="text-center">
            <Button onClick={redraw} variant="outline" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
              <Sparkles className="w-4 h-4 mr-2"/>Новый прогноз
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Детерминированный 3-карточный прогноз Таро на день
function drawTarotForecast(date: Date) {
  // Простая детерминированная выборка 3 карт по дате
  const dateStr = date.toISOString().slice(0, 10)
  let seed = 0
  for (let i = 0; i < dateStr.length; i++) seed = ((seed << 5) - seed) + dateStr.charCodeAt(i)
  seed = Math.abs(seed)

  const positions = ["Энергия дня", "Совет дня", "Предупреждение"]
  const hints = [
    "Эта карта показывает, какая энергия будет наполнять ваш день.",
    "Эта карта подсказывает, как лучше действовать сегодня.",
    "Эта карта указывает, на что обратить внимание и чего избегать.",
  ]

  // 3 разные карты без повторов
  const used = new Set<number>()
  const cards: { card: typeof allTarotCards[0]; isReversed: boolean; position: string; hint: string }[] = []
  for (let i = 0; i < 3; i++) {
    let idx = (seed + i * 17) % allTarotCards.length
    while (used.has(idx)) idx = (idx + 1) % allTarotCards.length
    used.add(idx)
    const card = allTarotCards[idx]
    const isReversed = ((seed >> (i + 1)) & 1) === 1
    cards.push({ card, isReversed, position: positions[i], hint: hints[i] })
  }
  return cards
}

// ===================== CATALOG (КАТАЛОГ 78 КАРТ) =====================
function CatalogSection() {
  const [filter, setFilter] = useState<"all" | "major" | "wands" | "cups" | "swords" | "pentacles">("all")
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null)

  const filteredCards = filter === "all" ? allTarotCards : allTarotCards.filter(c => c.suit === filter)

  const suitLabels: Record<string, string> = {
    all: "Все (78)",
    major: "Старшие (22)",
    wands: "Жезлы (14)",
    cups: "Кубки (14)",
    swords: "Мечи (14)",
    pentacles: "Пентакли (14)",
  }

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <div className="section-divider mb-6"><span>Каталог Таро</span></div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-gold-gradient inline-block" style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.25, paddingTop: "0.2em" }}>78 арканов</h2>
        <p className="text-amber-200/70 max-w-2xl mx-auto">Полная библиотека всех 78 карт Таро с интерпретациями. Выберите карту для просмотра.</p>
      </div>

      {/* Фильтр */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {Object.entries(suitLabels).map(([key, label]) => (
          <Button key={key} variant={filter === key ? "default" : "outline"} size="sm"
            onClick={() => setFilter(key as typeof filter)}
            className={filter === key ? "btn-gold" : "border-amber-400/40 text-amber-200 hover:bg-amber-400/10"}>
            {label}
          </Button>
        ))}
      </div>

      {/* Сетка карт */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredCards.map((card) => (
          <button key={card.id} onClick={() => setSelectedCard(card)}
            className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-all border-amber-400/20 hover:border-amber-400/50">
            <CardSVG card={card} width={100} height={160} className="rounded-xl"/>
            <div className="p-2 text-center">
              <div className="text-xs font-medium text-amber-100 truncate">{card.name}</div>
              <div className="text-[10px] text-amber-200/50 truncate">{card.keyword.split(" · ")[0]}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Модальное окно с деталями карты */}
      <Dialog open={selectedCard !== null} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-hidden p-0 bg-[#1a0a3a] border-amber-400/30">
          <ScrollArea className="max-h-[90vh]">
            {selectedCard && (
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <CardSVG card={selectedCard} width={180} height={288} className="rounded-xl shadow-2xl"/>
                </div>
                <Badge className="border mb-2" style={{ backgroundColor: `${selectedCard.accent}25`, color: selectedCard.accent, borderColor: `${selectedCard.accent}50` }}>
                  {selectedCard.suit === "major" ? `Старший аркан ${selectedCard.number}` : suitInfo[selectedCard.suit].name}
                </Badge>
                <h2 className="text-2xl font-bold text-amber-100 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>{selectedCard.name}</h2>
                <p className="text-sm text-amber-200/70 mb-4">{selectedCard.keyword}</p>

                <div className="space-y-3">
                  <div className="glass-card rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-emerald-200 mb-1">✦ Прямое значение</h4>
                    <p className="text-xs text-amber-100/85 leading-relaxed">{selectedCard.upright.summary}</p>
                    <p className="text-xs text-amber-100/70 mt-1">❤️ {selectedCard.upright.love}</p>
                    <p className="text-xs text-amber-100/70">💼 {selectedCard.upright.career}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-rose-200 mb-1">✦ Перевёрнутое значение</h4>
                    <p className="text-xs text-amber-100/85 leading-relaxed">{selectedCard.reversed.summary}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 border-purple-400/20">
                    <h4 className="text-xs font-semibold text-purple-200 mb-1">🧠 Психология</h4>
                    <p className="text-xs text-amber-100/75 italic leading-relaxed">{selectedCard.upright.psychology}</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 border-amber-400/20">
                    <h4 className="text-xs font-semibold text-amber-200 mb-1">🎭 Архетип</h4>
                    <p className="text-xs text-amber-100/75">{selectedCard.archetype}</p>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ===================== И-ЦЗИН (КНИГА ПЕРЕМЕН) =====================
function IChingSection() {
  const [hexagram, setHexagram] = useState<Hexagram | null>(null)
  const [isCasting, setIsCasting] = useState(false)
  const [question, setQuestion] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)

  const cast = useCallback(() => {
    setIsCasting(true)
    setHexagram(null)
    setTimeout(() => {
      setHexagram(castIChing())
      setIsCasting(false)
      saveReading({ type: "psychology", typeLabel: "И-Цзин (гексаграмма)", question: question || undefined, cards: [] })
    }, 1500)
  }, [question])

  const renderHexagram = (h: Hexagram) => (
    <div className="flex flex-col items-center gap-1">
      {h.lines.slice().reverse().map((line, i) => (
        <div key={i} className="flex items-center gap-1">
          {line ? (
            <div className="w-24 h-3 bg-amber-400/70 rounded-sm" style={{ boxShadow: "0 0 8px rgba(251,191,36,0.3)" }}/>
          ) : (
            <>
              <div className="w-11 h-3 bg-amber-400/70 rounded-sm"/>
              <div className="w-2"/>
              <div className="w-11 h-3 bg-amber-400/70 rounded-sm"/>
            </>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <p className="text-center text-amber-200/70 max-w-2xl mx-auto mb-6 text-sm">
        64 гексаграммы древней китайской мудрости. Задайте вопрос и бросьте монеты.
      </p>

      <ReadingQuestionInput question={question} setQuestion={setQuestion} placeholder="О чём хотите спросить И-Цзин?" />

      {!hexagram && !isCasting && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-3">
            {[0,1,2].map((i) => <div key={i} className="w-10 h-10 rounded-full bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center text-amber-300/40 text-lg">$</div>)}
          </div>
          <Button onClick={cast} className="btn-gold px-8 py-3"><Dices className="w-5 h-5 mr-2"/>Бросить монеты</Button>
        </div>
      )}

      {isCasting && <div className="text-center py-8"><div className="spinner-mystic mx-auto mb-4"/><p className="text-amber-200/80 animate-pulse" style={{ fontFamily: "var(--font-cormorant)" }}>Монеты падают...</p></div>}

      {hexagram && !isCasting && (
        <div ref={resultRef} className="max-w-2xl mx-auto animate-fade-in space-y-4">
          <Card className="glass-mystic border-amber-400/40 text-center">
            <CardContent className="pt-8 pb-6">
              {renderHexagram(hexagram)}
              <div className="mt-6">
                <Badge variant="outline" className="border-amber-400/40 text-amber-200 mb-2">Гексаграмма №{hexagram.number}</Badge>
                <h3 className="text-2xl font-bold text-gold-gradient" style={{ fontFamily: "var(--font-cinzel)" }}>{hexagram.name}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-mystic border-amber-400/30">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">📜 Суждение</div>
              <p className="text-sm text-amber-100/85 italic leading-relaxed">{hexagram.judgment}</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-400/20">
            <CardContent className="pt-5">
              <div className="text-xs text-amber-300/70 mb-1">🌅 Образ</div>
              <p className="text-sm text-amber-100/85">{hexagram.image}</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-400/20">
            <CardContent className="pt-5">
              <div className="text-xs text-amber-300/70 mb-1">💡 Значение</div>
              <p className="text-sm text-amber-100/85">{hexagram.meaning}</p>
            </CardContent>
          </Card>

          <Card className="glass-mystic border-purple-400/30">
            <CardContent className="pt-5">
              <div className="text-xs text-purple-300 mb-1">🧠 Психология</div>
              <p className="text-sm text-amber-100/85 italic">{hexagram.psychology}</p>
            </CardContent>
          </Card>
        </div>
      )}
      {hexagram && !isCasting && (
        <div className="max-w-2xl mx-auto mt-4 flex gap-3 justify-center flex-wrap">
          <ShareImageButton
            targetRef={resultRef}
            filename={`i-tszin-${hexagram.number}`}
            textFallback={`Гексаграмма №${hexagram.number} — ${hexagram.name}: ${hexagram.meaning}`}
            label="📲 Поделиться картинкой"
          />
          <Button onClick={cast} variant="outline" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"><Dices className="w-4 h-4 mr-2"/>Новый вопрос</Button>
        </div>
      )}
    </div>
  )
}

// ===================== БИОРИТМЫ =====================
function BiorhythmsSection() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [result, setResult] = useState<BiorhythmResult | null>(null)
  const [series, setSeries] = useState<BiorhythmResult[]>([])
  const [error, setError] = useState("")

  const handleCalculate = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year)
    if (!d || !m || !y) { setError("Заполните дату"); return }
    const birthDate = new Date(y, m - 1, d)
    setResult(calculateBiorhythm(birthDate))
    setSeries(getBiorhythmSeries(birthDate, 30))
    setError("")
  }

  // Макс для масштабирования графика
  const maxVal = 100

  return (
    <div>
      <p className="text-center text-amber-200/70 max-w-2xl mx-auto mb-6 text-sm">
        Физический (23 дня), эмоциональный (28 дней) и интеллектуальный (33 дня) циклы по дате рождения.
      </p>

      <div className="max-w-sm mx-auto mb-6 grid grid-cols-3 gap-3">
        <div><label className="text-xs text-amber-200/70 mb-1 block">День</label><Input type="number" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} placeholder="15" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
        <div><label className="text-xs text-amber-200/70 mb-1 block">Месяц</label><Input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="08" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
        <div><label className="text-xs text-amber-200/70 mb-1 block">Год</label><Input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(e.target.value)} placeholder="1990" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
      </div>
      <div className="text-center mb-8"><Button onClick={handleCalculate} className="btn-gold px-8 py-3"><Activity className="w-5 h-5 mr-2"/>Рассчитать биоритмы</Button>{error && <p className="text-rose-300 text-sm mt-3">{error}</p>}</div>

      {result && (
        <div className="max-w-2xl mx-auto animate-fade-in space-y-4">
          {/* Текущие значения */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Физический", val: result.physical, color: "#dc2626", icon: "💪" },
              { label: "Эмоциональный", val: result.emotional, color: "#7c3aed", icon: "❤️" },
              { label: "Интеллект", val: result.intellectual, color: "#0891b2", icon: "🧠" },
            ].map((b) => (
              <Card key={b.label} className="glass-mystic text-center" style={{ borderColor: `${b.color}40` }}>
                <CardContent className="pt-5">
                  <div className="text-3xl mb-1">{b.icon}</div>
                  <div className="text-3xl font-bold mb-1" style={{ color: b.color }}>{b.val > 0 ? "+" : ""}{b.val}%</div>
                  <div className="text-xs text-amber-200/70">{b.label}</div>
                  <div className="mt-2"><Progress value={(b.val + 100) / 2} className="bg-purple-950/60" /></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* График */}
          <Card className="glass-mystic border-amber-400/30">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-3">График биоритмов (15 дней до/после)</div>
              <svg viewBox="0 0 600 200" className="w-full">
                {/* Ось */}
                <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(251,191,36,0.2)" strokeWidth="1"/>
                {/* Линии */}
                {[
                  { data: series.map(s => s.physical), color: "#dc2626" },
                  { data: series.map(s => s.emotional), color: "#7c3aed" },
                  { data: series.map(s => s.intellectual), color: "#0891b2" },
                ].map((line, li) => {
                  const points = line.data.map((v, i) => {
                    const x = (i / (line.data.length - 1)) * 600
                    const y = 100 - (v / maxVal) * 90
                    return `${x},${y}`
                  }).join(" ")
                  return <polyline key={li} points={points} fill="none" stroke={line.color} strokeWidth="2" opacity="0.8"/>
                })}
                {/* Точка сегодня */}
                <circle cx="300" cy="100" r="4" fill="#fbbf24"/>
                <text x="300" y="120" fontSize="8" textAnchor="middle" fill="rgba(251,191,36,0.6)">сегодня</text>
              </svg>
              <div className="flex justify-center gap-4 mt-2 text-xs">
                <span className="text-red-400">— Физический</span>
                <span className="text-purple-400">— Эмоциональный</span>
                <span className="text-cyan-400">— Интеллект</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-amber-400/20">
            <CardContent className="pt-5">
              <div className="text-xs text-amber-300/70 mb-1">📊 Дней прожито: {result.daysAlive}</div>
              <p className="text-sm text-amber-100/85">
                {result.physical > 50 ? "Физическая энергия на пике — действуйте!" : result.physical < -50 ? "Физическая энергия на минимуме — отдыхайте." : "Физическая энергия в норме."}
                {" "}{result.emotional > 50 ? "Эмоции положительные." : result.emotional < -50 ? "Эмоции нестабильны — будьте осторожны." : "Эмоции стабильны."}
                {" "}{result.intellectual > 50 ? "Ум ясный — принимайте решения." : result.intellectual < -50 ? "Ум затуманен — отложите важные решения." : "Мышление в норме."}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// ===================== ПСИХОМАТРИЦА АЛЕКСАНДРОВА =====================
function PsychomatrixSection() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [result, setResult] = useState<Psychomatrix | null>(null)
  const [error, setError] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year)
    if (!d || !m || !y) { setError("Заполните дату"); setResult(null); return }
    const r = calculatePsychomatrix(d, m, y)
    if (!r) { setError("Ошибка"); return }
    setError(""); setResult(r)
  }

  const cellLabels = ["Характер", "Энергия", "Интерес", "Здоровье", "Логика", "Труд", "Удача", "Долг", "Память"]
  const cellColors = ["#fbbf24", "#a78bfa", "#7dd3fc", "#86efac", "#f9a8d4", "#fb923c", "#fde68a", "#60a5fa", "#c4b5fd"]

  return (
    <div>
      <p className="text-center text-amber-200/70 max-w-2xl mx-auto mb-6 text-sm">
        Квадрат 3×3 по дате рождения. 9 ячеек показывают распределение ваших качеств.
      </p>

      <div className="max-w-sm mx-auto mb-6 grid grid-cols-3 gap-3">
        <div><label className="text-xs text-amber-200/70 mb-1 block">День</label><Input type="number" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} placeholder="15" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
        <div><label className="text-xs text-amber-200/70 mb-1 block">Месяц</label><Input type="number" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="08" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
        <div><label className="text-xs text-amber-200/70 mb-1 block">Год</label><Input type="number" min="1900" max="2100" value={year} onChange={(e) => setYear(e.target.value)} placeholder="1990" className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center"/></div>
      </div>
      <div className="text-center mb-8"><Button onClick={handleCalculate} className="btn-gold px-8 py-3"><Grid3x3 className="w-5 h-5 mr-2"/>Рассчитать матрицу</Button>{error && <p className="text-rose-300 text-sm mt-3">{error}</p>}</div>

      {result && (
        <>
        <div ref={resultRef} className="max-w-xl mx-auto animate-fade-in space-y-4">
          {/* Квадрат 3×3 */}
          <Card className="glass-mystic border-amber-400/40">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-2">
                {result.grid.flat().map((count, i) => (
                  <div key={i} className="aspect-square rounded-xl flex flex-col items-center justify-center p-2" style={{ background: `${cellColors[i]}15`, border: `1px solid ${cellColors[i]}40` }}>
                    <div className="text-xs text-amber-200/60 mb-1">{cellLabels[i]}</div>
                    <div className="text-2xl font-bold" style={{ color: cellColors[i] }}>{count > 0 ? count.toString().split("").join("-") : "—"}</div>
                    <div className="text-[10px] text-amber-200/40 mt-1">({i + 1})</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Описание */}
          <Card className="glass-mystic border-amber-400/30">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">Расшифровка</div>
              <p className="text-sm text-amber-100/85 leading-relaxed">{result.summary}</p>
            </CardContent>
          </Card>

          {/* Детали по ячейкам */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Характер (1)", val: result.workingEnergy, desc: "Сила воли, лидерство" },
              { label: "Энергия (2)", val: result.energy, desc: "Жизненная сила" },
              { label: "Интерес (3)", val: result.interest, desc: "Творчество, склонности" },
              { label: "Здоровье (4)", val: result.health, desc: "Физическое тело" },
              { label: "Логика (5)", val: result.logic, desc: "Аналитический ум" },
              { label: "Труд (6)", val: result.labour, desc: "Мастерство, ремесло" },
              { label: "Удача (7)", val: result.luck, desc: "Везение, интуиция" },
              { label: "Долг (8)", val: result.duty, desc: "Ответственность" },
              { label: "Память (9)", val: result.memory, desc: "Ум, воспоминания" },
            ].map((cell, i) => (
              <div key={i} className="glass-card rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${cellColors[i]}25`, color: cellColors[i], border: `1px solid ${cellColors[i]}50` }}>
                  {cell.val > 0 ? cell.val : "0"}
                </div>
                <div>
                  <div className="text-xs font-medium text-amber-100">{cell.label}</div>
                  <div className="text-[10px] text-amber-200/60">{cell.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-xl mx-auto mt-4 flex gap-3 justify-center flex-wrap">
          <ShareImageButton
            targetRef={resultRef}
            filename={`matritsa-${day}-${month}-${year}`}
            textFallback={`Психоматрица по дате ${day}.${month}.${year}: ${result.summary}`}
            label="📲 Поделиться картинкой"
          />
        </div>
        </>
      )}
    </div>
  )
}

// ===================== НУМЕРОЛОГИЯ ИМЕНИ =====================
function NameNumerologySection() {
  const [name, setName] = useState("")
  const [result, setResult] = useState<NameNumerology | null>(null)
  const [error, setError] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)

  const handleCalculate = () => {
    if (!name.trim() || name.trim().length < 2) { setError("Введите имя (минимум 2 буквы)"); setResult(null); return }
    const r = calculateNameNumerology(name.trim())
    if (!r) { setError("Не удалось рассчитать"); return }
    setError(""); setResult(r)
  }

  return (
    <div>
      <p className="text-center text-amber-200/70 max-w-2xl mx-auto mb-6 text-sm">
        Три числа: души (гласные), личности (согласные) и судьбы (все буквы). Поддерживается русский и английский.
      </p>

      <div className="max-w-md mx-auto mb-6">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите полное имя..."
          className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center text-lg" onKeyDown={(e) => e.key === "Enter" && handleCalculate()}/>
      </div>
      <div className="text-center mb-8"><Button onClick={handleCalculate} className="btn-gold px-8 py-3"><Type className="w-5 h-5 mr-2"/>Рассчитать</Button>{error && <p className="text-rose-300 text-sm mt-3">{error}</p>}</div>

      {result && (
        <div ref={resultRef} className="max-w-2xl mx-auto animate-fade-in space-y-4">
          <Card className="glass-mystic border-amber-400/40 text-center">
            <CardContent className="pt-8 pb-6">
              <h3 className="text-2xl font-bold text-gold-gradient mb-6" style={{ fontFamily: "var(--font-cinzel)" }}>{result.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Число Души", num: result.soulNumber, meaning: result.soulMeaning, color: "#f9a8d4", icon: "💫" },
                  { label: "Число Личности", num: result.personalityNumber, meaning: result.personalityMeaning, color: "#7dd3fc", icon: "🎭" },
                  { label: "Число Судьбы", num: result.destinyNumber, meaning: result.destinyMeaning, color: "#fbbf24", icon: "🌟" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-3xl mb-1">{item.icon}</div>
                    <div className="text-5xl font-bold mb-1" style={{ color: item.color, fontFamily: "var(--font-cinzel)" }}>{item.num}</div>
                    <div className="text-xs text-amber-200/70 mb-2">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {[
            { label: "💫 Число Души (гласные)", num: result.soulNumber, meaning: result.soulMeaning, color: "#f9a8d4", desc: "Ваша внутренняя суть — то, что вы чувствуете глубоко внутри" },
            { label: "🎭 Число Личности (согласные)", num: result.personalityNumber, meaning: result.personalityMeaning, color: "#7dd3fc", desc: "Как вас видят другие — внешняя маска, первое впечатление" },
            { label: "🌟 Число Судьбы (все буквы)", num: result.destinyNumber, meaning: result.destinyMeaning, color: "#fbbf24", desc: "Ваша миссия — то, зачем вы пришли в этот мир" },
          ].map((item, i) => (
            <Card key={i} className="glass-card border-amber-400/20">
              <CardContent className="pt-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0" style={{ background: `${item.color}25`, color: item.color, border: `1px solid ${item.color}50` }}>{item.num}</div>
                  <h4 className="text-sm font-bold text-amber-100">{item.label}</h4>
                </div>
                <p className="text-sm text-amber-100/85 mb-2">{item.meaning}</p>
                <p className="text-xs text-amber-200/60 italic">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {result && (
        <div className="max-w-2xl mx-auto mt-4 flex gap-3 justify-center flex-wrap">
          <ShareImageButton
            targetRef={resultRef}
            filename={`numerologiya-${result.name.toLowerCase().replace(/\s+/g, "-")}`}
            textFallback={`${result.name}: Душа=${result.soulNumber}, Личность=${result.personalityNumber}, Судьба=${result.destinyNumber}`}
            label="📲 Поделиться картинкой"
          />
        </div>
      )}
    </div>
  )
}

// ===================== ТАЙНА ИМЕНИ (ЭТИМОЛОГИЯ) =====================
function NameSecretTab() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<NameSecret | null>(null)
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState<NameSecret[]>([])
  const nameOfDay = useMemo(() => getNameOfTheDay(), [])

  const handleSearch = (name: string) => {
    if (!name.trim() || name.trim().length < 2) {
      setError("Введите имя (минимум 2 буквы)")
      setResult(null)
      setSuggestions([])
      return
    }
    const found = findNameSecret(name)
    if (found) {
      setResult(found)
      setError("")
      setSuggestions([])
    } else {
      setError("")
      setResult(null)
      const sg = searchNames(name, 6)
      setSuggestions(sg)
      if (sg.length === 0) {
        setError(`Имя «${name}» не найдено в базе. Попробуйте полное имя (например: Анна, Александр).`)
      }
    }
  }

  const handleSuggestionClick = (s: NameSecret) => {
    setQuery(s.name)
    setResult(s)
    setError("")
    setSuggestions([])
  }

  return (
    <div>
      <p className="text-center text-amber-200/70 max-w-2xl mx-auto mb-6 text-sm">
        Происхождение и первоначальное значение имени, черты характера, судьба, профессиональные склонности, камни-талисманы и известные носители. База: 90+ русских и международных имён.
      </p>

      {/* Поиск */}
      <div className="max-w-md mx-auto mb-3 relative">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            const sg = searchNames(e.target.value, 6)
            setSuggestions(sg)
            if (e.target.value.trim().length === 0) {
              setError("")
              setResult(null)
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          placeholder="Введите имя (например: Анна, Александр)..."
          className="bg-purple-950/40 border-amber-400/30 text-amber-100 placeholder:text-amber-200/40 text-center text-lg"
        />
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 z-20 glass-mystic border border-amber-400/30 rounded-lg overflow-hidden">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="w-full text-left px-4 py-2 hover:bg-amber-400/10 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-amber-100">{s.name}</span>
                <span className="text-[10px] text-amber-200/50 uppercase">{s.gender === "male" ? "муж." : "жен."}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="text-center mb-8">
        <Button onClick={() => handleSearch(query)} className="btn-gold px-8 py-3">
          <BookOpen className="w-5 h-5 mr-2"/>Узнать тайну имени
        </Button>
        {error && <p className="text-rose-300 text-sm mt-3">{error}</p>}
      </div>

      {/* Имя дня */}
      {!result && !error && (
        <div className="max-w-2xl mx-auto mb-6">
          <Card className="glass-card border-amber-400/20">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-3">✦ Имя дня</div>
              <button
                onClick={() => handleSuggestionClick(nameOfDay)}
                className="flex items-center gap-3 hover:bg-amber-400/5 rounded-lg p-2 transition-colors w-full text-left"
              >
                <div className="text-3xl">{nameOfDay.gender === "male" ? "♂" : "♀"}</div>
                <div>
                  <div className="text-lg font-bold text-gold-gradient" style={{ fontFamily: "var(--font-cinzel)" }}>{nameOfDay.name}</div>
                  <div className="text-xs text-amber-200/60">{nameOfDay.origin} · {nameOfDay.meaning}</div>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Результат */}
      {result && (
        <div className="max-w-2xl mx-auto animate-fade-in space-y-4">
          {/* Шапка */}
          <Card className="glass-mystic border-amber-400/40 text-center">
            <CardContent className="pt-8 pb-6">
              <div className="text-4xl mb-2">{result.gender === "male" ? "♂" : "♀"}</div>
              <h3 className="text-3xl font-bold text-gold-gradient mb-2" style={{ fontFamily: "var(--font-cinzel)" }}>{result.name}</h3>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="outline" className="border-amber-400/40 text-amber-200">{result.origin}</Badge>
                <Badge variant="outline" className="border-purple-400/40 text-purple-200">{result.meaning}</Badge>
              </div>
              <p className="text-xs text-amber-200/60 mt-3 italic">{result.translation}</p>
              {result.shortForms.length > 0 && (
                <div className="mt-3 text-xs text-amber-200/60">
                  <span className="text-amber-300/70">Уменьшительные: </span>
                  {result.shortForms.join(", ")}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Характер */}
          <Card className="glass-mystic border-amber-400/30">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">🧠 Характер</div>
              <p className="text-sm text-amber-100/85 leading-relaxed">{result.character}</p>
            </CardContent>
          </Card>

          {/* Судьба */}
          <Card className="glass-mystic border-amber-400/30">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">✦ Судьба</div>
              <p className="text-sm text-amber-100/85 leading-relaxed">{result.fate}</p>
            </CardContent>
          </Card>

          {/* Сферы */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="glass-card border-blue-400/20">
              <CardContent className="pt-4">
                <div className="text-xs text-blue-300 mb-1">💼 Карьера</div>
                <p className="text-sm text-amber-100/85">{result.career}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-rose-400/20">
              <CardContent className="pt-4">
                <div className="text-xs text-rose-300 mb-1">❤ В любви</div>
                <p className="text-sm text-amber-100/85">{result.love}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-emerald-400/20">
              <CardContent className="pt-4">
                <div className="text-xs text-emerald-300 mb-1">🌿 Здоровье</div>
                <p className="text-sm text-amber-100/85">{result.health}</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-purple-400/20">
              <CardContent className="pt-4">
                <div className="text-xs text-purple-300 mb-1">💎 Талисманы</div>
                <div className="space-y-1 text-xs text-amber-100/85">
                  <div><span className="text-amber-200/60">Камни:</span> {result.stones.join(", ")}</div>
                  <div><span className="text-amber-200/60">Цвета:</span> {result.colors.join(", ")}</div>
                  <div><span className="text-amber-200/60">Числа:</span> {result.numbers.join(", ")}</div>
                  <div><span className="text-amber-200/60">Дни:</span> {result.days.join(", ")}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Известные носители */}
          <Card className="glass-card border-amber-400/20">
            <CardContent className="pt-5">
              <div className="text-xs uppercase tracking-wider text-amber-300 mb-2">📜 Известные носители</div>
              <div className="flex flex-wrap gap-2">
                {result.famous.map((f, i) => (
                  <Badge key={i} variant="outline" className="border-amber-400/30 text-amber-200 text-xs">{f}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => shareResult("Тайна имени", `${result.name}: ${result.origin}, ${result.meaning}. ${result.character}`)} variant="outline" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
              <Share2 className="w-4 h-4 mr-2"/>Поделиться
            </Button>
          </div>
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
  const [quizStep, setQuizStep] = useState<number | null>(null)
  const [showVault, setShowVault] = useState(false)
  const { toast } = useToast()

  const overall = getOverallProgress()
  const allProgress = getAllProgress()
  const allKeys = getAllKeys()
  const keysCount = getKeysCount()

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
              <div className="flex items-center gap-2 mt-2 text-sm text-amber-200/70">
                <Key className="w-4 h-4 text-amber-300"/>
                <span>Ключей собрано: <strong className="text-amber-100">{keysCount} / 14</strong></span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetAllProgress()
                resetKeys()
                refresh()
                toast({ title: "Прогресс и ключи сброшены" })
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
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: `${s.color}25`,
                        boxShadow: `0 0 15px ${s.color}30`,
                      }}
                    >
                      {s.icon}
                    </div>
                    {allKeys[s.number] && (
                      <div
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center animate-pulse-glow"
                        style={{
                          backgroundColor: s.color,
                          boxShadow: `0 0 12px ${s.color}`,
                        }}
                        title={`Ключ получен: ${formatKeyDate(allKeys[s.number].earnedAt)}`}
                      >
                        <Key className="w-3 h-3 text-purple-950"/>
                      </div>
                    )}
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

      {/* Таинственная Дверь — Сокровищница Мастера (после всех шагов) */}
      <VaultDoor
        keysCount={keysCount}
        allKeys={allKeys}
        onOpen={() => {
          setShowVault(true)
          markVaultUnlocked()
        }}
      />

      {/* Модальное окно с деталями шага */}
      <Dialog open={selectedStep !== null && quizStep === null} onOpenChange={(open) => {
        if (!open) {
          setSelectedStep(null)
          refresh()
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-[#1a0a3a] border-amber-400/30">
          <ScrollArea className="max-h-[90vh]">
            {step && (
              <StepDetails
                step={step}
                progress={allProgress[step.number]}
                stepKey={allKeys[step.number]}
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
                onTakeQuiz={() => setQuizStep(step.number)}
                key={progressVersion}
              />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Модальное окно квиза-испытания */}
      <QuizDialog
        stepNumber={quizStep}
        onClose={() => {
          setQuizStep(null)
          refresh()
        }}
        onPass={(score, attempts) => {
          if (quizStep !== null) {
            saveKey(quizStep, score, attempts)
            const k = getKeysCount()
            toast({
              title: "🔑 Ключ получен!",
              description: `Шаг ${quizStep} пройден на 100%. Собрано ключей: ${k} из 14.`,
            })
            refresh()
          }
        }}
      />

      {/* Модальное окно сокровищницы */}
      <Dialog open={showVault} onOpenChange={setShowVault}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-[#1a0a3a] border-amber-400/50">
          <ScrollArea className="max-h-[90vh]">
            <VaultContent keysCount={keysCount} allKeys={allKeys}/>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StepDetails({
  step,
  progress,
  stepKey,
  onToggleChecklist,
  onToggleExercise,
  onNotesChange,
  onTakeQuiz,
}: {
  step: SuccessStep
  progress?: StepProgress
  stepKey?: StepKey
  onToggleChecklist: (idx: number) => void
  onToggleExercise: (idx: number) => void
  onNotesChange: (notes: string) => void
  onTakeQuiz: () => void
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

      {/* Испытание — получение ключа */}
      <section className="mb-2">
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: stepKey
              ? `linear-gradient(135deg, ${step.color}30, rgba(52,211,153,0.15))`
              : `linear-gradient(135deg, ${step.color}15, rgba(167,139,250,0.1))`,
            border: `2px solid ${stepKey ? "rgba(52,211,153,0.5)" : `${step.color}40`}`,
          }}
        >
          {/* Декоративный фон */}
          <div className="absolute -top-8 -right-8 opacity-10">
            {stepKey ? <Award className="w-32 h-32 text-emerald-400"/> : <Key className="w-32 h-32" style={{ color: step.color }}/>}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              {stepKey ? (
                <div className="w-12 h-12 rounded-full bg-emerald-400/30 flex items-center justify-center">
                  <Key className="w-6 h-6 text-emerald-300"/>
                </div>
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${step.color}30`,
                    boxShadow: `0 0 15px ${step.color}40`,
                  }}
                >
                  <Lock className="w-6 h-6" style={{ color: step.color }}/>
                </div>
              )}
              <div>
                <h3
                  className="text-xl font-bold text-amber-100"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {stepKey ? "Ключ получен" : "Испытание за Ключ"}
                </h3>
                <p className="text-xs text-amber-200/70">
                  {stepKey
                    ? `Получен: ${formatKeyDate(stepKey.earnedAt)} · Попыток: ${stepKey.attempts}`
                    : "Пройдите тест на 100%, чтобы получить ключ от Сокровищницы Мастера"}
                </p>
              </div>
            </div>

            <p className="text-sm text-amber-100/85 mb-4 leading-relaxed">
              {stepKey ? (
                <>
                  Вы прошли испытание этого шага и получили один из 14 ключей.
                  Соберите все ключи, чтобы открыть <strong className="text-emerald-300">Сокровищницу Мастера</strong> —
                  таинственную дверь, за которой скрыто финальное послание пути.
                </>
              ) : (
                <>
                  За этим шагом скрыто испытание — 5 вопросов по теме шага.
                  Ответьте правильно на все 5, чтобы получить <strong style={{ color: step.color }}>ключ №{step.number}</strong>.
                  Собрав все 14 ключей, вы откроете дверь к тайне, доступной только Мастерам пути.
                </>
              )}
            </p>

            {stepKey ? (
              <div className="flex items-center gap-2 text-sm text-emerald-200">
                <CheckCircle2 className="w-4 h-4"/>
                <span>Испытание пройдено. Ключ у вас.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onTakeQuiz}
                  className="ml-auto border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1"/>
                  Пройти заново
                </Button>
              </div>
            ) : (
              <Button
                onClick={onTakeQuiz}
                className="btn-gold w-full py-3 text-base"
              >
                <Key className="w-5 h-5 mr-2"/>
                Пройти испытание за Ключ №{step.number}
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// ===================== QUIZ DIALOG (ИСПЫТАНИЕ) =====================
function QuizDialog({
  stepNumber,
  onClose,
  onPass,
}: {
  stepNumber: number | null
  onClose: () => void
  onPass: (score: number, attempts: number) => void
}) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [attempts, setAttempts] = useState(1)
  const [keyEarned, setKeyEarned] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  // Сброс состояния при смене шага
  if (stepNumber !== activeStep) {
    setActiveStep(stepNumber)
    setCurrentQ(0)
    setAnswers([])
    setShowResult(false)
    setKeyEarned(false)
  }

  if (stepNumber === null) return null
  const quiz = getStepQuiz(stepNumber)
  if (!quiz) return null

  const totalQuestions = quiz.questions.length
  const question = quiz.questions[currentQ]
  const selectedAnswer = answers[currentQ]
  const score = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length
  const isPerfect = showResult && score === totalQuestions
  const isLastQ = currentQ === totalQuestions - 1

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== undefined) return
    const newAnswers = [...answers]
    newAnswers[currentQ] = idx
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (isLastQ) {
      const finalScore = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length
      setShowResult(true)
      if (finalScore === totalQuestions) {
        setKeyEarned(true)
        setTimeout(() => {
          onPass(100, attempts)
        }, 2500)
      }
    } else {
      setCurrentQ(currentQ + 1)
    }
  }

  const handleRetry = () => {
    setCurrentQ(0)
    setAnswers([])
    setShowResult(false)
    setKeyEarned(false)
    setAttempts(attempts + 1)
  }

  return (
    <Dialog open={stepNumber !== null} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-[#1a0a3a] border-amber-400/40">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 sm:p-8">
            {/* Шапка */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge
                  className="border"
                  style={{
                    backgroundColor: `${successSteps[stepNumber - 1].color}25`,
                    color: successSteps[stepNumber - 1].color,
                    borderColor: `${successSteps[stepNumber - 1].color}50`,
                  }}
                >
                  Испытание · Шаг {stepNumber}/14
                </Badge>
                <h2
                  className="text-2xl font-bold text-amber-100 mt-2"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {keyEarned ? "🔑 Ключ получен!" : showResult ? "Результат" : `Вопрос ${currentQ + 1} из ${totalQuestions}`}
                </h2>
              </div>
              <Key className="w-8 h-8 text-amber-300/60"/>
            </div>

            {/* Прогресс вопроса */}
            {!showResult && (
              <Progress
                value={((currentQ + (selectedAnswer !== undefined ? 1 : 0)) / totalQuestions) * 100}
                className="mb-6 bg-purple-950/60"
              />
            )}

            {/* Сам вопрос */}
            {!showResult && (
              <div>
                <Card className="glass-mystic border-amber-400/30 mb-4">
                  <CardContent className="pt-5">
                    <p className="text-lg text-amber-100 leading-relaxed mb-5">
                      {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((opt, idx) => {
                        const isSelected = selectedAnswer === idx
                        const isCorrect = idx === question.correctIndex
                        const showCorrect = selectedAnswer !== undefined && isCorrect
                        const showWrong = isSelected && !isCorrect
                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={selectedAnswer !== undefined}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              showCorrect
                                ? "bg-emerald-400/20 border-emerald-400/60 text-emerald-100"
                                : showWrong
                                ? "bg-rose-400/20 border-rose-400/60 text-rose-100"
                                : isSelected
                                ? "bg-amber-400/20 border-amber-400/60 text-amber-100"
                                : "bg-purple-950/40 border-amber-400/20 text-amber-100/85 hover:bg-amber-400/10 hover:border-amber-400/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  showCorrect
                                    ? "bg-emerald-400 text-purple-950"
                                    : showWrong
                                    ? "bg-rose-400 text-purple-950"
                                    : "bg-amber-400/30 text-amber-200"
                                }`}
                              >
                                {showCorrect ? "✓" : showWrong ? "✗" : String.fromCharCode(65 + idx)}
                              </div>
                              <span className="text-sm leading-relaxed">{opt}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {selectedAnswer !== undefined && (
                  <Card className="glass-card border-amber-400/30 mb-4 animate-fade-in">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-300 mt-0.5 shrink-0"/>
                        <p className="text-sm text-amber-100/85 italic leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-amber-200/70">
                    {selectedAnswer !== undefined && (
                      selectedAnswer === question.correctIndex
                        ? <span className="text-emerald-300">✓ Верно!</span>
                        : <span className="text-rose-300">✗ Неверно</span>
                    )}
                  </div>
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === undefined}
                    className="btn-gold"
                  >
                    {isLastQ ? (
                      <>
                        <Trophy className="w-4 h-4 mr-1"/>
                        Завершить
                      </>
                    ) : (
                      <>
                        Далее
                        <ArrowRight className="w-4 h-4 ml-1"/>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Результат */}
            {showResult && (
              <div className="text-center animate-fade-in">
                {isPerfect ? (
                  <>
                    {/* Анимация получения ключа */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-pulse-glow"/>
                      <div className="absolute inset-2 rounded-full bg-amber-400/30 animate-pulse-glow" style={{ animationDelay: "0.3s" }}/>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Key className="w-16 h-16 text-amber-300 animate-float"/>
                      </div>
                      {/* Лучи вокруг */}
                      {Array.from({ length: 12 }).map((_, i) => {
                        const a = (i / 12) * Math.PI * 2
                        return (
                          <line
                            key={i}
                            x1="64"
                            y1="64"
                            x2={64 + Math.cos(a) * 60}
                            y2={64 + Math.sin(a) * 60}
                            stroke="#fbbf24"
                            strokeWidth="1"
                            opacity="0.6"
                          />
                        )
                      })}
                    </div>
                    <h3
                      className="text-3xl font-bold text-gold-gradient mb-2"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      100% верно!
                    </h3>
                    <p className="text-amber-100 mb-1">
                      Вы прошли испытание Шага {stepNumber}
                    </p>
                    <p className="text-emerald-300 mb-6 font-medium">
                      🔑 Ключ №{stepNumber} из 14 получен!
                    </p>
                    <Card className="glass-mystic border-amber-400/40 mb-6">
                      <CardContent className="pt-5 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-amber-300"/>
                          <span className="text-xs uppercase tracking-wider text-amber-300">Мудрость шага</span>
                        </div>
                        <p className="text-amber-100 italic">{successSteps[stepNumber - 1].keyInsight}</p>
                      </CardContent>
                    </Card>
                    <p className="text-sm text-amber-200/70 mb-4">
                      Окно закроется автоматически через несколько секунд...
                    </p>
                  </>
                ) : (
                  <>
                    <div
                      className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(248,113,113,0.2)",
                        border: "2px solid rgba(248,113,113,0.5)",
                      }}
                    >
                      <span className="text-4xl font-bold text-rose-300">
                        {score}/{totalQuestions}
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-bold text-rose-200 mb-2"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      Почти получилось!
                    </h3>
                    <p className="text-amber-100/85 mb-1">
                      Правильных ответов: <strong>{score}</strong> из <strong>{totalQuestions}</strong>
                    </p>
                    <p className="text-amber-200/70 text-sm mb-6">
                      Для получения ключа нужно ответить на все вопросы верно.
                      Повторите теорию и попробуйте снова.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={handleRetry}
                        className="btn-gold"
                      >
                        <RefreshCw className="w-4 h-4 mr-1"/>
                        Попробовать снова
                      </Button>
                      <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10"
                      >
                        Выйти
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

// ===================== VAULT DOOR (ДВЕРЬ СОКРОВИЩНИЦЫ) =====================
function VaultDoor({
  keysCount,
  allKeys,
  onOpen,
}: {
  keysCount: number
  allKeys: Record<number, StepKey>
  onOpen: () => void
}) {
  const isUnlocked = keysCount === 14
  const wasOpenedBefore = isVaultUnlocked()
  const [showSpark, setShowSpark] = useState(false)

  useEffect(() => {
    if (isUnlocked) {
      const t1 = setTimeout(() => setShowSpark(true), 100)
      const t2 = setTimeout(() => setShowSpark(false), 2100)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [isUnlocked])

  return (
    <Card
      className={`mt-8 mb-8 relative overflow-hidden transition-all ${
        isUnlocked
          ? "glass-mystic border-amber-400/60 animate-glow"
          : "glass-card border-purple-400/30"
      }`}
    >
      <CardContent className="pt-6">
        <div className="text-center">
          {/* SVG двери */}
          <div className="relative w-48 h-64 mx-auto mb-4">
            <svg viewBox="0 0 200 280" className="w-full h-full">
              <defs>
                <linearGradient id="door-bg" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isUnlocked ? "#fbbf24" : "#2d1b4e"} stopOpacity="0.4"/>
                  <stop offset="100%" stopColor={isUnlocked ? "#f59e0b" : "#1a0a3a"} stopOpacity="0.6"/>
                </linearGradient>
                <radialGradient id="door-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(251,191,36,0.6)"/>
                  <stop offset="100%" stopColor="rgba(251,191,36,0)"/>
                </radialGradient>
              </defs>

              {/* Свечение если открыто */}
              {isUnlocked && (
                <rect x="0" y="0" width="200" height="280" fill="url(#door-glow)"/>
              )}

              {/* Дверная рама */}
              <rect x="20" y="20" width="160" height="240" fill="url(#door-bg)" stroke={isUnlocked ? "#fbbf24" : "#a78bfa"} strokeWidth="3" rx="6"/>
              <rect x="28" y="28" width="144" height="224" fill="none" stroke={isUnlocked ? "rgba(251,191,36,0.4)" : "rgba(167,139,250,0.4)"} strokeWidth="1" rx="3"/>

              {/* Дверное полотно */}
              <rect x="35" y="35" width="130" height="210" fill={isUnlocked ? "rgba(251,191,36,0.2)" : "rgba(26,10,58,0.7)"} stroke={isUnlocked ? "#fbbf24" : "#7c3aed"} strokeWidth="2" rx="3"/>

              {/* Панели двери */}
              <rect x="45" y="45" width="110" height="80" fill="none" stroke={isUnlocked ? "rgba(251,191,36,0.5)" : "rgba(167,139,250,0.4)"} strokeWidth="1" rx="2"/>
              <rect x="45" y="135" width="110" height="100" fill="none" stroke={isUnlocked ? "rgba(251,191,36,0.5)" : "rgba(167,139,250,0.4)"} strokeWidth="1" rx="2"/>

              {/* Орнамент на верхней панели — 8-конечная звезда */}
              <g transform="translate(100, 85)">
                <path
                  d="M 0 -16 L 4 -5 L 16 -5 L 6 2 L 10 13 L 0 6 L -10 13 L -6 2 L -16 -5 L -4 -5 Z"
                  fill={isUnlocked ? "rgba(251,191,36,0.9)" : "rgba(167,139,250,0.5)"}
                  stroke={isUnlocked ? "#fef3c7" : "#a78bfa"}
                  strokeWidth="0.5"
                />
                <circle r="2" fill={isUnlocked ? "#fef3c7" : "#c4b5fd"}/>
              </g>

              {/* Орнамент на нижней — 14 ключей вокруг */}
              <g transform="translate(100, 185)">
                {Array.from({ length: 14 }).map((_, i) => {
                  const a = (i / 14) * Math.PI * 2 - Math.PI / 2
                  const x = Math.cos(a) * 28
                  const y = Math.sin(a) * 28
                  const hasKey = allKeys[i + 1]
                  return (
                    <g key={i} transform={`translate(${x}, ${y})`}>
                      <circle
                        r="3"
                        fill={hasKey ? "#fbbf24" : "rgba(148,163,184,0.3)"}
                        stroke={hasKey ? "#fef3c7" : "rgba(167,139,250,0.4)"}
                        strokeWidth="0.5"
                      />
                      {hasKey && (
                        <text y="1.5" fontSize="4" textAnchor="middle" fill="#1a0a3a">🔑</text>
                      )}
                    </g>
                  )
                })}
                {/* Центральный символ */}
                <circle r="6" fill={isUnlocked ? "rgba(251,191,36,0.5)" : "rgba(167,139,250,0.3)"} stroke={isUnlocked ? "#fbbf24" : "#a78bfa"} strokeWidth="1"/>
                <text y="2.5" fontSize="8" textAnchor="middle" fill={isUnlocked ? "#fef3c7" : "#c4b5fd"}>
                  {isUnlocked ? "✦" : "🔒"}
                </text>
              </g>

              {/* Замочная скважина если закрыто */}
              {!isUnlocked && (
                <g transform="translate(100, 245)">
                  <circle r="3" fill="rgba(167,139,250,0.4)" stroke="#a78bfa" strokeWidth="0.8"/>
                  <rect x="-1" y="2" width="2" height="6" fill="rgba(167,139,250,0.4)" stroke="#a78bfa" strokeWidth="0.4"/>
                </g>
              )}

              {/* Искры при открытии */}
              {showSpark && Array.from({ length: 12 }).map((_, i) => {
                const a = (i / 12) * Math.PI * 2
                return (
                  <circle
                    key={i}
                    cx={100 + Math.cos(a) * 80}
                    cy={140 + Math.sin(a) * 100}
                    r="2"
                    fill="#fef3c7"
                    opacity="0.8"
                  >
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                )
              })}
            </svg>

            {/* Замок-бейдж сверху */}
            <div
              className={`absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center ${
                isUnlocked
                  ? "bg-amber-400/30 border-2 border-amber-400"
                  : "bg-purple-950/60 border-2 border-purple-400/50"
              }`}
            >
              {isUnlocked
                ? <Unlock className="w-6 h-6 text-amber-200"/>
                : <Lock className="w-6 h-6 text-purple-300"/>
              }
            </div>
          </div>

          <h3
            className={`text-2xl font-bold mb-2 ${isUnlocked ? "text-gold-gradient" : "text-purple-200"}`}
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {isUnlocked ? "Сокровищница Открыта" : "Сокровищница Мастера"}
          </h3>

          <p className={`text-sm mb-4 ${isUnlocked ? "text-amber-100/85" : "text-amber-200/70"}`}>
            {isUnlocked
              ? "Все 14 ключей собраны. Дверь открыта. Войдите, чтобы получить тайну Мастера."
              : `Соберите все 14 ключей, пройдя испытания каждого шага на 100%. Сейчас у вас: ${keysCount} из 14.`}
          </p>

          {/* Прогресс ключей */}
          <div className="max-w-md mx-auto mb-4">
            <div className="flex justify-between text-xs text-amber-200/60 mb-1">
              <span>Ключи</span>
              <span>{keysCount} / 14</span>
            </div>
            <Progress
              value={(keysCount / 14) * 100}
              className="bg-purple-950/60"
            />
          </div>

          {/* Сетка с мини-ключами */}
          <div className="grid grid-cols-7 gap-2 max-w-md mx-auto mb-4">
            {Array.from({ length: 14 }).map((_, i) => {
              const hasKey = !!allKeys[i + 1]
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs ${
                    hasKey
                      ? "bg-amber-400/30 border border-amber-400/60"
                      : "bg-purple-950/40 border border-purple-400/20"
                  }`}
                  title={hasKey ? `Шаг ${i + 1}: ${successSteps[i].title}` : `Шаг ${i + 1}: не пройден`}
                >
                  {hasKey ? (
                    <Key className="w-3 h-3 text-amber-300"/>
                  ) : (
                    <span className="text-purple-300/40">{i + 1}</span>
                  )}
                </div>
              )
            })}
          </div>

          <Button
            onClick={onOpen}
            disabled={!isUnlocked}
            className={isUnlocked ? "btn-gold px-8 py-3 text-base" : "opacity-50 cursor-not-allowed px-8 py-3"}
          >
            {isUnlocked ? (
              <>
                <DoorOpen className="w-5 h-5 mr-2"/>
                {wasOpenedBefore ? "Войти снова" : "Войти в Сокровищницу"}
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2"/>
                Дверь заперта
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ===================== VAULT CONTENT (ТАЙНА ЗА ДВЕРЬЮ) =====================
function VaultContent({
  keysCount,
  allKeys,
}: {
  keysCount: number
  allKeys: Record<number, StepKey>
}) {
  const today = new Date().toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  })

  return (
    <div className="p-6 sm:p-8">
      {/* Шапка — сертификат */}
      <div className="text-center mb-6">
        {/* Большая звезда */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg viewBox="0 0 128 128" className="w-full h-full">
            <defs>
              <radialGradient id="cert-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(251,191,36,0.6)"/>
                <stop offset="100%" stopColor="rgba(251,191,36,0)"/>
              </radialGradient>
              <linearGradient id="cert-star" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7"/>
                <stop offset="50%" stopColor="#fbbf24"/>
                <stop offset="100%" stopColor="#f59e0b"/>
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r="60" fill="url(#cert-glow)"/>
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2
              return (
                <line
                  key={i}
                  x1={64 + Math.cos(a) * 30}
                  y1={64 + Math.sin(a) * 30}
                  x2={64 + Math.cos(a) * (i % 2 === 0 ? 55 : 45)}
                  y2={64 + Math.sin(a) * (i % 2 === 0 ? 55 : 45)}
                  stroke="#fbbf24"
                  strokeWidth={i % 2 === 0 ? 2 : 1}
                  opacity="0.6"
                />
              )
            })}
            <path
              d="M 64 24 L 73 50 L 100 50 L 78 66 L 86 92 L 64 76 L 42 92 L 50 66 L 28 50 L 55 50 Z"
              fill="url(#cert-star)"
              stroke="#fef3c7"
              strokeWidth="1"
            />
            <circle cx="64" cy="64" r="6" fill="#7c3aed"/>
            <circle cx="64" cy="64" r="2" fill="#fef3c7"/>
          </svg>
        </div>

        <div className="text-xs uppercase tracking-widest text-amber-300/80 mb-1">
          ✦ Сокровищница Мастера ✦
        </div>
        <h2
          className="text-3xl sm:text-4xl font-bold text-gold-gradient mb-2"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          14 Ключей Получены
        </h2>
        <p className="text-amber-100/80 mb-1">
          Вы прошли все 14 испытаний пути Тойчи
        </p>
        <p className="text-amber-200/60 text-sm">{today}</p>
      </div>

      {/* Сертификат */}
      <Card className="glass-mystic border-amber-400/40 mb-6 relative overflow-hidden">
        <div className="absolute top-2 right-2 text-6xl opacity-10">📜</div>
        <CardContent className="pt-6 relative z-10">
          <div className="text-center mb-4">
            <div className="text-xs uppercase tracking-wider text-amber-300 mb-1">Сертификат</div>
            <h3
              className="text-xl font-bold text-amber-100"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Мастер 14 Шагов Успеха
            </h3>
          </div>
          <p className="text-sm text-amber-100/85 text-center italic mb-4 leading-relaxed">
            Настоящим подтверждается, что обладатель этого сертификата прошёл все 14
            испытаний пути Тойчи — от Чёткого Намерения до Целостного Наследия.
            Он(а) доказал(а) знание принципов, упражнений и материалов каждого шага.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs text-amber-200/70">
            <div>
              <div className="text-amber-300/60">Ключей собрано:</div>
              <div className="text-amber-100 font-bold">14 / 14 ✦</div>
            </div>
            <div>
              <div className="text-amber-300/60">Дата завершения:</div>
              <div className="text-amber-100 font-bold">{today}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Тайное послание */}
      <Card className="glass-mystic border-purple-400/40 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-300"/>
            <h3
              className="text-lg font-bold text-purple-100"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Тайное послание Мастера
            </h3>
          </div>
          <div className="space-y-3 text-amber-100/85 text-sm leading-relaxed italic">
            <p>
              «Ты прошел путь. 14 ключей — не просто символы, а 14 качеств, которые теперь
              живут в тебе. Чёткое намерение, честный аудит, переплавленные убеждения,
              архитектура привычек, управляемая энергия, глубокий фокус, эмоциональная мудрость,
              финансовая свобода, сила отношений, непрерывное обучение, дисциплина действия,
              резильентность, вклад в мир и целостное наследие.
            </p>
            <p>
              Тайна, которую ты искал за этой дверью, была с тобой всё это время.
              Она в том, что <strong className="text-amber-200 not-italic">Мастер — это не статус, а путь</strong>.
              Каждый день ты выбираешь: оставаться там, где был, или пройти по спирали снова,
              на новом уровне. Каждый раз, когда ты это делаешь, ты становишься глубже.
            </p>
            <p>
              Теперь у тебя есть ключи. Но настоящая мудрость не в том, чтобы их хранить,
              а в том, чтобы <strong className="text-amber-200 not-italic">открывать ими двери для других</strong>.
              Поделись тем, что узнал. Стань ментором. Передай свет.
              В этом — финальный шаг, который никогда не заканчивается.
            </p>
            <p className="text-amber-200/70 text-center pt-2">
              ✦ Так говорит Тойчи ✦
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Все 14 ключей с датами */}
      <Card className="glass-card border-amber-400/20 mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-amber-100 flex items-center gap-2" style={{ fontFamily: "var(--font-cinzel)" }}>
            <Key className="w-5 h-5 text-amber-300"/>
            Ваши 14 Ключей
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {successSteps.map((s) => {
            const key = allKeys[s.number]
            return (
              <div
                key={s.number}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-amber-400/5"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${s.color}30`,
                    border: `1px solid ${s.color}60`,
                  }}
                >
                  <Key className="w-4 h-4" style={{ color: s.color }}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-amber-100 truncate">
                    {s.number}. {s.title}
                  </div>
                  <div className="text-xs text-amber-200/60">
                    {key ? `Получен: ${formatKeyDate(key.earnedAt)}` : "Не получен"}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border text-xs shrink-0"
                  style={{
                    backgroundColor: `${s.color}20`,
                    color: s.color,
                    borderColor: `${s.color}50`,
                  }}
                >
                  {key ? `${key.attempts} поп.` : "—"}
                </Badge>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Финальный таро-расклад Мастера */}
      <Card className="glass-mystic border-amber-400/40">
        <CardContent className="pt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-amber-300"/>
            <h3
              className="text-lg font-bold text-gold-gradient"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Карта Мастера
            </h3>
          </div>
          <p className="text-sm text-amber-100/80 mb-4">
            Карта, которая открывается только Мастерам 14 Шагов:
          </p>
          {/* Карта Мир (XXI) — финальная карта старших арканов */}
          <div className="flex justify-center mb-4">
            <CardSVG
              card={allTarotCards.find(c => c.id === "major-21")!}
              width={180}
              height={288}
              className="rounded-xl shadow-2xl shadow-amber-400/30 animate-float"
            />
          </div>
          <p className="text-amber-100/85 italic text-sm leading-relaxed">
            <strong className="text-amber-200">Мир (XXI)</strong> — финальный старший аркан.
            Символ целостности, завершения великого цикла, интеграции всех частей.
            Ты собрал все 14 ключей в единую систему. Теперь ты — космический танцор,
            стоящий в венке жизни, окружённый четырьмя силами: силой действия (Лев),
            силой устойчивости (Телец), силой духа (Ангел) и силой видения (Орёл).
          </p>
          <p className="text-amber-200/70 text-xs mt-3">
            ✦ Этот расклад доступен только в Сокровищнице ✦
          </p>
        </CardContent>
      </Card>
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
