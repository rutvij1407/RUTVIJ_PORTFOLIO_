'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiPhone, FiCopy, FiCheck } from 'react-icons/fi'
import { Reveal, SectionHeading, TiltCard, Magnetic } from './ui'
import { profile } from '@/lib/data'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  const links = [
    { icon: FiLinkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: FiGithub, label: 'GitHub', href: profile.github },
    { icon: FiPhone, label: profile.phone, href: profile.phoneHref },
  ]
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="aurora-blob absolute left-1/2 top-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy-700/25" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <SectionHeading label="Contact" title="Let's build something" accent="with data." />
        <Reveal>
          <TiltCard className="shimmer-border p-8 sm:p-12 !rounded-[36px]">
            <p className="mx-auto max-w-xl text-lg text-burgundy-100/75">
              I'm looking for data analytics and data engineering roles and internships. If you have messy data and a hard question, I'd love to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  <FiMail /> {profile.email}
                </a>
              </Magnetic>
              <button onClick={copy} className="btn-ghost" aria-label="Copy email address">
                <motion.span key={String(copied)} initial={{ scale: 0.5, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} className="flex">
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                </motion.span>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {links.map((l) => (
                <Magnetic key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="liquid inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-cream transition hover:bg-white/10">
                    <l.icon className="text-burgundy-200" /> {l.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  )
}
