import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        panel: '#050203',
        burgundy: {
          50: '#f7e9eb',
          100: '#ead3d6',
          200: '#d9959f',
          300: '#b5485d',
          400: '#9b1c3a',
          500: '#8a0f2e',
          600: '#800020',
          700: '#5e0018',
          800: '#3f0010',
          900: '#230209',
        },
        cream: '#f4ece9',
        glacier: { 200: '#dbe6f0', 300: '#bcd0e2', 400: '#93b0cb' },
        silver: '#e6e7ea',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,30px) scale(0.95)' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        shine: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        blink: { '50%': { opacity: '0' } },
        stageSpin: { to: { transform: 'rotateY(360deg)' } },
        orbit: { to: { transform: 'rotateZ(360deg)' } },
        flow: { '0%': { strokeDashoffset: '24' }, '100%': { strokeDashoffset: '0' } },
        pulseRing: { '0%': { transform: 'scale(.8)', opacity: '.7' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        aurora: { '0%,100%': { transform: 'translate3d(0,0,0) rotate(0deg)' }, '50%': { transform: 'translate3d(4%,-3%,0) rotate(8deg)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        'spin-slow': 'spinSlow 22s linear infinite',
        shine: 'shine 6s linear infinite',
        blink: 'blink 1s step-end infinite',
        'stage-spin': 'stageSpin 38s linear infinite',
        orbit: 'orbit 14s linear infinite',
        flow: 'flow 1s linear infinite',
        'pulse-ring': 'pulseRing 2.2s ease-out infinite',
        aurora: 'aurora 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
