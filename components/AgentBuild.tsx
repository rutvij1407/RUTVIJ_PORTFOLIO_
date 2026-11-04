'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { startAgentBuild, type Controller, type HudState } from '@/lib/agentBuild'

/**
 * The site's intro / loader: "RUTVIJ" wordmark, then a swarm of cursors builds
 * the real page while it auto-scrolls to the footer, then the site is yours.
 * Plays on every load. Disable with ?noagents or ?nointro (or reduced motion).
 */
export default function AgentBuild() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctl = useRef<Controller | null>(null)
  // Starts true so the cover is in the server HTML (no flash of the unbuilt page).
  const [enabled, setEnabled] = useState(true)
  const [hud, setHud] = useState<HudState | null>(null)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    if (q.has('noagents') || q.has('nointro') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled || !canvasRef.current) return
    const c = startAgentBuild(canvasRef.current, setHud, () => setEnabled(false))
    ctl.current = c
    return () => {
      c.destroy()
      ctl.current = null
    }
  }, [enabled])

  // finished -> give the visitor the site
  const finished = hud?.phase === 'done'
  useEffect(() => {
    if (!finished) return
    const id = setTimeout(() => setEnabled(false), 2200)
    return () => clearTimeout(id)
  }, [finished])

  if (!enabled) return null

  const phase = hud?.phase ?? 'scan'
  const covered = !hud || (phase === 'scan' && hud.seconds < 0.8)

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9998]" />

      {/* RUTVIJ loader cover, wipes away as the swarm arrives */}
      <div
        aria-hidden={!covered}
        data-ab className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-ink"
        style={{
          clipPath: covered ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 0.7s cubic-bezier(0.76,0,0.24,1)',
          pointerEvents: covered ? 'auto' : 'none',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-burgundy-600/30 blur-3xl" />
        </div>
        <div className="relative flex overflow-hidden font-display text-6xl font-bold tracking-tight sm:text-8xl">
          {'RUTVIJ'.split('').map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', rotate: 8 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={i % 2 ? 'gradient-text' : 'text-cream'}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <p className="relative mt-4 font-mono text-xs uppercase tracking-[0.4em] text-burgundy-200">Data Analytics Engineer</p>
      </div>

    </>
  )
}
