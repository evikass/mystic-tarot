import type { NextConfig } from "next";

// Базовый путь для GitHub Pages (имя репозитория)
// Vercel при своём деплое устанавливает пустой basePath автоматически
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "mystic-tarot";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Для GitHub Pages — добавляем basePath с именем репозитория
  // Vercel деплой: GITHUB_ACTIONS не задан → basePath пустой
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  trailingSlash: true,
};

export default nextConfig;
