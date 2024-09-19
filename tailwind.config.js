/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'selector',
  content: [
    './resources/views/inertia_layout.edge',
    './inertia/pages/**/*.tsx',
    './inertia/components/**/*.tsx',
    './inertia/scripts/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', ...defaultTheme.fontFamily.sans] },
      keyframes: {
        'slide-up-in': {
          from: { transform: 'translateY(200px)', opacity: 0 },
          to: { transform: 'translateY(0px)', opacity: 1 },
        },
      },
      animation: { 'slide-up-in': 'slide-up-in 300ms cubic-bezier(0.87, 0, 0.13, 1) both' },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@ayato-san/tailwind-plugin'),
    require('@ayato-san/tailwind-plugin/grid'),
    require('@ayato-san/tailwind-plugin/pattern_bg'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.text-gradient': {
          'backgroundImage': 'linear-gradient(#ce9ffc, #7367f0)',
          'backgroundClip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      })
    }),
  ],
}
