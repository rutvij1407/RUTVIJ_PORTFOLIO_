'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaFolderOpen } from 'react-icons/fa'

type Project = {
  title: string
  subtitle: string
  description: string
  highlights: string[]
  tech: string[]
  link: string
  github: string
  images: [string, string]
  category: 'Apps' | 'Analytics' | 'Course'
}

const projects: Project[] = [
  {
    title: 'TalentScope',
    images: ['/assets/img/projects/talentscope-1.jpg', '/assets/img/projects/talentscope-2.jpg'],
    subtitle: 'Job market intelligence | React, Vite, MapLibre',
    description: 'Interactive dashboard built from 206,292 real US data job postings from 2023: skills in demand, salaries, hiring cities, and a state map you can filter by role. It also includes a resume skill check for international students.',
    highlights: ['State map with postings and salary views, role filter and city hotspots', 'Salary estimator from role, seniority and city medians', 'Resume skill check against the skills real postings ask for'],
    tech: ['React', 'Recharts', 'MapLibre', 'Python', 'pandas'],
    link: 'https://talentscope-chi.vercel.app',
    github: 'https://github.com/rutvij1407/Talentscope',
    category: 'Apps',
  },
  {
    title: 'CapitalEdge',
    images: ['/assets/img/projects/capitaledge-1.jpg', '/assets/img/projects/capitaledge-2.jpg'],
    subtitle: 'DMV housing analytics | Python, Dash, scikit-learn',
    description: 'Dashboard for the Washington DC metro housing market that combines home values, income and crime across 191 ZIP codes, with findings stated plainly in the README.',
    highlights: ['191 ZIP codes with price to income affordability', 'Model results reported honestly, including limits', 'Deployed on Vercel from the repo'],
    tech: ['Python', 'Dash', 'Plotly', 'scikit-learn'],
    link: 'https://capitaledge-one.vercel.app',
    github: 'https://github.com/rutvij1407/CapitalEdge',
    category: 'Apps',
  },
  {
    title: 'DataSense',
    images: ['/assets/img/projects/datasense-1.jpg', '/assets/img/projects/datasense-2.jpg'],
    subtitle: 'Natural language analytics | Next.js, Claude API',
    description: 'Chat with a dataset in plain English and get charts and summaries back. The public site runs a recorded demo so it costs nothing and never calls a live model; the code supports live AI with your own key.',
    highlights: ['Recorded demo with charts, no API key needed', 'Server side switch that blocks live AI in the public deployment', 'Plotly style charts from structured answers'],
    tech: ['Next.js', 'TypeScript', 'Claude API', 'Recharts'],
    link: 'https://data-sense-chatbot.vercel.app',
    github: 'https://github.com/rutvij1407/Data_Sense_AI_Chatbot',
    category: 'Apps',
  },
  {
    title: 'Solaris',
    images: ['/assets/img/projects/solaris-1.jpg', '/assets/img/projects/solaris-2.jpg'],
    subtitle: 'Live globe | Next.js, MapLibre, open flight data',
    description: 'A 3D globe with live aircraft from open ADS-B feeds and place search, plus a native macOS companion app written in Swift. The web version needs no API keys.',
    highlights: ['Live aircraft positions from OpenSky and adsb.lol', 'Satellite imagery globe with place search', 'Native SwiftUI macOS app in a separate repo'],
    tech: ['Next.js', 'MapLibre GL', 'Swift', 'SwiftUI'],
    link: 'https://solaris-web-ten.vercel.app',
    github: 'https://github.com/rutvij1407/Solaris',
    category: 'Apps',
  },
  {
    title: 'Pulse',
    images: ['/assets/img/projects/pulse-1.jpg', '/assets/img/projects/pulse-2.jpg'],
    subtitle: 'Streaming music analytics | Python, NLP, Tableau',
    description: 'Data pipeline that pulls Spotify and YouTube data, runs sentiment analysis on listener comments, and surfaces trends through dashboards.',
    highlights: ['Spotify and YouTube ETL pipeline', 'VADER and TextBlob sentiment analysis', 'Interactive dashboards'],
    tech: ['Python', 'pandas', 'NLP', 'Tableau'],
    link: 'https://pulse-amber-kappa.vercel.app',
    github: 'https://github.com/rutvij1407/pulse',
    category: 'Analytics',
  },
  {
    title: 'IBM HR Employee Attrition',
    images: ['/assets/img/projects/hr-1.jpg', '/assets/img/projects/hr-2.jpg'],
    subtitle: 'STAT 515 final project | R, machine learning',
    description: 'Predicting employee attrition on the IBM HR dataset with logistic regression, LASSO, decision trees and random forests, reported in a Quarto site with 17 figures.',
    highlights: ['LASSO performed best (AUC 0.803) against random forest (0.672)', 'Feature engineering, ROC curves, cross validation', 'Business interpretation of each model'],
    tech: ['R', 'Quarto', 'caret', 'glmnet'],
    link: 'https://rutvij1407.github.io/Final_STAT-515_HR-Attrition-Project/',
    github: 'https://github.com/rutvij1407/Final_STAT-515_HR-Attrition-Project',
    category: 'Analytics',
  },
  {
    title: 'Redesigning EU Unemployment Charts',
    images: ['/assets/img/projects/stat515-1.jpg', '/assets/img/projects/stat515-2.jpg'],
    subtitle: 'STAT 515 midterm | R, ggplot2',
    description: 'A critique of an Eurostat unemployment chart and two redesigns that put comparison first: a ranked country bar chart and long term small multiples.',
    highlights: ['Original chart critique', 'Ranked bar chart for 2024', 'Small multiples for long term unemployment'],
    tech: ['R', 'ggplot2', 'Data visualization'],
    link: 'https://rutvij1407.github.io/Mid_STAT-515_Visualizations-project-output/',
    github: 'https://github.com/rutvij1407/Mid_STAT-515_Visualizations-project-output',
    category: 'Course',
  },
  {
    title: 'Healthcare Claims in SQL',
    images: ['/assets/img/projects/hi671-1.jpg', '/assets/img/projects/hi671-2.jpg'],
    subtitle: 'HI 671 Query 2 | SQL, DuckDB',
    description: 'Maps ICD9 codes to clinical categories, builds a diabetes cohort, and answers questions on cost, gender and data quality. Results are shown for a synthetic dataset, so no patient data is exposed.',
    highlights: ['ICD9 to CCS mapping and cohort exclusion', 'Average cost per diagnosis and prevalence by gender', 'Audit that finds seven planted code errors'],
    tech: ['SQL', 'DuckDB', 'Python'],
    link: 'https://hi671-query-results.vercel.app',
    github: 'https://github.com/rutvij1407/hi-671',
    category: 'Course',
  },
  {
    title: 'Flight Delay Prediction',
    images: ['/assets/img/projects/flightdelay-1.jpg', '/assets/img/projects/flightdelay-2.jpg'],
    subtitle: 'AIT 614 team project | PySpark, Spark MLlib',
    description: 'Delay and cancellation models trained on 538K US flights, with a dashboard that presents the results. Built as a team project for a big data course.',
    highlights: ['Spark pipeline over 538K flights', 'Delay and cancellation prediction models', 'Results dashboard on Vercel'],
    tech: ['PySpark', 'Spark MLlib', 'Python'],
    link: 'https://ait614-flight-delay-dashboard.vercel.app',
    github: 'https://github.com/rutvij1407/AIT-614-final-project',
    category: 'Course',
  },
]

