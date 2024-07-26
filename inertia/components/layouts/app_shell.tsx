import type { ReactNode } from 'react'

import { ToastList } from '../elements/toast_list'
import { PageFooter } from './page_footer'
import { PageHeader } from './page_header'

interface AppShellProps {
  children: ReactNode
}

export function AppShell(props: AppShellProps) {
  const { children } = props

  return (
    <div className="bg-squares flex min-h-screen w-full flex-col">
      <PageHeader />
      <main className="grid-container mt-2 grid grow gap-y-2">{children}</main>
      <ToastList />
      <PageFooter />
    </div>
  )
}
