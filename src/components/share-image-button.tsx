"use client"

import { useState, type RefObject } from "react"
import { toPng } from "html-to-image"
import { Share2, Download, Loader2, Mail, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface ShareImageButtonProps {
  /** Ref to the DOM element that should be captured as PNG */
  targetRef: RefObject<HTMLElement | null>
  /** Filename (without extension) for the downloaded image */
  filename: string
  /** Optional text used for the share text and email body */
  textFallback?: string
  /** Optional label override */
  label?: string
  /** Variant of the button */
  variant?: "outline" | "default"
  size?: "sm" | "default" | "lg"
  className?: string
}

/** Site URL for share links — current page origin. */
function getShareUrl(): string {
  if (typeof window === "undefined") return "https://evikass.github.io/mystic-tarot/"
  return window.location.href
}

interface ShareTarget {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  buildUrl: (text: string, url: string) => string
  /** If true — try Web Share API first (better for mobile) */
  preferNative?: boolean
}

const shareTargets: ShareTarget[] = [
  {
    id: "vk",
    label: "ВКонтакте",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.785 16.241s.288-.032.435-.193c.135-.148.131-.426.131-.426s-.019-1.302.584-1.495c.595-.19 1.357 1.272 2.166 1.835.611.425 1.075.332 1.075.332l2.162-.031s1.13-.071.595-.964c-.044-.073-.312-.661-1.605-1.868-1.354-1.264-1.173-1.059.458-3.243.994-1.332 1.391-2.146 1.267-2.494-.118-.332-.849-.244-.849-.244l-2.43.015s-.18-.025-.314.056c-.131.079-.215.262-.215.262s-.385 1.029-.899 1.905c-1.083 1.844-1.516 1.941-1.694 1.827-.412-.266-.309-1.07-.309-1.645 0-1.79.271-2.537-.526-2.731-.265-.064-.46-.106-1.137-.113-.869-.009-1.604.003-2.021.207-.277.135-.49.437-.36.455.161.022.526.099.72.36.25.341.241 1.106.241 1.106s.143 2.103-.335 2.364c-.328.179-.778-.187-1.748-1.852-.495-.85-.868-1.79-.868-1.79s-.072-.176-.201-.27c-.156-.114-.375-.151-.375-.151l-2.31.015s-.347.01-.474.161c-.113.135-.009.413-.009.413s1.809 4.231 3.857 6.364c1.879 1.955 4.013 1.825 4.013 1.825h.965z"/>
      </svg>
    ),
    color: "#0077FF",
    buildUrl: (text, url) => `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent("Мистическое Таро")}&description=${encodeURIComponent(text)}`,
  },
  {
    id: "ok",
    label: "Одноклассники",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 2c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3.4 5.6c-.34.34-.71.62-1.11.85l1.06 1.06c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 16.08l-1.94 1.94c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.06-1.06c-.4-.23-.77-.51-1.11-.85-.4-.4-.4-1.04 0-1.44.4-.4 1.04-.4 1.44 0 .51.51 1.18.79 1.96.79s1.45-.28 1.96-.79c.4-.4 1.04-.4 1.44 0 .4.4.4 1.04 0 1.44z"/>
      </svg>
    ),
    color: "#EE8208",
    buildUrl: (text, url) => `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}&title=${encodeURIComponent("Мистическое Таро")}&description=${encodeURIComponent(text)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: <Send className="w-5 h-5"/>,
    color: "#26A5E4",
    buildUrl: (text, url) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "max",
    label: "Max",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M3 7h2.5l3.5 7 3.5-7H15l-4.5 9h-3L3 7zm12 0h2v9h-2V7zm3 0h3v9h-3V7z"/>
      </svg>
    ),
    color: "#FF6B35",
    buildUrl: (text, url) => `https://max.ru/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "email",
    label: "Почта",
    icon: <Mail className="w-5 h-5"/>,
    color: "#6B7280",
    buildUrl: (text, _url) => `mailto:?subject=${encodeURIComponent("Мой расклад Таро")}&body=${encodeURIComponent(text + "\n\n" + _url)}`,
  },
  {
    id: "twitter",
    label: "Twitter / X",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: "#000000",
    buildUrl: (text, url) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
]

/**
 * Captures a DOM element as a PNG and opens a dialog with social network
 * share buttons. The image is automatically downloaded first, then the user
 * can share via VK / OK / Telegram / Max / Email / Twitter — each opens the
 * platform's share URL with prefilled text. The user attaches the downloaded
 * image manually in the social network's composer.
 *
 * On mobile, if the browser supports Web Share API with files, we use it
 * directly (best UX — passes the image file natively).
 */
