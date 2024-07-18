/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

/** Import global styles */
import '../css/app.css'

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { AppShell } from '~/components/layouts/app_shell'
import { hydrateRoot } from 'react-dom/client'

/** The application name */
const appName = import.meta.env.VITE_APP_NAME || 'ShikigamiStudio'

/** Create Inertia.js app instance */
createInertiaApp({
  /** Customize progress bar color */
  progress: { color: '#2196f3' },

  /** Set dynamic page title function */
  title: (title) => (title ? `${title} | ${appName}` : appName),

  /** Resolve page components dynamically */
  resolve: async (name) => {
    /** Step 1: Load the page component dynamically */
    const page: any = await resolvePageComponent(
      `../pages/${name}.tsx`, // Path to the page component
      import.meta.glob('../pages/**/*.tsx') // Glob pattern to match page components
    )

    /** Step 2: Set default layout if not specified in the page component */
    page.default.layout =
      page.default.layout || ((currentPage: any) => <AppShell children={currentPage} />)

    /** Step 3: Return the resolved page component */
    return page
  },

  /** Setup function to hydrate the root element with the app component */
  setup({ el, App, props }) {
    /** Hydrate the root element with the app component */
    hydrateRoot(el, <App {...props} />)
  },
})
