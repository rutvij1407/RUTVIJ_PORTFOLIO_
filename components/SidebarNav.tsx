'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { FiHome, FiUser, FiBarChart2, FiBriefcase, FiFolder, FiCpu, FiBook, FiMail } from 'react-icons/fi'

const items = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'dashboard', label: 'Analytics', icon: FiBarChart2 },
  { id: 'experience', label: 'Experience', icon: FiBriefcase },
  { id: 'projects', label: 'Projects', icon: FiFolder },
  { id: 'skills', label: 'Skills', icon: FiCpu },
  { id: 'education', label: 'Education', icon: FiBook },
  { id: 'contact', label: 'Contact', icon: FiMail },
]

function DockIcon({ mouseX, it, active, compact }: { mouseX: MotionValue<number>; it: (typeof items)[number]; active: boolean; compact: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const dist = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return v - b.x - b.width / 2
  })
  const size = useSpring(useTransform(dist, [-130, 0, 130], compact ? [34, 50, 34] : [44, 74, 44]), { stiffness: 320, damping: 22, mass: 0.2 })
  return (
    <motion.a
      ref={ref}
      href={`#${it.id}`}
      aria-label={it.label}
      style={{ width: size, height: size }}
      className={`group relative flex aspect-square items-center justify-center rounded-2xl border transition-colors ${
        active ? 'border-burgundy-300/60 bg-gradient-to-br from-burgundy-500 to-burgundy-800 text-white shadow-[0_0_24px_-4px_rgba(168,32,63,.9)]' : 'border-white/10 bg-white/[0.06] text-burgundy-100'
      }`}
    >
      <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1 text-xs text-cream opacity-0 backdrop-blur transition group-hover:opacity-100">{it.label}</span>
      <it.icon className="h-1/2 w-1/2" />
      {active && <span className="absolute -bottom-2 h-1 w-1 rounded-full bg-burgundy-200" />}
    </motion.a>
  )
}

/** macOS-style magnifying dock with scroll-spy */
export default function SidebarNav() {
  const mouseX = useMotionValue(Infinity)
  const [active, setActive] = useState('home')
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)')
    const on = () => setCompact(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach((i) => {
      const el = document.getElementById(i.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ x: '-50%' }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 140, damping: 18 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="liquid fixed bottom-4 left-1/2 z-[80] flex max-w-[calc(100vw-12px)] items-end justify-center gap-2 rounded-[26px] px-3 py-2.5 max-[480px]:bottom-3 max-[480px]:gap-1 max-[480px]:px-2 max-[480px]:py-2"
    >
      {items.map((it) => (
        <DockIcon key={it.id} mouseX={mouseX} it={it} active={active === it.id} compact={compact} />
      ))}
    </motion.nav>
  )
}
