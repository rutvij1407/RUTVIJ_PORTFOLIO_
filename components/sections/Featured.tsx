'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const featured = [
  {
    title: 'TalentScope: US Data Job Market Dashboard',
    description:
      'An interactive dashboard built on 206,292 real US data job postings. See which skills employers ask for, what roles pay and where the jobs are, with a filterable state map, a salary estimator and a resume skill check.',
    image: '/assets/img/projects/talentscope-1.jpg',
    href: 'https://talentscope-chi.vercel.app',
  },
  {
    title: 'DataSense AI: Chat With Your Data',
    description:
      'Upload a spreadsheet, ask questions in plain English and get answers with interactive charts. The public demo replays recorded chats, so it needs no setup and makes no live AI calls.',
    image: '/assets/img/projects/datasense-1.jpg',
    href: 'https://data-sense-chatbot.vercel.app',
  },
  {
    title: 'CapitalEdge: DC Metro Housing Dashboard',
    description:
      '26 years of home values across 191 ZIP codes in Washington DC, Maryland and Virginia, with county comparisons, rents, mortgage rates and findings drawn from the data.',
    image: '/assets/img/projects/capitaledge-1.jpg',
    href: 'https://capitaledge-one.vercel.app',
  },
  {
    title: 'Solaris: Live Flight and Satellite Globe',
    description:
      'A 3D globe with live aircraft, satellites, earthquakes and weather radar, built on open data with no API keys.',
    image: '/assets/img/projects/solaris-2.jpg',
    href: 'https://solaris-web-ten.vercel.app',
  },
]

export default function Featured() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="featured" className="py-24 bg-[#000000] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[#dc2626]">Featured</span> Work
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto">My most recent and most complete projects. Click a card to open the live site.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {featured.map((f, i) => (
            <motion.a
              key={f.title}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group block rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/50 overflow-hidden transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden border-b border-[#1f2937] bg-[#111]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.image} alt={f.title} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#f5f5f7] mb-2 group-hover:text-[#dc2626] transition-colors">{f.title}</h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed">{f.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
