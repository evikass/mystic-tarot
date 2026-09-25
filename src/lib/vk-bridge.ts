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

  initPromise = (async () => {
    try {
      const mod = await import("@vkontakte/vk-bridge" as any).catch(() => null)
      if (mod?.default) {
        vkBridge = mod.default
        vkBridge.subscribe((e: any) => {
          console.log("[VK Bridge] Event:", e.detail?.type)
        })
        try {
          await vkBridge.send("VKWebAppInit")
          console.log("[VK Bridge] VKWebAppInit OK")
        } catch (err) {
          console.log("[VK Bridge] VKWebAppInit failed (outside VK?)")
        }
      }
    } catch (e) {
      console.warn("[VK Bridge] Failed to load:", e)
    }
  })()

  return initPromise
}

export function isVKEnvironment(): boolean {
  if (typeof window === "undefined") return false
  try {
    const params = window.location.search + window.location.hash
    const hasVK = params.includes("vk_access_token") ||
      params.includes("vk_platform") ||
      params.includes("vk_app_id") ||
      params.includes("vk_user_id")
    const hasOK = params.includes("ok_session_key") ||
      params.includes("application_key") ||
      params.includes("signed_request")
    const referrer = (typeof document !== "undefined" && document.referrer) || ""
    const refOK = referrer.includes("ok.ru") || referrer.includes("odnoklassniki")
    const refVK = referrer.includes("vk.com") || referrer.includes("vkontakte")
    return hasVK || hasOK || refOK || refVK
  } catch {
    return false
  }
}

/** Определить, в какой платформе запущено приложение */
export function getPlatform(): "vk" | "ok" | "web" {
  if (typeof window === "undefined") return "web"
  try {
    const params = window.location.search + window.location.hash
    if (params.includes("ok_session_key") || params.includes("application_key") || params.includes("signed_request")) return "ok"
    if (params.includes("vk_access_token") || params.includes("vk_platform") || params.includes("vk_app_id")) return "vk"
    const ref = (typeof document !== "undefined" && document.referrer) || ""
    if (ref.includes("ok.ru") || ref.includes("odnoklassniki")) return "ok"
    if (ref.includes("vk.com") || ref.includes("vkontakte")) return "vk"
  } catch {}
  return "web"
}

/** Получить ссылку на приложение внутри нужной платформы */
export function getPlatformAppUrl(): string {
  const platform = getPlatform()
  if (platform === "vk") {
    return "https://vk.com/app54714401"
  }
  if (platform === "ok") {
    return "https://ok.ru/app/512004619016"
  }
  // Веб-версия
  return typeof window !== "undefined" ? window.location.origin : "https://mystic-tarot-henna.vercel.app"
}

export async function vkShare(text: string): Promise<boolean> {
  const platform = getPlatform()
  const appUrl = getPlatformAppUrl()

  // ВКонтакте — открываем окно шаринга напрямую
  if (platform === "vk") {
    try {
      const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(appUrl)}&title=${encodeURIComponent("Мистическое Таро")}&description=${encodeURIComponent(text)}`
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=720,height=600")
      return true
    } catch {}
  }

  // Одноклассники — открываем окно шаринга
  if (platform === "ok") {
    try {
      const shareUrl = `https://connect.ok.ru/offer?url=${encodeURIComponent(appUrl)}&title=${encodeURIComponent("Мистическое Таро")}&description=${encodeURIComponent(text)}`
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=720,height=600")
      return true
    } catch {}
  }

  // Веб — пробуем нативный Web Share API
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title: "Мистическое Таро", text })
      return true
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return false
    }
  }

  // Fallback: копирование в буфер
  return await vkCopyText(text + "\n\n" + appUrl)
}

/** Копирование текста через VK Bridge (VKWebAppCopyText) или clipboard API */
export async function vkCopyText(text: string): Promise<boolean> {
  // VK Bridge — VKWebAppCopyText
  if (vkBridge) {
    try {
      await vkBridge.send("VKWebAppCopyText", { text })
      return true
    } catch {}
  }

  // Fallback: Clipboard API
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
 * При запуске в VK/OK — загружает данные из облака.
 */
export async function syncWithVKStorage(): Promise<void> {
  if (!vkBridge) return

  // Ключи для синхронизации
  const syncKeys = [
    "mystic-tarot-history",
    "mystic-tarot-muted",
    "mystic-tarot-theme",
    "mystic-tarot-progress",
    "mystic-tarot-visits",
    "mystic-tarot-daily-card",
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

/**
 * Сохранить все данные из localStorage в VK Storage.
 * Вызывается после каждого расклада.
 */
export async function saveToVKStorage(): Promise<void> {
  if (!vkBridge) return

  const syncKeys = [
    "mystic-tarot-history",
    "mystic-tarot-muted",
    "mystic-tarot-theme",
    "mystic-tarot-progress",
    "mystic-tarot-daily-card",
  ]

  for (const key of syncKeys) {
    try {
      const value = localStorage.getItem(key)
      if (value) {
        await vkStorageSet(key, value)
      }
    } catch {}
  }

  console.log("[VK Bridge] Данные сохранены в облако")
}

export function useVKBridge() {
  useEffect(() => {
    initVKBridge().then(() => {
      // После инициализации — синхронизируем прогресс
      syncWithVKStorage()
    })
  }, [])
}
