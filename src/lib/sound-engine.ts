"use client"

/**
 * Звуковой движок для мистических эффектов — синтез через Web Audio API.
 * Без внешних файлов: все звуки генерируются на лету.
 *
 * Звук переворота карты: мягкий колокольчик + шёпот (filtered noise sweep).
 * Звук вытягивания карты: лёгкое мерцание (high sine arpeggio).
 */

let audioCtx: AudioContext | null = null
let muted = false

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
 * Два слоя:
 *  1. Мягкий колокольчик (sine + harmonics, быстрый decay)
 *  2. Шёпот/свист (filtered noise sweep вверх)
 */
export function playCardFlipSound() {
  if (muted) return
  const ctx = getCtx()
  if (!ctx) return

  const now = ctx.currentTime

  // === Слой 1: Колокольчик ===
  // Основная частота ~880 Hz (A5) + гармоника 1318 (E6) для "хрустального" тембра
  const freqs = [880, 1318.5, 1760]
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    osc.type = "sine"
    osc.frequency.value = freq

    const gain = ctx.createGain()
    const peak = 0.18 / (i + 1)  // каждая гармоника тише
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(peak, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 - i * 0.2)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 1.3)
  })

  // === Слой 2: Свист/шёпот (filtered noise sweep) ===
  try {
    const bufferSize = ctx.sampleRate * 0.4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      // Pink-ish noise (простой белый, ослабленный)
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
    noiseGain.gain.linearRampToValueAtTime(0.06, now + 0.05)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 0.45)
  } catch {
    // ignore noise layer failure
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
