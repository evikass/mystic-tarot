import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Для GitHub Pages статический экспорт
  // (Vercel автоматически игнорирует это при деплое)
  output: "export",
  images: {
    unoptimized: true,
  },
  // Базовый путь для GitHub Pages (замените <repo> на имя репозитория)
  // Vercel автоматически убирает basePath при своём деплое
  basePath: process.env.NODE_ENV === "production" ? "" : "",
  assetPrefix: "",
  trailingSlash: true,
};

export default nextConfig;
