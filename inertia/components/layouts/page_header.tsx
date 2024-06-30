import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import shikigamiStudioLogo from '~/assets/shikigamistudio-icon.svg'
import { useOutsideClick } from '~/hooks/use_outside_click_hook'
import { useState } from 'react'

import { Link } from '../elements/link'

export function PageHeader() {
  const { currentUser } = usePage<SharedProps>().props
  const [menuOpen, setMenuOpen] = useState(false)

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setMenuOpen(false)
  })

  return (
    <header className="flex w-full items-center justify-between border-b bg-white px-6 py-3">
      <Link href="/">
        <img src={shikigamiStudioLogo} alt="Shikigami SAAS" className="w-10" width="40" />
      </Link>

      <div className="relative flex gap-x-4" ref={ref}>
        {currentUser ? (
          <>
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {currentUser.email}
            </button>
            <ul
              className={`absolute right-0 top-full mt-1 rounded-xl border bg-white p-4 ${menuOpen ? 'block' : 'hidden'}`}
            >
              <li>
                <Link href="/profil">Profil</Link>
              </li>
              <li>
                <Link href="/logout" method="delete">
                  Logout
                </Link>
              </li>
            </ul>
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
