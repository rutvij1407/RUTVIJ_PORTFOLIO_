'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const projects = [
  {
    title: 'GitHub Pages Output Automation (Mid-Project-CS504)',
    description: 'Automated deployment workflows for project documentation and dashboards using GitHub Actions and static build pipelines. Generated build outputs and analytical visualizations for portfolio and data-centric repositories.',
    skills: ['skills-github.svg', 'skills-bi.svg', 'skills-tableau.svg'],
    link: 'https://rutvij1407.github.io/rtuvij1407.github.io-output/',
    github: 'https://github.com/rutvij1407/rtuvij1407.github.io-output',
    image: 'projects-1.jpg',
  },
  {
    title: 'Data Visualization Automation – CS504 Group 6',
    description: 'Collaborated on a Python pipeline to automate academic data visualization and trend reporting. Implemented backend models and APIs to generate interactive dashboards for student performance and course insights.',
    skills: ['skills-python.svg', 'skills-bi.svg', 'skills-tableau.svg'],
    link: null,
    github: null,
    image: 'projects-2.jpg',
  },
  {
    title: 'NFTGENIX – Decentralized NFT Analytics Platform',
    description: 'Designed an NFT analytics dashboard using Python and Power BI to visualize NFT sales, trends, and ownership patterns. Integrated blockchain APIs to collect and analyze real-time NFT metadata and transaction statistics.',
    skills: ['skills-html.svg', 'skills-css.svg', 'skills-javascript.svg'],
    link: 'https://rutvij1407.github.io/NFTGENIX/',
    github: 'https://github.com/rutvij1407/NFTGENIX',
    image: 'projects-3.jpg',
  },
  {
    title: 'DataSense AI',
    description: 'Interactive chatbot enabling natural language data queries with automated Plotly visualizations and exportable insights. Built with Streamlit and Claude API.',
    skills: ['skills-python.svg', 'skills-github.svg'],
    link: null,
    github: null,
    image: 'projects-4.jpg',
  },
  {
    title: 'HR Employee Attrition Analysis',
    description: 'Comprehensive analysis of 1,470 employee records using multiple ML models to predict attrition with 85% accuracy. Identified key drivers: overtime, satisfaction, work-life balance.',
    skills: ['skills-python.svg', 'skills-bi.svg'],
    link: null,
    github: null,
    image: 'projects-5.jpg',
  },
]

export default function ProjectsXian() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-16 md:py-24" ref={ref}>
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">RECENT PROJECTS</h2>
      <div className="max-w-[1168px] mx-auto px-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#0f0f0f] p-6 rounded-3xl border border-[#1f2937] hover:border-[#3b82f6]/30 transition-colors"
          >
            <a
              href={project.link || project.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl mb-6"
            >
              <Image
                src={`/assets/img/${project.image}`}
                alt={project.title}
                width={400}
                height={220}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-400"
              />
            </a>
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-[#9ca3af] text-sm mb-4 text-justify">{project.description}</p>
            <div className="flex items-center gap-3 py-2 px-4 rounded-full bg-[#374151] w-max mb-4">
              {project.skills.map((skill, i) => (
                <Image key={i} src={`/assets/img/${skill}`} alt="" width={16} height={16} className="w-4 h-4 hover:-translate-y-0.5 transition-transform" />
              ))}
            </div>
            {(project.link || project.github) && (
              <a
                href={project.link || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#9ca3af] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                <span>Visit Project</span>
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
