import { createInertiaApp } from '@inertiajs/react'
import { AppShell } from '~/components/layouts/app_shell'
import ReactDOMServer from 'react-dom/server'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      const currentPage: any = pages[`../pages/${name}.tsx`]

      currentPage.default.layout =
        currentPage.default.layout || ((currentPage: any) => <AppShell children={currentPage} />)

      return currentPage
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
