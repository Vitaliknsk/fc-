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
        aurora: {
          dark: '#030712', // deep rich black/gray
          card: '#0b0f19', // slate midnight for card backgrounds
          accent: '#10b981', // emerald accent
          neon: '#10b981', // default emerald neon
          green: '#00ff87', // bright neon green
          teal: '#60efff', // bright neon cyan/teal
          purple: '#7928ca', // neon purple
          pink: '#ff007a', // neon pink
        }
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'Manrope', 'sans-serif'],
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
