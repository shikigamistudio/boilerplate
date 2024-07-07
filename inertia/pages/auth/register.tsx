import { Head, useForm } from '@inertiajs/react'
import { Button } from '~/components/elements/button'
import { Panel } from '~/components/elements/panel'
import { InputGroup } from '~/components/forms/input_group'
import type { FormEvent } from 'react'
import { Errors } from '~/components/elements/errors'

export default function Login() {
  const form = useForm({ email: '', password: '', password_confirmation: '' })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    form.post('/register')
  }

  return (
    <>
      <Head title="Register" />

      <Panel className="m-2">
        <Errors />
        <form onSubmit={handleSubmit} className="space-y-2">
          <InputGroup
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            errorMessage={form.errors.email}
            onChange={(event) => form.setData('email', event.target.value)}
          >
            Email
          </InputGroup>
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
            Password
          </InputGroup>
          <Button type="submit" className="block w-full" isLoading={form.processing}>
            Register
          </Button>
        </form>
      </Panel>
    </>
  )
}
