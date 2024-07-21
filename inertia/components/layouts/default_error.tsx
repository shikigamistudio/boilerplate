import type { HttpError } from '@adonisjs/core/types/http'
import { Head } from '@inertiajs/react'
import { Panel } from '~/components/elements/panel'

export interface DefaultErrorProps {
  title: string
  error?: HttpError
  infos?: string
}

export function DefaultError(props: DefaultErrorProps) {
  const { title, infos, error } = props

  return (
    <>
      <Head title={title} />

      <Panel className="m-2 text-center">
        <h1 className="my-4 text-2xl font-semibold">{title}</h1>
        {error && <p className="mb-2 font-medium text-red-700">{error.message}</p>}
        {infos && <p>{infos}</p>}
      </Panel>
    </>
  )
}
