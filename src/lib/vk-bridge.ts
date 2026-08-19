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

export async function vkShare(text: string): Promise<void> {
  if (!vkBridge) {
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "Таро Мудрость", text }) } catch {}
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
        // No alert — caller handles UI feedback
      } catch {}
    }
    return
  }
  try {
    await vkBridge.send("VKWebAppShowWallPost", { message: text })
  } catch (e) {
    console.warn("[VK Bridge] share failed:", e)
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try { await navigator.clipboard.writeText(text) } catch {}
    }
  }
}

export async function vkShowBanner(): Promise<void> {
  if (!vkBridge) return
  try {
    await vkBridge.send("VKWebAppShowNativeAds", { ad_format: "interstitial" })
  } catch {}
}

export function getVKUserInfo(): any | null {
  return null
}

export function useVKBridge() {
  useEffect(() => {
    initVKBridge()
  }, [])
}
