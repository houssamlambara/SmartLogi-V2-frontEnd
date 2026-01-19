/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss,css}"
  ],
  theme: {
    extend: {
      colors: {
        // New "Soft UI" Palette
        primary: {
          50: '#f5f3ff', // Violet-50
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Violet-500
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#fff1f2', // Rose-50
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e', // Rose-500
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        neutral: {
          50: '#fafaf9', // Stone-50 (Warm)
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e', // Stone-600
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Keep explicit mappings if needed for backward compatibility or semantic naming
        premium: {
          bg: '#fafaf9',
          surface: '#ffffff',
          text: '#1c1917',
          'text-muted': '#78716c',
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // Keep Outfit for headers
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
        'soft-lg': '0 20px 60px -15px rgba(0,0,0,0.08)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)', // Violet glow
      }
    },
  },
  plugins: [],
};