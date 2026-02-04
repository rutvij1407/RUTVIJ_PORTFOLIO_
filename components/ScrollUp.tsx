'use client'

import { useState, useEffect } from 'react'

export default function ScrollUp() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY >= 350)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href="#home"
      className={`fixed right-6 bottom-24 md:bottom-12 z-40 p-2 bg-white/10 backdrop-blur-xl rounded-lg text-white transition-all duration-400 hover:-translate-y-2 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
      </svg>
    </a>
  )
}
