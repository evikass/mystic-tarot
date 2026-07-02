"use client"

const KEYS_STORAGE = "success-steps-keys-v1"
const VAULT_OPENED_KEY = "success-steps-vault-opened-v1"

export interface StepKey {
  stepNumber: number
  earnedAt: number
  score: number // 100 = perfect
  attempts: number
}

export function getAllKeys(): Record<number, StepKey> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(KEYS_STORAGE)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function getKey(stepNumber: number): StepKey | null {
  return getAllKeys()[stepNumber] || null
}

export function saveKey(stepNumber: number, score: number, attempts: number): StepKey {
  const all = getAllKeys()
  const newKey: StepKey = {
    stepNumber,
    earnedAt: Date.now(),
    score,
    attempts,
  }
  all[stepNumber] = newKey
  if (typeof window !== "undefined") {
    localStorage.setItem(KEYS_STORAGE, JSON.stringify(all))
  }
  return newKey
}

export function hasKey(stepNumber: number): boolean {
  return getKey(stepNumber) !== null
}

export function getKeysCount(): number {
  return Object.keys(getAllKeys()).length
}

export function getAllKeysCount(): { earned: number; total: number } {
  return {
    earned: getKeysCount(),
    total: 14,
  }
}

export function isVaultUnlocked(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(VAULT_OPENED_KEY) === "true"
}

export function markVaultUnlocked(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(VAULT_OPENED_KEY, "true")
}

export function resetKeys(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEYS_STORAGE)
  localStorage.removeItem(VAULT_OPENED_KEY)
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
