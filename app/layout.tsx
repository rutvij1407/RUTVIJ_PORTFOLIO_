import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Rutvij Reddy Vakati | Data Analytics Engineer',
  description:
    'Portfolio of Rutvij Reddy Vakati: Data Analytics Engineer, MS Data Analytics Engineering at GMU. ETL pipelines, Power BI, Tableau, AWS and AI-powered analytics.',
  keywords: 'Data Analytics, Data Engineering, Power BI, Tableau, Python, SQL, AWS, ETL, Portfolio',
}

export const viewport: Viewport = { themeColor: '#000000' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-ink font-sans text-cream antialiased">{children}</body>
    </html>
  )
}
