'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export const PALETTE = ['#d9959f', '#a8203f', '#8a0f2e', '#bcd0e2', '#93b0cb', '#800020']
const EASE = [0.22, 1, 0.36, 1] as const

type Datum = { label: string; value: number }

/** Horizontal bar chart that grows in on scroll, with hover read-out */
export function BarChart({ data, unit = '', max }: { data: Datum[]; unit?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hover, setHover] = useState<number | null>(null)
  const m = max ?? Math.max(...data.map((d) => d.value))
  return (
    <div ref={ref} className="space-y-3">
      {data.map((d, i) => (
        <div
          key={d.label}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className={`transition-opacity ${hover !== null && hover !== i ? 'opacity-40' : ''}`}
        >
          <div className="mb-1 flex justify-between font-mono text-[11px] text-burgundy-100/80">
            <span>{d.label}</span>
            <span className="text-glacier-200">
              {d.value}
              {unit}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-burgundy-600 via-burgundy-400 to-burgundy-200"
              initial={{ width: 0 }}
              animate={inView ? { width: `${(d.value / m) * 100}%` } : {}}
              transition={{ duration: 1.2, delay: i * 0.08, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Vertical column chart */
export function ColumnChart({ data, height = 160 }: { data: Datum[]; height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const m = Math.max(...data.map((d) => d.value))
  return (
    <div ref={ref} className="flex items-end gap-2" style={{ height: height + 28 }}>
      {data.map((d, i) => (
        <div key={d.label} className="group flex flex-1 flex-col items-center justify-end gap-2">
          <span className="font-mono text-[10px] text-glacier-200 opacity-0 transition-opacity group-hover:opacity-100">{d.value}</span>
          <motion.div
            className="w-full rounded-t-lg bg-gradient-to-t from-burgundy-700 via-burgundy-500 to-burgundy-200 group-hover:brightness-125"
            initial={{ height: 0 }}
            animate={inView ? { height: (d.value / m) * height } : {}}
            transition={{ duration: 1.1, delay: i * 0.07, ease: EASE }}
          />
          <span className="font-mono text-[9px] uppercase tracking-wider text-burgundy-100/60">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

/** Donut / pie chart with animated segments, hover focus and centre label */
export function Donut({ data, size = 200, title }: { data: Datum[]; size?: number; title?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hover, setHover] = useState<number | null>(null)
  const total = data.reduce((a, d) => a + d.value, 0)
  const r = size / 2 - 18
  const c = 2 * Math.PI * r
  let acc = 0
  const active = hover !== null ? data[hover] : null
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={18} />
          {data.map((d, i) => {
            const len = (d.value / total) * c
            const off = acc
            acc += len
            return (
              <motion.circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={hover === i ? 24 : 18}
                strokeLinecap="butt"
                strokeDashoffset={-off}
                initial={{ strokeDasharray: `0 ${c}` }}
                animate={inView ? { strokeDasharray: `${Math.max(len - 3, 0)} ${c}` } : {}}
                transition={{ duration: 1.1, delay: i * 0.15, ease: EASE }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer', transition: 'stroke-width .25s' }}
              />
            )
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-3xl font-bold text-cream">{active ? active.value : total}</span>
          <span className="max-w-[90px] font-mono text-[10px] uppercase tracking-wider text-burgundy-200">
            {active ? active.label : title}
          </span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {data.map((d, i) => (
          <li
            key={d.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="flex cursor-default items-center gap-2 text-burgundy-100/80"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
            {d.label}
            <span className="font-mono text-xs text-burgundy-200/60">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Smooth area/line chart that draws itself */
export function LineArea({ data, height = 140 }: { data: Datum[]; height?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const w = 400
  const pad = 14
  const m = Math.max(...data.map((d) => d.value))
  const pts = data.map((d, i) => [pad + (i / (data.length - 1)) * (w - pad * 2), height - pad - (d.value / m) * (height - pad * 2)])
  const path = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = pts[i - 1]
    const cx = (px + x) / 2
    return `${acc} C${cx},${py} ${cx},${y} ${x},${y}`
  }, '')
  const area = `${path} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`
  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${height}`} className="w-full overflow-visible">
      <defs>
        <linearGradient id="la-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8203f" stopOpacity=".5" />
          <stop offset="1" stopColor="#a8203f" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="la-stroke" x1="0" x2="1">
          <stop offset="0" stopColor="#8a0f2e" />
          <stop offset="1" stopColor="#d9959f" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1="0" x2={w} y1={height * t} y2={height * t} stroke="rgba(255,255,255,.05)" strokeDasharray="3 5" />
      ))}
      <motion.path d={area} fill="url(#la-fill)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 1 }} />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#la-stroke)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.8, ease: EASE }}
      />
      {pts.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={3.5}
          fill="#000000"
          stroke="#d9959f"
          strokeWidth={2}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.3 + (i / pts.length) * 1.5, type: 'spring', stiffness: 300 }}
        />
      ))}
    </svg>
  )
}

/** Radar / spider chart */
export function Radar({ axes, size = 320 }: { axes: Datum[]; size?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cx = size / 2
  const R = size / 2 - 46
  const n = axes.length
  const pt = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2
    return [cx + Math.cos(a) * R * v, cx + Math.sin(a) * R * v]
  }
  const poly = axes.map((a, i) => pt(i, a.value / 100).join(',')).join(' ')
  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[360px] overflow-visible">
      {[0.25, 0.5, 0.75, 1].map((lv) => (
        <polygon key={lv} points={axes.map((_, i) => pt(i, lv).join(',')).join(' ')} fill="none" stroke="rgba(217,149,159,.12)" />
      ))}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 1)
        const [lx, ly] = pt(i, 1.2)
        return (
          <g key={a.label}>
            <line x1={cx} y1={cx} x2={x} y2={y} stroke="rgba(217,149,159,.12)" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="fill-burgundy-100/80 font-mono" fontSize="10">
              {a.label}
            </text>
          </g>
        )
      })}
      <motion.polygon
        points={poly}
        fill="rgba(168,32,63,.28)"
        stroke="#d9959f"
        strokeWidth={2}
        style={{ transformOrigin: `${cx}px ${cx}px` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
      />
      {axes.map((a, i) => {
        const [x, y] = pt(i, a.value / 100)
        return <circle key={a.label} cx={x} cy={y} r={3.5} fill="#bcd0e2" />
      })}
    </svg>
  )
}

/** Tiny inline trend line */
export function Sparkline({ values, className = '' }: { values: number[]; className?: string }) {
  const w = 100
  const h = 32
  const m = Math.max(...values)
  const mn = Math.min(...values)
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - 3 - ((v - mn) / (m - mn || 1)) * (h - 6)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none">
      <motion.polyline
        points={pts}
        fill="none"
        stroke="#d9959f"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: EASE }}
      />
    </svg>
  )
}

/** Apple Watch style activity ring */
export function Ring({ value, size = 64, label }: { value: number; size?: number; label?: string }) {
  const r = size / 2 - 6
  const c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={6} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ring-g)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - Math.min(value, 100) / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <defs>
          <linearGradient id="ring-g" x1="0" x2="1">
            <stop offset="0" stopColor="#8a0f2e" />
            <stop offset="1" stopColor="#d9959f" />
          </linearGradient>
        </defs>
      </svg>
      {label && <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-semibold text-cream">{label}</span>}
    </div>
  )
}
