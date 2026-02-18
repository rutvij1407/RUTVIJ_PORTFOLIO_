'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const skills = [
  'skills-html.svg', 'skills-css.svg', 'skills-javascript.svg', 'skills-react.svg',
  'skills-github.svg', 'skills-excel.svg', 'skills-mysql.svg', 'skills-python.svg',
  'skills-tableau.svg', 'skills-bi.svg',
]

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="home" className="home section pt-24 pb-16" ref={ref}>
      <div className="max-w-[1168px] mx-auto px-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-[280px_1fr_280px] xl:grid-rows-[auto_1fr] xl:items-stretch">
        {/* PERFIL - Large center card with profile image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="perfil-card rounded-3xl p-4 md:p-8 min-h-[400px] md:min-h-[550px] flex flex-col justify-end relative overflow-hidden md:col-span-2 md:max-w-[560px] md:mx-auto xl:col-start-2 xl:col-span-1 xl:row-span-2 xl:max-w-none xl:mx-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/20 via-[#3b82f6]/5 to-transparent rounded-3xl" />
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            <Image
              src="/assets/img/rutvij.png"
              alt="Rutvij Reddy Vakati"
              width={250}
              height={300}
              className="w-[230px] md:w-[450px] max-w-full object-contain object-bottom"
            />
          </div>
          <div className="relative z-10 mt-auto bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h1 className="text-3xl md:text-5xl font-medium mb-4" style={{ fontFamily: 'cursive' }}>
              Rutvij Reddy Vakati
            </h1>
            <div className="grid grid-cols-2 gap-2">
              <a href="#projects" className="py-3 rounded-full bg-[#3b82f6] text-white text-center font-semibold hover:bg-[#2563eb] transition-colors">
                Projects
              </a>
              <a href="#services" className="py-3 rounded-full bg-[#374151] text-white text-center font-semibold hover:bg-[#4b5563] transition-colors">
                Expertise
              </a>
            </div>
          </div>
        </motion.div>

        {/* INFO - Top left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="info-card bg-[#0f0f0f] p-6 rounded-3xl border border-[#1f2937] xl:col-start-1 xl:row-start-1"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#3b82f6]" />
            <h2 className="text-xl font-medium" style={{ fontFamily: 'cursive' }}>Rutvij Vakati</h2>
          </div>
          <div className="bg-gradient-to-b from-[#3b82f6]/20 to-transparent h-44 rounded-2xl flex items-end justify-center overflow-hidden mb-6">
            <Image
              src="/assets/img/rutvij_3.png"
              alt="Rutvij"
              width={140}
              height={180}
              className="w-[120px] md:w-[140px] object-contain object-bottom"
            />
          </div>
          <p className="text-sm text-[#9ca3af] mb-6">
            Passionate about data analytics, leveraging Python, SQL, Power BI, and Tableau for insights.
          </p>
          <a
            href="/assets/pdf/Xian-Cv.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-full bg-[#374151] text-white text-center font-semibold hover:bg-[#4b5563] transition-colors"
          >
            Download CV
          </a>
        </motion.div>

        {/* ABOUT - Top right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-card bg-[#0f0f0f] p-6 rounded-3xl border border-[#1f2937] xl:col-start-3 xl:row-span-2"
        >
          <h3 className="text-base font-normal mb-4">
            Rutvij Vakati - <b className="text-[#3b82f6]">Data Analytics Engineer</b>
          </h3>
          <p className="text-sm text-[#9ca3af] mb-6">
            MS in Data Analytics @ George Mason University. Building ETL pipelines, dashboards, and ML solutions that turn data into actionable insights.
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://linkedin.com/in/vakati-rutvij-1167rutvij" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white text-[#1f2937] flex items-center justify-center hover:bg-[#3b82f6] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/rutvij1407" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white text-[#1f2937] flex items-center justify-center hover:bg-[#3b82f6] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
          <div className="bg-gradient-to-b from-[#3b82f6]/20 to-transparent h-44 rounded-2xl flex items-end justify-center overflow-hidden mb-6">
            <Image
              src="/assets/img/rutvij_3.png"
              alt="Rutvij"
              width={180}
              height={210}
              className="w-[180px] md:w-[210px] object-contain object-bottom -translate-y-4"
            />
          </div>
          <p className="text-sm text-[#9ca3af] mb-6">
            I respond on social media, but email is the best way to reach me efficiently.
          </p>
          <a href="#contact" className="block w-full py-3 rounded-full bg-[#3b82f6] text-white text-center font-semibold hover:bg-[#2563eb] transition-colors">
            Contact Me
          </a>
        </motion.div>

        {/* SKILLS - Bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="skills-card bg-[#0f0f0f] p-6 rounded-3xl border border-[#1f2937] xl:col-start-1 xl:row-start-2"
        >
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-6 mb-6">
            {skills.map((skill, i) => (
              <Image
                key={i}
                src={`/assets/img/${skill}`}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 hover:-translate-y-1 transition-transform"
              />
            ))}
          </div>
          <p className="text-sm text-[#9ca3af]">
            Visit the projects section to see the work done with these technologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
