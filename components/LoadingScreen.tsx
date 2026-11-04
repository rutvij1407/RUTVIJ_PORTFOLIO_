'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 2)), 40)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-burgundy-600/30 blur-3xl" />
      </div>

      <div className="relative flex overflow-hidden font-display text-6xl font-bold tracking-tight sm:text-8xl">
        {'RUTVIJ'.split('').map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: '110%', rotate: 8 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={i % 2 ? 'gradient-text' : 'text-cream'}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative mt-4 font-mono text-xs uppercase tracking-[0.4em] text-burgundy-200"
      >
        Data Analytics Engineer
      </motion.p>

      <div className="relative mt-10 h-px w-64 overflow-hidden bg-white/10">
        <div className="h-full bg-gradient-to-r from-burgundy-600 to-burgundy-200" style={{ width: `${progress}%` }} />
      </div>
      <p className="relative mt-3 font-mono text-xs text-burgundy-200/70">{progress}%</p>
    </motion.div>
  )
}
