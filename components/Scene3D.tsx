'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const BARS = [46, 78, 58, 112, 88, 140, 104]
const W = 34
const GAP = 18

function Cuboid({ h, i }: { h: number; i: number }) {
  const side = (rot: string, shade: string): React.CSSProperties => ({
    width: W,
    height: '100%',
    transform: `${rot} translateZ(${W / 2}px)`,
    background: shade,
  })
  return (
    <motion.div
      className="scene-3d absolute bottom-0"
      style={{ width: W, left: i * (W + GAP) }}
      initial={{ height: 0 }}
      animate={{ height: h }}
      transition={{ delay: 0.9 + i * 0.12, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="face" style={side('rotateY(0deg)', 'linear-gradient(180deg,#b5485d,#800020)')} />
      <div className="face" style={side('rotateY(180deg)', 'linear-gradient(180deg,#8a0f2e,#2a0710)')} />
      <div className="face" style={side('rotateY(90deg)', 'linear-gradient(180deg,#a8203f,#4a0013)')} />
      <div className="face" style={side('rotateY(-90deg)', 'linear-gradient(180deg,#8a1d36,#2a0710)')} />
      <div
        className="face"
        style={{ width: W, height: W, top: -W / 2, background: '#c9707f', transform: 'rotateX(90deg)', boxShadow: '0 0 24px rgba(217,149,159,.6)' }}
      />
    </motion.div>
  )
}

function DonutPlane() {
  const segs = [
    [0.38, '#d9959f'],
    [0.27, '#8a0f2e'],
    [0.2, '#bcd0e2'],
    [0.15, '#800020'],
  ] as const
  const r = 52
  const c = 2 * Math.PI * r
  let acc = 0
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
      {segs.map(([p, col], i) => {
        const len = p * c
        const off = acc
        acc += len
        return (
          <circle
            key={i}
            cx="75"
            cy="75"
            r={r}
            fill="none"
            stroke={col}
            strokeWidth="20"
            strokeDasharray={`${len - 3} ${c}`}
            strokeDashoffset={-off}
          />
        )
      })}
    </svg>
  )
}

function LinePlane() {
  return (
    <svg width="190" height="110" viewBox="0 0 190 110" fill="none">
      <rect width="190" height="110" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(217,149,159,.25)" />
      <path d="M12 86 C40 80 46 40 72 52 S112 92 132 46 S168 24 180 20" stroke="#d9959f" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 86 C40 80 46 40 72 52 S112 92 132 46 S168 24 180 20 V104 H12Z" fill="url(#lp)" opacity=".35" />
      <defs>
        <linearGradient id="lp" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#a8203f" />
          <stop offset="1" stopColor="#a8203f" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Scene3D() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [-14, -30]), { stiffness: 80, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 18 })
  const total = BARS.length * W + (BARS.length - 1) * GAP
  const plate = 380

  return (
    <div
      className="relative mx-auto flex h-[420px] w-full max-w-[560px] items-center justify-center sm:h-[520px]"
      style={{ perspective: 1300 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy-600/40 blur-[90px]" />

      <motion.div className="scene-3d relative scale-[.72] sm:scale-100" style={{ rotateX: rx, rotateY: ry, width: 0, height: 0 }}>
        <div className="scene-3d animate-stage-spin absolute left-0 top-0">
          {/* floor plate with grid */}
          <div
            className="face rounded-3xl"
            style={{
              width: plate,
              height: plate,
              left: -plate / 2,
              top: -plate / 2 + 70,
              transform: 'rotateX(90deg)',
              background:
                'linear-gradient(rgba(217,149,159,.18) 1px,transparent 1px) 0 0/38px 38px, linear-gradient(90deg,rgba(217,149,159,.18) 1px,transparent 1px) 0 0/38px 38px, radial-gradient(circle,rgba(138,15,46,.35),rgba(20,3,8,.6))',
              border: '1px solid rgba(217,149,159,.35)',
              boxShadow: '0 0 80px rgba(138,15,46,.5)',
            }}
          />

          {/* 3D bar chart */}
          <div className="scene-3d absolute" style={{ left: -total / 2, top: -70, width: total, height: 140 }}>
            {BARS.map((h, i) => (
              <Cuboid key={i} h={h} i={i} />
            ))}
          </div>

          {/* orbit ring with data points */}
          <div
            className="face"
            style={{ left: -plate / 2 - 20, top: -plate / 2 - 20, width: plate + 40, height: plate + 40, transform: 'rotateX(90deg) translateZ(-40px)' }}
          >
            <div className="animate-orbit relative h-full w-full rounded-full border border-dashed border-burgundy-200/40">
              {[0, 72, 144, 216, 288].map((a) => (
                <span
                  key={a}
                  className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-glacier-300 shadow-[0_0_18px_#bcd0e2]"
                  style={{ transform: `rotate(${a}deg) translateX(${(plate + 40) / 2}px) translate(-50%,-50%)` }}
                />
              ))}
            </div>
          </div>

          {/* floating donut (standing, tilts) */}
          <div className="face" style={{ left: -250, top: -200, transform: 'translateZ(-120px) rotateY(24deg)' }}>
            <div className="animate-float drop-shadow-[0_0_30px_rgba(138,15,46,.6)]">
              <DonutPlane />
            </div>
          </div>

          {/* floating line chart card */}
          <div className="face" style={{ left: 90, top: -230, transform: 'translateZ(140px) rotateY(-18deg)' }}>
            <div className="animate-float [animation-delay:-3s]">
              <LinePlane />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
