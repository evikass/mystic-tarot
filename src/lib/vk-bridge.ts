"use client"

/**
 * VK Bridge SDK - обёртка для VK Mini Apps.
 * Всегда пытается загрузиться — no-op вне VK.
 */
import { useEffect } from "react"

let vkBridge: any = null
let initPromise: Promise<void> | null = null

export function initVKBridge(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (initPromise) return initPromise

  initPromise = new Promise<void>((resolve) => {
    // Ждём загрузки VK Bridge из CDN (script tag в layout.tsx)
    const tryInit = () => {
      // Проверяем глобальный объект vkBridge из CDN
      const globalBridge = (window as any).vkBridge
      if (globalBridge) {
        vkBridge = globalBridge
        vkBridge.subscribe((e: any) => {
          console.log("[VK Bridge] Event:", e.detail?.type)
        })
        // Вызываем VKWebAppInit — это сигнал VK, что приложение готово
        vkBridge.send("VKWebAppInit")
          .then(() => console.log("[VK Bridge] VKWebAppInit OK"))
          .catch(() => console.log("[VK Bridge] VKWebAppInit failed (вне VK?)"))
          .finally(() => resolve())
        return
      }

      // Если глобального объекта нет — пробуем import (fallback)
      import("@vkontakte/vk-bridge" as any)
        .then((mod: any) => {
          if (mod?.default) {
            vkBridge = mod.default
            vkBridge.subscribe((e: any) => {
              console.log("[VK Bridge] Event:", e.detail?.type)
            })
            vkBridge.send("VKWebAppInit")
              .then(() => console.log("[VK Bridge] VKWebAppInit OK (npm)"))
              .catch(() => console.log("[VK Bridge] VKWebAppInit failed (npm)"))
              .finally(() => resolve())
          } else {
            resolve()
          }
        })
        .catch(() => resolve())
    }

    // Если скрипт уже загружен — инициализируем сразу
    if ((window as any).vkBridge) {
      tryInit()
    } else {
      // Ждём загрузки скрипта (проверяем каждые 100мс, максимум 5 сек)
      let attempts = 0
      const interval = setInterval(() => {
        attempts++
        if ((window as any).vkBridge || attempts > 50) {
          clearInterval(interval)
          tryInit()
        }
      }, 100)
    }
  })

  return initPromise
}

export function isVKEnvironment(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.location.search.includes("vk_access_token") ||
    window.location.search.includes("vk_platform") ||
    window.location.search.includes("vk_app_id") ||
    window.location.search.includes("vk_user_id") ||
    window.location.hash.includes("vk_access_token") ||
    window.location.hostname.includes("vk-app") ||
    (window.parent !== window && window.location.search.length > 0)
  )
}

export async function vkShare(text: string): Promise<boolean> {
  // Сначала пробуем VK Bridge (если внутри ВК/ОК)
  if (vkBridge) {
    try {
      await vkBridge.send("VKWebAppShowWallPost", { message: text })
      return true
    } catch (e) {
      console.warn("[VK Bridge] VKWebAppShowWallPost failed, trying native share:", e)
    }
  }

  // Fallback: нативный Web Share API (работает на Android/iOS)
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Мистическое Таро", text })
      return true
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return false
    }
  }

  // Fallback: копирование в буфер
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {}
  }

  return false
}

let lastAdTime = 0
const AD_COOLDOWN = 30000 // 30 секунд между показами рекламы

export async function vkShowBanner(): Promise<void> {
  if (!vkBridge) return
  // Проверяем кулдаун — не чаще 1 раза в 30 секунд
  const now = Date.now()
  if (now - lastAdTime < AD_COOLDOWN) {
    console.log("[VK Bridge] Реклама на кулдауне, пропускаем")
    return
  }
  lastAdTime = now
  try {
    await vkBridge.send("VKWebAppShowNativeAds", { ad_format: "interstitial" })
  } catch {}
}

export function getVKUserInfo(): any | null {
  return null
}

/**
 * VK Storage — синхронизация прогресса между платформами.
 * Сохраняет данные в облаке VK (доступны с любого устройства).
 */

/** Сохранить данные в VK Storage */
export async function vkStorageSet(key: string, value: string): Promise<void> {
  if (!vkBridge) return
  try {
    await vkBridge.send("VKWebAppStorageSet", { key, value })
  } catch (e) {
    console.warn("[VK Bridge] StorageSet failed:", e)
  }
}

/** Получить данные из VK Storage */
export async function vkStorageGet(key: string): Promise<string | null> {
  if (!vkBridge) return null
  try {
    const data = await vkBridge.send("VKWebAppStorageGet", { keys: [key] })
    if (data?.keys?.[0]?.value) return data.keys[0].value
    return null
  } catch (e) {
    console.warn("[VK Bridge] StorageGet failed:", e)
    return null
  }
}

/** Получить несколько ключей из VK Storage */
export async function vkStorageGetKeys(keys: string[]): Promise<Record<string, string>> {
  if (!vkBridge) return {}
  try {
    const data = await vkBridge.send("VKWebAppStorageGet", { keys })
    const result: Record<string, string> = {}
    if (data?.keys) {
      data.keys.forEach((item: { key: string; value: string }) => {
        if (item.value) result[item.key] = item.value
      })
    }
    return result
  } catch (e) {
    console.warn("[VK Bridge] StorageGetKeys failed:", e)
    return {}
  }
}

/**
 * Синхронизировать localStorage с VK Storage.
 * При запуске в VK — загружает данные из облака.
 * При изменении локальных данных — сохраняет в облако.
 */
export async function syncWithVKStorage(): Promise<void> {
  if (!vkBridge || !isVKEnvironment()) return

  // Ключи для синхронизации
  const syncKeys = [
    "mystic-tarot-history",
    "mystic-tarot-muted",
    "mystic-tarot-theme",
    "mystic-tarot-progress",
    "mystic-tarot-visits",
  ]

  // Загружаем из VK Storage
  const cloudData = await vkStorageGetKeys(syncKeys)

  // Для каждого ключа: если есть в облаке — пишем в localStorage
  syncKeys.forEach(key => {
    if (cloudData[key] !== undefined) {
      try {
        localStorage.setItem(key, cloudData[key])
      } catch {}
    }
  })

  console.log("[VK Bridge] Синхронизация прогресса выполнена")
}

export function useVKBridge() {
  useEffect(() => {
    initVKBridge().then(() => {
      // После инициализации — синхронизируем прогресс
      syncWithVKStorage()
    })
  }, [])
}
