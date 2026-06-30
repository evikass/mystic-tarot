"use client"

import type { TarotCard } from "./tarot-data"

export interface ReadingRecord {
  id: string
  type: "daily" | "three-card" | "celtic-cross" | "yes-no" | "compatibility" | "psychology"
  typeLabel: string
  question?: string
  cards: {
    card: TarotCard
    isReversed: boolean
    position?: string
  }[]
  notes?: string
  createdAt: number
}

const STORAGE_KEY = "tarot-history-v1"
const MAX_RECORDS = 50

export function getHistory(): ReadingRecord[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.sort((a, b) => b.createdAt - a.createdAt)
  } catch {
    return []
  }
}

export function saveReading(record: Omit<ReadingRecord, "id" | "createdAt">): ReadingRecord {
  if (typeof window === "undefined") {
    return { ...record, id: "stub", createdAt: Date.now() }
  }
  const history = getHistory()
  const newRecord: ReadingRecord = {
    ...record,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  }
  const updated = [newRecord, ...history].slice(0, MAX_RECORDS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return newRecord
}

export function deleteReading(id: string): void {
  if (typeof window === "undefined") return
  const history = getHistory().filter((r) => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export function clearHistory(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  })
}
