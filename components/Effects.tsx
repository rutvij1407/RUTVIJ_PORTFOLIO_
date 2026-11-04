'use client'

import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin burgundy progress bar pinned to the top of the viewport */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-burgundy-700 via-burgundy-400 to-burgundy-200"
    />
  )
}

/** Soft burgundy light that follows the cursor across the page */
export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let raf = 0
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', `${e.clientX}px`)
        document.documentElement.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      style={{ background: 'radial-gradient(520px circle at var(--mx) var(--my), rgba(128,0,32,0.10), transparent 65%)' }}
    />
  )
}
