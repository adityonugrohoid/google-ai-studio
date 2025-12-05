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
  title: 'AI Studio by AdityoLab | Interior Design AI Generator',
  description: 'Generate photorealistic high-end interior design renders from simple descriptions. Powered by Google Gemini AI.',
  keywords: 'interior design, AI design, architectural visualization, 3D rendering, AI studio',
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
