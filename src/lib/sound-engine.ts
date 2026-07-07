"use client"

/**
 * Звуковой движок для мистических эффектов — синтез через Web Audio API.
 * Без внешних файлов: все звуки генерируются на лету.
 *
 * Звук переворота карты: хрустальный колокольчик + шёпот карт + мерцание.
 * Звук вытягивания карты: лёгкое мерцание (high sine arpeggio).
 * Фоновый эмбиент: мистический дрон + случайные хрустальные звонки.
 */

let audioCtx: AudioContext | null = null
let muted = false

// === Эмбиент-состояние ===
let ambientNodes: {
  master: GainNode
  stop: () => void
} | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    try {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext
      audioCtx = new Ctor()
    } catch {
      return null
    }
  }
  // Resume if suspended (autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export function setMuted(m: boolean) {
  muted = m
  try { localStorage.setItem("mystic-tarot-muted", m ? "1" : "0") } catch {}
  // Если mute — останавливаем эмбиент
  if (m) stopAmbient()
}

export function isMuted(): boolean {
  if (typeof window === "undefined") return false
  try {
    const v = localStorage.getItem("mystic-tarot-muted")
    if (v === null) return false
    return v === "1"
  } catch {
    return false
  }
}

/** Инициализация mute-состояния из localStorage */
export function initMuteState() {
  muted = isMuted()
}

/**
 * Магический звук переворота карты.
 * Четыре слоя:
 *  1. Хрустальный колокольчик (sine + гармоника, долгий decay)
 *  2. Шёпот/свист (filtered noise sweep вверх) — звук листания карт
 *  3. Хрустальный звон — мерцание высоких частот (shimmer)
 *  4. Бумажный шелест — короткий шумовой импульс в начале
 */
export function playCardFlipSound() {
  if (muted) return
  const ctx = getCtx()
  if (!ctx) return

  const now = ctx.currentTime

  // === Слой 1: Хрустальный колокольчик ===
  const freqs = [880, 1318.5, 1760, 2637]  // A5, E6, A6, E7 — хрустальный аккорд
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.type = "sine"
    osc.frequency.value = freq

    const gain = ctx.createGain()
    const peak = 0.09 / (i + 1)  // тише (было 0.16)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(peak, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 - i * 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 1.9)
  })

  // === Слой 2: Шёпот/свист (filtered noise sweep) ===
  try {
    const bufferSize = ctx.sampleRate * 0.4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.setValueAtTime(400, now)
    filter.frequency.exponentialRampToValueAtTime(2400, now + 0.35)
    filter.Q.value = 4

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0, now)
    noiseGain.gain.linearRampToValueAtTime(0.04, now + 0.05)  // тише (было 0.07)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.45)
  } catch {
    // ignore
  }

  // === Слой 3: Хрустальный звон (shimmer) — детунированные высокие частоты ===
  try {
    const shimmerFreqs = [2093, 2349, 2637, 3136]  // C7, D7, E7, G7
    shimmerFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = "triangle"
      // Лёгкое детунирование для "хрустального" эффекта
      osc.frequency.value = freq * (1 + (Math.random() - 0.5) * 0.005)
      osc.detune.value = (Math.random() - 0.5) * 8

      const gain = ctx.createGain()
      const start = now + 0.02 + i * 0.015
      const peak = 0.03  // тише (было 0.05)
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(peak, start + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + 1.3)
    })
  } catch {
    // ignore
  }

  // === Слой 4: Бумажный шелест (короткий низкочастотный шум в начале) ===
  try {
    const bufferSize = ctx.sampleRate * 0.08
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      // Затухающий шум — эффект перелистывания
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.4
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.value = 2000

    const gain = ctx.createGain()
    gain.gain.value = 0.05  // тише (было 0.08)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.1)
  } catch {
    // ignore
  }
}

/**
 * Лёгкий звук вытягивания карты — короткое мерцание (arpeggio вверх).
 */
export function playCardDrawSound() {
  if (muted) return
  const ctx = getCtx()
  if (!ctx) return

  const now = ctx.currentTime
  const notes = [523.25, 659.25, 783.99, 1046.5]  // C5, E5, G5, C6

  notes.forEach((freq, i) => {
    const start = now + i * 0.06
    const osc = ctx.createOscillator()
    osc.type = "sine"
    osc.frequency.value = freq

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(0.08, start + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.35)
  })
}

