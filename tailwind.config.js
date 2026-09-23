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
        // Matte charcoal scale — calm, low-saturation dark UI (Linear/Stripe inspired)
        navy: {
          950: '#08090c',
          900: '#0d0f14',
          850: '#12141a',
          800: '#171a21',
          750: '#1d2028',
          700: '#252932',
          600: '#333844',
          500: '#4b5261',
        },
        kavach: {
          pass: '#10B981',    // Emerald safe
          warn: '#F59E0B',    // Amber warning
          hold: '#EF4444',    // Rose danger
          ask: '#3B82F6',     // Blue interactive
          accent: '#06B6D4',  // Cyan highlight
          card: '#12141a',    // Elevated card
          border: '#1d2028',  // Subtle border
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'soft-md': '0 4px 16px -4px rgba(0, 0, 0, 0.45)',
        'soft-lg': '0 12px 32px -8px rgba(0, 0, 0, 0.55)',
        'soft-xl': '0 20px 48px -12px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
