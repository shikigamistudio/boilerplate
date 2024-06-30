import { Head, usePage } from '@inertiajs/react'
import { Panel } from '~/components/elements/panel'
import type { SharedProps } from '@adonisjs/inertia/types'

export default function Profil() {
  const { currentUser } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Profil" />
      <Panel>
        <ul>
          <li>Full Name : {currentUser?.fullName}</li>
          <li>Email : {currentUser?.email}</li>
        </ul>
      </Panel>
    </>
  )
}
