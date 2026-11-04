'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown, FiDownload } from 'react-icons/fi'
import Scene3D from './Scene3D'
import { Magnetic, Counter } from './ui'
import { profile, stats, marquee } from '@/lib/data'

/** Constellation of data nodes that reacts to the cursor */
function NodeNetwork() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const mouse = { x: -999, y: -999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const count = window.innerWidth < 700 ? 38 : 80
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }))
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(cv)
    const move = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('resize', resize)
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 140) {
          n.x += (dx / d) * 1.2
          n.y += (dy / d) * 1.2
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        ctx.fillStyle = 'rgba(217,149,159,.7)'
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(168,32,63,${0.28 * (1 - d / 130)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < 170) {
          ctx.strokeStyle = `rgba(188,208,226,${0.5 * (1 - md / 170)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('mousemove', move)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-70" />
}

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[i]
    const t = setTimeout(
      () => {
        if (!del) {
          setTxt(word.slice(0, txt.length + 1))
          if (txt.length + 1 === word.length) setTimeout(() => setDel(true), 1400)
        } else {
          setTxt(word.slice(0, txt.length - 1))
          if (txt.length - 1 === 0) {
            setDel(false)
            setI((i + 1) % words.length)
          }
        }
      },
      del ? 28 : 65,
    )
    return () => clearTimeout(t)
  }, [txt, del, i, words])
  return (
    <span className="glacier-text">
      {txt}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-glacier-300 align-middle" style={{ height: '1em' }} />
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(14px)'])

  const line = (t: string, d: number) => (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: '110%', filter: 'blur(12px)' }}
        animate={{ y: 0, filter: 'blur(0px)' }}
        transition={{ delay: d, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {t}
      </motion.span>
    </span>
  )

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-28">
      <div className="absolute inset-0">
        <div className="aurora-blob absolute -left-40 top-0 h-[60vh] w-[60vh] rounded-full bg-burgundy-600/40" />
        <div className="aurora-blob absolute -right-40 bottom-0 h-[50vh] w-[50vh] rounded-full bg-burgundy-800/60 [animation-delay:-8s]" />
        <div className="dot-grid absolute inset-0" />
        <NodeNetwork />
      </div>

      <motion.div style={{ y, scale, opacity, filter: blur }} className="relative z-10 mx-auto w-full max-w-[1360px] px-6 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="liquid inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-burgundy-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to opportunities · {profile.location}
            </motion.div>

            <h1 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
              {line('Data, engineered', 0.35)}
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="titan-text block"
                  initial={{ y: '110%', filter: 'blur(12px)' }}
                  animate={{ y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  into decisions.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-6 font-display text-xl sm:text-2xl"
            >
              <span className="text-burgundy-100/60">I'm {profile.short}. </span>
              <Typewriter words={profile.roles} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-burgundy-100/70 sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Magnetic>
                <a href="#projects" className="btn-primary">
                  View my work <FiArrowDown />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FiDownload /> Résumé
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
            <Scene3D />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="liquid mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/5 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-black/30 p-5 sm:p-6">
              <div className="font-display text-3xl font-bold text-cream sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-burgundy-100">{s.label}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-burgundy-200/50">{s.note}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* tech marquee */}
      <div className="absolute inset-x-0 bottom-4 z-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 font-mono text-xs uppercase tracking-[0.25em] text-burgundy-200/40">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
