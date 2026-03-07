/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', '"Syne"', 'sans-serif'],
        heading: ['"Syne"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        cream: '#0F0F0F',
        warm: '#1a1a1a',
        sand: '#2a2a2a',
        clay: '#3a3a3a',
        mist: '#303040',
        sage: '#2a3530',
        blush: '#2a1f1f',
        slate: '#aaaaaa',
        ink: '#E6E6E6',
        deep: '#0F0F0F',
        accent: '#E8654A',
        gold: '#D4A847',
        mint: '#4ECDC4',
        violet: '#7C6AC4',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.2) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'float-slow': 'float 12s ease-in-out 4s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(2deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(20px)' },
          '50%': { opacity: '1', filter: 'blur(30px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      boxShadow: {
        'glow-accent': '0 0 60px rgba(232, 101, 74, 0.3)',
        'glow-mint': '0 0 60px rgba(78, 205, 196, 0.3)',
        'glow-violet': '0 0 60px rgba(124, 106, 196, 0.3)',
        'card': '0 4px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        'card-hover': '0 20px 80px rgba(0,0,0,0.15), 0 4px 20px rgba(0,0,0,0.08)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
    },
  },
  plugins: [],
}