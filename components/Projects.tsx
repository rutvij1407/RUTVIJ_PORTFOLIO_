'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX, FiArrowUpRight } from 'react-icons/fi'
import { SectionHeading, TiltCard } from './ui'
import { projects, type Project } from '@/lib/data'

const filters = ['All', 'Data & ML', 'AI', 'Web', 'Native'] as const
const spring = { type: 'spring', stiffness: 260, damping: 28 } as const

function Sheet({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        layoutId={`card-${p.title}`}
        transition={spring}
        className="liquid relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-[#050203] p-7 sm:p-10"
        style={{ borderRadius: 32 }}
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20">
          <FiX />
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-burgundy-300">{p.category} · {p.kind}</p>
        <h3 className="mt-2 font-display text-4xl font-bold text-cream">{p.title}</h3>
        {p.stat && (
          <div className="mt-5 inline-flex items-baseline gap-2 rounded-2xl border border-burgundy-300/20 bg-burgundy-800/30 px-4 py-2">
            <span className="titan-text font-display text-2xl font-bold">{p.stat.v}</span>
            <span className="text-xs text-burgundy-100/70">{p.stat.l}</span>
          </div>
        )}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <ul className="mt-6 space-y-3 text-burgundy-100/80">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-burgundy-300" />
                {pt}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live report <FiExternalLink />
              </a>
            )}
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FiGithub /> GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [f, setF] = useState<(typeof filters)[number]>('All')
  const [open, setOpen] = useState<Project | null>(null)
  const list = projects.filter((p) => f === 'All' || p.category === f)

  return (
    <section id="projects" className="relative py-16">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
        <SectionHeading label="Projects" title="Things I've" accent="built." />

        <LayoutGroup>
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((x) => (
              <button
                key={x}
                onClick={() => setF(x)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${f === x ? 'text-white' : 'text-burgundy-100/60 hover:text-cream'}`}
              >
                {f === x && <motion.span layoutId="pill" transition={spring} className="absolute inset-0 rounded-full bg-burgundy-600 shadow-[0_0_30px_-5px_rgba(138,15,46,.8)]" />}
                <span className="relative">{x}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ ...spring, delay: i * 0.03 }}
                  className={i === 0 && f === 'All' ? 'lg:col-span-2' : ''}
                >
                  <motion.div layoutId={`card-${p.title}`} transition={spring} style={{ borderRadius: 28 }} className="h-full">
                    <button onClick={() => setOpen(p)} className="block h-full w-full text-left" aria-label={`Open ${p.title}`}>
                      <TiltCard className="h-full p-6 !rounded-[28px]">
                        <div className="flex items-start justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-burgundy-300">{p.category}</span>
                          <span className="flex items-center gap-2">
                            {p.live && (
                              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> LIVE
                              </span>
                            )}
                            <FiArrowUpRight className="text-burgundy-200/60 transition group-hover:translate-x-0.5 group-hover:text-cream" />
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-2xl font-semibold text-cream">{p.title}</h3>
                        <p className="text-sm text-burgundy-200/60">{p.kind}</p>
                        <p className="mt-3 text-sm leading-relaxed text-burgundy-100/75">{p.blurb}</p>
                        {i === 0 && f === 'All' && (
                          <ul className="mt-4 hidden space-y-2 text-sm text-burgundy-100/65 lg:block">
                            {p.points.map((pt) => (
                              <li key={pt} className="flex gap-2.5">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-burgundy-300" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                        {p.stat && (
                          <div className="mt-5 flex items-baseline gap-2 border-t border-white/5 pt-4">
                            <span className="titan-text font-display text-xl font-bold">{p.stat.v}</span>
                            <span className="text-xs text-burgundy-100/50">{p.stat.l}</span>
                          </div>
                        )}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tech.slice(0, 4).map((t) => (
                            <span key={t} className="chip">{t}</span>
                          ))}
                        </div>
                      </TiltCard>
                    </button>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>{open && <Sheet p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  )
}
