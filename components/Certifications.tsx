'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCertificate, FaPython, FaDatabase, FaChartBar, FaAws, FaMicrosoft } from 'react-icons/fa'
import CountUp from './CountUp'

const certifications = [
  {
    name: 'Python Skill Certificate',
    issuer: 'HackerRank',
    icon: FaPython,
    date: 'Feb 2026',
    description: 'Proficiency in Python programming, data structures, algorithms, and problem-solving techniques.',
  },
  {
    name: 'SQL (Advanced)',
    issuer: 'HackerRank',
    icon: FaDatabase,
    date: 'Feb 2026',
    description: 'Expert-level proficiency in complex database operations, window functions, CTEs, and query optimization.',
  },
  {
    name: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    icon: FaDatabase,
    date: 'Feb 2025',
    description: 'Advanced proficiency in joins, subqueries, window functions, and query optimization.',
  },
  {
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    icon: FaDatabase,
    date: 'Feb 2026',
    description: 'Fundamental SQL operations including queries, relationships, and aggregators.',
  },
  {
    name: 'Microsoft Power BI',
    issuer: 'Microsoft',
    icon: FaMicrosoft,
    date: '2024',
    description: 'Build interactive dashboards, model data efficiently, and deliver business-ready visual insights.',
  },
  {
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: FaAws,
    date: '2024',
    description: 'Foundational knowledge of cloud infrastructure, data storage, and scalable analytics solutions.',
  },
]

const stats = [
  { value: 6, suffix: '+', label: 'Certifications' },
  { value: 3, suffix: '', label: 'Platforms' },
  { value: 4, suffix: '', label: 'SQL Levels' },
  { value: 100, suffix: '%', label: 'Verified' },
]

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certifications" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional <span className="text-[#dc2626]">Certifications</span>
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto">
            Industry-recognized credentials validating expertise in programming, databases, cloud computing, and data visualization
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="p-4 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/50 transition-colors text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-[#dc2626]">
                <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
              </p>
              <p className="text-[#9ca3af] text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.2 } }}
                className="group p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 + i * 0.1 }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-14 h-14 rounded-xl bg-[#dc2626]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#dc2626]/20 transition-colors"
                  >
                    <Icon className="text-[#dc2626]" size={28} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-[#f5f5f7] group-hover:text-[#dc2626] transition-colors">
                        {cert.name}
                      </h3>
                      <span className="text-xs text-[#6b7280] whitespace-nowrap">{cert.date}</span>
                    </div>
                    <p className="text-sm text-[#dc2626] mt-1">{cert.issuer}</p>
                    <p className="text-sm text-[#9ca3af] mt-2 leading-relaxed">{cert.description}</p>
                  </div>
                </div>
                
                {/* Verified Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="mt-4 pt-4 border-t border-[#1f2937] flex items-center gap-2"
                >
                  <FaCertificate className="text-[#22c55e]" size={14} />
                  <span className="text-xs text-[#22c55e]">Verified Credential</span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
