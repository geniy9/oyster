const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './components/ui/**/*.{js,vue,ts}',
  ],
  prefix: '',
  theme: {
    screens: {
      "xs": "420px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      '2xl': '1400px',
      '3xl': '1600px'
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#FFFFFF',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#47E29F',
          foreground: '#359F71',
        },
        secondary: {
          DEFAULT: '#202022',
          foreground: '#303033',
        }
      },
      transitionDuration: {
        '2000': '2000ms',
        '4000': '4000ms',
        '6000': '6000ms',
        '8000': '8000ms',
        '16000': '16000ms',
        '32000': '32000ms',
      },
      transitionDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
        '2000': '2000ms',
        '4000': '4000ms',
        '6000': '6000ms',
        '8000': '8000ms',
        '16000': '32000ms',
      },
      keyframes: {
        'scroll-up': {
          from: { 'background-position-y': '0' },
          to: { 'background-position-y': '-1200px' },
        },
        'scroll-down': {
          from: { 'background-position-y': '0' },
          to: { 'background-position-y': '1200px' },
        }
      },
      animation: {
        'scroll-up': 'scroll-up 64s linear infinite',
        'scroll-down': 'scroll-down 64s linear infinite',
      },
      fontFamily: {
        black: ['black', 'sans-serif'],
        bold: ['bold', 'sans-serif'],
        regular: ['regular', 'sans-serif'],
        medium: ['medium', 'sans-serif'],
        light: ['light', 'sans-serif'],
      }
    },
  },
  plugins: [animate],
}