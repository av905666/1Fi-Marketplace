/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: '#6D28E9', ink: '#07172E', mist: '#F8F7FA' },
      boxShadow: { card: '0 6px 18px rgba(16, 24, 40, 0.06)', dock: '0 -5px 24px rgba(25, 23, 37, 0.08)' }
    }
  },
  plugins: []
}
