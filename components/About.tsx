'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaCloud, FaDatabase, FaRocket, FaChartBar, FaUsers } from 'react-icons/fa'
import CountUp from './CountUp'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { label: 'Records Analyzed', value: 100, suffix: 'K+', icon: FaDatabase },
    { label: 'Projects Completed', value: 5, suffix: '+', icon: FaRocket },
    { label: 'Cloud Certified', value: 0, suffix: 'AWS', icon: FaCloud, isText: true },
    { label: 'Team Members Mentored', value: 5, suffix: '', icon: FaUsers },
  ]

  const services = [
    { title: 'Data Engineering', desc: 'ETL pipelines with Python (Pandas) and SQL; data modeling, cleaning, and automation', icon: FaCode, color: '#dc2626' },
    { title: 'Business Intelligence', desc: 'Power BI, Tableau, and Excel dashboards; pivot tables, Power Query, KPI tracking', icon: FaChartBar, color: '#ef4444' },
    { title: 'Cloud Analytics', desc: 'AWS EC2, RDS, S3; Docker, Linux, Git, GitHub Actions for analytics workloads', icon: FaCloud, color: '#f59e0b' },
    { title: 'Team Leadership', desc: 'Peer mentoring in data literacy; playbooks for self-service analytics; Agile/Scrum', icon: FaUsers, color: '#22c55e' },
  ]

  const highlights = [
    { before: 'Automated recurring reports with Excel/Power BI, cutting manual effort by ', countUp: { end: 35, suffix: '%' }, after: '' },
    { before: 'Mentored team members on data quality standards, improving data accuracy by ', countUp: { end: 20, suffix: '%' }, after: '' },
    { before: 'Built ETL pipelines and real-time dashboards on AWS RDS for KPIs and engagement', countUp: null },
    { before: 'Analyzed ', countUp: { end: 100, suffix: 'K+' }, after: ' records to uncover sales and performance trends with SQL and Power BI' },
  ]

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="text-[#dc2626]">Me</span>
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto">
            Data-driven professional turning complex datasets into actionable business insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
          className="mb-16"
        >
          <p className="text-[#d1d5db] text-lg leading-relaxed max-w-4xl mx-auto text-center">
            I am a graduate student in Data Analytics Engineering at George Mason University with over two years 
            of hands-on experience building data solutions that drive measurable business outcomes. At Archents India, 
            I analyzed <CountUp end={100} suffix="K+" duration={2} className="text-[#dc2626] font-semibold" /> records using SQL and Power BI to uncover sales trends, and automated recurring reports 
            to cut manual effort by <CountUp end={35} suffix="%" duration={2} className="text-[#dc2626] font-semibold" />. As Founder & Data Lead at Pullulate, I designed real-time dashboards on AWS RDS, 
            built ETL pipelines with Python and SQL, and mentored team members, improving data accuracy by <CountUp end={20} suffix="%" duration={2} className="text-[#dc2626] font-semibold" />. 
            I combine technical depth in Python, SQL, and cloud platforms with a knack for translating complex data 
            into clear, actionable insights for stakeholders. I am actively seeking Summer <CountUp end={2026} duration={2} className="text-[#dc2626] font-semibold" /> internship opportunities 
            in Data Analytics and Data Engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/50 transition-colors"
              >
                <Icon className="text-[#dc2626] mb-3" size={28} />
                <p className="text-2xl font-bold text-[#f5f5f7]">
                  {stat.isText ? stat.suffix : <CountUp end={stat.value} duration={2} suffix={stat.suffix} />}
                </p>
                <p className="text-[#9ca3af] text-sm">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold mb-8 text-center text-[#f5f5f7]">What I Can Provide</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/30 transition-colors"
                >
                  <Icon className="text-[#dc2626] mb-3" size={32} />
                  <h4 className="font-semibold text-[#f5f5f7] mb-2">{service.title}</h4>
                  <p className="text-[#9ca3af] text-sm">{service.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {highlights.map((highlight, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-lg bg-[#dc2626]/10 border border-[#dc2626]/30 text-[#dc2626] text-sm"
            >
              ▹ {highlight.countUp ? (
                <>
                  {highlight.before}
                  <CountUp end={highlight.countUp.end} suffix={highlight.countUp.suffix} duration={2} className="font-semibold" />
                  {highlight.after}
                </>
              ) : (
                highlight.before
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
