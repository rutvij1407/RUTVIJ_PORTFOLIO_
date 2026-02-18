'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaBolt, FaChartLine, FaCogs, FaHandshake, FaRocket, FaLightbulb } from 'react-icons/fa'
import CountUp from '@/components/ui/CountUp'

const items = [
  {
    icon: FaBolt,
    title: 'Automation First',
    descBefore: 'Cut manual effort by ',
    countUp: { end: 35, suffix: '%' },
    descAfter: ' with Excel, Power BI, and Python pipelines. Focus on impact, not repetitive tasks.',
    size: 'large',
  },
  {
    icon: FaChartLine,
    title: 'Data to Decisions',
    descBefore: '',
    countUp: { end: 100, suffix: 'K+' },
    descAfter: ' records analyzed. SQL, Power BI, and Tableau for clear insights stakeholders can act on.',
    size: 'medium',
  },
  {
    icon: FaCogs,
    title: 'End-to-End Pipelines',
    desc: 'ETL, AWS RDS, real-time dashboards. From raw data to production-ready analytics.',
    size: 'medium',
  },
  {
    icon: FaHandshake,
    title: 'Mentorship & Playbooks',
    descBefore: '',
    countUp: { end: 20, suffix: '%' },
    descAfter: ' better data accuracy through mentoring. Self-service analytics playbooks for teams.',
    size: 'large',
  },
  {
    icon: FaRocket,
    title: 'Cloud-Native',
    desc: 'AWS EC2, RDS, S3. Docker, CI/CD, GitHub Actions for scalable analytics workloads.',
    size: 'medium',
  },
  {
    icon: FaLightbulb,
    title: 'Business Impact',
    desc: 'Translate technical outputs into clear KPIs and actionable recommendations.',
    size: 'medium',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
}

export default function KeyDifferentiators() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="differentiators" className="py-24 bg-[#020202] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(220,38,38,0.08),transparent)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#dc2626]/15 text-[#dc2626] text-sm font-medium mb-6 border border-[#dc2626]/25">
            What Drives Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Signature <span className="text-[#dc2626]">Strengths</span>
          </h2>
          <p className="text-[#9ca3af] max-w-xl mx-auto text-lg">
            Differentiators that deliver measurable outcomes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {items.map((item, index) => {
            const Icon = item.icon
            const isLarge = item.size === 'large'
            return (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#dc2626]/40 transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.15)] ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="p-6 sm:p-8 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#dc2626]/10 flex items-center justify-center mb-5 group-hover:bg-[#dc2626]/20 transition-colors">
                    <Icon className="text-[#dc2626] w-7 h-7" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f5f5f7] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed flex-1">
                    {item.desc ? (
                      item.desc
                    ) : (
                      <>
                        {item.descBefore}
                        <CountUp end={item.countUp!.end} duration={2} suffix={item.countUp!.suffix} />
                        {item.descAfter}
                      </>
                    )}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
