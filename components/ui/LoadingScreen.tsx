'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  const name = 'RUTVIJ'
  const letters = name.split('')

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-[#dc2626]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-[#b91c1c]/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 flex">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#dc2626]"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            style={{
              textShadow: '0 0 40px rgba(220, 38, 38, 0.6)',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="mt-4 text-[#9ca3af] text-sm md:text-base font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Data Analytics Engineer
      </motion.p>

      <motion.div
        className="mt-12 w-48 md:w-64 h-1 bg-[#1f2937] rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.p
        className="mt-4 text-[#6b7280] text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Loading portfolio...
      </motion.p>
    </motion.div>
  )
}
