"use client"

/**
 * Visitor Tracker — система отслеживания посещений и действий на сайте.
 * Хранит данные в localStorage (без бэкенда).
 *
 * Для реального multi-user трекинга нужен бэкенд (Firebase/Supabase).
 * Сейчас трекает текущего пользователя и его сессии.
 */

export interface VisitSession {
  id: string
  startTime: number
  endTime: number | null
  sectionsVisited: string[]
  actions: VisitAction[]
  userAgent: string
  screenSize: string
  language: string
  referrer: string
}

export interface VisitAction {
  type: string      // "draw_cards", "reveal_card", "section_change", etc.
  section: string   // which section
  detail: string    // additional info
  timestamp: number
}

const STORAGE_KEY = "mystic-tarot-visits"
const MAX_SESSIONS = 200  // храним последние 200 сессий

let currentSession: VisitSession | null = null

/** Начать новую сессию отслеживания */
export function startSession() {
  if (typeof window === "undefined") return

  // Загружаем предыдущую сессию если она есть и не завершена
  const sessions = loadSessions()
  const lastSession = sessions[sessions.length - 1]

  // Если последняя сессия моложе 30 минут — продолжаем её
  if (lastSession && lastSession.endTime === null && Date.now() - lastSession.startTime < 30 * 60 * 1000) {
    currentSession = lastSession
    return
  }

  // Завершаем предыдущую сессию если была открыта
  if (lastSession && lastSession.endTime === null) {
    lastSession.endTime = Date.now()
    saveSessions(sessions)
  }

  // Создаём новую сессию
  currentSession = {
    id: `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    startTime: Date.now(),
    endTime: null,
    sectionsVisited: [],
    actions: [],
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    referrer: document.referrer || "прямой заход",
  }

  sessions.push(currentSession)

  // Ограничиваем количество хранимых сессий
  if (sessions.length > MAX_SESSIONS) {
    sessions.splice(0, sessions.length - MAX_SESSIONS)
  }

  saveSessions(sessions)
}

/** Записать действие пользователя */
export function trackAction(type: string, section: string, detail: string = "") {
  if (typeof window === "undefined") return
  if (!currentSession) startSession()
  if (!currentSession) return

  const action: VisitAction = {
    type,
    section,
    detail,
    timestamp: Date.now(),
  }

  currentSession.actions.push(action)

  // Добавляем секцию в список посещённых
  if (type === "section_change" && !currentSession.sectionsVisited.includes(section)) {
    currentSession.sectionsVisited.push(section)
  }

  // Обновляем в хранилище
  const sessions = loadSessions()
  const idx = sessions.findIndex(s => s.id === currentSession!.id)
  if (idx !== -1) {
    sessions[idx] = currentSession
    saveSessions(sessions)
  }
}

/** Завершить текущую сессию */
export function endSession() {
  if (typeof window === "undefined") return
  if (!currentSession) return

  currentSession.endTime = Date.now()

  const sessions = loadSessions()
  const idx = sessions.findIndex(s => s.id === currentSession!.id)
  if (idx !== -1) {
    sessions[idx] = currentSession
    saveSessions(sessions)
  }
}

/** Загрузить все сессии из localStorage */
export function loadSessions(): VisitSession[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

/** Сохранить сессии в localStorage */
function saveSessions(sessions: VisitSession[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch {
    // ignore quota errors
  }
}

/** Очистить все сессии */
export function clearSessions() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Получить статистику для админки
 */
export function getStats() {
  const sessions = loadSessions()
  const now = Date.now()

  const today = sessions.filter(s => {
    const d = new Date(s.startTime)
    const todayDate = new Date()
    return d.toDateString() === todayDate.toDateString()
  })

  const last7days = sessions.filter(s => now - s.startTime < 7 * 24 * 60 * 60 * 1000)

  // Подсчёт популярных секций
  const sectionCounts: Record<string, number> = {}
  sessions.forEach(s => {
    s.sectionsVisited.forEach(sec => {
      sectionCounts[sec] = (sectionCounts[sec] || 0) + 1
    })
  })

  const topSections = Object.entries(sectionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  // Подсчёт действий
  const actionCounts: Record<string, number> = {}
  sessions.forEach(s => {
    s.actions.forEach(a => {
      actionCounts[a.type] = (actionCounts[a.type] || 0) + 1
    })
  })

  // Среднее время сессии
  const completedSessions = sessions.filter(s => s.endTime !== null)
  const avgDuration = completedSessions.length > 0
    ? completedSessions.reduce((sum, s) => sum + (s.endTime! - s.startTime), 0) / completedSessions.length
    : 0

  return {
    totalVisits: sessions.length,
    todayVisits: today.length,
    last7daysVisits: last7days.length,
    topSections,
    actionCounts,
    avgDuration,
    sessions: sessions.slice().reverse(),  // последние первыми
  }
}

/** Форматировать время в читаемый вид */
export function formatTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

/** Форматировать длительность */
export function formatDuration(ms: number): string {
  if (!ms || ms < 0) return "—"
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) return `${hours}ч ${minutes % 60}м`
  if (minutes > 0) return `${minutes}м ${seconds % 60}с`
  return `${seconds}с`
}

/** Получить короткое название устройства из user agent */
export function getDeviceInfo(ua: string): string {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua)
  let browser = "Браузер"
  if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) browser = "Chrome"
  else if (/Firefox/i.test(ua)) browser = "Firefox"
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari"
  else if (/Edge/i.test(ua)) browser = "Edge"

  let os = "ПК"
  if (/Android/i.test(ua)) os = "Android"
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS"
  else if (/Windows/i.test(ua)) os = "Windows"
  else if (/Mac/i.test(ua)) os = "macOS"
  else if (/Linux/i.test(ua)) os = "Linux"

  return `${isMobile ? "📱" : "💻"} ${os} · ${browser}`
}
