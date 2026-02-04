'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
  { title: 'Programming', skills: ['Python (Pandas, NumPy)', 'SQL', 'R'] },
  { title: 'Databases', skills: ['MySQL', 'PostgreSQL', 'AWS RDS', 'SSMS'] },
  { title: 'Visualization & Excel', skills: ['Power BI', 'Tableau', 'Excel (Pivot Tables, Power Query, dashboards)'] },
  { title: 'Cloud & DevOps', skills: ['AWS (EC2, RDS, S3)', 'Docker', 'Linux', 'Git', 'GitHub Actions'] },
  { title: 'Methods & RPA', skills: ['Agile (Scrum)', 'SDLC', 'UiPath workflow automation'] },
  { title: 'Data Engineering', skills: ['ETL pipelines', 'Data cleaning', 'Data modeling', 'Automation'] },
]

const softSkills = ['Problem solving', 'Collaboration', 'Communication', 'Attention to detail', 'Peer mentoring in data literacy and self-service analytics']

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 bg-[#050505] relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className="text-[#dc2626]">Skills</span>
          </h2>
          <p className="text-[#9ca3af]">Technologies and tools I work with</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-[#dc2626] mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#dc2626]/10 text-[#e5e7eb] text-sm border border-[#dc2626]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-semibold text-[#f5f5f7] mb-6 text-center">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg bg-[#dc2626]/10 text-[#9ca3af] text-sm border border-[#dc2626]/20 hover:border-[#dc2626]/50 hover:text-[#dc2626] transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
