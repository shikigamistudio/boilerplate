import type { SharedProps } from '@adonisjs/inertia/types'
import { Head, useForm, usePage } from '@inertiajs/react'
import { Button } from '~/components/elements/button'
import { Errors } from '~/components/elements/errors'
import { Link } from '~/components/elements/link'
import { Panel } from '~/components/elements/panel'
import { Text } from '~/components/elements/text'
import { InputGroup } from '~/components/forms/input_group'
import type { FormEvent, MouseEvent } from 'react'

export default function Profile() {
  const { currentUser } = usePage<SharedProps>().props
  const form = useForm({
    fullName: '',
    email: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const sendEmailForm = useForm({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    form.post('/profile')
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (!currentUser?.hasEmailValidate) {
      sendEmailForm.post('send-verify-email')
    }
  }

  return (
    <>
      <Head title="Profile" />
      <Panel>
        <Errors />
        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="space-y-2">
            <div>
              <Text type="h2">Profile Information</Text>
              <Text className="text-sm">
                Update your account's profile information and email adress.
              </Text>
            </div>
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
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
                <InputGroup
                  parentClassName="grow"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  defaultValue={currentUser?.email}
                  errorMessage={form.errors.email}
                  disabled={!currentUser?.hasEmailValidate}
                  onChange={(event) => form.setData('email', event.target.value)}
                >
                  Email
                </InputGroup>
                {!currentUser?.hasEmailValidate && (
                  <Button
                    type="button"
                    className="text-sm"
                    onClick={handleClick}
                    isLoading={sendEmailForm?.processing}
                  >
                    Verify Email
                  </Button>
                )}
              </div>
            </div>
          </section>
          <section className="space-y-2">
            <div>
              <Text type="h2">Update Password</Text>
              <Text className="text-sm">
                Ensure your account is using a long random password to stay secure.
              </Text>
            </div>
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
          </section>
          <Button type="submit" className="float-right" isLoading={form.processing}>
            Save
          </Button>
        </form>
      </Panel>
      <Panel className="space-y-2 border-red-200">
        <Text type="h2" className="text-red-500">
          Danger zone
        </Text>
        <div className="gap-4 space-y-2 md:flex md:space-y-0">
          <div className="grow">
            <Text className="text-sm font-semibold">Delete this account</Text>
            <Text className="text-sm">
              Once you delete an account, there is no going back. Please be certain.
            </Text>
          </div>
          <Link
            href="/delete-user"
            method="delete"
            className="flex justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-900"
          >
            Delete your account
          </Link>
        </div>
      </Panel>
    </>
  )
}
