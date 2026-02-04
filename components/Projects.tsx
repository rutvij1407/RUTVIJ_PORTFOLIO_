'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaFolderOpen } from 'react-icons/fa'

const projects = [
  {
    title: 'IBM HR Employee Attrition Analysis',
    subtitle: 'STAT-515 Final Project | R, Machine Learning',
    description: 'Analysis of employee attrition patterns using the IBM HR Analytics dataset. Applied logistic regression, decision trees, random forests, and gradient boosting to predict attrition risk. EDA, feature engineering, model evaluation with ROC curves and cross-validation. Interactive Quarto-based analytical report with business interpretations.',
    highlights: ['EDA, feature engineering, ROC & cross-validation', 'Logistic regression, decision trees, random forests, gradient boosting', 'Interactive Quarto report'],
    tech: ['R', 'Machine Learning', 'Statistics', 'Quarto', 'ggplot2'],
    link: 'https://rutvij1407.github.io/rtuvij1407.github.io-output/',
    github: 'https://github.com/rutvij1407',
  },
  {
    title: 'GitHub Pages Output Automation',
    subtitle: 'STAT-515 Mid-Project | R, Data Visualization',
    description: 'CI/CD pipeline automating documentation and dashboard builds via GitHub Actions. Generates analytics-ready outputs for R visualization repositories. Reduces manual deployment steps and ensures consistent, reproducible builds for academic and professional projects.',
    highlights: ['GitHub Actions CI/CD workflow', 'Automated documentation generation', 'R visualization pipelines'],
    tech: ['R', 'GitHub Actions', 'CI/CD', 'Automation'],
    link: 'https://rutvij1407.github.io/rtuvij1407.github.io-output/',
    github: 'https://github.com/rutvij1407/rtuvij1407.github.io-output',
  },
  {
    title: 'Data Visualization & Business Intelligence',
    subtitle: 'Power BI, Tableau, Python',
    description: 'Design of clear, insightful data visualizations using Power BI, Tableau, and Python. Cleaned datasets, defined KPIs, and built interactive dashboards. Storytelling through data for stakeholders to identify trends, anomalies, and performance gaps.',
    highlights: ['Power BI, Tableau, Python dashboards', 'KPI definition and storytelling', 'Usability for non-technical stakeholders'],
    tech: ['Power BI', 'Tableau', 'Python', 'Data Visualization'],
    link: 'https://rutvij1407.github.io/rtuvij1407.github.io-output/',
    github: 'https://github.com/rutvij1407/rtuvij1407.github.io-output',
  },
  {
    title: 'Data Visualization Automation',
    subtitle: 'CS-504 Group 6 | Python',
    description: 'Python pipeline with REST APIs to automate academic data visualization. End-to-end solution for generating interactive performance dashboards from raw data. Streamlines reporting for educational institutions.',
    highlights: ['REST API integration', 'Automated data processing', 'Interactive dashboards'],
    tech: ['Python', 'Flask', 'REST APIs', 'Plotly'],
    link: null,
    github: 'https://github.com/rutvij1407',
  },
  {
    title: 'DataSense AI – Analytics Chatbot',
    subtitle: 'Natural Language Analytics | Python, LLM',
    description: 'Interactive chatbot enabling natural language data queries with automated visualizations and exportable insights. Users can ask questions in plain English and receive automated Plotly charts and structured data summaries. Built for data exploration and self-service analytics.',
    highlights: ['Natural language data queries', 'Automated Plotly visualization generation', 'Exportable insights and summaries'],
    tech: ['Python', 'Streamlit', 'Claude API', 'Plotly'],
    link: null,
    github: 'https://github.com/rutvij1407',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 bg-[#050505] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="text-[#dc2626]">Projects</span>
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto">
            Academic and personal projects—machine learning, automation, visualization, and full-stack development
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className="group p-6 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  className="p-3 rounded-lg bg-[#dc2626]/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <FaFolderOpen className="text-[#dc2626]" size={28} />
                </motion.div>
                <div className="flex gap-2">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-[#9ca3af] hover:text-[#dc2626] hover:bg-[#dc2626]/10 transition-colors"
                      aria-label="GitHub"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  )}
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-[#9ca3af] hover:text-[#dc2626] hover:bg-[#dc2626]/10 transition-colors"
                      aria-label="View live"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#f5f5f7] mb-1 group-hover:text-[#dc2626] transition-colors">{project.title}</h3>
              <p className="text-sm text-[#dc2626] mb-3">{project.subtitle}</p>
              <p className="text-sm text-[#d1d5db] mb-4 line-clamp-3">{project.description}</p>
              <ul className="space-y-2 mb-4">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-[#9ca3af] flex items-start gap-2">
                    <span className="text-[#dc2626] mt-0.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-[#dc2626]/10 text-[#e5e7eb] text-xs border border-[#dc2626]/20"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(220, 38, 38, 0.4)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
