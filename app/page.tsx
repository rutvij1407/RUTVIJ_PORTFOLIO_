'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import TopMenuBar from '@/components/TopMenuBar'
import SidebarNav from '@/components/SidebarNav'
import NavXian from '@/components/NavXian'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import KeyDifferentiators from '@/components/KeyDifferentiators'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollUp from '@/components/ScrollUp'

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
