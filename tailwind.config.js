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
        navy: {
          950: '#070b14',
          900: '#0b1120',
          850: '#0f172a',
          800: '#141f36',
          750: '#1a2744',
          700: '#1e2e4f',
          600: '#2d3f66',
          500: '#415582',
        },
        kavach: {
          pass: '#10B981',    // Emerald safe
          warn: '#F59E0B',    // Amber warning
          hold: '#EF4444',    // Rose danger
          ask: '#3B82F6',     // Blue interactive
          accent: '#06B6D4',  // Cyan highlight
          card: '#0f172a',    // Elevated card
          border: '#1e293b',  // Subtle border
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-pass': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
        'glow-warn': '0 0 20px -3px rgba(245, 158, 11, 0.25)',
        'glow-hold': '0 0 20px -3px rgba(239, 68, 68, 0.25)',
        'glow-ask': '0 0 20px -3px rgba(59, 130, 246, 0.25)',
        'glow-accent': '0 0 25px -4px rgba(6, 182, 212, 0.3)',
      }
    },
  },
  plugins: [],
}
