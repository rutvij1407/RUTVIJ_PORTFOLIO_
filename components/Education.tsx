'use client'

import { FiBookOpen } from 'react-icons/fi'
import { Reveal, SectionHeading, TiltCard } from './ui'
import { Ring } from './charts'
import { education } from '@/lib/data'

export default function Education() {
  return (
    <section id="education" className="relative py-16">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10">
        <SectionHeading label="Education" title="Where I" accent="learned." />
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.1}>
              <TiltCard className="h-full p-7 !rounded-[28px]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <FiBookOpen className="text-2xl text-burgundy-200" />
                    <h3 className="mt-3 font-display text-xl font-semibold text-cream">{e.school}</h3>
                    <p className="mt-1 text-sm text-burgundy-100/75">{e.degree}</p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-burgundy-300">
                      {e.period} · {e.location}
                    </p>
                  </div>
                  {e.detail.startsWith('GPA') && <Ring value={(3.45 / 4) * 100} size={84} label="3.45" />}
                </div>
                {e.courses.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.courses.map((c) => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
