import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AIOracleWidget } from "@/components/ai-oracle-widget";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0510",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mystic-tarot-henna.vercel.app/"),
  title: "Мистическое Таро · Карта дня, расклады, совместимость",
  description: "Бесплатное онлайн-приложение Таро с красивыми SVG-картами. Карта дня, расклады на 3 карты, Кельтский крест, Да/Нет, совместимость и психологический анализ.",
  keywords: ["таро", "tarot", "расклад", "карта дня", "совместимость", "мистика", "аркан"],
  authors: [{ name: "Таро Мудрость" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Мистическое Таро",
    description: "Онлайн-приложение Таро с красивыми SVG-картами и интерпретациями",
    type: "website",
    images: [{ url: "/favicon.png" }],
  },
  twitter: {
    card: "summary",
    title: "Мистическое Таро",
    description: "Онлайн-приложение Таро с красивыми SVG-картами",
    images: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline script: applies the saved theme class BEFORE React hydrates to prevent flash of wrong theme
  const themeScript = `(function(){try{var t=localStorage.getItem('mystic-tarot-theme');if(t==='light'){document.documentElement.classList.add('light');}else{document.documentElement.classList.remove('light');}}catch(e){}})();`;

  // Inline script: Send VKWebAppInit IMMEDIATELY — before any other JS loads.
  // VK Mini App WebView shows 'ошибка загрузки' if VKWebAppInit is not received
  // within ~5-10 seconds. Waiting for React bundle + dynamic import of
  // @vkontakte/vk-bridge takes 5-10s on mobile networks, too slow.
  // This inline script sends the signal DIRECTLY via window.parent.postMessage
  // (the protocol VK WebView understands), no library needed.
  // Safe no-op outside VK iframe.
  // IMPORTANT: Sends ONLY ONCE — multiple sends may confuse VK WebView.
  const vkEarlyInitScript = `(function(){
    if (typeof window === 'undefined') return;
    try {
      // Only inside an iframe (VK WebView is an iframe)
      if (window.parent === window) return;
      // Detect VK by URL params or referrer
      var p = window.location.search + window.location.hash;
      var ref = document.referrer || '';
      var isVK = p.indexOf('vk_') >= 0 || ref.indexOf('vk.com') >= 0 || ref.indexOf('vkontakte') >= 0;
      if (!isVK) return;
      // Send VKWebAppInit directly via postMessage — ONE TIME ONLY.
      // VK Bridge protocol: {handler, params, type: "vk-connect", webFrameId, connectVersion}
      var msg = {
        handler: 'VKWebAppInit',
        params: {},
        type: 'vk-connect',
        webFrameId: 0,
        connectVersion: '3.0.2'
      };
      try { window.parent.postMessage(msg, '*'); } catch (_) {}
    } catch (e) {}
  })();`;

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* CRITICAL: Send VKWebAppInit IMMEDIATELY — must run BEFORE any other script.
            This is what VK Mini App WebView waits for. If not received in ~5s on mobile,
            VK shows "ошибка загрузки" to the user. */}
        <script dangerouslySetInnerHTML={{ __html: vkEarlyInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
        <Toaster />
        <AIOracleWidget />
      </body>
    </html>
  );
}
