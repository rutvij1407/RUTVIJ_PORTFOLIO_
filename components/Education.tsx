'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap, FaCertificate, FaMapMarkerAlt, FaDatabase, FaRocket, FaCloud, FaUsers } from 'react-icons/fa'
import CountUp from './CountUp'

const education = [
  {
    degree: 'Master of Science',
    major: 'Data Analytics Engineering',
    university: 'George Mason University',
    location: 'Fairfax, VA, USA',
    period: 'Aug 2025 – Present',
    status: 'In Progress',
    courses: ['AIT 580 - Analytics: Big Data to Information', 'CS 504 – Principles of Data Management', 'STAT 515 – Applied Statistics and Visualization'],
  },
  {
    degree: 'B.Tech',
    major: 'Computer Science and Engineering',
    university: 'Institute of Aeronautical Engineering (IARE)',
    location: 'Hyderabad, India',
    period: 'Graduated 2025',
    status: 'Completed',
    courses: [],
  },
]

const certifications = [
  { name: 'Microsoft Power BI Certification', issuer: 'Microsoft' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services' },
]

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Education & <span className="text-[#dc2626]">Certifications</span>
          </h2>
        </motion.div>

        <p className="text-[#9ca3af] max-w-2xl mx-auto text-center mb-16">
          Academic background in data analytics and computer science, with industry-recognized certifications
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-2 mb-8"
          >
            <p className="text-[#d1d5db] leading-relaxed max-w-4xl mx-auto text-center">
              I am pursuing a Master of Science in Data Analytics Engineering at George Mason University, building a strong foundation in statistics, machine learning, big data analytics, and data visualization. My coursework emphasizes both theoretical understanding and practical implementation using real-world datasets. Through academic projects, I have gained experience in end-to-end analytics workflows, from data collection and preprocessing to modeling and presentation. The program has strengthened my ability to think critically about data and communicate insights effectively. I am actively applying these skills to projects, research, and professional opportunities.
            </p>
          </motion.div>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#dc2626]/10">
                  <FaGraduationCap className="text-[#dc2626]" size={28} />
                </div>
                <div>
                  <span className="inline-block px-2 py-1 rounded bg-[#22c55e]/20 text-[#22c55e] text-xs mb-2">
                    {edu.status}
                  </span>
                  <h3 className="text-xl font-semibold text-[#f5f5f7]">
                    {edu.degree} in {edu.major}
                  </h3>
                  <p className="text-[#dc2626] font-medium mt-1">{edu.university}</p>
                  <p className="text-[#9ca3af] text-sm mt-1 flex items-center gap-1">
                    <FaMapMarkerAlt size={14} /> {edu.location} • {edu.period}
                  </p>
                  <p className="text-[#9ca3af] text-sm mt-4">Relevant Coursework:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {edu.courses.length > 0 && edu.courses.map((course, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-[#dc2626]/10 text-[#dc2626] text-sm border border-[#dc2626]/20"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-2"
          >
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-semibold text-[#f5f5f7] mb-8"
            >
              Certifications
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="p-5 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/40 transition-colors flex items-center gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 + i * 0.1 }}
                      className="w-12 h-12 rounded-xl bg-[#dc2626]/10 flex items-center justify-center flex-shrink-0"
                    >
                      <FaCertificate className="text-[#dc2626]" size={24} />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-[#f5f5f7]">{cert.name}</p>
                      <p className="text-sm text-[#9ca3af]">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-[#9ca3af] text-sm leading-relaxed"
                >
                  Industry-recognized certifications strengthen my analytical and cloud computing skill set. Microsoft Power BI validates my ability to build interactive dashboards, model data efficiently, and deliver business-ready visual insights. AWS certification demonstrates foundational knowledge of cloud infrastructure, data storage, and scalable analytics solutions.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: FaDatabase, value: 100, suffix: 'K+', label: 'Records Analyzed' },
                  { icon: FaRocket, value: 5, suffix: '+', label: 'Projects Completed' },
                  { icon: FaCloud, value: 0, suffix: 'AWS', label: 'Cloud Certified', isText: true },
                  { icon: FaUsers, value: 5, suffix: '', label: 'Team Members Mentored' },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.35 + i * 0.1, type: 'spring', stiffness: 100 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/50 transition-colors flex flex-col items-center text-center"
                    >
                      <motion.div
                        initial={{ rotate: -10, opacity: 0 }}
                        animate={isInView ? { rotate: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.45 + i * 0.1 }}
                        className="w-12 h-12 rounded-xl bg-[#dc2626]/10 flex items-center justify-center mb-3"
                      >
                        <Icon className="text-[#dc2626]" size={24} />
                      </motion.div>
                      <p className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] mb-1">
                        {stat.isText ? (
                          stat.suffix
                        ) : (
                          <>
                            <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                          </>
                        )}
                      </p>
                      <p className="text-[#9ca3af] text-sm">{stat.label}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
