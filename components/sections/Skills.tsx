'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCode, FaDatabase, FaChartBar, FaCloud, FaCogs, FaProjectDiagram, FaBroom, FaCube, FaRobot, FaTasks } from 'react-icons/fa'
import { SiPython, SiMysql, SiPostgresql, SiAmazon, SiTableau, SiDocker, SiLinux, SiGit, SiGithubactions } from 'react-icons/si'

const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase()
  if (s.includes('python')) return SiPython
  if (s.includes('ssms')) return FaDatabase
  if (s.includes('sql')) return FaDatabase
  if (s === 'r' || s.startsWith('r ')) return FaCode
  if (s.includes('mysql')) return SiMysql
  if (s.includes('postgresql')) return SiPostgresql
  if (s.includes('aws') || s.includes('rds')) return SiAmazon
  if (s.includes('power bi') || s.includes('excel')) return FaChartBar
  if (s.includes('tableau')) return SiTableau
  if (s.includes('docker')) return SiDocker
  if (s.includes('linux')) return SiLinux
  if (s.includes('git')) return SiGit
  if (s.includes('github')) return SiGithubactions
  if (s.includes('agile') || s.includes('scrum')) return FaTasks
  if (s.includes('sdlc')) return FaProjectDiagram
  if (s.includes('uipath')) return FaRobot
  if (s.includes('etl') || s.includes('pipeline')) return FaCogs
  if (s.includes('cleaning')) return FaBroom
  if (s.includes('modeling')) return FaCube
  if (s.includes('automation')) return FaRobot
  return FaCode
}

const categoryIcons: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  'Programming': FaCode,
  'Databases': FaDatabase,
  'Visualization & Excel': FaChartBar,
  'Cloud & DevOps': FaCloud,
  'Methods & RPA': FaProjectDiagram,
  'Data Engineering': FaCogs,
}

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
          {skillCategories.map((category, index) => {
            const CategoryIcon = categoryIcons[category.title] || FaCode
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/30 transition-colors group"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.05 + 0.1 }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-[#dc2626]/10 flex items-center justify-center mb-4 group-hover:bg-[#dc2626]/20 transition-colors"
                >
                  <CategoryIcon className="text-[#dc2626] w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-semibold text-[#dc2626] mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => {
                    const SkillIcon = getSkillIcon(skill)
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.05 + i * 0.03 }}
                        whileHover={{ scale: 1.05, x: 2 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dc2626]/10 text-[#e5e7eb] text-sm border border-[#dc2626]/20 hover:border-[#dc2626]/40 transition-colors"
                      >
                        <SkillIcon className="text-[#dc2626] w-4 h-4 flex-shrink-0" />
                        {skill}
                      </motion.span>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
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
