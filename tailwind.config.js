/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const sizes = { height: ['100vh', '100svh'], width: ['100vw', '100svw'] }

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
      height: { screen: sizes.height },
      minHeight: { screen: sizes.height },
      maxHeight: { screen: sizes.height },
      minWidth: { screen: sizes.width },
      width: { screen: sizes.width },
      maxWidth: { screen: sizes.width },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@ayato-san/tailwind-plugin'),
    require('@ayato-san/tailwind-plugin/grid'),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.bg-dots::before': {
          backgroundColor: theme('colors').white,
          backgroundImage: 'radial-gradient(black 1px, transparent 0)',
          backgroundSize: '40px 40px',
          backgroundPosition: '-19px -19px',
          content: 'var(--tw-content)',
          width: theme('width').screen,
          height: theme('height').screen,
          zIndex: '-' + theme('zIndex')[10],
          position: 'fixed',
          maskImage: 'radial-gradient(black, transparent 80%)',
        },
        '.bg-squares::before': {
          backgroundColor: theme('colors').white,
          backgroundImage:
            'linear-gradient(to top, transparent 18px, rgba(0,0,0,.15) 19px, transparent 20px), linear-gradient(to left, transparent 18px, rgba(0,0,0,.15) 19px, transparent 20px)',
          backgroundSize: '40px 40px',
          backgroundPositionY: '-10px',
          content: 'var(--tw-content)',
          width: theme('width').screen,
          height: theme('height').screen,
          zIndex: '-' + theme('zIndex')[10],
          position: 'fixed',
          maskImage: 'radial-gradient(black, transparent 90%)',
        },
      })
    }),
  ],
}
