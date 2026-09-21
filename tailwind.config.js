/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        travella: {
          bg: '#F4F3EF',
          canvas: '#F8F7F4',
          card: '#FFFFFF',
          primary: '#387FAB',
          'primary-hover': '#2E698D',
          'primary-light': '#5B94BF',
          'primary-deep': '#2D72D2',
          badge: '#E8F1F8',
          'badge-soft': '#EBF3FA',
          dark: '#1A1C1E',
          deepDark: '#0C1014',
          muted: '#6A717A',
          subtle: '#8E95A0',
          border: '#E8E7E2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'travella': '0 8px 24px rgba(12, 16, 20, 0.06)',
        'travella-lg': '0 16px 36px rgba(12, 16, 20, 0.09)',
        'travella-card': '0 4px 20px rgba(12, 16, 20, 0.05)',
        'travella-float': '0 12px 30px rgba(56, 127, 171, 0.25)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
