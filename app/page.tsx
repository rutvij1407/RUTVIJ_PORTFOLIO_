'use client'

import TopMenuBar from '@/components/TopMenuBar'
import SidebarNav from '@/components/SidebarNav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import NumbersBand from '@/components/NumbersBand'
import Dashboard from '@/components/Dashboard'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SiteBackground from '@/components/SiteBackground'
import { ScrollProgress, CursorGlow } from '@/components/Effects'
import AgentBuild from '@/components/AgentBuild'

export default function Page() {
  return (
    <main className="grain relative">
      <SiteBackground />
      <ScrollProgress />
      <CursorGlow />
      <TopMenuBar />
      <SidebarNav />
      <Hero />
      <About />
      <NumbersBand />
      <Dashboard />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
      <AgentBuild />
    </main>
  )
}
