/// <reference path="../adonisrc.ts" />
/// <reference path="./auth.ts" />
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

import type { Toast } from '#actions/send_toasts_action'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    currentUser: (ctx) => ctx.auth?.user,
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    toasts: (ctx): Toast[] | undefined => ctx.session?.flashMessages.get('toast'),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}

export interface ViewProps {
  title?: string
  description?: string
  image?: {
    path: string
    width?: number
    height?: number
    type?: string
    alt?: string
  }
}
