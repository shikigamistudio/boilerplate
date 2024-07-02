import type { SharedProps } from '@adonisjs/inertia/types'
import { Head, usePage } from '@inertiajs/react'
import { Button } from '~/components/elements/button'
import { Panel } from '~/components/elements/panel'
import { Text } from '~/components/elements/text'
import { InputGroup } from '~/components/forms/input_group'

export default function Profile() {
  const { currentUser } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Profile" />
      <section className="grid-cols-3 gap-2 md:grid">
        <aside className="mb-2">
          <Text type="h2">Profile Information</Text>
          <Text className="text-sm">
            Update your account's profile information and email adress.
          </Text>
        </aside>
        <Panel className="col-span-2">
          <InputGroup
            name="text"
            type="email"
            placeholder="john doe"
            defaultValue={currentUser?.fullName}
          >
            Full Name
          </InputGroup>
          <InputGroup
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            defaultValue={currentUser?.email}
          >
            Email
          </InputGroup>
          <Panel.Footer className="justify-end">
            <Button>save</Button>
          </Panel.Footer>
        </Panel>
      </section>
      <section className="grid-cols-3 gap-2 md:grid">
        <aside className="mb-2">
          <Text type="h2">Update Password</Text>
          <Text className="text-sm">
            Ensure your account is using a long random password to stay secure.
          </Text>
        </aside>
        <Panel className="col-span-2">
          <InputGroup name="password" type="password" placeholder="•••••••••">
            Current Password
          </InputGroup>
          <InputGroup name="password" type="password" placeholder="•••••••">
            New Password
          </InputGroup>
          <InputGroup name="password" type="password" placeholder="•••••••">
            Confirm Password
          </InputGroup>
          <Panel.Footer className="justify-end">
            <Button>save</Button>
          </Panel.Footer>
        </Panel>
      </section>
    </>
  )
}
