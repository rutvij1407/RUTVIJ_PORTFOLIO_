'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    title: 'Data Engineering',
    description: 'Designing and developing efficient data pipelines, databases, and ETL processes to support analytics, reporting, and AI initiatives.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Data Visualization',
    description: 'Transforming complex data into actionable insights using Python, SQL, Power BI, and Tableau.',
  },
  {
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    title: 'Data Analytics',
    description: 'Extracting, cleaning, visualizing, and modeling data using Python, SQL, Power BI, and Tableau to drive data-driven decisions.',
  },
]

export default function ServicesXian() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-16 md:py-24 bg-[#050505]" ref={ref}>
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">AREAS OF EXPERTISE</h2>
      <div className="max-w-[1168px] mx-auto px-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#0f0f0f] p-8 md:p-12 rounded-3xl border border-[#1f2937] hover:border-[#3b82f6]/30 transition-colors relative"
          >
            <div className="relative inline-block mb-8">
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#3b82f6] opacity-80" />
              <svg className="w-10 h-10 relative z-10 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">{service.title}</h3>
            <p className="text-[#9ca3af] text-sm text-justify">{service.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
