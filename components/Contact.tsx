'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa'

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'rvakati@gmu.edu',
    link: 'mailto:rvakati@gmu.edu',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+1 (703) 499-1275',
    link: 'tel:+17034991275',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vakati-rutvij-1167rutvij',
    link: 'https://www.linkedin.com/in/vakati-rutvij-1167rutvij',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/rutvij1407',
    link: 'https://github.com/rutvij1407',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Fairfax, VA, USA',
    link: null,
  },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const subject = encodeURIComponent('Contact from Portfolio')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:rvakati@gmu.edu?subject=${subject}&body=${body}`

    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 500)
  }

  return (
    <section id="contact" className="py-24 bg-[#050505] relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="text-[#dc2626]">Touch</span>
          </h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto">
            Actively seeking Summer 2026 internship opportunities in Data Analytics and Data Engineering. Open to discussing projects, collaborations, or full-time roles—reach out via email, LinkedIn, or the form below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-6">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                const content = (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-[#1f2937] hover:border-[#dc2626]/30 transition-colors">
                    <div className="p-2 rounded-lg bg-[#dc2626]/10">
                      <Icon className="text-[#dc2626]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#9ca3af]">{info.label}</p>
                      <p className="text-[#f5f5f7] font-medium">{info.value}</p>
                    </div>
                  </div>
                )
                return info.link ? (
                  <a key={index} href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1f2937] text-[#f5f5f7] placeholder-[#6b7280] focus:border-[#dc2626] focus:outline-none transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1f2937] text-[#f5f5f7] placeholder-[#6b7280] focus:border-[#dc2626] focus:outline-none transition-colors"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#1f2937] text-[#f5f5f7] placeholder-[#6b7280] focus:border-[#dc2626] focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : submitStatus === 'success' ? (
                  <>
                    <FaPaperPlane /> Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
            <p className="text-[#6b7280] text-sm mt-2">
              Available for Summer 2026 Internships
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
