"use client"

import { useState, type RefObject } from "react"
import { toPng } from "html-to-image"
import { Share2, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { vkShare } from "@/lib/vk-bridge"

interface ShareImageButtonProps {
  /** Ref to the DOM element that should be captured as PNG */
  targetRef: RefObject<HTMLElement | null>
  /** Filename (without extension) for the downloaded image */
  filename: string
  /** Optional text used for the legacy text-share fallback (VK, Web Share API) */
  textFallback?: string
  /** Optional label override */
  label?: string
  /** Variant of the button */
  variant?: "outline" | "default"
  size?: "sm" | "default" | "lg"
  className?: string
}

/**
 * Captures a DOM element as a PNG using html-to-image and offers three actions:
 *  1. Download the PNG to the user's device
 *  2. Share via Web Share API (mobile / supported browsers) — includes the image file
 *  3. Fallback to text share via VK bridge if neither works
 *
 * The captured element should have a solid or near-solid background (we apply
 * an explicit background in the toPng options to ensure transparency doesn't
 * leak through).
 */
export function ShareImageButton({
  targetRef,
  filename,
  textFallback,
  label = "Поделиться картинкой",
  variant = "outline",
  size = "sm",
  className = "",
}: ShareImageButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const capturePng = async (): Promise<Blob | null> => {
    const node = targetRef.current
    if (!node) return null
    return await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: document.documentElement.classList.contains("light")
        ? "#faf3e0"
        : "#0a0420",
    }).then(async (dataUrl) => {
      const res = await fetch(dataUrl)
      return await res.blob()
    })
  }

  const handleShare = async () => {
    if (!targetRef.current) {
      toast({ title: "Ошибка", description: "Нечего шарить — сначала сделайте расклад.", variant: "destructive" })
      return
    }
    setIsGenerating(true)
    try {
      const blob = await capturePng()
      if (!blob) throw new Error("capture failed")

      const file = new File([blob], `${filename}.png`, { type: "image/png" })

      // Try Web Share API with file (mobile browsers, modern Chrome desktop)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: filename,
            text: textFallback ?? "",
          })
          setIsGenerating(false)
          return
        } catch (err) {
          // user cancelled or share failed — fall through to download
          if (err instanceof Error && err.name === "AbortError") {
            setIsGenerating(false)
            return
          }
        }
      }

      // Fallback: download + show toast, also try VK text-share if available
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${filename}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      if (textFallback) {
        try { vkShare(textFallback) } catch { /* ignore */ }
      }

      toast({ title: "✦ Картинка сохранена", description: "Скачайте и поделитесь в любой соцсети." })
    } catch (err) {
      console.error(err)
      toast({ title: "Не удалось сгенерировать картинку", description: "Попробуйте ещё раз.", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={handleShare}
      disabled={isGenerating}
      variant={variant}
      size={size}
      className={className}
    >
      {isGenerating ? (
        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin"/>
      ) : (
        <Share2 className="w-3.5 h-3.5 mr-1"/>
      )}
      {label}
    </Button>
  )
}

/** Companion helper: a simple download-only button (no share). */
export function DownloadImageButton({
  targetRef,
  filename,
  label = "Скачать PNG",
  variant = "outline",
  size = "sm",
  className = "",
}: {
  targetRef: RefObject<HTMLElement | null>
  filename: string
  label?: string
  variant?: "outline" | "default"
  size?: "sm" | "default" | "lg"
  className?: string
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    if (!targetRef.current) return
    setIsGenerating(true)
    try {
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: document.documentElement.classList.contains("light")
          ? "#faf3e0"
          : "#0a0420",
      })
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `${filename}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      toast({ title: "✦ Картинка скачана" })
    } catch (err) {
      console.error(err)
      toast({ title: "Не удалось сгенерировать картинку", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isGenerating} variant={variant} size={size} className={className}>
      {isGenerating ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin"/> : <Download className="w-3.5 h-3.5 mr-1"/>}
      {label}
    </Button>
  )
}
