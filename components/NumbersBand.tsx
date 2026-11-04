'use client'

import { useRef } from 'react'
import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { stats } from '@/lib/data'

/** A number that is scrubbed by scroll position, not by time */
function Scrub({ p, to, suffix, range }: { p: MotionValue<number>; to: number; suffix: string; range: [number, number] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const v = useTransform(p, range, [0, to], { clamp: true })
  useMotionValueEvent(v, 'change', (n) => {
    if (ref.current) ref.current.textContent = Math.round(n).toLocaleString()
  })
  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}

export default function NumbersBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 0.2, 0.9, 1], [0.86, 1, 1, 0.95])
  const opacity = useTransform(p, [0, 0.12, 0.88, 1], [0, 1, 1, 0])
  const bar = useTransform(p, [0.05, 0.85], [0, 1])
  const glow = useTransform(p, [0, 1], [0.2, 0.7])

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ opacity: glow }} className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy-600/25 blur-[120px]" />
        <motion.div style={{ scale, opacity }} className="relative mx-auto w-full max-w-[1360px] px-6 sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-burgundy-300">The numbers · scroll</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
            Results, <span className="gradient-text">counted as you scroll.</span>
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label}>
                <div className="titan-text font-display text-6xl font-bold sm:text-7xl xl:text-8xl">
                  <Scrub p={p} to={s.value} suffix={s.suffix} range={[0.08 + i * 0.1, 0.55 + i * 0.1]} />
                </div>
                <div className="mt-2 text-cream">{s.label}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-burgundy-200/60">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="mt-14 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left rounded-full bg-gradient-to-r from-burgundy-700 via-burgundy-400 to-burgundy-200" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
