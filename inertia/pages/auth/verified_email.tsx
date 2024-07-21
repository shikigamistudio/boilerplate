import { Head } from '@inertiajs/react'
import { Errors } from '~/components/elements/errors'
import { Panel } from '~/components/elements/panel'

export default function VerifiedEmail() {
  return (
    <>
      <Head title="Verified Email" />
      <Panel className="space-y-4">
        <h1 className="text-2xl font-medium">Your email address has been successfully verified.</h1>
        <p>
          Thank you for confirming your email. You can now enjoy all the features of
          ShikigamiStudio.
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
