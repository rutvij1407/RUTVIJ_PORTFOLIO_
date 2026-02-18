'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import TopMenuBar from '@/components/layout/TopMenuBar'
import SidebarNav from '@/components/layout/SidebarNav'
import NavXian from '@/components/layout/NavXian'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import KeyDifferentiators from '@/components/sections/KeyDifferentiators'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import ScrollUp from '@/components/ui/ScrollUp'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <main key="content" className="pb-24 md:pb-0 md:pr-24 md:pl-4">
            <TopMenuBar />
            <SidebarNav />
            <NavXian />
            <Hero />
            <About />
            <Experience />
            <KeyDifferentiators />
            <Projects />
            <Skills />
            <Education />
            <Certifications />
            <Contact />
            <Footer />
            <ScrollUp />
          </main>
        )}
      </AnimatePresence>
    </>
  )
}
