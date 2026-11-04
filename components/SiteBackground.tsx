'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Backmost layer, built from separate artworks so they can move with the page:
 * triangles frame both edges and drift inward as you scroll; the spider sits in the middle.
 */
export default function SiteBackground() {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.6 })

  const triL = useTransform(p, [0, 1], ['-5vw', '1vw'])
  const spiderScale = useTransform(p, [0, 1], [0.94, 1.12])
  const spiderY = useTransform(p, [0, 1], ['2vh', '-4vh'])
  const glow = useTransform(p, [0, 1], [0.7, 1])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <motion.div style={{ opacity: glow }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(70,0,18,.75),transparent_62%)]" />

      {/* plain wine fill along both edges so no bare black shows on very wide screens */}
      <div className="absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-[rgba(80,8,26,.55)] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-[rgba(80,8,26,.55)] to-transparent" />

      {/* triangles on both edges */}
      <div className="absolute -left-[1vw] top-1/2 h-[92vh] -translate-y-1/2 opacity-60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img src="/assets/img/bg-tri.png" alt="" style={{ x: triL }} className="h-full w-auto max-w-none" />
      </div>
      <div className="absolute -right-[1vw] top-1/2 h-[92vh] -translate-y-1/2 -scale-x-100 opacity-60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img src="/assets/img/bg-tri.png" alt="" style={{ x: triL }} className="h-full w-auto max-w-none" />
      </div>

      {/* spider, centre */}
      <div className="absolute left-1/2 top-1/2 h-[62vh] -translate-x-1/2 -translate-y-1/2 opacity-45">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img src="/assets/img/bg-spider.png" alt="" style={{ scale: spiderScale, y: spiderY }} className="h-full w-auto max-w-none" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgba(0,0,0,.75)_100%)]" />
    </div>
  )
}
