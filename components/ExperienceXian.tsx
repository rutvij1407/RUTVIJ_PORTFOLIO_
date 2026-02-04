'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    company: 'Archents India Pvt. Ltd.',
    profession: 'Data Analytics Intern',
    period: '08/24 - 07/25',
    description: 'Analyzed 50K+ records using SQL, SSMS, and Power BI, identifying sales trends that improved forecast accuracy by 15%. Automated recurring reports with Excel and Power BI, reducing manual effort by 35%. Consolidated multi-source data using Python and SQL, reducing reporting errors by 25%.',
  },
  {
    company: 'Pullulate',
    profession: 'Co-Founder & CIO',
    period: '11/22 - Present',
    description: 'Contributed to the development of an e-commerce platform with a focus on security and scalability. Played a key role in presenting a research paper on cybersecurity at ICCSCP-2024, highlighting advancements in data protection and secure transactions.',
  },
]

export default function ExperienceXian() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-16 md:py-24" ref={ref}>
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">EXPERIENCE</h2>
      <div className="max-w-[1168px] mx-auto px-6 space-y-8 md:space-y-12">
        {experiences.map((exp, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="grid gap-4 md:grid-cols-[320px_1fr] xl:grid-cols-[350px_1fr] xl:gap-16"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#3b82f6]">{exp.company}</h2>
            <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-[#1f2937]">
              <h3 className="text-lg font-semibold mb-2">{exp.profession}</h3>
              <span className="text-sm text-[#3b82f6] block mb-4">{exp.period}</span>
              <p className="text-[#9ca3af] text-sm text-justify">{exp.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
