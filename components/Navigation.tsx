'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#1f2937]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-[#3b82f6]">RV</span>
          </a>

          {/* Desktop Navigation - Normal names, no numbers */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#9ca3af] hover:text-[#3b82f6] transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/rutvij1407"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-[#3b82f6] transition-colors p-2"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/vakati-rutvij-1167rutvij"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] hover:text-[#3b82f6] transition-colors p-2"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:rvakati@gmu.edu"
              className="text-[#9ca3af] hover:text-[#3b82f6] transition-colors p-2"
            >
              <FaEnvelope size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#f5f5f7] p-2"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-t border-[#1f2937]"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-[#9ca3af] hover:text-[#3b82f6] transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-[#1f2937]">
                <a href="https://github.com/rutvij1407" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6]">
                  <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/vakati-rutvij-1167rutvij" target="_blank" rel="noopener noreferrer" className="text-[#3b82f6]">
                  <FaLinkedin size={24} />
                </a>
                <a href="mailto:rvakati@gmu.edu" className="text-[#3b82f6]">
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
