'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiDatabase, FiCloud, FiRepeat, FiHardDrive, FiBarChart2 } from 'react-icons/fi'
import { Reveal, SectionHeading, TiltCard, Counter } from './ui'
import { BarChart, ColumnChart, Donut, LineArea } from './charts'
import { projects, experience } from '@/lib/data'

const impact = [
  { label: 'Data accuracy', value: 99 },
  { label: 'Faster queries', value: 40 },
  { label: 'Faster decisions', value: 30 },
  { label: 'Fewer report errors', value: 25 },
  { label: 'Lower cloud cost', value: 20 },
  { label: 'Forecast accuracy', value: 15 },
]

const categories = ['Data & ML', 'AI', 'Web', 'Native'].map((c) => ({
  label: c,
  value: projects.filter((p) => p.category === c).length,
}))

const toolFreq = (() => {
  const m = new Map<string, number>()
  projects.forEach((p) => p.tech.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)))
  experience.forEach((e) => e.tags.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1)))
  return Array.from(m.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, value]) => ({ label: label.length > 7 ? label.slice(0, 6) + '…' : label, value }))
})()

const toolsPerRole = [...experience].reverse().map((e) => ({ label: e.company, value: e.tags.length }))

const nodes = [
  { icon: FiCloud, t: 'Sources', s: 'APIs · CSV · RDS' },
  { icon: FiRepeat, t: 'Ingest', s: 'Python · Airflow' },
  { icon: FiDatabase, t: 'Transform', s: 'SQL · Pandas · Spark' },
  { icon: FiHardDrive, t: 'Store', s: 'Postgres · S3 · RDS' },
  { icon: FiBarChart2, t: 'Serve', s: 'Power BI · Tableau' },
]

function Pipeline() {
  return (
    <div className="relative">
      <svg className="pointer-events-none absolute left-0 top-[34px] hidden h-2 w-full md:block" preserveAspectRatio="none">
        <line x1="10%" x2="90%" y1="4" y2="4" stroke="rgba(217,149,159,.35)" strokeWidth="2" strokeDasharray="6 6" className="animate-flow" />
      </svg>
      <div className="relative grid grid-cols-2 gap-6 md:grid-cols-5">
        {nodes.map((n, i) => (
          <motion.div
            key={n.t}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 160, damping: 16 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-ring rounded-2xl bg-burgundy-500/40" style={{ animationDelay: `${i * 0.4}s` }} />
              <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-burgundy-300/30 bg-gradient-to-br from-burgundy-500 to-burgundy-800 text-2xl text-white shadow-[0_10px_40px_-8px_rgba(138,15,46,.8)]">
                <n.icon />
              </div>
            </div>
            <div className="mt-3 font-display font-semibold text-cream">{n.t}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-burgundy-200/60">{n.s}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const QUERY = `SELECT metric, improvement_pct
FROM   career_impact
WHERE  verified = TRUE
ORDER  BY improvement_pct DESC
LIMIT  4;`

function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setN((v) => (v >= QUERY.length ? v : v + 2)), 28)
    return () => clearInterval(id)
  }, [inView])
  const done = n >= QUERY.length
  const rows = impact.slice(0, 4)
  const hl = (s: string) =>
    s.split(/(\bSELECT\b|\bFROM\b|\bWHERE\b|\bORDER\b|\bBY\b|\bLIMIT\b|\bDESC\b|\bTRUE\b|\bAND\b)/g).map((p, i) =>
      /^(SELECT|FROM|WHERE|ORDER|BY|LIMIT|DESC|TRUE|AND)$/.test(p) ? (
        <span key={i} className="text-burgundy-300">
          {p}
        </span>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 font-mono text-[12.5px]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-burgundy-200/50">rutvij@warehouse ~ psql</span>
      </div>
      <pre className="min-h-[130px] whitespace-pre-wrap p-4 leading-relaxed text-cream/90">
        <span className="text-glacier-300">analytics=# </span>
        {hl(QUERY.slice(0, n))}
        {!done && <span className="animate-blink">▍</span>}
      </pre>
      {done && (
        <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-4 mb-4 w-[calc(100%-2rem)] text-left text-burgundy-100">
          <thead>
            <tr className="border-b border-white/10 text-burgundy-200/60">
              <th className="py-1.5 font-normal">metric</th>
              <th className="py-1.5 text-right font-normal">improvement_pct</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr key={r.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i }} className="border-b border-white/5">
                <td className="py-1.5">{r.label}</td>
                <td className="py-1.5 text-right text-glacier-200">{r.value}</td>
              </motion.tr>
            ))}
            <tr>
              <td colSpan={2} className="pt-2 text-burgundy-200/50">
                (4 rows)
              </td>
            </tr>
          </tbody>
        </motion.table>
      )}
    </div>
  )
}

function Panel({ title, sub, children, className = '' }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <TiltCard className="h-full p-6 !rounded-[28px]">
        <div className="flex h-full flex-col">
          <div className="mb-5 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-cream">{title}</h3>
            {sub && <span className="font-mono text-[10px] uppercase tracking-wider text-burgundy-200/50">{sub}</span>}
          </div>
          <div className="flex flex-1 flex-col justify-center">{children}</div>
        </div>
      </TiltCard>
    </Reveal>
  )
}

export default function Dashboard() {
  return (
    <section id="dashboard" className="relative py-16">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
        <SectionHeading label="Analytics lab" title="My career, as a" accent="live dashboard." />

        <div className="grid gap-5 lg:grid-cols-12">
          <Panel title="Impact delivered" sub="% improvement" className="lg:col-span-5">
            <BarChart data={impact} unit="%" />
          </Panel>

          <Panel title="Projects by domain" sub={`${projects.length} shipped`} className="lg:col-span-4">
            <Donut data={categories} title="projects" size={210} />
          </Panel>

          <Panel title="Records processed" sub="Archents · SQL / Power BI" className="lg:col-span-3">
            <div className="font-display text-5xl font-bold text-cream">
              <Counter to={50} suffix="K+" />
            </div>
            <p className="mt-1 text-sm text-burgundy-100/60">records analysed to find seasonal demand</p>
            <ul className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm">
              {[
                ['10K+', 'daily records validated'],
                ['5+', 'sources unified into one dataset'],
                ['35%', 'less manual reporting effort'],
              ].map(([v, l]) => (
                <li key={l} className="flex items-baseline gap-3">
                  <span className="w-14 shrink-0 font-display text-lg font-semibold text-burgundy-100">{v}</span>
                  <span className="text-burgundy-100/60">{l}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Most-used tools" sub="across roles + projects" className="lg:col-span-5">
            <ColumnChart data={toolFreq} height={230} />
          </Panel>

          <Panel title="Stack breadth per role" sub="tools, chronological" className="lg:col-span-3">
            <LineArea data={toolsPerRole} height={200} />
            <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-wider text-burgundy-200/50">
              {toolsPerRole.map((t) => (
                <span key={t.label} className="max-w-[70px] truncate">
                  {t.label.split(',')[0].split(' ')[0]}
                </span>
              ))}
            </div>
          </Panel>

          <Panel title="Live query" sub="postgres" className="lg:col-span-4">
            <Terminal />
          </Panel>

          <Panel title="How I move data" sub="source → insight" className="lg:col-span-12">
            <Pipeline />
          </Panel>
        </div>
      </div>
    </section>
  )
}
