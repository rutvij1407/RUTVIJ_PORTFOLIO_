'use client'

import { useRef } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import { FiAward, FiCpu, FiLayers } from 'react-icons/fi'
import GlassPortrait from './GlassPortrait'
import { Reveal, SectionHeading, TiltCard } from './ui'
import { profile, credentials } from '@/lib/data'

const statement =
  'I turn raw, messy data into pipelines, dashboards and AI tools that people actually trust. Part data engineer, part analyst, always shipping.'

function Word({ w, range, p }: { w: string; range: [number, number]; p: MotionValue<number> }) {
  const opacity = useTransform(p, range, [0.12, 1])
  const blur = useTransform(p, range, ['blur(6px)', 'blur(0px)'])
  return (
    <motion.span style={{ opacity, filter: blur }} className="mr-[0.28em] inline-block">
      {w}
    </motion.span>
  )
}

/** Apple-style: words light up as you scroll */
function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = statement.split(' ')
  return (
    <p ref={ref} className="font-display text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
      {words.map((w, i) => (
        <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-16">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
        <SectionHeading label="About" title="Hello, I'm" accent={profile.short + '.'} />
        <div className="mb-16 max-w-5xl">
          <ScrollStatement />
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Reveal className="h-full">
            <GlassPortrait />
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.05}>
              <TiltCard className="p-7 !rounded-[28px]">
                <FiCpu className="text-2xl text-burgundy-200" />
                <h3 className="mt-3 font-display text-xl font-semibold">What I do</h3>
                <p className="mt-2 text-burgundy-100/70">
                  I design end-to-end ETL pipelines in Python and SQL, model data for analysis, and surface it through Power BI and Tableau dashboards. Lately I&apos;m wiring LLMs into analytics so anyone can ask their data a question in plain English.
                </p>
              </TiltCard>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { icon: FiLayers, t: 'Engineer', d: 'ETL / ELT, warehousing, AWS, automation' },
                { icon: FiAward, t: 'Analyst', d: 'SQL, statistics, ML, storytelling' },
              ].map((c, i) => (
                <Reveal key={c.t} delay={0.1 + i * 0.05}>
                  <TiltCard className="p-6 !rounded-[28px]">
                    <c.icon className="text-2xl text-glacier-300" />
                    <h3 className="mt-3 font-display text-lg font-semibold">{c.t}</h3>
                    <p className="mt-1 text-sm text-burgundy-100/60">{c.d}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <TiltCard className="p-6 !rounded-[28px]">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-burgundy-300">Credentials</h3>
                <ul className="space-y-3">
                  {credentials.map((c) => (
                    <li key={c.title} className="flex items-start gap-3">
                      <span className="mt-0.5 rounded-full border border-burgundy-300/30 bg-burgundy-800/40 px-2 py-0.5 font-mono text-[10px] uppercase text-burgundy-100">{c.type}</span>
                      <div>
                        <div className="text-sm text-cream">{c.title}</div>
                        <div className="font-mono text-[11px] text-burgundy-200/60">{c.meta}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