export function ShareImageButton({
  targetRef,
  filename,
  textFallback = "",
  label = "📲 Поделиться картинкой",
  variant = "outline",
  size = "sm",
  className = "",
}: ShareImageButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [shareFile, setShareFile] = useState<File | null>(null)
  const { toast } = useToast()

  const capturePng = async (): Promise<Blob | null> => {
    const node = targetRef.current
    if (!node) return null
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: document.documentElement.classList.contains("light")
        ? "#faf3e0"
        : "#0a0420",
    })
    const res = await fetch(dataUrl)
    return await res.blob()
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

      // Always download the PNG first, then open our custom dialog with all 6 social networks.
      // The native Web Share API is offered as an additional button inside the dialog
      // (it previously bypassed the dialog on mobile, showing only installed apps).
      const file = new File([blob], `${filename}.png`, { type: "image/png" })

      // Store the file in state so the native-share button in the dialog can use it
      setShareFile(file)

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${filename}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({ title: "✦ Картинка скачана", description: "Выберите соцсеть ниже и приложите картинку." })
      setShowDialog(true)
    } catch (err) {
      console.error(err)
      toast({ title: "Не удалось сгенерировать картинку", description: "Попробуйте ещё раз.", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNativeShare = async () => {
    if (!shareFile) return
    if (navigator.canShare && navigator.canShare({ files: [shareFile] })) {
      try {
        await navigator.share({
          files: [shareFile],
          title: filename,
          text: textFallback,
        })
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        toast({ title: "Системный шаринг не удался", variant: "destructive" })
      }
    } else {
      toast({ title: "Системный шаринг недоступен", description: "Используйте кнопки соцсетей выше." })
    }
  }

  const handleSocialShare = (target: ShareTarget) => {
    const url = getShareUrl()
    const text = textFallback || "Мой расклад на Мистическом Таро"
    const shareUrl = target.buildUrl(text, url)
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=720,height=600")
  }

  const handleDownloadAgain = async () => {
    if (!targetRef.current) return
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
      toast({ title: "✦ Картинка скачана повторно" })
    } catch (err) {
      console.error(err)
      toast({ title: "Не удалось скачать", variant: "destructive" })
    }
  }

  const handleCopyText = async () => {
    const text = textFallback || "Мой расклад на Мистическом Таро"
    try {
      await navigator.clipboard.writeText(`${text}\n\n${getShareUrl()}`)
      toast({ title: "✦ Текст скопирован", description: "Вставьте в любую соцсеть." })
    } catch {
      toast({ title: "Не удалось скопировать", variant: "destructive" })
    }
  }

  return (
    <>
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md bg-[#1a0a3a] border-amber-400/30">
          <DialogHeader>
            <DialogTitle className="text-gold-gradient" style={{ fontFamily: "var(--font-cinzel)" }}>
              Поделиться раскладом
            </DialogTitle>
            <DialogDescription className="text-amber-200/70">
              Картинка уже скачана. Выберите соцсеть — откроется её окно с готовым текстом.
              Приложите картинку вручную в редакторе поста.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {shareTargets.map(target => (
              <button
                key={target.id}
                onClick={() => handleSocialShare(target)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl glass-mystic border-amber-400/20 hover:border-amber-400/50 transition-all hover:scale-105"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${target.color}20`, color: target.color, border: `1px solid ${target.color}50` }}
                >
                  {target.icon}
                </div>
                <span className="text-xs text-amber-100 text-center">{target.label}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <Button onClick={handleNativeShare} variant="outline" size="sm" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
              <Share2 className="w-3.5 h-3.5 mr-1"/>Системный диалог
            </Button>
            <Button onClick={handleDownloadAgain} variant="outline" size="sm" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
              <Download className="w-3.5 h-3.5 mr-1"/>Скачать PNG
            </Button>
            <Button onClick={handleCopyText} variant="outline" size="sm" className="border-amber-400/40 text-amber-200 hover:bg-amber-400/10">
              <MessageCircle className="w-3.5 h-3.5 mr-1"/>Копировать текст
            </Button>
          </div>

          <p className="text-[11px] text-amber-200/50 mt-3 leading-relaxed">
            💡 Кнопки соцсетей открывают их сайт с готовым текстом — приложите скачанную картинку вручную.
            Кнопка «Системный диалог» открывает нативное меню телефона (передаёт картинку автоматически).
          </p>
        </DialogContent>
      </Dialog>
    </>
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
