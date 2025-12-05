import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Studio by AdityoLab | AI Design Rendering Generator',
  description: 'Generate photorealistic high-end design renders from sketches. Powered by Google Gemini AI.',
  keywords: 'interior design, AI design, architectural visualization, 3D rendering, AI studio',
  openGraph: {
    title: 'AI Studio by AdityoLab | AI Design Rendering Generator',
    description: 'Transform your design ideas into photorealistic renders. Powered by Google Gemini AI.',
    url: 'https://adityolab-ai-studio.vercel.app',
    siteName: 'AI Studio by AdityoLab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Studio by AdityoLab | AI Design Rendering Generator',
    description: 'Transform your design ideas into photorealistic renders. Powered by Google Gemini AI.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${GeistMono.variable} font-sans bg-secondary text-light antialiased`}>
        {children}
      </body>
    </html>
  )
}