/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anchor: {
          primary: '#111F3D',
          secondary: '#1B3157',
          accent: '#C5A45A',
          'accent-hover': '#B39145',
          background: '#F5F6F8',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          success: '#198754',
          danger: '#DC3545',
          warning: '#EAB308',
          info: '#0EA5E9',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'desktop-card': '0 2px 10px rgba(17, 31, 61, 0.06)',
        'desktop-modal': '0 20px 40px rgba(17, 31, 61, 0.2)',
      }
    },
  },
  plugins: [],
}
