"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, Send, X, MessageCircle, Trash2 } from "lucide-react"
import {
  getOracleResponse,
  getWelcomeMessage,
  loadUserContext,
  saveUserContext,
  clearUserContext,
  type OracleMessage,
  type OracleUserContext,
} from "@/lib/ai-oracle"

/**
 * ИИ-Оракул — фиксированный виджет в правом нижнем углу.
 *
 * Появляется как мистический аватар (кружок с символом ✦).
 * При клике открывает чат. Оракул:
 *  - запоминает имя и дату рождения в sessionStorage
 *  - отвечает на вопросы, используя данные приложения
 *  - знает знак зодиака, аркан, гороскоп, тайну имени, фазу Луны и т.д.
 */
export function AIOracleWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<OracleMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [ctx, setCtx] = useState<OracleUserContext>({ name: "", day: null, month: null, year: null })
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Загрузить контекст при монтировании
  useEffect(() => {
    const loaded = loadUserContext()
    setCtx(loaded)
    setMessages([{
      role: "oracle",
      content: getWelcomeMessage(loaded),
      timestamp: Date.now(),
    }])
  }, [])

  // Прокрутка вниз при новых сообщениях
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Фокус на инпут при открытии
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isTyping) return

    // Добавить сообщение пользователя
    const userMsg: OracleMessage = { role: "user", content: text, timestamp: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Имитация "размышления" оракула
    setTimeout(() => {
      const { response, updatedCtx } = getOracleResponse(text, ctx)
      setCtx(updatedCtx)
      saveUserContext(updatedCtx)
      const oracleMsg: OracleMessage = { role: "oracle", content: response, timestamp: Date.now() }
      setMessages(prev => [...prev, oracleMsg])
      setIsTyping(false)
    }, 600 + Math.random() * 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    clearUserContext()
    const empty: OracleUserContext = { name: "", day: null, month: null, year: null }
    setCtx(empty)
    setMessages([{
      role: "oracle",
      content: "✦ Я всё забыла. Начнём с чистого листа. Расскажи, как тебя зовут и когда ты родился.",
      timestamp: Date.now(),
    }])
  }

  const quickPrompts = [
    "Помощь",
    "Мой знак зодиака",
    "Гороскоп на сегодня",
    "Совет на сегодня",
    "Какая фаза Луны?",
  ]

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => {
      const text = prompt
      const userMsg: OracleMessage = { role: "user", content: text, timestamp: Date.now() }
      setMessages(prev => [...prev, userMsg])
      setInput("")
      setIsTyping(true)
      setTimeout(() => {
        const { response, updatedCtx } = getOracleResponse(text, ctx)
        setCtx(updatedCtx)
        saveUserContext(updatedCtx)
        const oracleMsg: OracleMessage = { role: "oracle", content: response, timestamp: Date.now() }
        setMessages(prev => [...prev, oracleMsg])
        setIsTyping(false)
      }, 600 + Math.random() * 600)
    }, 50)
  }

  return (
    <>
      {/* Floating avatar button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 group"
          aria-label="Открыть Мистического Оракула"
        >
          {/* Pulsing aura */}
          <div className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping"/>
          {/* Main avatar circle */}
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #a78bfa 50%, #f9a8d4 100%)",
              boxShadow: "0 0 25px rgba(251, 191, 36, 0.5), 0 0 50px rgba(167, 139, 250, 0.3)",
              border: "2px solid rgba(251, 191, 36, 0.6)",
            }}
          >
            <Sparkles className="w-7 h-7 text-white drop-shadow-lg"/>
          </div>
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg glass-mystic border border-amber-400/30 text-xs text-amber-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Спроси Оракула
          </div>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-5 right-5 z-50 flex flex-col"
          style={{
            width: "min(380px, calc(100vw - 40px))",
            height: "min(560px, calc(100vh - 100px))",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-t-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(45,27,78,0.95) 0%, rgba(26,10,58,0.95) 100%)",
              border: "1px solid rgba(251, 191, 36, 0.4)",
              borderBottom: "none",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #a78bfa 100%)",
                  boxShadow: "0 0 12px rgba(251, 191, 36, 0.5)",
                }}
              >
                <Sparkles className="w-4 h-4 text-white"/>
              </div>
              <div>
                <div className="text-sm font-bold text-gold-gradient" style={{ fontFamily: "var(--font-cinzel)" }}>
                  Мистический Оракул
                </div>
                <div className="text-[10px] text-amber-200/60">
                  {ctx.name ? `${ctx.name}` : "онлайн"} · отвечает сразу
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-amber-200/60 hover:text-amber-100 hover:bg-amber-400/10 transition-colors"
                aria-label="Очистить память"
                title="Очистить память"
              >
                <Trash2 className="w-4 h-4"/>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-amber-200/60 hover:text-amber-100 hover:bg-amber-400/10 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4"/>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{
              background: "linear-gradient(180deg, rgba(26,10,58,0.92) 0%, rgba(10,4,32,0.95) 100%)",
              border: "1px solid rgba(251, 191, 36, 0.2)",
              borderLeft: "1px solid rgba(251, 191, 36, 0.4)",
              borderRight: "1px solid rgba(251, 191, 36, 0.4)",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-amber-400/20 text-amber-50 border border-amber-400/30 rounded-br-sm"
                      : "glass-card text-amber-100/90 border border-amber-400/20 rounded-bl-sm"
                  }`}
                  style={msg.role === "oracle" ? { fontFamily: "var(--font-cormorant)", fontSize: "14px" } : {}}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-sm border border-amber-400/20">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: "0ms" }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: "150ms" }}/>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: "300ms" }}/>
                  </div>
                </div>
              </div>
            )}

            {/* Quick prompts (only when few messages) */}
            {messages.length <= 1 && !isTyping && (
              <div className="pt-2">
                <div className="text-[10px] text-amber-200/50 mb-2 text-center">Быстрые вопросы:</div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(p)}
                      className="px-2.5 py-1 rounded-full text-xs glass-mystic border border-amber-400/20 text-amber-200/80 hover:text-amber-100 hover:border-amber-400/50 transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-b-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(45,27,78,0.95) 0%, rgba(26,10,58,0.95) 100%)",
              border: "1px solid rgba(251, 191, 36, 0.4)",
              borderTop: "none",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Спросите оракула..."
              className="flex-1 bg-purple-950/40 border border-amber-400/30 rounded-full px-4 py-2 text-sm text-amber-100 placeholder:text-amber-200/40 focus:outline-none focus:border-amber-400/60"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="flex items-center justify-center w-9 h-9 rounded-full btn-gold disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Отправить"
            >
              <Send className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
