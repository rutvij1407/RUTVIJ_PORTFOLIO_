'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { FaBriefcase, FaDatabase, FaChartBar, FaFileExcel } from 'react-icons/fa'
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

const experiences = [
  {
    title: 'Data Analytics Intern',
    company: 'Archents India Pvt. Ltd.',
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
    location: 'Hyderabad, IN',
    period: 'Dec 2022 – Aug 2025',
    highlights: [
      'Designed Power BI dashboards on AWS RDS for real-time KPIs and engagement tracking',
      'Built ETL pipelines with Python (Pandas) and SQL; managed AWS EC2/S3/RDS with cost and access controls',
      'Mentored team members on data quality standards, improving data accuracy by 20%',
    ],
    tech: ['Python', 'Power BI', 'AWS', 'SQL'],
  },
  {
    title: 'Peer Mentor',
    company: 'Pullulate Pvt. Ltd.',
    location: 'Hyderabad, IN',
    period: 'Dec 2023 – Aug 2025',
    highlights: [
      'Mentored junior team members on data literacy and self-service analytics with weekly sessions on Excel, SQL, and Power BI',
      'Created playbooks for common data tasks, reducing ad-hoc requests',
    ],
    tech: ['Excel', 'SQL', 'Power BI'],
  },
  {
    title: 'AWS Intern',
    company: 'NSIC - Institute of Aeronautical Engineering',
    location: 'Hyderabad, IN',
    period: 'June 2023',
    highlights: [
      'Deployed AWS EC2, RDS, S3 environments for analytics workloads',
      'Built a prototype Power BI cost-tracking dashboard',
      'Tuned SQL queries and indexing to speed up dashboard refresh and query performance',
    ],
    tech: ['AWS', 'Power BI', 'SQL'],
  },
]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAutoAnimating, setIsAutoAnimating] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isInView || !isAutoAnimating) {
      setProgress(0)
      return
    }
    const duration = 5000
    const interval = 50
    const step = (interval / duration) * 100

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + step
      })
    }, interval)

    const changeInterval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % experiences.length)
      setProgress(0)
    }, duration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(changeInterval)
    }
  }, [isInView, isAutoAnimating])

  const handleExperienceChange = (index: number) => {
    setSelectedIndex(index)
    setIsAutoAnimating(false)
    setProgress(0)
  }

  const currentExp = experiences[selectedIndex]

  return (
    <section id="experience" className="py-24 bg-[#050505] relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Work <span className="text-[#dc2626]">Experience</span>
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto">Professional experience in data analytics, ETL development, and business intelligence across startups and enterprises</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#0a0a0a] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-[#1f2937]">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="w-3 h-3 rounded-full bg-[#eab308]" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="ml-4 text-[#6b7280] text-sm font-mono">experience.sh {isAutoAnimating && <span className="text-[#dc2626]">[auto]</span>}</span>
            </div>

            {isAutoAnimating && (
              <div className="h-1 bg-[#1f2937]">
                <motion.div
                  className="h-full bg-[#dc2626]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            <div className="p-6 font-mono text-sm">
              <div className="text-[#6b7280] mb-4">$ cat experience.json</div>
              <div className="space-y-2 text-[#e5e7eb]">
                <div><span className="text-[#9ca3af]">&quot;company&quot;:</span> &quot;{currentExp.company}&quot;</div>
                <div><span className="text-[#9ca3af]">&quot;title&quot;:</span> &quot;{currentExp.title}&quot;</div>
                <div><span className="text-[#9ca3af]">&quot;location&quot;:</span> &quot;{currentExp.location}&quot;</div>
                <div><span className="text-[#9ca3af]">&quot;period&quot;:</span> &quot;{currentExp.period}&quot;</div>
                <div><span className="text-[#9ca3af]">&quot;highlights&quot;:</span> [</div>
                {currentExp.highlights.map((h, i) => (
                  <div key={i} className="pl-4 text-[#ef4444]">  {i + 1}. &quot;{h}&quot;,</div>
                ))}
                <div>],</div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-[#9ca3af]">&quot;tech&quot;:</span>
                  {currentExp.tech.map((tech, i) => {
                    const Icon = getTechIcon(tech)
                    return (
                      <span key={i} className="px-2 py-1 rounded bg-[#dc2626]/20 text-[#dc2626] flex items-center gap-1">
                        <Icon size={14} /> {tech}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div className="mt-4 text-[#6b7280]">$ <motion.span className="inline-block w-2 h-4 bg-[#dc2626] ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} /></div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1f2937]">
              <button
                onClick={() => handleExperienceChange((selectedIndex - 1 + experiences.length) % experiences.length)}
                className="px-4 py-2 bg-[#141414] border border-[#1f2937] rounded text-sm text-[#9ca3af] hover:border-[#dc2626] transition-colors"
              >
                ← prev
              </button>
              <div className="flex gap-2">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleExperienceChange(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${selectedIndex === index ? 'bg-[#dc2626]' : 'bg-[#374151]'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => handleExperienceChange((selectedIndex + 1) % experiences.length)}
                className="px-4 py-2 bg-[#141414] border border-[#1f2937] rounded text-sm text-[#9ca3af] hover:border-[#dc2626] transition-colors"
              >
                next →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
