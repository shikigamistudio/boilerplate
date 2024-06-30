import { Head, useForm } from '@inertiajs/react'
import { Button } from '~/components/elements/button'
import { Panel } from '~/components/elements/panel'
import { InputGroup } from '~/components/forms/input_group'
import type { FormEvent } from 'react'

export default function Login() {
  const form = useForm({ email: '', password: '' })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    form.post('/login')
  }

  return (
    <>
      <Head title="Login" />

      <Panel>
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
          <Button type="submit" className="block w-full" isLoading={form.processing}>
            Login
          </Button>
        </form>
      </Panel>
    </>
  )
}
