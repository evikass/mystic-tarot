"use client"

import { useState, useEffect } from "react"
import { X, Eye, EyeOff, Trash2, RefreshCw, TrendingUp, Clock, Users, Activity } from "lucide-react"
import {
  getStats,
  formatTime,
  formatDuration,
  getDeviceInfo,
  clearSessions,
  type VisitSession,
} from "@/lib/visitor-tracker"

const ADMIN_USER = "evikass"
const ADMIN_PASS = "jenuari11"

interface AdminPanelProps {
  onClose: () => void
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null)
  const [selectedSession, setSelectedSession] = useState<VisitSession | null>(null)

  const loadStats = () => {
    setStats(getStats())
  }

  useEffect(() => {
    if (loggedIn) loadStats()
  }, [loggedIn])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setLoggedIn(true)
      setError("")
      setUser("")
      setPass("")
    } else {
      setError("Неверный логин или пароль")
    }
  }

  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleClear = () => {
    setShowClearConfirm(true)
  }

  const confirmClear = () => {
    clearSessions()
    setShowClearConfirm(false)
    loadStats()
  }

  // === Форма входа ===
  if (!loggedIn) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
          <div
            className="relative w-full max-w-sm mx-4 rounded-2xl border border-amber-400/30 p-8"
            style={{ background: "linear-gradient(135deg, #1a1025 0%, #0a0510 100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-amber-200/50 hover:text-amber-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="text-3xl mb-2">🔐</div>
              <h2 className="text-xl font-bold text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                Панель администратора
              </h2>
              <p className="text-xs text-amber-200/50 mt-1">Мистическое Таро</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-amber-200/70 mb-1 block">Логин</label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-amber-400/20 text-amber-100 text-sm focus:outline-none focus:border-amber-400/50"
                  placeholder="Введите логин"
                />
              </div>
              <div>
                <label className="text-xs text-amber-200/70 mb-1 block">Пароль</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 rounded-lg bg-black/40 border border-amber-400/20 text-amber-100 text-sm focus:outline-none focus:border-amber-400/50"
                    placeholder="Введите пароль"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-200/50 hover:text-amber-200"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all"
                style={{
                  background: "linear-gradient(135deg, #b8860b 0%, #ffd700 100%)",
                  color: "#0a0510",
                }}
              >
                Войти
              </button>
            </form>
          </div>
      </div>
    )
  }

  // === Админ-панель ===
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-amber-400/30 flex flex-col"
        style={{ background: "linear-gradient(135deg, #1a1025 0%, #0a0510 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-400/20">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="text-lg font-bold text-amber-100" style={{ fontFamily: "var(--font-cinzel)" }}>
                Панель администратора
              </h2>
              <p className="text-xs text-amber-200/50">Мистическое Таро · Статистика посещений</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadStats}
              className="p-2 rounded-lg text-amber-200/70 hover:bg-amber-400/10 hover:text-amber-100 transition-all"
              title="Обновить"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleClear}
              className="p-2 rounded-lg text-rose-300/70 hover:bg-rose-400/10 hover:text-rose-300 transition-all"
              title="Очистить статистику"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-amber-200/70 hover:bg-amber-400/10 hover:text-amber-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {stats && (
            <>
              {/* === Карточки статистики === */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  icon={<Users className="w-5 h-5" />}
                  label="Всего визитов"
                  value={stats.totalVisits.toString()}
                  color="#ffd700"
                />
                <StatCard
                  icon={<Activity className="w-5 h-5" />}
                  label="Сегодня"
                  value={stats.todayVisits.toString()}
                  color="#86efac"
                />
                <StatCard
                  icon={<TrendingUp className="w-5 h-5" />}
                  label="За 7 дней"
                  value={stats.last7daysVisits.toString()}
                  color="#a78bfa"
                />
                <StatCard
                  icon={<Clock className="w-5 h-5" />}
                  label="Среднее время"
                  value={formatDuration(stats.avgDuration)}
                  color="#fda4af"
                />
              </div>

              {/* === Популярные секции === */}
              {stats.topSections.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-amber-200/80 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Популярные разделы
                  </h3>
                  <div className="space-y-2">
                    {stats.topSections.map(([section, count]) => (
                      <div key={section} className="flex items-center gap-3">
                        <span className="text-xs text-amber-100 w-32 truncate">{section}</span>
                        <div className="flex-1 h-6 rounded bg-black/30 overflow-hidden">
                          <div
                            className="h-full rounded transition-all"
                            style={{
                              width: `${Math.min(100, (count / stats.topSections[0][1]) * 100)}%`,
                              background: "linear-gradient(90deg, #b8860b, #ffd700)",
                            }}
                          />
                        </div>
                        <span className="text-xs text-amber-200/60 w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === Действия === */}
              {Object.keys(stats.actionCounts).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-amber-200/80 mb-3">Действия пользователей</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(stats.actionCounts).map(([type, count]) => (
                      <div
                        key={type}
                        className="px-3 py-1.5 rounded-lg text-xs border border-amber-400/20 bg-black/30"
                      >
                        <span className="text-amber-200/70">{type}</span>
                        <span className="text-amber-100 font-bold ml-2">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === История сессий === */}
              <div>
                <h3 className="text-sm font-semibold text-amber-200/80 mb-3">
                  История визитов ({stats.sessions.length})
                </h3>

                {/* Таблица на десктопе */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-amber-200/50 border-b border-amber-400/10">
                        <th className="pb-2 pr-3">Когда</th>
                        <th className="pb-2 pr-3">Устройство</th>
                        <th className="pb-2 pr-3">Источник</th>
                        <th className="pb-2 pr-3">Разделы</th>
                        <th className="pb-2 pr-3">Действия</th>
                        <th className="pb-2 pr-3">Длительность</th>
                        <th className="pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.sessions.slice(0, 50).map((s) => (
                        <tr
                          key={s.id}
                          className="border-b border-amber-400/5 hover:bg-amber-400/5 cursor-pointer"
                          onClick={() => setSelectedSession(s)}
                        >
                          <td className="py-2 pr-3 text-amber-100/80 whitespace-nowrap">{formatTime(s.startTime)}</td>
                          <td className="py-2 pr-3 text-amber-200/60">{getDeviceInfo(s.userAgent)}</td>
                          <td className="py-2 pr-3 text-amber-200/60 max-w-[100px] truncate">{s.referrer}</td>
                          <td className="py-2 pr-3 text-amber-200/60">{s.sectionsVisited.length}</td>
                          <td className="py-2 pr-3 text-amber-200/60">{s.actions.length}</td>
                          <td className="py-2 pr-3 text-amber-200/60 whitespace-nowrap">
                            {s.endTime ? formatDuration(s.endTime - s.startTime) : "активна"}
                          </td>
                          <td className="py-2 text-amber-200/30">→</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Карточки на мобильных */}
                <div className="md:hidden space-y-2">
                  {stats.sessions.slice(0, 30).map((s) => (
                    <div
                      key={s.id}
                      className="p-3 rounded-lg border border-amber-400/10 bg-black/20 cursor-pointer"
                      onClick={() => setSelectedSession(s)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs text-amber-100/80">{formatTime(s.startTime)}</span>
                        <span className="text-xs text-amber-200/50">
                          {s.endTime ? formatDuration(s.endTime - s.startTime) : "активна"}
                        </span>
                      </div>
                      <div className="text-xs text-amber-200/50">{getDeviceInfo(s.userAgent)}</div>
                      <div className="text-xs text-amber-200/40 mt-1">
                        Разделов: {s.sectionsVisited.length} · Действий: {s.actions.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* === Диалог подтверждения очистки === */}
        {showClearConfirm && (
          <div
            className="absolute inset-0 bg-black/90 flex items-center justify-center p-4 z-10"
            onClick={() => setShowClearConfirm(false)}
          >
            <div
              className="w-full max-w-sm rounded-xl border border-rose-400/30 p-6 text-center"
              style={{ background: "linear-gradient(135deg, #1a1025 0%, #0a0510 100%)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="w-8 h-8 mx-auto mb-3 text-rose-400/70"/>
              <h3 className="text-base font-bold text-amber-100 mb-2">Удалить всю статистику?</h3>
              <p className="text-xs text-amber-200/50 mb-4">Это действие необратимо. Все данные о посещениях будут удалены.</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-lg text-xs text-amber-200/70 border border-amber-400/20 hover:bg-amber-400/10 transition-all"
                >
                  Отмена
                </button>
                <button
                  onClick={confirmClear}
                  className="px-4 py-2 rounded-lg text-xs text-white bg-rose-500/80 hover:bg-rose-500 transition-all"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === Детали сессии (модал) === */}
        {selectedSession && (
          <div
            className="absolute inset-0 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedSession(null)}
          >
            <div
              className="w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl border border-amber-400/30 p-6"
              style={{ background: "linear-gradient(135deg, #1a1025 0%, #0a0510 100%)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-amber-100">Детали визита</h3>
                <button onClick={() => setSelectedSession(null)} className="text-amber-200/50 hover:text-amber-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <DetailRow label="Начало" value={formatTime(selectedSession.startTime)} />
                <DetailRow label="Конец" value={selectedSession.endTime ? formatTime(selectedSession.endTime) : "активна"} />
                <DetailRow label="Длительность" value={selectedSession.endTime ? formatDuration(selectedSession.endTime - selectedSession.startTime) : "—"} />
                <DetailRow label="Устройство" value={getDeviceInfo(selectedSession.userAgent)} />
                <DetailRow label="Экран" value={selectedSession.screenSize} />
                <DetailRow label="Язык" value={selectedSession.language} />
                <DetailRow label="Источник" value={selectedSession.referrer} />

                {/* Посещённые разделы */}
                <div>
                  <div className="text-xs text-amber-200/50 mb-1">Посещённые разделы:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSession.sectionsVisited.length > 0 ? (
                      selectedSession.sectionsVisited.map((sec, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-xs bg-amber-400/10 text-amber-200/80 border border-amber-400/20">
                          {sec}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-amber-200/40">—</span>
                    )}
                  </div>
                </div>

                {/* Действия */}
                {selectedSession.actions.length > 0 && (
                  <div>
                    <div className="text-xs text-amber-200/50 mb-1">Лента действий ({selectedSession.actions.length}):</div>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {selectedSession.actions.map((a, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs p-1.5 rounded bg-black/20">
                          <span className="text-amber-200/40 whitespace-nowrap">
                            {new Date(a.timestamp).toLocaleTimeString("ru-RU")}
                          </span>
                          <span className="text-amber-100/70">{a.type}</span>
                          {a.section && <span className="text-amber-200/40">· {a.section}</span>}
                          {a.detail && <span className="text-amber-200/30">· {a.detail}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="p-3 rounded-xl border border-amber-400/15 bg-black/20">
      <div className="flex items-center gap-2 mb-1" style={{ color }}>
        {icon}
      </div>
      <div className="text-xl font-bold text-amber-100">{value}</div>
      <div className="text-xs text-amber-200/50">{label}</div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-xs text-amber-200/50 w-24 shrink-0">{label}:</span>
      <span className="text-xs text-amber-100/80 flex-1">{value}</span>
    </div>
  )
}
