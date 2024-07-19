import { Head } from '@inertiajs/react'
import { Errors } from '~/components/elements/errors'
import { Panel } from '~/components/elements/panel'

export default function VerifiedEmail() {
  return (
    <>
      <Head title="Verified Email" />
      <Panel>
        <Errors />
        <p></p>
      </Panel>
    </>
  )
}
