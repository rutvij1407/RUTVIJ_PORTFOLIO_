'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function ContactXian() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Contact from Portfolio')
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:rvakati@gmu.edu?subject=${subject}&body=${body}`
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#050505]" ref={ref}>
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12">CONTACT ME</h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-[620px] mx-auto px-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 rounded-full bg-[#0f0f0f] border border-[#1f2937] text-white placeholder-[#6b7280] focus:border-[#3b82f6] focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 rounded-full bg-[#0f0f0f] border border-[#1f2937] text-white placeholder-[#6b7280] focus:border-[#3b82f6] focus:outline-none transition-colors"
            />
          </div>
          <textarea
            placeholder="Message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-[#0f0f0f] border border-[#1f2937] text-white placeholder-[#6b7280] focus:border-[#3b82f6] focus:outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full md:w-auto md:px-12 py-4 rounded-full bg-[#3b82f6] text-white font-semibold hover:bg-[#2563eb] transition-colors"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  )
}
