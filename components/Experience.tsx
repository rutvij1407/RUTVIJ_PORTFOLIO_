'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Reveal, SectionHeading, TiltCard } from './ui'
import { Ring } from './charts'
import { experience } from '@/lib/data'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" className="relative py-16">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
        <SectionHeading label="Experience" title="Where I've shipped" accent="data." />

        <div ref={ref} className="relative pl-8 sm:pl-14">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 sm:left-[19px]" />
          <motion.div style={{ scaleY: h }} className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-burgundy-200 via-burgundy-400 to-burgundy-700 shadow-[0_0_14px_#a8203f] sm:left-[19px]" />

          <div className="space-y-12">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={0.05}>
                <div className="relative">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    className="absolute -left-8 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-burgundy-300/50 bg-ink sm:-left-[52px]"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-burgundy-300 shadow-[0_0_12px_#d9959f]" />
                  </motion.span>

                  <TiltCard className="p-6 sm:p-8 !rounded-[28px]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-burgundy-300">{e.period}</p>
                        <h3 className="mt-1 font-display text-2xl font-semibold text-cream">{e.role}</h3>
                        <p className="text-burgundy-100/70">
                          {e.company} <span className="text-burgundy-200/40">· {e.location}</span>
                        </p>
                      </div>
                      <span className="font-mono text-4xl font-bold text-white/[0.06]">0{experience.length - i}</span>
                    </div>

                    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto]">
                    <ul className="space-y-3 text-sm leading-relaxed text-burgundy-100/75">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-burgundy-300" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-row flex-wrap gap-5 lg:flex-col lg:gap-4">
                      {e.metrics.map((m) => {
                        const pct = parseFloat(m.v)
                        const isPct = m.v.endsWith('%')
                        return (
                          <div key={m.l} className="flex items-center gap-3">
                            {isPct ? <Ring value={pct} label={m.v} size={68} /> : (
                              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/10 font-mono text-sm font-semibold text-cream">{m.v}</div>
                            )}
                            <span className="max-w-[90px] text-xs leading-snug text-burgundy-100/70">{m.l}</span>
                          </div>
                        )
                      })}
                    </div>

                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
