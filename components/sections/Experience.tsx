'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaBriefcase, FaDatabase, FaChartBar, FaFileExcel, FaBuilding, FaRocket, FaUniversity } from 'react-icons/fa'
import { SiPython } from 'react-icons/si'

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
    'Python': SiPython,
    'SQL': FaDatabase,
    'Power BI': FaChartBar,
    'Excel': FaFileExcel,
    'SSMS': FaDatabase,
    'AWS': FaDatabase,
  }
  return iconMap[tech] || FaBriefcase
}

const getTierIcon = (tier: string) => {
  if (tier === 'Enterprise') return FaBuilding
  if (tier === 'Startup') return FaRocket
  return FaUniversity
}

// Companies ordered top to low: Enterprise → Startup → Institution
const experiences = [
  {
    title: 'Data Analytics Intern',
    company: 'Archents India Pvt. Ltd.',
    tier: 'Enterprise',
    location: 'Hyderabad, IN',
    period: 'Aug 2024 – Jul 2025',
    highlights: [
      'Analyzed 100K records using SQL, SSMS, and Power BI to uncover sales and performance trends',
      'Automated recurring reports with Excel/Power BI, cutting manual effort by 35%',
      'Consolidated multi-source data with Python/SQL',
    ],
    tech: ['SQL', 'Power BI', 'Python', 'SSMS', 'Excel'],
  },
  {
    title: 'Founder & Data Lead',
    company: 'Pullulate Pvt. Ltd.',
    tier: 'Startup',
    location: 'Hyderabad, IN',
    period: 'Dec 2022 – Aug 2025',
    highlights: [
      'Designed Power BI dashboards on AWS RDS for real-time KPIs and engagement tracking',
      'Built ETL pipelines with Python (Pandas) and SQL; managed AWS EC2/S3/RDS',
      'Mentored team members on data quality standards, improving data accuracy by 20%',
    ],
    tech: ['Python', 'Power BI', 'AWS', 'SQL'],
  },
  {
    title: 'Peer Mentor',
    company: 'Pullulate Pvt. Ltd.',
    tier: 'Startup',
    location: 'Hyderabad, IN',
    period: 'Dec 2023 – Aug 2025',
    highlights: [
      'Mentored junior team members on data literacy and self-service analytics',
      'Created playbooks for common data tasks, reducing ad-hoc requests',
    ],
    tech: ['Excel', 'SQL', 'Power BI'],
  },
  {
    title: 'AWS Intern',
    company: 'NSIC - Institute of Aeronautical Engineering',
    tier: 'Institution',
    location: 'Hyderabad, IN',
    period: 'June 2023',
    highlights: [
      'Deployed AWS EC2, RDS, S3 environments for analytics workloads',
      'Built a prototype Power BI cost-tracking dashboard',
      'Tuned SQL queries and indexing to speed up dashboard refresh',
    ],
    tech: ['AWS', 'Power BI', 'SQL'],
  },
]

const TOTAL_POSITIONS = experiences.length

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-[#050505] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Work <span className="text-[#dc2626]">Experience</span>
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto text-sm sm:text-base px-2">
            Professional experience in data analytics, ETL development, and business intelligence across enterprises, startups, and institutions
          </p>

          {/* Total positions stat - contained, no overflow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-[#0a0a0a] border border-[#1f2937]"
          >
            <FaBriefcase className="text-[#dc2626] w-5 h-5 flex-shrink-0" />
            <span className="text-[#f5f5f7] font-semibold">{TOTAL_POSITIONS}</span>
            <span className="text-[#9ca3af] text-sm">Total Positions</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {experiences.map((exp, index) => {
            const TierIcon = getTierIcon(exp.tier)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
                className="group p-4 sm:p-5 lg:p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/30 transition-all overflow-hidden"
              >
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.08 + 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#dc2626]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#dc2626]/20 transition-colors"
                  >
                    <TierIcon className="text-[#dc2626] w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-[#dc2626]/20 text-[#dc2626] mb-2">
                      {exp.tier}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-[#f5f5f7] truncate" title={exp.title}>
                      {exp.title}
                    </h3>
                    <p className="text-[#dc2626] font-medium text-sm sm:text-base truncate" title={exp.company}>
                      {exp.company}
                    </p>
                    <p className="text-[#9ca3af] text-xs sm:text-sm mt-1 flex items-center gap-1 flex-wrap">
                      <span>{exp.location}</span>
                      <span className="text-[#6b7280]">•</span>
                      <span>{exp.period}</span>
                    </p>

                    <ul className="mt-3 space-y-1.5">
                      {exp.highlights.slice(0, 2).map((h, i) => (
                        <li
                          key={i}
                          className="text-[#9ca3af] text-xs sm:text-sm leading-relaxed break-words"
                          title={h}
                        >
                          • {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.tech.map((tech, i) => {
                        const Icon = getTechIcon(tech)
                        return (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.08 + i * 0.03 }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#dc2626]/10 text-[#dc2626] text-xs border border-[#dc2626]/20"
                          >
                            <Icon size={12} className="flex-shrink-0" />
                            <span className="truncate max-w-[80px] sm:max-w-[100px]">{tech}</span>
                          </motion.span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
