/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const sizes = { height: ['100vh', '100svh'], width: ['100vw', '100svw'] }

const bgs = {
  backgroundColor: 'inherit',
  content: 'var(--tw-content)',
  width: sizes.width,
  height: sizes.height,
  top: '0',
  position: 'fixed',
  zIndex: '-1000',
}

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
      zIndex: { 1: 1 },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@ayato-san/tailwind-plugin'),
    require('@ayato-san/tailwind-plugin/grid'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.bg-dots::before': { ...bgs },
        '.bg-dots::after': {
          ...bgs,
          backgroundImage: 'radial-gradient(rgba(0,0,0,.5) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(black 30%, transparent 80%)',
        },
        '.bg-squares::before': { ...bgs },
        '.bg-squares::after': {
          ...bgs,
          backgroundImage:
            'linear-gradient(to top, transparent 18px, rgba(0,0,0,.15) 19px, transparent 20px), linear-gradient(to left, transparent 18px, rgba(0,0,0,.15) 19px, transparent 20px)',
          backgroundSize: '40px 40px',
          backgroundPositionY: '-10px',
          maskImage: 'radial-gradient(black 20%, transparent 90%)',
        },
        '.text-gradient': {
          'backgroundImage': 'linear-gradient(#ce9ffc, #7367f0)',
          'backgroundClip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      })
    }),
  ],
}
