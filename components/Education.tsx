'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap, FaCertificate, FaMapMarkerAlt } from 'react-icons/fa'

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
              I am pursuing a Master of Science in Data Analytics Engineering at George Mason University, building a strong foundation in statistics, machine learning, big data analytics, and data visualization. My coursework emphasizes both theoretical understanding and practical implementation using real-world datasets. Through academic projects, I have gained experience in end-to-end analytics workflows—from data collection and preprocessing to modeling and presentation. The program has strengthened my ability to think critically about data and communicate insights effectively. I am actively applying these skills to projects, research, and professional opportunities.
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
          >
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-6">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/30 transition-colors flex items-center gap-4"
                >
                  <FaCertificate className="text-[#dc2626] flex-shrink-0" size={24} />
                  <div>
                    <p className="font-medium text-[#f5f5f7]">{cert.name}</p>
                    <p className="text-sm text-[#9ca3af]">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[#6b7280] text-sm mt-4">
              Industry-recognized certifications strengthen my analytical and cloud computing skill set. Microsoft Power BI validates my ability to build interactive dashboards, model data efficiently, and deliver business-ready visual insights. AWS certification demonstrates foundational knowledge of cloud infrastructure, data storage, and scalable analytics solutions. These certifications complement my academic training by bridging theory with industry-relevant tools and platforms, reflecting my commitment to continuous learning and professional growth in data analytics and engineering.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
