import { Head, useForm } from '@inertiajs/react'
import { Button } from '~/components/elements/button'
import { Errors } from '~/components/elements/errors'
import { Panel } from '~/components/elements/panel'
import { InputGroup } from '~/components/forms/input_group'
import type { FormEvent } from 'react'

export default function ForgotPassword() {
  const form = useForm({ email: '' })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    form.post('/forgot-password')
  }

  return (
    <>
      <Head title="Forgot password" />

      <Panel className="m-2">
        <Errors />
        <form onSubmit={handleSubmit} className="space-y-2">
          <p>Forgot your password? No problem.</p>
          <p>
            Just let us know your email address and we will email you a password reset link that
            will allow you to choose a new one.
          </p>
          <InputGroup
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            errorMessage={form.errors.email}
            onChange={(event) => form.setData('email', event.target.value)}
          >
            Email
          </InputGroup>
          <Button type="submit" className="block w-full" isLoading={form.processing}>
            Email Password Reset Link
          </Button>
        </form>
      </Panel>
    </>
  )
}
