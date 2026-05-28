import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC, Ma_Shan_Zheng, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
})

const notoSerifSC = Noto_Serif_SC({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

const maShanZheng = Ma_Shan_Zheng({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-brush',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: '如果你生活在清代边疆 | 沉浸式历史互动体验',
  description: '一场关于身份、选择与民族交融的沉浸式互动体验。穿越回清代西南边疆，以不同身份体验历史，理解中华民族共同体意识的形成。',
  keywords: ['清代边疆', '互动体验', '民族融合', '历史文化', 'H5', '中华民族'],
  authors: [{ name: '边疆历史研究' }],
  openGraph: {
    title: '如果你生活在清代边疆',
    description: '一场关于身份、选择与民族交融的沉浸式互动体验',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '如果你生活在清代边疆',
    description: '一场关于身份、选择与民族交融的沉浸式互动体验',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0f0e0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="zh-CN" 
      className={`${notoSansSC.variable} ${notoSerifSC.variable} ${maShanZheng.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
