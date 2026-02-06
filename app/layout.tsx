import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rutvij Reddy Vakati | Data Analytics Engineer',
  description: 'Portfolio of Rutvij Reddy Vakati - Data Analytics Engineer, MS Data Analytics @ GMU, transforming raw data into actionable insights',
  keywords: 'Data Analytics, Data Engineering, Power BI, Python, SQL, AWS, Portfolio',
  icons: {
    icon: '/assets/img/RV.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#000000] text-[#f5f5f7] antialiased`}>
        {children}
      </body>
    </html>
  )
}
