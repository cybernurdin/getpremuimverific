/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#f8fafc',         // Off-white canvas
          sidebar: '#ffffff',    // Crisp white sidebar
          card: '#ffffff',       // Pure white cards
          border: '#e2e8f0',     // Light slate border
          orange: '#ff6b00',     // Vibrant Orange primary
          'orange-hover': '#ea580c',
          'orange-light': '#fff7ed', // Soft orange pill background
          blue: '#2563eb',       // Electric Blue secondary
          'blue-hover': '#1d4ed8',
          'blue-light': '#eff6ff', // Soft blue pill background
          text: '#0f172a',       // Dark slate text
          muted: '#64748b',      // Muted slate gray
          red: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 4px 12px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'orange-glow': '0 0 20px rgba(255, 107, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
