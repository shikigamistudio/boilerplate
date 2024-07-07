import type { SharedProps } from '@adonisjs/inertia/types'
import { Head, useForm, usePage } from '@inertiajs/react'
import { Button } from '~/components/elements/button'
import { Panel } from '~/components/elements/panel'
import { Text } from '~/components/elements/text'
import { InputGroup } from '~/components/forms/input_group'
import type { FormEvent } from 'react'

export default function Profile() {
  const { currentUser } = usePage<SharedProps>().props
  const form = useForm({
    fullName: '',
    email: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    form.post('/profile')
  }

  return (
    <>
      <Head title="Profile" />
      <Panel>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Text type="h2">Profile Information</Text>
          <Text className="text-sm">
            Update your account's profile information and email adress.
          </Text>
          <div className="space-y-2">
            <InputGroup
              name="fullName"
              type="text"
              placeholder="john doe"
              defaultValue={currentUser?.fullName}
              errorMessage={form.errors.fullName}
              onChange={(event) => form.setData('fullName', event.target.value)}
            >
              Full Name
            </InputGroup>
            <InputGroup
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              defaultValue={currentUser?.email}
              errorMessage={form.errors.email}
              onChange={(event) => form.setData('email', event.target.value)}
            >
              Email
            </InputGroup>
          </div>
          <Text type="h2">Profile Information</Text>
          <Text className="text-sm">
            Update your account's profile information and email adress.
          </Text>
          <div className="space-y-2">
            <InputGroup
              name="current_password"
              type="password"
              placeholder="•••••••••"
              errorMessage={form.errors.current_password}
              onChange={(event) => form.setData('current_password', event.target.value)}
            >
              Current Password
            </InputGroup>
            <InputGroup
              name="new_password"
              type="password"
              placeholder="•••••••"
              errorMessage={form.errors.new_password}
              onChange={(event) => form.setData('new_password', event.target.value)}
            >
              New Password
            </InputGroup>
            <InputGroup
              name="new_password_confirmation"
              type="password"
              placeholder="•••••••"
              errorMessage={form.errors.new_password_confirmation}
              onChange={(event) => form.setData('new_password_confirmation', event.target.value)}
            >
              Confirm Password
            </InputGroup>
          </div>
          <Button type="submit" className="float-right" isLoading={form.processing}>
            Save
          </Button>
        </form>
      </Panel>
    </>
  )
}
