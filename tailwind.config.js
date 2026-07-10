/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          150: '#edf2f7',
          250: '#d9e2ec',
          350: '#a8b7c7',
          450: '#718096',
          550: '#526275',
          650: '#3f4c5f',
          850: '#162033',
          855: '#111a2a',
        },
        aurora: {
          dark: '#08111f', // deep navy for the pitch-at-night feel
          card: '#101c2e', // elevated panel background
          accent: '#10b981', // emerald accent
          neon: '#10b981', // default emerald neon
          green: '#00ff87', // bright neon green
          teal: '#60efff', // bright neon cyan/teal
          purple: '#7928ca', // neon purple
          pink: '#ff007a', // neon pink
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Manrope', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.2), 0 0 20px rgba(16, 185, 129, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)' }
        }
      }
    },
  },
  plugins: [],
}
