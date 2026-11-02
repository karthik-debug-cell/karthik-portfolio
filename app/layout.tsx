import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/inter'
import 'lenis/dist/lenis.css'
import './globals.css'
import Shell from '@/components/Shell'

const desc = 'Karthik: information technology student building digital experiences through code, data and AI.'
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Karthik | Data, AI & Software', template: '%s | Karthik' },
  description: desc,
  openGraph: { title: 'Karthik | Data, AI & Software', description: desc, type: 'website', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
}
export const viewport: Viewport = { themeColor: '#F5F4F0' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body><Shell>{children}</Shell></body></html>
  )
}
