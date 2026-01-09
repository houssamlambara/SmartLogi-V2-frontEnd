/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss,css}"
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          bg: '#f8fafc',
          surface: '#ffffff',
          card: '#ffffff',
          accent: '#10b981',
          'accent-hover': '#059669',
          border: '#e2e8f0',
          text: '#0f172a',
          'text-muted': '#64748b',
          'soft-bg': '#f1f5f9'
        },
        luxury: {
          dark: '#0f172a',
          card: '#1e293b',
          accent: '#10b981',
          'accent-hover': '#059669',
          border: '#334155',
          text: '#f8fafc',
          'text-muted': '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
};