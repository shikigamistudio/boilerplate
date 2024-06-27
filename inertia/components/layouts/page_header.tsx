import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import shikigamiStudioLogo from '~/assets/shikigamistudio-icon.svg'

import { Link } from '../elements/link'

export function PageHeader() {
  const pageProps = usePage<SharedProps>().props

  return (
    <header className="flex w-full items-center justify-between border-b px-6 py-3">
      <Link href="/">
        <img src={shikigamiStudioLogo} alt="Shikigami SAAS" className="w-10" width="40" />
      </Link>

      <div className="flex gap-x-4">
        {pageProps.currentUser ? (
          <>
            <span>{pageProps.currentUser?.email}</span>
            <Link href="/logout" method="delete">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