const FILTERS = ['All', 'Apps', 'Analytics', 'Course'] as const

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
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

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
            Live apps and analysis projects. Every project has two screenshots, a link to the live website and a link to the code.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Project filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                filter === f ? 'bg-[#dc2626] border-[#dc2626] text-white' : 'border-[#1f2937] text-[#9ca3af] hover:text-white hover:border-[#dc2626]/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          key={filter}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {shown.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              className="group rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/40 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="grid grid-cols-2 border-b border-[#1f2937] bg-[#111]">
                {project.images.map((src, i) => (
                  <a key={src} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} website`} className={`block aspect-[4/3] overflow-hidden ${i === 0 ? 'border-r border-[#1f2937]' : ''}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]" />
                  </a>
                ))}
              </div>
              <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-[#f5f5f7] mb-1 group-hover:text-[#dc2626] transition-colors">{project.title}</h3>
              <p className="text-sm text-[#dc2626] mb-3">{project.subtitle}</p>
              <p className="text-sm text-[#d1d5db] mb-4">{project.description}</p>
              <ul className="space-y-2 mb-4">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-[#9ca3af] flex items-start gap-2">
                    <span className="text-[#dc2626] mt-0.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-5">
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
              <div className="mt-auto flex gap-3 pt-1">
                                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-medium transition-colors">
                    Website
                  </a>

                <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-[#1f2937] hover:border-[#dc2626]/50 text-[#d1d5db] text-sm transition-colors">
                  GitHub
                </a>
              </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
