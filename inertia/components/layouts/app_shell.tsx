import type { ReactNode } from 'react'

import { PageFooter } from './page_footer'
import { PageHeader } from './page_header'

interface AppShellProps {
  children: ReactNode
}

export function AppShell(props: AppShellProps) {
  const { children } = props

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader />
      <main className="grid-container mt-2 grid grow gap-y-2">{children}</main>
      <PageFooter />
    </div>
  )
}
