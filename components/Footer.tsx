'use client'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 pb-32 pt-10 text-center font-mono text-xs text-burgundy-200/50">
      <p>© {new Date().getFullYear()} Vakati Rutvij Reddy · Built with Next.js, Framer Motion &amp; a lot of SQL</p>
    </footer>
  )
}
