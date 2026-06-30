import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://evikass.github.io/mystic-tarot/"),
  title: "Мистическое Таро · Карта дня, расклады, совместимость",
  description: "Бесплатное онлайн-приложение Таро с красивыми SVG-картами. Карта дня, расклады на 3 карты, Кельтский крест, Да/Нет, совместимость и психологический анализ.",
  keywords: ["таро", "tarot", "расклад", "карта дня", "совместимость", "мистика", "аркан"],
  authors: [{ name: "Таро Мудрость" }],
  icons: {
    icon: "/mystic-tarot/favicon.svg",
    shortcut: "/mystic-tarot/favicon.svg",
    apple: "/mystic-tarot/favicon.svg",
  },
  openGraph: {
    title: "Мистическое Таро",
    description: "Онлайн-приложение Таро с красивыми SVG-картами и интерпретациями",
    type: "website",
    images: ["/mystic-tarot/favicon.svg"],
  },
  twitter: {
    card: "summary",
    title: "Мистическое Таро",
    description: "Онлайн-приложение Таро с красивыми SVG-картами",
    images: ["/mystic-tarot/favicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${cinzel.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
