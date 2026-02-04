import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-white mb-2">404</h1>
      <p className="text-[#9ca3af] mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-[#dc2626] text-white font-medium hover:bg-[#b91c1c] transition-colors"
      >
        Go to Home
      </Link>
    </div>
  )
}
