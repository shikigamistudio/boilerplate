/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { AppShell } from '~/components/layouts/app_shell'
import { hydrateRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'ShikigamiStudio'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => (title ? `${title} | ${appName}` : appName),

  resolve: async (name) => {
    const page: any = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )

    page.default.layout =
      page.default.layout || ((currentPage: any) => <AppShell children={currentPage} />)

    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
