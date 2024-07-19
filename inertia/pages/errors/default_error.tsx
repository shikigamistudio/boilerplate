import { Head } from '@inertiajs/react'
import { Panel } from '~/components/elements/panel'

export interface DefaultErrorProps {
  title: string
  error: string
}

export function DefaultError(props: DefaultErrorProps) {
  return (
    <>
      <Head title={props.title} />

      <Panel className="m-2 text-center">
        <h1 className="text-xl font-semibold">{props.title}</h1>

        <span>{props.error}</span>
      </Panel>
    </>
  )
}
