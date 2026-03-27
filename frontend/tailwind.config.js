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
          DEFAULT: '#0a0e1a',
          dark: '#060810',
          light: '#111827',
        },
        surface: '#1a2035',
        'surface-border': '#2a3350',
        gold: {
          DEFAULT: '#f59e0b',
          light: '#fcd34d',
          dark: '#d97706',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#67e8f9',
          dark: '#0891b2',
        },
        background: '#f8fafc',
        foreground: '#0f172a',
        card: '#ffffff',
        'card-foreground': '#0f172a',
        border: '#e2e8f0',
        input: '#e2e8f0',
        muted: '#f1f5f9',
        'muted-foreground': '#64748b',
        primary: {
          DEFAULT: '#f59e0b',
          foreground: '#0a0e1a',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
