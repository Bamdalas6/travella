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
          bg: '#F8FAF9',
          canvas: '#FFFFFF',
          card: '#FFFFFF',
          primary: '#037c66',
          'primary-hover': '#026352',
          'primary-light': '#05947a',
          'primary-tint': '#e2ece9',
          badge: '#EBF4F1',
          'badge-soft': '#F2F7F5',
          dark: '#1A1C1E',
          deepDark: '#0C1014',
          muted: '#6A717A',
          subtle: '#8E95A0',
          border: '#EAEFEC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'travella': '0 8px 24px rgba(12, 16, 20, 0.05)',
        'travella-lg': '0 16px 36px rgba(12, 16, 20, 0.08)',
        'travella-card': '0 4px 20px rgba(12, 16, 20, 0.04)',
        'travella-float': '0 12px 30px rgba(3, 124, 102, 0.25)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
