'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { FiMapPin } from 'react-icons/fi'
import { TiltCard } from './ui'

const SRC = '/assets/img/rutvij_portrait.jpg'
const ZOOM = 2.4
const LENS = 150
const DARK_GLASS = 'blur(20px) saturate(170%) brightness(.55)'

/** Portrait inside an Apple-style liquid glass bezel, with a magnifying glass lens that follows the cursor */
export default function GlassPortrait() {
  const box = useRef<HTMLDivElement>(null)
  const lens = useRef<HTMLDivElement>(null)

  const move = (e: React.MouseEvent) => {
    const b = box.current!.getBoundingClientRect()
    const x = e.clientX - b.left
    const y = e.clientY - b.top
    const l = lens.current!
    l.style.opacity = '1'
    l.style.transform = `translate(${x - LENS / 2}px, ${y - LENS / 2}px) scale(1)`
    l.style.backgroundSize = `${b.width * ZOOM}px ${b.height * ZOOM}px`
    l.style.backgroundPosition = `${-(x * ZOOM - LENS / 2)}px ${-(y * ZOOM - LENS / 2)}px`
    box.current!.style.setProperty('--shx', `${(x / b.width) * 100}%`)
    box.current!.style.setProperty('--shy', `${(y / b.height) * 100}%`)
  }
  const leave = () => {
    const l = lens.current!
    l.style.opacity = '0'
    l.style.transform = l.style.transform.replace('scale(1)', 'scale(.4)')
  }

  return (
    <TiltCard className="h-full min-h-[420px] !rounded-[32px] p-2.5">
      <div
        ref={box}
        onMouseMove={move}
        onMouseLeave={leave}
        className="relative h-full min-h-[400px] cursor-none overflow-hidden rounded-[24px] md:cursor-none"
      >
        <Image src={SRC} alt="Rutvij Reddy Vakati" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover object-[50%_20%] transition-transform duration-[1200ms] ease-out hover:scale-[1.04]" priority />

        {/* burgundy grade so the cream wall sits inside the dark palette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-burgundy-900/20 to-black/10 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* specular sheen that tracks the cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
          style={{ background: 'radial-gradient(420px circle at var(--shx,30%) var(--shy,15%), rgba(255,255,255,.55), transparent 60%)' }}
        />

        {/* magnifier lens */}
        <div
          ref={lens}
          className="pointer-events-none absolute left-0 top-0 rounded-full opacity-0 transition-[opacity] duration-200"
          style={{
            width: LENS,
            height: LENS,
            backgroundImage: `url(${SRC})`,
            backgroundRepeat: 'no-repeat',
            border: '1.5px solid rgba(255,255,255,.55)',
            boxShadow: 'inset 0 0 22px rgba(255,255,255,.35), inset 0 3px 6px rgba(255,255,255,.6), 0 14px 40px rgba(0,0,0,.6)',
          }}
        >
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 30% 22%, rgba(255,255,255,.55), transparent 38%)' }} />
        </div>

        {/* floating liquid-glass chips */}
        <div className="liquid animate-float absolute left-4 top-4 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-cream"
          style={{ backdropFilter: DARK_GLASS, WebkitBackdropFilter: DARK_GLASS }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to work
        </div>
        <div className="liquid absolute inset-x-4 bottom-4 rounded-2xl px-4 py-3"
          style={{ backdropFilter: DARK_GLASS, WebkitBackdropFilter: DARK_GLASS }}>
          <div className="font-display text-base font-semibold text-cream">Vakati Rutvij Reddy</div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-burgundy-100/80">
            <FiMapPin className="text-burgundy-200" /> Fairfax, VA
            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-burgundy-200/70">MS Data Analytics · GMU &apos;27</span>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
