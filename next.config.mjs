/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

// Auto-detect GitHub Pages subpath deployment when building in GitHub Actions
// In GitHub Actions, GITHUB_REPOSITORY is defined as "owner/repo" (e.g. "karthik-debug-cell/karthik-portfolio")
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const isUserSite = repo.toLowerCase().endsWith('.github.io')

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd && repo && !isUserSite ? `/${repo}` : '')

const owner = process.env.GITHUB_REPOSITORY?.split('/')[0] || ''
const defaultSiteUrl = owner ? `https://${owner}.github.io${basePath}` : 'http://localhost:3000'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
}

export default nextConfig