/**
 * Короткий "клик" при клике по карте (до переворота).
 */
export function playClickSound() {
  if (muted) return
  const ctx = getCtx()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  osc.type = "sine"
  osc.frequency.value = 1200

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(0.05, now + 0.003)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.1)
}

/**
 * === ФОНОВЫЙ ЭМБИЕНТ ===
 * Мистический дрон (низкие частоты) + случайные хрустальные звонки.
 * Запускается при первом взаимодействии (кнопка "Разложить").
 * Очень тихий (volume ~0.06).
 */
export function startAmbient() {
  if (muted) return
  if (ambientNodes) return  // уже запущен
  const ctx = getCtx()
  if (!ctx) return

  const now = ctx.currentTime

  // Master gain — очень тихий
  const master = ctx.createGain()
  master.gain.value = 0.06
  master.connect(ctx.destination)

  const oscillators: OscillatorNode[] = []
  const timeouts: ReturnType<typeof setTimeout>[] = []

  // === Слой 1: Низкий дрон (2 детунированных осциллятора) ===
  const droneFreqs = [55, 55.5, 110]  // A1 + лёгкое биение
  droneFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.type = "sine"
    osc.frequency.value = freq

    // LFO для лёгкой модуляции громкости — "дыхание"
    const lfo = ctx.createOscillator()
    lfo.type = "sine"
    lfo.frequency.value = 0.1 + i * 0.03
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.3
    lfo.connect(lfoGain)

    const gain = ctx.createGain()
    gain.gain.value = 0.4 - i * 0.1
    lfoGain.connect(gain.gain)

    osc.connect(gain)
    gain.connect(master)
    osc.start(now)
    lfo.start(now)
    oscillators.push(osc, lfo)
  })

  // === Слой 2: Средний пятно (очень тихий high drone) ===
  const padOsc = ctx.createOscillator()
  padOsc.type = "sine"
  padOsc.frequency.value = 220  // A3
  const padGain = ctx.createGain()
  padGain.gain.value = 0.08
  // Медленный фильтр-свип
  const padFilter = ctx.createBiquadFilter()
  padFilter.type = "lowpass"
  padFilter.frequency.value = 400
  padOsc.connect(padFilter)
  padFilter.connect(padGain)
  padGain.connect(master)
  padOsc.start(now)
  oscillators.push(padOsc)

  // === Слой 3: Случайные хрустальные звонки ===
  const chimeNotes = [880, 1046.5, 1318.5, 1760, 2093]  // A5, C6, E6, A6, C7
  let chimeStopped = false

  const scheduleChime = () => {
    if (chimeStopped || muted) return
    const freq = chimeNotes[Math.floor(Math.random() * chimeNotes.length)]
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    osc.type = "sine"
    osc.frequency.value = freq

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.15, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 3)

    osc.connect(gain)
    gain.connect(master)
    osc.start(t)
    osc.stop(t + 3.2)

    // Следующий звонок через 4-10 секунд
    const nextDelay = 4000 + Math.random() * 6000
    timeouts.push(setTimeout(scheduleChime, nextDelay))
  }

  // Первый звонок через 3 секунды
  timeouts.push(setTimeout(scheduleChime, 3000))

  // === Функция остановки ===
  const stop = () => {
    chimeStopped = true
    timeouts.forEach(t => clearTimeout(t))
    // Fade out
    const fadeTime = ctx.currentTime + 1.5
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, fadeTime)
    // Останавливаем осцилляторы
    setTimeout(() => {
      oscillators.forEach(o => {
        try { o.stop() } catch {}
      })
    }, 1600)
  }

  ambientNodes = { master, stop }
}

/** Остановить фоновый эмбиент */
export function stopAmbient() {
  if (ambientNodes) {
    ambientNodes.stop()
    ambientNodes = null
  }
}

/** Запущен ли эмбиент */
export function isAmbientPlaying(): boolean {
  return ambientNodes !== null
}

/**
 * Переключить эмбиент (вкл/выкл).
 * Возвращает новое состояние.
 */
export function toggleAmbient(): boolean {
  if (ambientNodes) {
    stopAmbient()
    return false
  } else {
    startAmbient()
    return true
  }
}
