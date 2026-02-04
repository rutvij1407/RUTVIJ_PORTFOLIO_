'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaMapMarkerAlt, FaArrowDown } from 'react-icons/fa'

const terminalCode = `/** @type {Portfolio} */
const config = {
  name: "Rutvij Reddy Vakati",
  role: "Data Analytics Engineer",
  education: "MS Data Analytics @ GMU",
  location: "Fairfax, VA",
  status: "Open to Summer 2026 Internships",
  contact: {
    email: "rvakati@gmu.edu",
    phone: "+1 (703) 499-1275",
    linkedin: "linkedin.com/in/vakati-rutvij-reddy",
    github: "github.com/rutvij1407",
  },
  expertise: [
    "Python", "SQL", "R", "Power BI",
    "Tableau", "AWS", "ETL", "Machine Learning"
  ],
  experience: ["Archents", "Pullulate", "NSIC-IARE"],
  projects: [
    "IBM HR Attrition Analysis",
    "Data Viz & BI", "Analytics Chatbot"
  ],
  certifications: ["Microsoft Power BI", "AWS Cloud Practitioner"],
  focus: "Transforming data into insights",
  available: true,
};
export default config;
`

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#000000]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/5 via-transparent to-[#b91c1c]/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#dc2626]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b91c1c]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center gap-8"
            >
              <div className="text-center lg:text-left space-y-4 flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dc2626]/10 border border-[#dc2626]/30"
                >
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <span className="text-[#dc2626] text-sm font-medium">DATA ANALYTICS ENGINEER</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  Transforming{' '}
                  <span className="text-[#dc2626]">raw data</span>
                  <br />
                  into{' '}
                  <span className="text-[#dc2626]">insights.</span>
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl sm:text-2xl text-[#9ca3af]"
                >
                  Rutvij Reddy Vakati
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-[#9ca3af] max-w-xl"
                >
                  MS in Data Analytics @ George Mason University. Building ETL pipelines, interactive dashboards, 
                  and ML solutions that turn complex data into actionable business intelligence.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  <a
                    href="#projects"
                    className="px-6 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg font-medium transition-colors"
                  >
                    View Projects
                  </a>
                  <a
                    href="#experience"
                    className="px-6 py-3 border border-[#dc2626]/50 text-[#dc2626] hover:bg-[#dc2626]/10 rounded-lg font-medium transition-colors"
                  >
                    Experience
                  </a>
                  <a
                    href="/assets/pdf/Rutvij_Resume.pdf"
                    download="Rutvij_Vakati_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-[#22c55e]/50 text-[#22c55e] hover:bg-[#22c55e]/10 rounded-lg font-medium transition-colors"
                  >
                    Download Resume
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-6 text-sm text-[#9ca3af] justify-center lg:justify-start"
                >
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#dc2626]" />
                    Fairfax, VA
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                    Open to Summer 2026 Internships
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="hidden lg:block relative w-full max-w-lg aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#dc2626]/30 group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-2xl blur opacity-30" />
              
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <Image
                  src="/assets/img/rutvij.png"
                  alt="Rutvij Reddy Vakati"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-[#0a0a0a] border border-[#1f2937] rounded-xl overflow-hidden flex flex-col"
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-[#1f2937]">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                  <span className="ml-4 text-[#6b7280] text-sm font-mono">portfolio.config.js</span>
                </div>
                <div className="p-6 font-mono text-sm overflow-auto flex-1">
                  <pre className="text-[#e5e7eb]">{terminalCode}</pre>
                  <motion.span
                    className="inline-block w-2 h-4 bg-[#dc2626] ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <div className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 text-[#6b7280] text-xs pointer-events-none">
                <motion.span animate={{ opacity: isHovered ? 0 : 1 }}>Hover to view terminal</motion.span>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:hidden">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#dc2626]/30 aspect-[3/4]">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-2xl blur opacity-30" />
                <Image
                  src="/assets/img/rutvij.png"
                  alt="Rutvij Reddy Vakati"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                className="bg-[#0a0a0a] border border-[#1f2937] rounded-xl overflow-hidden shadow-2xl ring-1 ring-[#dc2626]/20"
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-[#1f2937]">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                  <span className="ml-4 text-[#6b7280] text-sm font-mono">portfolio.config.js</span>
                </div>
                <div className="p-6 font-mono text-sm overflow-x-auto">
                  <pre className="text-[#e5e7eb]">{terminalCode}</pre>
                  <motion.span
                    className="inline-block w-2 h-4 bg-[#dc2626] ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-[#6b7280] hover:text-[#dc2626] transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs">Scroll</span>
            <FaArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
