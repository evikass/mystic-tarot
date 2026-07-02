"use client"

/**
 * VK Bridge SDK - обёртка для будущей публикации в VK Mini Apps.
 * Безопасно работает в обычном браузере (no-op), а внутри VK подключается динамически.
 */

let vkBridge: any = null
let isInitialized = false

export async function initVKBridge(): Promise<void> {
  if (typeof window === "undefined") return
  if (isInitialized) return
  isInitialized = true

  // Проверяем, что мы внутри VK Mini App
  const isVK = typeof window !== "undefined" && (
    window.location.search.includes("vk_access_token") ||
    window.location.search.includes("vk_platform") ||
    window.location.hostname.includes("vk-app")
  )

  if (!isVK) return

  try {
    // Динамическая загрузка VK Bridge
    const mod = await import("@vkontakte/vk-bridge" as any).catch(() => null)
    if (mod?.default) {
      vkBridge = mod.default
      vkBridge.send("VKWebAppInit")
      console.log("[VK Bridge] Инициализирован")
    }
  } catch (e) {
    console.warn("[VK Bridge] Не удалось загрузить:", e)
  }
}

export function isVKEnvironment(): boolean {
  if (typeof window === "undefined") return false
  return window.location.search.includes("vk_access_token") ||
    window.location.search.includes("vk_platform") ||
    window.location.hostname.includes("vk-app")
}

export async function vkShare(text: string): Promise<void> {
  if (!vkBridge) {
    // Фолбэк - обычный share API браузера
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "Таро Мудрость", text }) } catch {}
    }
    return
  }
  try {
    await vkBridge.send("VKWebAppShowWallPost", {
      message: text,
    })
  } catch (e) {
    console.warn("[VK Bridge] share failed:", e)
  }
}

export async function vkShowBanner(): Promise<void> {
  if (!vkBridge) return
  try {
    await vkBridge.send("VKWebAppShowNativeAds", { ad_format: "interstitial" })
  } catch {}
}

export function getVKUserInfo(): any | null {
  return null // Заглушка для будущего API
}
