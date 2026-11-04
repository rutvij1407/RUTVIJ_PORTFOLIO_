'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ label, title, accent }: { label: string; title: string; accent?: string }) {
  return (
    <Reveal className="mb-10">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-burgundy-400" />
        <span className="section-label">{label}</span>
      </div>
      <h2 className="section-title mt-4">
        {title} {accent && <span className="gradient-text">{accent}</span>}
      </h2>
    </Reveal>
  )
}

/** Apple-style rolling odometer: each digit is a reel that spins into place */
export function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const digits = String(to).split('')
  return (
    <span ref={ref} className="inline-flex items-end tabular-nums" style={{ lineHeight: 1 }} aria-label={`${prefix}${to}${suffix}`}>
      {prefix}
      {digits.map((d, i) => (
        <span key={i} aria-hidden className="relative inline-block overflow-hidden" style={{ height: '1em', lineHeight: 1, width: '0.62em' }}>
          <motion.span
            className="absolute left-0 top-0 flex w-full flex-col items-center"
            initial={{ y: '0em' }}
            animate={inView ? { y: `${-(10 + Number(d))}em` } : {}}
            transition={{ duration: 1.6 + i * 0.25, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {Array.from({ length: 20 }, (_, k) => (
              <span key={k} style={{ height: '1em', lineHeight: 1 }}>
                {k % 10}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
      <span style={{ lineHeight: 1 }}>{suffix}</span>
    </span>
  )
}

/** 3D tilt + cursor spotlight card */
export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
    el.style.setProperty('--sx', `${e.clientX - r.left}px`)
    el.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-2xl glass ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--sx, 50%) var(--sy, 50%), rgba(138,15,46,0.28), transparent 70%)',
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  )
}

/** Button that is gently pulled toward the cursor */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}
