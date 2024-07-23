import { Head } from '@inertiajs/react'
import { Errors } from '~/components/elements/errors'
import { Panel } from '~/components/elements/panel'

export default function VerifiedEmail() {
  return (
    <>
      <Head title="Revert Account" />
      <Panel className="space-y-4">
        <h1 className="text-2xl font-medium">
          Your email address change has been successfully reverted.
        </h1>
        <p>
          Your email address has been restored to its previous state. If this action was not
          initiated by you, please contact our support team immediately.
        </p>
        <p>
          If you have any questions or need further assistance, please do not hesitate to contact
          our support team.
        </p>
        <Errors />
      </Panel>
    </>
  )
}
