'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaDownload } from 'react-icons/fa'
import { profile } from '@/lib/data'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex max-w-full items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-500 ${
          scrolled ? 'border-burgundy-300/20 bg-ink/80 shadow-[0_10px_40px_-10px_rgba(128,0,32,0.6)]' : 'border-white/5 bg-ink/30'
        }`}
      >
        <a href="#home" className="mr-1 hidden items-center pl-3 pr-2 font-display text-sm font-bold sm:flex">
          <span className="gradient-text">VRR</span>
        </a>
        <div className="flex items-center overflow-x-auto [scrollbar-width:none]">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                active === l.id ? 'text-white' : 'text-cream/60 hover:text-cream'
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-burgundy-600/70"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={profile.resume}
          download="Rutvij_Vakati_Resume.pdf"
          className="ml-1 hidden items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-burgundy-100 md:flex"
        >
          <FaDownload className="text-[10px]" /> Resume
        </a>
      </nav>
    </motion.header>
  )
}
