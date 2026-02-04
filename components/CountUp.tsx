'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

type CountUpProps = {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function CountUp({ end, duration = 2, prefix = '', suffix = '', decimals = 0, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </span>
  )
}
