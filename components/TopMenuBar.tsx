'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import { profile } from '@/lib/data'

/** Slim frosted bar that appears like an iOS status/title bar */
export default function TopMenuBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 140, damping: 20 }}
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${scrolled ? 'liquid !rounded-none !border-x-0 !border-t-0 bg-black/40' : ''}`}
    >
      <div className="mx-auto flex h-14 max-w-[1360px] items-center justify-between px-6 sm:px-10">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-burgundy-400 to-burgundy-800 font-display text-sm font-bold text-white shadow-[0_0_20px_-4px_#8a0f2e]">RV</span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:inline">Rutvij Vakati</span>
        </a>
        <div className="flex items-center gap-1.5">
          {[
            { i: FiLinkedin, h: profile.linkedin, l: 'LinkedIn' },
            { i: FiGithub, h: profile.github, l: 'GitHub' },
          ].map((x) => (
            <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer" aria-label={x.l} className="flex h-9 w-9 items-center justify-center rounded-full text-burgundy-100/70 transition hover:bg-white/10 hover:text-white">
              <x.i />
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="ml-1 flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-cream transition hover:bg-white/20">
            <FiDownload /> Résumé
          </a>
        </div>
      </div>
    </motion.header>
  )
}
