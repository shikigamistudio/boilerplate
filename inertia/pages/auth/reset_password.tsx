import { Head, useForm } from '@inertiajs/react'
import { Button } from '~/components/elements/button'
import { Errors } from '~/components/elements/errors'
import { Panel } from '~/components/elements/panel'
import { InputGroup } from '~/components/forms/input_group'
import type { Props } from '~/types/controller'
import type { FormEvent } from 'react'

import type ResetPasswordController from '#controllers/auth/reset_password_controller'

type ResetPasswordProps = Props<ResetPasswordController>

export default function ResetPassword(props: ResetPasswordProps) {
  const form = useForm({ password: '', password_confirmation: '' })
  const { token } = props

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    form.post('/reset-password/' + token)
  }

  return (
    <>
      <Head title="Reset password" />

      <Panel className="m-2">
        <Errors />
        <form onSubmit={handleSubmit} className="space-y-2">
          <p>Enter your new password below to reset your account password.</p>
          <InputGroup
            name="password"
            type="password"
            placeholder="•••••••"
            errorMessage={form.errors.password}
            onChange={(event) => form.setData('password', event.target.value)}
          >
            Password
          </InputGroup>
          <InputGroup
            name="password_confirmation"
            type="password"
            placeholder="•••••••"
            errorMessage={form.errors.password_confirmation}
            onChange={(event) => form.setData('password_confirmation', event.target.value)}
          >
            Confirm Password
          </InputGroup>
          <Button type="submit" className="block w-full" isLoading={form.processing}>
            Reset the password
          </Button>
        </form>
      </Panel>
    </>
  )
}
