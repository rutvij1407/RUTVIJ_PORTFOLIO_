'use client'

import { useEffect, useMemo, useRef } from 'react'
import { SectionHeading, Reveal, TiltCard } from './ui'
import { Radar } from './charts'
import { skills } from '@/lib/data'

const radar = [
  { label: 'SQL', value: 92 },
  { label: 'Python', value: 90 },
  { label: 'ETL', value: 88 },
  { label: 'BI', value: 90 },
  { label: 'Cloud', value: 78 },
  { label: 'ML', value: 76 },
  { label: 'Stats', value: 80 },
]

const sphereWords = ['Python', 'SQL', 'R', 'Power BI', 'Tableau', 'AWS', 'ETL', 'Spark', 'Airflow', 'Pandas', 'Docker', 'Next.js', 'TypeScript', 'Claude API', 'Plotly', 'Scikit-learn', 'Postgres', 'Supabase', 'Swift', 'Mapbox', 'Git', 'Excel', 'NumPy', 'MySQL', 'S3', 'Lambda', 'Glue', 'NLP', 'TensorFlow', 'Streamlit']

/** Draggable 3D tag sphere (pure CSS 3D + rAF) */
function SkillSphere() {
  const box = useRef<HTMLDivElement>(null)
  const pts = useMemo(
    () =>
      sphereWords.map((w, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / sphereWords.length)
        const th = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
        return { w, x: Math.cos(th) * Math.sin(phi), y: Math.sin(th) * Math.sin(phi), z: Math.cos(phi) }
      }),
    [],
  )
  useEffect(() => {
    const el = box.current!
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-t]'))
    const r = Math.min(el.clientWidth / 2 - 40, 190)
    let ax = 0.004
    let ay = 0.006
    let angX = 0
    let angY = 0
    let drag = false
    let lx = 0
    let ly = 0
    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)
    const down = (e: PointerEvent) => {
      drag = true
      lx = e.clientX
      ly = e.clientY
    }
    const up = () => (drag = false)
    const move = (e: PointerEvent) => {
      if (!drag) return
      ay = (e.clientX - lx) * 0.0004
      ax = -(e.clientY - ly) * 0.0004
      lx = e.clientX
      ly = e.clientY
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointermove', move)
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      if (!drag) {
        ay += (0.006 - ay) * 0.02
        ax += (0.003 - ax) * 0.02
      }
      angX += ax * 16
      angY += ay * 16
      const cx = Math.cos(angX)
      const sx = Math.sin(angX)
      const cy = Math.cos(angY)
      const sy = Math.sin(angY)
      items.forEach((it, i) => {
        const p = pts[i]
        const y1 = p.y * cx - p.z * sx
        const z1 = p.y * sx + p.z * cx
        const x2 = p.x * cy + z1 * sy
        const z2 = -p.x * sy + z1 * cy
        const s = (z2 + 2) / 3
        it.style.transform = `translate3d(${x2 * r}px, ${y1 * r}px, 0) translate(-50%,-50%) scale(${0.65 + s * 0.6})`
        it.style.opacity = String(0.25 + s * 0.75)
        it.style.zIndex = String(Math.round(s * 100))
      })
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointermove', move)
    }
  }, [pts])

  return (
    <div ref={box} className="relative mx-auto aspect-square w-full max-w-[480px] cursor-grab touch-none select-none active:cursor-grabbing">
      <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy-600/30 blur-3xl" />
      <div className="absolute inset-[6%] rounded-full border border-burgundy-300/10" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-burgundy-300/10" />
      {pts.map((p) => (
        <span
          key={p.w}
          data-t
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-burgundy-300/25 bg-burgundy-800/50 px-3 py-1 font-mono text-xs text-burgundy-50 backdrop-blur-sm"
        >
          {p.w}
        </span>
      ))}
      <p className="absolute -bottom-2 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-burgundy-200/40">drag to spin</p>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-16">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
        <SectionHeading label="Skills" title="The toolkit," accent="in orbit." />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SkillSphere />
          </Reveal>
          <Reveal delay={0.1}>
            <TiltCard className="p-7 !rounded-[28px]">
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold">Focus areas</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-burgundy-200/50">self-assessed</span>
              </div>
              <Radar axes={radar} />
            </TiltCard>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05} className={i === skills.length - 1 ? 'sm:col-span-2 lg:col-span-3' : ''}>
              <TiltCard className="h-full p-6 !rounded-[28px]">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-semibold text-cream">{g.group}</h3>
                  <span className="font-mono text-xs text-burgundy-300">{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
