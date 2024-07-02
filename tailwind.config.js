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
    paddingInline: '2rem',
    contentMaxWidth: '90ch',
    breakoutMaxWidth: '110ch',
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
    require('@ayato-san/tailwind-plugin/trendy_bg'),
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
